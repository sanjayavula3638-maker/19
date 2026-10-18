const $=i=>document.getElementById(i),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let W,H,dp=Math.min(devicePixelRatio||1,2),K=RM?.35:innerWidth<700?.6:1,tf=RM?.4:1,gap=RM?500:2500;
const rnd=(a,b)=>a+Math.random()*(b-a),cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),ez=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,bk=p=>1+2.70158*Math.pow(p-1,3)+1.70158*Math.pow(p-1,2);
const fx=$('fx'),c=fx.getContext('2d'),sc=$('sc'),s2=sc.getContext('2d'),tc=$('tree'),tg=tc.getContext('2d');
function rs(){W=innerWidth;H=innerHeight;[fx,sc,tc].forEach(e=>{e.width=W*dp;e.height=H*dp});[c,s2,tg].forEach(g=>g.setTransform(dp,0,0,dp,0,0))}rs();addEventListener('resize',rs);
function hp(g,x,y,s){g.beginPath();g.moveTo(x,y+s*.3);g.bezierCurveTo(x,y-s*.1,x-s*.6,y-s*.1,x-s*.6,y+s*.3);g.bezierCurveTo(x-s*.6,y+s*.7,x,y+s*.9,x,y+s*1.1);g.bezierCurveTo(x,y+s*.9,x+s*.6,y+s*.7,x+s*.6,y+s*.3);g.bezierCurveTo(x+s*.6,y-s*.1,x,y-s*.1,x,y+s*.3);g.closePath()}
function mkH(col,b){const o=document.createElement('canvas');o.width=o.height=64;const g=o.getContext('2d');g.shadowColor=col;g.shadowBlur=b?22:9;g.globalAlpha=b?.55:1;const r=g.createRadialGradient(26,22,2,32,32,30);r.addColorStop(0,'#fff');r.addColorStop(.4,col);r.addColorStop(1,col);g.fillStyle=r;hp(g,32,15,34);g.fill();return o}
function mkD(col){const o=document.createElement('canvas');o.width=o.height=32;const g=o.getContext('2d'),r=g.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,'#fff');r.addColorStop(.25,col);r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(0,0,32,32);return o}
const HC=['#ff5c8a','#ff9ab8','#ffffff','#f6b8c6','#ff2e6e','#e8a8e0'],HS=HC.map(x=>mkH(x)),HB=['#ffb3c6','#ffffff','#ff7aa8'].map(x=>mkH(x,1)),DS=HC.map(mkD);
const PET=(()=>{const o=document.createElement('canvas');o.width=o.height=20;const g=o.getContext('2d');g.fillStyle='#ffc2d6';g.beginPath();g.ellipse(10,10,8,4,.6,0,6.3);g.fill();return o})();
let P=[],amb=[],pet=[],fall=[],stars=[],petOn=false,fallOn=false,sa=1,saT=1,arrow=null,aim=null,cur=1;
for(let i=0;i<Math.round(260*K);i++)stars.push({x:rnd(0,1),y:rnd(0,1),p:rnd(0,6),l:i%3,c:['#ffffff','#cfe0ff','#ffe6cf','#ffd0e8'][i%4],b:i%23===0});const ct0=performance.now();
for(let i=0;i<Math.round(32*K);i++)amb.push({x:rnd(0,1),y:rnd(0,1),v:rnd(6,20),s:rnd(3,7),sp:DS[i%6],p:rnd(0,6)});
for(let i=0;i<Math.round(16*K);i++)pet.push({x:rnd(0,1),y:rnd(-1,0),v:rnd(25,50),p:rnd(0,6),r:rnd(0,6),s:rnd(.7,1.3)});
function pt(o){P.push(Object.assign({life:0,max:2,fr:1,g:0,s:10,tw:rnd(0,6)},o))}
function hb(x,y,n,m){const sc_=Math.min(W,H)*.07*m;for(let i=0;i<n;i++){const t=rnd(0,6.283),r=Math.random()<.4?1:rnd(.15,1),hx=16*Math.pow(Math.sin(t),3),hy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)),k=r*sc_*rnd(.92,1.05),h=Math.random()<.35;pt({x,y,vx:hx*k,vy:hy*k,fr:.94,max:rnd(2.2,3.6),s:h?rnd(5,9):rnd(3,6),sp:h?HS[i%6]:DS[i%6]})}}
function seekTo(x,y,tx,ty,n,cb){let d=0;for(let i=0;i<n;i++){const a=rnd(0,6.283);pt({x,y,s:rnd(4,9),sp:i%3?DS[i%6]:HS[i%6],seek:{sx:x+Math.cos(a)*30,sy:y+Math.sin(a)*30,tx:tx+rnd(-6,6),ty:ty+rnd(-6,6),t:-rnd(0,.7),d:rnd(1.8,2.6),ox:rnd(-W*.25,W*.25),oy:rnd(-H*.3,0),cb:()=>{if(++d>=n)cb&&cb()}}})}}
function bowC(){const r=$('bow').getBoundingClientRect();return{x:r.left+27,y:r.top+65}}
function drawArrow(x,y,a,g){c.save();c.translate(x,y);c.rotate(a);c.strokeStyle='#e8b0a8';c.lineWidth=3;c.shadowColor='#ff8fb0';c.shadowBlur=10;c.beginPath();c.moveTo(-70,0);c.lineTo(0,0);c.stroke();c.fillStyle='#fff';c.beginPath();c.moveTo(12,0);c.lineTo(-3,-6);c.lineTo(-3,6);c.fill();c.fillStyle='#ff7aa8';c.beginPath();c.moveTo(-70,0);c.lineTo(-80,-7);c.lineTo(-62,0);c.lineTo(-80,7);c.fill();c.restore()}
let last=performance.now();
function loop(now){const dt=Math.min((now-last)/1000,.05);last=now;
 s2.clearRect(0,0,W,H);drawSpace(now,dt);
 c.clearRect(0,0,W,H);skyFx(now,dt);s2.globalAlpha=1;
 for(const a of amb){a.y-=a.v*dt/H;if(a.y<-.02){a.y=1.02;a.x=rnd(0,1)}c.globalAlpha=.3+.25*Math.sin(now/1200+a.p);c.drawImage(a.sp,a.x*W+Math.sin(now/2000+a.p)*12-a.s,a.y*H-a.s,a.s*2,a.s*2)}
 if(petOn)for(const p of pet){p.y+=p.v*dt/H;p.r+=dt;if(p.y>1){p.y=-.03;p.x=rnd(0,1)}c.globalAlpha=.8;c.save();c.translate(p.x*W+Math.sin(now/1500+p.p)*30,p.y*H);c.rotate(p.r);c.scale(p.s,p.s);c.drawImage(PET,-10,-10);c.restore()}
 for(let i=P.length-1;i>=0;i--){const p=P[i];let al;
  if(p.seek){const q=p.seek;q.t+=dt;if(q.t<0)continue;const e=ez(cl(q.t/q.d)),w=Math.sin(e*3.14);p.x=q.sx+(q.tx-q.sx)*e+w*q.ox;p.y=q.sy+(q.ty-q.sy)*e+w*q.oy;if(q.t>=q.d){P.splice(i,1);q.cb&&q.cb();continue}al=.5+.5*Math.sin(now/90+p.tw)}
  else{p.life+=dt;if(p.life>p.max){P.splice(i,1);continue}p.vy+=p.g*dt;const f=Math.pow(p.fr,dt*60);p.vx*=f;p.vy*=f;p.x+=p.vx*dt;p.y+=p.vy*dt;al=(1-p.life/p.max)*(.65+.35*Math.sin(p.life*16+p.tw))}
  c.globalAlpha=cl(al);c.drawImage(p.sp,p.x-p.s,p.y-p.s,p.s*2,p.s*2)}
 if(fallOn)for(const f of fall){f.y+=f.v*dt;if(f.y>H+70){f.y=-70;f.x=rnd(0,W)}c.globalAlpha=f.a;c.drawImage(f.sp,f.x+Math.sin(f.y/70+f.p)*f.sw-f.s,f.y-f.s,f.s*2,f.s*2)}
 c.globalAlpha=1;
 if(aim&&!arrow){const o=bowC(),a=Math.atan2(aim.y-o.y,aim.x-o.x),d=Math.hypot(aim.x-o.x,aim.y-o.y),pw=cl(d/260,.15,1),px=o.x-Math.cos(a)*pw*34,py=o.y-Math.sin(a)*pw*34;
  c.setLineDash([3,9]);c.strokeStyle='rgba(255,170,200,.7)';c.lineWidth=2;c.beginPath();c.moveTo(o.x,o.y);c.lineTo(o.x+Math.cos(a)*Math.min(W,H)*.8,o.y+Math.sin(a)*Math.min(W,H)*.8);c.stroke();c.setLineDash([]);
  const cs=Math.cos(a),sn=Math.sin(a),T=[[-1,-59],[-1,59]].map(([u,v])=>[o.x+u*cs-v*sn,o.y+u*sn+v*cs]);c.strokeStyle='#fff';c.lineWidth=1.3;c.beginPath();c.moveTo(T[0][0],T[0][1]);c.lineTo(px,py);c.lineTo(T[1][0],T[1][1]);c.stroke();drawArrow(px+Math.cos(a)*80,py+Math.sin(a)*80,a)}
 if(arrow&&!arrow.stuck){const sp=arrow.v*dt;arrow.x+=arrow.dx*sp;arrow.y+=arrow.dy*sp;pt({x:arrow.x-arrow.dx*40,y:arrow.y-arrow.dy*40,vx:rnd(-20,20),vy:rnd(-20,20),max:.6,s:rnd(3,6),sp:DS[i3()]});
  const e=$('heart').getBoundingClientRect();if(Math.hypot(arrow.x-(e.left+e.width/2),arrow.y-(e.top+e.height*.45))<e.width*.4){arrow.stuck=true;hit(e.left+e.width/2,e.top+e.height*.45)}
  else if(arrow.x>W+120||arrow.y<-120||arrow.y>H+120||arrow.x<-120){arrow=null;$('ht').textContent='So close, try once more 💗'}}
 if(cur===1&&!aim&&!arrow){const o=bowC(),e=$('heart').getBoundingClientRect(),a=Math.atan2(e.top+e.height/2-o.y,e.left+e.width/2-o.x);$('bow').style.setProperty('--r',a+'rad');drawArrow(o.x+Math.cos(a)*75,o.y+Math.sin(a)*75,a)}
 if(arrow)drawArrow(arrow.x,arrow.y,arrow.a);
 if(cur===2||cur===3)drawTree(now);
 requestAnimationFrame(loop)}
const i3=()=>Math.floor(rnd(0,6));
let MW=null,SS=[],ns=0;
function mkMW(){const w=Math.round(W*.65),h=Math.round(H*.65);MW=document.createElement('canvas');MW.width=w;MW.height=h;MW.k=W;const g=MW.getContext('2d');g.translate(w/2,h/2);g.rotate(-.5);const L=Math.hypot(w,h),B=h*.28,gr=g.createLinearGradient(0,-B,0,B);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,'rgba(190,120,230,.22)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(-L,-B,2*L,2*B);
 for(let i=0;i<26;i++){const x=rnd(-L/2,L/2),y=rnd(-B*.5,B*.5),r=rnd(B*.3,B*.8),rg=g.createRadialGradient(x,y,0,x,y,r);rg.addColorStop(0,`rgba(${['255,110,170','160,90,255','255,160,200'][i%3]},.12)`);rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(x-r,y-r,2*r,2*r)}
 for(let i=0;i<1400;i++){const x=rnd(-L/2,L/2),y=(Math.random()+Math.random()+Math.random()-1.5)*B*.9;g.fillStyle=`rgba(255,235,245,${rnd(.1,.55)})`;g.fillRect(x,y,rnd(.6,1.4),rnd(.6,1.4))}}
function drawSpace(now,dt){if(!MW||MW.k!==W)mkMW();const t=now/1000,m=RM?0:1;s2.globalAlpha=.9;s2.drawImage(MW,-W*.15+Math.sin(t/9)*28*m,-H*.15+Math.cos(t/11)*20*m,W*1.3,H*1.3);
 for(const s of stars){const sp=[3,7,14][s.l]*m,x=((s.x*W+t*sp)%W+W)%W,y=(((s.y*H-t*sp*.35)%H)+H)%H,sz=[.8,1.2,1.8][s.l];s2.globalAlpha=.35+.65*Math.abs(Math.sin(t*(.6+s.l*.4)+s.p));s2.fillStyle=s.c;s2.fillRect(x,y,sz,sz);if(s.b){s2.globalAlpha*=.8;s2.drawImage(DS[2],x-7,y-7,14,14)}}
 const u=Math.min(W,H)*.0225,cx=W/2,cy=H*.5+u*1.5,N=36,pr=cl((now-ct0)/5000)*N,ca=cur===1?1:.4,pts=[];for(let i=0;i<N;i++){const a=i/N*6.283;pts.push([cx+16*Math.pow(Math.sin(a),3)*u,cy-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*u])}
 s2.strokeStyle='#ffb3d1';s2.lineWidth=1;s2.beginPath();for(let i=0;i<Math.min(pr,N);i++){const p=pts[i],q=pts[(i+1)%N];s2.moveTo(p[0],p[1]);s2.lineTo(q[0],q[1])}s2.globalAlpha=.22*ca;s2.stroke();
 for(let i=0;i<Math.min(pr,N);i++){const p=pts[i],z=i%4?12:22;s2.globalAlpha=ca*(.55+.45*Math.sin(t*1.6+i));s2.drawImage(DS[i%2?1:2],p[0]-z/2,p[1]-z/2,z,z)}
 if(now>ns){ns=now+rnd(4000,9000);SS.push({x:rnd(.1,.9)*W,y:rnd(0,.35)*H,vx:rnd(500,800),vy:rnd(180,320),l:0})}
 for(let i=SS.length-1;i>=0;i--){const q=SS[i];q.l+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.l>1){SS.splice(i,1);continue}const g=s2.createLinearGradient(q.x,q.y,q.x-q.vx*.12,q.y-q.vy*.12);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');s2.globalAlpha=1-q.l;s2.strokeStyle=g;s2.lineWidth=1.6;s2.beginPath();s2.moveTo(q.x,q.y);s2.lineTo(q.x-q.vx*.12,q.y-q.vy*.12);s2.stroke()}s2.globalAlpha=1}
/* page 1 */
const p1=$('p1');
p1.addEventListener('pointerdown',e=>{if(cur===1&&!arrow){aim={x:e.clientX,y:e.clientY};rot()}});
p1.addEventListener('pointermove',e=>{if(aim){aim={x:e.clientX,y:e.clientY};rot()}});
function rot(){const o=bowC();$('bow').style.setProperty('--r',Math.atan2(aim.y-o.y,aim.x-o.x)+'rad')}
addEventListener('pointerup',()=>{if(!aim||cur!==1)return;const o=bowC(),a=Math.atan2(aim.y-o.y,aim.x-o.x),d=Math.hypot(aim.x-o.x,aim.y-o.y),pw=cl(d/260,.15,1);aim=null;if(d<35){return}
 arrow={x:o.x+Math.cos(a)*80,y:o.y+Math.sin(a)*80,dx:Math.cos(a),dy:Math.sin(a),a,v:1000+pw*900,stuck:false};$('bow').classList.remove('rec');void $('bow').offsetWidth;$('bow').classList.add('rec');$('ht').textContent=''});
function hit(x,y){$('heart').classList.add('pop');hb(x,y,Math.round(260*K),.8);for(let i=0;i<Math.round(20*K);i++)pt({x,y,vx:rnd(-200,200),vy:rnd(-300,-60),g:-40,max:2.4,s:rnd(8,14),sp:HB[i%3]});
 setTimeout(()=>{arrow=null;seekTo(x,y,W/2,H*.9,Math.round(150*K),()=>{treeGo=performance.now()})},500);setTimeout(()=>go(2),1100)}
/* tree */
let segs=null,hearts,leaves,total,tf0=null,treeGo=null,moved=false,fit=1;
function build(){segs=[];hearts=[];leaves=[];const k=Math.min(H,W*1.3),by=H*.9;
 (function g(x,y,a,len,d,wd,t){if(d>8)return;const x2=x+Math.sin(a)*len,y2=y-Math.cos(a)*len,du=(.3+len/k*4.2)*tf;segs.push({x,y,x2,y2,w:wd,t,du,d});
  if(d>=3){const n=Math.max(1,Math.round((d>=6?3:2)*K));for(let i=0;i<n;i++){const f=rnd(.3,1);hearts.push({x:x+(x2-x)*f+rnd(-9,9)*k/700,y:y+(y2-y)*f+rnd(-9,9)*k/700,s:rnd(10,23)*k/650,i:i3(),r:rnd(-.6,.6),bt:t+du*f,ph:rnd(0,6)})}}
  if(d>=5)leaves.push({x:x2,y:y2,r:rnd(0,3)});const nt=t+du;
  g(x2,y2,a-rnd(.28,.55),len*rnd(.74,.8),d+1,wd*.7,nt);g(x2,y2,a+rnd(.28,.55),len*rnd(.74,.8),d+1,wd*.7,nt);if(d>1&&d<6&&Math.random()<.35)g(x2,y2,a+rnd(-.15,.15),len*.7,d+1,wd*.6,nt)})(W/2,by+4,0,k*.2,0,k*.024,0);
 total=Math.max(...segs.map(s=>s.t+s.du))+1.4;let mn=1e9,mx=-1e9,tp=1e9;for(const q of hearts){mn=Math.min(mn,q.x-q.s*1.3);mx=Math.max(mx,q.x+q.s*1.3);tp=Math.min(tp,q.y-q.s*1.3)}for(const s of segs){mn=Math.min(mn,s.x2);mx=Math.max(mx,s.x2);tp=Math.min(tp,s.y2)}
 const hw=Math.max(W/2-mn,mx-W/2);fit=Math.min(1,(W>H?W*.19:W*.45)/hw,(by-80)/(by-tp))}
function drawTree(now){if(!segs)build();tg.setTransform(dp,0,0,dp,0,0);tg.clearRect(0,0,W,H);tg.setTransform(dp*fit,0,0,dp*fit,dp*W/2*(1-fit),dp*H*.9*(1-fit));const t=treeGo?(now-treeGo)/1000:-1,by=H*.9;
 tg.lineCap='round';tg.strokeStyle='#190b2c';for(let d=0;d<=8;d++){tg.lineWidth=Math.max(segs.find(s=>s.d===d).w,1);tg.beginPath();for(const s of segs)if(s.d===d){tg.moveTo(s.x,s.y);tg.lineTo(s.x2,s.y2)}tg.stroke()}
 const la=t<0?1:cl(1-t/(total*.8));if(la>0){tg.fillStyle='#190b2c';tg.globalAlpha=la;for(const l of leaves){tg.beginPath();tg.ellipse(l.x,l.y,5,2.2,l.r,0,6.3);tg.fill()}tg.globalAlpha=1}
 if(t<1.6){const sz=t<0?0:1;tg.globalAlpha=t<0?.6:cl(1.6-t);const r=(10+4*Math.sin(now/200))*(Math.min(H,W)/700);tg.drawImage(HS[1],W/2-r*1.6,by-r*1.6,r*3.2,r*3.2);tg.globalAlpha=1}
 if(t>=0){for(const s of segs){const p=cl((t-s.t)/s.du);if(p<=0)continue;const f=1-cl((t-s.t-s.du)/1.8);if(f<=0)continue;const ex=s.x+(s.x2-s.x)*p,ey=s.y+(s.y2-s.y)*p;tg.strokeStyle=`rgba(255,110,170,${.3*f})`;tg.lineWidth=s.w*2.4+2;tg.beginPath();tg.moveTo(s.x,s.y);tg.lineTo(ex,ey);tg.stroke();tg.strokeStyle=`rgba(255,200,225,${.95*f})`;tg.lineWidth=Math.max(s.w*.5,1.2);tg.stroke();if(p<1){tg.globalAlpha=.9;tg.drawImage(DS[1],ex-8,ey-8,16,16);tg.globalAlpha=1}}
  for(const q of hearts){const p=cl((t-q.bt)/1.4);if(p<=0)continue;const s=q.s*Math.max(bk(p),0)*(1+(p>=1?.07*Math.sin(now/650+q.ph):0));tg.save();tg.translate(q.x,q.y);tg.rotate(q.r);tg.drawImage(HS[q.i],-s,-s,s*2,s*2);tg.restore()}
  if(t>total+1.2&&!moved){moved=true;$('tw').classList.add('moved');setTimeout(()=>{if(cur===2)go(3)},4400)}}}
/* scenes */
const SKY={1:'n',2:'s',3:'s',4:'n',5:'n',6:'r'},ST={n:1,s:1,r:1};let timers=[];
function go(n){cur=n;$('land').classList.toggle('on',n===2||n===3);document.querySelectorAll('.page').forEach(p=>p.classList.toggle('on',p.id==='p'+n));for(const k in ST)$('sk_'+k).classList.toggle('on',k===SKY[n]);saT=ST[SKY[n]];$('tw').classList.toggle('on',n===2||n===3);petOn=n===2||n===3;
 document.querySelectorAll('#dots i').forEach((d,i)=>d.classList.toggle('on',i<n));$('back').style.display=n===4?'block':'none';({3:e3,4:e4,5:e5,6:e6})[n]?.()}
function reveal(el,items,cb,scroll){items.forEach((h,i)=>{const d=document.createElement('div');d.className='rv'+(h[0]==='!'?' big':'');d.innerHTML=h.replace(/^[#!]/,'');if(h[0]==='#'){d.className='rv';d.innerHTML='<h2>'+h.slice(1)+'</h2>'}el.appendChild(d);setTimeout(()=>{d.classList.add('on');if(scroll)el.scrollTop=el.scrollHeight},400+i*gap)});setTimeout(cb,400+items.length*gap+800)}
let e3d=false;function e3(){if(e3d)return;e3d=true;reveal($('msg3'),['#Hey, Beautiful ❤️','You make my ordinary days feel special and my world a little brighter.','Your smile is my favorite view, your happiness means everything to me, and having you in my life is a gift I never want to take for granted.','If I could choose again, in every lifetime, I would still choose you.','You are my favorite person, my sweetest feeling, and my most beautiful story.','And today, I have a little surprise for you…',' nenu edho chedham anukuntuna ra adhi ni expectations ki match avudho ledhooo thelidhu okavela match avaka pothey em anukoku naku unantha lo chesthuna ra nana .........😅 heheh '],()=>$('c3').classList.add('on'),1)}
$('c3').onclick=()=>go(4);$('back').onclick=()=>go(3);
function target(){const n=new Date();if(location.hash==='#preview')return window._pv||(window._pv=new Date(n.getTime()+12000));let t=new Date(n.getFullYear(),9,19,0,0,0);if(n.getMonth()===9&&n.getDate()===19)return n;return n>t?new Date(n.getFullYear()+1,9,19,0,0,0):t}
const pv={};function sn(id,v){if(pv[id]!==v){pv[id]=v;const e=$(id);e.textContent=String(v).padStart(2,'0');e.classList.remove('tk');void e.offsetWidth;e.classList.add('tk')}}
let tgt;function e4(){tgt=target();tick()}
function tick(){if(!tgt)tgt=target();let ms=tgt-new Date();if(ms<=0){if(cur===4)go(5);ms=0}const s=Math.floor(ms/1000);sn('d',Math.floor(s/86400));sn('h',Math.floor(s%86400/3600));sn('m',Math.floor(s%3600/60));sn('s',s%60)}setInterval(tick,250);
let cel=false;function e5(){if(cel)return;cel=true;$('dim').style.opacity=.75;
 setTimeout(()=>{const f=$('flash');f.style.transition='none';f.style.opacity=RM?0:.85;void f.offsetWidth;f.style.transition='opacity 1.8s ease-out';f.style.opacity=0;hb(W/2,H*.45,Math.round(420*K),1);setTimeout(()=>hb(W/2,H*.45,Math.round(160*K),.55),500);$('hb').classList.add('on')},1000);
 setTimeout(()=>{$('dim').style.opacity=0;mkFall()},4200);setTimeout(()=>go(6),8200)}
function mkFall(){if(fall.length)return;const n=Math.round(70*K);for(let i=0;i<n;i++){const z=i%3;fall.push(z===0?{s:rnd(6,10),v:rnd(25,45),a:.55,sp:HS[i%6],sw:12,x:rnd(0,W),y:rnd(-H,0),p:rnd(0,6)}:z===1?{s:rnd(12,18),v:rnd(50,85),a:.8,sp:HS[i%6],sw:25,x:rnd(0,W),y:rnd(-H,0),p:rnd(0,6)}:{s:rnd(30,52),v:rnd(120,170),a:.4,sp:HB[i%3],sw:40,x:rnd(0,W),y:rnd(-H,0),p:rnd(0,6)})}fallOn=true}
let e6d=false;function e6(){mkFall();if(e6d)return;e6d=true;reveal($('wish'),['#Happy Birthday, My Love ❤️','Today is all about you — your beautiful smile, your happiness, your dreams, and the wonderful person you are.','I wish I could give you the whole universe, but for now, let me give you these little pieces of my heart.','May your days be filled with happiness, your dreams become reality, and your smile never fade.','Thank you for being you.','No matter how many birthdays come and go, I hope I get to celebrate many more of them with you.','Today, tomorrow, and always…','!I LOVE YOU, MY BEAUTIFUL GIRL. ❤️','!Happy Birthday, My Forever Love.'],()=>{$('fh').classList.add('on');$('last').classList.add('on')},1)}
let fi;$('last').onclick=()=>{$('fin').classList.add('on');hb(W/2,H/2,Math.round(300*K),.9);fi=setInterval(()=>{if(!$('fin').classList.contains('on'))return clearInterval(fi);hb(W/2,H*.4,Math.round(120*K),.5)},2200)};
$('close').onclick=()=>$('fin').classList.remove('on');$('again').onclick=$('rep').onclick=()=>{location.hash='';location.reload()};
/* music */
let ac,mg,on=false;
function music(){if(ac)return;try{ac=new(window.AudioContext||window.webkitAudioContext)();mg=ac.createGain();mg.gain.value=0;mg.connect(ac.destination);const ch=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]];let i=0;
 const nt=(f,t,v)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.06);g.gain.exponentialRampToValueAtTime(.001,t+2.2);o.connect(g);g.connect(mg);o.start(t);o.stop(t+2.4)};
 setInterval(()=>{const t=ac.currentTime+.05,h=ch[i%4];h.forEach((f,k)=>nt(f*2,t+k*.45,.1));nt(h[0]/2,t,.16);i++},2000);setM(true)}catch(e){}}
function setM(v){on=v;if(mg)mg.gain.linearRampToValueAtTime(v?.5:0,ac.currentTime+.5);$('music').textContent=v?'🔊':'🔇'}
$('music').onclick=e=>{e.stopPropagation();if(!ac)music();else{if(ac.state==='suspended')ac.resume();setM(!on)}};
addEventListener('pointerdown',()=>{if(!ac)music();else if(ac.state==='suspended'&&on)ac.resume()});
(function(){const L=$('land');L.setAttribute('viewBox','0 0 180 100');L.setAttribute('preserveAspectRatio','xMidYMax slice');
const rg=(b,a,s)=>{const p=[];for(let x=-2;x<=182;x+=1.2)p.push([x,b-a*(.5*Math.abs(Math.sin(x*.06+s))+.3*Math.abs(Math.sin(x*.17+s*2))+.2*Math.abs(Math.sin(x*.43+s*3)))]);return p},pl=p=>p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' '),f=rg(64,28,1),m=rg(71,22,4),n=rg(77.5,16,8),mir=n.map(q=>[q[0],155-q[1]]);
let pn='';for(let x=1;x<180;x+=rnd(2,4.2)){const h=rnd(5,10),w=h*.26;for(let k=0;k<3;k++){const y=78-k*h*.26,s=1-k*.28;pn+=`<polygon points='${x-w*s},${y} ${x},${y-h*.55} ${x+w*s},${y}'/>`}}
const gr=(id,a,b,oa=1,ob=1)=>`<linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${a}' stop-opacity='${oa}'/><stop offset='1' stop-color='${b}' stop-opacity='${ob}'/></linearGradient>`;
L.innerHTML=`<defs>${gr('fg','#9a6cc0','#3c2266')}${gr('mg','#5c3c8c','#26124a')}${gr('ng','#2a1556','#100824')}${gr('lg','#ffb0d0','#1a0a38',.28,.8)}<linearGradient id='mi' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.55' stop-color='#ffd6e8' stop-opacity='.2'/><stop offset='1' stop-color='#fff' stop-opacity='0'/></linearGradient></defs><polygon points='${pl(f)} 182,78.5 -2,78.5' fill='url(#fg)' opacity='.9'/><polygon points='${pl(m)} 182,78.5 -2,78.5' fill='url(#mg)'/><rect x='-2' y='62' width='184' height='18' fill='url(#mi)'/><polygon points='${pl(n)} 182,78.5 -2,78.5' fill='url(#ng)'/><g fill='#0d0620'>${pn}</g><rect x='-2' y='78' width='184' height='23' fill='url(#lg)'/><polygon points='${pl(mir)} 182,78 -2,78' fill='rgba(14,6,34,.45)'/><polygon points='-2,94 45,90 90,89 135,90 182,94 182,101 -2,101' fill='#0f0620'/>`})();
let sunA=0,shoot=[],nxt=3;
function refl(x,col,al,r,now,lt){for(let j=0;j<20;j++){const y=lt+4+j*(H*.88-lt)*.05,w=r*(1.7-j*.05)*(.6+.4*Math.sin(now/400+j*1.3)),dx=Math.sin(now/600+j)*r*.4;s2.globalAlpha=al*.5*(1-j/22);s2.fillStyle=`rgb(${col})`;s2.fillRect(x-w/2+dx,y,w,2.2)}}
function skyFx(now,dt){const m=Math.min(W,H),ld=W>H,mx=W*(ld?.82:.76),my=H*(ld?.2:.14),mr=m*(ld?.06:.07),lt=H-22*Math.max(W/180,H/100),cs=m*.16,cx=W*(ld?.2:.26),cy=H*(ld?.22:.2);
 sunA+=((saT<.2?1:0)-sunA)*dt*.8;
 if(sa>.03){s2.save();s2.globalAlpha=sa*.5;s2.translate(W*.3,H*.25);s2.rotate(-.5);let g=s2.createLinearGradient(0,-H*.14,0,H*.14);g.addColorStop(0,'rgba(255,170,220,0)');g.addColorStop(.5,'rgba(255,190,230,.16)');g.addColorStop(1,'rgba(255,170,220,0)');s2.fillStyle=g;s2.fillRect(-W,-H*.14,W*2,H*.28);s2.restore();
  s2.globalAlpha=sa;g=s2.createRadialGradient(mx,my,mr*.6,mx,my,mr*4.5);g.addColorStop(0,'rgba(255,210,235,.55)');g.addColorStop(.3,'rgba(255,150,210,.2)');g.addColorStop(1,'rgba(255,120,200,0)');s2.fillStyle=g;s2.fillRect(mx-mr*5,my-mr*5,mr*10,mr*10);
  g=s2.createRadialGradient(mx-mr*.3,my-mr*.3,mr*.1,mx,my,mr);g.addColorStop(0,'#fffdf8');g.addColorStop(1,'#f6dce6');s2.fillStyle=g;s2.beginPath();s2.arc(mx,my,mr,0,6.3);s2.fill();
  s2.fillStyle='rgba(200,150,175,.22)';[[.3,.2,.28],[-.35,.25,.2],[.05,-.4,.17],[-.1,.45,.13]].forEach(([a,b,r])=>{s2.beginPath();s2.arc(mx+a*mr,my+b*mr,r*mr,0,6.3);s2.fill()});
  const pts=[];for(let i=0;i<14;i++){const t=i/14*6.283;pts.push([cx+16*Math.pow(Math.sin(t),3)*cs/17,cy-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*cs/17])}
  s2.globalAlpha=sa;s2.strokeStyle='rgba(255,180,215,.3)';s2.lineWidth=1;s2.beginPath();pts.forEach((p,i)=>i?s2.lineTo(p[0],p[1]):s2.moveTo(p[0],p[1]));s2.closePath();s2.stroke();
  pts.forEach((p,i)=>{s2.globalAlpha=sa*(.6+.4*Math.sin(now/700+i));const r=i%3?7:11;s2.drawImage(DS[2],p[0]-r,p[1]-r,r*2,r*2)});
  nxt-=dt;if(nxt<0&&sa>.4&&!RM){const n=Math.random()<.25?3:1;for(let k=0;k<n;k++){const sp=rnd(750,1250),a=Math.PI-rnd(.35,.7);shoot.push({x:rnd(W*.35,W*1.05)+k*rnd(40,120),y:rnd(-20,H*.38)+k*rnd(10,50),vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,sp,len:rnd(160,300),l:-k*.15,m:rnd(1,1.7)})}nxt=rnd(1.3,3.2)}
  for(let i=shoot.length-1;i>=0;i--){const q=shoot[i];q.l+=dt;if(q.l<0)continue;if(q.l>q.m){shoot.splice(i,1);continue}q.x+=q.vx*dt;q.y+=q.vy*dt;const al=Math.sin(Math.PI*q.l/q.m)*sa,tx=q.x-q.vx/q.sp*q.len,ty=q.y-q.vy/q.sp*q.len,gg=s2.createLinearGradient(q.x,q.y,tx,ty);gg.addColorStop(0,`rgba(255,255,255,${al})`);gg.addColorStop(.25,`rgba(255,200,230,${al*.55})`);gg.addColorStop(1,'rgba(255,150,210,0)');s2.globalAlpha=1;s2.strokeStyle=gg;s2.lineWidth=2.2;s2.lineCap='round';s2.beginPath();s2.moveTo(q.x,q.y);s2.lineTo(tx,ty);s2.stroke();s2.globalAlpha=al;s2.drawImage(DS[2],q.x-9,q.y-9,18,18)}
  refl(mx,'255,225,240',sa,mr*1.1,now,lt)}
 if(sunA>.02){const sx=W*.3,sy=H*.62,g=s2.createRadialGradient(sx,sy,0,sx,sy,m*.8);g.addColorStop(0,'rgba(255,225,170,.95)');g.addColorStop(.12,'rgba(255,170,140,.6)');g.addColorStop(1,'rgba(255,100,150,0)');s2.globalAlpha=sunA;s2.fillStyle=g;s2.fillRect(sx-m,sy-m,m*2,m*2);s2.fillStyle='#fff1d0';s2.beginPath();s2.arc(sx,sy,m*.05,0,6.3);s2.fill();refl(sx,'255,200,150',sunA,m*.05,now,lt)}}
document.querySelectorAll('#dots i')[0].classList.add('on');requestAnimationFrame(loop);