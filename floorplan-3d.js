/*!
 * floorplan-3d.js  v20261112
 * 수정: 2026-11-12 (KST) — 고칠 때마다 이 시각을 바꾼다
 * 신세계 공간관리시스템 2D 도면(HTML)에 '층별 3D 보기'를 붙이는 스크립트
 *  - 도면 HTML 안의 데이터(SPACES·FLOW·Plan.stores)로 그 자리에서 3D 블록 모형을 만든다(별도 3D HTML 불필요)
 *  - 아이디어 모드(floorplan-editor.js)로 바꾼 배치·이름·채움색, 히트맵 색도 그대로 3D에 반영
 *  - 매장 선택·상세 패널·매장 목록·시설/이동 시설/라벨/매장코드 체크박스를 2D와 함께 쓴다
 *  - three.js r147은 처음 3D를 켤 때만 공개 CDN(jsDelivr)에서 불러온다(2D만 볼 때는 아무것도 받지 않음)
 * 사용: 도면 HTML에서 floorplan-editor.js 다음 줄에 넣는다(편집기 없이 2D 도면만 있어도 동작).
 *   <script src="https://cdn.jsdelivr.net/gh/starroooot/report-styles@main/floorplan-3d.js?v=20261112"><\/script>
 * API: FP3D.open() · FP3D.close() · FP3D.toggle() · FP3D.view('persp'|'top'|'front')
 *      FP3D.heightmap({'SH00140922':120,...}, 최대높이m) · FP3D.resetHeight()
 *      (3D를 켠 동안 Plan.focus(id)는 3D 시점으로 이동, Plan.heatmap·highlight·resetColors는 3D에도 반영)
 * 라이브러리 위치를 바꾸려면 이 스크립트 앞에서 window.FP3D_LIB = {three:'…/three.min.js', orbit:'…/OrbitControls.js'}
 */
(function(){
'use strict';
if(window.FP3D)return;
if(typeof SPACES==='undefined'||typeof Plan==='undefined'){console.warn('floorplan-3d: 도면 데이터(SPACES·Plan)가 없어 3D 보기를 붙이지 않습니다');return}
const CDN='https://cdn.jsdelivr.net/npm/three@0.147.0/';
const LIB=Object.assign({three:CDN+'build/three.min.js',orbit:CDN+'examples/js/controls/OrbitControls.js'},window.FP3D_LIB||{});
const H_STORE=3.0,H_FAC=2.4,H_PARENT=0.4;   /* 블록 높이(m). H_PARENT: 하위 매장을 품은 상위 공간은 낮은 판으로 깐다 */
const C3={lux:'#e9b98c',rtw:'#a9cf98',jw:'#bba6e3',acc:'#f2a97a',etc:'#a9c2e3',vacant:'#dfe3e8'};   /* 3D 기본색(2D 기본색보다 진하게) */
const $=id=>document.getElementById(id);
const chk=id=>{const e=$(id);return !e||e.checked};
const isCode=n=>typeof IS_CODE_NM==='function'?IS_CODE_NM(n):/^[A-Z0-9]+_[^_]+_[A-Z0-9]+_\d+$/.test(n||'');
const emw=s=>[...(s||'')].reduce((a,c)=>a+(/[가-힣]/.test(c)?1:0.62),0);

/* ---------- 화면 요소 ---------- */
const css=document.createElement('style');css.id='fp3d-css';css.textContent=`
#fp3d{position:absolute;display:none;background:#f3f5f8;border:1px solid #ddd;overflow:hidden;z-index:2}
#fp3d canvas{display:block;outline:none}
#fp3d .lbls{position:absolute;inset:0;pointer-events:none;overflow:hidden}
#fp3d .lb,#fp3d .fl,#fp3d .fc{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;line-height:1.15;pointer-events:none}
#fp3d .lb{font-weight:700;color:#1d232b;text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 2px #fff}
#fp3d .lb small{display:block;font-size:.78em;font-weight:400;color:#444}
#fp3d .fl{font-size:11px;font-weight:700;color:#1f2d3d;background:rgba(255,255,255,.85);padding:1px 4px;border-radius:3px}
#fp3d .fl.ent{color:#fff;background:#c8102e;border-radius:9px;padding:2px 8px}
#fp3d .fc{color:#555;text-shadow:0 0 3px #fff,0 0 2px #fff}
#fp3d .vbar{position:absolute;left:10px;top:10px;display:flex;gap:4px;z-index:3}
#fp3d .vbar button{height:26px;padding:0 9px;font-size:12px;border:1px solid #c9c9c9;background:#fff;border-radius:6px;cursor:pointer}
#fp3d .vbar button:hover{background:#f0f0f0}
#fp3d .hint{position:absolute;left:10px;bottom:8px;font-size:11px;color:#6b7480;pointer-events:none;z-index:3}
#fp3d .msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:14px;color:#555;text-align:center;padding:20px;line-height:1.6}
#fp3dBtn.on,#fp3dTb.on{background:#c8102e!important;color:#fff!important;border-color:#c8102e!important}
#fp3dTb{font-size:11px;font-weight:800;letter-spacing:-.3px}
body.fp3d #plan{visibility:hidden}
body.fp3d #tb .g.ed,body.fp3d #edToggle,body.fp3d #leakWarn,body.fp3d .pop{display:none!important}`;
document.head.appendChild(css);

const plan=$('plan');const host=plan.parentNode;   /* 편집기가 있으면 #planRow, 없으면 #wrap */
if(getComputedStyle(host).position==='static')host.style.position='relative';
const box=document.createElement('div');box.id='fp3d';
box.innerHTML=`<div class="vbar"><button data-v="persp" title="기본 시점">기본</button><button data-v="top" title="위에서 보기">위</button><button data-v="front" title="정면에서 보기">정면</button><button data-v="2d" title="2D 도면으로 돌아가기">2D로</button></div>
<div class="lbls"></div><div class="hint">드래그: 회전 · 오른쪽 드래그: 이동 · 휠: 확대/축소 · 더블클릭: 매장으로 이동</div>`;
host.appendChild(box);
const labelsEl=box.querySelector('.lbls');

/* 켜기/끄기 버튼: 헤더(#zoomctl)에 항상, 편집기 도구 막대(#tb)가 있으면 거기에도 */
const btn=document.createElement('button');btn.type='button';btn.id='fp3dBtn';btn.textContent='3D 보기';btn.title='이 층을 3D로 보기';
(($('zoomctl'))||document.querySelector('header')).appendChild(btn);
btn.onclick=()=>toggle();
function addTbBtn(){const tb=$('tb');if(!tb||$('fp3dTb'))return;const g=document.createElement('div');g.className='g';
  g.innerHTML='<button type="button" id="fp3dTb" class="tbtn" title="3D 보기 켜기/끄기">3D</button>';
  const z=$('tZin');z&&z.closest('.g')?z.closest('.g').after(g):tb.appendChild(g);$('fp3dTb').onclick=()=>toggle()}
addTbBtn();

/* ---------- 상태 ---------- */
let active=false,ready=false,loading=null,raf=0;
let THREE_,renderer,scene,camera,controls,root,facGroup,flowGroup,CX=0,CY=0,SPAN=50;
let S3=[],flowLabels=[],facLabels=[],facPick=[],order=null,tw=null;

/* ---------- 라이브러리 불러오기 ---------- */
const loadScript=src=>new Promise((ok,ng)=>{const s=document.createElement('script');s.src=src;s.async=false;s.dataset.fp3d='1';s.onload=ok;s.onerror=()=>ng(new Error(src));document.head.appendChild(s)});
function loadLib(){
  if(window.THREE&&window.THREE.OrbitControls)return Promise.resolve();
  if(!loading)loading=(window.THREE?Promise.resolve():loadScript(LIB.three)).then(()=>window.THREE.OrbitControls?0:loadScript(LIB.orbit))
    .then(()=>{/* 저장(HTML) 시 끼어들지 않게 불러온 script 태그는 지운다 */document.querySelectorAll('script[data-fp3d]').forEach(s=>s.remove())})
    .catch(e=>{loading=null;throw e});
  return loading}

/* ---------- 기하 ---------- */
/* 외곽선 → 점 목록(m). bulge 호는 잘게 나눈다(2D 도면과 같은 규칙: bulge>0 → 진행 방향 왼쪽으로 볼록) */
function outline(v){
  const P=v.map(p=>[p[0]/100,p[1]/100,(p[2]||0)/100]);const pts=[[P[0][0],P[0][1]]];
  for(let i=1;i<=P.length;i++){const j=i%P.length;const[x0,y0]=P[i-1],[x1,y1,b]=P[j];
    if(i===P.length&&x1===P[0][0]&&y1===P[0][1])break;const c=Math.hypot(x1-x0,y1-y0);
    if(b&&c>0){const th=4*Math.atan(Math.abs(b)),r=c/(2*Math.sin(th/2)),s=Math.abs(b)*c/2;
      const mx=(x0+x1)/2,my=(y0+y1)/2,dx=(x1-x0)/c,dy=(y1-y0)/c,side=b>0?1:-1,nx=-dy*side,ny=dx*side;
      const ax=mx+nx*s,ay=my+ny*s,cx=mx-nx*(r-s),cy=my-ny*(r-s),a0=Math.atan2(y0-cy,x0-cx);
      let d=th;const test=a=>Math.hypot(cx+r*Math.cos(a)-ax,cy+r*Math.sin(a)-ay);if(test(a0+d/2)>test(a0-d/2))d=-d;
      const n=Math.max(6,Math.ceil(th/0.12));for(let k=1;k<n;k++){const a=a0+d*k/n;pts.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}}
    pts.push([x1,y1])}
  if(pts.length>1){const a=pts[0],z=pts[pts.length-1];if(Math.abs(a[0]-z[0])<1e-6&&Math.abs(a[1]-z[1])<1e-6)pts.pop()}
  return pts}
/* 공간 → 다각형 목록 [[외곽, 구멍…], …](m). 편집기로 합친 매장은 rings(여러 조각, cm) */
function polysOf(d){
  if(Array.isArray(d.rings)&&d.rings.length)return d.rings.map(poly=>poly.map(r=>r.map(q=>[q[0]/100,q[1]/100])));
  return [[outline(d.v)]]}
const inPoly=(P,x,y)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
/* 라벨 위치: 라벨이 가장 크게 들어가는 내부 지점. fit: 1m당 글자 크기(em) 상한 */
function inner(pts,ems){
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const span=(x,y,h)=>{const q=[];for(let i=0,j=pts.length-1;i<pts.length;j=i++){const[ax,ay]=pts[j],[bx,by]=pts[i];
      if(h){if((ay>y)!==(by>y))q.push(ax+(y-ay)*(bx-ax)/(by-ay))}else{if((ax>x)!==(bx>x))q.push(ay+(x-ax)*(by-ay)/(bx-ax))}}
    q.sort((m,n)=>m-n);const c=h?x:y;for(let k=0;k+1<q.length;k+=2)if(q[k]<=c&&c<=q[k+1])return 2*Math.min(c-q[k],q[k+1]-c);return 0};
  let best=[(x0+x1)/2,(y0+y1)/2],bs=-1;const N=24;
  for(let i=1;i<N;i++)for(let k=1;k<N;k++){const x=x0+(x1-x0)*i/N,y=y0+(y1-y0)*k/N;if(!inPoly(pts,x,y))continue;
    const sc=Math.min(span(x,y,true)*0.9/Math.max(ems,1),span(x,y,false)*0.85/2.2);if(sc>bs){bs=sc;best=[x,y]}}
  const cands=[];for(let i=1;i<8;i++)for(let j=1;j<8;j++){const x=x0+(x1-x0)*i/8,y=y0+(y1-y0)*j/8;if(inPoly(pts,x,y))cands.push([x,y])}
  return {pt:best,fit:Math.max(bs,0.05),r:Math.min(span(best[0],best[1],true),span(best[0],best[1],false))/2,cands,bb:(x1-x0)*(y1-y0)}}
const bigOuter=polys=>polys.map(p=>p[0]).reduce((a,r)=>{const A=r=>{let s=0;for(let i=0,j=r.length-1;i<r.length;j=i++)s+=(r[j][0]*r[i][1]-r[i][0]*r[j][1]);return Math.abs(s/2)};return A(r)>A(a)?r:a});

function block(polys,h,color,opacity,edge){
  const T3=THREE_;const shapes=polys.map(([outer,...holes])=>{const s=new T3.Shape(outer.map(([x,y])=>new T3.Vector2(x,y)));
    holes.forEach(hl=>s.holes.push(new T3.Path(hl.map(([x,y])=>new T3.Vector2(x,y)))));return s});
  const geo=new T3.ExtrudeGeometry(shapes,{depth:h,bevelEnabled:false});geo.rotateX(-Math.PI/2);
  const mat=new T3.MeshLambertMaterial({color,transparent:opacity<1,opacity,depthWrite:opacity>=1});
  const mesh=new T3.Mesh(geo,mat);const edges=new T3.LineSegments(new T3.EdgesGeometry(geo,20),new T3.LineBasicMaterial({color:edge??0x333333}));
  const g=new T3.Group();g.add(mesh);g.add(edges);return {g,mesh,edges}}

/* 2D 채움색 → 3D 색: 2D 기본색이면 3D 기본색(진하게), 편집 채움색·히트맵 색이면 그대로 */
function color3(s){
  const cur=s.node&&s.node.style.fill,def=typeof COLORS!=='undefined'?COLORS[s.group]:null;
  if(!cur)return C3[s.group]||C3.etc;
  try{const a=new THREE_.Color(cur),b=def?new THREE_.Color(def):null;if(b&&a.getHex()===b.getHex())return C3[s.group]||C3.etc;return '#'+a.getHexString()}catch(e){return C3[s.group]||C3.etc}}

/* ---------- 장면 만들기(켤 때마다 지금 도면 상태로 새로 만든다) ---------- */
function disposeAll(){if(!root)return;root.traverse(o=>{o.geometry&&o.geometry.dispose();o.material&&(Array.isArray(o.material)?o.material.forEach(m=>m.dispose()):o.material.dispose())});
  scene.remove(root);root=null;labelsEl.innerHTML='';S3=[];flowLabels=[];facLabels=[];facPick=[];order=null}
function initScene(){
  const T3=THREE_=window.THREE;
  renderer=new T3.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
  box.prepend(renderer.domElement);
  scene=new T3.Scene();scene.background=new T3.Color(0xf3f5f8);
  camera=new T3.PerspectiveCamera(40,1,0.5,4000);
  controls=new T3.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*0.495;
  scene.add(new T3.HemisphereLight(0xffffff,0x9aa3ae,0.75));const sun=new T3.DirectionalLight(0xffffff,0.55);sun.position.set(-60,120,80);scene.add(sun);
  bindPick();ready=true}

function facList(){
  const FE=window.FloorplanEditor;let L=FE&&FE.state&&Array.isArray(FE.state.facs)?FE.state.facs:(typeof FACILITIES!=='undefined'?FACILITIES:SPACES.filter(s=>s.type!=='매장'));
  return L.map(f=>{if(f.kind===undefined&&typeof KIND==='function')f.kind=KIND(f);return f})}

function build(){
  const T3=THREE_;disposeAll();root=new T3.Group();scene.add(root);
  const stores=[...Plan.stores.values()],facs=facList();
  /* 범위 */
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const ext=(x,y)=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)};
  const SP=stores.map(s=>({s,polys:polysOf(s)})),FP=facs.map(f=>({f,polys:polysOf(f)}));
  SP.concat(FP).forEach(o=>o.polys.forEach(p=>p[0].forEach(([x,y])=>ext(x,y))));
  if(x0>x1){x0=y0=0;x1=y1=10}
  CX=(x0+x1)/2;CY=(y0+y1)/2;SPAN=Math.max(x1-x0,y1-y0,10);root.position.set(-CX,0,CY);
  const slab=new T3.Mesh(new T3.BoxGeometry(x1-x0+3,0.3,y1-y0+3),new T3.MeshLambertMaterial({color:0xe9ebee}));slab.position.set(CX,-0.16,-CY);root.add(slab);
  const grid=new T3.GridHelper(Math.ceil(SPAN/10)*10+20,Math.ceil(SPAN/10)+2,0xc9ced6,0xdde1e7);grid.position.set(CX,-0.32,-CY);root.add(grid);
  facGroup=new T3.Group();flowGroup=new T3.Group();root.add(facGroup);root.add(flowGroup);
  const P3=(x,y,h=0)=>new T3.Vector3(x/100,h,-y/100);

  /* 시설: 엘리베이터·계단·에스컬레이터 자리는 이동 시설(2D와 같이 '이동 시설' 체크박스) */
  const elev=f=>f.kind==='elev'||(f.kind===undefined&&/승강로|엘리베이|ELEV/i.test(f.space_nm||''));
  FP.forEach(({f,polys})=>{
    const outer=bigOuter(polys),name=(f.label||f.name||f.space_nm||'').replace(/^([A-Z]\d+|\d+F)_/,'');
    if(f.cov)return;   /* CAD 에스컬레이터 그림이 덮는 ESC 자리: 아래 에스컬레이터 상자로 그린다 */
    if(f.gen){const b=block(polys,0.9,0xaab4bf,1,0x3a4a5c);flowGroup.add(b.g);b.mesh.userData.fac=f;facPick.push({m:b.mesh,flow:true});
      const L=inner(outer,3);flowLabels.push({p:new T3.Vector3(L.pt[0],1.2,-L.pt[1]),t:f.kind==='walk'?'무빙워크':'E/S',c:''});return}
    if(elev(f)){const b=block(polys,H_FAC,0x7fa6dc,1,0x3a5f8f);flowGroup.add(b.g);b.mesh.userData.fac=f;facPick.push({m:b.mesh,flow:true});
      const L=inner(outer,2);flowLabels.push({p:new T3.Vector3(L.pt[0],H_FAC+0.3,-L.pt[1]),t:f.label||'EV',c:''});return}
    const stair=f.kind==='stair';
    const col=f.fill||(stair?'#b9bec6':f.type==='이동공간'||f.type==='후방동선'?'#e4e6ea':/서비스|라운지|사무실/.test(f.type||'')?'#dbe4ea':'#c9cdd3');
    const b=block(polys,stair?H_FAC:H_FAC,col,1,0x888888);(stair?flowGroup:facGroup).add(b.g);b.mesh.userData.fac=f;facPick.push({m:b.mesh,flow:stair});
    const L=inner(outer,emw(name));facLabels.push({x:L.pt[0],y:L.pt[1],fit:L.fit,t:name,a:L.bb,flow:stair})});
  facLabels.sort((a,b)=>b.a-a.a);

  /* 고객 이동 시설(FLOW): 보이드·에스컬레이터·출입문·회전문·출입구 배지 */
  const F=typeof FLOW!=='undefined'?FLOW:{esc:[],voids:[],doors:[],revolving:[]};
  (F.voids||[]).forEach(v=>{const pts=v.map(([x,y])=>P3(x,y,0.05));
    const ln=new T3.Line(new T3.BufferGeometry().setFromPoints([...pts,pts[0]]),new T3.LineDashedMaterial({color:0x7a8794,dashSize:0.8,gapSize:0.5}));ln.computeLineDistances();flowGroup.add(ln);
    if(pts.length>=4)flowGroup.add(new T3.LineSegments(new T3.BufferGeometry().setFromPoints([pts[0],pts[2],pts[1],pts[3]]),new T3.LineBasicMaterial({color:0xb8c0c8})));
    const g=new T3.ShapeGeometry(new T3.Shape(v.map(([x,y])=>new T3.Vector2(x/100,y/100))));g.rotateX(-Math.PI/2);
    const m=new T3.Mesh(g,new T3.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.85}));m.position.y=0.03;flowGroup.add(m);
    const cx=v.reduce((a,p)=>a+p[0],0)/v.length,cy=v.reduce((a,p)=>a+p[1],0)/v.length;flowLabels.push({p:P3(cx,cy,0.3),t:'OPEN (보이드)',c:''})});
  (F.esc||[]).forEach(e=>{const[a,b,c,d]=e.b,w=(c-a)/100,dp=(d-b)/100;if(w<=0||dp<=0)return;
    const m=new T3.Mesh(new T3.BoxGeometry(w,0.9,dp),new T3.MeshLambertMaterial({color:0xaab4bf}));m.position.copy(P3((a+c)/2,(b+d)/2,0.45));flowGroup.add(m);
    const eg=new T3.LineSegments(new T3.EdgesGeometry(m.geometry),new T3.LineBasicMaterial({color:0x3a4a5c}));eg.position.copy(m.position);flowGroup.add(eg);
    const st=[];const n=Math.floor((e.axis==='x'?w:dp)/0.45);for(let i=1;i<n;i++){const k=i/n;
      if(e.axis==='x'){const x=a+(c-a)*k;st.push(P3(x,b+20,0.91),P3(x,d-20,0.91))}else{const y=b+(d-b)*k;st.push(P3(a+20,y,0.91),P3(c-20,y,0.91))}}
    if(st.length)flowGroup.add(new T3.LineSegments(new T3.BufferGeometry().setFromPoints(st),new T3.LineBasicMaterial({color:0x6d7a88})));
    flowLabels.push({p:P3((a+c)/2,(b+d)/2,1.2),t:'E/S'+(e.lb?(/[▲▼]/.test(e.lb)?' '+e.lb:(e.dir==='DN'?' ▼ ':' ▲ ')+e.lb):e.dir==='UP'?' ▲UP':e.dir==='DN'?' ▼DN':''),c:''})});
  (F.doors||[]).forEach(([cx,cy,r,sa,ea,g])=>{let dd=ea-sa;while(dd<=0)dd+=2*Math.PI;const pts=[P3(cx,cy,0.06)];
    for(let i=0;i<=16;i++){const a=sa+dd*i/16;pts.push(P3(cx+r*Math.cos(a),cy+r*Math.sin(a),0.06))}
    flowGroup.add(new T3.Line(new T3.BufferGeometry().setFromPoints(pts),new T3.LineBasicMaterial({color:g?0xc8102e:0x8a8f96})))});
  (F.revolving||[]).forEach(o=>{const m=new T3.Mesh(new T3.CylinderGeometry(o.r/100,o.r/100,2.4,40,1,true),new T3.MeshLambertMaterial({color:0xc8102e,transparent:true,opacity:0.25,side:T3.DoubleSide}));
    m.position.copy(P3(o.x,o.y,1.2));flowGroup.add(m);const ring=new T3.LineSegments(new T3.EdgesGeometry(m.geometry),new T3.LineBasicMaterial({color:0xc8102e}));ring.position.copy(m.position);flowGroup.add(ring)});
  const eg={};(F.doors||[]).filter(d=>d[5]).forEach(d=>(eg[d[5]]??=[]).push([d[0],d[1]]));(F.revolving||[]).forEach(o=>o.g&&(eg[o.g]??=[]).push([o.x,o.y]));
  Object.entries(eg).forEach(([g,pts])=>{const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;flowLabels.push({p:P3(cx,cy,3.2),t:'출입구 · '+g,c:'ent'})});

  /* 매장: 상위 공간(더 작은 매장의 내부 지점을 품은 매장)은 낮은 판 */
  SP.forEach(o=>{o.outer=bigOuter(o.polys);o.ip=inner(o.outer,1)});
  SP.forEach(a=>{a.parent=SP.some(c=>c!==a&&c.ip.bb<a.ip.bb*0.9&&a.polys.some(p=>inPoly(p[0],c.ip.pt[0],c.ip.pt[1])))});
  SP.forEach(({s,polys,outer,parent})=>{
    const base=parent?H_PARENT:H_STORE,b=block(polys,base,color3(s),0.92);root.add(b.g);
    const name=typeof s.label==='string'&&s.label?s.label:s.name,code=s.shop_cd;
    const o={s,id:s.id,mesh:b.mesh,edges:b.edges,g:b.g,base,h:base,name,code,lpCode:inner(outer,code?Math.max(emw(name),emw(`(${code})`)*0.78):emw(name))};
    o.lpName=code?inner(outer,emw(name)):o.lpCode;b.mesh.userData.s3=o;
    o.el=document.createElement('div');o.el.className='lb';o.show=!!(code||s.edited||!isCode(s.name));labelsEl.appendChild(o.el);S3.push(o)});
  flowLabels.forEach(f=>{f.el=document.createElement('div');f.el.className='fl '+f.c;f.el.textContent=f.t;labelsEl.appendChild(f.el)});
  facLabels.forEach(f=>{f.el=document.createElement('div');f.el.className='fc';f.el.textContent=f.t;labelsEl.appendChild(f.el)});
  applyCode();applyToggles();syncStyle()}

/* ---------- 2D 상태와 맞추기 ---------- */
function applyCode(){const on=!!Plan.showCode;S3.forEach(o=>{o.lp=on&&o.code?o.lpCode:o.lpName;o.el.innerHTML=on&&o.code?`${esc(o.name)}<small>(${esc(o.code)})</small>`:esc(o.name)});order=null}
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function applyToggles(){if(!root)return;facGroup.visible=chk('toggleFac');flowGroup.visible=chk('toggleFlow');labelsEl.style.display=chk('toggleLbl')?'':'none';
  flowLabels.forEach(f=>f.el.style.display=flowGroup.visible?'':'none');facLabels.forEach(f=>{if(!(f.flow?flowGroup.visible:facGroup.visible))f.el.style.display='none'})}
function syncStyle(){const sel=Plan.selected&&Plan.selected.id;
  S3.forEach(o=>{const n=o.s.node,dim=!!n&&n.classList.contains('dim'),on=o.id===sel;
    o.mesh.material.color.set(color3(o.s));o.mesh.material.opacity=dim?0.25:0.92;o.el.style.opacity=dim?0.3:1;
    o.edges.material.color.set(on?0xc8102e:0x333333);o.mesh.material.emissive.set(on?0x330000:0x000000)})}

/* ---------- 선택·툴팁 ---------- */
function bindPick(){
  const T3=THREE_,ray=new T3.Raycaster(),mouse=new T3.Vector2(),cv=renderer.domElement;let downAt=null;
  const pick=e=>{const r=cv.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(mouse,camera);
    const objs=S3.map(o=>o.mesh).concat(facPick.filter(p=>p.flow?flowGroup.visible:facGroup.visible).map(p=>p.m));
    const h=ray.intersectObjects(objs,false)[0];return h&&h.object.userData};
  cv.addEventListener('pointerdown',e=>downAt=[e.clientX,e.clientY]);
  cv.addEventListener('pointerup',e=>{if(!downAt||Math.hypot(e.clientX-downAt[0],e.clientY-downAt[1])>4)return;const u=pick(e);if(u&&u.s3)Plan.select(u.s3.id)});
  cv.addEventListener('dblclick',e=>{const u=pick(e);if(u&&u.s3)focus3(u.s3.id)});
  cv.addEventListener('pointermove',e=>{if(e.buttons)return Plan.tip(null);const u=pick(e);
    if(u&&u.s3){const s=u.s3.s;Plan.tip(e,u.s3.name+(s.shop_cd?` (${s.shop_cd})`:''))}else if(u&&u.fac)Plan.tip(e,`${u.fac.name||u.fac.space_nm} · ${u.fac.type}`);else Plan.tip(null);
    cv.style.cursor=u&&u.s3?'pointer':''});
  cv.addEventListener('pointerleave',()=>Plan.tip(null))}

/* ---------- 카메라 ---------- */
function setView(v,anim=true){
  const asp=camera.aspect||1.33,d=SPAN*0.8*Math.max(1,1.33/asp);let pos;
  const fitH=Math.max(SPAN*0.58,SPAN*0.55/asp)/Math.tan(camera.fov*Math.PI/360);
  if(v==='top')pos=[0,fitH,0.01];else if(v==='front')pos=[0,d*0.25,d*1.2];else pos=[-d*0.4,d*0.75,d*0.95];
  tween(pos,[0,0,0],anim)}
function tween(pos,target,anim){const T3=THREE_,p0=camera.position.clone(),t0=controls.target.clone(),p1=new T3.Vector3(...pos),t1=new T3.Vector3(...target);
  if(!anim){camera.position.copy(p1);controls.target.copy(t1);tw=null;return}const st=performance.now();
  tw=()=>{const k=Math.min(1,(performance.now()-st)/600),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;camera.position.lerpVectors(p0,p1,e);controls.target.lerpVectors(t0,t1,e);if(k>=1)tw=null}}
function zoom(f){const off=camera.position.clone().sub(controls.target);off.setLength(Math.min(SPAN*6,Math.max(5,off.length()/f)));tween(controls.target.clone().add(off).toArray(),controls.target.toArray(),true)}
function focus3(id){const o=S3.find(o=>o.id===id);if(!o)return;const c=o.lp.pt,tx=c[0]-CX,tz=-(c[1]-CY),d=Math.max(25,o.lp.r*10);
  tween([tx-d*0.3,d*0.9,tz+d*0.8],[tx,0,tz],true);Plan.select(id)}

/* ---------- 크기 ---------- */
function place(){const pr=host.getBoundingClientRect(),r=plan.getBoundingClientRect();
  box.style.left=(r.left-pr.left-host.clientLeft)+'px';box.style.top=(r.top-pr.top-host.clientTop)+'px';box.style.width=r.width+'px';box.style.height=r.height+'px';
  if(renderer&&r.width>0&&r.height>0){renderer.setSize(r.width-2,r.height-2);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()}}
const ro=window.ResizeObserver?new ResizeObserver(()=>active&&place()):null;ro&&ro.observe(plan);window.addEventListener('resize',()=>active&&place());

/* ---------- 렌더 루프 + 라벨(매장명은 자기 매장 위, 이웃 라벨과 겹치지 않게) ---------- */
const MIN3=6,FAC3_MIN=9,FAC3_MAX=13;
function loop(){if(!active){raf=0;return}raf=requestAnimationFrame(loop);tw&&tw();controls.update();renderer.render(scene,camera);
  if(labelsEl.style.display==='none')return;const T3=THREE_,w=renderer.domElement.clientWidth,h=renderer.domElement.clientHeight,v3=new T3.Vector3();
  if(!order)order=S3.filter(o=>o.show).sort((a,b)=>b.lp.r-a.lp.r);
  const dist=camera.position.distanceTo(controls.target),pxPerM=h/(2*Math.tan(camera.fov*Math.PI/360)*dist);
  const put=(el,x,y)=>{el.style.left=x+'px';el.style.top=y+'px'};
  const prj=(x,y,z)=>{v3.set(x-CX,y,-(z-CY));v3.project(camera);return v3.z<1&&Math.abs(v3.x)<1.05&&Math.abs(v3.y)<1.05?[(v3.x+1)/2*w,(1-v3.y)/2*h]:null};
  S3.forEach(o=>{if(!o.show)o.el.style.display='none'});
  const S=[];order.forEach(o=>{const p=prj(o.lp.pt[0],o.h+0.2,o.lp.pt[1]);o.el.style.display=p?'':'none';if(!p)return;
    put(o.el,p[0],p[1]);const fs=Math.max(MIN3,Math.min(22,o.lp.fit*pxPerM*1.25));o.el.style.fontSize=fs+'px';S.push({el:o.el,x:p[0],y:p[1],fs,o})});
  const FL=[];if(flowGroup.visible)flowLabels.forEach(f=>{v3.copy(f.p);v3.x-=CX;v3.z+=CY;v3.project(camera);const vis=v3.z<1&&Math.abs(v3.x)<1.05&&Math.abs(v3.y)<1.05;
    f.el.style.display=vis?'':'none';if(vis){const x=(v3.x+1)/2*w,y=(1-v3.y)/2*h;put(f.el,x,y);FL.push({el:f.el,x,y,ent:f.c==='ent'})}});
  S.forEach(o=>{o.w0=o.el.offsetWidth/o.fs;o.h0=o.el.offsetHeight/o.fs});FL.forEach(o=>{o.w=o.el.offsetWidth;o.h=o.el.offsetHeight});
  const ov=(a,b)=>a[0]<b[2]+1&&b[0]<a[2]+1&&a[1]<b[3]+1&&b[1]<a[3]+1,at=(o,x,y,fs)=>[x-o.w0*fs/2,y-o.h0*fs/2,x+o.w0*fs/2,y+o.h0*fs/2];
  const placed=[];
  S.forEach(o=>{const s=o.o,lp=s.lp.pt;
    const C=[[o.x,o.y]].concat(s.lp.cands.slice().sort((p,q)=>Math.hypot(p[0]-lp[0],p[1]-lp[1])-Math.hypot(q[0]-lp[0],q[1]-lp[1])).slice(0,16).map(([px,py])=>prj(px,s.h+0.2,py)).filter(Boolean));
    const N=[];for(const r of [8,16,26,40])for(let q=0;q<12;q++){const an=2*Math.PI*q/12;N.push([o.x+Math.cos(an)*r*1.6,o.y+Math.sin(an)*r])}
    let got=null;for(const L of [C,N]){for(let fs=o.fs;!got;fs*=0.88){const f=Math.max(MIN3,fs);for(const[x,y]of L){const b=at(o,x,y,f);if(!placed.some(a=>ov(a,b))){got=[x,y,f,b];break}}if(f<=MIN3)break}if(got)break}
    if(!got)got=[o.x,o.y,MIN3,at(o,o.x,o.y,MIN3)];[o.x,o.y,o.fs,o.b]=got;put(o.el,o.x,o.y);placed.push(o.b)});
  const fixed=[];FL.forEach(o=>{const B=(x,y)=>[x-o.w/2,y-o.h/2,x+o.w/2,y+o.h/2];if(o.ent){fixed.push(B(o.x,o.y));return}
    for(const[dx,dy]of [[0,0],[0,-14],[0,14],[-22,0],[22,0]]){const b=B(o.x+dx,o.y+dy);if(!placed.some(a=>ov(a,b))&&!fixed.some(a=>ov(a,b))){put(o.el,o.x+dx,o.y+dy);fixed.push(b);return}}
    o.el.style.display='none'});
  S.forEach(o=>{if(o.fs>=12)return;for(const fs of [12,10,8]){if(fs<=o.fs)break;const b=at(o,o.x,o.y,fs);if(!S.some(p=>p!==o&&ov(p.b,b))&&!fixed.some(a=>ov(a,b))){o.fs=fs;o.b=b;break}}});
  S.forEach(o=>{o.el.style.fontSize=o.fs.toFixed(1)+'px'});
  const all=S.map(o=>o.b).concat(fixed);
  facLabels.forEach(f=>{const vis0=f.flow?flowGroup.visible:facGroup.visible;if(!vis0){f.el.style.display='none';return}
    const p=prj(f.x,H_FAC+0.15,f.y);if(!p){f.el.style.display='none';return}f.el.style.display='';put(f.el,p[0],p[1]);
    f.el.style.fontSize=Math.min(FAC3_MAX,Math.max(FAC3_MIN,f.fit*pxPerM*1.25)).toFixed(1)+'px';
    const bw=f.el.offsetWidth,bh=f.el.offsetHeight,b=[p[0]-bw/2,p[1]-bh/2,p[0]+bw/2,p[1]+bh/2];if(all.some(a=>ov(a,b))){f.el.style.display='none';return}all.push(b)})}

/* ---------- 켜기/끄기 ---------- */
function setBtns(on){btn.textContent=on?'2D 보기':'3D 보기';btn.classList.toggle('on',on);const t=$('fp3dTb');t&&t.classList.toggle('on',on)}
function msg(t){let m=box.querySelector('.msg');if(!t){m&&m.remove();return}if(!m){m=document.createElement('div');m.className='msg';box.appendChild(m)}m.innerHTML=t}
async function open(){
  if(active)return;
  if(document.body.classList.contains('editing')){const t=$('edToggle');t&&t.click()}   /* 아이디어 모드는 끄고 3D로 */
  active=true;document.body.classList.add('fp3d');setBtns(true);addTbBtn();box.style.display='block';place();Plan.tip(null);
  if(!ready){msg('3D 모형을 준비하는 중…');
    try{await loadLib()}catch(e){msg('3D 라이브러리(three.js)를 불러오지 못했습니다.<br>인터넷(cdn.jsdelivr.net) 연결을 확인해 주세요.');return}
    if(!active)return;msg(null);initScene();place()}
  build();setView('persp',false);if(!raf)loop()}
function close(){if(!active)return;active=false;document.body.classList.remove('fp3d');setBtns(false);box.style.display='none';msg(null);Plan.tip(null);
  Plan.minFont&&requestAnimationFrame(()=>Plan.minFont())}
function toggle(){active?close():open()}

/* ---------- 2D 쪽과 연결 ---------- */
box.querySelector('.vbar').addEventListener('click',e=>{const v=e.target.dataset&&e.target.dataset.v;if(!v)return;if(v==='2d')return close();if(ready)setView(v)});
/* 확대·축소·전체보기(헤더 버튼·편집기 도구 막대): 3D를 켠 동안은 3D 시점에 적용 */
document.addEventListener('click',e=>{if(!active||!ready)return;const b=e.target.closest&&e.target.closest('#zoomctl [data-z]');if(!b)return;
  e.stopPropagation();e.preventDefault();const z=b.dataset.z;if(z==='in')zoom(1.4);else if(z==='out')zoom(1/1.4);else setView('persp')},true);
['toggleFac','toggleFlow','toggleLbl'].forEach(id=>{const e=$(id);e&&e.addEventListener('change',()=>active&&ready&&applyToggles())});
{const e=$('toggleCode');e&&e.addEventListener('change',()=>setTimeout(()=>{if(active&&ready)applyCode()},0))}
Plan.on('select',()=>{if(active&&ready)syncStyle()});
Plan.on('update',()=>{if(active&&ready)build()});
/* 히트맵·강조·색 되돌리기도 3D에 반영(2D 함수는 그대로 실행) */
['heatmap','highlight','resetColors'].forEach(k=>{const f0=Plan[k];if(typeof f0!=='function')return;Plan[k]=function(){const r=f0.apply(this,arguments);if(active&&ready)syncStyle();return r}});
{const f0=Plan.focus;Plan.focus=function(id){if(active&&ready)return focus3(id);return f0&&f0.apply(this,arguments)}}

window.FP3D={version:'20261112',open,close,toggle,get active(){return active},
  view:v=>ready&&setView(v),zoom:f=>ready&&zoom(f),focus:id=>ready&&focus3(id),rebuild:()=>active&&ready&&build(),
  heightmap(values,maxH=12){if(!ready)return;const v=Object.values(values),mx=Math.max(...v);S3.forEach(o=>{const x=values[o.code]??values[o.id];o.h=x==null?o.base:Math.max(0.5,maxH*x/mx);o.g.scale.y=o.h/o.base})},
  resetHeight(){S3.forEach(o=>{o.h=o.base;o.g.scale.y=1})},
  get scene(){return scene},get camera(){return camera}};
})();
