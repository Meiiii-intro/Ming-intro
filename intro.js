(() => {
  const overlay = document.getElementById('circuit-intro');
  const canvas = overlay.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const main = document.getElementById('main');
  const footer = document.querySelector('.site-footer');
  const skip = overlay.querySelector('button');
  if (!ctx || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ended = false, frame, start, routes = [], w, h, lettering;
  const clamp = n => Math.max(0, Math.min(1, n));
  function setup() {
    w = innerWidth; h = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = w*dpr; canvas.height = h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    lettering = document.createElement('canvas'); lettering.width = w*dpr; lettering.height = h*dpr;
    const ink = lettering.getContext('2d'); ink.scale(dpr,dpr);
    const lines = w < 600 ? ['You can do','anything','with Art'] : ['You can do anything','with Art'];
    const size = Math.min(w < 600 ? w/8 : w/15, h/7, 94);
    ink.font = `600 ${size}px Arial, sans-serif`; ink.textAlign = 'center'; ink.textBaseline = 'middle';
    // Fine parallel traces are clipped to the glyphs, so the letters themselves are circuits.
    ink.lineWidth = 1.3; ink.strokeStyle = '#151515';
    for(let y=0;y<h;y+=4) { ink.beginPath(); ink.moveTo(0,y); ink.lineTo(w,y); ink.stroke(); }
    for(let x=0;x<w;x+=20) { ink.beginPath(); ink.moveTo(x,0); ink.lineTo(x,h); ink.stroke(); }
    ink.globalCompositeOperation='destination-in';
    const mask = document.createElement('canvas'); mask.width=lettering.width; mask.height=lettering.height;
    const m = mask.getContext('2d'); m.scale(dpr,dpr); m.font=ink.font; m.textAlign='center';m.textBaseline='middle';
    lines.forEach((line,i)=>m.fillText(line,w/2,h/2+(i-(lines.length-1)/2)*size*1.2));
    ink.drawImage(mask,0,0,w,h);
    routes = Array.from({length:w<600?64:112},(_,i)=>{
      const side=i%4, t=(Math.floor(i/4)+.5)/Math.ceil((w<600?64:112)/4);
      const target=[w/2+(t-.5)*Math.min(w*.74,980),h/2+(side<2?-1:1)*size*(lines.length*.64)];
      let points;
      if(side===0 || side===2){const x=t*w;const y=side===0?-20:h+20;points=[[x,y],[x,y+(target[1]-y)*.45],[target[0],y+(target[1]-y)*.75],target];}
      else {const x=side===1?-20:w+20;const y=t*h;target[0]=w/2+(side===1?-1:1)*Math.min(w*.40,520);target[1]=h/2+(t-.5)*size*lines.length;points=[[x,y],[x+(target[0]-x)*.5,y],[x+(target[0]-x)*.8,target[1]],target];}
      const lengths=points.slice(1).map((p,j)=>Math.hypot(p[0]-points[j][0],p[1]-points[j][1]));
      return {points,lengths,total:lengths.reduce((a,b)=>a+b,0),delay:(i*17%37)*.018};
    });
  }
  function path(route, progress) {
    let remaining=route.total*clamp(progress);ctx.beginPath();ctx.moveTo(...route.points[0]);
    let end=route.points[0];
    for(let j=0;j<route.lengths.length;j++) { const a=route.points[j],b=route.points[j+1];const f=Math.min(remaining/route.lengths[j],1);end=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];ctx.lineTo(...end);remaining-=route.lengths[j];if(remaining<=0)break; }
    ctx.stroke(); return end;
  }
  function finish() {
    if(ended)return;ended=true;cancelAnimationFrame(frame);clearTimeout(failsafe);
    overlay.classList.add('leaving'); main.inert=false; footer.inert=false; document.body.classList.remove('intro-playing');
    if(document.activeElement===skip)main.querySelector('a').focus({preventScroll:true});
    removeEventListener('resize',setup);removeEventListener('keydown',onKey);
    setTimeout(()=>{overlay.hidden=true;},650);
  }
  function onKey(e){if(e.key==='Escape')finish();}
  function draw(now) {
    if(ended)return;start ??=now;const t=(now-start)/1000;
    ctx.clearRect(0,0,w,h);ctx.lineWidth=.9;ctx.strokeStyle='#171717';
    ctx.globalAlpha=1-clamp((t-3.0)/1.2)*.88;
    routes.forEach((r,i)=>{const p=(t-r.delay)/2.1;if(p<=0)return;const end=path(r,p);ctx.beginPath();ctx.arc(end[0],end[1],i%5===0?3:1.5,0,Math.PI*2);ctx.stroke();if(i%7===0){ctx.fillStyle='#171717';ctx.fillRect(r.points[1][0]-2,r.points[1][1]-4,4,8);}});
    ctx.globalAlpha=1;const reveal=clamp((t-2.25)/1.8);
    ctx.save();ctx.beginPath();ctx.rect(w/2-w/2*reveal,0,w*reveal,h);ctx.clip();ctx.drawImage(lettering,0,0,w,h);ctx.restore();
    if(t>5.9){finish();return;}frame=requestAnimationFrame(draw);
  }
  const failsafe=setTimeout(finish,8500);
  try { setup();overlay.hidden=false; main.inert=true;footer.inert=true;document.body.classList.add('intro-playing');skip.addEventListener('click',finish);addEventListener('keydown',onKey);addEventListener('resize',setup);frame=requestAnimationFrame(draw); } catch { finish(); }
})();
