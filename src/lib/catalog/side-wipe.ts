import { type Item } from "./types";

export const sideWipeItem: Item = {
  slug: "side-wipe-date-picker",
  name: "Side Wipe",
  kind: "component",
  category: "date-pickers",
  description: "A weekly date picker with directional color wipes on date selection.",
  controls: [],
  defaults: { bg: "#0D0D16" },
  added: 91,
  build: () => ({
    html: `<div class="uf-side-wipe"><div class="uf-sw-card"><div class="uf-sw-header"><b class="uf-sw-month">November 2026</b><span class="uf-sw-nav"><button type="button" class="uf-sw-previous" aria-label="Previous week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"></path></svg></button><button type="button" class="uf-sw-next" aria-label="Next week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg></button></span></div><div class="uf-sw-strip"><div class="uf-sw-pill uf-sw-ghost"></div><div class="uf-sw-pill uf-sw-selection"></div></div><div class="uf-sw-footer"><span class="uf-sw-label">Mon, Nov 16</span><span class="uf-sw-slots">5 slots</span></div></div></div>`,
    css: `.uf-side-wipe { width:min(400px,calc(100% - 32px)); color:#f1f0fa; font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
.uf-sw-card { width:100%; padding:16px 14px; border:1px solid #25243a; border-radius:26px; background:#12121d; }
.uf-sw-header { display:flex; align-items:center; justify-content:space-between; padding:0 6px 12px; }
.uf-sw-header b { font-size:14px; letter-spacing:-.01em; }
.uf-sw-nav { display:flex; gap:6px; }
.uf-sw-nav button { display:grid; place-items:center; width:28px; height:28px; padding:0; border:0; border-radius:50%; background:none; color:#8d8ba8; cursor:pointer; -webkit-tap-highlight-color:transparent; }
.uf-sw-nav button:active { background:#ffffff12; }
.uf-sw-nav button:focus-visible,.uf-sw-day:focus-visible { outline:2px solid #38c8ff; outline-offset:2px; }
.uf-sw-nav svg { width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
.uf-sw-strip { position:relative; display:grid; grid-template-columns:repeat(7,1fr); padding:10px 6px; border:1px solid #ffffff0d; border-radius:20px; background:#1a1a29; }
.uf-sw-day { position:relative; z-index:3; display:grid; justify-items:center; gap:11px; padding:7px 0 9px; border:0; border-radius:19px; background:none; color:#dcdbec; cursor:pointer; font:inherit; -webkit-tap-highlight-color:transparent; }
.uf-sw-day i { color:#8d8ba8; font:600 11px system-ui,sans-serif; font-style:normal; transition:color .25s; }
.uf-sw-day b { font:700 20px/24px system-ui,sans-serif; transition:color .25s; }
.uf-sw-day.uf-sw-selected i,.uf-sw-day.uf-sw-selected b { color:#fff; }
.uf-sw-pill { position:absolute; z-index:2; width:38px; border-radius:19px; opacity:0; background:linear-gradient(180deg,#6c6cff,#3fa8ff); box-shadow:0 0 16px #4d78ff66; pointer-events:none; }
.uf-sw-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 8px 0; overflow:hidden; font-size:13px; }
.uf-sw-label { font-weight:600; }
.uf-sw-slots { color:#8d8ba8; font-size:12px; }
@media (prefers-reduced-motion:reduce) { .uf-sw-day i,.uf-sw-day b { transition:none; } }`,
    js: `(function(){
  var dayLetters=["S","M","T","W","T","F","S"];
  var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var root=document.querySelector('.uf-side-wipe');
  var strip=root.querySelector('.uf-sw-strip');
  var pill=root.querySelector('.uf-sw-selection');
  var ghost=root.querySelector('.uf-sw-ghost');
  var label=root.querySelector('.uf-sw-label');
  var slotLabel=root.querySelector('.uf-sw-slots');
  var monthLabel=root.querySelector('.uf-sw-month');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base=new Date(2026,10,15),selected=1,run=0,days=[],pillWidth=38;
  function animate(element,keyframes,options){return element.animate(keyframes,options).finished.catch(function(){});}
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
      day.className='uf-sw-day';
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
  function place(element,index){
    var position=geometry(index);
    element.style.left=position.center-pillWidth/2+"px";
    element.style.top=position.top+"px";
    element.style.height=position.height+"px";
  }
  function clean(){
    [pill,ghost].forEach(function(element){
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
    days.forEach(function(day,dayIndex){day.classList.toggle('uf-sw-selected',dayIndex===index);});
    place(pill,index);
    pill.style.opacity=1;
    if(animateSelection&&!reduce)pill.animate([{opacity:0,transform:"scale(.85)"},{opacity:1,transform:"scale(1)"}],{duration:280,easing:"ease-out"});
  }
  var visibleClip="inset(-20px -20px -20px -20px)";
  var goneLeft="inset(-20px -20px -20px calc(100% + 20px))";
  var goneRight="inset(-20px calc(100% + 20px) -20px -20px)";
  async function pick(index){
    if(index===selected)return;
    var id=++run,previous=selected,direction=index>previous?1:-1;
    selected=index;
    clean();
    days[previous].classList.remove('uf-sw-selected');
    if(reduce){
      showSelected(index,false);
      updateFooter(index);
      return;
    }
    updateFooter(index);
    place(ghost,previous);
    ghost.style.opacity=1;
    animate(ghost,[{clipPath:visibleClip},{clipPath:direction>0?goneLeft:goneRight}],{duration:300,easing:"cubic-bezier(.5,0,.5,1)",fill:"forwards"}).then(function(){
      if(id===run){
        ghost.getAnimations().forEach(function(animation){animation.cancel();});
        ghost.style.opacity=0;
      }
    });
    place(pill,index);
    pill.style.opacity=1;
    pill.animate([{clipPath:direction>0?goneRight:goneLeft},{clipPath:visibleClip}],{duration:340,delay:130,easing:"cubic-bezier(.4,0,.2,1)",fill:"backwards"});
    setTimeout(function(){if(id===run)days[index].classList.add('uf-sw-selected');},230);
  }
  function changeWeek(direction){
    base.setDate(base.getDate()+direction*7);
    ++run;
    clean();
    ghost.style.opacity=0;
    updateLabels();
    var text=dateText(selected);
    label.textContent=text[0];
    slotLabel.textContent=text[1];
    showSelected(selected,true);
    if(!reduce)days.forEach(function(day,index){
      day.animate([{opacity:.3,transform:"translateX("+(direction*10)+"px)"},{opacity:1,transform:"none"}],{duration:260,delay:index*20,easing:"ease-out",fill:"backwards"});
    });
  }
  root.querySelector('.uf-sw-previous').addEventListener('click',function(){changeWeek(-1);});
  root.querySelector('.uf-sw-next').addEventListener('click',function(){changeWeek(1);});
  window.addEventListener('resize',function(){place(pill,selected);});
  updateLabels();
  var initialText=dateText(selected);
  label.textContent=initialText[0];
  slotLabel.textContent=initialText[1];
  requestAnimationFrame(function(){showSelected(selected,false);});
})();`,
  }),
};
