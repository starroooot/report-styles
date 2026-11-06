/*!
 * floorplan-editor.js  v20261106
 * 신세계 공간관리시스템 도면(HTML) 아이디어 모드 드라이버
 *  - 선택(클릭·Ctrl+클릭) · 이동 · 합치기 · 분할 · 모양 편집 · 삭제 · 이름/도면 표시명 변경 · 매장 삽입 · 맞춤 안내선 · 되돌리기
 *  - 시설(계단·엘리베이터 포함)도 아이디어 모드에서 선택·편집, 면적 비공개 매장은 면적을 보이지 않음
 *  - 우측 아이콘 도구 막대 · 매장 정보 패널 접기(기본 접힘) · 도면 하단 유출 경고
 *  - 편집 도면 저장(HTML) · 불러오기(JSON) · CSV/JSON · PowerPoint(도형) 저장
 * 사용: 도면 HTML의 본문 스크립트(SPACES·FLOW·Store·Plan) 뒤에 넣는다.
 *   <script src="https://cdn.jsdelivr.net/gh/starroooot/report-styles@main/floorplan-editor.js?v=20261106"></script>
 * 편집 도면 저장(HTML)을 쓰려면 본문 스크립트 앞에 아래 두 줄이 있어야 한다.
 *   <script id="snap">window.__SRC=document.documentElement.outerHTML;</script>
 *   <script id="saved-state" type="application/json">null</script>
 * 포함 라이브러리: polygon-clipping 0.15.7 (MIT)
 * PowerPoint 저장 시에만 PptxGenJS 3.12.0(MIT)을 공개 CDN(jsDelivr)에서 불러온다
 */


/* ===== polygon-clipping 0.15.7 (MIT) ===== */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).polygonClipping=e()}(this,(function(){"use strict";
/**
     * splaytree v3.1.2
     * Fast Splay tree for Node and browser
     *
     * @author Alexander Milevski <info@w8r.name>
     * @license MIT
     * @preserve
     */
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */function t(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}var e=function(t,e){this.next=null,this.key=t,this.data=e,this.left=null,this.right=null};function n(t,e){return t>e?1:t<e?-1:0}function r(t,n,r){for(var i=new e(null,null),o=i,s=i;;){var l=r(t,n.key);if(l<0){if(null===n.left)break;if(r(t,n.left.key)<0){var h=n.left;if(n.left=h.right,h.right=n,null===(n=h).left)break}s.left=n,s=n,n=n.left}else{if(!(l>0))break;if(null===n.right)break;if(r(t,n.right.key)>0){h=n.right;if(n.right=h.left,h.left=n,null===(n=h).right)break}o.right=n,o=n,n=n.right}}return o.right=n.left,s.left=n.right,n.left=i.right,n.right=i.left,n}function i(t,n,i,o){var s=new e(t,n);if(null===i)return s.left=s.right=null,s;var l=o(t,(i=r(t,i,o)).key);return l<0?(s.left=i.left,s.right=i,i.left=null):l>=0&&(s.right=i.right,s.left=i,i.right=null),s}function o(t,e,n){var i=null,o=null;if(e){var s=n((e=r(t,e,n)).key,t);0===s?(i=e.left,o=e.right):s<0?(o=e.right,e.right=null,i=e):(i=e.left,e.left=null,o=e)}return{left:i,right:o}}function s(t,e,n,r,i){if(t){r(e+(n?"└── ":"├── ")+i(t)+"\n");var o=e+(n?"    ":"│   ");t.left&&s(t.left,o,!1,r,i),t.right&&s(t.right,o,!0,r,i)}}var l=function(){function l(t){void 0===t&&(t=n),this._root=null,this._size=0,this._comparator=t}return l.prototype.insert=function(t,e){return this._size++,this._root=i(t,e,this._root,this._comparator)},l.prototype.add=function(t,n){var i=new e(t,n);null===this._root&&(i.left=i.right=null,this._size++,this._root=i);var o=this._comparator,s=r(t,this._root,o),l=o(t,s.key);return 0===l?this._root=s:(l<0?(i.left=s.left,i.right=s,s.left=null):l>0&&(i.right=s.right,i.left=s,s.right=null),this._size++,this._root=i),this._root},l.prototype.remove=function(t){this._root=this._remove(t,this._root,this._comparator)},l.prototype._remove=function(t,e,n){var i;return null===e?null:0===n(t,(e=r(t,e,n)).key)?(null===e.left?i=e.right:(i=r(t,e.left,n)).right=e.right,this._size--,i):e},l.prototype.pop=function(){var t=this._root;if(t){for(;t.left;)t=t.left;return this._root=r(t.key,this._root,this._comparator),this._root=this._remove(t.key,this._root,this._comparator),{key:t.key,data:t.data}}return null},l.prototype.findStatic=function(t){for(var e=this._root,n=this._comparator;e;){var r=n(t,e.key);if(0===r)return e;e=r<0?e.left:e.right}return null},l.prototype.find=function(t){return this._root&&(this._root=r(t,this._root,this._comparator),0!==this._comparator(t,this._root.key))?null:this._root},l.prototype.contains=function(t){for(var e=this._root,n=this._comparator;e;){var r=n(t,e.key);if(0===r)return!0;e=r<0?e.left:e.right}return!1},l.prototype.forEach=function(t,e){for(var n=this._root,r=[],i=!1;!i;)null!==n?(r.push(n),n=n.left):0!==r.length?(n=r.pop(),t.call(e,n),n=n.right):i=!0;return this},l.prototype.range=function(t,e,n,r){for(var i=[],o=this._comparator,s=this._root;0!==i.length||s;)if(s)i.push(s),s=s.left;else{if(o((s=i.pop()).key,e)>0)break;if(o(s.key,t)>=0&&n.call(r,s))return this;s=s.right}return this},l.prototype.keys=function(){var t=[];return this.forEach((function(e){var n=e.key;return t.push(n)})),t},l.prototype.values=function(){var t=[];return this.forEach((function(e){var n=e.data;return t.push(n)})),t},l.prototype.min=function(){return this._root?this.minNode(this._root).key:null},l.prototype.max=function(){return this._root?this.maxNode(this._root).key:null},l.prototype.minNode=function(t){if(void 0===t&&(t=this._root),t)for(;t.left;)t=t.left;return t},l.prototype.maxNode=function(t){if(void 0===t&&(t=this._root),t)for(;t.right;)t=t.right;return t},l.prototype.at=function(t){for(var e=this._root,n=!1,r=0,i=[];!n;)if(e)i.push(e),e=e.left;else if(i.length>0){if(e=i.pop(),r===t)return e;r++,e=e.right}else n=!0;return null},l.prototype.next=function(t){var e=this._root,n=null;if(t.right){for(n=t.right;n.left;)n=n.left;return n}for(var r=this._comparator;e;){var i=r(t.key,e.key);if(0===i)break;i<0?(n=e,e=e.left):e=e.right}return n},l.prototype.prev=function(t){var e=this._root,n=null;if(null!==t.left){for(n=t.left;n.right;)n=n.right;return n}for(var r=this._comparator;e;){var i=r(t.key,e.key);if(0===i)break;i<0?e=e.left:(n=e,e=e.right)}return n},l.prototype.clear=function(){return this._root=null,this._size=0,this},l.prototype.toList=function(){return function(t){var n=t,r=[],i=!1,o=new e(null,null),s=o;for(;!i;)n?(r.push(n),n=n.left):r.length>0?n=(n=s=s.next=r.pop()).right:i=!0;return s.next=null,o.next}(this._root)},l.prototype.load=function(t,n,r){void 0===n&&(n=[]),void 0===r&&(r=!1);var i=t.length,o=this._comparator;if(r&&f(t,n,0,i-1,o),null===this._root)this._root=h(t,n,0,i),this._size=i;else{var s=function(t,n,r){var i=new e(null,null),o=i,s=t,l=n;for(;null!==s&&null!==l;)r(s.key,l.key)<0?(o.next=s,s=s.next):(o.next=l,l=l.next),o=o.next;null!==s?o.next=s:null!==l&&(o.next=l);return i.next}(this.toList(),function(t,n){for(var r=new e(null,null),i=r,o=0;o<t.length;o++)i=i.next=new e(t[o],n[o]);return i.next=null,r.next}(t,n),o);i=this._size+i,this._root=u({head:s},0,i)}return this},l.prototype.isEmpty=function(){return null===this._root},Object.defineProperty(l.prototype,"size",{get:function(){return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"root",{get:function(){return this._root},enumerable:!0,configurable:!0}),l.prototype.toString=function(t){void 0===t&&(t=function(t){return String(t.key)});var e=[];return s(this._root,"",!0,(function(t){return e.push(t)}),t),e.join("")},l.prototype.update=function(t,e,n){var s=this._comparator,l=o(t,this._root,s),h=l.left,u=l.right;s(t,e)<0?u=i(e,n,u,s):h=i(e,n,h,s),this._root=function(t,e,n){return null===e?t:(null===t||((e=r(t.key,e,n)).left=t),e)}(h,u,s)},l.prototype.split=function(t){return o(t,this._root,this._comparator)},l.prototype[Symbol.iterator]=function(){var e,n,r;return t(this,(function(t){switch(t.label){case 0:e=this._root,n=[],r=!1,t.label=1;case 1:return r?[3,6]:null===e?[3,2]:(n.push(e),e=e.left,[3,5]);case 2:return 0===n.length?[3,4]:[4,e=n.pop()];case 3:return t.sent(),e=e.right,[3,5];case 4:r=!0,t.label=5;case 5:return[3,1];case 6:return[2]}}))},l}();function h(t,n,r,i){var o=i-r;if(o>0){var s=r+Math.floor(o/2),l=t[s],u=n[s],f=new e(l,u);return f.left=h(t,n,r,s),f.right=h(t,n,s+1,i),f}return null}function u(t,e,n){var r=n-e;if(r>0){var i=e+Math.floor(r/2),o=u(t,e,i),s=t.head;return s.left=o,t.head=t.head.next,s.right=u(t,i+1,n),s}return null}function f(t,e,n,r,i){if(!(n>=r)){for(var o=t[n+r>>1],s=n-1,l=r+1;;){do{s++}while(i(t[s],o)<0);do{l--}while(i(t[l],o)>0);if(s>=l)break;var h=t[s];t[s]=t[l],t[l]=h,h=e[s],e[s]=e[l],e[l]=h}f(t,e,n,l,i),f(t,e,l+1,r,i)}}const c=(t,e)=>t.ll.x<=e.x&&e.x<=t.ur.x&&t.ll.y<=e.y&&e.y<=t.ur.y,p=(t,e)=>{if(e.ur.x<t.ll.x||t.ur.x<e.ll.x||e.ur.y<t.ll.y||t.ur.y<e.ll.y)return null;const n=t.ll.x<e.ll.x?e.ll.x:t.ll.x,r=t.ur.x<e.ur.x?t.ur.x:e.ur.x;return{ll:{x:n,y:t.ll.y<e.ll.y?e.ll.y:t.ll.y},ur:{x:r,y:t.ur.y<e.ur.y?t.ur.y:e.ur.y}}};let g=Number.EPSILON;void 0===g&&(g=Math.pow(2,-52));const a=g*g,y=(t,e)=>{if(-g<t&&t<g&&-g<e&&e<g)return 0;const n=t-e;return n*n<a*t*e?0:t<e?-1:1};class x{constructor(){this.tree=new l,this.round(0)}round(t){const e=this.tree.add(t),n=this.tree.prev(e);if(null!==n&&0===y(e.key,n.key))return this.tree.remove(t),n.key;const r=this.tree.next(e);return null!==r&&0===y(e.key,r.key)?(this.tree.remove(t),r.key):t}}const b=new class{constructor(){this.reset()}reset(){this.xRounder=new x,this.yRounder=new x}round(t,e){return{x:this.xRounder.round(t),y:this.yRounder.round(e)}}},v=11102230246251565e-32,d=134217729,m=(3+8*v)*v;function E(t,e,n,r,i){let o,s,l,h,u=e[0],f=r[0],c=0,p=0;f>u==f>-u?(o=u,u=e[++c]):(o=f,f=r[++p]);let g=0;if(c<t&&p<n)for(f>u==f>-u?(s=u+o,l=o-(s-u),u=e[++c]):(s=f+o,l=o-(s-f),f=r[++p]),o=s,0!==l&&(i[g++]=l);c<t&&p<n;)f>u==f>-u?(s=o+u,h=s-o,l=o-(s-h)+(u-h),u=e[++c]):(s=o+f,h=s-o,l=o-(s-h)+(f-h),f=r[++p]),o=s,0!==l&&(i[g++]=l);for(;c<t;)s=o+u,h=s-o,l=o-(s-h)+(u-h),u=e[++c],o=s,0!==l&&(i[g++]=l);for(;p<n;)s=o+f,h=s-o,l=o-(s-h)+(f-h),f=r[++p],o=s,0!==l&&(i[g++]=l);return 0===o&&0!==g||(i[g++]=o),g}function S(t){return new Float64Array(t)}const _=22204460492503146e-32,w=11093356479670487e-47,k=S(4),R=S(8),I=S(12),P=S(16),N=S(4);function A(t,e,n,r,i,o){const s=(e-o)*(n-i),l=(t-i)*(r-o),h=s-l,u=Math.abs(s+l);return Math.abs(h)>=33306690738754716e-32*u?h:-function(t,e,n,r,i,o,s){let l,h,u,f,c,p,g,a,y,x,b,v,S,A,O,L,$,M;const z=t-i,B=n-i,G=e-o,T=r-o;A=z*T,p=d*z,g=p-(p-z),a=z-g,p=d*T,y=p-(p-T),x=T-y,O=a*x-(A-g*y-a*y-g*x),L=G*B,p=d*G,g=p-(p-G),a=G-g,p=d*B,y=p-(p-B),x=B-y,$=a*x-(L-g*y-a*y-g*x),b=O-$,c=O-b,k[0]=O-(b+c)+(c-$),v=A+b,c=v-A,S=A-(v-c)+(b-c),b=S-L,c=S-b,k[1]=S-(b+c)+(c-L),M=v+b,c=M-v,k[2]=v-(M-c)+(b-c),k[3]=M;let q=function(t,e){let n=e[0];for(let r=1;r<t;r++)n+=e[r];return n}(4,k),C=_*s;if(q>=C||-q>=C)return q;if(c=t-z,l=t-(z+c)+(c-i),c=n-B,u=n-(B+c)+(c-i),c=e-G,h=e-(G+c)+(c-o),c=r-T,f=r-(T+c)+(c-o),0===l&&0===h&&0===u&&0===f)return q;if(C=w*s+m*Math.abs(q),q+=z*f+T*l-(G*u+B*h),q>=C||-q>=C)return q;A=l*T,p=d*l,g=p-(p-l),a=l-g,p=d*T,y=p-(p-T),x=T-y,O=a*x-(A-g*y-a*y-g*x),L=h*B,p=d*h,g=p-(p-h),a=h-g,p=d*B,y=p-(p-B),x=B-y,$=a*x-(L-g*y-a*y-g*x),b=O-$,c=O-b,N[0]=O-(b+c)+(c-$),v=A+b,c=v-A,S=A-(v-c)+(b-c),b=S-L,c=S-b,N[1]=S-(b+c)+(c-L),M=v+b,c=M-v,N[2]=v-(M-c)+(b-c),N[3]=M;const F=E(4,k,4,N,R);A=z*f,p=d*z,g=p-(p-z),a=z-g,p=d*f,y=p-(p-f),x=f-y,O=a*x-(A-g*y-a*y-g*x),L=G*u,p=d*G,g=p-(p-G),a=G-g,p=d*u,y=p-(p-u),x=u-y,$=a*x-(L-g*y-a*y-g*x),b=O-$,c=O-b,N[0]=O-(b+c)+(c-$),v=A+b,c=v-A,S=A-(v-c)+(b-c),b=S-L,c=S-b,N[1]=S-(b+c)+(c-L),M=v+b,c=M-v,N[2]=v-(M-c)+(b-c),N[3]=M;const j=E(F,R,4,N,I);A=l*f,p=d*l,g=p-(p-l),a=l-g,p=d*f,y=p-(p-f),x=f-y,O=a*x-(A-g*y-a*y-g*x),L=h*u,p=d*h,g=p-(p-h),a=h-g,p=d*u,y=p-(p-u),x=u-y,$=a*x-(L-g*y-a*y-g*x),b=O-$,c=O-b,N[0]=O-(b+c)+(c-$),v=A+b,c=v-A,S=A-(v-c)+(b-c),b=S-L,c=S-b,N[1]=S-(b+c)+(c-L),M=v+b,c=M-v,N[2]=v-(M-c)+(b-c),N[3]=M;const U=E(j,I,4,N,P);return P[U-1]}(t,e,n,r,i,o,u)}const O=(t,e)=>t.x*e.y-t.y*e.x,L=(t,e)=>t.x*e.x+t.y*e.y,$=(t,e,n)=>{const r=A(t.x,t.y,e.x,e.y,n.x,n.y);return r>0?-1:r<0?1:0},M=t=>Math.sqrt(L(t,t)),z=(t,e,n)=>{const r={x:e.x-t.x,y:e.y-t.y},i={x:n.x-t.x,y:n.y-t.y};return O(i,r)/M(i)/M(r)},B=(t,e,n)=>{const r={x:e.x-t.x,y:e.y-t.y},i={x:n.x-t.x,y:n.y-t.y};return L(i,r)/M(i)/M(r)},G=(t,e,n)=>0===e.y?null:{x:t.x+e.x/e.y*(n-t.y),y:n},T=(t,e,n)=>0===e.x?null:{x:n,y:t.y+e.y/e.x*(n-t.x)};class q{static compare(t,e){const n=q.comparePoints(t.point,e.point);return 0!==n?n:(t.point!==e.point&&t.link(e),t.isLeft!==e.isLeft?t.isLeft?1:-1:F.compare(t.segment,e.segment))}static comparePoints(t,e){return t.x<e.x?-1:t.x>e.x?1:t.y<e.y?-1:t.y>e.y?1:0}constructor(t,e){void 0===t.events?t.events=[this]:t.events.push(this),this.point=t,this.isLeft=e}link(t){if(t.point===this.point)throw new Error("Tried to link already linked events");const e=t.point.events;for(let t=0,n=e.length;t<n;t++){const n=e[t];this.point.events.push(n),n.point=this.point}this.checkForConsuming()}checkForConsuming(){const t=this.point.events.length;for(let e=0;e<t;e++){const n=this.point.events[e];if(void 0===n.segment.consumedBy)for(let r=e+1;r<t;r++){const t=this.point.events[r];void 0===t.consumedBy&&(n.otherSE.point.events===t.otherSE.point.events&&n.segment.consume(t.segment))}}}getAvailableLinkedEvents(){const t=[];for(let e=0,n=this.point.events.length;e<n;e++){const n=this.point.events[e];n!==this&&!n.segment.ringOut&&n.segment.isInResult()&&t.push(n)}return t}getLeftmostComparator(t){const e=new Map,n=n=>{const r=n.otherSE;e.set(n,{sine:z(this.point,t.point,r.point),cosine:B(this.point,t.point,r.point)})};return(t,r)=>{e.has(t)||n(t),e.has(r)||n(r);const{sine:i,cosine:o}=e.get(t),{sine:s,cosine:l}=e.get(r);return i>=0&&s>=0?o<l?1:o>l?-1:0:i<0&&s<0?o<l?-1:o>l?1:0:s<i?-1:s>i?1:0}}}let C=0;class F{static compare(t,e){const n=t.leftSE.point.x,r=e.leftSE.point.x,i=t.rightSE.point.x,o=e.rightSE.point.x;if(o<n)return 1;if(i<r)return-1;const s=t.leftSE.point.y,l=e.leftSE.point.y,h=t.rightSE.point.y,u=e.rightSE.point.y;if(n<r){if(l<s&&l<h)return 1;if(l>s&&l>h)return-1;const n=t.comparePoint(e.leftSE.point);if(n<0)return 1;if(n>0)return-1;const r=e.comparePoint(t.rightSE.point);return 0!==r?r:-1}if(n>r){if(s<l&&s<u)return-1;if(s>l&&s>u)return 1;const n=e.comparePoint(t.leftSE.point);if(0!==n)return n;const r=t.comparePoint(e.rightSE.point);return r<0?1:r>0?-1:1}if(s<l)return-1;if(s>l)return 1;if(i<o){const n=e.comparePoint(t.rightSE.point);if(0!==n)return n}if(i>o){const n=t.comparePoint(e.rightSE.point);if(n<0)return 1;if(n>0)return-1}if(i!==o){const t=h-s,e=i-n,f=u-l,c=o-r;if(t>e&&f<c)return 1;if(t<e&&f>c)return-1}return i>o?1:i<o||h<u?-1:h>u?1:t.id<e.id?-1:t.id>e.id?1:0}constructor(t,e,n,r){this.id=++C,this.leftSE=t,t.segment=this,t.otherSE=e,this.rightSE=e,e.segment=this,e.otherSE=t,this.rings=n,this.windings=r}static fromRing(t,e,n){let r,i,o;const s=q.comparePoints(t,e);if(s<0)r=t,i=e,o=1;else{if(!(s>0))throw new Error(`Tried to create degenerate segment at [${t.x}, ${t.y}]`);r=e,i=t,o=-1}const l=new q(r,!0),h=new q(i,!1);return new F(l,h,[n],[o])}replaceRightSE(t){this.rightSE=t,this.rightSE.segment=this,this.rightSE.otherSE=this.leftSE,this.leftSE.otherSE=this.rightSE}bbox(){const t=this.leftSE.point.y,e=this.rightSE.point.y;return{ll:{x:this.leftSE.point.x,y:t<e?t:e},ur:{x:this.rightSE.point.x,y:t>e?t:e}}}vector(){return{x:this.rightSE.point.x-this.leftSE.point.x,y:this.rightSE.point.y-this.leftSE.point.y}}isAnEndpoint(t){return t.x===this.leftSE.point.x&&t.y===this.leftSE.point.y||t.x===this.rightSE.point.x&&t.y===this.rightSE.point.y}comparePoint(t){if(this.isAnEndpoint(t))return 0;const e=this.leftSE.point,n=this.rightSE.point,r=this.vector();if(e.x===n.x)return t.x===e.x?0:t.x<e.x?1:-1;const i=(t.y-e.y)/r.y,o=e.x+i*r.x;if(t.x===o)return 0;const s=(t.x-e.x)/r.x,l=e.y+s*r.y;return t.y===l?0:t.y<l?-1:1}getIntersection(t){const e=this.bbox(),n=t.bbox(),r=p(e,n);if(null===r)return null;const i=this.leftSE.point,o=this.rightSE.point,s=t.leftSE.point,l=t.rightSE.point,h=c(e,s)&&0===this.comparePoint(s),u=c(n,i)&&0===t.comparePoint(i),f=c(e,l)&&0===this.comparePoint(l),g=c(n,o)&&0===t.comparePoint(o);if(u&&h)return g&&!f?o:!g&&f?l:null;if(u)return f&&i.x===l.x&&i.y===l.y?null:i;if(h)return g&&o.x===s.x&&o.y===s.y?null:s;if(g&&f)return null;if(g)return o;if(f)return l;const a=((t,e,n,r)=>{if(0===e.x)return T(n,r,t.x);if(0===r.x)return T(t,e,n.x);if(0===e.y)return G(n,r,t.y);if(0===r.y)return G(t,e,n.y);const i=O(e,r);if(0==i)return null;const o={x:n.x-t.x,y:n.y-t.y},s=O(o,e)/i,l=O(o,r)/i;return{x:(t.x+l*e.x+(n.x+s*r.x))/2,y:(t.y+l*e.y+(n.y+s*r.y))/2}})(i,this.vector(),s,t.vector());return null===a?null:c(r,a)?b.round(a.x,a.y):null}split(t){const e=[],n=void 0!==t.events,r=new q(t,!0),i=new q(t,!1),o=this.rightSE;this.replaceRightSE(i),e.push(i),e.push(r);const s=new F(r,o,this.rings.slice(),this.windings.slice());return q.comparePoints(s.leftSE.point,s.rightSE.point)>0&&s.swapEvents(),q.comparePoints(this.leftSE.point,this.rightSE.point)>0&&this.swapEvents(),n&&(r.checkForConsuming(),i.checkForConsuming()),e}swapEvents(){const t=this.rightSE;this.rightSE=this.leftSE,this.leftSE=t,this.leftSE.isLeft=!0,this.rightSE.isLeft=!1;for(let t=0,e=this.windings.length;t<e;t++)this.windings[t]*=-1}consume(t){let e=this,n=t;for(;e.consumedBy;)e=e.consumedBy;for(;n.consumedBy;)n=n.consumedBy;const r=F.compare(e,n);if(0!==r){if(r>0){const t=e;e=n,n=t}if(e.prev===n){const t=e;e=n,n=t}for(let t=0,r=n.rings.length;t<r;t++){const r=n.rings[t],i=n.windings[t],o=e.rings.indexOf(r);-1===o?(e.rings.push(r),e.windings.push(i)):e.windings[o]+=i}n.rings=null,n.windings=null,n.consumedBy=e,n.leftSE.consumedBy=e.leftSE,n.rightSE.consumedBy=e.rightSE}}prevInResult(){return void 0!==this._prevInResult||(this.prev?this.prev.isInResult()?this._prevInResult=this.prev:this._prevInResult=this.prev.prevInResult():this._prevInResult=null),this._prevInResult}beforeState(){if(void 0!==this._beforeState)return this._beforeState;if(this.prev){const t=this.prev.consumedBy||this.prev;this._beforeState=t.afterState()}else this._beforeState={rings:[],windings:[],multiPolys:[]};return this._beforeState}afterState(){if(void 0!==this._afterState)return this._afterState;const t=this.beforeState();this._afterState={rings:t.rings.slice(0),windings:t.windings.slice(0),multiPolys:[]};const e=this._afterState.rings,n=this._afterState.windings,r=this._afterState.multiPolys;for(let t=0,r=this.rings.length;t<r;t++){const r=this.rings[t],i=this.windings[t],o=e.indexOf(r);-1===o?(e.push(r),n.push(i)):n[o]+=i}const i=[],o=[];for(let t=0,r=e.length;t<r;t++){if(0===n[t])continue;const r=e[t],s=r.poly;if(-1===o.indexOf(s))if(r.isExterior)i.push(s);else{-1===o.indexOf(s)&&o.push(s);const t=i.indexOf(r.poly);-1!==t&&i.splice(t,1)}}for(let t=0,e=i.length;t<e;t++){const e=i[t].multiPoly;-1===r.indexOf(e)&&r.push(e)}return this._afterState}isInResult(){if(this.consumedBy)return!1;if(void 0!==this._isInResult)return this._isInResult;const t=this.beforeState().multiPolys,e=this.afterState().multiPolys;switch(H.type){case"union":{const n=0===t.length,r=0===e.length;this._isInResult=n!==r;break}case"intersection":{let n,r;t.length<e.length?(n=t.length,r=e.length):(n=e.length,r=t.length),this._isInResult=r===H.numMultiPolys&&n<r;break}case"xor":{const n=Math.abs(t.length-e.length);this._isInResult=n%2==1;break}case"difference":{const n=t=>1===t.length&&t[0].isSubject;this._isInResult=n(t)!==n(e);break}default:throw new Error(`Unrecognized operation type found ${H.type}`)}return this._isInResult}}class j{constructor(t,e,n){if(!Array.isArray(t)||0===t.length)throw new Error("Input geometry is not a valid Polygon or MultiPolygon");if(this.poly=e,this.isExterior=n,this.segments=[],"number"!=typeof t[0][0]||"number"!=typeof t[0][1])throw new Error("Input geometry is not a valid Polygon or MultiPolygon");const r=b.round(t[0][0],t[0][1]);this.bbox={ll:{x:r.x,y:r.y},ur:{x:r.x,y:r.y}};let i=r;for(let e=1,n=t.length;e<n;e++){if("number"!=typeof t[e][0]||"number"!=typeof t[e][1])throw new Error("Input geometry is not a valid Polygon or MultiPolygon");let n=b.round(t[e][0],t[e][1]);n.x===i.x&&n.y===i.y||(this.segments.push(F.fromRing(i,n,this)),n.x<this.bbox.ll.x&&(this.bbox.ll.x=n.x),n.y<this.bbox.ll.y&&(this.bbox.ll.y=n.y),n.x>this.bbox.ur.x&&(this.bbox.ur.x=n.x),n.y>this.bbox.ur.y&&(this.bbox.ur.y=n.y),i=n)}r.x===i.x&&r.y===i.y||this.segments.push(F.fromRing(i,r,this))}getSweepEvents(){const t=[];for(let e=0,n=this.segments.length;e<n;e++){const n=this.segments[e];t.push(n.leftSE),t.push(n.rightSE)}return t}}class U{constructor(t,e){if(!Array.isArray(t))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");this.exteriorRing=new j(t[0],this,!0),this.bbox={ll:{x:this.exteriorRing.bbox.ll.x,y:this.exteriorRing.bbox.ll.y},ur:{x:this.exteriorRing.bbox.ur.x,y:this.exteriorRing.bbox.ur.y}},this.interiorRings=[];for(let e=1,n=t.length;e<n;e++){const n=new j(t[e],this,!1);n.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=n.bbox.ll.x),n.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=n.bbox.ll.y),n.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=n.bbox.ur.x),n.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=n.bbox.ur.y),this.interiorRings.push(n)}this.multiPoly=e}getSweepEvents(){const t=this.exteriorRing.getSweepEvents();for(let e=0,n=this.interiorRings.length;e<n;e++){const n=this.interiorRings[e].getSweepEvents();for(let e=0,r=n.length;e<r;e++)t.push(n[e])}return t}}class Y{constructor(t,e){if(!Array.isArray(t))throw new Error("Input geometry is not a valid Polygon or MultiPolygon");try{"number"==typeof t[0][0][0]&&(t=[t])}catch(t){}this.polys=[],this.bbox={ll:{x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY},ur:{x:Number.NEGATIVE_INFINITY,y:Number.NEGATIVE_INFINITY}};for(let e=0,n=t.length;e<n;e++){const n=new U(t[e],this);n.bbox.ll.x<this.bbox.ll.x&&(this.bbox.ll.x=n.bbox.ll.x),n.bbox.ll.y<this.bbox.ll.y&&(this.bbox.ll.y=n.bbox.ll.y),n.bbox.ur.x>this.bbox.ur.x&&(this.bbox.ur.x=n.bbox.ur.x),n.bbox.ur.y>this.bbox.ur.y&&(this.bbox.ur.y=n.bbox.ur.y),this.polys.push(n)}this.isSubject=e}getSweepEvents(){const t=[];for(let e=0,n=this.polys.length;e<n;e++){const n=this.polys[e].getSweepEvents();for(let e=0,r=n.length;e<r;e++)t.push(n[e])}return t}}class V{static factory(t){const e=[];for(let n=0,r=t.length;n<r;n++){const r=t[n];if(!r.isInResult()||r.ringOut)continue;let i=null,o=r.leftSE,s=r.rightSE;const l=[o],h=o.point,u=[];for(;i=o,o=s,l.push(o),o.point!==h;)for(;;){const t=o.getAvailableLinkedEvents();if(0===t.length){const t=l[0].point,e=l[l.length-1].point;throw new Error(`Unable to complete output ring starting at [${t.x}, ${t.y}]. Last matching segment found ends at [${e.x}, ${e.y}].`)}if(1===t.length){s=t[0].otherSE;break}let n=null;for(let t=0,e=u.length;t<e;t++)if(u[t].point===o.point){n=t;break}if(null!==n){const t=u.splice(n)[0],r=l.splice(t.index);r.unshift(r[0].otherSE),e.push(new V(r.reverse()));continue}u.push({index:l.length,point:o.point});const r=o.getLeftmostComparator(i);s=t.sort(r)[0].otherSE;break}e.push(new V(l))}return e}constructor(t){this.events=t;for(let e=0,n=t.length;e<n;e++)t[e].segment.ringOut=this;this.poly=null}getGeom(){let t=this.events[0].point;const e=[t];for(let n=1,r=this.events.length-1;n<r;n++){const r=this.events[n].point,i=this.events[n+1].point;0!==$(r,t,i)&&(e.push(r),t=r)}if(1===e.length)return null;const n=e[0],r=e[1];0===$(n,t,r)&&e.shift(),e.push(e[0]);const i=this.isExteriorRing()?1:-1,o=this.isExteriorRing()?0:e.length-1,s=this.isExteriorRing()?e.length:-1,l=[];for(let t=o;t!=s;t+=i)l.push([e[t].x,e[t].y]);return l}isExteriorRing(){if(void 0===this._isExteriorRing){const t=this.enclosingRing();this._isExteriorRing=!t||!t.isExteriorRing()}return this._isExteriorRing}enclosingRing(){return void 0===this._enclosingRing&&(this._enclosingRing=this._calcEnclosingRing()),this._enclosingRing}_calcEnclosingRing(){let t=this.events[0];for(let e=1,n=this.events.length;e<n;e++){const n=this.events[e];q.compare(t,n)>0&&(t=n)}let e=t.segment.prevInResult(),n=e?e.prevInResult():null;for(;;){if(!e)return null;if(!n)return e.ringOut;if(n.ringOut!==e.ringOut)return n.ringOut.enclosingRing()!==e.ringOut?e.ringOut:e.ringOut.enclosingRing();e=n.prevInResult(),n=e?e.prevInResult():null}}}class X{constructor(t){this.exteriorRing=t,t.poly=this,this.interiorRings=[]}addInterior(t){this.interiorRings.push(t),t.poly=this}getGeom(){const t=[this.exteriorRing.getGeom()];if(null===t[0])return null;for(let e=0,n=this.interiorRings.length;e<n;e++){const n=this.interiorRings[e].getGeom();null!==n&&t.push(n)}return t}}class Q{constructor(t){this.rings=t,this.polys=this._composePolys(t)}getGeom(){const t=[];for(let e=0,n=this.polys.length;e<n;e++){const n=this.polys[e].getGeom();null!==n&&t.push(n)}return t}_composePolys(t){const e=[];for(let n=0,r=t.length;n<r;n++){const r=t[n];if(!r.poly)if(r.isExteriorRing())e.push(new X(r));else{const t=r.enclosingRing();t.poly||e.push(new X(t)),t.poly.addInterior(r)}}return e}}class W{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:F.compare;this.queue=t,this.tree=new l(e),this.segments=[]}process(t){const e=t.segment,n=[];if(t.consumedBy)return t.isLeft?this.queue.remove(t.otherSE):this.tree.remove(e),n;const r=t.isLeft?this.tree.add(e):this.tree.find(e);if(!r)throw new Error(`Unable to find segment #${e.id} [${e.leftSE.point.x}, ${e.leftSE.point.y}] -> [${e.rightSE.point.x}, ${e.rightSE.point.y}] in SweepLine tree.`);let i,o,s=r,l=r;for(;void 0===i;)s=this.tree.prev(s),null===s?i=null:void 0===s.key.consumedBy&&(i=s.key);for(;void 0===o;)l=this.tree.next(l),null===l?o=null:void 0===l.key.consumedBy&&(o=l.key);if(t.isLeft){let r=null;if(i){const t=i.getIntersection(e);if(null!==t&&(e.isAnEndpoint(t)||(r=t),!i.isAnEndpoint(t))){const e=this._splitSafely(i,t);for(let t=0,r=e.length;t<r;t++)n.push(e[t])}}let s=null;if(o){const t=o.getIntersection(e);if(null!==t&&(e.isAnEndpoint(t)||(s=t),!o.isAnEndpoint(t))){const e=this._splitSafely(o,t);for(let t=0,r=e.length;t<r;t++)n.push(e[t])}}if(null!==r||null!==s){let t=null;if(null===r)t=s;else if(null===s)t=r;else{t=q.comparePoints(r,s)<=0?r:s}this.queue.remove(e.rightSE),n.push(e.rightSE);const i=e.split(t);for(let t=0,e=i.length;t<e;t++)n.push(i[t])}n.length>0?(this.tree.remove(e),n.push(t)):(this.segments.push(e),e.prev=i)}else{if(i&&o){const t=i.getIntersection(o);if(null!==t){if(!i.isAnEndpoint(t)){const e=this._splitSafely(i,t);for(let t=0,r=e.length;t<r;t++)n.push(e[t])}if(!o.isAnEndpoint(t)){const e=this._splitSafely(o,t);for(let t=0,r=e.length;t<r;t++)n.push(e[t])}}}this.tree.remove(e)}return n}_splitSafely(t,e){this.tree.remove(t);const n=t.rightSE;this.queue.remove(n);const r=t.split(e);return r.push(n),void 0===t.consumedBy&&this.tree.add(t),r}}const Z="undefined"!=typeof process&&process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE||1e6,D="undefined"!=typeof process&&process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS||1e6;const H=new class{run(t,e,n){H.type=t,b.reset();const r=[new Y(e,!0)];for(let t=0,e=n.length;t<e;t++)r.push(new Y(n[t],!1));if(H.numMultiPolys=r.length,"difference"===H.type){const t=r[0];let e=1;for(;e<r.length;)null!==p(r[e].bbox,t.bbox)?e++:r.splice(e,1)}if("intersection"===H.type)for(let t=0,e=r.length;t<e;t++){const e=r[t];for(let n=t+1,i=r.length;n<i;n++)if(null===p(e.bbox,r[n].bbox))return[]}const i=new l(q.compare);for(let t=0,e=r.length;t<e;t++){const e=r[t].getSweepEvents();for(let t=0,n=e.length;t<n;t++)if(i.insert(e[t]),i.size>Z)throw new Error("Infinite loop when putting segment endpoints in a priority queue (queue size too big).")}const o=new W(i);let s=i.size,h=i.pop();for(;h;){const t=h.key;if(i.size===s){const e=t.segment;throw new Error(`Unable to pop() ${t.isLeft?"left":"right"} SweepEvent [${t.point.x}, ${t.point.y}] from segment #${e.id} [${e.leftSE.point.x}, ${e.leftSE.point.y}] -> [${e.rightSE.point.x}, ${e.rightSE.point.y}] from queue.`)}if(i.size>Z)throw new Error("Infinite loop when passing sweep line over endpoints (queue size too big).");if(o.segments.length>D)throw new Error("Infinite loop when passing sweep line over endpoints (too many sweep line segments).");const e=o.process(t);for(let t=0,n=e.length;t<n;t++){const n=e[t];void 0===n.consumedBy&&i.insert(n)}s=i.size,h=i.pop()}b.reset();const u=V.factory(o.segments);return new Q(u).getGeom()}};var J={union:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return H.run("union",t,n)},intersection:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return H.run("intersection",t,n)},xor:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return H.run("xor",t,n)},difference:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return H.run("difference",t,n)}};return J}));



;(function(){
if(window.__FP_EDITOR__)return;window.__FP_EDITOR__='20261106';
if(typeof Plan==='undefined'||typeof Store==='undefined'||typeof SPACES==='undefined'){console.error('[floorplan-editor] 도면 본문 스크립트(SPACES·Store·Plan)를 찾지 못했습니다. 이 스크립트는 본문 스크립트 뒤에 넣어야 합니다.');return}

/* ----- 1) 화면 요소(스타일·버튼·도구 막대) 넣기 ----- */
const st=document.createElement('style');st.id='fp-editor-style';st.textContent=`
#hdPPT{height:28px;padding:0 12px;border:1px solid #1d5bd8;border-radius:6px;background:#fff;color:#1d5bd8;cursor:pointer;font-size:13px;font-weight:700}#hdPPT:hover:not(:disabled){background:#eef3ff}#hdPPT:disabled{opacity:.5}
#fpDlg{border:1px solid #ccc;border-radius:10px;padding:18px 20px;min-width:340px;max-width:92vw;font-size:13px;box-shadow:0 10px 40px rgba(0,0,0,.25)}#fpDlg::backdrop{background:rgba(0,0,0,.3)}
#fpDlg h3{margin:0 0 6px;font-size:15px}#fpDlg p.c{margin:0 0 10px;color:#777;font-size:12px}
#fpDlg fieldset{border:1px solid #e3e3e3;border-radius:8px;margin:0 0 10px;padding:8px 12px 10px}#fpDlg legend{font-weight:700;color:#c8102e;padding:0 4px}
#fpDlg label{display:flex;align-items:center;gap:8px;margin:6px 0}#fpDlg label input{flex:1;height:30px;padding:0 8px;border:1px solid #ccc;border-radius:6px;font-size:13px}
#fpDlg .btns{display:flex;justify-content:flex-end;gap:8px;margin-top:6px}#fpDlg button{height:30px;padding:0 14px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer;font-size:13px}
#fpDlg button.pri{background:#c8102e;border-color:#c8102e;color:#fff}
`+"\n/* 편집 모드 */\n#edbar{display:none;padding:8px 16px;border-bottom:1px solid var(--line);background:#fff8f9;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px}\nbody.editing #edbar{display:flex}\n#edbar button{height:28px;padding:0 10px;font-size:13px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer}\n#edbar button:hover:not(:disabled){background:#f0f0f0}#edbar button:disabled{opacity:.4;cursor:default}\n#edbar button.pri{background:var(--accent);border-color:var(--accent);color:#fff}#edbar button.pri:hover:not(:disabled){background:#a50d26}\n#edbar .grp{display:flex;gap:6px;align-items:center;padding-right:10px;border-right:1px solid #eadadd}#edbar .grp:last-child{border-right:0}\n#edSel{font-weight:700;color:#1d5bd8;min-width:150px}#edRatioT{font-variant-numeric:tabular-nums;min-width:56px;display:inline-block}\n#edbar .note{color:#999;font-size:11px;margin-left:auto}\n#edToggle{border-color:var(--accent)!important;color:var(--accent)}body.editing #edToggle{background:var(--accent)!important;color:#fff}\n.store{fill-rule:evenodd}.store.edited{stroke:#b4005a;stroke-dasharray:70 35;stroke-width:22}\nbody.editing .store{cursor:copy}.store.picked{stroke:#1d5bd8!important;stroke-width:46!important;stroke-dasharray:none;filter:brightness(.95)}\ntr.row.picked{background:#e8f0ff}tr.row.edited td:first-child{color:#b4005a;font-weight:700}\n#edit-layer{pointer-events:none}.cut{stroke:#c8102e;stroke-width:22;stroke-dasharray:60 40}\n.pv{stroke:none;opacity:.28}.pv0{fill:#1d5bd8}.pv1{fill:#f08a00}\n.pvt{text-anchor:middle;dominant-baseline:middle;font-weight:700;fill:#111;paint-order:stroke;stroke:#fff;stroke-width:16}\n#orig-layer{pointer-events:none}.orig{fill:none;stroke:#5a6b7d;stroke-width:12;stroke-dasharray:24 24}\n#edLog{margin:0 0 14px;padding-left:0;list-style:none;font-size:12px}#edLog li{padding:5px 0;border-bottom:1px dashed #eee}\n#logbox{display:none}body.editing #logbox,#logbox.has{display:block}\n\n#shapebar{display:none;padding:8px 16px;border-bottom:1px solid var(--line);background:#f2f6ff;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px}\nbody.shaping #edbar{display:none}body.shaping #shapebar{display:flex}\n#shapebar button{height:28px;padding:0 10px;font-size:13px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer}\n#shapebar button:hover:not(:disabled){background:#f0f0f0}#shapebar button:disabled{opacity:.4;cursor:default}\n#shapebar button.pri{background:#1d5bd8;border-color:#1d5bd8;color:#fff}\n#shapebar .grp{display:flex;gap:6px;align-items:center;padding-right:10px;border-right:1px solid #d6dff0}\n#shapebar .c,#edbar .c{color:#777;font-size:12px}\n#shWarn{color:#c8102e;font-weight:700}\n#shape-layer .sh-v{fill:#fff;stroke:#1d5bd8;cursor:move;pointer-events:all}#shape-layer .sh-v:hover{fill:#1d5bd8}\n#shape-layer .sh-e{fill:#1d5bd8;stroke:#fff;pointer-events:all}#shape-layer .sh-e:hover,#shape-layer .sh-e.on{fill:#f08a00}\n#shape-layer .sh-base{fill:none;stroke:#5a6b7d;pointer-events:none}\n#shape-layer .sh-out{fill:none;stroke:#1d5bd8;pointer-events:none}#shape-layer .sh-out.bad{stroke:#c8102e}\n#shape-layer .sh-sel{stroke:#f08a00;pointer-events:none}\n#shape-layer .sh-hit{fill:#c8102e;opacity:.55;pointer-events:none}\n#shape-layer .sh-len{fill:#1d5bd8;font-weight:700;dominant-baseline:middle;paint-order:stroke;stroke:#fff;stroke-width:3px;pointer-events:none}\nbody.shaping .store{cursor:default}\n\n#insbar{display:none;padding:8px 16px;border-bottom:1px solid var(--line);background:#effaf2;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px}\nbody.inserting #edbar{display:none}body.inserting #insbar{display:flex}\n#insbar button{height:28px;padding:0 10px;font-size:13px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer}\n#insbar button:disabled{opacity:.4;cursor:default}#insbar button.pri{background:#1a7f37;border-color:#1a7f37;color:#fff}\n#insbar .grp{display:flex;gap:6px;align-items:center;padding-right:10px;border-right:1px solid #cfe6d6}#insbar .c{color:#777;font-size:12px}\n#insWarn{color:#c8102e;font-weight:700}\n#insert-layer .ins-cap{fill:transparent;pointer-events:all;cursor:crosshair}\n#insert-layer .ins-shape{fill:#1a7f37;fill-opacity:.22;stroke:#1a7f37;pointer-events:none}#insert-layer .ins-shape.bad{stroke:#c8102e;fill:#c8102e}\n#insert-layer .ins-line{fill:none;stroke:#1a7f37;stroke-dasharray:8 5;pointer-events:none}\n#insert-layer .ins-v{fill:#fff;stroke:#1a7f37;pointer-events:none}#insert-layer .ins-v.first{fill:#1a7f37}\n#insert-layer .sh-hit{fill:#c8102e;opacity:.55;pointer-events:none}\n#insert-layer .sh-len{fill:#1a7f37;font-weight:700;dominant-baseline:middle;paint-order:stroke;stroke:#fff;stroke-width:3px;pointer-events:none}\n\n.guide{stroke:#e3008c;pointer-events:none}.guide-pt{fill:#e3008c;pointer-events:none}\n.dim{stroke:#e3008c;pointer-events:none}.dim-t{fill:#e3008c;font-weight:700;dominant-baseline:middle;paint-order:stroke;stroke:#fff;pointer-events:none}\n#move-layer{pointer-events:none}#move-layer .sh-hit{fill:#c8102e;opacity:.55}\nbody.editing .store.movable{cursor:move}\n"+`
/* v20261106: 우측 아이콘 도구 막대 · 정보 패널 접기 · 유출 경고 · 시설 선택 */
#wrap{display:flex;flex-direction:column;gap:6px}#plan{flex:1;height:auto!important;min-height:0}
#leakWarn{flex:none;padding:6px 10px;border:1px solid #f1c2ca;background:#fff5f6;color:#a50d26;font-size:12px;font-weight:700;border-radius:6px;text-align:center;line-height:1.45}
#zoomctl>button[data-z],#zoomctl>.sep{display:none}
#planRow{flex:1;min-height:0;display:flex;gap:8px;position:relative}#planRow>#plan{flex:1;min-width:0;height:auto!important}
#tb{flex:none;display:flex;flex-direction:column;gap:6px;overflow-y:auto;scrollbar-width:none;padding:1px}
#tb .g{display:flex;flex-direction:column;background:#fff;border:1px solid #cfcfcf;border-radius:7px;box-shadow:0 1px 3px rgba(0,0,0,.08);overflow:hidden;flex:none}
#tb .ed{display:none}body.editing #tb .ed{display:flex}
#tb .tbtn{width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:0;border-bottom:1px solid #e6e6e6;background:#fff;color:#333;cursor:pointer;padding:0;margin:0}
#tb .tbtn:last-child{border-bottom:0}#tb .tbtn:hover:not(:disabled){background:#f1f3f6}#tb .tbtn:disabled{color:#c4c4c4;cursor:default}
#tb .tbtn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
#tb .tbtn.on,#tb label.tbtn:has(input:checked){background:#e8f0ff;color:#1d5bd8}
#tb .tbtn.danger:hover:not(:disabled){color:#c8102e}
.pop{display:none;position:absolute;left:52px;z-index:6;background:#fff;border:1px solid #cfcfcf;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.15);padding:10px 12px;font-size:13px;flex-direction:column;gap:8px;min-width:230px}
.pop.open{display:flex}.pop h4{margin:0;font-size:13px;color:#c8102e}.pop .row2{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.pop button{height:28px;padding:0 10px;font-size:13px;border:1px solid #ccc;background:#fff;border-radius:6px;cursor:pointer;text-align:left}.pop button:hover{background:#f0f0f0}
.pop button.pri{background:var(--accent);border-color:var(--accent);color:#fff}.pop button.warn{color:#c8102e}.pop hr{border:0;border-top:1px solid #eee;margin:2px 0;width:100%}
#edStat{display:none;position:absolute;top:10px;left:56px;z-index:5;background:#fff8f9;border:1px solid #f1c2ca;border-radius:16px;padding:4px 6px 4px 12px;font-size:12px;align-items:center;gap:8px;box-shadow:0 1px 3px rgba(0,0,0,.08);max-width:calc(100% - 120px)}
body.editing #edStat{display:flex}body.shaping #edStat,body.inserting #edStat{display:none}
#edStat b{color:var(--accent)}#edSel{font-weight:700;color:#1d5bd8}#edStat .note{color:#999;font-size:11px}
#edStat button{height:22px;padding:0 8px;font-size:12px;border:1px solid #ccc;background:#fff;border-radius:11px;cursor:pointer}
body.editing.tool-label #label-layer text.lbl,body.editing.tool-label text.efac-lbl{pointer-events:all;cursor:move}
body.editing.tool-label text.lbl:hover{fill:#1d5bd8}
body.asideClosed main{grid-template-columns:1fr 0px!important}body.asideClosed aside{display:none}
/* 사이드바: 정보 영역은 고정, 매장 목록만 스크롤 */
main>aside{display:flex;flex-direction:column;overflow:hidden!important;min-height:0}main>aside>*{flex:none}
#logbox{max-height:34vh;overflow:auto;border-top:1px solid #eee;padding-top:8px;margin-top:6px}#logbox h2{cursor:pointer;user-select:none;margin:0 0 6px}#logbox h2:hover{color:#1d5bd8}#logArrow{display:inline-block;width:12px;color:#888}#edLog{display:none}#logbox.open #edLog{display:block}#listWrap{flex:1 1 auto!important;min-height:80px;overflow:auto;border-top:1px solid #eee}
#listWrap thead th{position:sticky;top:0;background:#fff;z-index:1}
body.editing .efac{cursor:pointer}.efac.picked{stroke:#1d5bd8!important;stroke-width:40!important;stroke-dasharray:none}.efac.edited{stroke:#b4005a;stroke-dasharray:50 25;stroke-width:14}
body.editing.tool-move .store,body.editing.tool-move .efac,body.editing .store.picked,body.editing .efac.picked{cursor:move}
body.splitting #edStat{display:none}
#cpSw{display:grid;grid-template-columns:repeat(6,26px);gap:6px}#cpSw .cpSep{grid-column:1/-1;height:1px;background:#e3e3e3;margin:1px 0}#cpSw button{width:26px;height:26px;padding:0;border:1px solid #bbb;border-radius:5px;cursor:pointer}#cpSw button:hover{outline:2px solid #1d5bd8;outline-offset:1px}
#detail dl.dgrid{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;margin:0;align-items:baseline}#detail dl.dgrid dt{color:#888;font-size:11px;white-space:nowrap}#detail dl.dgrid dd{margin:0;word-break:break-all}
#detail .dcode{font-size:11px;color:#555;margin-left:2px}#detail .dsub{font-size:10.5px;color:#888}
`;document.head.appendChild(st);
const H=(html)=>{const t=document.createElement('template');t.innerHTML=html.trim();return t.content};
const header=document.querySelector('header'),mainEl=document.querySelector('main');
const upd=header.querySelector('.upd');header.insertBefore(H("<button id=\"edToggle\" class=\"ctl\" style=\"height:28px;padding:0 12px;border:1px solid;border-radius:6px;background:#fff;cursor:pointer;font-size:13px;font-weight:700\">✎ 아이디어 모드</button>\n"),upd||null);
document.getElementById('edToggle').after(H('<button id="hdPPT" title="지금 화면의 도면을 PowerPoint(도형)로 내보내기">PPT로 내보내기</button>'));
const tag0=header.querySelector('.tag');tag0?tag0.after(H("<span id=\"planTag\" class=\"tag\" style=\"display:none;border-color:#1d5bd8;color:#1d5bd8\"></span>")):header.querySelector('h1').after(H("<span id=\"planTag\" class=\"tag\" style=\"display:none;border-color:#1d5bd8;color:#1d5bd8\"></span>"));
mainEl.before(H("<div id=\"shapebar\">\n<span class=\"grp\"><b style=\"color:var(--accent)\">모양 편집</b>&nbsp;<b id=\"shName\"></b>&nbsp;<span id=\"shArea\"></span></span>\n<span class=\"grp c\">● 꼭짓점 끌기(Shift: 수평·수직) · ■ 변 끌어 벽 밀기 · ■ 더블클릭: 꼭짓점 추가 · ● 우클릭: 꼭짓점 삭제</span>\n<span class=\"grp\" id=\"shEdge\"></span>\n<span class=\"grp\"><label><input type=\"checkbox\" id=\"shSnap\" checked> 맞춤 안내선(주변 벽·매장 크기)</label></span>\n<span class=\"grp\"><button id=\"shUndo\" disabled title=\"Ctrl+Z\">↶ 한 단계 취소</button><button id=\"shOk\" class=\"pri\" title=\"Enter\">확정</button><button id=\"shCancel\" title=\"Esc\">취소</button></span>\n<span id=\"shWarn\"></span>\n</div>\n<div id=\"insbar\">\n<span class=\"grp\"><b style=\"color:#1a7f37\">매장 삽입</b>&nbsp;<label><input type=\"radio\" name=\"insMode\" value=\"rect\" checked> 사각형</label><label><input type=\"radio\" name=\"insMode\" value=\"poly\"> 다각형</label></span>\n<span class=\"grp\">매장명 <input id=\"insName\" value=\"신규 매장\" style=\"width:120px;height:26px\"> 분류 <select id=\"insGroup\" style=\"height:26px\"><option value=\"rtw\">패션(RTW)</option><option value=\"lux\">명품</option><option value=\"jw\">주얼리·시계</option><option value=\"acc\">잡화</option><option value=\"etc\" selected>기타</option><option value=\"vacant\">공실</option></select> <span class=\"c\">매장코드: 미배정</span></span>\n<span class=\"grp\" id=\"insArea\"></span>\n<span class=\"grp\"><label><input type=\"checkbox\" id=\"insSnap\" checked> 맞춤 안내선(주변 벽·매장 크기)</label></span>\n<span class=\"grp\"><button id=\"insBack\" disabled title=\"Backspace\">↶ 점 취소</button><button id=\"insOk\" class=\"pri\" disabled title=\"Enter\">삽입</button><button id=\"insCancel\" title=\"Esc\">취소</button></span>\n<span id=\"insWarn\"></span>\n</div>"));
const listH2=[...document.querySelectorAll('aside h2')].find(h=>/매장 목록/.test(h.textContent));
{const tb=list.closest('table');if(tb&&!document.getElementById('listWrap')){const w=document.createElement('div');w.id='listWrap';tb.before(w);w.appendChild(tb)}}/* 정보 패널 순서: 매장 정보 → 매장 목록 → 변경 내역(기본 접힘, 제목을 누르면 펼침) */
document.querySelector('aside').appendChild(H("<div id=\"logbox\"><h2 id=\"logHead\" title=\"펼치기/접기\"><span id=\"logArrow\">▸</span> 변경 내역 <span id=\"edCount\" class=\"c\"></span></h2><ul id=\"edLog\"></ul></div>"));
document.getElementById('logHead').onclick=()=>{const b=document.getElementById('logbox'),o=!b.classList.contains('open');b.classList.toggle('open',o);document.getElementById('logArrow').textContent=o?'▾':'▸'};
if(!document.getElementById('saved-state')){const s=document.createElement('script');s.id='saved-state';s.type='application/json';s.textContent='null';document.body.appendChild(s)}

/* 우측 아이콘 도구 막대(유사 기능끼리 묶음) · 상태 표시 · 정보 패널 접기 · 유출 경고 */
const ICON={
  zin:'<path d="M12 5v14M5 12h14"/>',zout:'<path d="M5 12h14"/>',
  fit:'<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
  sel:'<path d="M6 3l12 9-5.2 1 3 5.6-2.2 1.2-3-5.6L6 18z"/>',
  move:'<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
  rect:'<rect x="6" y="6" width="12" height="12"/><rect x="3.5" y="3.5" width="4" height="4" fill="#fff"/><rect x="16.5" y="3.5" width="4" height="4" fill="#fff"/><rect x="3.5" y="16.5" width="4" height="4" fill="#fff"/><rect x="16.5" y="16.5" width="4" height="4" fill="#fff"/>',
  poly:'<path d="M6 18L9 6l10 4-3 8z"/><circle cx="6" cy="18" r="2" fill="#fff"/><circle cx="9" cy="6" r="2" fill="#fff"/><circle cx="19" cy="10" r="2" fill="#fff"/><circle cx="16" cy="18" r="2" fill="#fff"/>',
  merge:'<path d="M4 4h9v6h7v10h-9v-6H4z"/><path d="M11 10h2v4h-2z" stroke-dasharray="2 2"/>',
  split:'<circle cx="6" cy="7" r="2.6"/><circle cx="6" cy="17" r="2.6"/><path d="M8.2 8.4L20 17M8.2 15.6L20 7"/>',
  shape:'<path d="M5 19V8l7-4 7 6v9z"/><circle cx="12" cy="4" r="2" fill="#fff"/><circle cx="19" cy="10" r="2" fill="currentColor"/><circle cx="5" cy="8" r="2" fill="#fff"/>',
  del:'<path d="M15 4l5 5-9 9H7l-3-3z"/><path d="M10 9l5 5M7 18h13"/>',
  name:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 010 10h-4"/>',
  redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 000 10h4"/>',
  orig:'<rect x="4" y="4" width="16" height="16" stroke-dasharray="3 2.5"/><path d="M8 15l3-4 2 2 3-4"/>',
  snap:'<path d="M6 4v7a6 6 0 0012 0V4h-4v7a2 2 0 01-4 0V4z"/><path d="M6 8h4M14 8h4"/>',
  file:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
  panel:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M15 4v16M17.5 8h1.5M17.5 11h1.5M17.5 14h1.5"/>',
  fill:'<path d="M4.5 11.5L11 5l7.5 7.5L12 19z"/><path d="M4.5 11.5h14"/><path d="M20.5 15.5c0 1.6 1 2.4 1 3.4a1 1 0 01-2 0c0-1 1-1.8 1-3.4z" fill="currentColor"/>',
  fcolor:'<path d="M7 15L12 3.5 17 15M8.8 11h6.4"/><rect x="4" y="18" width="16" height="3" rx=".5" fill="currentColor" stroke="none"/>',
  lbl:'<path d="M4 7V5h10v2M9 5v10M7 15h4"/><path d="M17 11v9M13.5 15.5h7M17 11l-1.5 1.5M17 11l1.5 1.5M17 20l-1.5-1.5M17 20l1.5-1.5"/>'};
const IB=(id,ic,title,cls='')=>`<button type="button" id="${id}" class="tbtn ${cls}" title="${title}"><svg viewBox="0 0 24 24">${ICON[ic]}</svg></button>`;
const IT=(id,ic,title,checked)=>`<label class="tbtn" title="${title}"><input type="checkbox" id="${id}" hidden${checked?' checked':''}><svg viewBox="0 0 24 24">${ICON[ic]}</svg></label>`;
const wrapEl=document.getElementById('wrap')||document.getElementById('plan').parentNode;
const planRow=document.createElement('div');planRow.id='planRow';const planSvg=document.getElementById('plan');planSvg.before(planRow);
planRow.appendChild(H(`<div id="tb">
<div class="g">${IB('asideTog','panel','매장 정보 패널 펼치기/접기')}</div>
<div class="g">${IB('tZin','zin','확대')}${IB('tZout','zout','축소')}${IB('tFit','fit','전체 보기')}</div>
<div class="g ed">${IB('tSel','sel','선택 (V) · Ctrl+클릭: 여러 개 선택 · 선택한 공간은 끌어서 이동','on')}${IB('tMove','move','이동 (M) · 공간을 끌어 옮기기(Shift: 수평·수직)')}${IB('tLbl','lbl','라벨 도구 (L) · 라벨 끌어 옮기기 · 더블클릭: 원래대로&#10;선택한 공간 라벨: Ctrl+Shift+&gt; / ] 크게 · Ctrl+Shift+&lt; / [ 작게 · Ctrl+B 굵게 · Ctrl+I 기울임 · Alt+방향키 10cm 이동(Shift: 1m)')}</div>
<div class="g ed">${IB('edInsert','rect','매장 삽입 - 사각형')}${IB('edInsPoly','poly','매장 삽입 - 다각형')}</div>
<div class="g ed">${IB('edMerge','merge','합치기 (2개 이상 선택)')}${IB('edSplit','split','분할 (1개 선택)')}${IB('edShape','shape','모양 편집 (1개 선택)')}${IB('edDel','del','삭제 (Delete)','danger')}</div>
<div class="g ed">${IB('edRename','name','이름·코드·도면 표시명 변경 (F2 · 더블클릭)')}${IB('edFill','fill','도형 채움색 (선택한 공간)')}${IB('edFcolor','fcolor','글자색 (선택한 공간 라벨)')}</div>
<div class="g ed">${IB('edUndo','undo','되돌리기 (Ctrl+Z)')}${IB('edRedo','redo','다시 실행 (Ctrl+Y)')}</div>
<div class="g ed">${IT('edOrig','orig','원본 윤곽 겹쳐 보기',false)}${IT('edSnap','snap','맞춤 안내선(공간을 옮길 때 주변 벽에 맞춤)',true)}</div>
<div class="g ed">${IB('tFile','file','저장·불러오기·내보내기')}</div>
</div>
<div id="splitPop" class="pop"><h4>분할</h4>
<div class="row2">분할선 <label><input type="radio" name="edDir" value="h" checked> 가로선(위/아래)</label><label><input type="radio" name="edDir" value="v"> 세로선(좌/우)</label></div>
<div class="row2">면적 비율 <input type="range" id="edRatio" min="10" max="90" step="5" value="50" style="width:110px"><span id="edRatioT">50 : 50</span></div>
<div class="row2" style="justify-content:flex-end"><button type="button" id="edSplitX">취소</button><button type="button" id="edSplitGo" class="pri">분할</button></div></div>
<div id="colorPop" class="pop"><h4 id="cpTitle">도형 채움색</h4><div id="cpSw"></div><div class="row2"><button type="button" id="cpDef">기본색으로</button><label class="row2" style="gap:6px">직접 선택 <input type="color" id="cpPick" style="width:40px;height:26px;padding:0;border:1px solid #ccc;border-radius:4px"></label></div></div>
<div id="filePop" class="pop"><h4>저장 · 내보내기</h4>
<div class="row2">편집안 이름 <input id="edPlanName" placeholder="예: A안" style="width:110px;height:26px"></div>
<button type="button" id="edSave" class="pri" title="지금 편집 상태를 새 HTML 파일로 저장">편집 도면 저장(HTML)</button>
<button type="button" id="edLoad" title="JSON 저장 파일을 불러와 그 배치안으로 바꾸기">불러오기(JSON)</button><input type="file" id="edLoadFile" accept=".json,application/json" hidden>
<button type="button" id="edPPT" title="도면을 PowerPoint 도형으로 넣은 .pptx 저장">PowerPoint 저장</button>
<button type="button" id="edCSV">CSV 저장</button><button type="button" id="edJSON">JSON 저장</button>
<hr><button type="button" id="edReset" class="warn">원본으로 초기화</button></div>
<div id="edStat"><b>아이디어 모드</b><span id="edSel"></span><button type="button" id="edClear" title="선택 해제 (Esc)">선택 해제</button><span class="note">시뮬레이션 전용 · 원본 미반영</span></div>
`));planRow.appendChild(planSvg);
if(!document.getElementById('leakWarn'))wrapEl.appendChild(H('<div id="leakWarn">⚠ 본 도면은 신세계백화점 사내 대외비 자료입니다. 무단 복제·촬영·외부 유출 시 인사규정에 따라 징계 조치될 수 있습니다.</div>'));
/* 정보 패널: 기본은 접힌 상태 */
const asideTog=document.getElementById('asideTog');
const setAside=open=>{document.body.classList.toggle('asideClosed',!open);asideTog.classList.toggle('on',open);asideTog.title=open?'매장 정보 패널 접기':'매장 정보 패널 펼치기';
  requestAnimationFrame(()=>Plan.minFont&&Plan.minFont())};
setAside(false);asideTog.onclick=()=>setAside(document.body.classList.contains('asideClosed'));
/* 확대·축소·전체보기: 헤더의 원래 버튼(숨김)을 그대로 쓴다 */
[['tZin','in'],['tZout','out'],['tFit','fit']].forEach(([id,z])=>document.getElementById(id).onclick=()=>{const b=document.querySelector(`#zoomctl [data-z="${z}"]`);b&&b.click()});

/* 도면 이름: 파일 이름·PPT 제목·JSON 확인에 쓴다(도면 HTML의 <title>, 예: 강남점 2층 도면) */
const FLOOR_ID=(document.title||'도면').trim(),FLOOR_FILE=FLOOR_ID.replace(/[\\/:*?"<>|\s]+/g,'_');
const FLOOR_FULL=((document.querySelector('header h1')||{}).textContent||FLOOR_ID).trim();
/* ----- 2) 도면 본문 확장: 편집된 매장(여러 조각·라벨·선택) 지원 ----- */
/* 속도: 라벨 위치(labelPoint) 계산 결과를 도형·글자 폭별로 기억해 다시 쓴다(같은 모양이면 결과도 같다) */
const LPC=new Map();
/* 좁고 긴 매장은 가로 폭이 글자 크기를 정하므로 후보 점수가 위아래로 같아 라벨이 맨 위에 붙는다 → 가로 폭이 줄지 않는 범위에서 세로 가운데로 옮긴다 */
function centerY(v,r){const P=v.map(T),[x,y]=r.pt;
  const span=(x,y,horiz)=>{const xs=[];for(let i=0,j=P.length-1;i<P.length;j=i++){const[ax,ay]=P[j],[bx,by]=P[i];
      if(horiz){if((ay>y)!==(by>y))xs.push(ax+(y-ay)*(bx-ax)/(by-ay))}else{if((ax>x)!==(bx>x))xs.push(ay+(x-ax)*(by-ay)/(bx-ax))}}
    xs.sort((m,n)=>m-n);const c=horiz?x:y;for(let k=0;k+1<xs.length;k+=2)if(xs[k]<=c&&c<=xs[k+1])return [xs[k],xs[k+1]];return null};
  const vsp=span(x,y,false);if(!vsp)return r;const cy=(vsp[0]+vsp[1])/2,h0=span(x,y,true),h1=span(x,cy,true);if(!h0||!h1)return r;
  const w=s=>2*Math.min(x-s[0],s[1]-x);if(w(h1)<w(h0)*0.99)return r;
  return Object.assign({},r,{pt:[x,cy],hs:w(h1),vs:vsp[1]-vsp[0]})}
if(typeof labelPoint==='function'){const LP0=labelPoint;labelPoint=function(node,v,e1,e2){
  const k=(node.getAttribute('d')||'')+'|'+(e1||0)+'|'+(e2||0);let r=LPC.get(k);
  if(!r){r=LP0(node,v,e1,e2);if(!v.some(p=>p[2])&&e1&&r.hs/e1<r.vs*0.8)r=centerY(v,r);  /* 가로 폭이 글자 크기를 정하는 좁은 매장만 */if(LPC.size>3000)LPC.clear();LPC.set(k,r)}
  return {pt:[r.pt[0],r.pt[1]],w:r.w,h:r.h,r:r.r,hs:r.hs,vs:r.vs}}}
/* 글자 맞춤 결과(한 줄/두 줄·글자 크기)도 도형·라벨 글자별로 기억한다 */
const LFC=new Map();
Store.prototype.render=function(layer,labels){
    this.node=el('path',{d:this.rings?ringsPath(this.rings):pathOf(this.v),class:'store','data-id':this.id},layer);this.node.style.fill=this.fill||COLORS[this.group];
    this.labels=labels;if(this.shop_cd||this.edited)this.layoutLabel();  /* 매장코드 미매핑 공간은 도면에 이름을 쓰지 않는다(툴팁·목록에는 표시) */
    this.bind()}
Store.prototype.bind=function(){
    this.node.addEventListener('click',e=>Plan.pick&&document.body.classList.contains('editing')?Plan.pick(this.id,e):Plan.select(this.id));
    this.node.addEventListener('dblclick',e=>{if(document.body.classList.contains('editing')&&Plan.renameItem){e.stopPropagation();Plan.renameItem(this.id)}});
    this.node.addEventListener('mousemove',e=>Plan.tip(e,this.name+(this.shop_cd?` (${this.shop_cd})`:'')+(this.edited?` · ${this.area_note==='비공개'?'면적 비공개':this.area_m2+'㎡'} · 편집`:'')));
    this.node.addEventListener('mouseleave',()=>Plan.tip(null));
  }
/* 라벨 줄바꿈: 이름을 n줄로 나눈다. 띄어쓰기가 있으면 단어 단위로, 없으면 글자 단위로 줄 폭이 비슷하게 나눈다 */
const splitLines=(s,n)=>{if(n<=1)return [s];const w=s.split(/\s+/).filter(Boolean),sl=s.split(/(?<=\/)/).filter(Boolean);
  let unit,sep;if(w.length>=n){unit=w;sep=' '}else if(sl.length>=n&&w.length===1){unit=sl;sep=''}
  else if(n===2&&w.length===1&&[...s].length>=4){unit=[...s];sep=''}  /* 글자 단위로 끊는 것은 두 줄까지만 */else return null;  /* 띄어쓰기가 있는데 단어 수가 줄 수보다 적으면 단어 중간을 끊지 않는다 */
  const tot=unit.reduce((a,u)=>a+emw(u),0),out=[];let cur=[],acc=0;
  unit.forEach((u,i)=>{const uw=emw(u),left=unit.length-i;
    if(cur.length&&out.length<n-1&&(acc+uw/2>tot*(out.length+1)/n||left<=n-1-out.length)){out.push(cur.join(sep).trim());cur=[]}
    cur.push(u);acc+=uw});
  if(cur.length)out.push(cur.join(sep).trim());return out.length===n&&out.every(Boolean)?out:null};
/* tspan 줄 간격: 가운데 정렬(n줄) */
const lineDy=(fs,i,n)=>i?fs*1.1:-fs*0.55*(n-1);
const WRAP_MIN_AREA=100000;
/* 라벨 서식(아이디어 모드 단축키): lscale 글자 크기 배율 · lbold 굵게(없으면 기본) · litalic 기울임 */
const applyLStyle=(t,d,defW)=>{if(d.lcolor)t.setAttribute('fill',d.lcolor);t.setAttribute('font-weight',d.lbold===undefined?defW:(d.lbold?700:400));if(d.litalic)t.setAttribute('font-style','italic');else t.removeAttribute('font-style');
  t.dataset.ls=d.lscale||1;if(d.lpos||(d.lscale&&d.lscale!==1))t.dataset.man='1';else delete t.dataset.man};
const bbArea=d=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;(d.rings?d.rings.flat(2):d.v).forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});return (x1-x0)*(y1-y0)};  /* 화면 재계산 없이 경계 상자 넓이(cm²) */
/* 캔버스로 글자 폭 재기(글자 크기 1 기준). 라벨과 같은 글꼴·굵기 */
const TCX=document.createElement('canvas').getContext('2d'),TWC=new Map();let TFAM=null;
const textW=(s,t)=>{if(!TFAM)TFAM=getComputedStyle(t).fontFamily||'sans-serif';let w=TWC.get(s);if(w==null){TCX.font=`700 100px ${TFAM}`;w=TCX.measureText(s).width/100;if(TWC.size>5000)TWC.clear();TWC.set(s,w)}return w};  /* 줄바꿈 적용 최소 매장 크기(경계 상자 10㎡). 이보다 작은 매장은 기존 방식(작은 글자 → 화면 최소 크기 확대) */
Store.prototype.layoutLabel=function(){
    const labels=this.labels;if(this.labelEl){this.labelEl.remove();this.labelEl=null;this.fitSize=0}
    labels.querySelectorAll(`text[data-lid="${CSS.escape(this.id)}"]`).forEach(e=>e.remove());  /* 같은 매장의 남은 라벨(중복) 정리 */
    const code=Plan.showCode?this.shop_cd:null,nm=this.label||this.name;  /* label: 도면 표시명(비우면 매장명) */
    this.labelText=code?`${nm}(${code})`:nm;
    const s2=splitLines(nm,2),ems2=code?Math.max(emw(nm),emw(`(${code})`)):s2?Math.max(...s2.map(emw)):0;
    const L=labelPoint(this.node,this.v,emw(this.labelText),ems2),[x,y]=L.pt;this.lpt=L.pt;
    /* 글자 맞추기: 라벨 지점의 실제 가로·세로 폭 안에 들어가도록 */
    const W=L.hs*0.88,H=L.vs*0.8,base=Math.min(150,H*0.45);
    const t=txt(labels,x,y,this.labelText,base,700);this.labelEl=t;t.dataset.lid=this.id;
    const fk=(this.node.getAttribute('d')||'')+'|'+this.labelText+'|'+(code?1:0);
    const finish=()=>{applyLStyle(t,this,700);this.fitBase=+t.getAttribute('font-size');this.fitSize=this.fitBase*(this.lscale||1);
      if(this.fitSize!==this.fitBase){const f=this.fitSize,ts=t.querySelectorAll('tspan');t.setAttribute('font-size',f.toFixed(1));ts.forEach((e,i)=>e.setAttribute('dy',lineDy(f,i,ts.length)))}
      this.labelEl=t;
      if(this.lpos){const[px,py]=T(this.lpos);this.lpt=[px,py];t.setAttribute('x',px);t.setAttribute('y',py);t.querySelectorAll('tspan').forEach(ts=>ts.setAttribute('x',px))}  /* 아이디어 모드에서 옮긴 라벨 위치(원본 좌표) */
      Plan.minFont&&Plan.minFont()};
    const multi=(lines,fs)=>{t.textContent='';t.setAttribute('font-size',fs.toFixed(1));lines.forEach((ln,i)=>{el('tspan',{x,dy:lineDy(fs,i,lines.length)},t).textContent=ln})};
    const hit=LFC.get(fk);
    if(hit){if(hit.lines)multi(hit.lines,hit.fs);else{t.textContent=this.labelText;t.setAttribute('font-size',hit.fs.toFixed(1))}finish();return}
    /* 속도: 글자 폭은 캔버스로 재고(화면 재계산 없음), 크기·줄바꿈·매장 안 맞춤을 계산으로 정한 뒤 한 번만 적용한다 */
    const mw=s=>textW(s,t);
    const one=Math.min(base,H,W/mw(this.labelText));        /* 한 줄일 때 가능한 크기 */
    /* 여러 줄 후보: 매장코드 표시 중이면 [이름…, (코드)], 아니면 이름을 2~3줄로. 작은 매장은 줄바꿈하지 않는다 */
    const big=bbArea(this)>=WRAP_MIN_AREA;let best=null;
    const cands=[];if(code){cands.push([nm,`(${code})`]);if(big&&s2)cands.push(s2.concat([`(${code})`]))}
    else if(big){[s2,splitLines(nm,3)].forEach(c=>c&&cands.push(c))}
    cands.forEach(ls=>{const n=ls.length,m=Math.max(...ls.map(mw)),fs=Math.min(base,H/(n*1.15),W/m);if(!best||fs>best.fs*(n>best.ls.length?1.15:1))best={ls,fs}});  /* 줄이 늘면 15% 이상 커질 때만 */
    let lines=null,fs;if(best&&best.fs>one*1.15){lines=best.ls;fs=best.fs}else fs=Math.max(14,one);
    /* 최종 점검: 글자 상자 네 모서리가 매장 안에 들어올 때까지 축소(상자는 계산) */
    const p=svg.createSVGPoint(),ls=lines||[this.labelText],wmax=Math.max(...ls.map(mw));
    const fits=f=>{const w=wmax*f,h=((ls.length-1)*1.1+1.2)*f,x0=x-w/2,y0=y-h/2;return [[x0,y0],[x0+w,y0],[x0,y0+h],[x0+w,y0+h]].every(([px,py])=>{p.x=px;p.y=py;return this.node.isPointInFill(p)})};
    for(let k=0;k<30&&!fits(fs)&&fs>14;k++)fs*=0.9;
    if(lines)multi(lines,fs);else{t.textContent=this.labelText;t.setAttribute('font-size',fs.toFixed(1))}
    if(LFC.size>3000)LFC.clear();LFC.set(fk,{lines,fs});
    finish();
  }
/* 속도: 확대·축소·이동하는 동안에는 라벨 재배치(layout)를 미루고, 손을 멈춘 뒤 한 번만 한다.
   도면 이동만 하고 배율이 그대로면 글자 크기가 같으므로 다시 배치하지 않는다 */
{const mf0=Plan.minFont;let lastK=0,lastVB='',t0=0,tm=0;
  const scaleNow=()=>{const r=svg.getBoundingClientRect(),vbx=(svg.getAttribute('viewBox')||'0 0 1 1').split(' ').map(Number);return r.width?Math.min(r.width/vbx[2],r.height/vbx[3]):0};
  ['wheel','touchmove'].forEach(ev=>svg.addEventListener(ev,()=>{t0=performance.now()},{capture:true,passive:true}));
  const run=()=>{clearTimeout(tm);tm=0;lastK=scaleNow();lastVB=svg.getAttribute('viewBox');mf0()};
  /* 판단은 다음 프레임에 한 번만(여러 번 불려도 화면 크기를 한 번만 읽어 재계산을 막는다) */
  let pend=0,force=false;const decide=()=>{pend=0;const k=scaleNow(),vbs=svg.getAttribute('viewBox'),same=lastK&&Math.abs(k-lastK)<=lastK*1e-6,f=force;force=false;
    if(!f&&vbs!==lastVB&&same&&!tm){lastVB=vbs;return}                        /* 도면 이동만: 글자 크기 그대로 → 재배치 생략 */
    if(!f&&vbs!==lastVB&&!same&&performance.now()-t0<300){clearTimeout(tm);tm=setTimeout(run,160);return}  /* 휠·핀치 확대 중: 멈춘 뒤 한 번 */
    run()};
  Plan.minFont=()=>{if(svg.getAttribute('viewBox')===lastVB)force=true;  /* 화면 이동 없이 불린 경우 = 내용 변경 → 반드시 재배치 */
    if(!pend)pend=requestAnimationFrame(decide)}}
/* 속도: 라벨 배치(layout) 다시 쓰기 — 배치 규칙은 도면 본문과 같고, 계산 방법만 바꿨다.
   본문은 후보 자리·크기마다 글자 속성을 바꾸고 getBBox로 다시 재서(매번 화면 재계산) 매장이 많으면 수 초가 걸린다.
   여기서는 ① 모든 글자를 한 번에 재고(글자 상자는 글자 크기에 비례) ② 후보는 계산으로만 비교한 뒤 ③ 마지막에 한 번에 적용한다 */
if(typeof layout==='function'){
  const MINPX=typeof MIN_PX!=='undefined'?MIN_PX:12,FLOWPX=typeof FLOW_MIN_PX!=='undefined'?FLOW_MIN_PX:9,FACPX=typeof FAC_MIN_PX!=='undefined'?FAC_MIN_PX:9;
  const NUD=typeof NUDGE!=='undefined'?NUDGE:[[0,0],[0,-1.3],[0,1.3],[-1.6,0],[1.6,0]];
  const setFs=(t,fs)=>{const ts=t.querySelectorAll('tspan');t.setAttribute('font-size',fs.toFixed(1));ts.forEach((e,i)=>e.setAttribute('dy',lineDy(fs,i,ts.length)))};
  const mv=(t,x,y)=>{t.setAttribute('x',x);t.setAttribute('y',y);t.querySelectorAll('tspan').forEach(ts=>ts.setAttribute('x',x))};
  /* 글자 크기 1 기준 상자(기준점 x,y에 대한 상대값) */
  const metric=t=>{const k=t.textContent+'|'+t.childElementCount+'|'+t.getAttribute('font-weight')+'|'+t.getAttribute('font-style');if(t._m&&t._m.k===k)return t._m;
    const fs=+t.getAttribute('font-size')||1,x=+t.getAttribute('x'),y=+t.getAttribute('y'),b=t.getBBox();
    return t._m={k,ox:(b.x-x)/fs,oy:(b.y-y)/fs,w:b.width/fs,h:b.height/fs}};
  const boxAt=(m,fs,x,y)=>[x+m.ox*fs,y+m.oy*fs,x+(m.ox+m.w)*fs,y+(m.oy+m.h)*fs];
  /* 매장 안 후보 지점(도형이 같으면 다시 쓰지 않음) */
  const ptsOf=s=>{const d=s.node.getAttribute('d');if(s._pc&&s._pc.d===d)return s._pc;const B=s.node.getBBox(),p=svg.createSVGPoint(),pts=[];
    for(let i=1;i<6;i++)for(let j=1;j<6;j++){p.x=B.x+B.width*i/6;p.y=B.y+B.height*j/6;if(s.node.isPointInFill(p))pts.push([p.x,p.y])}
    return s._pc={d,pts,area:B.width*B.height}};
  layout=function(){const r=svg.getBoundingClientRect();if(!r.width)return;const vbx=svg.getAttribute('viewBox').split(' ').map(Number),k=Math.min(r.width/vbx[2],r.height/vbx[3]),u=1/k;
    const pad=1.5*u,ov=(a,b)=>a[0]<b[2]+pad&&b[0]<a[2]+pad&&a[1]<b[3]+pad&&b[1]<a[3]+pad;
    if(svg.classList.contains('nolbl'))return;
    const ST=[...Plan.stores.values()].filter(s=>s.labelEl&&s.fitSize&&s.node.isConnected);
    const flowOn=!document.getElementById('flow-layer').classList.contains('hidden'),facOn=!document.getElementById('fac-label').classList.contains('hidden');
    const FLW=flowOn?[...document.querySelectorAll('#flow-layer text,#flow-layer .badge')]:[],FAC=facOn?[...document.querySelectorAll('#fac-label text')]:[];
    /* 1) 쓰기: 보이게 하고 기본 자리·크기로 */
    ST.forEach(s=>{const t=s.labelEl;t.style.display='';mv(t,s.lpt[0],s.lpt[1]);setFs(t,s.fitSize)});
    FLW.forEach(e=>{e.style.display='';if(e.classList.contains('badge')||e.classList.contains('badge-t'))return;
      if(e.dataset.fs==null){e.dataset.fs=e.getAttribute('font-size');e.dataset.x=e.getAttribute('x');e.dataset.y=e.getAttribute('y')}});
    FAC.forEach(t=>{t.style.display='';if(t.dataset.fs==null)t.dataset.fs=t.getAttribute('font-size')});
    /* 2) 읽기: 한 번에 잰다 */
    ST.forEach(s=>{s._mt=metric(s.labelEl);ptsOf(s)});
    const flw=FLW.map(e=>{const isB=e.classList.contains('badge')||e.classList.contains('badge-t');if(isB){const b=e.getBBox();return {e,isB,box:[b.x,b.y,b.x+b.width,b.y+b.height]}}
      return {e,isB,m:metric(e),fs0:+e.dataset.fs,x0:+e.dataset.x,y0:+e.dataset.y}});
    const fac=FAC.map(t=>({t,m:metric(t),f0:+t.dataset.fs,x:+t.getAttribute('x'),y:+t.getAttribute('y'),a:+t.dataset.a||0,sc:+t.dataset.ls||1,man:!!t.dataset.man}));
    /* 3) 계산 */
    ST.forEach(s=>{s._fs=s.fitSize;s._x=s.lpt[0];s._y=s.lpt[1];s._b=boxAt(s._mt,s._fs,s._x,s._y)});
    const fixed=[];
    flw.forEach(o=>{if(o.isB){fixed.push(o.box);o.show=true;return}
      const fs=Math.max(o.fs0,FLOWPX*u);o.fs=fs;o.show=false;
      for(const[dx,dy]of NUD){const x=o.x0+dx*fs,y=o.y0+dy*fs,b=boxAt(o.m,fs,x,y);if(!ST.some(s=>ov(s._b,b))&&!fixed.some(a=>ov(a,b))){fixed.push(b);o.x=x;o.y=y;o.show=true;break}}});
    ST.slice().sort((a,b)=>b._pc.area-a._pc.area).forEach(s=>{const want=MINPX*u,sc=s.lscale||1;
      /* 직접 옮기거나 크기를 바꾼 라벨: 자리는 그대로, 글자 크기 = (다른 라벨과 같은 기준 크기) × 배율 */
      if(s.lpos||sc!==1){const f=Math.max(s.fitBase||s.fitSize,want)*sc;s._fs=f;s._b=boxAt(s._mt,f,s._x,s._y);return}
      if(s.fitSize>=want)return;
      const obs=ST.filter(o=>o!==s).map(o=>o._b).concat(fixed),free=b=>!obs.some(a=>ov(a,b));
      const pts=[s.lpt].concat(s._pc.pts).sort((p,q)=>Math.hypot(p[0]-s.lpt[0],p[1]-s.lpt[1])-Math.hypot(q[0]-s.lpt[0],q[1]-s.lpt[1]));
      for(const f of [1,0.85,0.72,0.6]){const fs=Math.max(s.fitSize,want*f);if(fs<=s.fitSize&&f<1)break;
        for(const[x,y]of pts){const b=boxAt(s._mt,fs,x,y);if(free(b)){s._fs=fs;s._x=x;s._y=y;s._b=b;return}}}});
    const all=ST.map(s=>s._b).concat(fixed);
    fac.sort((a,b)=>b.man-a.man||b.a-a.a).forEach(o=>{o.show=false;for(const px of [FACPX,FACPX*0.85]){const fs=Math.max(o.f0,px*u*o.sc),b=boxAt(o.m,fs,o.x,o.y);if(o.man||!all.some(a=>ov(a,b))){all.push(b);o.fs=fs;o.show=true;return}}});
    /* 4) 쓰기: 한 번에 적용 */
    ST.forEach(s=>{if(s._fs!==s.fitSize)setFs(s.labelEl,s._fs);if(s._x!==s.lpt[0]||s._y!==s.lpt[1])mv(s.labelEl,s._x,s._y)});
    flw.forEach(o=>{if(o.isB)return;const e=o.e;if(!o.show){e.style.display='none';return}e.setAttribute('font-size',o.fs.toFixed(1));if(e.getAttribute('stroke'))e.setAttribute('stroke-width',(o.fs*0.16).toFixed(1));e.setAttribute('x',o.x);e.setAttribute('y',o.y)});
    fac.forEach(o=>{if(!o.show){o.t.style.display='none';return}o.t.setAttribute('font-size',o.fs.toFixed(1))})}}
Plan.setShowCode=on=>{Plan.showCode=on;Plan.stores.forEach(s=>(s.shop_cd||s.edited)&&s.layoutLabel())};
['rings','edited','lpos','lscale','lbold','litalic','fitBase','fill','lcolor'].forEach(k=>SKIP.add(k));
/* 사용자 채움색이 있으면 색 되돌리기(resetColors) 때도 그 색으로 */
Plan.resetColors=()=>Plan.stores.forEach(s=>s.setColor(s.fill||COLORS[s.group]));LABEL.from='원본 매장';LABEL.label='도면 표시명';
/* 상세 정보: 기본 보기와 아이디어 모드가 같은 형식을 쓴다(면적 비공개 공간은 면적만 '비공개') */
/* 상세 정보(기본 보기·아이디어 모드 공통, 면적 비공개 공간은 면적만 '비공개'). 관련 항목은 한 줄로 묶어 공간을 줄인다
   - 매장명 + 매장코드 / 공간명 + (공간ID) / 공간유형 · 면적(평) / 그 밖의 항목(도면 표시명·원본·외부 연동 값)은 아래에 이어서 */
const DONE=new Set(['name','shop_cd','space_id','space_nm','type','area_m2','area_py','area_note']);
const dEsc=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const detailHTML=s=>{const fac=s.type&&s.type!=='매장';
  const area=s.area_note==='비공개'?'면적 비공개':s.area_m2!=null?`${s.area_m2}㎡${s.area_py!=null?` (${s.area_py}평)`:''}`:'면적 -';
  const rows=[[fac?'시설':'매장',`<b>${dEsc(s.name??s.space_nm)}</b>`+(fac?'':` <span class="dcode">${s.shop_cd?dEsc(s.shop_cd):'(미배정)'}</span>`)],
    ['공간',`${dEsc(s.space_nm)} <small class="dsub">(${dEsc(s.space_id)})</small>`],
    ['유형·면적',`${dEsc(s.type)} · ${area}`]];
  Object.entries(s).forEach(([k,v])=>{if(DONE.has(k)||SKIP.has(k)||k[0]==='_'||typeof v==='function'||(v&&typeof v==='object'))return;rows.push([LABEL[k]||k,dEsc(v??'-')])});
  return '<dl class="dgrid">'+rows.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')+'</dl>'};
{const rd=s=>{if(!s)return;detail.innerHTML=detailHTML(s)};
  if(Plan.handlers.select)Plan.handlers.select=Plan.handlers.select.map(f=>f===renderDetail?rd:f);
  /* store.update(...) 후 다시 그릴 때도 같은 형식 */
  if(Plan.handlers.update)Plan.handlers.update=[s=>{if(Plan.selected===s&&!ED.mode)rd(s);else if(ED.mode&&ED.picked.includes(s.id))refreshPick()}]}

/* ----- 3) 아이디어 모드 기능 ----- */

/* ===== 도면 편집 시뮬레이션 =====
   매장 합치기·분할(가로선/세로선, 면적 비율)·이름 변경·되돌리기를 화면에서만 시뮬레이션한다.
   공간관리시스템 원본 데이터(SPACES)는 바꾸지 않는다. 좌표 단위 cm, Y축 위쪽(원본 좌표계)으로 계산한다. */
const PC=window.polygonClipping;
const ED={mode:false,picked:[],seq:0,undo:[],redo:[],dir:'h',ratio:50,tool:'select',splitting:false};
const clone=o=>JSON.parse(JSON.stringify(o));
const BASE=SPACES.filter(s=>s.type==='매장').map(clone);
/* 시설(매장 외 공간): 아이디어 모드에서 선택·편집할 수 있게 state.facs로 함께 관리한다 */
const BASE_F=SPACES.filter(s=>s.type!=='매장').map(s=>{const o={};for(const k in s)if(k!=='node')o[k]=s[k];return clone(o)});
/* 저장된 편집안(HTML 저장 시 이 파일 안에 함께 들어감) */
const SAVED=(()=>{try{const e=document.getElementById('saved-state'),t=e&&e.textContent.trim();return t&&t!=='null'?JSON.parse(t):null}catch(e){return null}})();
let state=SAVED&&SAVED.state?SAVED.state:{stores:clone(BASE),facs:clone(BASE_F),log:[]};if(SAVED)ED.seq=SAVED.seq||0;
if(!Array.isArray(state.facs))state.facs=clone(BASE_F);  /* 이전 버전 저장본 */
/* 공간 찾기(매장·시설 공통) */
const isFac=d=>!!d&&d.type!=='매장';
const allOf=(st=state)=>st.stores.concat(st.facs);
const itemOf=(id,st=state)=>st.stores.find(d=>d.space_id===id)||st.facs.find(d=>d.space_id===id);
const dropIds=(st,ids)=>{st.stores=st.stores.filter(d=>!ids.has(d.space_id));st.facs=st.facs.filter(d=>!ids.has(d.space_id))};
const dispName=d=>isFac(d)?(d.name||d.space_nm).replace(/^([A-Z]\d+|\d+F)_/,''):d.name;
/* 면적 비공개(공간관리시스템 AREA_DSP=N): 아이디어 모드에서도 면적을 보이지 않는다. 합치기·분할로 생긴 공간도 비공개를 이어받는다 */
const hid=d=>!!d&&d.area_note==='비공개';
const hideArea=o=>{delete o.area_m2;delete o.area_py;o.area_note='비공개';return o};

/* bulge(호) 구간을 짧은 선분으로 펼친다: 합치기·분할 계산용 */
function flatten(v){const out=[],n=v.length;
  const push=p=>{const q=out[out.length-1];if(!q||q[0]!==p[0]||q[1]!==p[1])out.push([p[0],p[1]])};
  push(v[0]);
  for(let i=1;i<=n;i++){const j=i%n,[x0,y0]=v[i-1],[x1,y1]=v[j],b=(v[j][2]||0)/100;
    if(b){const dx=x1-x0,dy=y1-y0,c=Math.hypot(dx,dy);if(c>0){const dd=c*(1-b*b)/(4*b),cx=(x0+x1)/2-dy/c*dd,cy=(y0+y1)/2+dx/c*dd,
        a0=Math.atan2(y0-cy,x0-cx),sw=4*Math.atan(b),r=Math.hypot(x0-cx,y0-cy),k=Math.max(4,Math.ceil(Math.abs(sw)/(Math.PI/36)));
        for(let t=1;t<k;t++){const a=a0+sw*t/k;push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}}}
    push([x1,y1])}
  const f=out[0],l=out[out.length-1];if(out.length>1&&f[0]===l[0]&&f[1]===l[1])out.pop();return out}
const geomOf=d=>d.rings||[[flatten(d.v)]];
const ringA=r=>{let a=0;for(let i=0,j=r.length-1;i<r.length;j=i++)a+=(r[j][0]*r[i][1]-r[i][0]*r[j][1]);return Math.abs(a)/2};
const areaOf=mp=>mp.reduce((s,poly)=>s+ringA(poly[0])-poly.slice(1).reduce((h,r)=>h+ringA(r),0),0)/10000;  /* cm² → ㎡ */
const bboxOf=mp=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;mp.forEach(p=>p[0].forEach(([x,y])=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}));return[x0,y0,x1,y1]};
const r2=x=>Math.round(x*100)/100,py=m=>Math.round(m*0.3025*10)/10;
/* 여러 조각(rings)이 있는 경우 경로 생성(구멍은 evenodd로 비움) */
function ringsPath(mp){return mp.map(poly=>poly.map(r=>{const P=r.map(T);return 'M'+P.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L')+'Z'}).join(' ')).join(' ')}
/* 편집으로 생긴 매장 데이터 */
function mkStore(mp,props){const big=mp.reduce((a,p)=>ringA(p[0])>ringA(a[0])?p:a,mp[0]);const m=r2(areaOf(mp));
  ED.seq++;const id='NEW-'+String(ED.seq).padStart(2,'0');
  return Object.assign({space_id:id,space_nm:'편집_'+id,type:'매장',v:big[0].map(p=>[Math.round(p[0]*10)/10,Math.round(p[1]*10)/10]),rings:mp,area_m2:m,area_py:py(m),shop_cd:null,group:'etc',edited:true},props)}
const areaNow=d=>d.area_m2??r2(areaOf(geomOf(d)));
/* 화면·파일에 쓰는 면적 글자: 비공개 공간은 숫자 대신 '비공개' */
const areaTxt=d=>hid(d)?'면적 비공개':areaNow(d)+'㎡';
const areaCell=d=>hid(d)?'비공개':areaNow(d);
const sumTxt=P=>{if(P.some(hid))return '합계 비공개(면적 비공개 공간 포함)';const s=r2(P.reduce((a,d)=>a+areaNow(d),0));return `${s}㎡ (${py(s)}평)`};

/* ----- 시설 그리기: 원래 도면의 시설 도형을 지우고 state.facs로 다시 그린다 ----- */
/* 엘리베이터·계단(계단실 포함)은 이동 시설: 매장 아래 flow-base에 그리고 '이동 시설' 체크박스로 켜고 끈다 */
const IS_STAIR=f=>/계단/.test(f.space_nm||'')||/계단/.test(f.name||'');
const IS_MOVEF=f=>IS_ELEV(f)||IS_STAIR(f);
const FL_=document.getElementById('fac-layer'),FT_=document.getElementById('fac-label'),FB_=document.getElementById('flow-base'),FW_=document.getElementById('flow-layer');
SPACES.forEach(s=>{if(s.type!=='매장'&&s.node){s.node.remove()}});FT_.innerHTML='';
[...FW_.querySelectorAll('text')].filter(t=>t.textContent==='EV'&&t.getAttribute('fill')==='#2f4f7a').forEach(t=>t.remove());
const FACN=new Map();
const facCls=f=>IS_STAIR(f)?'fac stair':IS_ELEV(f)?'fac elev':f.type==='이동공간'||f.type==='후방동선'?'fac move':/서비스|라운지|사무실/.test(f.type)?'fac svc':'fac';
/* 속도: 바뀐 공간만 다시 그린다. RK/FK = 공간ID → 마지막으로 그린 데이터(JSON). 같으면 그대로 둔다 */
const RK=new Map(),FK=new Map(),keyOf=d=>JSON.stringify(d);
const dirty=ids=>[].concat(ids).forEach(id=>{RK.delete(id);FK.delete(id)});  /* 화면만 바뀌고 state는 그대로인 경우(모양 편집 취소 등) 강제로 다시 그리기 */
function drawFacs(){const want=new Map(state.facs.map(f=>[f.space_id,f]));
  [...FACN.entries()].forEach(([id,o])=>{const f=want.get(id);if(f&&FK.get(id)===keyOf(f))return;o.node.remove();o.lbl&&o.lbl.remove();FACN.delete(id);FK.delete(id)});
  state.facs.forEach(f=>{if(FACN.has(f.space_id))return;const ev=IS_ELEV(f),mv=IS_MOVEF(f);
    const node=el('path',{d:f.rings?ringsPath(f.rings):pathOf(f.v),class:facCls(f)+' efac'+(f.edited?' edited':''),'data-fid':f.space_id},mv?FB_:FL_);if(f.fill)node.style.fill=f.fill;
    const L=labelPoint(node,f.v),size=Math.min(70,Math.max(22,L.r*0.55)),lp=f.lpos?T(f.lpos):L.pt;
    const t=txt(mv?FW_:FT_,lp[0],lp[1],f.label||(ev?'EV':dispName(f)),(ev?Math.max(size,40):size)*(f.lscale||1),ev?700:0,ev?'#2f4f7a':'#555');t.dataset.a=L.w*L.h;t.dataset.lid=f.space_id;t.classList.add('efac-lbl');applyLStyle(t,f,ev?700:400);
    node.addEventListener('click',e=>{if(!ED.mode)return;e.stopPropagation();Plan.pick(f.space_id,e)});
    node.addEventListener('dblclick',e=>{if(!ED.mode)return;e.stopPropagation();renameItem(f.space_id)});
    node.addEventListener('mousemove',e=>Plan.tip(e,`${f.name||f.space_nm} · ${f.type}`+(f.edited?' · 편집':'')));node.addEventListener('mouseleave',()=>Plan.tip(null));
    FACN.set(f.space_id,{node,lbl:t,d:f});FK.set(f.space_id,keyOf(f))})}
const nodeOf=id=>{const s=Plan.get(id);if(s)return s.node;const f=FACN.get(id);return f&&f.node};
const lblOf=id=>{const s=Plan.get(id);if(s)return s.labelEl;const f=FACN.get(id);return f&&f.lbl};

/* ----- 다시 그리기(바뀐 공간만) ----- */
let firstBuild=true;
function rebuild(){
  Plan.selected=null;const want=new Map(state.stores.map(d=>[d.space_id,d]));let ch=false;
  [...Plan.stores.entries()].forEach(([id,s])=>{const d=want.get(id);
    if(d){const k=keyOf(d);if(RK.get(id)===k&&s.node.isConnected)return;
      /* 처음 한 번: 도면 본문이 이미 그린 원본 매장은 그대로 쓰고(라벨 계산 생략) 클릭 동작만 아이디어 모드용으로 바꾼다 */
      if(firstBuild&&!RK.has(id)){const b=BASE.find(x=>x.space_id===id);if(b&&keyOf(b)===k){const n=s.node.cloneNode(true);s.node.replaceWith(n);s.node=n;s.bind();if(s.labelEl)s.labelEl.dataset.lid=id;RK.set(id,k);
        /* 줄바꿈으로 더 크게 쓸 수 있는 매장(충분히 크고 글자가 최대 크기보다 작은 매장)만 라벨을 다시 맞춘다 */
        if((s.shop_cd||s.edited)&&bbArea(s)>=WRAP_MIN_AREA)requestAnimationFrame(()=>{if(s.node.isConnected&&Plan.get(id)===s&&!(s.fitSize>=149))s.layoutLabel()})  /* 도면 본문의 라벨 맞춤(같은 프레임에 먼저 예약됨)이 끝난 뒤에 다시 맞춘다 */
        return}}}
    s.node.remove();s.labelEl&&s.labelEl.remove();LL.querySelectorAll(`text[data-lid="${CSS.escape(id)}"]`).forEach(e=>e.remove());Plan.stores.delete(id);RK.delete(id);ch=true});
  want.forEach((d,id)=>{if(Plan.stores.has(id))return;const s=new Store(clone(d));s.render(SL,LL);if(d.edited)s.node.classList.add('edited');Plan.stores.set(id,s);RK.set(id,keyOf(d));ch=true});
  firstBuild=false;
  if(ch){const ar=s=>{const b=s.node.getBBox();return b.width*b.height};[...Plan.stores.values()].sort((a,b)=>ar(b)-ar(a)).forEach(s=>SL.appendChild(s.node))}
  list.innerHTML='';
  state.stores.slice().sort((a,b)=>a.space_nm.localeCompare(b.space_nm)).forEach(d=>{const s=Plan.get(d.space_id);if(!s)return;
    const tr=document.createElement('tr');tr.className='row'+(d.edited?' edited':'');tr.innerHTML=`<td>${escH(s.label||s.name)}</td><td class="c">${s.shop_cd??'(미배정)'}</td>`;
    tr.onclick=e=>ED.mode?pick(s.id,e):Plan.select(s.id);tr.ondblclick=()=>Plan.focus(s.id);list.appendChild(tr);s.row=tr});
  drawFacs();
  ED.picked=ED.picked.filter(id=>itemOf(id));
  detail.innerHTML=ED.mode?'':'매장을 클릭하면 상세 정보가 표시됩니다.';
  refreshPick();renderLog();Plan.minFont()}
function commit(next,msg){ED.burst=null;window.__fpSaved=false;ED.undo.push(JSON.stringify({state,seq:ED.seq}));ED.redo=[];state=next;state.log=state.log.concat([{t:new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}),msg}]);splitClose(true);rebuild()}
function undo(){ED.burst=null;if(!ED.undo.length)return;ED.redo.push(JSON.stringify({state,seq:ED.seq}));const o=JSON.parse(ED.undo.pop());state=o.state;if(!state.facs)state.facs=clone(BASE_F);ED.picked=[];splitClose(true);rebuild()}
function redo(){if(!ED.redo.length)return;ED.undo.push(JSON.stringify({state,seq:ED.seq}));const o=JSON.parse(ED.redo.pop());state=o.state;if(!state.facs)state.facs=clone(BASE_F);ED.picked=[];splitClose(true);rebuild()}
function resetAll(){if(!state.log.length)return;if(!confirm('모든 편집을 지우고 원본 도면으로 되돌릴까요?'))return;ED.undo.push(JSON.stringify({state,seq:ED.seq}));ED.redo=[];state={stores:clone(BASE),facs:clone(BASE_F),log:[]};ED.picked=[];splitClose(true);rebuild()}

/* ----- 선택: 클릭 = 그 공간만 선택, Ctrl(⌘)+클릭 = 여러 개 선택/해제 ----- */
Plan.pick=(id,e)=>pick(id,e);
function pick(id,e){if(window.SHAPE||window.INS)return;
  if(e&&(e.ctrlKey||e.metaKey)){const i=ED.picked.indexOf(id);i<0?ED.picked.push(id):ED.picked.splice(i,1)}
  else ED.picked=[id];
  splitClose(true);refreshPick()}
function refreshPick(){
  Plan.stores.forEach(s=>{const on=ED.picked.includes(s.id);s.node.classList.toggle('picked',on);s.row&&s.row.classList.toggle('picked',on);s.node.classList.remove('selected');s.row&&s.row.classList.remove('selected')});
  FACN.forEach((o,id)=>o.node.classList.toggle('picked',ED.picked.includes(id)));
  const P=ED.picked.map(id=>itemOf(id)).filter(Boolean);
  document.getElementById('edSel').textContent=P.length?(P.length===1?`${dispName(P[0])} · ${areaTxt(P[0])}`:`선택 ${P.length}개 · ${sumTxt(P)}`):'공간을 클릭해 선택하세요 (Ctrl+클릭: 여러 개)';
  document.getElementById('edClear').style.display=P.length?'':'none';
  document.getElementById('edMerge').disabled=P.length<2;document.getElementById('edSplit').disabled=P.length!==1;document.getElementById('edRename').disabled=P.length!==1;document.getElementById('edShape').disabled=P.length!==1;
  document.getElementById('edDel').disabled=!P.length;document.getElementById('edFill').disabled=!P.length;document.getElementById('edFcolor').disabled=!P.length;if(!P.length)closeColor();
  document.getElementById('edUndo').disabled=!ED.undo.length;document.getElementById('edRedo').disabled=!ED.redo.length;
  if(ED.mode)detail.innerHTML=P.length?(P.length>1?`<p style="margin:0 0 8px"><b>선택 ${P.length}개</b> · ${sumTxt(P)}</p>`:'')+P.map(d=>detailHTML(d)).join('<hr style="border:0;border-top:1px dashed #ddd;margin:8px 0">')
    :'<b>아이디어 모드</b><br><span class="c">① 매장·시설을 클릭하면 그것만 선택되고, Ctrl+클릭으로 여러 개를 고릅니다 · 빈 곳 클릭/Esc: 선택 해제<br>② 왼쪽 도구: 이동(선택한 공간 끌기) · 매장 삽입(사각형/다각형) · 합치기 · 분할 · 모양 편집 · 삭제 · 이름/도면 표시명 변경(더블클릭)<br>③ 결과는 화면에서만 바뀌며 원본 도면에는 반영되지 않습니다</span>';
  preview()}

/* ----- 합치기 ----- */
/* ----- 매장명·매장코드 입력 창(합치기·분할·이름 변경) -----
   items: [{label, name, code, hint, area, noCode, disp}] → 확인: [{name, code, disp}] / 취소: null
   noCode: 시설(매장코드 없음) / disp!==undefined: 도면 표시명(라벨) 입력칸을 함께 보인다 */
const escH=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function askStores(title,items,note){return new Promise(res=>{let d=document.getElementById('fpDlg');
  if(!d){d=document.createElement('dialog');d.id='fpDlg';document.body.appendChild(d)}
  d.innerHTML=`<form><h3>${escH(title)}</h3>${note?`<p class="c">${escH(note)}</p>`:''}`+items.map((it,i)=>`<fieldset><legend>${escH(it.label)}${it.area!=null?` · ${escH(it.area)}`:''}</legend>
    <label>${it.noCode?'시설명':'매장명'}<input name="n${i}" value="${escH(it.name)}" autocomplete="off"></label>
    ${it.noCode?'':`<label>매장코드<input name="c${i}" value="${escH(it.code||'')}" placeholder="${escH(it.hint||'비우면 미배정')}" autocomplete="off"></label>`}
    ${it.disp!==undefined?`<label>도면 표시명<input name="d${i}" value="${escH(it.disp||'')}" placeholder="비우면 ${it.noCode?'시설명':'매장명'}으로 표시" autocomplete="off"></label>`:''}</fieldset>`).join('')+
    `<div class="btns"><button type="button" id="fpCancel">취소</button><button type="submit" class="pri">확인</button></div></form>`;
  const f=d.querySelector('form');let done=false;const fin=v=>{if(done)return;done=true;if(d.open)d.close();res(v)};
  d.querySelector('#fpCancel').onclick=()=>fin(null);d.oncancel=e=>{e.preventDefault();fin(null)};
  f.onsubmit=e=>{e.preventDefault();fin(items.map((it,i)=>({name:f['n'+i].value.trim()||it.name,code:it.noCode?null:(f['c'+i].value.trim().toUpperCase()||null),disp:f['d'+i]?f['d'+i].value.trim():undefined})))};
  d.showModal();const n0=f['n0'];n0.focus();n0.select()})}
const cdTxt=c=>c?`(${c})`:'(미배정)';
const srcTxt=d=>d.from||(d.name+(d.shop_cd?`(${d.shop_cd})`:''));

async function merge(){const P=ED.picked.map(id=>itemOf(id)).filter(Boolean);if(P.length<2)return;
  let u;try{u=PC.union(...P.map(geomOf))}catch(e){alert('합치기 계산에 실패했습니다: '+e.message);return}
  if(u.length!==1){alert('서로 붙어 있는 공간만 합칠 수 있습니다.\n(선택한 공간들이 한 덩어리로 이어지지 않습니다)');return}
  /* 매장이 하나라도 있으면 결과는 매장, 모두 시설이면 시설 */
  const asFac=P.every(isFac),groups=[...new Set(P.map(d=>d.group))];
  const ns=mkStore(u,asFac?{type:P[0].type,group:'fac',name:P.map(dispName).join('+'),from:P.map(srcTxt).join(' + ')}
    :{name:P.map(dispName).join('+'),group:groups.length===1&&groups[0]!=='fac'?groups[0]:'etc',from:P.map(srcTxt).join(' + ')});
  if(asFac)ns.space_nm=ns.name;
  ns.area_m2=r2(P.reduce((a,d)=>a+areaNow(d),0));ns.area_py=py(ns.area_m2);  /* 합친 면적 = 원래 면적의 합 */
  if(P.some(hid))hideArea(ns);
  const codes=[...new Set(P.map(d=>d.shop_cd).filter(Boolean))];
  const ans=await askStores(asFac?'합친 시설의 이름':'합친 매장의 매장명·매장코드',[{label:asFac?'합친 시설':'합친 매장',name:ns.name,code:codes.length===1?codes[0]:'',hint:codes.length?'원래: '+codes.join(', '):'비우면 미배정',area:areaTxt(ns),noCode:asFac}],'취소하면 합치지 않습니다.');
  if(!ans)return;ns.name=ans[0].name;ns.shop_cd=ans[0].code;if(asFac)ns.space_nm=ns.name;
  const next=clone(state);dropIds(next,new Set(ED.picked));(asFac?next.facs:next.stores).push(ns);
  const msg=`합치기: ${P.map(d=>`${dispName(d)} ${areaTxt(d)}`).join(' + ')} → ${ns.name}${asFac?'':cdTxt(ns.shop_cd)} ${areaTxt(ns)}`;ED.picked=[ns.space_id];commit(next,msg)}

/* ----- 분할: 면적 비율이 맞는 분할선 위치를 찾는다 ----- */
function cutAt(G,dir,c){const[x0,y0,x1,y1]=bboxOf(G),m=1000,R=(a,b,c2,d)=>[[[[a,b],[c2,b],[c2,d],[a,d]]]];
  /* h: 가로 분할선 → 위(y>c)·아래 / v: 세로 분할선 → 왼쪽(x<c)·오른쪽 */
  const A=dir==='h'?R(x0-m,c,x1+m,y1+m):R(x0-m,y0-m,c,y1+m),B=dir==='h'?R(x0-m,y0-m,x1+m,c):R(c,y0-m,x1+m,y1+m);
  return[PC.intersection(G,A),PC.intersection(G,B)]}
function findCut(G,dir,ratio){const[x0,y0,x1,y1]=bboxOf(G),tot=areaOf(G);let lo=dir==='h'?y0:x0,hi=dir==='h'?y1:x1;
  for(let k=0;k<40;k++){const mid=(lo+hi)/2,a=areaOf(cutAt(G,dir,mid)[0])/tot;
    if(dir==='h'){a>ratio?lo=mid:hi=mid}else{a<ratio?lo=mid:hi=mid}}
  return Math.round((lo+hi)/2)}  /* cm 단위로 반올림 */
async function split(){if(ED.picked.length!==1)return;const d=itemOf(ED.picked[0]);if(!d)return;const G=geomOf(d),r=ED.ratio/100,fac=isFac(d);
  const c=findCut(G,ED.dir,r),[A,B]=cutAt(G,ED.dir,c);if(!A.length||!B.length){alert('분할할 수 없는 위치입니다. 비율을 바꿔 보세요.');return}
  const nm=ED.dir==='h'?['위','아래']:['왼쪽','오른쪽'],src=srcTxt(d),base=dispName(d);
  const props=k=>fac?{type:d.type,group:'fac',name:`${base} (${nm[k]})`,from:src}:{name:`${base} (${nm[k]})`,group:d.group,from:src};
  const a=mkStore(A,props(0)),b=mkStore(B,props(1));
  /* 나눈 면적은 원래 면적을 도형 비율대로 나눠 합계가 맞도록 한다(비공개 공간은 면적을 남기지 않는다) */
  if(hid(d)){hideArea(a);hideArea(b)}
  else{const tot=areaNow(d),ga=areaOf(A),gb=areaOf(B);a.area_m2=r2(tot*ga/(ga+gb));b.area_m2=r2(tot-a.area_m2);a.area_py=py(a.area_m2);b.area_py=py(b.area_m2)}
  const hint=d.shop_cd?'원래: '+d.shop_cd:'비우면 미배정';
  const ans=await askStores(fac?'나눈 시설의 이름':'나눈 매장의 매장명·매장코드',[{label:nm[0],name:a.name,code:'',hint,area:hid(d)?`비율 ${ED.ratio}%`:areaTxt(a),noCode:fac},{label:nm[1],name:b.name,code:'',hint,area:hid(d)?`비율 ${100-ED.ratio}%`:areaTxt(b),noCode:fac}],'취소하면 나누지 않습니다.');
  if(!ans)return;a.name=ans[0].name;a.shop_cd=ans[0].code;b.name=ans[1].name;b.shop_cd=ans[1].code;if(fac){a.space_nm=a.name;b.space_nm=b.name}
  const next=clone(state);dropIds(next,new Set([d.space_id]));(fac?next.facs:next.stores).push(a,b);
  const at=x=>hid(x)?'':' '+areaTxt(x);
  const msg=`${ED.dir==='h'?'가로선':'세로선'} 분할(${ED.ratio}:${100-ED.ratio}): ${base}${at(d)} → ${a.name}${fac?'':cdTxt(a.shop_cd)}${at(a)} / ${b.name}${fac?'':cdTxt(b.shop_cd)}${at(b)}`;
  ED.picked=[];commit(next,msg)}

/* 분할 미리보기: 분할선과 양쪽 면적(분할 창을 연 동안만) */
const EDL=el('g',{id:'edit-layer'},document.getElementById('plan')),ORL=el('g',{id:'orig-layer'},document.getElementById('plan'));
BASE.concat(BASE_F).forEach(d=>el('path',{d:pathOf(d.v),class:'orig'},ORL));ORL.style.display='none';
function preview(){EDL.innerHTML='';if(window.SHAPE||!ED.mode||!ED.splitting||ED.picked.length!==1)return;const d=itemOf(ED.picked[0]);if(!d)return;
  const G=geomOf(d),[x0,y0,x1,y1]=bboxOf(G),c=findCut(G,ED.dir,ED.ratio/100),[A,B]=cutAt(G,ED.dir,c);
  [A,B].forEach((p,i)=>p.length&&el('path',{d:ringsPath(p),class:'pv pv'+i},EDL));
  const[p,q]=ED.dir==='h'?[T([x0-60,c]),T([x1+60,c])]:[T([c,y0-60]),T([c,y1+60])];
  el('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],class:'cut'},EDL);
  const tot=areaNow(d),ga=areaOf(A),gb=areaOf(B);
  const lbl=(mp,tag,k)=>{if(!mp.length)return;const[a,b,c2,e]=bboxOf(mp),[x,y]=T([(a+c2)/2,(b+e)/2]);
    const m=hid(d)?(k?100-ED.ratio:ED.ratio)+'%':(k?r2(tot-r2(tot*ga/(ga+gb))):r2(tot*ga/(ga+gb)))+'㎡';
    const t=el('text',{x,y,'font-size':Math.min(110,Math.max(50,Math.min(c2-a,e-b)*0.12)),class:'pvt'},EDL);t.textContent=`${tag} ${m}`};
  const nm=ED.dir==='h'?['위','아래']:['왼쪽','오른쪽'];lbl(A,nm[0],0);lbl(B,nm[1],1)}
const splitPop=document.getElementById('splitPop');
function splitOpen(){if(ED.picked.length!==1||window.SHAPE||window.INS)return;if(ED.splitting){splitClose();return}
  closePops();ED.splitting=true;document.body.classList.add('splitting');
  splitPop.style.top=(document.getElementById('edSplit').getBoundingClientRect().top-planRow.getBoundingClientRect().top-8)+'px';
  splitPop.classList.add('open');document.getElementById('edSplit').classList.add('on');preview()}
function splitClose(quiet){if(!ED.splitting&&quiet)return;ED.splitting=false;document.body.classList.remove('splitting');splitPop.classList.remove('open');document.getElementById('edSplit').classList.remove('on');if(!quiet)preview();else EDL.innerHTML=''}

/* ----- 이름 변경(매장명·매장코드·도면 표시명 / 시설명·도면 표시명) ----- */
async function rename(){if(ED.picked.length!==1)return;const d=itemOf(ED.picked[0]);if(!d)return;const fac=isFac(d),nm0=fac?(d.name||d.space_nm):d.name;
  const ans=await askStores(fac?'시설명 변경':'매장명·코드 변경',[{label:dispName(d)+(fac?' (시설)':''),name:nm0,code:d.shop_cd||'',area:areaTxt(d),noCode:fac,disp:d.label||''}]);if(!ans)return;
  const n=ans[0].name,c=fac?(d.shop_cd||null):ans[0].code,lb=ans[0].disp||'';
  if(n===nm0&&c===(d.shop_cd||null)&&lb===(d.label||''))return;
  const next=clone(state),t=itemOf(d.space_id,next);if(!t.edited){t.edited=true;t.from=srcTxt(d)}t.name=n;if(!fac)t.shop_cd=c;if(lb)t.label=lb;else delete t.label;
  const parts=[];if(n!==nm0||c!==(d.shop_cd||null))parts.push(`${fac?'시설명':'매장명·코드'}: ${nm0}${fac?'':cdTxt(d.shop_cd)} → ${n}${fac?'':cdTxt(c)}`);
  if(lb!==(d.label||''))parts.push(`도면 표시명: ${d.label||'(기본)'} → ${lb||'(기본)'}`);
  commit(next,'이름 변경 · '+parts.join(' · '))}
function renameItem(id){if(!ED.mode||window.SHAPE||window.INS)return;ED.picked=[id];splitClose(true);refreshPick();rename()}
Plan.renameItem=renameItem;

/* ----- 삭제 ----- */
function delSel(){if(window.SHAPE||window.INS)return;const P=ED.picked.map(id=>itemOf(id)).filter(Boolean);if(!P.length)return;
  if(!confirm(`선택한 ${P.length}개 공간을 삭제할까요?\n`+P.map(d=>'· '+dispName(d)+(isFac(d)?' (시설)':'')).join('\n')+'\n\n(되돌리기로 복구할 수 있습니다)'))return;
  const next=clone(state);dropIds(next,new Set(ED.picked));ED.picked=[];
  commit(next,`삭제: ${P.map(d=>dispName(d)+(d.shop_cd?`(${d.shop_cd})`:'')+(isFac(d)?'(시설)':'')).join(', ')}`)}

/* ----- 변경 내역·내보내기 ----- */
function renderLog(){const L=document.getElementById('edLog');L.innerHTML=state.log.length?state.log.map((g,i)=>`<li><span class="c">${i+1}. ${g.t}</span><br>${g.msg}</li>`).join(''):'<li class="c">아직 변경 사항이 없습니다.</li>';
  document.getElementById('logbox').classList.toggle('has',state.log.length>0);document.getElementById('edCount').textContent=state.log.length?`(${state.log.length})`:''}
/* 저장: 가능하면 '다른 이름으로 저장' 창(파일명·위치 선택), 안 되면 다운로드 폴더로 */
async function download(name,text,type){const blob=new Blob([text],{type});
  if(window.showSaveFilePicker){try{const ext=name.slice(name.lastIndexOf('.'));
      const h=await showSaveFilePicker({suggestedName:name,types:[{description:ext.slice(1).toUpperCase()+' 파일',accept:{[type.split(';')[0]]:[ext]}}]});
      const w=await h.createWritable();await w.write(blob);await w.close();return}catch(e){if(e.name==='AbortError')return}}
  downloadA(name,blob)}
function downloadA(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function stamp(){const d=new Date(),p=n=>String(n).padStart(2,'0');return`${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`}
function exportCSV(){const rows=[['공간ID','구분','이름','매장코드','면적(㎡)','면적(평)','편집여부','원본']];
  const add=(d,k)=>rows.push([d.space_id,k,dispName(d),d.shop_cd||'',areaCell(d),hid(d)?'비공개':(d.area_py??py(areaNow(d))),d.edited?'Y':'',d.from||'']);
  state.stores.slice().sort((a,b)=>a.space_nm.localeCompare(b.space_nm)).forEach(d=>add(d,'매장'));
  state.facs.filter(d=>d.edited).forEach(d=>add(d,'시설'));
  {const ids=new Set(state.facs.map(d=>d.space_id));BASE_F.filter(d=>!ids.has(d.space_id)).forEach(d=>rows.push([d.space_id,'시설(삭제·변경 전)',dispName(d),'',areaCell(d),'','','']))}
  rows.push([]);rows.push(['변경 내역']);state.log.forEach((g,i)=>rows.push([i+1,g.t,g.msg]));
  download(`${FLOOR_FILE}_편집시뮬레이션_${stamp()}.csv`,'﻿'+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n'),'text/csv;charset=utf-8')}
function exportJSON(){const ids=new Set(allOf().map(d=>d.space_id));
  const out={floor:FLOOR_ID,name:ED.planName||'',exported_at:new Date().toISOString(),seq:ED.seq,state,note:'화면 시뮬레이션 결과(공간관리시스템 미반영). 좌표 단위 cm, Y축 위쪽',
    log:state.log,removed:BASE.concat(BASE_F).filter(d=>!ids.has(d.space_id)).map(d=>({space_id:d.space_id,name:d.name,shop_cd:d.shop_cd})),
    added:allOf().filter(d=>d.edited).map(d=>Object.assign({space_id:d.space_id,type:d.type,name:d.name,from:d.from,polygons:d.rings},hid(d)?{area_note:'비공개'}:{area_m2:areaNow(d)}))};
  download(`${FLOOR_FILE}_편집시뮬레이션_${stamp()}.json`,JSON.stringify(out,null,1),'application/json');window.__fpSaved=true}

/* ----- 화면 연결 ----- */
const $=id=>document.getElementById(id);
const filePop=$('filePop');
function closePops(){filePop.classList.remove('open');$('tFile').classList.remove('on')}
function setTool(t){ED.tool=t;document.body.classList.toggle('tool-move',t==='move');document.body.classList.toggle('tool-label',t==='label');
  $('tSel').classList.toggle('on',t==='select');$('tMove').classList.toggle('on',t==='move');$('tLbl').classList.toggle('on',t==='label')}
$('edToggle').onclick=()=>{if(window.SHAPE||window.INS)return;ED.mode=!ED.mode;document.body.classList.toggle('editing',ED.mode);$('edToggle').textContent=ED.mode?'✓ 아이디어 모드 종료':'✎ 아이디어 모드';
  if(!ED.mode){ED.picked=[];splitClose(true);closePops();setTool('select');detail.innerHTML='매장을 클릭하면 상세 정보가 표시됩니다.'}refreshPick();Plan.minFont()};
$('edMerge').onclick=merge;$('edSplit').onclick=splitOpen;$('edSplitGo').onclick=split;$('edSplitX').onclick=()=>splitClose();
/* ----- 도형 채움색·글자색: 선택한 공간에 팔레트 색 또는 직접 고른 색 적용, '기본색으로'는 원래 색 ----- */
/* 팔레트: 첫 줄 = 도면 기본 매장색 6색(lux·rtw·jw·acc·etc·공실), 그다음 = 백화점 뉴트럴(웜톤) 18색 / 글자색 = 뉴트럴 10색 */
const PAL={fill:['#f6e3cf','#e1ecdc','#e6def3','#fde0c8','#e8eef6','#f2f4f7',
    '#f7f1e8','#efe4d2','#e3d3bb','#d6c2a3','#c9b08c','#e9e4dc','#d8d2c7','#c2bbaf','#e4ebe1','#cddbc9','#b3c7ae','#e6e9ee','#cfd6df','#b5c0cd','#f3e1dc','#e6c6bd','#d4a99c','#bfa18f'],
  font:['#2b2622','#5c544b','#8a7f72','#ffffff','#8c2f1f','#a8642a','#5e6b3a','#3d5a6c','#6b4c7a','#c8102e']};
const PAL_NAME={'#f6e3cf':'도면 기본색 1','#e1ecdc':'도면 기본색 2','#e6def3':'도면 기본색 3','#fde0c8':'도면 기본색 4','#e8eef6':'도면 기본색 5','#f2f4f7':'도면 기본색(공실)'};
const colorPop=$('colorPop');let cpKind=null;
function closeColor(){colorPop.classList.remove('open');cpKind=null;$('edFill').classList.remove('on');$('edFcolor').classList.remove('on')}
function openColor(kind,btn){if(!ED.picked.length)return;if(cpKind===kind){closeColor();return}closePops();splitClose(true);closeColor();cpKind=kind;
  $('cpTitle').textContent=kind==='fill'?'도형 채움색':'글자색';
  $('cpSw').innerHTML=PAL[kind].map((c,i)=>`<button type="button" data-c="${c}" title="${PAL_NAME[c]?PAL_NAME[c]+' ':''}${c}" style="background:${c}"></button>${kind==='fill'&&i===5?'<span class="cpSep"></span>':''}`).join('');
  const d=itemOf(ED.picked[0]);$('cpPick').value=(kind==='fill'?(d.fill||COLORS[d.group]||'#dcdcdc'):(d.lcolor||'#222222')).slice(0,7);
  colorPop.style.top=(btn.getBoundingClientRect().top-planRow.getBoundingClientRect().top-8)+'px';colorPop.classList.add('open');btn.classList.add('on')}
function applyColor(c){const kind=cpKind;const P=ED.picked.map(id=>itemOf(id)).filter(Boolean);if(!P.length||!kind)return;
  const k=kind==='fill'?'fill':'lcolor',next=clone(state);P.forEach(d=>{const t=itemOf(d.space_id,next);if(c)t[k]=c;else delete t[k]});
  const names=P.length>2?`${dispName(P[0])} 외 ${P.length-1}개`:P.map(dispName).join(', ');
  commit(next,`${kind==='fill'?'채움색':'글자색'} ${c||'기본색'}: ${names}`);cpKind=kind}
$('edFill').onclick=e=>openColor('fill',e.currentTarget);$('edFcolor').onclick=e=>openColor('font',e.currentTarget);
$('cpSw').onclick=e=>{const c=e.target.dataset&&e.target.dataset.c;if(c)applyColor(c)};$('cpDef').onclick=()=>applyColor(null);$('cpPick').onchange=e=>applyColor(e.target.value);
document.addEventListener('click',e=>{if(cpKind&&!colorPop.contains(e.target)&&!e.target.closest('#edFill,#edFcolor')&&!e.target.closest('.store,.efac'))closeColor()});
$('edRename').onclick=rename;$('edDel').onclick=delSel;$('edUndo').onclick=undo;$('edRedo').onclick=redo;$('edReset').onclick=()=>{closePops();resetAll()};
$('tSel').onclick=()=>setTool('select');$('tMove').onclick=()=>setTool('move');$('tLbl').onclick=()=>setTool('label');
$('tFile').onclick=e=>{e.stopPropagation();const o=!filePop.classList.contains('open');closePops();splitClose(true);
  if(o){filePop.classList.add('open');$('tFile').classList.add('on');
    filePop.style.top=Math.max(0,$('tFile').getBoundingClientRect().bottom-planRow.getBoundingClientRect().top-filePop.offsetHeight)+'px'}};
document.addEventListener('click',e=>{if(filePop.classList.contains('open')&&!filePop.contains(e.target)&&e.target!==$('tFile'))closePops()});
filePop.addEventListener('click',e=>{if(e.target.tagName==='BUTTON'&&e.target.id!=='edLoad')setTimeout(closePops,0)});
$('edClear').onclick=()=>{ED.picked=[];splitClose(true);refreshPick()};$('edCSV').onclick=exportCSV;$('edJSON').onclick=exportJSON;
document.querySelectorAll('input[name=edDir]').forEach(r=>r.onchange=()=>{ED.dir=r.value;preview()});
$('edRatio').oninput=e=>{ED.ratio=+e.target.value;$('edRatioT').textContent=`${ED.ratio} : ${100-ED.ratio}`;preview()};
$('edOrig').onchange=e=>{ORL.style.display=e.target.checked?'':'none'};
/* 빈 곳 클릭: 선택 해제 */
svg.addEventListener('click',e=>{if(!ED.mode||window.SHAPE||window.INS||ED.splitting)return;const t=e.target;if(t.closest&&t.closest('.store,.efac'))return;if(ED.picked.length){ED.picked=[];refreshPick()}});
/* ----- 라벨 서식 단축키(선택한 공간): 크게/작게 · 굵게 · 기울임 · 위치 미세 이동 -----
   같은 키를 1.5초 안에 이어 누르면 변경 내역 한 줄·되돌리기 한 번으로 묶는다 */
function lblPosOf(id){const s=Plan.get(id);if(s&&s.lpt)return [s.lpt[0],maxY-s.lpt[1]];const f=FACN.get(id);if(f&&f.lbl)return [+f.lbl.getAttribute('x'),maxY-+f.lbl.getAttribute('y')];return null}
function styleSel(kind,arg){const P=ED.picked.map(id=>itemOf(id)).filter(Boolean);if(!P.length)return;
  const next=clone(state),ids=P.map(d=>d.space_id),key=kind+(kind==='nudge'?'':'')+'|'+ids.join(),now=Date.now(),cont=ED.burst&&ED.burst.key===key&&now-ED.burst.t<1500;
  const defB=d=>isFac(d)?IS_ELEV(d):true,names=P.length>2?`${dispName(P[0])} 외 ${P.length-1}개`:P.map(dispName).join(', ');
  let msg;
  if(kind==='size'){P.forEach(d=>{const t=itemOf(d.space_id,next);let v=Math.round((t.lscale||1)*(arg>0?1.1:1/1.1)*1000)/1000;v=Math.min(4,Math.max(0.3,v));if(Math.abs(v-1)<0.02)delete t.lscale;else t.lscale=v});
    const v=itemOf(ids[0],next).lscale||1;msg=`라벨 크기 ${Math.round(v*100)}%: ${names}`}
  else if(kind==='bold'){const on=!((P[0].lbold!==undefined)?P[0].lbold:defB(P[0]));P.forEach(d=>{const t=itemOf(d.space_id,next);if(on===defB(d))delete t.lbold;else t.lbold=on});msg=`라벨 ${on?'굵게':'보통 굵기'}: ${names}`}
  else if(kind==='italic'){const on=!P[0].litalic;P.forEach(d=>{const t=itemOf(d.space_id,next);if(on)t.litalic=true;else delete t.litalic});msg=`라벨 기울임 ${on?'켬':'끔'}: ${names}`}
  else if(kind==='nudge'){const[dx,dy]=arg;let ok=false;P.forEach(d=>{const t=itemOf(d.space_id,next),p0=d.lpos||lblPosOf(d.space_id);if(!p0)return;t.lpos=[Math.round(p0[0]+dx),Math.round(p0[1]+dy)];ok=true});if(!ok)return;
    const tot=cont?[ED.burst.dx+dx,ED.burst.dy+dy]:[dx,dy];msg=`라벨 위치 변경: ${names} ${mvDir(tot[0],tot[1])}`;
    if(cont){ED.burst.dx=tot[0];ED.burst.dy=tot[1]}}
  if(cont){next.log=next.log.slice(0,-1).concat([Object.assign({},next.log[next.log.length-1],{msg})]);state=next;ED.burst.t=now;rebuild();return}
  commit(next,msg);ED.burst={key,t:now,dx:kind==='nudge'?arg[0]:0,dy:kind==='nudge'?arg[1]:0}}
/* 단축키는 키 위치(e.code)로 판단 → 한글 입력 상태에서도 동작 */
document.addEventListener('keydown',e=>{if(!ED.mode||window.SHAPE||window.INS||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||document.querySelector('#fpDlg[open]'))return;
  const c=e.code,k=e.key,mod=e.ctrlKey||e.metaKey,plain=!mod&&!e.altKey&&!e.shiftKey,has=ED.picked.length>0;
  if(mod&&!e.altKey&&c==='KeyZ'){e.preventDefault();e.shiftKey?redo():undo()}else if(mod&&!e.altKey&&c==='KeyY'){e.preventDefault();redo()}
  else if(has&&((mod&&e.shiftKey&&c==='Period')||(plain&&c==='BracketRight'))){e.preventDefault();styleSel('size',1)}
  else if(has&&((mod&&e.shiftKey&&c==='Comma')||(plain&&c==='BracketLeft'))){e.preventDefault();styleSel('size',-1)}
  else if(has&&mod&&!e.shiftKey&&!e.altKey&&c==='KeyB'){e.preventDefault();styleSel('bold')}
  else if(has&&mod&&!e.shiftKey&&!e.altKey&&c==='KeyI'){e.preventDefault();styleSel('italic')}
  else if(has&&/^Arrow/.test(k)&&!mod&&(e.altKey||ED.tool==='label')){e.preventDefault();e.stopPropagation();const st=e.shiftKey?100:10;
    styleSel('nudge',k==='ArrowLeft'?[-st,0]:k==='ArrowRight'?[st,0]:k==='ArrowUp'?[0,st]:[0,-st])}
  else if(k==='Escape'){if(ED.splitting)splitClose();else{ED.picked=[];refreshPick()}closePops()}
  else if(k==='Delete'||k==='Backspace'){if(has){e.preventDefault();delSel()}}
  else if(k==='F2'){e.preventDefault();rename()}
  else if(plain&&c==='KeyV')setTool('select');
  else if(plain&&c==='KeyM')setTool('move');
  else if(plain&&c==='KeyL')setTool('label')},true);
/* Alt+←(뒤로 가기) 등으로 페이지를 벗어날 때 편집 내용이 있으면 확인 */
window.addEventListener('beforeunload',e=>{if(state.log.length&&!window.__fpSaved){e.preventDefault();e.returnValue=''}});
/* 편집으로 생긴 매장도 라벨을 표시하도록 다시 그린다 */
rebuild();


/* ===== 모양 편집: 벽면 밀기·꼭짓점 이동·꼭짓점 추가/삭제 =====
   좌표는 원본 좌표계(cm, Y축 위쪽)로 다룬다. 확정 전까지는 state를 바꾸지 않는다. */
const SHL=el('g',{id:'shape-layer'},svg);
window.SHAPE=null;
const GRID=10;  /* 스냅 간격(cm) */
const toO=(cx,cy)=>{const p=svg.createSVGPoint();p.x=cx;p.y=cy;const q=p.matrixTransform(svg.getScreenCTM().inverse());return[q.x,maxY-q.y]};
const unit=()=>1/svg.getScreenCTM().a;  /* 화면 1px = 몇 cm */
const sgnA=r=>{let a=0;for(let i=0,j=r.length-1;i<r.length;j=i++)a+=(r[j][0]*r[i][1]-r[i][0]*r[j][1]);return a/2};
/* 닫는 점·중복 점·일직선 위의 점을 정리한다(모양은 그대로) */
function cleanRing(r){let P=r.map(p=>[p[0],p[1]]);const eq=(a,b)=>Math.abs(a[0]-b[0])<0.01&&Math.abs(a[1]-b[1])<0.01;
  P=P.filter((p,i)=>!eq(p,P[(i+1)%P.length])||P.length<=3);
  let ch=true;while(ch&&P.length>3){ch=false;for(let i=0;i<P.length;i++){const a=P[(i-1+P.length)%P.length],b=P[i],c=P[(i+1)%P.length];
    const cr=(b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0]),L=Math.hypot(c[0]-a[0],c[1]-a[1])||1;
    if(Math.abs(cr)/L<0.5){P.splice(i,1);ch=true;break}}}
  return P}
const outN=(R,i)=>{const p=R[i],q=R[(i+1)%R.length],dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy)||1,s=sgnA(R)>0?1:-1;return[s*dy/L,-s*dx/L]};  /* 바깥쪽 법선 */
const bbOverlap=(a,b)=>a[0]<=b[2]&&b[0]<=a[2]&&a[1]<=b[3]&&b[1]<=a[3];

/* ===== 맞춤 안내선(파워포인트 스마트 가이드처럼) =====
   - 위치 맞춤: 주변 매장·시설 꼭짓점의 x/y에 붙고, 맞춘 기준점까지 분홍 점선을 그린다
   - 크기 맞춤: 주변 매장의 가로·세로 길이와 같아지면 붙고, 기준 매장에 치수선과 '= 매장명'을 표시한다 */
const SNAP_PX=8;
function bestCand(v,cands,th){let b=null,bd=th;for(const c of cands){const d=Math.abs(c.v-v);if(d<bd){bd=d;b=c}}return b}
const axisCands=(pts,k)=>pts.map(p=>({v:p[k],src:p}));
/* 주변(25m 이내) 매장의 가로·세로 크기, 가까운 매장 순 */
function nearSizes(bb,exclude){const R=2500,out=[[],[]];
  state.stores.forEach(d=>{if(d.space_id===exclude)return;const b=bboxOf(geomOf(d)),dist=Math.hypot(Math.max(0,b[0]-bb[2],bb[0]-b[2]),Math.max(0,b[1]-bb[3],bb[1]-b[3]));if(dist>R)return;
    out[0].push({size:Math.round(b[2]-b[0]),name:d.name,bb:b,dist});out[1].push({size:Math.round(b[3]-b[1]),name:d.name,bb:b,dist})});
  out.forEach(a=>a.sort((p,q)=>p.dist-q.dist));return out}
function drawSmart(L,S,u){
  (S.guides||[]).forEach(([a,b])=>{const p=T(a),q=T(b);el('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],class:'guide','stroke-width':1.5*u,'stroke-dasharray':`${5*u} ${4*u}`},L);
    el('circle',{cx:p[0],cy:p[1],r:3.5*u,class:'guide-pt'},L)});
  (S.tags||[]).forEach(t=>{const b=t.size.bb,off=14*u;
    const[a,c]=t.ax===0?[T([b[0],b[1]]),T([b[2],b[1]])]:[T([b[0],b[1]]),T([b[0],b[3]])];
    const s=t.ax===0?[0,off]:[-off,0];el('line',{x1:a[0]+s[0],y1:a[1]+s[1],x2:c[0]+s[0],y2:c[1]+s[1],class:'dim','stroke-width':2.5*u},L);
    [a,c].forEach(p=>el('line',{x1:p[0]+s[0]-(t.ax?5*u:0),y1:p[1]+s[1]-(t.ax?0:5*u),x2:p[0]+s[0]+(t.ax?5*u:0),y2:p[1]+s[1]+(t.ax?0:5*u),class:'dim','stroke-width':2*u},L));
    const m=[(a[0]+c[0])/2+s[0]*2.2,(a[1]+c[1])/2+s[1]*2.2],tt=el('text',{x:m[0],y:m[1],'font-size':11*u,class:'dim-t','text-anchor':'middle','stroke-width':3*u},L);
    tt.textContent=`${t.size.name} ${t.ax===0?'가로':'세로'} ${t.size.size}cm`;
    if(t.at){const[x,y]=T(t.at),t2=el('text',{x,y,'font-size':12*u,class:'dim-t','text-anchor':'middle','stroke-width':3*u},L);t2.textContent=`${t.ax===0?'가로':'세로'} ${t.size.size}cm = ${t.size.name}`}})}

/* 맞춤·겹침 검사 대상: 지금 도면의 매장·시설(ex 제외) */
function othersOf(ex){const o=allOf().filter(x=>!ex.has(x.space_id)).map(x=>({name:isFac(x)?dispName(x)+(x.type==='이동공간'?'(통로)':''):x.name,geom:geomOf(x)}));o.forEach(q=>q.bb=bboxOf(q.geom));return o}
function shapeStart(){
  if(ED.picked.length!==1)return;const d=itemOf(ED.picked[0]);if(!d)return;const G=geomOf(d);
  if(G.length!==1||G[0].length!==1){alert('여러 조각으로 나뉘었거나 안쪽에 빈 공간이 있는 공간은 모양 편집을 지원하지 않습니다.');return}
  splitClose(true);closePops();
  const ring=cleanRing(G[0][0]);
  const others=othersOf(new Set([d.space_id]));
  const snapPts=[];others.forEach(o=>o.geom.forEach(p=>p[0].forEach(q=>snapPts.push(q))));
  window.SHAPE={id:d.space_id,d,ring,baseG:[[ring.map(p=>[...p])]],baseArea:areaNow(d),others,snapPts,hist:[],edge:null,hits:[],ok:true,area:areaNow(d),sizes:nearSizes(bboxOf(G),d.space_id),guides:[],tags:[]};
  EDL.innerHTML='';document.body.classList.add('shaping');
  document.getElementById('shName').textContent=dispName(d);shEdgeUI();shUpdate()}
function shEnd(){window.SHAPE&&dirty(window.SHAPE.id);window.SHAPE=null;SHL.innerHTML='';document.body.classList.remove('shaping');rebuild()}

/* 화면 갱신 + 검사(면적·꼬임·겹침) */
let shPending=0;
function shUpdate(){const S=window.SHAPE;if(!S)return;const nd=nodeOf(S.id),lb=lblOf(S.id);nd&&nd.setAttribute('d',ringsPath([[S.ring]]));
  if(lb)lb.style.opacity=.35;
  drawHandles();if(!shPending)shPending=requestAnimationFrame(()=>{shPending=0;shCheck();drawHandles()})}
function shCheck(){const S=window.SHAPE;if(!S)return;const G=[[S.ring]];S.ok=true;S.hits=[];
  let u;try{u=PC.union(G)}catch(e){S.ok=false}
  if(S.ok&&(u.length!==1||u[0].length!==1||Math.abs(areaOf(u)-Math.abs(sgnA(S.ring))/10000)>0.01))S.ok=false;
  S.area=r2(S.baseArea+areaOf(G)-areaOf(S.baseG));
  if(S.ok){let gained=[];try{gained=PC.difference(G,S.baseG)}catch(e){}
    if(gained.length){const gb=bboxOf(gained);S.others.forEach(o=>{if(!bbOverlap(gb,o.bb))return;let I=[];try{I=PC.intersection(gained,o.geom)}catch(e){}
      const a=areaOf(I);if(a>0.01)S.hits.push({name:o.name,a:r2(a),inter:I})})}}
  const diff=r2(S.area-S.baseArea);
  const dTxt=`<span style="color:${diff>0?'#1a7f37':diff<0?'#c8102e':'#777'}">${diff>0?'+':''}${diff}㎡</span>`;
  document.getElementById('shArea').innerHTML=hid(S.d)?`면적 비공개 · 변화 ${dTxt}`:`${S.baseArea}㎡ → <b>${S.area}㎡</b> (${py(S.area)}평) ${dTxt}`;
  const W=document.getElementById('shWarn');
  W.innerHTML=!S.ok?'⚠ 변이 서로 교차합니다. 모양을 바로잡아야 확정할 수 있습니다.':S.hits.length?'⚠ 겹침: '+S.hits.map(h=>`${h.name} ${h.a}㎡`).join(', '):'';
  document.getElementById('shOk').disabled=!S.ok;document.getElementById('shUndo').disabled=!S.hist.length}

function drawHandles(){SHL.innerHTML='';const S=window.SHAPE;if(!S)return;const u=unit(),R=S.ring,n=R.length;
  el('path',{d:ringsPath(S.baseG),class:'sh-base','stroke-width':2*u,'stroke-dasharray':`${6*u} ${4*u}`},SHL);
  S.hits.forEach(h=>el('path',{d:ringsPath(h.inter),class:'sh-hit'},SHL));
  el('path',{d:ringsPath([[R]]),class:'sh-out'+(S.ok?'':' bad'),'stroke-width':2.5*u},SHL);
  R.forEach((p,i)=>{const q=R[(i+1)%n],[a,b]=T(p),[c,e]=T(q),mx=(a+c)/2,my=(b+e)/2,sz=11*u,horiz=Math.abs(e-b)<Math.abs(c-a);
    if(S.edge===i)el('line',{x1:a,y1:b,x2:c,y2:e,class:'sh-sel','stroke-width':5*u},SHL);
    const h=el('rect',{x:mx-sz/2,y:my-sz/2,width:sz,height:sz,class:'sh-e'+(S.edge===i?' on':''),'stroke-width':1.5*u},SHL);
    h.style.cursor=Math.abs(e-b)<0.01?'ns-resize':Math.abs(c-a)<0.01?'ew-resize':'move';h.dataset.e=i;
    const len=Math.round(Math.hypot(q[0]-p[0],q[1]-p[1]));
    if(Math.hypot(c-a,e-b)/u>70){const t=el('text',{x:mx,y:my+(horiz?-16*u:0),dx:horiz?0:16*u,'font-size':11*u,class:'sh-len','text-anchor':horiz?'middle':'start'},SHL);t.textContent=len+'cm'}});
  R.forEach((p,i)=>{const[a,b]=T(p);const c=el('circle',{cx:a,cy:b,r:6*u,class:'sh-v','stroke-width':2*u},SHL);c.dataset.v=i});
  drawSmart(SHL,S,u)}

/* 스냅: 10cm 격자 + 주변 매장·시설·자기 꼭짓점의 x/y에 붙인다 */
function snapVal(v,cands,th){let best=Math.round(v/GRID)*GRID,bd=th;cands.forEach(c=>{const dd=Math.abs(c-v);if(dd<bd){bd=dd;best=c}});return best}
/* lock: 'x'면 x 고정(수직 이동), 'y'면 y 고정(수평 이동) — Shift */
function snapPt(x,y,skip,lock,base){const S=window.SHAPE;S.guides=[];S.tags=[];
  if(lock==='x')x=base[0];if(lock==='y')y=base[1];
  if(!document.getElementById('shSnap').checked)return[Math.round(x),Math.round(y)];const th=SNAP_PX*unit();
  const pts=S.snapPts.concat(S.ring.filter((_,i)=>i!==skip));
  const bx=lock==='x'?null:bestCand(x,axisCands(pts,0),th),by=lock==='y'?null:bestCand(y,axisCands(pts,1),th);
  const nx=lock==='x'?x:bx?bx.v:Math.round(x/GRID)*GRID,ny=lock==='y'?y:by?by.v:Math.round(y/GRID)*GRID;
  if(bx)S.guides.push([bx.src,[nx,ny]]);if(by)S.guides.push([by.src,[nx,ny]]);return[nx,ny]}

/* 끌기 */
let drag=null;
SHL.addEventListener('pointerdown',e=>{const S=window.SHAPE;if(!S||e.button!==0)return;const t=e.target;if(t.dataset.v==null&&t.dataset.e==null)return;
  e.stopPropagation();e.preventDefault();const[ox,oy]=toO(e.clientX,e.clientY);
  drag={kind:t.dataset.v!=null?'v':'e',i:+(t.dataset.v??t.dataset.e),o:[ox,oy],start:S.ring.map(p=>[...p]),sx:e.clientX,sy:e.clientY,moved:false}});
window.addEventListener('pointermove',e=>{const S=window.SHAPE;if(!drag||!S)return;
  if(!drag.moved){if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)<3)return;drag.moved=true;S.hist.push(drag.start.map(p=>[...p]))}
  const[x,y]=toO(e.clientX,e.clientY),R=drag.start.map(p=>[...p]),n=R.length;
  if(drag.kind==='v'){const b0=drag.start[drag.i];let lock=null;
    if(e.shiftKey){const dx=Math.abs(x-b0[0]),dy=Math.abs(y-b0[1]);lock=dx>=dy?'y':'x'}  /* Shift: 수평·수직으로만 */
    R[drag.i]=snapPt(x,y,drag.i,lock,b0)}
  else{const i=drag.i,j=(i+1)%n,N=outN(drag.start,i),p0=drag.start[i];let dl=(x-drag.o[0])*N[0]+(y-drag.o[1])*N[1];S.guides=[];S.tags=[];
    if(document.getElementById('shSnap').checked){const th=SNAP_PX*unit(),cands=[],rest=drag.start.filter((_,k)=>k!==i&&k!==j);
      S.snapPts.concat(rest).forEach(q=>{const t=(q[0]-p0[0])*N[0]+(q[1]-p0[1])*N[1];if(Math.abs(t)>0.5)cands.push({v:t,src:q})});
      /* 크기 맞춤: 가로/세로 변이면 주변 매장의 가로·세로 길이와 같아지는 위치 */
      const ax=Math.abs(N[0])>0.999?0:Math.abs(N[1])>0.999?1:-1;
      if(ax>=0&&rest.length){const sg=Math.sign(N[ax]),opp=sg>0?Math.min(...rest.map(p=>p[ax])):Math.max(...rest.map(p=>p[ax]));
        S.sizes[ax].forEach(sz=>{const X=opp+sg*sz.size;cands.push({v:(X-p0[ax])*sg,size:sz,ax})})}
      const b=bestCand(dl,cands,th);dl=b?b.v:Math.round(dl/GRID)*GRID;
      if(b&&b.src){const a0=[p0[0]+N[0]*dl,p0[1]+N[1]*dl],a1=[drag.start[j][0]+N[0]*dl,drag.start[j][1]+N[1]*dl];
        const near=Math.hypot(b.src[0]-a0[0],b.src[1]-a0[1])<Math.hypot(b.src[0]-a1[0],b.src[1]-a1[1])?a0:a1;S.guides.push([b.src,near])}
      if(b&&b.size){const m=[(p0[0]+drag.start[j][0])/2+N[0]*(dl+30*unit()),(p0[1]+drag.start[j][1])/2+N[1]*(dl+30*unit())];S.tags.push({ax:b.ax,size:b.size,at:m})}}
    else dl=Math.round(dl);
    R[i]=[drag.start[i][0]+N[0]*dl,drag.start[i][1]+N[1]*dl];R[j]=[drag.start[j][0]+N[0]*dl,drag.start[j][1]+N[1]*dl];
    S.edge=i;shEdgeUI(Math.round(dl))}
  S.ring=R;shUpdate()});
window.addEventListener('pointerup',()=>{const S=window.SHAPE;if(!drag||!S){drag=null;return}
  if(!drag.moved&&drag.kind==='e'){S.edge=drag.i;shEdgeUI()}
  if(drag.moved&&drag.kind==='e'){shEdgeUI()}
  drag=null;S.guides=[];S.tags=[];shUpdate()});
/* 변 더블클릭: 가운데에 꼭짓점 추가 / 꼭짓점 우클릭: 삭제 */
SHL.addEventListener('dblclick',e=>{const S=window.SHAPE;if(!S||e.target.dataset.e==null)return;e.stopPropagation();const i=+e.target.dataset.e,R=S.ring,q=R[(i+1)%R.length];
  S.hist.push(R.map(p=>[...p]));R.splice(i+1,0,[Math.round((R[i][0]+q[0])/2),Math.round((R[i][1]+q[1])/2)]);S.edge=null;shEdgeUI();shUpdate()});
SHL.addEventListener('contextmenu',e=>{const S=window.SHAPE;if(!S||e.target.dataset.v==null)return;e.preventDefault();
  if(S.ring.length<=3){alert('꼭짓점이 3개 이하라 더 지울 수 없습니다.');return}S.hist.push(S.ring.map(p=>[...p]));S.ring.splice(+e.target.dataset.v,1);S.edge=null;shEdgeUI();shUpdate()});

/* 선택한 변: 길이 표시 + 숫자로 밀기 */
function shEdgeUI(live){const S=window.SHAPE,B=document.getElementById('shEdge');if(!S)return;
  if(S.edge==null||S.edge>=S.ring.length){B.innerHTML='<span class="c">변(■)을 클릭하면 길이를 보고 숫자로 밀 수 있습니다</span>';return}
  const R=S.ring,i=S.edge,q=R[(i+1)%R.length],len=Math.round(Math.hypot(q[0]-R[i][0],q[1]-R[i][1]));
  if(live!=null){B.innerHTML=`선택한 변 ${len}cm · <b>${live>0?'바깥으로 +':'안쪽으로 '}${live}cm</b> 이동 중`;return}
  B.innerHTML=`선택한 변 <b>${len}cm</b> · 바깥으로 <input id="shMv" type="number" step="10" value="0" style="width:72px;height:26px"> cm <button id="shMvGo">밀기</button> <span class="c">(안쪽은 음수)</span>`;
  const go=()=>{const v=+document.getElementById('shMv').value;if(!v)return;const N=outN(S.ring,i),j=(i+1)%S.ring.length;S.hist.push(S.ring.map(p=>[...p]));
    S.ring[i]=[S.ring[i][0]+N[0]*v,S.ring[i][1]+N[1]*v];S.ring[j]=[S.ring[j][0]+N[0]*v,S.ring[j][1]+N[1]*v];shEdgeUI();shUpdate()};
  document.getElementById('shMvGo').onclick=go;document.getElementById('shMv').onkeydown=e=>{if(e.key==='Enter'){e.stopPropagation();go()}}}

function shUndo(){const S=window.SHAPE;if(!S||!S.hist.length)return;S.ring=S.hist.pop();if(S.edge!=null&&S.edge>=S.ring.length)S.edge=null;shEdgeUI();shUpdate()}
function shConfirm(){const S=window.SHAPE;if(!S)return;shCheck();if(!S.ok){alert('변이 서로 교차해 확정할 수 없습니다.');return}
  const R=cleanRing(S.ring.map(p=>[Math.round(p[0]*10)/10,Math.round(p[1]*10)/10]));
  if(JSON.stringify(R)===JSON.stringify(cleanRing(S.baseG[0][0]))){shEnd();return}
  if(S.hits.length&&!confirm('다른 공간과 겹칩니다.\n'+S.hits.map(h=>`· ${h.name} ${h.a}㎡`).join('\n')+'\n\n그래도 확정할까요?'))return;
  const d=S.d,next=clone(state),t=itemOf(d.space_id,next);
  t.rings=[[R]];t.v=R;if(!hid(d)){t.area_m2=S.area;t.area_py=py(S.area)}if(!t.edited){t.edited=true;t.from=srcTxt(d)}
  const diff=r2(S.area-S.baseArea),msg=(hid(d)?`모양 변경: ${dispName(d)} (면적 비공개, ${diff>0?'+':''}${diff}㎡)`:`모양 변경: ${dispName(d)} ${S.baseArea}㎡ → ${S.area}㎡ (${diff>0?'+':''}${diff}㎡)`)+(S.hits.length?` · 겹침 ${S.hits.map(h=>`${h.name} ${h.a}㎡`).join(', ')}`:'');
  window.SHAPE=null;SHL.innerHTML='';document.body.classList.remove('shaping');commit(next,msg)}

/* 줌·이동할 때 손잡이 크기를 화면 기준으로 다시 맞춘다 */
{const mf=Plan.minFont;Plan.minFont=()=>{mf();window.SHAPE&&drawHandles()}}
document.getElementById('edShape').onclick=shapeStart;
document.getElementById('shUndo').onclick=shUndo;document.getElementById('shOk').onclick=shConfirm;
document.getElementById('shCancel').onclick=()=>{if(window.SHAPE&&window.SHAPE.hist.length&&!confirm('모양 편집을 취소할까요?'))return;shEnd()};
document.addEventListener('keydown',e=>{if(!window.SHAPE||e.target.tagName==='INPUT')return;const k=e.key.toLowerCase();
  if((e.ctrlKey||e.metaKey)&&k==='z'){e.preventDefault();shUndo()}else if(k==='escape'){document.getElementById('shCancel').click()}else if(k==='enter'){e.preventDefault();shConfirm()}});


/* ===== 편집 도면 저장(HTML) · 배치안 불러오기(JSON) ===== */
ED.planName=SAVED&&SAVED.name||'';
function showPlanTag(){const t=document.getElementById('planTag');if(!ED.planName&&!SAVED){t.style.display='none';return}t.style.display='';
  t.textContent=`편집안: ${ED.planName||'(이름 없음)'}`+(SAVED&&SAVED.saved_at?` · 저장 ${SAVED.saved_at}`:'')}
showPlanTag();document.getElementById('edPlanName').value=ED.planName;

/* 1) 편집 도면 저장: 지금 편집 상태를 품은 새 HTML 파일을 만든다(열면 그대로 보이고 계속 편집 가능) */
function saveHTML(){
  if(window.SHAPE){alert('모양 편집을 먼저 [확정]하거나 [취소]해 주세요.');return}
  if(!state.log.length&&!confirm('아직 변경 사항이 없습니다. 그래도 저장할까요?'))return;
  const name=document.getElementById('edPlanName').value||'편집안';
  ED.planName=name.trim();
  const now=new Date(),p=n=>String(n).padStart(2,'0'),at=`${now.getFullYear()}-${p(now.getMonth()+1)}-${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}`;
  const data=JSON.stringify({floor:FLOOR_ID,name:ED.planName,saved_at:at,seq:ED.seq,state}).replace(/<\//g,'<\\/');
  const src=window.__SRC||'',k=src.indexOf('<script id="snap">');
  if(k<0){alert('저장용 원본 정보를 찾지 못했습니다.');return}
  let out='<!doctype html>\n'+src.slice(0,k);
  let after=false;
  document.querySelectorAll('script').forEach(s=>{if(s.id==='snap')after=true;if(!after)return;
    const attrs=[...s.attributes].map(a=>` ${a.name}="${a.value}"`).join('');
    out+=`<script${attrs}>`+(s.id==='saved-state'?data:s.textContent)+'<\/script>\n'});
  out+='</body></html>';
  const safe=ED.planName.replace(/[\\/:*?"<>|\s]+/g,'_')||'편집';
  download(`${FLOOR_FILE}_${safe}_${stamp()}.html`,out,'text/html;charset=utf-8');window.__fpSaved=true;
  showPlanTag()}

/* 2) 불러오기: [JSON 저장]으로 만든 파일을 읽어 그 배치안으로 바꾼다(되돌리기 가능) */
function loadJSON(file){const rd=new FileReader();rd.onload=()=>{let j;
  try{j=JSON.parse(rd.result)}catch(e){alert('JSON 파일을 읽지 못했습니다.');return}
  if(j.floor&&j.floor!==FLOOR_ID&&!confirm(`이 파일은 '${j.floor}' 도면입니다. 그래도 불러올까요?`))return;
  let st;
  if(j.state&&Array.isArray(j.state.stores))st=clone(j.state);
  else if(Array.isArray(j.added)){  /* 이전 버전 JSON: 원본에서 지운 매장·새 매장으로 다시 만든다 */
    const rm=new Set((j.removed||[]).map(r=>r.space_id)),ad=new Set(j.added.map(a=>a.space_id));
    st={stores:BASE.filter(d=>!rm.has(d.space_id)&&!ad.has(d.space_id)).map(clone).concat(j.added.map(a=>{const big=a.polygons.reduce((x,y)=>ringA(y[0])>ringA(x[0])?y:x,a.polygons[0]);const o=BASE.find(d=>d.space_id===a.space_id);
      return Object.assign(o?clone(o):{space_id:a.space_id,space_nm:'편집_'+a.space_id,type:'매장',shop_cd:null,group:'etc'},{name:a.name,edited:true,from:a.from,rings:a.polygons,v:big[0],area_m2:a.area_m2,area_py:py(a.area_m2)})})),log:j.log||[]}}
  else{alert('도면 편집 JSON 형식이 아닙니다.');return}
  if(!Array.isArray(st.facs))st.facs=clone(BASE_F);
  if(window.SHAPE){window.SHAPE=null;SHL.innerHTML='';document.body.classList.remove('shaping')}
  const mx=st.stores.reduce((m,d)=>{const r=/^NEW-(\d+)/.exec(d.space_id);return r?Math.max(m,+r[1]):m},0);ED.seq=Math.max(ED.seq,mx,j.seq||0);
  ED.picked=[];ED.undo.push(JSON.stringify({state,seq:ED.seq}));ED.redo=[];
  const label=j.name||file.name.replace(/\.json$/i,'');
  state=st;state.log=st.log.concat([{t:new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}),msg:`불러오기: ${label} (변경 ${st.log.length}건)`}]);
  if(j.name){ED.planName=j.name;document.getElementById('edPlanName').value=j.name}showPlanTag();rebuild()};
  rd.readAsText(file,'utf-8')}

document.getElementById('edSave').onclick=saveHTML;
const lf=document.getElementById('edLoadFile');
document.getElementById('edLoad').onclick=()=>{lf.value='';lf.click()};
lf.onchange=()=>lf.files[0]&&loadJSON(lf.files[0]);


/* ===== 매장(도형) 삽입: 사각형 끌어 그리기 · 다각형 점 찍기 ===== */
const INL=el('g',{id:'insert-layer'},svg);
window.INS=null;
function insStart(){if(window.SHAPE)return;if(window.INS)insEnd();ED.picked=[];splitClose(true);closePops();refreshPick();
  const others=othersOf(new Set());const snapPts=[];others.forEach(o=>o.geom.forEach(p=>p[0].forEach(q=>snapPts.push(q))));
  window.INS={mode:document.querySelector('input[name=insMode]:checked').value,pts:[],ring:null,drag:null,hover:null,others,snapPts,hits:[],ok:false,area:0};
  EDL.innerHTML='';document.body.classList.add('inserting');insDraw();insInfo()}
function insEnd(){window.INS=null;INL.innerHTML='';document.body.classList.remove('inserting');refreshPick()}
/* 점 맞춤 + Shift(직전 점 기준 수평·수직 고정) */
function insSnap(x,y,extra,e){const S=window.INS;S.guides=[];S.tags=[];
  const last=S.mode==='poly'&&S.pts[S.pts.length-1];let lock=null;
  if(e&&e.shiftKey&&last){lock=Math.abs(x-last[0])>=Math.abs(y-last[1])?'y':'x';if(lock==='y')y=last[1];else x=last[0]}
  if(!document.getElementById('insSnap').checked)return[lock==='x'?x:Math.round(x),lock==='y'?y:Math.round(y)];
  const th=SNAP_PX*unit(),P=S.snapPts.concat(extra||[]);
  const bx=lock==='x'?null:bestCand(x,axisCands(P,0),th),by=lock==='y'?null:bestCand(y,axisCands(P,1),th);
  const nx=lock==='x'?x:bx?bx.v:Math.round(x/GRID)*GRID,ny=lock==='y'?y:by?by.v:Math.round(y/GRID)*GRID;
  if(bx)S.guides.push([bx.src,[nx,ny]]);if(by)S.guides.push([by.src,[nx,ny]]);return[nx,ny]}
/* 사각형 모서리: 위치 맞춤 + 크기 맞춤(주변 매장 가로·세로) + Shift(정사각형) */
function insRectSnap(x,y,e){const S=window.INS,p0=S.drag.p0;S.guides=[];S.tags=[];
  if(!document.getElementById('insSnap').checked){x=Math.round(x);y=Math.round(y)}
  else{const th=SNAP_PX*unit(),Z=S.drag.sizes,res=[];
    [0,1].forEach(k=>{const v=k?y:x,c=axisCands(S.snapPts,k);Z[k].forEach(sz=>{c.push({v:p0[k]+sz.size,size:sz,ax:k});c.push({v:p0[k]-sz.size,size:sz,ax:k})});
      const b=bestCand(v,c,th);res[k]=b;if(k)y=b?b.v:Math.round(y/GRID)*GRID;else x=b?b.v:Math.round(x/GRID)*GRID});
    res.forEach(b=>{if(b&&b.src)S.guides.push([b.src,[x,y]]);if(b&&b.size)S.tags.push({ax:b.ax,size:b.size,at:b.ax===0?[(p0[0]+x)/2,Math.max(p0[1],y)+30*unit()]:[Math.min(p0[0],x)-40*unit(),(p0[1]+y)/2]})})}
  if(e&&e.shiftKey){const w=Math.abs(x-p0[0]),h=Math.abs(y-p0[1]),m=Math.max(w,h);x=p0[0]+Math.sign(x-p0[0]||1)*m;y=p0[1]+Math.sign(y-p0[1]||1)*m;S.tags=[];S.guides=[]}
  return[x,y]}
function insCheck(){const S=window.INS;S.hits=[];S.ok=false;S.area=0;if(!S.ring||S.ring.length<3)return;const G=[[S.ring]];
  let u;try{u=PC.union(G)}catch(e){return}
  if(u.length!==1||u[0].length!==1||Math.abs(areaOf(u)-Math.abs(sgnA(S.ring))/10000)>0.01)return;
  S.area=r2(areaOf(G));if(S.area<0.5)return;S.ok=true;
  const gb=bboxOf(G);S.others.forEach(o=>{if(!bbOverlap(gb,o.bb))return;let I=[];try{I=PC.intersection(G,o.geom)}catch(e){}const a=areaOf(I);if(a>0.01)S.hits.push({name:o.name,a:r2(a),inter:I})})}
function insInfo(){const S=window.INS;if(!S)return;const A=document.getElementById('insArea'),W=document.getElementById('insWarn');
  const tip=S.mode==='rect'?'도면 위를 끌어 사각형을 그리세요':'점을 차례로 클릭하고, 첫 점을 다시 클릭하거나 더블클릭·Enter로 닫으세요';
  A.innerHTML=S.ring?(S.ok?`면적 <b>${S.area}㎡</b> (${py(S.area)}평)`:''):`<span class="c">${tip}</span>`;
  W.innerHTML=S.ring&&!S.ok?'⚠ 도형이 너무 작거나 변이 서로 교차합니다':S.hits.length?'⚠ 겹침: '+S.hits.map(h=>`${h.name} ${h.a}㎡`).join(', '):'';
  document.getElementById('insOk').disabled=!S.ok;document.getElementById('insBack').disabled=!(S.pts.length||S.ring)}
function insDraw(){INL.innerHTML='';const S=window.INS;if(!S)return;const u=unit();
  el('rect',{x:-1e6,y:-1e6,width:2e6,height:2e6,class:'ins-cap'},INL);
  const lenLbl=(p,q)=>{const[a,b]=T(p),[c,e]=T(q);if(Math.hypot(c-a,e-b)/u<60)return;const horiz=Math.abs(e-b)<Math.abs(c-a);
    const t=el('text',{x:(a+c)/2,y:(b+e)/2+(horiz?-14*u:0),dx:horiz?0:14*u,'font-size':11*u,class:'sh-len','text-anchor':horiz?'middle':'start'},INL);t.textContent=Math.round(Math.hypot(q[0]-p[0],q[1]-p[1]))+'cm'};
  let R=S.ring;
  if(!R&&S.mode==='rect'&&S.drag){const[a,b]=S.drag.p0,[c,d]=S.drag.p1;R=[[a,b],[c,b],[c,d],[a,d]]}
  if(R){el('path',{d:ringsPath([[R]]),class:'ins-shape'+(S.ring&&!S.ok?' bad':''),'stroke-width':2.5*u},INL);
    S.hits.forEach(h=>el('path',{d:ringsPath(h.inter),class:'sh-hit'},INL));R.forEach((p,i)=>lenLbl(p,R[(i+1)%R.length]));
    if(S.ring&&S.ok){const[x0,y0,x1,y1]=bboxOf([[R]]),[cx,cy]=T([(x0+x1)/2,(y0+y1)/2]);const t=el('text',{x:cx,y:cy,'font-size':13*u,class:'pvt','stroke-width':4*u},INL);
      t.textContent=`${document.getElementById('insName').value||'신규 매장'} ${S.area}㎡`}}
  else if(S.pts.length){const P=S.hover?S.pts.concat([S.hover]):S.pts;
    el('polyline',{points:P.map(T).map(p=>p.join(',')).join(' '),class:'ins-line','stroke-width':2.5*u},INL);
    for(let i=0;i+1<P.length;i++)lenLbl(P[i],P[i+1])}
  (S.ring||S.pts).forEach((p,i)=>{const[a,b]=T(p);el('circle',{cx:a,cy:b,r:(i===0&&!S.ring&&S.pts.length>=3?8:5)*u,class:'ins-v'+(i===0&&!S.ring?' first':''),'stroke-width':2*u},INL)});
  drawSmart(INL,S,u)}
function insClose(){const S=window.INS;if(S.pts.length<3)return;S.ring=cleanRing(S.pts);S.pts=[];S.hover=null;S.guides=[];S.tags=[];insCheck();insDraw();insInfo()}

INL.addEventListener('pointerdown',e=>{const S=window.INS;if(!S||e.button!==0)return;e.stopPropagation();e.preventDefault();
  const[x,y]=toO(e.clientX,e.clientY);
  if(S.mode==='rect'){S.ring=null;S.hits=[];const p=insSnap(x,y);S.drag={p0:p,p1:p,sizes:nearSizes([p[0],p[1],p[0],p[1]],null)};insInfo();return}
  if(S.ring){S.ring=null;S.hits=[]}  /* 다시 그리기 */
  if(S.pts.length>=3){const[f0,f1]=T(S.pts[0]),[c0,c1]=T([x,y]);if(Math.hypot(f0-c0,f1-c1)/unit()<12){insClose();return}}
  const last=S.pts[S.pts.length-1],p=insSnap(x,y,S.pts,e);if(last&&last[0]===p[0]&&last[1]===p[1])return;
  S.pts.push(p);insDraw();insInfo()});
window.addEventListener('pointermove',e=>{const S=window.INS;if(!S)return;
  if(S.mode==='rect'&&S.drag){const[x,y]=toO(e.clientX,e.clientY);S.drag.p1=insRectSnap(x,y,e);insDraw();return}
  if(S.mode==='poly'&&S.pts.length&&!S.ring&&e.target.closest&&e.target.closest('#plan')){const[x,y]=toO(e.clientX,e.clientY);S.hover=insSnap(x,y,S.pts,e);insDraw()}});
window.addEventListener('pointerup',()=>{const S=window.INS;if(!S||!S.drag)return;const[a,b]=S.drag.p0,[c,d]=S.drag.p1;S.drag=null;S.guides=[];S.tags=[];
  if(Math.abs(c-a)<20||Math.abs(d-b)<20){insDraw();insInfo();return}  /* 20cm보다 작으면 무시 */
  S.ring=[[Math.min(a,c),Math.min(b,d)],[Math.max(a,c),Math.min(b,d)],[Math.max(a,c),Math.max(b,d)],[Math.min(a,c),Math.max(b,d)]];insCheck();insDraw();insInfo()});
INL.addEventListener('dblclick',e=>{const S=window.INS;if(!S||S.mode!=='poly'||S.ring)return;e.stopPropagation();insClose()});

function insConfirm(){const S=window.INS;if(!S)return;insCheck();if(!S.ok){alert('삽입할 도형이 없거나 올바르지 않습니다.');return}
  const name=(document.getElementById('insName').value||'신규 매장').trim(),cd=null,grp=document.getElementById('insGroup').value;
  if(S.hits.length&&!confirm('다른 공간과 겹칩니다.\n'+S.hits.map(h=>`· ${h.name} ${h.a}㎡`).join('\n')+'\n\n그래도 삽입할까요?'))return;
  const R=S.ring.map(p=>[Math.round(p[0]*10)/10,Math.round(p[1]*10)/10]);
  const ns=mkStore([[R]],{name,shop_cd:cd,group:grp,from:'신규 삽입'});
  const next=clone(state);next.stores.push(ns);
  const msg=`매장 삽입: ${name}${cd?`(${cd})`:''} ${ns.area_m2}㎡`+(S.hits.length?` · 겹침 ${S.hits.map(h=>`${h.name} ${h.a}㎡`).join(', ')}`:'');
  window.INS=null;INL.innerHTML='';document.body.classList.remove('inserting');ED.picked=[ns.space_id];commit(next,msg)}
function insBack(){const S=window.INS;if(!S)return;if(S.ring){S.ring=null;S.hits=[]}else S.pts.pop();insDraw();insInfo()}

/* 다른 모드와 섞이지 않게 */
{const p0=Plan.pick;Plan.pick=(id,e)=>{if(window.INS)return;p0(id,e)}}
{const mf=Plan.minFont;Plan.minFont=()=>{mf();window.INS&&insDraw()}}
const insWith=m=>{const r=document.querySelector(`input[name=insMode][value=${m}]`);if(r)r.checked=true;insStart()};
document.getElementById('edInsert').onclick=()=>insWith('rect');document.getElementById('edInsPoly').onclick=()=>insWith('poly');
document.getElementById('insOk').onclick=insConfirm;document.getElementById('insBack').onclick=insBack;
document.getElementById('insCancel').onclick=()=>{const S=window.INS;if(S&&(S.ring||S.pts.length)&&!confirm('매장 삽입을 취소할까요?'))return;insEnd()};
document.querySelectorAll('input[name=insMode]').forEach(r=>r.onchange=()=>{const S=window.INS;if(!S)return;r.blur();S.mode=r.value;S.pts=[];S.ring=null;S.hits=[];S.hover=null;insDraw();insInfo()});
document.getElementById('insName').oninput=()=>window.INS&&insDraw();
document.addEventListener('keydown',e=>{const S=window.INS;if(!S||(e.target.matches&&e.target.matches('input:not([type=radio]):not([type=checkbox]),select')))return;
  if(e.key==='Escape'){document.getElementById('insCancel').click()}
  else if(e.key==='Enter'){e.preventDefault();S.mode==='poly'&&!S.ring&&S.pts.length>=3?insClose():insConfirm()}
  else if(e.key==='Backspace'||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z')){e.preventDefault();insBack()}});


/* ===== 이동: 아이디어 모드에서 매장·시설을 끌어 옮긴다 =====
   - 선택 도구: 이미 선택한 공간을 끌면 선택한 공간 전체가 함께 움직인다(그 밖은 도면 이동)
   - 이동 도구: 어떤 공간이든 끌면 옮긴다(선택한 공간을 끌면 선택한 공간 전체)
   맞춤 안내선(주변 꼭짓점 x/y)에 붙고, 맞춤이 없으면 10cm 단위로 움직인다. Shift: 수평·수직으로만 */
const MVL=el('g',{id:'move-layer'},svg);
let MV=null,mvBlock=false;
function mvDown(e){if(!ED.mode||window.SHAPE||window.INS||ED.splitting||e.button!==0||e.ctrlKey||e.metaKey)return;
  const id=e.target.dataset&&(e.target.dataset.id||e.target.dataset.fid);const d=id&&itemOf(id);if(!d)return;
  const picked=ED.picked.includes(id);if(ED.tool!=='move'&&!picked)return;
  e.stopPropagation();const ids=picked?ED.picked.slice():[id];
  const items=ids.map(i=>({id:i,d:itemOf(i),G:geomOf(itemOf(i))})).filter(o=>o.d),pts=[];
  items.forEach(o=>o.G.forEach(p=>p.forEach(r=>r.forEach(q=>pts.push(q)))));
  const others=othersOf(new Set(ids)),snapPts=[];others.forEach(o=>o.geom.forEach(p=>p[0].forEach(q=>snapPts.push(q))));
  MV={ids,items,pts,o:toO(e.clientX,e.clientY),sx:e.clientX,sy:e.clientY,moved:false,dx:0,dy:0,others,snapPts,guides:[],tags:[],hits:[]}}
[SL,document.getElementById('fac-layer'),document.getElementById('flow-base')].forEach(L=>L.addEventListener('pointerdown',mvDown));
function mvShift(G,dx,dy){return G.map(p=>p.map(r=>r.map(q=>[q[0]+dx,q[1]+dy])))}
function mvCheck(){if(!MV)return;MV.hits=[];const seen=new Map();
  MV.items.forEach(it=>{const G=mvShift(it.G,MV.dx,MV.dy),gb=bboxOf(G);
    MV.others.forEach(o=>{if(!bbOverlap(gb,o.bb))return;let I=[];try{I=PC.intersection(G,o.geom)}catch(e){}const a=areaOf(I);if(a>0.01)MV.hits.push({name:o.name,a:r2(a),inter:I})})})}
const mvDir=(dx,dy)=>[dx?`${dx>0?'오른쪽':'왼쪽'} ${Math.abs(Math.round(dx))}cm`:'',dy?`${dy>0?'위':'아래'} ${Math.abs(Math.round(dy))}cm`:''].filter(Boolean).join(' · ')||'제자리';
const mvNames=m=>m.items.length>2?`${dispName(m.items[0].d)} 외 ${m.items.length-1}개`:m.items.map(o=>dispName(o.d)).join(', ');
let mvPending=0;
window.addEventListener('pointermove',e=>{if(!MV)return;
  if(!MV.moved){if(Math.hypot(e.clientX-MV.sx,e.clientY-MV.sy)<3)return;MV.moved=true;EDL.innerHTML=''}
  const[x,y]=toO(e.clientX,e.clientY);let dx=x-MV.o[0],dy=y-MV.o[1],lock=null;
  if(e.shiftKey){lock=Math.abs(dx)>=Math.abs(dy)?'y':'x';if(lock==='y')dy=0;else dx=0}
  MV.guides=[];
  if(document.getElementById('edSnap').checked){const th=SNAP_PX*unit();
    [0,1].forEach(k=>{if((k===0&&lock==='x')||(k===1&&lock==='y')){MV['b'+k]=null;return}const dd=k?dy:dx;let best=null,bd=th;
      for(const p of MV.pts){const v=p[k]+dd;for(const c of MV.snapPts){const g=Math.abs(c[k]-v);if(g<bd){bd=g;best={p,c,off:c[k]-p[k]}}}}
      const nv=best?best.off:Math.round(dd/GRID)*GRID;if(k)dy=nv;else dx=nv;MV['b'+k]=best});
    [MV.b0,MV.b1].forEach(b=>{if(b)MV.guides.push([b.c,[b.p[0]+dx,b.p[1]+dy]])})}
  else{dx=Math.round(dx);dy=Math.round(dy)}
  MV.dx=dx;MV.dy=dy;const tr=`translate(${dx},${-dy})`;
  MV.ids.forEach(id=>{const n=nodeOf(id),l=lblOf(id);n&&n.setAttribute('transform',tr);l&&l.setAttribute('transform',tr)});
  if(!mvPending)mvPending=requestAnimationFrame(()=>{mvPending=0;mvCheck();mvDraw()});mvDraw();
  Plan.tip(e,`${mvNames(MV)} 이동: ${mvDir(dx,dy)}`+(MV.hits.length?` · ⚠ 겹침 ${MV.hits.map(h=>`${h.name} ${h.a}㎡`).join(', ')}`:''))});
function mvDraw(){MVL.innerHTML='';if(!MV)return;const u=unit();MV.hits.forEach(h=>el('path',{d:ringsPath(h.inter),class:'sh-hit'},MVL));drawSmart(MVL,MV,u)}
window.addEventListener('pointerup',()=>{if(!MV)return;const m=MV;MV=null;MVL.innerHTML='';Plan.tip(null);
  if(!m.moved)return;mvBlock=true;setTimeout(()=>mvBlock=false,0);
  if(!m.dx&&!m.dy){dirty(m.ids);rebuild();return}
  mvCheckFor(m);
  const next=clone(state);
  m.ids.forEach(id=>{const t=itemOf(id,next);if(!t)return;t.rings=mvShift(geomOf(t),m.dx,m.dy);t.v=t.v.map(q=>[q[0]+m.dx,q[1]+m.dy].concat(q.slice(2)));if(t.lpos)t.lpos=[t.lpos[0]+m.dx,t.lpos[1]+m.dy];  /* 옮긴 라벨 위치도 공간과 함께 이동 */if(!t.edited){t.edited=true;t.from=srcTxt(t)}});
  ED.picked=m.ids.slice();commit(next,`이동: ${mvNames(m)} ${mvDir(m.dx,m.dy)}`+(m.hits.length?` · 겹침 ${m.hits.map(h=>`${h.name} ${h.a}㎡`).join(', ')}`:''))});
function mvCheckFor(m){const keep=MV;MV=m;mvCheck();MV=keep}
/* 끌기를 마친 뒤 생기는 click은 선택으로 처리하지 않는다 */
[SL,document.getElementById('fac-layer'),document.getElementById('flow-base'),svg].forEach(L=>L.addEventListener('click',e=>{if(mvBlock){e.stopPropagation();e.preventDefault()}},true));
rebuild();


/* ===== 라벨 위치 이동(라벨 도구): 라벨만 끌어 옮긴다. 공간 도형·면적은 그대로. 라벨 더블클릭: 원래 자리로 =====
   위치는 원본 좌표(cm, Y축 위쪽)로 state에 저장(lpos)하므로 저장·불러오기·PPT에도 그대로 남는다 */
let LD=null,ldBlock=false;
function ldDown(e){if(!ED.mode||ED.tool!=='label'||window.SHAPE||window.INS||e.button!==0)return;
  const t=e.target.closest&&e.target.closest('text[data-lid]');if(!t)return;const id=t.dataset.lid,d=itemOf(id);if(!d)return;
  e.stopPropagation();e.preventDefault();
  LD={id,d,t,x0:+t.getAttribute('x'),y0:+t.getAttribute('y'),sx:e.clientX,sy:e.clientY,moved:false,dx:0,dy:0,add:e.ctrlKey||e.metaKey}}
[LL,FT_,FW_].forEach(L=>L.addEventListener('pointerdown',ldDown));
window.addEventListener('pointermove',e=>{if(!LD)return;if(!LD.moved){if(Math.hypot(e.clientX-LD.sx,e.clientY-LD.sy)<3)return;LD.moved=true}
  const u=unit();LD.dx=(e.clientX-LD.sx)*u;LD.dy=(e.clientY-LD.sy)*u;LD.t.setAttribute('transform',`translate(${LD.dx},${LD.dy})`);
  Plan.tip(e,`${dispName(LD.d)} 라벨 이동`)});
window.addEventListener('pointerup',()=>{if(!LD)return;const m=LD;LD=null;Plan.tip(null);if(!m.moved){ldBlock=true;setTimeout(()=>ldBlock=false,0);pick(m.id,{ctrlKey:m.add});return}  /* 라벨 클릭 = 그 공간 선택(Ctrl: 여러 개) */ldBlock=true;setTimeout(()=>ldBlock=false,0);
  const nx=m.x0+m.dx,ny=m.y0+m.dy,next=clone(state),t=itemOf(m.id,next);t.lpos=[Math.round(nx),Math.round(maxY-ny)];
  ED.picked=[m.id];commit(next,`라벨 위치 변경: ${dispName(m.d)}`)});
[LL,FT_,FW_].forEach(L=>L.addEventListener('dblclick',e=>{if(!ED.mode||ED.tool!=='label')return;const t=e.target.closest&&e.target.closest('text[data-lid]');if(!t)return;
  e.stopPropagation();const d=itemOf(t.dataset.lid);if(!d||!(d.lpos||d.lscale||d.lbold!==undefined||d.litalic))return;const next=clone(state),q=itemOf(d.space_id,next);['lpos','lscale','lbold','litalic'].forEach(k=>delete q[k]);commit(next,`라벨 원래대로(위치·서식): ${dispName(d)}`)}));
svg.addEventListener('click',e=>{if(ldBlock){e.stopPropagation();e.preventDefault()}},true);


/* ===== PowerPoint 저장: 도면을 PowerPoint 도형(자유형)으로 넣어, PowerPoint에서 매장별로 고칠 수 있게 한다 =====
   양식: PowerPoint 기본(와이드 16:9, 흰 배경, 기본 표 스타일) */
const PFONT='맑은 고딕',LEAK_TXT='⚠ 본 도면은 신세계백화점 사내 대외비 자료입니다. 무단 복제·촬영·외부 유출 시 인사규정에 따라 징계 조치될 수 있습니다.';
const hex=c=>(c||'#ffffff').replace('#','').toUpperCase();
const FAC_FILL=f=>IS_STAIR(f)?'E4E4E4':IS_ELEV(f)?'C9DAF2':(f.type==='이동공간'||f.type==='후방동선')?'ECECEC':/서비스|라운지|사무실/.test(f.type)?'E6ECEF':'DCDCDC';
/* 라벨 위치·크기(도면 좌표): 화면과 같은 방법(labelPoint)으로 구한다 */
function labelOf(d){const tmp=el('path',{d:d.rings?ringsPath(d.rings):pathOf(d.v)},svg);
  const L=labelPoint(tmp,d.v,emw(d.label||d.name));tmp.remove();return L}
/* 도면 전체를 슬라이드의 (X,Y,W,H) 상자 안에 그린다. stores: 매장 데이터 배열 */
function drawPlan(pptx,slide,stores,box,opt={}){
  const ext=[minX-60,-60,maxX+60,maxY-minY+60],sc=Math.min(box.w/(ext[2]-ext[0]),box.h/(ext[3]-ext[1]));
  const ox=box.x+(box.w-(ext[2]-ext[0])*sc)/2,oy=box.y+(box.h-(ext[3]-ext[1])*sc)/2;
  const P=([x,y])=>[ox+(x-ext[0])*sc,oy+(maxY-y-ext[1])*sc];  /* 원본 좌표(cm, Y 위쪽) → 슬라이드(inch) */
  const ln=w=>Math.max(0.25,w),changed=opt.changed||new Set();
  slide.addShape(pptx.ShapeType.rect,{x:ox,y:oy,w:(ext[2]-ext[0])*sc,h:(ext[3]-ext[1])*sc,fill:{color:'F6F6F6'},line:{color:'555555',width:1.5},objectName:'층 외곽'});
  const poly=(mp,o)=>{const pts=[];mp.forEach(pl=>pl.forEach(r=>r.forEach(q=>pts.push(P(q)))));
    const x0=Math.min(...pts.map(p=>p[0])),y0=Math.min(...pts.map(p=>p[1])),x1=Math.max(...pts.map(p=>p[0])),y1=Math.max(...pts.map(p=>p[1]));
    const points=[];mp.forEach(pl=>pl.forEach(r=>{r.forEach((q,i)=>{const[a,b]=P(q);points.push(Object.assign({x:a-x0,y:b-y0},i===0?{moveTo:true}:{}))});points.push({close:true})}));
    points[0]={x:points[0].x,y:points[0].y};
    slide.addShape(pptx.ShapeType.custGeom,Object.assign({x:x0,y:y0,w:Math.max(x1-x0,0.01),h:Math.max(y1-y0,0.01),points},o))};
  /* 1) 시설(매장 아래) */
  /* opt.fac=false: 시설 제외 / opt.flow=false: 이동 시설(에스컬레이터·보이드·엘리베이터) 제외. 엘리베이터는 화면과 같이 이동 시설로 본다 */
  const showFac=f=>IS_MOVEF(f)?opt.flow!==false:opt.fac!==false,FACS=opt.facs||state.facs;
  FACS.filter(showFac).forEach(f=>poly(geomOf(f),{fill:{color:f.fill?hex(f.fill):FAC_FILL(f)},line:changed.has(f.space_id)?{color:'B4005A',width:1,dashType:'dash'}:{color:'888888',width:0.25},objectName:f.name||f.space_nm}));
  /* 시설 이름(일정 크기 이상만, 회색 작은 글씨) */
  if(opt.facLabel)FACS.filter(showFac).forEach(f=>{const G=geomOf(f);if(areaOf(G)<12)return;const tmp=el('path',{d:f.rings?ringsPath(f.rings):pathOf(f.v)},svg),L=labelPoint(tmp,f.v);tmp.remove();
    const t=f.label||(IS_ELEV(f)?'EV':dispName(f)),fs=Math.max(4.5,Math.min(7,L.r*2*sc*72/Math.max(emw(t),1)*0.9))*(f.lscale||1),lp=f.lpos?T(f.lpos):L.pt,cx=ox+(lp[0]-ext[0])*sc,cy=oy+(lp[1]-ext[1])*sc,tw=emw(t)*fs/72*1.1+0.05;
    slide.addText(t,{x:cx-tw/2,y:cy-fs/72*0.75,w:tw,h:fs/72*1.5,fontFace:PFONT,fontSize:Math.round(fs*2)/2,bold:f.lbold===undefined?IS_ELEV(f):f.lbold,italic:!!f.litalic,color:f.lcolor?hex(f.lcolor):'666666',align:'center',valign:'middle',margin:0,wrap:false,objectName:'시설 '+t})});
  if(opt.flow!==false)FLOW.voids.forEach(v=>{const Q=v.map(P),x0=Math.min(...Q.map(p=>p[0])),y0=Math.min(...Q.map(p=>p[1])),x1=Math.max(...Q.map(p=>p[0])),y1=Math.max(...Q.map(p=>p[1]));
    slide.addText('OPEN',{shape:pptx.ShapeType.rect,x:x0,y:y0,w:x1-x0,h:y1-y0,fill:{color:'FFFFFF'},line:{color:'7A8794',width:0.75,dashType:'dash'},fontFace:PFONT,fontSize:7,color:'7A8794',align:'center',valign:'middle',margin:0,objectName:'보이드'})});
  if(opt.flow!==false)FLOW.esc.forEach(e=>{const a=P([e.b[0],e.b[3]]),b=P([e.b[2],e.b[1]]);
    slide.addText('E/S'+(e.dir==='UP'?' ▲':e.dir==='DN'?' ▼':''),{shape:pptx.ShapeType.rect,x:a[0],y:a[1],w:b[0]-a[0],h:b[1]-a[1],fill:{color:'FFFFFF'},line:{color:'3A4A5C',width:0.5},fontFace:PFONT,fontSize:6,bold:true,color:'1F2D3D',align:'center',valign:'middle',margin:0,objectName:'에스컬레이터'})});
  /* 2) 매장(큰 매장 먼저 → 작은 매장이 위에) */
  const list=stores.map(d=>({d,G:geomOf(d)})).map(o=>(o.a=areaOf(o.G),o)).sort((p,q)=>q.a-p.a);
  list.forEach(({d,G})=>{const ch=changed.has(d.space_id);
    poly(G,{fill:{color:hex(d.fill||COLORS[d.group])},line:ch?{color:'B4005A',width:1.5,dashType:'dash'}:{color:'222222',width:0.75},objectName:d.name+(d.shop_cd?` (${d.shop_cd})`:'')})});
  /* 3) 매장명(매장코드가 있거나 아이디어 모드에서 만든 매장) */
  list.forEach(({d})=>{if(!d.shop_cd&&!d.edited)return;const L=labelOf(d),lp=d.lpos?T(d.lpos):L.pt,[cx,cy]=[ox+(lp[0]-ext[0])*sc,oy+(lp[1]-ext[1])*sc],nm=d.label||d.name;
    const W=L.hs*0.9*sc,H=L.vs*0.8*sc,fs=Math.max(5,Math.min(opt.maxFont||12,W*72/Math.max(emw(nm),1),H*72*0.55))*(d.lscale||1);
    const tw=Math.max(W,emw(nm)*fs/72*1.05),th=fs/72*1.5;
    slide.addText(nm,{x:cx-tw/2,y:cy-th/2,w:tw,h:th,fontFace:PFONT,fontSize:Math.round(fs*2)/2,bold:d.lbold!==false,italic:!!d.litalic,color:d.lcolor?hex(d.lcolor):changed.has(d.space_id)?'B4005A':'222222',align:'center',valign:'middle',margin:0,wrap:false,objectName:'라벨 '+d.name})});
  return sc}
/* 기본 표 스타일(보통 스타일 2 - 강조 1과 비슷하게) */
function addTbl(pptx,slide,head,rows,o){const H=head.map(t=>({text:t,options:{bold:true,color:'FFFFFF',fill:{color:'4472C4'},align:'center'}}));
  const R=rows.map((r,i)=>r.map((t,k)=>({text:String(t??''),options:Object.assign({fill:{color:i%2?'E9EBF5':'CFD5EA'},color:'000000'},(o.align&&o.align[k])?{align:o.align[k]}:{})})));
  slide.addTable([H].concat(R),Object.assign({x:0.6,y:1.55,w:12.13,fontFace:PFONT,fontSize:11,border:{type:'solid',color:'FFFFFF',pt:1},valign:'middle',rowH:0.3},o))}
function titleOf(pptx,slide,t){slide.addText(t,{x:0.6,y:0.35,w:12.13,h:0.9,fontFace:PFONT,fontSize:32,color:'000000',valign:'middle',margin:0})}

/* PptxGenJS는 파일 크기를 줄이려고 함께 넣지 않고, PowerPoint 저장을 누를 때만 공개 CDN에서 불러온다(한 번 불러오면 다시 쓰기) */
const PPTX_URL='https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';let pptxP=null;
function loadPptx(){if(window.PptxGenJS)return Promise.resolve();if(pptxP)return pptxP;
  pptxP=new Promise((ok,ng)=>{const sc=document.createElement('script');sc.src=PPTX_URL;sc.async=true;sc.onload=()=>window.PptxGenJS?ok():ng(new Error('PptxGenJS를 찾지 못했습니다'));
    sc.onerror=()=>{pptxP=null;sc.remove();ng(new Error('PowerPoint 라이브러리를 불러오지 못했습니다(인터넷 또는 사내망에서 cdn.jsdelivr.net 접속 확인)'))};document.head.appendChild(sc)});
  return pptxP}
async function savePPT(){
  if(window.SHAPE||window.INS){alert('모양 편집이나 매장 삽입을 먼저 마쳐 주세요.');return}
  const btns=['edPPT','hdPPT'].map(id=>document.getElementById(id)).filter(Boolean),lbl=btns.map(b=>b.textContent);btns.forEach(b=>{b.disabled=true;b.textContent='만드는 중…'});
  const hasChg=state.log.length>0;  /* 변경이 없으면 표지·도면·매장 목록만 */
  try{
    await loadPptx();
    const pptx=new PptxGenJS();pptx.layout='LAYOUT_WIDE';pptx.theme={headFontFace:PFONT,bodyFontFace:PFONT};
    const name=(document.getElementById('edPlanName').value||ED.planName||'').trim(),now=new Date(),p2=n=>String(n).padStart(2,'0');
    const today=`${now.getFullYear()}.${p2(now.getMonth()+1)}.${p2(now.getDate())}`;
    pptx.title=`${FLOOR_ID}${hasChg?' 아이디어':''}${name?' - '+name:''}`;
    const ids=new Set(state.stores.map(d=>d.space_id)),changed=new Set(allOf().filter(d=>d.edited).map(d=>d.space_id));
    const goneOrChanged=BASE.filter(d=>!ids.has(d.space_id)||changed.has(d.space_id));
    /* 1. 표지 */
    let s=pptx.addSlide();
    s.addText(FLOOR_ID+(hasChg?' 아이디어':''),{x:1.17,y:1.23,w:11,h:2.61,fontFace:PFONT,fontSize:48,align:'center',valign:'bottom',color:'000000',margin:0});
    s.addText([FLOOR_FULL!==FLOOR_ID?FLOOR_FULL+'\n':'',name?`${name}  ·  `:'',`${today}`].join(''),{x:1.17,y:3.94,w:11,h:1.81,fontFace:PFONT,fontSize:24,align:'center',valign:'top',color:'595959',margin:0});
    /* 2~4. 도면 3종: ① 현재 그대로 ② 시설 제외 ③ 시설·이동 시설 제외 */
    const VERS=[['',{fac:true,flow:true}],['시설 제외',{fac:false,flow:true}],['시설·이동 시설 제외',{fac:false,flow:false}]];
    VERS.forEach(([sub,o])=>{s=pptx.addSlide();titleOf(pptx,s,`${hasChg?'아이디어 도면':'도면'}${sub?' ('+sub+')':''}${name?' – '+name:''}`);
      drawPlan(pptx,s,state.stores,{x:0.4,y:1.45,w:12.53,h:5.3},Object.assign({changed,maxFont:12,facLabel:true},o));
      s.addText(hasChg?[{text:'━ ━ ',options:{color:'B4005A',bold:true}},{text:'아이디어 모드에서 바뀐 공간  ·  도면 단위 cm(공간관리시스템 좌표)  ·  시뮬레이션이며 원본 도면에는 반영되지 않음',options:{color:'595959'}}]:[{text:'도면 단위 cm(공간관리시스템 좌표)',options:{color:'595959'}}],
        {x:0.6,y:6.8,w:12.13,h:0.3,fontFace:PFONT,fontSize:10,margin:0});
      s.addText(LEAK_TXT,{x:0.6,y:7.1,w:12.13,h:0.3,fontFace:PFONT,fontSize:9,bold:true,color:'A50D26',margin:0})});
    const A=d=>hid(d)?'비공개':r2(areaNow(d)),PY=d=>hid(d)?'비공개':py(r2(areaNow(d)));
    if(hasChg){
    /* 3. 변경 전/후 비교 */
    s=pptx.addSlide();titleOf(pptx,s,'변경 전 / 후 비교');
    s.addText('변경 전',{x:0.6,y:1.35,w:3,h:0.3,fontFace:PFONT,fontSize:14,bold:true,margin:0});
    drawPlan(pptx,s,BASE,{x:0.6,y:1.7,w:12.13,h:2.45},{maxFont:9,facs:BASE_F});
    s.addText('변경 후',{x:0.6,y:4.3,w:3,h:0.3,fontFace:PFONT,fontSize:14,bold:true,margin:0});
    drawPlan(pptx,s,state.stores,{x:0.6,y:4.65,w:12.13,h:2.45},{changed,maxFont:9});
    /* 4. 면적 변화 요약 */
    const sum=a=>r2(a.filter(d=>!hid(d)).reduce((x,d)=>x+areaNow(d),0));  /* 면적 비공개 공간은 합계에서 뺀다 */
    const before=sum(goneOrChanged),after=sum(state.stores.filter(d=>d.edited)),totB=sum(BASE),totA=sum(state.stores),dd=r2(after-before);
    const rows=goneOrChanged.map(d=>['변경 전',d.name,d.shop_cd||'(미배정)',A(d),PY(d),'']).concat(state.stores.filter(d=>d.edited).map(d=>['변경 후',d.name,d.shop_cd||'(미배정)',A(d),PY(d),d.from||'']));
    const hidNote=BASE.concat(state.stores).some(hid)?' (면적 비공개 매장 제외)':'';
    const pages=Math.max(1,Math.ceil(rows.length/13));
    for(let pg=0;pg<pages;pg++){s=pptx.addSlide();titleOf(pptx,s,'면적 변화 요약'+(pages>1?` (${pg+1}/${pages})`:''));
      if(!rows.length){s.addText('바뀐 매장이 없습니다.',{x:0.6,y:1.6,w:12,h:0.5,fontFace:PFONT,fontSize:16});break}
      const part=rows.slice(pg*13,pg*13+13);
      if(pg===pages-1)part.push(['합계','변경 전 '+before+'㎡ → 변경 후 '+after+'㎡','',`${dd>0?'+':''}${dd}`,`${dd>0?'+':''}${py(dd)}`,`층 전체 매장 ${totB}㎡ → ${totA}㎡${hidNote}`]);
      addTbl(pptx,s,['구분','매장명','매장코드','면적(㎡)','면적(평)','비고(원본 매장)'],part,{colW:[1.1,3.2,1.6,1.3,1.1,3.83],align:['center','left','center','right','right','left']})}
    /* 5. 변경 내역 */
    const logs=state.log.map((g,i)=>[i+1,g.t,g.msg]);const lp=Math.max(1,Math.ceil(logs.length/12));
    for(let pg=0;pg<lp;pg++){s=pptx.addSlide();titleOf(pptx,s,'변경 내역'+(lp>1?` (${pg+1}/${lp})`:''));
      if(!logs.length){s.addText('변경 내역이 없습니다.',{x:0.6,y:1.6,w:12,h:0.5,fontFace:PFONT,fontSize:16});break}
      addTbl(pptx,s,['No','시각','내용'],logs.slice(pg*12,pg*12+12),{colW:[0.6,1.2,10.33],align:['center','center','left'],fontSize:10.5})}
    }
    /* 6. 매장 목록(변경 후) */
    const all=state.stores.slice().sort((a,b)=>a.name.localeCompare(b.name,'ko')).map(d=>[d.name,d.shop_cd||'(미배정)',A(d),PY(d),d.edited?'변경':'']);
    const sp=Math.ceil(all.length/15);
    for(let pg=0;pg<sp;pg++){s=pptx.addSlide();titleOf(pptx,s,(hasChg?'매장 목록(변경 후)':'매장 목록')+(sp>1?` (${pg+1}/${sp})`:''));
      addTbl(pptx,s,['매장명','매장코드','면적(㎡)','면적(평)','변경'],all.slice(pg*15,pg*15+15),{colW:[4.2,2.4,2,2,1.53],align:['left','center','right','right','center'],fontSize:10.5,rowH:0.28})}
    const blob=await pptx.write({outputType:'blob'});
    const safe=(name||(hasChg?'아이디어':'현재')).replace(/[\\/:*?"<>|\s]+/g,'_');
    await download(`${FLOOR_FILE}_${safe}_${stamp()}.pptx`,blob,'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  }catch(e){console.error(e);alert('PowerPoint 파일을 만들지 못했습니다: '+e.message)}
  finally{btns.forEach((b,i)=>{b.disabled=false;b.textContent=lbl[i]})}}
document.getElementById('edPPT').onclick=savePPT;document.getElementById('hdPPT').onclick=savePPT;

/* ----- 4) 외부 연동용 API ----- */
window.FloorplanEditor={version:'20261106',ED,get state(){return state},geomOf,bboxOf,areaOf,rebuild,
  saveHTML,savePPT,exportCSV,exportJSON,loadJSON,undo,redo,pick,rename,delSel,setTool,setAside};
})();
