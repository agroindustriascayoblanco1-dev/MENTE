const moods={
great:{emoji:"😊",title:"Qué bonito sentirte así.",text:"Disfruta este momento sin sentir que tienes que aprovecharlo al máximo.",type:"PARA CELEBRAR ESTE MOMENTO",wisdom:"La alegría también merece un espacio. Permítete disfrutar lo que hoy está bien."},
good:{emoji:"🙂",title:"Parece que hoy hay un poco de calma.",text:"Quédate un momento aquí. También podemos ayudarte a cuidar este equilibrio.",type:"UNA PALABRA PARA TI",wisdom:"No necesitas estar perfecto para estar avanzando."},
okay:{emoji:"😐",title:"Hay días que simplemente son así.",text:"No tienes que decidir ahora mismo cómo sentirte. Primero podemos escuchar lo que necesitas.",type:"PARA ESTE MOMENTO",wisdom:"Haz una cosa pequeña. A veces eso es suficiente para empezar."},
sad:{emoji:"😔",title:"Está bien no estar bien.",text:"No tienes que resolverlo todo ahora. Podemos ir paso a paso.",type:"UNA PALABRA PARA TI",wisdom:"Lo que sientes merece ser escuchado. No tienes que cargarlo todo de una vez."},
"very-sad":{emoji:"😣",title:"Gracias por decir cómo estás.",text:"No tienes que atravesar este momento solo. Primero vamos a buscar un poco de calma y seguridad.",type:"AHORA MISMO",wisdom:"Un minuto a la vez. Quédate cerca de alguien seguro si puedes."}
};
const needs={
calm:{icon:"🌬️",title:"Quiero calmarme",desc:"Bajar un poco el ritmo y sentirme más tranquilo.",action:"breathing"},
express:{icon:"💭",title:"Quiero sacar lo que siento",desc:"Poner en palabras lo que pesa en mi cabeza.",action:"thoughts"},
connect:{icon:"🫶",title:"No quiero estar solo",desc:"Buscar una conexión segura con alguien.",action:"connect"},
distract:{icon:"✨",title:"Quiero distraerme",desc:"Llevar mi atención a algo suave y sencillo.",action:"game"},
activate:{icon:"🌱",title:"Quiero volver a activarme",desc:"Hacer un pequeño movimiento hacia adelante.",action:"activate"}
};
const moodNeeds={great:["activate","distract","express"],good:["calm","distract","activate"],okay:["calm","express","distract"],sad:["calm","express","connect","distract"],"very-sad":["connect","calm","express","distract"]};
let currentMood="okay",currentNeed=null,breathingTimer=null,phase=0,fireflyScore=0;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function showScreen(id){
  const el=$("#"+id); if(!el)return;
  $$(".screen").forEach(x=>x.classList.toggle("active",x.id===id));
  $$(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.go===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function setMood(m){
  currentMood=m; document.body.dataset.mood=m;
  const d=moods[m]; $("#selectedMood").textContent=d.emoji; $("#supportTitle").textContent=d.title; $("#supportText").textContent=d.text; $("#wisdomType").textContent=d.type; $("#wisdomText").textContent=d.wisdom; $("#supportEyebrow").textContent=m==="very-sad"?"VAMOS A CUIDARTE":"PARA ESTE MOMENTO";
  showScreen("supportScreen");
}
function renderNeeds(){
  const grid=$("#needsGrid"); grid.innerHTML="";
  (moodNeeds[currentMood]||moodNeeds.okay).forEach(k=>{
    const n=needs[k],b=document.createElement("button"); b.className="need-card"; b.dataset.need=k;
    b.innerHTML=`<b>${n.icon}</b><strong>${n.title}</strong><small>${n.desc}</small>`; grid.appendChild(b);
  }); showScreen("needsScreen");
}
function chooseNeed(k){
  currentNeed=k; const n=needs[k]; $("#recommendTitle").textContent=n.title; $("#recommendText").textContent="Empecemos con una sola cosa. No tienes que hacer más.";
  $("#recommendCard").innerHTML=`<div class="recommend-inner"><div class="recommend-icon">${n.icon}</div><div><h3>${n.title}</h3><p>${n.desc}</p></div></div><button class="primary-btn" id="recommendStart">Empezar ahora <span>→</span></button>`;
  const alt=$("#alternateTools"); alt.innerHTML="";
  (moodNeeds[currentMood]||[]).filter(x=>x!==k).slice(0,2).forEach(x=>{const a=needs[x],b=document.createElement("button");b.dataset.need=x;b.textContent=`También puedes: ${a.icon} ${a.title}`;alt.appendChild(b)});
  showScreen("toolsScreen");
}
function runAction(a){
  if(a==="breathing"){setupActivity("🌬️","PAUSA","Respirar conmigo","Inhala cuando la esfera crezca. Exhala cuando vuelva a hacerse pequeña.");}
  else if(a==="thoughts"){showScreen("journalScreen");}
  else if(a==="game"){setupGame();}
  else if(a==="connect"){showScreen("connectScreen");}
  else if(a==="help"){showScreen("helpScreen");}
  else{setupActivity("🌱","PEQUEÑO PASO","Haz una cosa posible","Elige una acción pequeña y amable que puedas hacer durante los próximos cinco minutos.");}
}
function setupActivity(icon,label,title,desc){
  clearInterval(breathingTimer);breathingTimer=null;phase=0;$("#activityIcon").textContent=icon;$("#activityLabel").textContent=label;$("#activityTitle").textContent=title;$("#activityDescription").textContent=desc;$("#activityMessage").textContent="";$("#breathingCount").textContent="";$("#breathingOrb").classList.remove("breathe");$("#breathingWord").textContent="Respira";$("#activityStart").textContent="Comenzar";showScreen("activityScreen");
}
function startBreathing(){
  const orb=$("#breathingOrb"),word=$("#breathingWord"),count=$("#breathingCount"),msg=$("#activityMessage");
  if(breathingTimer){clearInterval(breathingTimer);breathingTimer=null;orb.classList.remove("breathe");word.textContent="Pausa";msg.textContent="Quédate con una respiración tranquila.";$("#activityStart").textContent="Continuar";return}
  orb.classList.add("breathe");let step=0;$("#activityStart").textContent="Pausar";word.textContent="Inhala";msg.textContent="Inhala lentamente…";
  breathingTimer=setInterval(()=>{step++; if(step%2){word.textContent="Exhala";msg.textContent="Suelta el aire despacio…"}else{phase++;count.textContent=`Respiración ${Math.min(phase,5)} de 5`;word.textContent="Inhala";msg.textContent="Inhala lentamente…"} if(phase>=5){clearInterval(breathingTimer);breathingTimer=null;orb.classList.remove("breathe");word.textContent="Listo";$("#activityStart").textContent="Comenzar";msg.textContent="Terminaste. Quédate unos segundos aquí.";setTimeout(()=>showScreen("afterScreen"),800)}},4000);
}
function setupGame(){fireflyScore=0;$("#gameScore").textContent="0 luces encontradas";showScreen("gameScreen");spawnFirefly()}
function spawnFirefly(){const f=$("#fireflyField");f.innerHTML="";const b=document.createElement("button");b.className="firefly";b.setAttribute("aria-label","Luciérnaga");b.style.left=(7+Math.random()*85)+"%";b.style.top=(7+Math.random()*78)+"%";b.onclick=()=>{fireflyScore++;$("#gameScore").textContent=`${fireflyScore} ${fireflyScore===1?"luz encontrada":"luces encontradas"}`;spawnFirefly()};f.appendChild(b)}
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function ambient(){for(let i=0;i<75;i++){const d=document.createElement("i");d.className="drop";d.style.setProperty("--x",Math.random()*110+"%");d.style.animationDuration=(.65+Math.random()*1.1)+"s";d.style.animationDelay=(-Math.random()*2)+"s";$("#rain").appendChild(d)}for(let i=0;i<35;i++){const s=document.createElement("i");s.className="star";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*75+"%";s.style.animationDelay=(-Math.random()*3)+"s";$("#stars").appendChild(s)}}
document.addEventListener("DOMContentLoaded",()=>{
  ambient();
  document.addEventListener("click",e=>{
    const go=e.target.closest("[data-go]");if(go){e.preventDefault();showScreen(go.dataset.go);return}
    const mood=e.target.closest(".mood-card");if(mood){e.preventDefault();setMood(mood.dataset.mood);return}
    const need=e.target.closest(".need-card,[data-need]");if(need){e.preventDefault();chooseNeed(need.dataset.need);return}
    const cat=e.target.closest(".category-card");if(cat){e.preventDefault();runAction(cat.dataset.action);return}
    if(e.target.closest("#helpBtn")){e.preventDefault();showScreen("helpScreen");return}
    if(e.target.closest("#recommendStart")){e.preventDefault();runAction(needs[currentNeed]?.action);return}
    if(e.target.closest("#activityStart")){e.preventDefault();startBreathing();return}
    if(e.target.closest("#activityDone")){e.preventDefault();clearInterval(breathingTimer);breathingTimer=null;showScreen("afterScreen");return}
    if(e.target.closest("#newFirefly")){e.preventDefault();spawnFirefly();return}
    if(e.target.closest("#menuBtn")){e.preventDefault();showScreen("allToolsScreen");return}
    if(e.target.closest("#saveJournal")){e.preventDefault();const t=$("#journalText").value.trim();if(!t){toast("Escribe algo primero.");return}localStorage.setItem("mente_journal",t);$("#savedNote").textContent="✓ Guardado en este dispositivo.";toast("Guardado.");return}
    const after=e.target.closest("[data-after]");if(after){const r={better:"Me alegra que haya cambiado un poquito. Un pequeño cambio también cuenta. 💛",same:"Está bien. No todo cambia en un solo momento. Podemos probar otra cosa.",worse:"Gracias por decirlo. Si se siente demasiado difícil, busca compañía y ayuda humana ahora."};$("#afterResponse").textContent=r[after.dataset.after];$("#afterEmoji").textContent=after.dataset.after==="better"?"🌤️":after.dataset.after==="same"?"🌱":"🫶";return}
  });
  const saved=localStorage.getItem("mente_journal");if(saved)$("#journalText").value=saved;
});
