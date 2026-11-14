import { type Item } from "./types";

export const levelBlocksItem: Item = {
  slug: "level-blocks",
  name: "Level Blocks",
  kind: "component",
  category: "progress",
  description: "Choose a step to move the ball across colorful blocks and reach the finish.",
  controls: [],
  added: 85,
  build: () => ({
    html: `<div class="uf-level-blocks"><div class="uf-level-blocks-stage" role="group" aria-label="Choose a progress step"><div class="uf-level-blocks-floor"></div><div class="uf-level-blocks-list"></div><div class="uf-level-blocks-flag" aria-hidden="true"><i class="uf-level-blocks-pole"></i><i class="uf-level-blocks-cloth"></i></div><div class="uf-level-blocks-ball" aria-hidden="true"><div class="uf-level-blocks-ball-inner"></div></div></div><div class="uf-level-blocks-hint" aria-live="polite">Choose a step</div></div>`,
    css: `.uf-level-blocks { width:min(440px,100%); font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
.uf-level-blocks-stage { position:relative; height:262px; border:1px solid #262538; border-radius:28px; background:#14141f; }
.uf-level-blocks-list { position:absolute; left:16px; right:16px; bottom:22px; display:flex; align-items:flex-end; gap:12px; height:132px; overflow:hidden; }
.uf-level-blocks-floor { position:absolute; left:12px; right:12px; bottom:21px; height:2px; border-radius:2px; background:#2b2a42; }
.uf-level-block { position:relative; display:flex; flex:1; align-items:flex-end; justify-content:center; box-sizing:border-box; padding:0 2px 10px; border:0; border-radius:14px; color:#fff; font:700 12px system-ui,sans-serif; text-shadow:0 1px 2px #0004; cursor:pointer; }
.uf-level-block::before { content:""; position:absolute; top:0; left:0; right:0; height:11px; border-radius:14px 14px 6px 6px; background:#ffffff30; }
.uf-level-block span { position:relative; }
.uf-level-block:focus-visible { outline:2px solid #38c8ff; outline-offset:3px; }
.uf-level-blocks-ball { position:absolute; top:0; left:0; width:28px; height:28px; opacity:0; pointer-events:none; }
.uf-level-blocks-ball-inner { position:relative; width:100%; height:100%; border-radius:50%; background:radial-gradient(circle at 35% 30%,#fff,#e6e6f4); transform-origin:50% 100%; box-shadow:0 3px 8px #0006; }
.uf-level-blocks-ball-inner::before,.uf-level-blocks-ball-inner::after { content:""; position:absolute; top:11px; width:4px; height:4px; border-radius:50%; background:#2a2940; }
.uf-level-blocks-ball-inner::before { left:7px; }
.uf-level-blocks-ball-inner::after { right:7px; }
.uf-level-blocks-flag { position:absolute; top:0; left:0; width:30px; height:46px; opacity:0; transform-origin:0 100%; pointer-events:none; }
.uf-level-blocks-pole { position:absolute; top:0; left:0; width:2px; height:100%; border-radius:2px; background:#d9d8ea; }
.uf-level-blocks-cloth { position:absolute; top:2px; left:2px; width:26px; height:18px; background:#ff5a7a; clip-path:polygon(0 0,100% 50%,0 100%); transform-origin:0 50%; }
.uf-level-blocks-spark { position:absolute; top:0; left:0; opacity:0; pointer-events:none; }
.uf-level-blocks-spark svg { display:block; width:100%; height:100%; fill:currentColor; filter:drop-shadow(0 0 4px currentColor); }
.uf-level-blocks-hint { margin-top:14px; color:#8d8ba8; text-align:center; font-size:12px; }
@media (prefers-reduced-motion:reduce) { .uf-level-blocks-stage * { scroll-behavior:auto!important; } }`,
    js: `(function(){
  var labels=["Account","Profile","Plan","Done"];
  var heights=[26,54,88,132];
  var colors=[["#8f6bff","#6d6cff"],["#6e7cff","#5a8cff"],["#4f93ff","#3fb0ff"],["#3fd1b0","#38b8ff"]];
  var root=document.querySelector('.uf-level-blocks');
  var stage=root.querySelector('.uf-level-blocks-stage');
  var blocks=root.querySelector('.uf-level-blocks-list');
  var ball=root.querySelector('.uf-level-blocks-ball');
  var ballInner=root.querySelector('.uf-level-blocks-ball-inner');
  var flag=root.querySelector('.uf-level-blocks-flag');
  var cloth=root.querySelector('.uf-level-blocks-cloth');
  var hint=root.querySelector('.uf-level-blocks-hint');
  var blockNodes=[],sparks=[],current=0,busy=false;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  labels.forEach(function(label,index){
    var block=document.createElement('button');
    block.type='button';
    block.className='uf-level-block';
    block.style.height=heights[index]+'px';
    block.style.background='linear-gradient(180deg,'+colors[index][0]+','+colors[index][1]+')';
    block.style.boxShadow='0 0 24px -6px '+colors[index][1];
    block.innerHTML='<span>'+label+'</span>';
    block.setAttribute('aria-pressed',index===current?'true':'false');
    block.addEventListener('click',function(){go(index);});
    blocks.appendChild(block);
    blockNodes.push(block);
  });
  var sparkOffsets=[[-30,-36,22,'#fff'],[18,-48,16,'#ffe36e'],[-54,-12,14,'#fff'],[-8,-66,12,'#fff']];
  sparkOffsets.forEach(function(info){
    var spark=document.createElement('div');
    spark.className='uf-level-blocks-spark';
    spark.style.width=spark.style.height=info[2]+'px';
    spark.style.color=info[3];
    spark.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C12.8 7 17 11.2 24 12c-7 .8-11.2 5-12 12-.8-7-5-11.2-12-12 7-.8 11.2-5 12-12z"></path></svg>';
    stage.appendChild(spark);
    sparks.push(spark);
  });
  function point(index){
    var block=blockNodes[index];
    return {x:blocks.offsetLeft+block.offsetLeft+block.offsetWidth/2-14+(index===3?-12:0),y:blocks.offsetTop+block.offsetTop-27};
  }
  function translate(x,y){return 'translate('+x+'px,'+y+'px)';}
  function layout(){
    var end=point(3),last=blockNodes[3];
    flag.style.left=blocks.offsetLeft+last.offsetLeft+last.offsetWidth-20+'px';
    flag.style.top=blocks.offsetTop+last.offsetTop-46+'px';
    sparks.forEach(function(spark,index){
      spark.style.left=end.x+14+sparkOffsets[index][0]+'px';
      spark.style.top=end.y+sparkOffsets[index][1]+'px';
    });
  }
  function placeBall(index){
    var position=point(index);
    ball.style.opacity=1;
    ball.style.transform=translate(position.x,position.y);
  }
  function setCurrent(index){
    current=index;
    blockNodes.forEach(function(block,i){block.setAttribute('aria-pressed',i===index?'true':'false');});
    hint.textContent='Step '+(index+1)+' of '+labels.length+' · '+labels[index];
  }
  function hop(from,to,height,duration){
    var frames=[],count=14;
    for(var step=0;step<=count;step++){
      var progress=step/count;
      frames.push({transform:translate(from.x+(to.x-from.x)*progress,from.y+(to.y-from.y)*progress-4*height*progress*(1-progress)),offset:progress});
    }
    return ball.animate(frames,{duration:duration,easing:'linear',fill:'forwards'}).finished;
  }
  var squash=[{transform:'scale(1,1)'},{transform:'scale(1.4,.62)',offset:.3},{transform:'scale(.88,1.14)',offset:.65},{transform:'scale(1,1)'}];
  function land(index){
    blockNodes[index].animate([{transform:'translateY(0)'},{transform:'translateY(5px)'},{transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
    ballInner.animate(squash,{duration:340});
  }
  function hideFinish(){
    flag.getAnimations().forEach(function(animation){animation.cancel();});
    cloth.getAnimations().forEach(function(animation){animation.cancel();});
    flag.style.opacity=0;
    sparks.forEach(function(spark){
      spark.getAnimations().forEach(function(animation){animation.cancel();});
      spark.style.opacity=0;
    });
  }
  function showFinish(animate){
    flag.style.opacity=1;
    if(!animate){sparks.forEach(function(spark){spark.style.opacity=1;});return;}
    flag.animate([{transform:'scaleY(0)'},{transform:'scaleY(1.15)',offset:.6},{transform:'scaleY(1)'}],{duration:520,easing:'ease-out',fill:'forwards'});
    cloth.animate([{transform:'scaleX(1) skewY(0)'},{transform:'scaleX(.88) skewY(-7deg)'},{transform:'scaleX(1) skewY(0)'}],{duration:1500,iterations:Infinity,easing:'ease-in-out'});
    sparks.forEach(function(spark,index){
      var entrance=spark.animate([{transform:'scale(0) rotate(-50deg)',opacity:0},{transform:'scale(1.4) rotate(0)',opacity:1,offset:.6},{transform:'scale(1)',opacity:1}],{duration:480,delay:index*120,easing:'ease-out',fill:'both'});
      entrance.onfinish=function(){
        spark.animate([{transform:'scale(1)',opacity:1},{transform:'scale(.55)',opacity:.35},{transform:'scale(1)',opacity:1}],{duration:1300+index*260,iterations:Infinity,easing:'ease-in-out'});
      };
    });
  }
  async function go(target){
    if(busy||target===current)return;
    busy=true;
    hideFinish();
    var from=point(current),to=point(target);
    if(reduce){
      placeBall(target);
      setCurrent(target);
      if(target===3)showFinish(false);
      busy=false;
      return;
    }
    try{
      await hop(from,to,34+Math.abs(target-current)*6,540);
      ball.style.transform=translate(to.x,to.y);
      ball.getAnimations().forEach(function(animation){animation.cancel();});
      setCurrent(target);
      land(target);
      if(target===3)showFinish(true);
    } finally {
      busy=false;
    }
  }
  layout();
  placeBall(current);
  setCurrent(current);
  window.addEventListener('resize',function(){layout();if(!busy)placeBall(current);});
})();`,
  }),
};