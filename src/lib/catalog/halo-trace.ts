import { alpha, type Item } from "./types";

export const haloTraceItem: Item = {
  slug: "halo-trace-date-picker",
  name: "Halo Trace Date Picker",
  kind: "component",
  category: "date-pickers",
  description: "A compact weekly date picker with a glowing selection halo and availability counts.",
  controls: ["primary", "secondary", "bg", "animation"],
  defaults: { primary: "#6C6CFF", secondary: "#3FA8FF", bg: "#0D0D16" },
  added: 88,
  build: (p) => ({
    html: `<div class="uf-halo-trace"><div class="uf-ht-card"><div class="uf-ht-header"><b class="uf-ht-month">November 2026</b><span class="uf-ht-nav"><button type="button" class="uf-ht-previous" aria-label="Previous week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"></path></svg></button><button type="button" class="uf-ht-next" aria-label="Next week"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg></button></span></div><div class="uf-ht-strip"><div class="uf-ht-pill"></div><svg class="uf-ht-trace" aria-hidden="true"><defs><linearGradient id="uf-ht-gradient" class="uf-ht-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="72"><stop offset="0" stop-color="${p.secondary}"></stop><stop offset="1" stop-color="${p.primary}"></stop></linearGradient></defs><rect class="uf-ht-trace-draw" pathLength="100"></rect><rect class="uf-ht-trace-spark" pathLength="100"></rect></svg><div class="uf-ht-press"></div></div><div class="uf-ht-footer"><span class="uf-ht-label">Mon, Nov 16</span><span class="uf-ht-slots">5 slots</span></div></div></div>`,
    css: `.uf-halo-trace { width:min(400px,100%); color:#f1f0fa; font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
.uf-ht-card { width:100%; padding:16px 14px; border:1px solid #25243a; border-radius:26px; background:#12121d; }
.uf-ht-header { display:flex; align-items:center; justify-content:space-between; padding:0 6px 12px; }
.uf-ht-header b { font-size:14px; letter-spacing:-.01em; }
.uf-ht-nav { display:flex; gap:6px; }
.uf-ht-nav button { display:grid; place-items:center; width:28px; height:28px; padding:0; border:0; border-radius:50%; background:none; color:#8d8ba8; cursor:pointer; -webkit-tap-highlight-color:transparent; }
.uf-ht-nav button:active { background:#ffffff12; }
.uf-ht-nav button:focus-visible,.uf-ht-day:focus-visible { outline:2px solid ${p.secondary}; outline-offset:2px; }
.uf-ht-nav svg { width:16px; height:16px; fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; }
.uf-ht-strip { position:relative; display:grid; grid-template-columns:repeat(7,1fr); padding:10px 6px; border:1px solid #ffffff0d; border-radius:20px; background:#1a1a29; }
.uf-ht-day { position:relative; z-index:2; display:grid; justify-items:center; gap:11px; padding:7px 0 9px; border:0; border-radius:19px; background:none; color:#dcdbec; cursor:pointer; font:inherit; -webkit-tap-highlight-color:transparent; }
.uf-ht-day i { color:#8d8ba8; font:600 11px system-ui,sans-serif; font-style:normal; ${p.animation ? "transition:color .3s;" : "transition:none;"} }
.uf-ht-day b { font:700 20px/24px system-ui,sans-serif; ${p.animation ? "transition:color .3s;" : "transition:none;"} }
.uf-ht-day.uf-ht-selected i,.uf-ht-day.uf-ht-selected b { color:#fff; }
.uf-ht-pill { position:absolute; z-index:1; width:38px; border-radius:19px; opacity:0; background:linear-gradient(180deg,${p.primary},${p.secondary}); box-shadow:inset 0 0 0 2px ${p.secondary},0 0 18px ${alpha(p.secondary,.53)}; }
.uf-ht-press { display:none; }
.uf-ht-trace { position:absolute; z-index:3; overflow:visible; pointer-events:none; opacity:0; }
.uf-ht-trace-draw { fill:none; stroke:url(#uf-ht-gradient); stroke-width:2.5; stroke-dasharray:100 100; stroke-dashoffset:100; filter:drop-shadow(0 0 4px ${p.secondary}); }
.uf-ht-trace-spark { fill:none; stroke:#fff; stroke-width:3.5; stroke-linecap:round; stroke-dasharray:2 98; stroke-dashoffset:0; opacity:0; filter:drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px ${p.secondary}); }
.uf-ht-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 8px 0; overflow:hidden; font-size:13px; }
.uf-ht-label { font-weight:600; }
.uf-ht-slots { color:#8d8ba8; font-size:12px; }
@media (prefers-reduced-motion:reduce) { .uf-ht-day i,.uf-ht-day b { transition:none; } }`,
    js: `(function(){
  var dayLetters=["S","M","T","W","T","F","S"];
  var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var root=document.querySelector('.uf-halo-trace');
  var strip=root.querySelector('.uf-ht-strip');
  var pill=root.querySelector('.uf-ht-pill');
  var trace=root.querySelector('.uf-ht-trace');
  var traceDraw=root.querySelector('.uf-ht-trace-draw');
  var traceSpark=root.querySelector('.uf-ht-trace-spark');
  var press=root.querySelector('.uf-ht-press');
  var label=root.querySelector('.uf-ht-label');
  var slotLabel=root.querySelector('.uf-ht-slots');
  var monthLabel=root.querySelector('.uf-ht-month');
  var gradient=root.querySelector('.uf-ht-gradient');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches||${!p.animation};
  var base=new Date(2026,10,15),selected=1,run=0,days=[];
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
      day.className='uf-ht-day';
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
    var day=days[index],number=day.lastChild;
    return {center:day.offsetLeft+day.offsetWidth/2,top:day.offsetTop,height:day.offsetHeight,numberY:day.offsetTop+number.offsetTop+number.offsetHeight/2};
  }
  function placePill(index){
    var position=geometry(index);
    pill.style.left=position.center-19+"px";
    pill.style.top=position.top+"px";
    pill.style.height=position.height+"px";
  }
  function placePress(index){
    var position=geometry(index);
    press.style.left=position.center-17+"px";
    press.style.top=position.numberY-17+"px";
  }
  function placeTrace(index){
    var position=geometry(index),height=position.height+8;
    trace.style.left=position.center-23+"px";
    trace.style.top=position.top-4+"px";
    trace.setAttribute("width",46);
    trace.setAttribute("height",height);
    gradient.setAttribute("y2",height);
    [traceDraw,traceSpark].forEach(function(rect){
      rect.setAttribute("x",4);
      rect.setAttribute("y",4);
      rect.setAttribute("width",38);
      rect.setAttribute("height",position.height);
      rect.setAttribute("rx",19);
    });
  }
  function clean(){
    [pill,trace,traceDraw,traceSpark,press].forEach(function(element){
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
    days.forEach(function(day,dayIndex){day.classList.toggle('uf-ht-selected',dayIndex===index);});
    placePill(index);
    pill.style.opacity=1;
    if(animateSelection&&!reduce)pill.animate([{clipPath:"circle(0% at 50% 50%)"},{clipPath:"circle(80% at 50% 50%)"}],{duration:380,easing:"cubic-bezier(.3,0,.2,1)"});
  }
  async function pick(index){
    if(index===selected)return;
    var id=++run,previous=selected;
    clean();
    trace.style.opacity=0;
    days[previous].classList.remove('uf-ht-selected');
    if(reduce){
      selected=index;
      showSelected(index,false);
      updateFooter(index);
      return;
    }
    placePress(index);
    press.style.opacity=1;
    press.animate([{opacity:0,transform:"scale(.5)"},{opacity:1,transform:"scale(1)"}],{duration:150,easing:"ease-out"});
    await animate(pill,[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(.88)"}],{duration:190,fill:"forwards"});
    if(id!==run)return;
    selected=index;
    updateFooter(index);
    pill.style.opacity=0;
    pill.getAnimations().forEach(function(animation){animation.cancel();});
    placePill(index);
    placeTrace(index);
    trace.style.opacity=1;
    var traceOptions={duration:620,easing:"cubic-bezier(.45,0,.3,1)",fill:"forwards"};
    traceDraw.animate([{strokeDashoffset:100},{strokeDashoffset:0}],traceOptions);
    traceSpark.animate([{strokeDashoffset:0,opacity:1},{strokeDashoffset:-98,opacity:1,offset:.94},{strokeDashoffset:-98,opacity:0}],traceOptions);
    await new Promise(function(resolve){setTimeout(resolve,600);});
    if(id!==run)return;
    days[index].classList.add('uf-ht-selected');
    pill.style.opacity=1;
    pill.animate([{clipPath:"circle(0% at 50% 50%)"},{clipPath:"circle(80% at 50% 50%)"}],{duration:400,easing:"cubic-bezier(.3,0,.2,1)"});
    animate(press,[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(1.35)"}],{duration:260,fill:"forwards"});
    await animate(trace,[{opacity:1},{opacity:0}],{duration:320,fill:"forwards"});
    if(id!==run)return;
    clean();
    trace.style.opacity=0;
    press.style.opacity=0;
  }
  function changeWeek(direction){
    base.setDate(base.getDate()+direction*7);
    ++run;
    clean();
    press.style.opacity=0;
    trace.style.opacity=0;
    updateLabels();
    var text=dateText(selected);
    label.textContent=text[0];
    slotLabel.textContent=text[1];
    showSelected(selected,true);
    if(!reduce)days.forEach(function(day,index){
      day.animate([{opacity:.3,transform:"translateX("+(direction*10)+"px)"},{opacity:1,transform:"none"}],{duration:260,delay:index*20,easing:"ease-out",fill:"backwards"});
    });
  }
  root.querySelector('.uf-ht-previous').addEventListener('click',function(){changeWeek(-1);});
  root.querySelector('.uf-ht-next').addEventListener('click',function(){changeWeek(1);});
  window.addEventListener('resize',function(){placePill(selected);});
  updateLabels();
  var initialText=dateText(selected);
  label.textContent=initialText[0];
  slotLabel.textContent=initialText[1];
  requestAnimationFrame(function(){showSelected(selected,false);});
})();`,
  }),
};
