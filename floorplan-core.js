/*!
 * floorplan-core.js  v20261112
 * 수정: 2026-11-12 (KST) — 고칠 때마다 이 시각을 바꾼다
 * 신세계 공간관리시스템 층별 도면(HTML) 공통 코드: 좌표 변환·매장/시설/이동 시설 그리기·라벨 배치·확대/축소·Plan API
 *  - 도면 HTML에는 헤더·도면 데이터(SPACES·FLOW)만 두고, 그리는 코드는 모두 이 파일에서 가져온다
 *  - 선언(const·function·class)은 전역에 둔다: floorplan-editor.js·floorplan-3d.js 가 이 이름들을 그대로 쓴다(labelPoint·layout·Store·Plan 등)
 * 사용: 도면 HTML에서 데이터 스크립트(SPACES·FLOW) 다음, floorplan-editor.js 앞에 넣는다.
 *   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/starroooot/report-styles@main/floorplan.css?v=20261112">
 *   <script>const SPACES = [...]; const FLOW = {...};<\/script>
 *   <script src="https://cdn.jsdelivr.net/gh/starroooot/report-styles@main/floorplan-core.js?v=20261112"><\/script>
 */
window.FLOORPLAN_CORE='20261112';
const COLORS={lux:'#f6e3cf',rtw:'#e1ecdc',jw:'#e6def3',acc:'#fde0c8',etc:'#e8eef6',vacant:'#f2f4f7'};
const NS='http://www.w3.org/2000/svg';
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const txt=(p,x,y,s,size,w,fill)=>{const t=el('text',{x,y,'font-size':size,'font-weight':w||400,fill:fill||'#222',class:'lbl'},p);t.textContent=s;return t};

/* 좌표 변환: Y 뒤집기 */
let minX=1e9,minY=1e9,maxX=-1e9,maxY=-1e9;
SPACES.forEach(s=>s.v.forEach(([x,y])=>{minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y)}));
FLOW.esc.forEach(e=>{minX=Math.min(minX,e.b[0]);maxX=Math.max(maxX,e.b[2])});FLOW.voids.flat().forEach(([x])=>{minX=Math.min(minX,x);maxX=Math.max(maxX,x)});
FLOW.revolving.forEach(r=>{maxX=Math.max(maxX,r.x+r.r);maxY=Math.max(maxY,r.y+r.r)});FLOW.doors.forEach(d=>{maxX=Math.max(maxX,d[0]+d[2]);maxY=Math.max(maxY,d[1]+d[2]);minY=Math.min(minY,d[1]-d[2])});
const T=([x,y])=>[x,maxY-y];
const PAD=250;
/* bulge 포함 경로 생성 */
function pathOf(v){
  const P=v.map(p=>T(p));let d=`M${P[0][0]},${P[0][1]}`;
  for(let i=1;i<=v.length;i++){
    const j=i%v.length,[x,y]=P[j],[px,py]=P[i-1],b=(v[j][2]||0)/100;
    if(i===v.length&&x===P[0][0]&&y===P[0][1]&&j===0){break}
    const c=Math.hypot(x-px,y-py);
    if(b&&c>0){const th=4*Math.atan(Math.abs(b)),r=c/(2*Math.sin(th/2));
      d+=` A${r.toFixed(1)},${r.toFixed(1)} 0 ${Math.abs(b)>1?1:0} ${b>0?0:1} ${x},${y}`}  /* Y축 반전 후: bulge>0 → sweep 0 */
    else d+=` L${x},${y}`;
  }
  return d+'Z';
}
/* 라벨 위치: 글자가 가장 크게 들어가는 내부 지점(그리드 탐색)
   ems1/ems2: 한 줄·두 줄 라벨의 대략적 폭(em). 생략하면 내접원이 가장 큰 지점 */
const emw=s=>[...s].reduce((a,c)=>a+(/[가-힣]/.test(c)?1:0.62),0);
function labelPoint(node,v,ems1,ems2){
  /* 곡선(bulge)까지 반영하려고 실제 path를 따라 점을 샘플링 */
  let P=v.map(T);if(v.some(p=>p[2])){const L=node.getTotalLength(),n=Math.max(60,v.length*12);P=[];for(let i=0;i<n;i++){const q=node.getPointAtLength(L*i/n);P.push([q.x,q.y])}}
  const bb={x0:Math.min(...P.map(p=>p[0])),x1:Math.max(...P.map(p=>p[0])),y0:Math.min(...P.map(p=>p[1])),y1:Math.max(...P.map(p=>p[1]))};
  const inside=(x,y)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c};
  const dist=(x,y)=>{let m=1e9;for(let i=0,j=P.length-1;i<P.length;j=i++){const[ax,ay]=P[j],[bx,by]=P[i],dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;let t=l?((x-ax)*dx+(y-ay)*dy)/l:0;t=Math.max(0,Math.min(1,t));m=Math.min(m,Math.hypot(x-ax-t*dx,y-ay-t*dy))}return m};
  /* 라벨 중심 기준 양쪽 중 좁은 쪽 ×2 (가로/세로) */
  const span=(x,y,horiz)=>{const xs=[];for(let i=0,j=P.length-1;i<P.length;j=i++){const[ax,ay]=P[j],[bx,by]=P[i];
      if(horiz){if((ay>y)!==(by>y))xs.push(ax+(y-ay)*(bx-ax)/(by-ay))}else{if((ax>x)!==(bx>x))xs.push(ay+(x-ax)*(by-ay)/(bx-ax))}}
    xs.sort((m,n)=>m-n);const c=horiz?x:y;for(let k=0;k+1<xs.length;k+=2)if(xs[k]<=c&&c<=xs[k+1])return 2*Math.min(c-xs[k],xs[k+1]-c);return 0};
  let best=[(bb.x0+bb.x1)/2,(bb.y0+bb.y1)/2],bs=-1,br=0;const N=28;
  for(let i=1;i<N;i++)for(let k=1;k<N;k++){const x=bb.x0+(bb.x1-bb.x0)*i/N,y=bb.y0+(bb.y1-bb.y0)*k/N;if(!inside(x,y))continue;
    const r=dist(x,y);let sc=r;
    if(ems1){const hs=span(x,y,true)*0.88,vs=span(x,y,false)*0.8;sc=Math.max(Math.min(hs/ems1,vs),ems2?Math.min(hs/ems2,vs/2.3):0)}
    if(sc>bs){bs=sc;best=[x,y];br=r}}
  return {pt:best,w:bb.x1-bb.x0,h:bb.y1-bb.y0,r:br,hs:span(best[0],best[1],true)||2*br,vs:span(best[0],best[1],false)||2*br};
}

/* ===== 시설(매장 외 공간) ===== */
const FL=document.getElementById('fac-layer'),FT=document.getElementById('fac-label');
const FACILITIES=SPACES.filter(s=>s.type!=='매장');
/* 엘리베이터·계단·에스컬레이터 자리는 이동 시설: 매장 아래 flow-base에 그리고 '이동 시설' 체크박스로 켜고 끈다(구분은 아래 KIND) */
/* 이동 시설 구분(3D build.py 의 kind_of 와 같은 규칙): 엘리베이터 ELEV·E/L·E/V·EL, 에스컬레이터 ESC·E/S·에스컬, 무빙워크 M/W, 계단.
   홀·전실·기계실·PIT·'옆'·통로 등 주변 공간은 시설로 둔다('계단(전실포함)' 은 계단) */
const NOT_MOVE=/HALL|홀|전실|기계실|PIT|P\/T|옆|통로|입구|앞|동선|화장실|대기/i;
const KIND=s=>{const n=s.space_nm||'';
  if(/(?<![A-Z])ESC(?![A-Z])|에스컬|E\/S|(?<![A-Z])ES(?![A-Z])/i.test(n)&&!/기계실|PIT|화장실/i.test(n))return 'esc';
  if(/계단|STAIR/i.test(n)&&(!NOT_MOVE.test(n)||/포함/.test(n)))return 'stair';
  if(NOT_MOVE.test(n))return null;
  if(/승강로|엘리베이|ELEV|E\/L|E\/V|(?<![A-Z])E[LV](?![A-Z])/i.test(n))return 'elev';
  if(/무빙|MOVING|M\/W/i.test(n))return 'walk';return null};
const IS_ELEV=s=>KIND(s)==='elev';
/* 도면 선(FLOW)에 에스컬레이터가 없는 ESC·무빙워크 공간(홀 제외)은 공간 모양 그대로 에스컬레이터로 그린다(아래 '고객 이동 시설') */
const escCov=f=>{const xs=f.v.map(p=>p[0]),ys=f.v.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),a=(x1-x0)*(y1-y0)||1;
  return FLOW.esc.reduce((t,e)=>t+Math.max(0,Math.min(x1,e.b[2])-Math.max(x0,e.b[0]))*Math.max(0,Math.min(y1,e.b[3])-Math.max(y0,e.b[1])),0)/a};
FACILITIES.forEach(f=>{f.kind=KIND(f);const e=(f.kind==='esc'||f.kind==='walk')&&!/HALL|홀/i.test(f.space_nm),c=e?escCov(f):0;f.gen=e&&c<0.3;f.cov=e&&c>=0.3});   /* gen: 공간 모양으로 그림, cov: CAD 에스컬레이터 그림이 덮음 */
const EB=document.getElementById('flow-base'),EL=document.getElementById('flow-layer');
FACILITIES.forEach(f=>{if(f.gen)return;const ev=IS_ELEV(f),mv=ev||f.kind==='stair'||f.cov;const cls=f.kind==='stair'?'fac stair':ev?'fac elev':f.type==='이동공간'||f.type==='후방동선'?'fac move':/서비스|라운지|사무실/.test(f.type)?'fac svc':'fac';
  f.node=el('path',{d:pathOf(f.v),class:cls},mv?EB:FL);   /* 엘리베이터·계단·CAD 에스컬레이터 자리는 이동 시설(flow-base) */
  const L=labelPoint(f.node,f.v);const size=Math.min(70,Math.max(22,L.r*0.55));
  /* 시설 이름은 앞 코드(C5_·A1_·6F_ 등)를 떼고 짧게 쓴다(툴팁에는 전체 이름) */
  if(!f.cov){const t=txt(mv?EL:FT,L.pt[0],L.pt[1],ev?'EV':f.space_nm.replace(/^([A-Z]\d+|\d+F)_/,''),ev?Math.max(size,40):size,ev?700:0,ev?'#2f4f7a':'#555');t.dataset.a=L.w*L.h}   /* CAD 에스컬레이터 자리는 그림의 E/S 글자만 쓴다 */
  f.node.addEventListener('mousemove',e=>Plan.tip(e,`${f.space_nm} · ${f.type}`));f.node.addEventListener('mouseleave',()=>Plan.tip(null));
});

/* ===== 고객 이동 시설 ===== */
/* 도형(에스컬레이터·보이드·출입문)은 매장 아래(flow-base)에, 글자·회전문·배지는 위(flow-layer)에 그린다.
   CAD 에스컬레이터 범위는 옆 매장 안쪽까지 겹치는 경우가 많아, 위에 그리면 실제보다 크게 보인다(3D에서는 매장 블록이 가려 줌). */
const FW=document.getElementById('flow-layer'),FB=document.getElementById('flow-base');
FLOW.voids.forEach(v=>{const P=v.map(T);el('polygon',{points:P.map(p=>p.join(',')).join(' '),class:'void'},FB);
  const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  el('line',{x1:x0,y1:y0,x2:x1,y2:y1,class:'void-x'},FB);el('line',{x1:x0,y1:y1,x2:x1,y2:y0,class:'void-x'},FB);
  const t=el('text',{x:(x0+x1)/2,y:(y0+y1)/2,'font-size':90,fill:'#7a8794',class:'flbl'},FW);t.textContent='OPEN (보이드)'});
FLOW.esc.forEach(e=>{const[a,b]=[T([e.b[0],e.b[3]]),T([e.b[2],e.b[1]])],x=a[0],y=a[1],w=b[0]-a[0],h=b[1]-a[1];
  el('rect',{x,y,width:w,height:h,class:'esc'},FB);
  if(e.axis==='x'){for(let s=x+45;s<x+w-20;s+=45)el('line',{x1:s,y1:y+30,x2:s,y2:y+h-30,class:'esc-step'},FB)}
  else{for(let s=y+45;s<y+h-20;s+=45)el('line',{x1:x+30,y1:s,x2:x+w-30,y2:s,class:'esc-step'},FB)}
  const lb=el('text',{x:x+w/2,y:y+h/2,'font-size':Math.min(110,h*0.45),fill:'#1f2d3d',class:'flbl'},FW);lb.textContent='E/S'+(e.lb?(/[▲▼]/.test(e.lb)?' '+e.lb:(e.dir==='DN'?' ▼ ':' ▲ ')+e.lb):e.dir==='UP'?' ▲UP':e.dir==='DN'?' ▼DN':'')  /* lb: 층간 표기(예: 2F→3F) */;
  lb.setAttribute('paint-order','stroke');lb.setAttribute('stroke','#fff');lb.setAttribute('stroke-width',18)});
/* ESC 공간으로 만든 에스컬레이터: 공간 윤곽 + 긴 변 방향 디딤판 줄(기울어진 공간도 방향을 따름) */
FACILITIES.filter(f=>f.gen).forEach(f=>{const P=f.v.map(p=>[p[0],p[1]]);let best=null;
  for(let i=0;i<P.length;i++){const[a,b]=P[i],[c,d]=P[(i+1)%P.length];if(Math.hypot(c-a,d-b)<5)continue;const t=Math.atan2(d-b,c-a),co=Math.cos(t),si=Math.sin(t);
    let u0=1e9,u1=-1e9,v0=1e9,v1=-1e9;P.forEach(([x,y])=>{const u=x*co+y*si,v=-x*si+y*co;u0=Math.min(u0,u);u1=Math.max(u1,u);v0=Math.min(v0,v);v1=Math.max(v1,v)});
    const ar=(u1-u0)*(v1-v0);if(!best||ar<best.ar-1e-6)best={ar,t,u0,u1,v0,v1}}
  if(!best)return;let{t,u0,u1,v0,v1}=best;if(u1-u0<v1-v0){t+=Math.PI/2;[u0,u1,v0,v1]=[v0,v1,-u1,-u0]}
  const co=Math.cos(t),si=Math.sin(t),W=(q,r)=>T([q*co-r*si,q*si+r*co]);
  const nd=el('path',{d:pathOf(f.v),class:'esc'},FB);   /* f.node 에 넣지 않는다(아이디어 모드가 시설 도형을 지우고 다시 그림) */
  for(let s=u0+45;s<u1-20;s+=45){const p=W(s,v0+30),q=W(s,v1-30);el('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],class:'esc-step'},FB)}
  const c=W((u0+u1)/2,(v0+v1)/2);const lb=el('text',{x:c[0],y:c[1],'font-size':Math.min(110,(v1-v0)*0.45),fill:'#1f2d3d',class:'flbl'},FW);lb.textContent=f.kind==='walk'?'무빙워크':'E/S';
  lb.setAttribute('paint-order','stroke');lb.setAttribute('stroke','#fff');lb.setAttribute('stroke-width',18);
  nd.addEventListener('mousemove',e=>Plan.tip(e,`${f.space_nm} · ${f.kind==='walk'?'무빙워크':'에스컬레이터'}`));nd.addEventListener('mouseleave',()=>Plan.tip(null))});
FLOW.doors.forEach(([cx,cy,r,sa,ea,g])=>{let d=ea-sa;while(d<=0)d+=2*Math.PI;
  const p0=T([cx+r*Math.cos(sa),cy+r*Math.sin(sa)]),p1=T([cx+r*Math.cos(ea),cy+r*Math.sin(ea)]),c=T([cx,cy]);
  el('path',{d:`M${c[0]},${c[1]} L${p0[0]},${p0[1]} A${r},${r} 0 ${d>Math.PI?1:0} 0 ${p1[0]},${p1[1]}`,class:'door'+(g?' ent':'')},FB)});
FLOW.revolving.forEach(o=>{const c=T([o.x,o.y]);el('circle',{cx:c[0],cy:c[1],r:o.r,class:'rev'},FW);
  [0,120,240].forEach(a=>{const q=a*Math.PI/180;el('line',{x1:c[0],y1:c[1],x2:c[0]+o.r*Math.cos(q),y2:c[1]+o.r*Math.sin(q),stroke:'#c8102e','stroke-width':8},FW)})});
/* 출입구 배지: 같은 출입구 이름끼리 묶어 한 번만 표시 */
const groups={};FLOW.doors.filter(d=>d[5]).forEach(d=>(groups[d[5]]??=[]).push([d[0],d[1]]));FLOW.revolving.forEach(o=>(groups[o.g]??=[]).push([o.x,o.y]));
Object.entries(groups).forEach(([g,pts])=>{const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;const[x,y]=T([cx,cy]);
  const name='출입구 · '+g;const w=emw(name)*85+80;el('rect',{x:x-w/2,y:y-260,width:w,height:130,rx:65,class:'badge'},FW);
  const t=el('text',{x,y:y-195,'font-size':85,class:'badge-t'},FW);t.textContent=name});
document.getElementById('toggleFlow').onchange=e=>{['flow-layer','flow-base'].forEach(id=>document.getElementById(id).classList.toggle('hidden',!e.target.checked));Plan.minFont&&Plan.minFont()};

/* ===== 매장 객체 ===== */
/* 공간 식별용 코드 이름: 점포번호_구분_층_일련번호 (14_백화_2F_0077, 16_백화_B2_0014, 14_스위_B1_0006, 16_주차_8F_0032 등) */
const IS_CODE_NM=n=>/^[A-Z0-9]+_[^_]+_[A-Z0-9]+_\d+$/.test(n||'');
class Store{
  constructor(d){Object.assign(this,d);this.id=d.space_id}
  render(layer,labels){
    this.node=el('path',{d:pathOf(this.v),class:'store','data-id':this.id},layer);this.node.style.fill=COLORS[this.group];
    this.labels=labels;if(this.shop_cd||!IS_CODE_NM(this.name))this.layoutLabel();  /* 매장코드 미매핑 공간 중 이름이 공간 식별 코드(예: 14_백화_2F_0077)인 곳만 도면에 이름을 쓰지 않는다(툴팁·목록에는 표시). '팝업'·'SPA ROOM'처럼 목적이 있는 이름은 표시 */
    this.node.addEventListener('click',()=>Plan.select(this.id));
    this.node.addEventListener('mousemove',e=>Plan.tip(e,this.name+(this.shop_cd?` (${this.shop_cd})`:'')));
    this.node.addEventListener('mouseleave',()=>Plan.tip(null));
  }
  layoutLabel(){
    const labels=this.labels;if(this.labelEl){this.labelEl.remove();this.labelEl=null;this.fitSize=0}
    const code=Plan.showCode?this.shop_cd:null;
    this.labelText=code?`${this.name}(${code})`:this.name;
    const L=labelPoint(this.node,this.v,emw(this.labelText),code?Math.max(emw(this.name),emw(`(${code})`)):0),[x,y]=L.pt;this.lpt=L.pt;
    /* 글자 맞추기: 라벨 지점의 실제 가로·세로 폭 안에 들어가도록 */
    const W=L.hs*0.88,H=L.vs*0.8,base=Math.min(150,H*0.45);
    const t=txt(labels,x,y,this.labelText,base,700);this.labelEl=t;
    requestAnimationFrame(()=>{
      const one=Math.min(base,H,base*W/t.getBBox().width);        /* 한 줄일 때 가능한 크기 */
      let two=0;if(code){t.textContent=this.name;const w1=t.getBBox().width;t.textContent=`(${code})`;const w2=t.getBBox().width;
        two=Math.min(base,H/2.3,base*W/Math.max(w1,w2))}               /* 두 줄일 때 가능한 크기 */
      if(two>one*1.15){t.textContent='';t.setAttribute('font-size',two.toFixed(1));
        el('tspan',{x,dy:-two*0.55},t).textContent=this.name;el('tspan',{x,dy:two*1.1},t).textContent=`(${code})`}
      else{t.textContent=this.labelText;t.setAttribute('font-size',Math.max(14,one).toFixed(1))}
      /* 최종 점검: 글자 상자 네 모서리가 매장 안에 들어올 때까지 축소 */
      const svgEl=this.node.ownerSVGElement,p=svgEl.createSVGPoint();
      const fits=()=>{const b=t.getBBox();return [[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].every(([px,py])=>{p.x=px;p.y=py;return this.node.isPointInFill(p)})};
      const resize=f=>{const s=+t.getAttribute('font-size')*f;t.setAttribute('font-size',s.toFixed(1));t.querySelectorAll('tspan').forEach((ts,i)=>ts.setAttribute('dy',i?s*1.1:-s*0.55))};
      for(let k=0;k<30&&!fits()&&+t.getAttribute('font-size')>14;k++)resize(0.9);
      this.fitSize=+t.getAttribute('font-size');this.labelEl=t;Plan.minFont&&Plan.minFont();
    });
  }
  setColor(c){this.node.style.fill=c}
  update(data){Object.assign(this,data);Plan.emit('update',this)}
}

/* ===== 컨트롤러 ===== */
const Plan={
  stores:new Map(),selected:null,handlers:{},showCode:false,  /* 도면 라벨 기본: 매장명만(매장코드는 데이터·목록·상세에 그대로 보관) */
  on(ev,fn){(this.handlers[ev]??=[]).push(fn)},emit(ev,...a){(this.handlers[ev]||[]).forEach(f=>f(...a))},
  get(spaceId){return this.stores.get(spaceId)},
  byShop(cd){return [...this.stores.values()].filter(s=>s.shop_cd===cd)},
  byName(n){return [...this.stores.values()].filter(s=>s.name===n)},
  select(id){this.stores.forEach(s=>{s.node.classList.toggle('selected',s.id===id);s.row&&s.row.classList.toggle('selected',s.id===id)});this.selected=this.get(id);this.emit('select',this.selected)},
  highlight(ids){this.stores.forEach(s=>s.node.classList.toggle('dim',!!ids&&!ids.includes(s.id)&&!ids.includes(s.shop_cd)))},
  /* Plan.heatmap({'SH00140922':120, ...})  매장코드 또는 공간ID 키 */
  heatmap(values){const v=Object.values(values),mx=Math.max(...v),mn=Math.min(...v);
    this.stores.forEach(s=>{const x=values[s.shop_cd]??values[s.id];if(x==null)return;const t=mx===mn?1:(x-mn)/(mx-mn);s.setColor(`hsl(350,70%,${92-t*42}%)`)})},
  resetColors(){this.stores.forEach(s=>s.setColor(COLORS[s.group]))},
  tip(e,text){const t=document.getElementById('tip');if(!e){t.style.display='none';return}t.textContent=text;t.style.display='block';t.style.left=e.clientX+12+'px';t.style.top=e.clientY+12+'px'}
};
const SL=document.getElementById('store-layer'),LL=document.getElementById('label-layer'),list=document.getElementById('list');
SPACES.filter(s=>s.type==='매장').sort((a,b)=>a.space_nm.localeCompare(b.space_nm)).forEach(d=>{
  const s=new Store(d);s.render(SL,LL);Plan.stores.set(s.id,s);
  const tr=document.createElement('tr');tr.className='row';tr.innerHTML=`<td>${s.name}</td><td class="c">${s.shop_cd??'(미배정)'}</td>`;
  tr.onclick=()=>Plan.select(s.id);tr.ondblclick=()=>Plan.focus(s.id);list.appendChild(tr);s.row=tr});
/* 그리는 순서: 큰 공간 먼저, 작은 공간 나중. 상위 공간(예: 남성 슈즈매장) 안에 하위 매장이 겹쳐 등록된 경우 하위 매장이 가려지지 않게 한다 */
{const ar=s=>{const b=s.node.getBBox();return b.width*b.height};[...Plan.stores.values()].sort((a,b)=>ar(b)-ar(a)).forEach(s=>SL.appendChild(s.node))}

const detail=document.getElementById('detail');
const SKIP=new Set(['v','node','row','labelText','group','name','id','fitSize','labelEl','labels','lpt','_b']);
const LABEL={shop_cd:'매장코드',space_id:'공간ID',space_nm:'공간명',type:'공간유형',area_m2:'면적(㎡)',area_py:'면적(PY)',area_note:'면적'};
const renderDetail=s=>{if(!s)return;detail.innerHTML=`<dl><dt>매장</dt><dd><b>${s.name}</b></dd>`+
  Object.entries(s).filter(([k])=>!SKIP.has(k)).map(([k,v])=>`<dt>${LABEL[k]||k}</dt><dd>${v??'-'}</dd>`).join('')+'</dl>'};
Plan.on('select',renderDetail);Plan.on('update',s=>{if(Plan.selected===s)renderDetail(s)});
document.getElementById('toggleFac').onchange=e=>{['fac-layer','fac-label'].forEach(id=>document.getElementById(id).classList.toggle('hidden',!e.target.checked));Plan.minFont&&Plan.minFont()};

/* ===== 뷰/줌 ===== */
const svg=document.getElementById('plan');
const init=[minX-PAD,-PAD,maxX-minX+PAD*2,maxY-minY+PAD*2];
const bg=document.getElementById('bg');Object.entries({x:minX-60,y:-60,width:maxX-minX+120,height:maxY-minY+120}).forEach(([k,v])=>bg.setAttribute(k,v));
let vb=[...init];
/* 라벨 배치: 매장명은 항상 자기 매장 안에 표시하고, 이웃 매장 라벨과 겹치지 않게 한다(지시선·숨김 없음). 줌·이동할 때마다 다시 계산한다.
   1) 모든 매장 라벨을 매장 맞춤 크기(fitSize, 매장 경계 안)로 먼저 자리 잡는다 → 매장끼리는 겹치지 않으므로 라벨도 겹치지 않는다
   2) 이동 시설 글자(E/S·EV·OPEN)는 화면 9px 이상으로 키우고, 매장 라벨과 겹치면 위·아래·옆으로 조금 비켜 보고 그래도 겹치면 숨긴다(출입구 배지는 유지)
   3) 화면에서 MIN_PX보다 작은 라벨은 큰 매장부터 MIN_PX까지 키워 본다. 라벨 지점과 매장 안 다른 지점들을 차례로 시험해
      다른 글자와 겹치지 않는 자리가 있으면 그 자리·크기로, 없으면 겹치지 않는 범위에서 가장 크게(최소 fitSize) 둔다
   4) 시설 이름(공조실 등, 앞 코드를 떼 짧은 이름)은 큰 시설부터 화면 9px(안 되면 85%) 이상으로 놓고, 겹치면 숨긴다 */
const MIN_PX=12,FLOW_MIN_PX=9,FAC_MIN_PX=9;  /* 매장명 목표 크기, 이동 시설 글자·시설 이름의 화면 최소 크기(px) */
const NUDGE=[[0,0],[0,-1.3],[0,1.3],[-1.6,0],[1.6,0]];  /* 이동 시설 글자가 겹칠 때 비켜 볼 위치(글자 크기 배수) */
let lay=0;Plan.minFont=()=>{if(lay)return;lay=requestAnimationFrame(()=>{lay=0;layout()})};
function layout(){const r=svg.getBoundingClientRect();if(!r.width)return;const k=Math.min(r.width/vb[2],r.height/vb[3]),u=1/k;
  const setFs=(t,fs)=>{t.setAttribute('font-size',fs.toFixed(1));t.querySelectorAll('tspan').forEach((ts,i)=>ts.setAttribute('dy',i?fs*1.1:-fs*0.55))};
  const move=(t,x,y)=>{t.setAttribute('x',x);t.setAttribute('y',y);t.querySelectorAll('tspan').forEach(ts=>ts.setAttribute('x',x))};
  const box=e=>{const b=e.getBBox();return [b.x,b.y,b.x+b.width,b.y+b.height]};
  const pad=1.5*u,ov=(a,b)=>a[0]<b[2]+pad&&b[0]<a[2]+pad&&a[1]<b[3]+pad&&b[1]<a[3]+pad;
  if(svg.classList.contains('nolbl'))return;
  const ST=[...Plan.stores.values()].filter(s=>s.labelEl&&s.fitSize);
  /* 1) 매장 맞춤 크기·원래 자리 */
  ST.forEach(s=>{const t=s.labelEl;t.style.display='';move(t,s.lpt[0],s.lpt[1]);setFs(t,s.fitSize);s._b=box(t)});
  const others=(s)=>ST.filter(o=>o!==s).map(o=>o._b);
  /* 2) 이동 시설 글자 */
  const fixed=[];const flowOn=!document.getElementById('flow-layer').classList.contains('hidden');
  if(flowOn)document.querySelectorAll('#flow-layer text,#flow-layer .badge').forEach(e=>{e.style.display='';const isB=e.classList.contains('badge')||e.classList.contains('badge-t');
    if(isB){fixed.push(box(e));return}
    if(e.dataset.fs==null){e.dataset.fs=e.getAttribute('font-size');e.dataset.x=e.getAttribute('x');e.dataset.y=e.getAttribute('y')}
    const fs=Math.max(+e.dataset.fs,FLOW_MIN_PX*u),x0=+e.dataset.x,y0=+e.dataset.y;e.setAttribute('font-size',fs.toFixed(1));if(e.getAttribute('stroke'))e.setAttribute('stroke-width',(fs*0.16).toFixed(1));
    for(const[dx,dy]of NUDGE){e.setAttribute('x',x0+dx*fs);e.setAttribute('y',y0+dy*fs);const b=box(e);if(!ST.some(s=>ov(s._b,b))&&!fixed.some(a=>ov(a,b))){fixed.push(b);return}}
    e.style.display='none'});
  /* 3) 작은 라벨 키우기(겹치지 않는 자리 탐색) */
  const svgP=svg.createSVGPoint(),inStore=(s,x,y)=>{svgP.x=x;svgP.y=y;return s.node.isPointInFill(svgP)};
  ST.sort((a,b)=>{const A=a.node.getBBox(),B=b.node.getBBox();return B.width*B.height-A.width*A.height}).forEach(s=>{
    const want=MIN_PX*u;if(s.fitSize>=want)return;const t=s.labelEl,B=s.node.getBBox();
    const obs=others(s).concat(fixed),free=b=>!obs.some(a=>ov(a,b));
    const pts=[s.lpt];for(let i=1;i<6;i++)for(let j=1;j<6;j++){const x=B.x+B.width*i/6,y=B.y+B.height*j/6;if(inStore(s,x,y))pts.push([x,y])}
    pts.sort((p,q)=>Math.hypot(p[0]-s.lpt[0],p[1]-s.lpt[1])-Math.hypot(q[0]-s.lpt[0],q[1]-s.lpt[1]));
    let done=false;
    for(const f of [1,0.85,0.72,0.6]){const fs=Math.max(s.fitSize,want*f);if(fs<=s.fitSize&&f<1)break;setFs(t,fs);
      for(const[x,y]of pts){move(t,x,y);const b=box(t);if(free(b)){s._b=b;done=true;break}}if(done)break}
    if(!done){move(t,s.lpt[0],s.lpt[1]);setFs(t,s.fitSize);s._b=box(t)}});
  /* 4) 시설 이름 */
  const all=ST.map(s=>s._b).concat(fixed);
  if(!document.getElementById('fac-label').classList.contains('hidden'))
    [...document.querySelectorAll('#fac-label text')].sort((a,b)=>b.dataset.a-a.dataset.a).forEach(t=>{t.style.display='';if(t.dataset.fs==null)t.dataset.fs=t.getAttribute('font-size');const f0=+t.dataset.fs;
      for(const px of [FAC_MIN_PX,FAC_MIN_PX*0.85]){t.setAttribute('font-size',Math.max(f0,px*u).toFixed(1));const b=box(t);if(!all.some(a=>ov(a,b))){all.push(b);return}}
      t.style.display='none'})}
const apply=()=>{svg.setAttribute('viewBox',vb.join(' '));Plan.minFont()};apply();window.addEventListener('resize',()=>Plan.minFont());
const MIN=init[2]/40,MAX=init[2]*1.5;
const pt=(cx,cy)=>{const r=svg.getBoundingClientRect();const s=Math.max(vb[2]/r.width,vb[3]/r.height);const ox=(r.width*s-vb[2])/2,oy=(r.height*s-vb[3])/2;return [vb[0]-ox+(cx-r.left)*s,vb[1]-oy+(cy-r.top)*s]};
const zoomAt=(f,cx,cy)=>{const w=Math.min(MAX,Math.max(MIN,vb[2]/f));f=vb[2]/w;const [px,py]=cx==null?[vb[0]+vb[2]/2,vb[1]+vb[3]/2]:pt(cx,cy);vb=[px-(px-vb[0])/f,py-(py-vb[1])/f,vb[2]/f,vb[3]/f];apply()};
svg.addEventListener('wheel',e=>{e.preventDefault();zoomAt(Math.exp(-e.deltaY*0.0015),e.clientX,e.clientY)},{passive:false});
const ptrs=new Map();let last=null,moved=false,pinch=null;
svg.addEventListener('pointerdown',e=>{ptrs.set(e.pointerId,[e.clientX,e.clientY]);last=[e.clientX,e.clientY];moved=false;if(ptrs.size===2){const[a,b]=[...ptrs.values()];pinch=Math.hypot(a[0]-b[0],a[1]-b[1])}});
svg.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,[e.clientX,e.clientY]);
  if(ptrs.size===2){const[a,b]=[...ptrs.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);zoomAt(d/pinch,(a[0]+b[0])/2,(a[1]+b[1])/2);pinch=d;moved=true;return}
  const dx=e.clientX-last[0],dy=e.clientY-last[1];if(!moved&&Math.hypot(dx,dy)<4)return;
  if(!moved){moved=true;svg.setPointerCapture(e.pointerId);svg.style.cursor='grabbing'}
  const r=svg.getBoundingClientRect(),s=Math.max(vb[2]/r.width,vb[3]/r.height);vb[0]-=dx*s;vb[1]-=dy*s;last=[e.clientX,e.clientY];apply()});
const up=e=>{ptrs.delete(e.pointerId);if(ptrs.size<2)pinch=null;svg.style.cursor=''};svg.addEventListener('pointerup',up);svg.addEventListener('pointercancel',up);
svg.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false}},true);
const box=document.getElementById('zoomctl');box.onclick=e=>{const z=e.target.dataset&&e.target.dataset.z;if(!z)return;if(z==='in')zoomAt(1.4);if(z==='out')zoomAt(1/1.4);if(z==='fit'){vb=[...init];apply()}};
Plan.focus=id=>{const b=Plan.get(id).node.getBBox(),r=svg.getBoundingClientRect(),asp=r.height/r.width,w=Math.max(b.width,b.height/asp)*3;vb=[b.x+b.width/2-w/2,b.y+b.height/2-w*asp/2,w,w*asp];apply()};
Plan.resetView=()=>{vb=[...init];apply()};
document.getElementById('toggleLbl').onchange=e=>{svg.classList.toggle('nolbl',!e.target.checked);Plan.minFont()};
/* 매장코드 숨김: 매장명만으로 라벨 위치·크기를 다시 맞춘다 */
Plan.setShowCode=on=>{Plan.showCode=on;Plan.stores.forEach(s=>s.shop_cd&&s.layoutLabel())};
document.getElementById('toggleCode').onchange=e=>Plan.setShowCode(e.target.checked);
window.Plan=Plan;
/* 사용 예:
   Plan.byShop('SH00140922')[0].update({매출:'1.2억'});
   Plan.heatmap({'SH00140922':120,'SH00140543':150});  Plan.resetColors();
   Plan.highlight(['SH00140922','SH00140718']);  Plan.on('select', s => console.log(s.shop_cd)); */
