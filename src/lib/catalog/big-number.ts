import { type Item } from "./types";

export const bigNumberItem: Item = {
  slug: "big-number",
  name: "Big Number",
  kind: "component",
  category: "progress",
  description: "A split-flap number counter that advances through four guided steps.",
  controls: [],
  added: 86,
  build: () => ({
    html: `<div class="uf-big-number"><div class="uf-big-number-card"><div class="uf-big-number-tile"><div class="uf-big-number-half uf-big-number-top"><span>1</span></div><div class="uf-big-number-half uf-big-number-bottom"><span>1</span></div><div class="uf-big-number-half uf-big-number-top uf-big-number-flap-top"><span>1</span><i class="uf-big-number-shade"></i></div><div class="uf-big-number-half uf-big-number-bottom uf-big-number-flap-bottom"><span>1</span><i class="uf-big-number-shade"></i></div></div><div class="uf-big-number-info"><div class="uf-big-number-label">STEP</div><div class="uf-big-number-name"><h2>Account</h2></div><div class="uf-big-number-segments"></div><div class="uf-big-number-actions"><label>Next</label><button type="button" class="uf-big-number-go" aria-label="Next"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button></div></div></div></div>`,
    css: `.uf-big-number {
  --uf-bn-height:150px;
  width:min(460px,100%);
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
}
.uf-big-number-card {
  display:grid;
  grid-template-columns:136px 1fr;
  gap:22px;
  padding:22px;
  border:1px solid #262538;
  border-radius:30px;
  background:#13131e;
  box-shadow:0 30px 60px -30px #000;
}
.uf-big-number-tile {
  position:relative;
  width:136px;
  height:var(--uf-bn-height);
  border-radius:22px;
  background:linear-gradient(160deg,#25234a,#1a1930);
  box-shadow:inset 0 0 0 1px #ffffff0d;
}
.uf-big-number-tile::after { content:""; position:absolute; z-index:6; top:50%; left:-12px; right:-12px; height:2px; margin-top:-1px; background:#07070d; }
.uf-big-number-half {
  position:absolute;
  left:0;
  right:0;
  height:calc(var(--uf-bn-height)/2);
  overflow:hidden;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  background-image:linear-gradient(160deg,#25234a,#1a1930);
  background-size:100% var(--uf-bn-height);
  background-repeat:no-repeat;
}
.uf-big-number-half span { position:absolute; left:0; right:0; height:var(--uf-bn-height); text-align:center; font:800 120px/var(--uf-bn-height) system-ui,-apple-system,sans-serif; color:#f4f3ff; }
.uf-big-number-bottom span { color:#c9c7f4; }
.uf-big-number-half.uf-big-number-mint span { color:#e2fff6; }
.uf-big-number-bottom.uf-big-number-mint span { color:#4fd8b8; }
.uf-big-number-top { top:0; border-radius:22px 22px 0 0; background-position:0 0; }
.uf-big-number-bottom { bottom:0; border-radius:0 0 22px 22px; background-position:0 calc(var(--uf-bn-height)/-2); }
.uf-big-number-top span { top:0; }
.uf-big-number-bottom span { top:calc(var(--uf-bn-height)/-2); }
.uf-big-number-flap-top,.uf-big-number-flap-bottom { display:none; z-index:5; will-change:transform; }
.uf-big-number-flap-top { transform-origin:50% 100%; }
.uf-big-number-flap-bottom { transform-origin:50% 0; transform:rotateX(90deg); }
.uf-big-number-shade { position:absolute; inset:0; background:#05050c; opacity:0; pointer-events:none; }
.uf-big-number-flap-top .uf-big-number-shade { z-index:5; }
.uf-big-number-flap-bottom .uf-big-number-shade { transform:rotateX(90deg); }
.uf-big-number-info { display:flex; flex-direction:column; min-width:0; }
.uf-big-number-label { margin-top:6px; color:#8d8ba8; font:700 11px system-ui,sans-serif; letter-spacing:.14em; }
.uf-big-number-name { height:46px; margin-top:8px; overflow:hidden; perspective:420px; }
.uf-big-number-name h2 { margin:0; color:#fff; font-size:34px; line-height:46px; letter-spacing:-.02em; transform-origin:50% 50%; }
.uf-big-number-name h2.uf-big-number-mint { background:linear-gradient(90deg,#5be3c0,#7ad8ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.uf-big-number-segments { display:flex; gap:7px; margin-top:14px; }
.uf-big-number-segment { flex:1; max-width:48px; height:6px; border-radius:6px; background:#2a2940; overflow:hidden; }
.uf-big-number-segment i { display:block; height:100%; border-radius:6px; transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.65,0,.35,1); }
.uf-big-number-segment.uf-big-number-on i { transform:none; }
.uf-big-number-actions { display:flex; align-items:center; justify-content:flex-end; gap:12px; margin-top:auto; padding-top:18px; }
.uf-big-number-actions label { color:#d9d8ea; font:600 14px system-ui,sans-serif; }
.uf-big-number-go { display:grid; flex:none; place-items:center; width:56px; height:56px; padding:0; border:0; border-radius:50%; color:#fff; background:linear-gradient(135deg,#7c6cff,#38c8ff); box-shadow:0 0 0 4px #7c6cff2e,0 0 26px 2px #4d8dffaa,inset 0 1px #fff5; cursor:pointer; transition:transform .15s; -webkit-tap-highlight-color:transparent; }
.uf-big-number-go:active { transform:scale(.92); }
.uf-big-number-go:focus-visible { outline:2px solid #38c8ff; outline-offset:5px; }
.uf-big-number-go svg { width:24px; height:24px; fill:none; stroke:currentColor; stroke-width:2.4; stroke-linecap:round; stroke-linejoin:round; }
@media (max-width:380px) {
  .uf-big-number-card { grid-template-columns:110px 1fr; gap:14px; padding:16px; }
  .uf-big-number-tile { width:110px; }
  .uf-big-number-half span { font-size:100px; }
  .uf-big-number-name h2 { font-size:28px; }
}
@media (prefers-reduced-motion:reduce) { .uf-big-number-segment i,.uf-big-number-go { transition:none!important; } }`,
    js: `(function(){
  var names=["Account","Profile","Plan","Done"];
  var colors=[["#7c6cff","#6d7dff"],["#6d7dff","#5a8cff"],["#5a90ff","#47a8ff"],["#47a8ff","#38c8ff"]];
  var root=document.querySelector('.uf-big-number');
  var top=root.querySelector('.uf-big-number-top');
  var bottom=root.querySelector('.uf-big-number-bottom');
  var flapTop=root.querySelector('.uf-big-number-flap-top');
  var flapBottom=root.querySelector('.uf-big-number-flap-bottom');
  var name=root.querySelector('.uf-big-number-name h2');
  var label=root.querySelector('.uf-big-number-actions label');
  var button=root.querySelector('.uf-big-number-go');
  var icon=button.querySelector('svg');
  var segmentsRoot=root.querySelector('.uf-big-number-segments');
  var resetPath='<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>';
  var nextPath='<path d="M5 12h14M13 6l6 6-6 6"/>';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current=0,busy=false,segments=[];
  names.forEach(function(_,index){
    var segment=document.createElement('span');
    segment.className='uf-big-number-segment';
    segment.innerHTML='<i style="background:linear-gradient(90deg,'+colors[index][0]+','+colors[index][1]+')"></i>';
    segmentsRoot.appendChild(segment);
    segments.push(segment);
  });
  function face(element,value){
    element.firstElementChild.textContent=value;
    element.classList.toggle('uf-big-number-mint',value===4);
  }
  function paint(step){
    segments.forEach(function(segment,index){segment.classList.toggle('uf-big-number-on',index<=step);});
  }
  function cancel(element){element.getAnimations().forEach(function(animation){animation.cancel();});}
  function flip(from,to){
    face(top,to);
    face(bottom,from);
    face(flapTop,from);
    face(flapBottom,to);
    var perspective='perspective(520px) ',duration=800,count=14;
    var middle=.8*Math.pow(.5,1/1.6),topFrames=[],bottomFrames=[];
    var shadeTop=flapTop.querySelector('.uf-big-number-shade');
    var shadeBottom=flapBottom.querySelector('.uf-big-number-shade');
    function angle(time){
      return time<=.8?-180*Math.pow(time/.8,1.6):-180+7*Math.sin(Math.PI*(time-.8)/.2);
    }
    for(var index=0;index<=count;index++){
      var time=middle*index/count;
      topFrames.push({transform:perspective+'rotateX('+angle(time)+'deg)',offset:time});
    }
    topFrames.push({transform:perspective+'rotateX(-90deg)',offset:1});
    bottomFrames.push({transform:perspective+'rotateX(90deg)',offset:0},{transform:perspective+'rotateX(90deg)',offset:middle});
    for(var frame=1;frame<=count+8;frame++){
      var progress=middle+(1-middle)*frame/(count+8);
      bottomFrames.push({transform:perspective+'rotateX('+(angle(progress)+180)+'deg)',offset:progress});
    }
    flapTop.style.transform=perspective+'rotateX(0deg)';
    flapBottom.style.transform=perspective+'rotateX(90deg)';
    flapTop.style.display=flapBottom.style.display='block';
    shadeTop.animate([{opacity:0},{opacity:.55,offset:middle},{opacity:.55}],{duration:duration,fill:'forwards'});
    shadeBottom.animate([{opacity:.55},{opacity:.55,offset:middle},{opacity:0}],{duration:duration,fill:'forwards'});
    setTimeout(function(){face(bottom,to);},duration*.8);
    flapTop.animate(topFrames,{duration:duration,easing:'linear',fill:'forwards'});
    return flapBottom.animate(bottomFrames,{duration:duration,easing:'linear',fill:'forwards'}).finished.then(function(){
      face(bottom,to);
      [flapTop,flapBottom,shadeTop,shadeBottom].forEach(cancel);
      flapTop.style.display=flapBottom.style.display='none';
    });
  }
  function roll(text,isMint){
    return name.animate(
      [{transform:'translateY(0) rotateX(0)',opacity:1},{transform:'translateY(-60%) rotateX(70deg)',opacity:0}],
      {duration:200,easing:'ease-in',fill:'forwards'}
    ).finished.then(function(){
      name.textContent=text;
      name.classList.toggle('uf-big-number-mint',isMint);
      return name.animate(
        [{transform:'translateY(60%) rotateX(-70deg)',opacity:0},{transform:'translateY(0) rotateX(0)',opacity:1}],
        {duration:420,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'}
      ).finished;
    }).then(function(){cancel(name);});
  }
  function updateButton(isLast){
    label.textContent=isLast?'Restart':'Next';
    button.setAttribute('aria-label',label.textContent);
    icon.innerHTML=isLast?resetPath:nextPath;
    if(!reduce)icon.animate([{transform:'rotate(-90deg) scale(.5)',opacity:0},{transform:'none',opacity:1}],{duration:340,easing:'cubic-bezier(.3,1.4,.5,1)'});
  }
  button.addEventListener('click',function(){
    if(busy)return;
    busy=true;
    var from=current,to=current===3?0:current+1;
    current=to;
    paint(to);
    updateButton(to===3);
    if(reduce){
      face(top,to+1);
      face(bottom,to+1);
      name.textContent=names[to];
      name.classList.toggle('uf-big-number-mint',to===3);
      busy=false;
      return;
    }
    Promise.all([flip(from+1,to+1),roll(names[to],to===3)]).then(function(){busy=false;});
  });
  face(top,1);
  face(bottom,1);
  paint(0);
})();`,
  }),
};
