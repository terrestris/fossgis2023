import{p as Rt,E as pt,T as d,U as Xt,V as Pt,W as zt,X as C,Y as ht,Z as At,_ as Wt,$ as Ot,i as nt,K as _t,a0 as Zt,a1 as J,a2 as tt,a3 as wt,h as q,a4 as Dt,a5 as rt,a6 as Gt,r as lt,g as kt,a7 as jt,a8 as bt,a9 as dt,I as Ft,o as S,aa as Kt,ab as It,j as v,ac as ot,ad as Nt,d as at,ae as Ut,af as N,ag as U,b as Ct,ah as qt,ai as Bt,aj as $t,ak as Ht,k as Qt,al as Vt,am as Jt,c as et,l as te,u as ft,an as ee}from"./Layer.8ccb32f3.js";class ie extends Rt{constructor(t,e,i){super(),i=i||{},this.tileCoord=t,this.state=e,this.interimTile=null,this.key="",this.transition_=i.transition===void 0?250:i.transition,this.transitionStarts_={},this.interpolate=!!i.interpolate}changed(){this.dispatchEvent(pt.CHANGE)}release(){this.state===d.ERROR&&this.setState(d.EMPTY)}getKey(){return this.key+"/"+this.tileCoord}getInterimTile(){if(!this.interimTile)return this;let t=this.interimTile;do{if(t.getState()==d.LOADED)return this.transition_=0,t;t=t.interimTile}while(t);return this}refreshInterimChain(){if(!this.interimTile)return;let t=this.interimTile,e=this;do{if(t.getState()==d.LOADED){t.interimTile=null;break}else t.getState()==d.LOADING?e=t:t.getState()==d.IDLE?e.interimTile=t.interimTile:e=t;t=e.interimTile}while(t)}getTileCoord(){return this.tileCoord}getState(){return this.state}setState(t){if(this.state!==d.ERROR&&this.state>t)throw new Error("Tile load sequence violation");this.state=t,this.changed()}load(){Xt()}getAlpha(t,e){if(!this.transition_)return 1;let i=this.transitionStarts_[t];if(!i)i=e,this.transitionStarts_[t]=i;else if(i===-1)return 1;const s=e-i+1e3/60;return s>=this.transition_?1:Pt(s/this.transition_)}inTransition(t){return this.transition_?this.transitionStarts_[t]!==-1:!1}endTransition(t){this.transition_&&(this.transitionStarts_[t]=-1)}}const Yt=ie,se=.5,ne=10,mt=.25;class re{constructor(t,e,i,s,n,o){this.sourceProj_=t,this.targetProj_=e;let a={};const h=zt(this.targetProj_,this.sourceProj_);this.transformInv_=function(f){const u=f[0]+"/"+f[1];return a[u]||(a[u]=h(f)),a[u]},this.maxSourceExtent_=s,this.errorThresholdSquared_=n*n,this.triangles_=[],this.wrapsXInSource_=!1,this.canWrapXInSource_=this.sourceProj_.canWrapX()&&!!s&&!!this.sourceProj_.getExtent()&&C(s)==C(this.sourceProj_.getExtent()),this.sourceWorldWidth_=this.sourceProj_.getExtent()?C(this.sourceProj_.getExtent()):null,this.targetWorldWidth_=this.targetProj_.getExtent()?C(this.targetProj_.getExtent()):null;const l=ht(i),g=At(i),m=Wt(i),c=Ot(i),p=this.transformInv_(l),x=this.transformInv_(g),T=this.transformInv_(m),X=this.transformInv_(c),E=ne+(o?Math.max(0,Math.ceil(Math.log2(nt(i)/(o*o*256*256)))):0);if(this.addQuad_(l,g,m,c,p,x,T,X,E),this.wrapsXInSource_){let f=1/0;this.triangles_.forEach(function(u,_,F){f=Math.min(f,u.source[0][0],u.source[1][0],u.source[2][0])}),this.triangles_.forEach(u=>{if(Math.max(u.source[0][0],u.source[1][0],u.source[2][0])-f>this.sourceWorldWidth_/2){const _=[[u.source[0][0],u.source[0][1]],[u.source[1][0],u.source[1][1]],[u.source[2][0],u.source[2][1]]];_[0][0]-f>this.sourceWorldWidth_/2&&(_[0][0]-=this.sourceWorldWidth_),_[1][0]-f>this.sourceWorldWidth_/2&&(_[1][0]-=this.sourceWorldWidth_),_[2][0]-f>this.sourceWorldWidth_/2&&(_[2][0]-=this.sourceWorldWidth_);const F=Math.min(_[0][0],_[1][0],_[2][0]);Math.max(_[0][0],_[1][0],_[2][0])-F<this.sourceWorldWidth_/2&&(u.source=_)}})}a={}}addTriangle_(t,e,i,s,n,o){this.triangles_.push({source:[s,n,o],target:[t,e,i]})}addQuad_(t,e,i,s,n,o,a,h,l){const g=_t([n,o,a,h]),m=this.sourceWorldWidth_?C(g)/this.sourceWorldWidth_:null,c=this.sourceWorldWidth_,p=this.sourceProj_.canWrapX()&&m>.5&&m<1;let x=!1;if(l>0){if(this.targetProj_.isGlobal()&&this.targetWorldWidth_){const X=_t([t,e,i,s]);x=C(X)/this.targetWorldWidth_>mt||x}!p&&this.sourceProj_.isGlobal()&&m&&(x=m>mt||x)}if(!x&&this.maxSourceExtent_&&isFinite(g[0])&&isFinite(g[1])&&isFinite(g[2])&&isFinite(g[3])&&!Zt(g,this.maxSourceExtent_))return;let T=0;if(!x&&(!isFinite(n[0])||!isFinite(n[1])||!isFinite(o[0])||!isFinite(o[1])||!isFinite(a[0])||!isFinite(a[1])||!isFinite(h[0])||!isFinite(h[1]))){if(l>0)x=!0;else if(T=(!isFinite(n[0])||!isFinite(n[1])?8:0)+(!isFinite(o[0])||!isFinite(o[1])?4:0)+(!isFinite(a[0])||!isFinite(a[1])?2:0)+(!isFinite(h[0])||!isFinite(h[1])?1:0),T!=1&&T!=2&&T!=4&&T!=8)return}if(l>0){if(!x){const X=[(t[0]+i[0])/2,(t[1]+i[1])/2],E=this.transformInv_(X);let f;p?f=(J(n[0],c)+J(a[0],c))/2-J(E[0],c):f=(n[0]+a[0])/2-E[0];const u=(n[1]+a[1])/2-E[1];x=f*f+u*u>this.errorThresholdSquared_}if(x){if(Math.abs(t[0]-i[0])<=Math.abs(t[1]-i[1])){const X=[(e[0]+i[0])/2,(e[1]+i[1])/2],E=this.transformInv_(X),f=[(s[0]+t[0])/2,(s[1]+t[1])/2],u=this.transformInv_(f);this.addQuad_(t,e,X,f,n,o,E,u,l-1),this.addQuad_(f,X,i,s,u,E,a,h,l-1)}else{const X=[(t[0]+e[0])/2,(t[1]+e[1])/2],E=this.transformInv_(X),f=[(i[0]+s[0])/2,(i[1]+s[1])/2],u=this.transformInv_(f);this.addQuad_(t,X,f,s,n,E,u,h,l-1),this.addQuad_(X,e,i,f,E,o,a,u,l-1)}return}}if(p){if(!this.canWrapXInSource_)return;this.wrapsXInSource_=!0}(T&11)==0&&this.addTriangle_(t,i,s,n,a,h),(T&14)==0&&this.addTriangle_(t,i,e,n,a,o),T&&((T&13)==0&&this.addTriangle_(e,s,t,o,h,n),(T&7)==0&&this.addTriangle_(e,s,i,o,h,a))}calculateSourceExtent(){const t=wt();return this.triangles_.forEach(function(e,i,s){const n=e.source;tt(t,n[0]),tt(t,n[1]),tt(t,n[2])}),t}getTriangles(){return this.triangles_}}const oe=re;let it;const Z=[];function Tt(r,t,e,i,s){r.beginPath(),r.moveTo(0,0),r.lineTo(t,e),r.lineTo(i,s),r.closePath(),r.save(),r.clip(),r.fillRect(0,0,Math.max(t,i)+1,Math.max(e,s)),r.restore()}function st(r,t){return Math.abs(r[t*4]-210)>2||Math.abs(r[t*4+3]-.75*255)>2}function ae(){if(it===void 0){const r=q(6,6,Z);r.globalCompositeOperation="lighter",r.fillStyle="rgba(210, 0, 0, 0.75)",Tt(r,4,5,4,0),Tt(r,4,5,0,5);const t=r.getImageData(0,0,3,3).data;it=st(t,0)||st(t,4)||st(t,8),lt(r),Z.push(r.canvas)}return it}function xt(r,t,e,i){const s=bt(e,t,r);let n=dt(t,i,e);const o=t.getMetersPerUnit();o!==void 0&&(n*=o);const a=r.getMetersPerUnit();a!==void 0&&(n/=a);const h=r.getExtent();if(!h||Ft(h,s)){const l=dt(r,n,s)/n;isFinite(l)&&l>0&&(n/=l)}return n}function he(r,t,e,i){const s=kt(e);let n=xt(r,t,s,i);return(!isFinite(n)||n<=0)&&jt(e,function(o){return n=xt(r,t,o,i),isFinite(n)&&n>0}),n}function le(r,t,e,i,s,n,o,a,h,l,g,m){const c=q(Math.round(e*r),Math.round(e*t),Z);if(m||(c.imageSmoothingEnabled=!1),h.length===0)return c.canvas;c.scale(e,e);function p(_){return Math.round(_*e)/e}c.globalCompositeOperation="lighter";const x=wt();h.forEach(function(_,F,Y){Dt(x,_.extent)});const T=C(x),X=rt(x),E=q(Math.round(e*T/i),Math.round(e*X/i),Z);m||(E.imageSmoothingEnabled=!1);const f=e/i;h.forEach(function(_,F,Y){const w=_.extent[0]-x[0],I=-(_.extent[3]-x[3]),y=C(_.extent),R=rt(_.extent);_.image.width>0&&_.image.height>0&&E.drawImage(_.image,l,l,_.image.width-2*l,_.image.height-2*l,w*f,I*f,y*f,R*f)});const u=ht(o);return a.getTriangles().forEach(function(_,F,Y){const w=_.source,I=_.target;let y=w[0][0],R=w[0][1],D=w[1][0],G=w[1][1],k=w[2][0],B=w[2][1];const j=p((I[0][0]-u[0])/n),b=p(-(I[0][1]-u[1])/n),P=p((I[1][0]-u[0])/n),z=p(-(I[1][1]-u[1])/n),$=p((I[2][0]-u[0])/n),H=p(-(I[2][1]-u[1])/n),Q=y,V=R;y=0,R=0,D-=Q,G-=V,k-=Q,B-=V;const Lt=[[D,G,0,0,P-j],[k,B,0,0,$-j],[0,0,D,G,z-b],[0,0,k,B,H-b]],K=Gt(Lt);if(!!K){if(c.save(),c.beginPath(),ae()||!m){c.moveTo(P,z);const A=4,ct=j-P,gt=b-z;for(let L=0;L<A;L++)c.lineTo(P+p((L+1)*ct/A),z+p(L*gt/(A-1))),L!=A-1&&c.lineTo(P+p((L+1)*ct/A),z+p((L+1)*gt/(A-1)));c.lineTo($,H)}else c.moveTo(P,z),c.lineTo(j,b),c.lineTo($,H);c.clip(),c.transform(K[0],K[2],K[1],K[3],j,b),c.translate(x[0]-Q,x[3]-V),c.scale(i/e,-i/e),c.drawImage(E.canvas,0,0),c.restore()}}),lt(E),Z.push(E.canvas),g&&(c.save(),c.globalCompositeOperation="source-over",c.strokeStyle="black",c.lineWidth=1,a.getTriangles().forEach(function(_,F,Y){const w=_.target,I=(w[0][0]-u[0])/n,y=-(w[0][1]-u[1])/n,R=(w[1][0]-u[0])/n,D=-(w[1][1]-u[1])/n,G=(w[2][0]-u[0])/n,k=-(w[2][1]-u[1])/n;c.beginPath(),c.moveTo(R,D),c.lineTo(I,y),c.lineTo(G,k),c.closePath(),c.stroke()}),c.restore()),c.canvas}class ue{constructor(t){this.highWaterMark=t!==void 0?t:2048,this.count_=0,this.entries_={},this.oldest_=null,this.newest_=null}canExpireCache(){return this.highWaterMark>0&&this.getCount()>this.highWaterMark}expireCache(t){for(;this.canExpireCache();)this.pop()}clear(){this.count_=0,this.entries_={},this.oldest_=null,this.newest_=null}containsKey(t){return this.entries_.hasOwnProperty(t)}forEach(t){let e=this.oldest_;for(;e;)t(e.value_,e.key_,this),e=e.newer}get(t,e){const i=this.entries_[t];return S(i!==void 0,15),i===this.newest_||(i===this.oldest_?(this.oldest_=this.oldest_.newer,this.oldest_.older=null):(i.newer.older=i.older,i.older.newer=i.newer),i.newer=null,i.older=this.newest_,this.newest_.newer=i,this.newest_=i),i.value_}remove(t){const e=this.entries_[t];return S(e!==void 0,15),e===this.newest_?(this.newest_=e.older,this.newest_&&(this.newest_.newer=null)):e===this.oldest_?(this.oldest_=e.newer,this.oldest_&&(this.oldest_.older=null)):(e.newer.older=e.older,e.older.newer=e.newer),delete this.entries_[t],--this.count_,e.value_}getCount(){return this.count_}getKeys(){const t=new Array(this.count_);let e=0,i;for(i=this.newest_;i;i=i.older)t[e++]=i.key_;return t}getValues(){const t=new Array(this.count_);let e=0,i;for(i=this.newest_;i;i=i.older)t[e++]=i.value_;return t}peekLast(){return this.oldest_.value_}peekLastKey(){return this.oldest_.key_}peekFirstKey(){return this.newest_.key_}peek(t){if(!!this.containsKey(t))return this.entries_[t].value_}pop(){const t=this.oldest_;return delete this.entries_[t.key_],t.newer&&(t.newer.older=null),this.oldest_=t.newer,this.oldest_||(this.newest_=null),--this.count_,t.value_}replace(t,e){this.get(t),this.entries_[t].value_=e}set(t,e){S(!(t in this.entries_),16);const i={key_:t,newer:null,older:this.newest_,value_:e};this.newest_?this.newest_.newer=i:this.oldest_=i,this.newest_=i,this.entries_[t]=i,++this.count_}setSize(t){this.highWaterMark=t}}const ce=ue;function Et(r,t,e,i){return i!==void 0?(i[0]=r,i[1]=t,i[2]=e,i):[r,t,e]}function ut(r,t,e){return r+"/"+t+"/"+e}function ge(r){return ut(r[0],r[1],r[2])}function Se(r){const[t,e,i]=r.substring(r.lastIndexOf("/")+1,r.length).split(",").map(Number);return ut(t,e,i)}function _e(r){return r.split("/").map(Number)}function Me(r){return(r[1]<<r[0])+r[2]}function de(r,t){const e=r[0],i=r[1],s=r[2];if(t.getMinZoom()>e||e>t.getMaxZoom())return!1;const n=t.getFullTileRange(e);return n?n.containsXY(i,s):!0}class fe extends ce{clear(){for(;this.getCount()>0;)this.pop().release();super.clear()}expireCache(t){for(;this.canExpireCache()&&!(this.peekLast().getKey()in t);)this.pop().release()}pruneExceptNewestZ(){if(this.getCount()===0)return;const t=this.peekFirstKey(),i=_e(t)[0];this.forEach(s=>{s.tileCoord[0]!==i&&(this.remove(ge(s.tileCoord)),s.release())})}}const me=fe,ve={TILELOADSTART:"tileloadstart",TILELOADEND:"tileloadend",TILELOADERROR:"tileloaderror"};class yt{constructor(t,e,i,s){this.minX=t,this.maxX=e,this.minY=i,this.maxY=s}contains(t){return this.containsXY(t[1],t[2])}containsTileRange(t){return this.minX<=t.minX&&t.maxX<=this.maxX&&this.minY<=t.minY&&t.maxY<=this.maxY}containsXY(t,e){return this.minX<=t&&t<=this.maxX&&this.minY<=e&&e<=this.maxY}equals(t){return this.minX==t.minX&&this.minY==t.minY&&this.maxX==t.maxX&&this.maxY==t.maxY}extend(t){t.minX<this.minX&&(this.minX=t.minX),t.maxX>this.maxX&&(this.maxX=t.maxX),t.minY<this.minY&&(this.minY=t.minY),t.maxY>this.maxY&&(this.maxY=t.maxY)}getHeight(){return this.maxY-this.minY+1}getSize(){return[this.getWidth(),this.getHeight()]}getWidth(){return this.maxX-this.minX+1}intersects(t){return this.minX<=t.maxX&&this.maxX>=t.minX&&this.minY<=t.maxY&&this.maxY>=t.minY}}function W(r,t,e,i,s){return s!==void 0?(s.minX=r,s.maxX=t,s.minY=e,s.maxY=i,s):new yt(r,t,e,i)}const Te=yt,O=[0,0,0],M=5;class xe{constructor(t){this.minZoom=t.minZoom!==void 0?t.minZoom:0,this.resolutions_=t.resolutions,S(Kt(this.resolutions_,function(s,n){return n-s},!0),17);let e;if(!t.origins){for(let s=0,n=this.resolutions_.length-1;s<n;++s)if(!e)e=this.resolutions_[s]/this.resolutions_[s+1];else if(this.resolutions_[s]/this.resolutions_[s+1]!==e){e=void 0;break}}this.zoomFactor_=e,this.maxZoom=this.resolutions_.length-1,this.origin_=t.origin!==void 0?t.origin:null,this.origins_=null,t.origins!==void 0&&(this.origins_=t.origins,S(this.origins_.length==this.resolutions_.length,20));const i=t.extent;i!==void 0&&!this.origin_&&!this.origins_&&(this.origin_=ht(i)),S(!this.origin_&&this.origins_||this.origin_&&!this.origins_,18),this.tileSizes_=null,t.tileSizes!==void 0&&(this.tileSizes_=t.tileSizes,S(this.tileSizes_.length==this.resolutions_.length,19)),this.tileSize_=t.tileSize!==void 0?t.tileSize:this.tileSizes_?null:It,S(!this.tileSize_&&this.tileSizes_||this.tileSize_&&!this.tileSizes_,22),this.extent_=i!==void 0?i:null,this.fullTileRanges_=null,this.tmpSize_=[0,0],this.tmpExtent_=[0,0,0,0],t.sizes!==void 0?this.fullTileRanges_=t.sizes.map(function(s,n){const o=new Te(Math.min(0,s[0]),Math.max(s[0]-1,-1),Math.min(0,s[1]),Math.max(s[1]-1,-1));if(i){const a=this.getTileRangeForExtentAndZ(i,n);o.minX=Math.max(a.minX,o.minX),o.maxX=Math.min(a.maxX,o.maxX),o.minY=Math.max(a.minY,o.minY),o.maxY=Math.min(a.maxY,o.maxY)}return o},this):i&&this.calculateTileRanges_(i)}forEachTileCoord(t,e,i){const s=this.getTileRangeForExtentAndZ(t,e);for(let n=s.minX,o=s.maxX;n<=o;++n)for(let a=s.minY,h=s.maxY;a<=h;++a)i([e,n,a])}forEachTileCoordParentTileRange(t,e,i,s){let n,o,a,h=null,l=t[0]-1;for(this.zoomFactor_===2?(o=t[1],a=t[2]):h=this.getTileCoordExtent(t,s);l>=this.minZoom;){if(this.zoomFactor_===2?(o=Math.floor(o/2),a=Math.floor(a/2),n=W(o,o,a,a,i)):n=this.getTileRangeForExtentAndZ(h,l,i),e(l,n))return!0;--l}return!1}getExtent(){return this.extent_}getMaxZoom(){return this.maxZoom}getMinZoom(){return this.minZoom}getOrigin(t){return this.origin_?this.origin_:this.origins_[t]}getResolution(t){return this.resolutions_[t]}getResolutions(){return this.resolutions_}getTileCoordChildTileRange(t,e,i){if(t[0]<this.maxZoom){if(this.zoomFactor_===2){const n=t[1]*2,o=t[2]*2;return W(n,n+1,o,o+1,e)}const s=this.getTileCoordExtent(t,i||this.tmpExtent_);return this.getTileRangeForExtentAndZ(s,t[0]+1,e)}return null}getTileRangeForTileCoordAndZ(t,e,i){if(e>this.maxZoom||e<this.minZoom)return null;const s=t[0],n=t[1],o=t[2];if(e===s)return W(n,o,n,o,i);if(this.zoomFactor_){const h=Math.pow(this.zoomFactor_,e-s),l=Math.floor(n*h),g=Math.floor(o*h);if(e<s)return W(l,l,g,g,i);const m=Math.floor(h*(n+1))-1,c=Math.floor(h*(o+1))-1;return W(l,m,g,c,i)}const a=this.getTileCoordExtent(t,this.tmpExtent_);return this.getTileRangeForExtentAndZ(a,e,i)}getTileRangeExtent(t,e,i){const s=this.getOrigin(t),n=this.getResolution(t),o=v(this.getTileSize(t),this.tmpSize_),a=s[0]+e.minX*o[0]*n,h=s[0]+(e.maxX+1)*o[0]*n,l=s[1]+e.minY*o[1]*n,g=s[1]+(e.maxY+1)*o[1]*n;return ot(a,l,h,g,i)}getTileRangeForExtentAndZ(t,e,i){this.getTileCoordForXYAndZ_(t[0],t[3],e,!1,O);const s=O[1],n=O[2];this.getTileCoordForXYAndZ_(t[2],t[1],e,!0,O);const o=O[1],a=O[2];return W(s,o,n,a,i)}getTileCoordCenter(t){const e=this.getOrigin(t[0]),i=this.getResolution(t[0]),s=v(this.getTileSize(t[0]),this.tmpSize_);return[e[0]+(t[1]+.5)*s[0]*i,e[1]-(t[2]+.5)*s[1]*i]}getTileCoordExtent(t,e){const i=this.getOrigin(t[0]),s=this.getResolution(t[0]),n=v(this.getTileSize(t[0]),this.tmpSize_),o=i[0]+t[1]*n[0]*s,a=i[1]-(t[2]+1)*n[1]*s,h=o+n[0]*s,l=a+n[1]*s;return ot(o,a,h,l,e)}getTileCoordForCoordAndResolution(t,e,i){return this.getTileCoordForXYAndResolution_(t[0],t[1],e,!1,i)}getTileCoordForXYAndResolution_(t,e,i,s,n){const o=this.getZForResolution(i),a=i/this.getResolution(o),h=this.getOrigin(o),l=v(this.getTileSize(o),this.tmpSize_);let g=a*(t-h[0])/i/l[0],m=a*(h[1]-e)/i/l[1];return s?(g=N(g,M)-1,m=N(m,M)-1):(g=U(g,M),m=U(m,M)),Et(o,g,m,n)}getTileCoordForXYAndZ_(t,e,i,s,n){const o=this.getOrigin(i),a=this.getResolution(i),h=v(this.getTileSize(i),this.tmpSize_);let l=(t-o[0])/a/h[0],g=(o[1]-e)/a/h[1];return s?(l=N(l,M)-1,g=N(g,M)-1):(l=U(l,M),g=U(g,M)),Et(i,l,g,n)}getTileCoordForCoordAndZ(t,e,i){return this.getTileCoordForXYAndZ_(t[0],t[1],e,!1,i)}getTileCoordResolution(t){return this.resolutions_[t[0]]}getTileSize(t){return this.tileSize_?this.tileSize_:this.tileSizes_[t]}getFullTileRange(t){return this.fullTileRanges_?this.fullTileRanges_[t]:this.extent_?this.getTileRangeForExtentAndZ(this.extent_,t):null}getZForResolution(t,e){const i=Nt(this.resolutions_,t,e||0);return at(i,this.minZoom,this.maxZoom)}tileCoordIntersectsViewport(t,e){return Ut(e,0,e.length,2,this.getTileCoordExtent(t))}calculateTileRanges_(t){const e=this.resolutions_.length,i=new Array(e);for(let s=this.minZoom;s<e;++s)i[s]=this.getTileRangeForExtentAndZ(t,s);this.fullTileRanges_=i}}const St=xe;function Ee(r){let t=r.getDefaultTileGrid();return t||(t=we(r),r.setDefaultTileGrid(t)),t}function pe(r,t,e){const i=t[0],s=r.getTileCoordCenter(t),n=vt(e);if(!Ft(n,s)){const o=C(n),a=Math.ceil((n[0]-s[0])/o);return s[0]+=o*a,r.getTileCoordForCoordAndZ(s,i)}return t}function Xe(r,t,e,i){i=i!==void 0?i:"top-left";const s=Mt(r,t,e);return new St({extent:r,origin:Bt(r,i),resolutions:s,tileSize:e})}function Le(r){const t=r||{},e=t.extent||Ct("EPSG:3857").getExtent(),i={extent:e,minZoom:t.minZoom,tileSize:t.tileSize,resolutions:Mt(e,t.maxZoom,t.tileSize,t.maxResolution)};return new St(i)}function Mt(r,t,e,i){t=t!==void 0?t:$t,e=v(e!==void 0?e:It);const s=rt(r),n=C(r);i=i>0?i:Math.max(n/e[0],s/e[1]);const o=t+1,a=new Array(o);for(let h=0;h<o;++h)a[h]=i/Math.pow(2,h);return a}function we(r,t,e,i){const s=vt(r);return Xe(s,t,e,i)}function vt(r){r=Ct(r);let t=r.getExtent();if(!t){const e=180*qt.degrees/r.getMetersPerUnit();t=ot(-e,-e,e,e)}return t}class Fe extends Ht{constructor(t){super({attributions:t.attributions,attributionsCollapsible:t.attributionsCollapsible,projection:t.projection,state:t.state,wrapX:t.wrapX,interpolate:t.interpolate}),this.on,this.once,this.un,this.opaque_=t.opaque!==void 0?t.opaque:!1,this.tilePixelRatio_=t.tilePixelRatio!==void 0?t.tilePixelRatio:1,this.tileGrid=t.tileGrid!==void 0?t.tileGrid:null;const e=[256,256];this.tileGrid&&v(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()),e),this.tileCache=new me(t.cacheSize||0),this.tmpSize=[0,0],this.key_=t.key||"",this.tileOptions={transition:t.transition,interpolate:t.interpolate},this.zDirection=t.zDirection?t.zDirection:0}canExpireCache(){return this.tileCache.canExpireCache()}expireCache(t,e){const i=this.getTileCacheForProjection(t);i&&i.expireCache(e)}forEachLoadedTile(t,e,i,s){const n=this.getTileCacheForProjection(t);if(!n)return!1;let o=!0,a,h,l;for(let g=i.minX;g<=i.maxX;++g)for(let m=i.minY;m<=i.maxY;++m)h=ut(e,g,m),l=!1,n.containsKey(h)&&(a=n.get(h),l=a.getState()===d.LOADED,l&&(l=s(a)!==!1)),l||(o=!1);return o}getGutterForProjection(t){return 0}getKey(){return this.key_}setKey(t){this.key_!==t&&(this.key_=t,this.changed())}getOpaque(t){return this.opaque_}getResolutions(t){const e=t?this.getTileGridForProjection(t):this.tileGrid;return e?e.getResolutions():null}getTile(t,e,i,s,n){return Xt()}getTileGrid(){return this.tileGrid}getTileGridForProjection(t){return this.tileGrid?this.tileGrid:Ee(t)}getTileCacheForProjection(t){const e=this.getProjection();return S(e===null||Qt(e,t),68),this.tileCache}getTilePixelRatio(t){return this.tilePixelRatio_}getTilePixelSize(t,e,i){const s=this.getTileGridForProjection(i),n=this.getTilePixelRatio(e),o=v(s.getTileSize(t),this.tmpSize);return n==1?o:Vt(o,n,this.tmpSize)}getTileCoordForTileUrlFunction(t,e){e=e!==void 0?e:this.getProjection();const i=this.getTileGridForProjection(e);return this.getWrapX()&&e.isGlobal()&&(t=pe(i,t,e)),de(t,i)?t:null}clear(){this.tileCache.clear()}refresh(){this.clear(),super.refresh()}updateCacheSize(t,e){const i=this.getTileCacheForProjection(e);t>i.highWaterMark&&(i.highWaterMark=t)}useTile(t,e,i,s){}}class Re extends Jt{constructor(t,e){super(t),this.tile=e}}const Pe=Fe,ze={PRELOAD:"preload",USE_INTERIM_TILES_ON_ERROR:"useInterimTilesOnError"};class Ie extends Yt{constructor(t,e,i,s,n,o,a,h,l,g,m,c){super(n,d.IDLE,{interpolate:!!c}),this.renderEdges_=m!==void 0?m:!1,this.pixelRatio_=a,this.gutter_=h,this.canvas_=null,this.sourceTileGrid_=e,this.targetTileGrid_=s,this.wrappedTileCoord_=o||n,this.sourceTiles_=[],this.sourcesListenerKeys_=null,this.sourceZ_=0;const p=s.getTileCoordExtent(this.wrappedTileCoord_),x=this.targetTileGrid_.getExtent();let T=this.sourceTileGrid_.getExtent();const X=x?et(p,x):p;if(nt(X)===0){this.state=d.EMPTY;return}const E=t.getExtent();E&&(T?T=et(T,E):T=E);const f=s.getResolution(this.wrappedTileCoord_[0]),u=he(t,i,X,f);if(!isFinite(u)||u<=0){this.state=d.EMPTY;return}const _=g!==void 0?g:se;if(this.triangulation_=new oe(t,i,X,T,u*_,f),this.triangulation_.getTriangles().length===0){this.state=d.EMPTY;return}this.sourceZ_=e.getZForResolution(u);let F=this.triangulation_.calculateSourceExtent();if(T&&(t.canWrapX()?(F[1]=at(F[1],T[1],T[3]),F[3]=at(F[3],T[1],T[3])):F=et(F,T)),!nt(F))this.state=d.EMPTY;else{const Y=e.getTileRangeForExtentAndZ(F,this.sourceZ_);for(let w=Y.minX;w<=Y.maxX;w++)for(let I=Y.minY;I<=Y.maxY;I++){const y=l(this.sourceZ_,w,I,a);y&&this.sourceTiles_.push(y)}this.sourceTiles_.length===0&&(this.state=d.EMPTY)}}getImage(){return this.canvas_}reproject_(){const t=[];if(this.sourceTiles_.forEach(e=>{e&&e.getState()==d.LOADED&&t.push({extent:this.sourceTileGrid_.getTileCoordExtent(e.tileCoord),image:e.getImage()})}),this.sourceTiles_.length=0,t.length===0)this.state=d.ERROR;else{const e=this.wrappedTileCoord_[0],i=this.targetTileGrid_.getTileSize(e),s=typeof i=="number"?i:i[0],n=typeof i=="number"?i:i[1],o=this.targetTileGrid_.getResolution(e),a=this.sourceTileGrid_.getResolution(this.sourceZ_),h=this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);this.canvas_=le(s,n,this.pixelRatio_,a,this.sourceTileGrid_.getExtent(),o,h,this.triangulation_,t,this.gutter_,this.renderEdges_,this.interpolate),this.state=d.LOADED}this.changed()}load(){if(this.state==d.IDLE){this.state=d.LOADING,this.changed();let t=0;this.sourcesListenerKeys_=[],this.sourceTiles_.forEach(e=>{const i=e.getState();if(i==d.IDLE||i==d.LOADING){t++;const s=te(e,pt.CHANGE,function(n){const o=e.getState();(o==d.LOADED||o==d.ERROR||o==d.EMPTY)&&(ft(s),t--,t===0&&(this.unlistenSources_(),this.reproject_()))},this);this.sourcesListenerKeys_.push(s)}}),t===0?setTimeout(this.reproject_.bind(this),0):this.sourceTiles_.forEach(function(e,i,s){e.getState()==d.IDLE&&e.load()})}}unlistenSources_(){this.sourcesListenerKeys_.forEach(ft),this.sourcesListenerKeys_=null}release(){this.canvas_&&(lt(this.canvas_.getContext("2d")),Z.push(this.canvas_),this.canvas_=null),super.release()}}const Ae=Ie;class Ce extends Yt{constructor(t,e,i,s,n,o){super(t,e,o),this.crossOrigin_=s,this.src_=i,this.key=i,this.image_=new Image,s!==null&&(this.image_.crossOrigin=s),this.unlisten_=null,this.tileLoadFunction_=n}getImage(){return this.image_}setImage(t){this.image_=t,this.state=d.LOADED,this.unlistenImage_(),this.changed()}handleImageError_(){this.state=d.ERROR,this.unlistenImage_(),this.image_=Ye(),this.changed()}handleImageLoad_(){const t=this.image_;t.naturalWidth&&t.naturalHeight?this.state=d.LOADED:this.state=d.EMPTY,this.unlistenImage_(),this.changed()}load(){this.state==d.ERROR&&(this.state=d.IDLE,this.image_=new Image,this.crossOrigin_!==null&&(this.image_.crossOrigin=this.crossOrigin_)),this.state==d.IDLE&&(this.state=d.LOADING,this.changed(),this.tileLoadFunction_(this,this.src_),this.unlisten_=ee(this.image_,this.handleImageLoad_.bind(this),this.handleImageError_.bind(this)))}unlistenImage_(){this.unlisten_&&(this.unlisten_(),this.unlisten_=null)}}function Ye(){const r=q(1,1);return r.fillStyle="rgba(0,0,0,0)",r.fillRect(0,0,1,1),r.canvas}const We=Ce;export{se as E,We as I,ce as L,Ae as R,St as T,Yt as a,he as b,Z as c,oe as d,Pe as e,Le as f,vt as g,Re as h,Ee as i,me as j,ut as k,ve as l,ze as m,Te as n,Et as o,ge as p,Me as q,le as r,_e as s,Se as t};