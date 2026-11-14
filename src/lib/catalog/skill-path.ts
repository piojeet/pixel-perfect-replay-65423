import { alpha, type Item } from "./types";

export const skillPathItem: Item = {
  slug: "skill-path",
  name: "Skill Path",
  kind: "component",
  category: "progress",
  description: "An interactive skill path that unlocks nodes as each step is completed.",
  controls: ["primary", "secondary", "bg", "animation"],
  defaults: { primary: "#7C6CFF", secondary: "#38C8FF", bg: "#13131E" },
  added: 87,
  build: (p) => ({
    html: `<div class="uf-skill-path"><div class="uf-skill-path-card"><div class="uf-skill-path-stage"><svg class="uf-skill-path-lines" viewBox="0 0 440 240" aria-hidden="true"></svg></div></div><div class="uf-skill-path-hint" aria-live="polite">Tap the glowing node</div></div>`,
    css: `.uf-skill-path { --uf-skill-primary:${p.primary}; --uf-skill-secondary:${p.secondary}; --uf-skill-bg:${p.bg}; width:min(480px,100%); font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
.uf-skill-path-card { padding:14px 12px 10px; border:1px solid #262538; border-radius:28px; background:var(--uf-skill-bg); }
.uf-skill-path-stage { position:relative; width:100%; aspect-ratio:440/240; }
.uf-skill-path-stage svg.uf-skill-path-lines { position:absolute; inset:0; width:100%; height:100%; }
.uf-skill-path-dot { fill:#34334d; transform-box:fill-box; transform-origin:center; }
${p.animation ? ".uf-skill-path .uf-skill-path-active .uf-skill-path-dot { animation:uf-skill-path-dot-pop .45s both; }" : ""}
${p.animation ? "@keyframes uf-skill-path-dot-pop { 0% { fill:#34334d; transform:scale(1); } 50% { transform:scale(2); } 100% { fill:var(--uf-skill-fc); transform:scale(1.15); } }" : ""}
.uf-skill-path-node { position:absolute; width:11.8%; aspect-ratio:1; margin:-5.9% 0 0 -5.9%; padding:0; border:0; background:none; cursor:default; -webkit-tap-highlight-color:transparent; font:inherit; }
.uf-skill-path-node-face { position:relative; display:grid; place-items:center; width:100%; height:100%; border-radius:50%; color:#fff; ${p.animation ? "transition:background .3s,box-shadow .3s;" : ""} }
.uf-skill-path-node-face svg { width:46%; height:46%; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
.uf-skill-path-locked .uf-skill-path-node-face { background:radial-gradient(circle at 35% 28%,#35344f,#1e1d2f); box-shadow:inset 0 0 0 1px #ffffff12,0 6px 12px -4px #000b; color:#8d8ba8; }
.uf-skill-path-locked .uf-skill-path-node-face svg { fill:#8d8ba8; }
.uf-skill-path-current { cursor:pointer; }
.uf-skill-path-current .uf-skill-path-node-face { background:linear-gradient(135deg,var(--uf-skill-primary),var(--uf-skill-secondary)); box-shadow:0 0 0 4px var(--uf-skill-bg),0 0 0 6px ${p.secondary},0 0 24px 6px ${alpha(p.primary, 0.53)}; ${p.animation ? "animation:uf-skill-path-current-bounce 1.15s cubic-bezier(.3,0,.4,1) infinite;" : ""} }
.uf-skill-path-current .uf-skill-path-node-face svg { fill:#fff; stroke:#fff; stroke-width:1.2; }
${p.animation ? "@keyframes uf-skill-path-current-bounce { 0%,100% { transform:translateY(0) scale(1,1); } 12% { transform:translateY(0) scale(1.12,.88); } 45% { transform:translateY(-15px) scale(.95,1.07); } 80% { transform:translateY(0) scale(1.1,.9); } 90% { transform:translateY(0) scale(.97,1.03); } }" : ""}
.uf-skill-path-done .uf-skill-path-node-face { background:radial-gradient(circle at 35% 28%,#ffe08a,#ffb13d 55%,#f58a1f); box-shadow:0 5px 0 #c4701a,0 12px 14px -4px #000a,inset 0 2px 2px #fff7; }
.uf-skill-path-done .uf-skill-path-node-face svg { stroke-width:3; }
.uf-skill-path-done.uf-skill-path-trophy .uf-skill-path-node-face svg { fill:#fff; stroke-width:1.6; }
.uf-skill-path-trophy { cursor:pointer; }
.uf-skill-path-node:focus-visible { outline:2px solid var(--uf-skill-secondary); outline-offset:6px; border-radius:50%; }
.uf-skill-path-label { position:absolute; left:50%; transform:translateX(-50%); white-space:nowrap; color:#8d8ba8; font:600 13px system-ui,sans-serif; ${p.animation ? "transition:color .3s;" : ""} pointer-events:none; }
.uf-skill-path-top .uf-skill-path-label { bottom:calc(100% + 10px); }
.uf-skill-path-bottom .uf-skill-path-label { top:calc(100% + 14px); }
.uf-skill-path-current .uf-skill-path-label,.uf-skill-path-done .uf-skill-path-label { color:#fff; }
.uf-skill-path-current .uf-skill-path-label { font-weight:700; }
.uf-skill-path-spark { position:absolute; width:3.4%; aspect-ratio:1; margin:-1.7% 0 0 -1.7%; color:var(--uf-skill-secondary); opacity:0; pointer-events:none; }
.uf-skill-path-spark svg { display:block; width:100%; height:100%; fill:currentColor; }
.uf-skill-path-spark.uf-skill-path-spark-on { opacity:1; ${p.animation ? "animation:uf-skill-path-twinkle 1.6s ease-in-out infinite;" : ""} }
${p.animation ? "@keyframes uf-skill-path-twinkle { 0%,100% { transform:scale(1) rotate(0); opacity:1; } 50% { transform:scale(.5) rotate(40deg); opacity:.35; } }" : ""}
.uf-skill-path-hint { margin-top:14px; color:#8d8ba8; text-align:center; font-size:12px; }
@media (prefers-reduced-motion:reduce) { .uf-skill-path-current .uf-skill-path-node-face,.uf-skill-path-spark-on,.uf-skill-path-active .uf-skill-path-dot { animation:none!important; } .uf-skill-path-active .uf-skill-path-dot { fill:var(--uf-skill-fc); } }`,
    js: `(function(){
  var nodesData=[["Account",50,168,"bottom"],["Profile",160,76,"top"],["Plan",272,160,"bottom"],["Done",382,76,"top"]];
  var lockIcon='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="3"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>';
  var starIcon='<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z"></path></svg>';
  var checkIcon='<svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9"></path></svg>';
  var trophyIcon='<svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0z"></path><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3"></path><path d="M12 13v3M9.5 20h5M10 16h4v4h-4z"></path></svg>';
  var sparkleIcon='<svg viewBox="0 0 24 24"><path d="M12 0C12.8 7 17 11.2 24 12c-7 .8-11.2 5-12 12-.8-7-5-11.2-12-12 7-.8 11.2-5 12-12z"></path></svg>';
  var root=document.querySelector('.uf-skill-path');
  var stage=root.querySelector('.uf-skill-path-stage');
  var path=stage.querySelector('.uf-skill-path-lines');
  var hint=root.querySelector('.uf-skill-path-hint');
  var svgNamespace='http://www.w3.org/2000/svg';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches||${!p.animation};
  var current=0,busy=false,segments=[],nodes=[],sparkles=[];
  function wait(ms){return new Promise(function(resolve){setTimeout(resolve,ms);});}
  function mix(amount){
    var start=[${parseInt(p.primary.slice(1, 3), 16)},${parseInt(p.primary.slice(3, 5), 16)},${parseInt(p.primary.slice(5, 7), 16)}];
    var end=[${parseInt(p.secondary.slice(1, 3), 16)},${parseInt(p.secondary.slice(3, 5), 16)},${parseInt(p.secondary.slice(5, 7), 16)}];
    return 'rgb('+start.map(function(value,index){return Math.round(value+(end[index]-value)*amount);}).join(',')+')';
  }
  for(var index=0;index<3;index++){
    var start=nodesData[index],end=nodesData[index+1];
    var dx=end[1]-start[1],dy=end[2]-start[2],length=Math.sqrt(dx*dx+dy*dy);
    var ux=dx/length,uy=dy/length,padding=36,count=Math.round((length-padding*2)/13);
    var group=document.createElementNS(svgNamespace,'g');
    group.dots=count;
    for(var dotIndex=0;dotIndex<=count;dotIndex++){
      var fraction=dotIndex/count;
      var dot=document.createElementNS(svgNamespace,'circle');
      dot.setAttribute('class','uf-skill-path-dot');
      dot.setAttribute('r','3.2');
      dot.setAttribute('cx',start[1]+ux*padding+(length-padding*2)*ux*fraction);
      dot.setAttribute('cy',start[2]+uy*padding+(length-padding*2)*uy*fraction);
      dot.style.setProperty('--uf-skill-fc',mix((index+fraction)/3));
      dot.style.animationDelay=dotIndex*65+'ms';
      group.appendChild(dot);
    }
    path.appendChild(group);
    segments.push(group);
  }
  nodesData.forEach(function(data,index){
    var node=document.createElement('button');
    node.type='button';
    node.className='uf-skill-path-node uf-skill-path-'+data[3];
    node.style.left=(data[1]/440)*100+'%';
    node.style.top=(data[2]/240)*100+'%';
    node.innerHTML='<span class="uf-skill-path-node-face"></span><span class="uf-skill-path-label">'+data[0]+'</span>';
    node.addEventListener('click',function(){activate(index);});
    stage.appendChild(node);
    nodes.push(node);
  });
  [[352,34,1],[418,28,.7],[434,66,.9],[420,108,.7]].forEach(function(data,index){
    var sparkle=document.createElement('div');
    sparkle.className='uf-skill-path-spark';
    sparkle.style.left=(data[0]/440)*100+'%';
    sparkle.style.top=(data[1]/240)*100+'%';
    sparkle.style.width=3.4*data[2]+'%';
    sparkle.style.animationDelay=index*.35+'s';
    sparkle.innerHTML=sparkleIcon;
    stage.appendChild(sparkle);
    sparkles.push(sparkle);
  });
  function setNode(index,state){
    var node=nodes[index],face=node.firstChild;
    node.classList.remove('uf-skill-path-locked','uf-skill-path-current','uf-skill-path-done','uf-skill-path-trophy');
    node.classList.add('uf-skill-path-'+state);
    if(state==='done'&&index===3)node.classList.add('uf-skill-path-trophy');
    face.innerHTML=state==='locked'?lockIcon:state==='current'?starIcon:index===3?trophyIcon:checkIcon;
    node.disabled=state==='locked';
    node.setAttribute('aria-label',nodesData[index][0]+' — '+state);
  }
  function popNode(index,big){
    if(reduce)return;
    nodes[index].animate(
      [{transform:'scale(.7) rotate(-18deg)'},{transform:'scale(1.2) rotate(6deg)',offset:.55},{transform:'scale(1)'}],
      {duration:big?600:480,easing:'ease-out'}
    );
  }
  function reset(){
    current=0;
    busy=false;
    segments.forEach(function(segment){segment.classList.remove('uf-skill-path-active');});
    sparkles.forEach(function(sparkle){sparkle.classList.remove('uf-skill-path-spark-on');});
    nodesData.forEach(function(_,index){setNode(index,index===0?'current':'locked');});
    hint.textContent='Tap the glowing node';
  }
  async function activate(index){
    if(busy)return;
    if(current===4){reset();return;}
    if(index!==current)return;
    busy=true;
    setNode(index,'done');
    popNode(index,index===3);
    if(index<3){
      segments[index].classList.add('uf-skill-path-active');
      await wait(reduce?0:segments[index].dots*65+450);
      current=index+1;
      setNode(current,'current');
      popNode(current,false);
    }else{
      current=4;
      sparkles.forEach(function(sparkle){sparkle.classList.add('uf-skill-path-spark-on');});
      hint.textContent='All done! Tap the trophy to restart';
    }
    busy=false;
  }
  reset();
})();`,
  }),
};
