import { type Item } from "./types";

export const snapBracketsItem: Item = {
  slug: "snap-brackets-date-picker",
  name: "Snap Brackets",
  kind: "component",
  category: "date-pickers",
  description: "A weekly date picker with animated corner brackets that snap to each selection.",
  controls: [],
  defaults: { bg: "#0D0D16" },
  added: 89,
  build: () => ({
    html: `<div class="uf-snap-brackets"><div class="uf-sb-card"><div class="uf-sb-header"><b class="uf-sb-month">November 2026</b><span class="uf-sb-nav"><button type="button" class="uf-sb-previous" aria-label="Previous week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"></path></svg></button><button type="button" class="uf-sb-next" aria-label="Next week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg></button></span></div><div class="uf-sb-strip"><div class="uf-sb-pill"><i class="uf-sb-highlight"></i></div><div class="uf-sb-frame"><span></span><span></span><span></span><span></span></div></div><div class="uf-sb-footer"><span class="uf-sb-label">Mon, Nov 16</span><span class="uf-sb-slots">5 slots</span></div></div></div>`,
    css: `.uf-snap-brackets { width:min(400px,calc(100% - 32px)); color:#f1f0fa; font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
.uf-sb-card { width:100%; padding:16px 14px; border:1px solid #25243a; border-radius:26px; background:#12121d; }
.uf-sb-header { display:flex; align-items:center; justify-content:space-between; padding:0 6px 12px; }
.uf-sb-header b { font-size:14px; letter-spacing:-.01em; }
.uf-sb-nav { display:flex; gap:6px; }
.uf-sb-nav button { display:grid; place-items:center; width:28px; height:28px; padding:0; border:0; border-radius:50%; background:none; color:#8d8ba8; cursor:pointer; -webkit-tap-highlight-color:transparent; }
.uf-sb-nav button:active { background:#ffffff12; }
.uf-sb-nav button:focus-visible,.uf-sb-day:focus-visible { outline:2px solid #38c8ff; outline-offset:2px; }
.uf-sb-nav svg { width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
.uf-sb-strip { position:relative; display:grid; grid-template-columns:repeat(7,1fr); padding:10px 6px; border:1px solid #ffffff0d; border-radius:20px; background:#1a1a29; }
.uf-sb-day { position:relative; z-index:2; display:grid; justify-items:center; gap:11px; padding:7px 0 9px; border:0; border-radius:19px; background:none; color:#dcdbec; cursor:pointer; font:inherit; -webkit-tap-highlight-color:transparent; }
.uf-sb-day i { color:#8d8ba8; font:600 11px system-ui,sans-serif; font-style:normal; transition:color .3s; }
.uf-sb-day b { font:700 20px/24px system-ui,sans-serif; transition:color .3s; }
.uf-sb-day.uf-sb-selected i,.uf-sb-day.uf-sb-selected b { color:#fff; }
.uf-sb-pill { position:absolute; z-index:1; width:38px; border-radius:19px; opacity:0; background:linear-gradient(180deg,#6c6cff,#3fa8ff); box-shadow:0 0 16px #4d78ff66; }
.uf-sb-highlight { position:absolute; inset:0; border-radius:inherit; background:linear-gradient(180deg,#e4dcff,#a8e6ff); opacity:0; }
.uf-sb-frame { position:absolute; z-index:4; left:0; top:0; width:0; height:0; pointer-events:none; opacity:0; }
.uf-sb-frame span { position:absolute; width:11px; height:11px; border:0 solid #fff; filter:drop-shadow(0 0 4px #ffffffaa); }
.uf-sb-frame span:nth-child(1) { left:0; top:0; border-width:2.5px 0 0 2.5px; border-top-left-radius:4px; }
.uf-sb-frame span:nth-child(2) { right:0; top:0; border-width:2.5px 2.5px 0 0; border-top-right-radius:4px; }
.uf-sb-frame span:nth-child(3) { left:0; bottom:0; border-width:0 0 2.5px 2.5px; border-bottom-left-radius:4px; }
.uf-sb-frame span:nth-child(4) { right:0; bottom:0; border-width:0 2.5px 2.5px 0; border-bottom-right-radius:4px; }
.uf-sb-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 8px 0; overflow:hidden; font-size:13px; }
.uf-sb-label { font-weight:600; }
.uf-sb-slots { color:#8d8ba8; font-size:12px; }
@media (prefers-reduced-motion:reduce) { .uf-sb-day i,.uf-sb-day b { transition:none; } }`,
    js: `(function(){
  var dayLetters=["S","M","T","W","T","F","S"];
  var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var root=document.querySelector('.uf-snap-brackets');
  var strip=root.querySelector('.uf-sb-strip');
  var pill=root.querySelector('.uf-sb-pill');
  var highlight=root.querySelector('.uf-sb-highlight');
  var frame=root.querySelector('.uf-sb-frame');
  var label=root.querySelector('.uf-sb-label');
  var slotLabel=root.querySelector('.uf-sb-slots');
  var monthLabel=root.querySelector('.uf-sb-month');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base=new Date(2026,10,15),selected=1,run=0,days=[],pillWidth=38;
  function animate(element,keyframes,options){return element.animate(keyframes,options).finished.catch(function(){});}
  function wait(ms){return new Promise(function(resolve){setTimeout(resolve,ms);});}
  function dateAt(index){var date=new Date(base);date.setDate(base.getDate()+index);return date;}
  function slots(date){
    return date.getFullYear()===2026&&date.getMonth()===10&&date.getDate()>=15&&date.getDate()<=21
      ?[2,5,3,4,2,6,3][date.getDate()-15]
      :((date.getDate()*5+date.getMonth()*3)%6)+2;
  }
  function dateText(index){
    var date=dateAt(index);
    return [dayNames[index]+", "+months[date.getMonth()].slice(0,3)+" "+date.getDate(),slots(date)+" slots"];
  }
  for(var index=0;index<7;index++){
    (function(dayIndex){
      var day=document.createElement('button');
      day.type='button';
      day.className='uf-sb-day';
      day.innerHTML='<i>'+dayLetters[dayIndex]+'</i><b></b>';
      day.addEventListener('click',function(){pick(dayIndex);});
      strip.appendChild(day);
      days.push(day);
    })(index);
  }
  function updateLabels(){
    days.forEach(function(day,index){
      day.lastChild.textContent=dateAt(index).getDate();
      day.setAttribute('aria-label',dateText(index)[0]);
    });
    var middle=dateAt(3);
    monthLabel.textContent=months[middle.getMonth()]+" "+middle.getFullYear();
  }
  function geometry(index){
    var day=days[index];
    return {center:day.offsetLeft+day.offsetWidth/2,top:day.offsetTop,height:day.offsetHeight};
  }
  function placePill(index){
    var position=geometry(index);
    pill.style.left=position.center-pillWidth/2+"px";
    pill.style.top=position.top+"px";
    pill.style.height=position.height+"px";
  }
  function frameBox(index,widthDelta,heightDelta){
    var position=geometry(index),width=pillWidth+widthDelta,height=position.height+heightDelta;
    return {
      left:position.center-width/2+"px",
      top:position.top+position.height/2-height/2+"px",
      width:width+"px",
      height:height+"px"
    };
  }
  function clean(){
    [pill,frame,highlight].forEach(function(element){
      element.getAnimations().forEach(function(animation){animation.cancel();});
    });
  }
  function swap(element,text){
    if(reduce){element.textContent=text;return;}
    animate(element,[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-8px)"}],{duration:150,fill:"forwards"}).then(function(){
      element.textContent=text;
      return animate(element,[{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"translateY(0)"}],{duration:280,easing:"cubic-bezier(.16,1,.3,1)",fill:"forwards"});
    });
  }
  function updateFooter(index){
    var text=dateText(index);
    swap(label,text[0]);
    swap(slotLabel,text[1]);
  }
  function showSelected(index,animateSelection){
    days.forEach(function(day,dayIndex){day.classList.toggle('uf-sb-selected',dayIndex===index);});
    placePill(index);
    pill.style.opacity=1;
    if(animateSelection&&!reduce)pill.animate([{opacity:0,transform:"scale(.85)"},{opacity:1,transform:"scale(1)"}],{duration:280,easing:"ease-out"});
  }
  async function pick(index){
    if(index===selected)return;
    var id=++run,previous=selected;
    selected=index;
    clean();
    frame.style.opacity=0;
    days[previous].classList.remove('uf-sb-selected');
    if(reduce){
      showSelected(index,false);
      updateFooter(index);
      return;
    }
    frame.style.opacity=1;
    animate(pill,[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(.85)"}],{duration:180,fill:"forwards"});
    await animate(frame,[frameBox(previous,4,4),frameBox(index,18,14)],{duration:420,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});
    if(id!==run)return;
    pill.getAnimations().forEach(function(animation){animation.cancel();});
    placePill(index);
    pill.style.opacity=1;
    days[index].classList.add('uf-sb-selected');
    updateFooter(index);
    pill.animate([{opacity:0,transform:"scale(.82)"},{opacity:1,transform:"scale(1)"}],{duration:280,easing:"cubic-bezier(.3,1.4,.5,1)"});
    highlight.animate([{opacity:.85},{opacity:0}],{duration:800,easing:"ease-out",fill:"forwards"});
    await animate(frame,[frameBox(index,18,14),frameBox(index,-1,-1),frameBox(index,4,4)],{duration:260,easing:"cubic-bezier(.55,0,.25,1)",fill:"forwards"});
    if(id!==run)return;
    await wait(240);
    if(id!==run)return;
    await animate(frame,[{opacity:1},{opacity:0}],{duration:280,fill:"forwards"});
    if(id!==run)return;
    frame.getAnimations().forEach(function(animation){animation.cancel();});
    frame.style.opacity=0;
  }
  function changeWeek(direction){
    base.setDate(base.getDate()+direction*7);
    ++run;
    clean();
    frame.style.opacity=0;
    updateLabels();
    var text=dateText(selected);
    label.textContent=text[0];
    slotLabel.textContent=text[1];
    showSelected(selected,true);
    if(!reduce)days.forEach(function(day,index){
      day.animate([{opacity:.3,transform:"translateX("+(direction*10)+"px)"},{opacity:1,transform:"none"}],{duration:260,delay:index*20,easing:"ease-out",fill:"backwards"});
    });
  }
  root.querySelector('.uf-sb-previous').addEventListener('click',function(){changeWeek(-1);});
  root.querySelector('.uf-sb-next').addEventListener('click',function(){changeWeek(1);});
  window.addEventListener('resize',function(){placePill(selected);});
  updateLabels();
  var initialText=dateText(selected);
  label.textContent=initialText[0];
  slotLabel.textContent=initialText[1];
  requestAnimationFrame(function(){showSelected(selected,false);});
})();`,
  }),
};
