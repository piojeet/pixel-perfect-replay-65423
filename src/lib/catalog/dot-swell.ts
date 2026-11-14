import { type Item } from "./types";

export const dotSwellItem: Item = {
  slug: "dot-swell-date-picker",
  name: "Dot Swell",
  kind: "component",
  category: "date-pickers",
  description: "A weekly date picker where a dot swells into the selected day capsule.",
  controls: [],
  defaults: { bg: "#0D0D16" },
  added: 92,
  build: () => ({
    html: `<div class="uf-dot-swell"><div class="uf-ds-card"><div class="uf-ds-header"><b class="uf-ds-month">November 2026</b><span class="uf-ds-nav"><button type="button" class="uf-ds-previous" aria-label="Previous week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"></path></svg></button><button type="button" class="uf-ds-next" aria-label="Next week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg></button></span></div><div class="uf-ds-strip"><div class="uf-ds-pill uf-ds-ghost"></div><div class="uf-ds-pill uf-ds-selection"></div></div><div class="uf-ds-footer"><span class="uf-ds-label">Mon, Nov 16</span><span class="uf-ds-slots">5 slots</span></div></div></div>`,
    css: `.uf-dot-swell { width:min(400px,calc(100% - 32px)); color:#f1f0fa; font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
.uf-ds-card { width:100%; padding:16px 14px; border:1px solid #25243a; border-radius:26px; background:#12121d; }
.uf-ds-header { display:flex; align-items:center; justify-content:space-between; padding:0 6px 12px; }
.uf-ds-header b { font-size:14px; letter-spacing:-.01em; }
.uf-ds-nav { display:flex; gap:6px; }
.uf-ds-nav button { display:grid; place-items:center; width:28px; height:28px; padding:0; border:0; border-radius:50%; background:none; color:#8d8ba8; cursor:pointer; -webkit-tap-highlight-color:transparent; }
.uf-ds-nav button:active { background:#ffffff12; }
.uf-ds-nav button:focus-visible,.uf-ds-day:focus-visible { outline:2px solid #38c8ff; outline-offset:2px; }
.uf-ds-nav svg { width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
.uf-ds-strip { position:relative; display:grid; grid-template-columns:repeat(7,1fr); padding:10px 6px; border:1px solid #ffffff0d; border-radius:20px; background:#1a1a29; }
.uf-ds-day { position:relative; z-index:3; display:grid; justify-items:center; gap:11px; padding:7px 0 9px; border:0; border-radius:19px; background:none; color:#dcdbec; cursor:pointer; font:inherit; -webkit-tap-highlight-color:transparent; }
.uf-ds-day i { color:#8d8ba8; font:600 11px system-ui,sans-serif; font-style:normal; transition:color .3s; }
.uf-ds-day b { font:700 20px/24px system-ui,sans-serif; transition:color .3s; }
.uf-ds-day.uf-ds-selected i,.uf-ds-day.uf-ds-selected b { color:#fff; }
.uf-ds-pill { position:absolute; z-index:2; width:38px; border-radius:19px; opacity:0; transform-origin:50% 100%; background:linear-gradient(180deg,#6c6cff,#3fa8ff); box-shadow:0 0 14px #4d78ff66; pointer-events:none; }
.uf-ds-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 8px 0; overflow:hidden; font-size:13px; }
.uf-ds-label { font-weight:600; }
.uf-ds-slots { color:#8d8ba8; font-size:12px; }
@media (prefers-reduced-motion:reduce) { .uf-ds-day i,.uf-ds-day b { transition:none; } }`,
    js: `(function(){
  var dayLetters=["S","M","T","W","T","F","S"];
  var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var root=document.querySelector('.uf-dot-swell');
  var strip=root.querySelector('.uf-ds-strip');
  var pill=root.querySelector('.uf-ds-selection');
  var ghost=root.querySelector('.uf-ds-ghost');
  var label=root.querySelector('.uf-ds-label');
  var slotLabel=root.querySelector('.uf-ds-slots');
  var monthLabel=root.querySelector('.uf-ds-month');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var base=new Date(2026,10,15),selected=1,run=0,days=[],pillWidth=38;
  var dotTransform="scale(.18,.11)";
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
      day.className='uf-ds-day';
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
    days.forEach(function(day,dayIndex){day.classList.toggle('uf-ds-selected',dayIndex===index);});
    place(pill,index);
    pill.style.opacity=1;
    if(animateSelection&&!reduce)pill.animate([{transform:"scale(.18,.11)"},{transform:"scale(1.06)",offset:.7},{transform:"scale(1)"}],{duration:480,easing:"cubic-bezier(.3,1.2,.5,1)"});
  }
  async function pick(index){
    if(index===selected)return;
    var id=++run,previous=selected;
    selected=index;
    clean();
    days[previous].classList.remove('uf-ds-selected');
    if(reduce){
      showSelected(index,false);
      updateFooter(index);
      return;
    }
    updateFooter(index);
    place(ghost,previous);
    ghost.style.opacity=1;
    animate(ghost,[
      {transform:"scale(1)",opacity:1,easing:"cubic-bezier(.5,0,.8,.4)"},
      {transform:dotTransform,opacity:1,offset:.55},
      {transform:dotTransform,opacity:1,offset:.75},
      {transform:"scale(.05)",opacity:0}
    ],{duration:520,fill:"forwards"}).then(function(){
      if(id===run){
        ghost.getAnimations().forEach(function(animation){animation.cancel();});
        ghost.style.opacity=0;
      }
    });
    place(pill,index);
    pill.style.opacity=1;
    pill.animate([
      {transform:"scale(0)",opacity:0,offset:0,easing:"ease-out"},
      {transform:dotTransform,opacity:1,offset:.14},
      {transform:dotTransform,opacity:1,offset:.3,easing:"cubic-bezier(.3,0,.2,1)"},
      {transform:"scale(1.07,1.05)",opacity:1,offset:.78,easing:"ease-in-out"},
      {transform:"scale(1)",opacity:1,offset:1}
    ],{duration:820});
    setTimeout(function(){if(id===run)days[index].classList.add('uf-ds-selected');},420);
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
  root.querySelector('.uf-ds-previous').addEventListener('click',function(){changeWeek(-1);});
  root.querySelector('.uf-ds-next').addEventListener('click',function(){changeWeek(1);});
  window.addEventListener('resize',function(){place(pill,selected);});
  updateLabels();
  var initialText=dateText(selected);
  label.textContent=initialText[0];
  slotLabel.textContent=initialText[1];
  requestAnimationFrame(function(){showSelected(selected,false);});
})();`,
  }),
};
