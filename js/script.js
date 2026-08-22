const moods={
great:{emoji:"😊",title:"Qué bonito saber que estás bien.",text:"Disfruta este momento. También puedes guardarlo para recordarlo en días más difíciles.",type:"PARA CELEBRAR ESTE MOMENTO",wisdom:"La alegría también merece un espacio. Permítete disfrutar lo que hoy está bien."},
good:{emoji:"🙂",title:"Parece que hoy tienes un poco de calma.",text:"Quédate un momento aquí. Podemos ayudarte a cuidar este equilibrio.",type:"UNA PALABRA PARA TI",wisdom:"No necesitas estar perfecto para estar avanzando."},
okay:{emoji:"😐",title:"Hay días que simplemente son así.",text:"No tienes que decidir ahora mismo cómo sentirte. Primero podemos escuchar lo que necesitas.",type:"PARA ESTE MOMENTO",wisdom:"Haz una cosa pequeña. A veces eso es suficiente para empezar."},
sad:{emoji:"😔",title:"Está bien no estar bien.",text:"No tienes que resolverlo todo ahora. Podemos ir paso a paso.",type:"UNA PALABRA PARA TI",wisdom:"Lo que sientes merece ser escuchado. No tienes que cargarlo todo de una vez."},
"very-sad":{emoji:"😣",title:"Gracias por decir cómo estás.",text:"No tienes que atravesar este momento solo. Primero vamos a buscar un poco de calma y seguridad.",type:"AHORA MISMO",wisdom:"Un minuto a la vez. Quédate cerca de alguien seguro si puedes."}
};

const needs={
calm:{icon:"🌬️",title:"Calmarme",desc:"Bajar un poco el ritmo y sentirme más tranquilo.",action:"breathing"},
express:{icon:"🧠",title:"Sacar lo que tengo dentro",desc:"Poner en palabras lo que pesa en mi cabeza.",action:"thoughts"},
connect:{icon:"🫶",title:"Sentirme acompañado",desc:"Buscar una conexión segura con alguien.",action:"connect"},
distract:{icon:"✨",title:"Distraerme un momento",desc:"Llevar mi atención a algo suave y sencillo.",action:"game"},
activate:{icon:"🌱",title:"Volver a activarme",desc:"Hacer un pequeño movimiento hacia adelante.",action:"activate"}
};

const moodNeeds={
great:["activate","distract","express"],good:["calm","distract","activate"],okay:["calm","express","distract"],sad:["calm","express","connect","distract"],"very-sad":["calm","connect","distract"]
};

let currentMood="neutral",currentNeed=null,breathingInterval=null,breathCycle=0,fireflyScore=0;

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const screens=$$(".screen"),nav=$$(".nav-item");

function showScreen(id){
 screens.forEach(x=>x.classList.toggle("active",x.id===id));
 nav.forEach(x=>x.classList.toggle("active",x.dataset.go===id||(id==="homeScreen"&&x.dataset.go==="homeScreen")));
 window.scrollTo({top:0,behavior:"smooth"});
}
function setMood(mood){
 currentMood=mood; document.body.dataset.mood=mood;
 const d=moods[mood];
 $("#selectedMood").textContent=d.emoji;$("#supportTitle").textContent=d.title;$("#supportText").textContent=d.text;
 $("#wisdomType").textContent=d.type;$("#wisdomText").textContent=d.wisdom;
 $("#supportEyebrow").textContent=mood==="very-sad"?"VAMOS A CUIDARTE":"PARA ESTE MOMENTO";
 showScreen("supportScreen");
}
function renderNeeds(){
 const list=$("#needsGrid");list.innerHTML="";
 (moodNeeds[currentMood]||moodNeeds.okay).forEach(k=>{
  const n=needs[k],b=document.createElement("button");b.className="need-card";
  b.innerHTML=`<b>${n.icon}</b><strong>${n.title}</strong><small>${n.desc}</small>`;
  b.onclick=()=>chooseNeed(k);list.appendChild(b);
 });
 showScreen("needsScreen");
}
function chooseNeed(key){
 currentNeed=key; const n=needs[key];
 $("#recommendTitle").textContent=n.title;
 $("#recommendText").textContent="No tienes que hacer muchas cosas. Empecemos con una sola.";
 $("#recommendCard").innerHTML=`<div class="recommend-inner"><div class="recommend-icon">${n.icon}</div><div><h3>${n.title}</h3><p>${n.desc}</p></div></div><button class="primary-btn" id="recommendStart">Empezar ahora</button>`;
 $("#recommendStart").onclick=()=>runAction(n.action);
 const alt=$("#alternateTools");alt.innerHTML="";
 const alternatives=(moodNeeds[currentMood]||[]).filter(x=>x!==key).slice(0,2);
 alternatives.forEach(k=>{const a=needs[k],b=document.createElement("button");b.textContent=`También puedo: ${a.icon} ${a.title}`;b.onclick=()=>chooseNeed(k);alt.appendChild(b)});
 showScreen("toolsScreen");
}
function runAction(action){
 if(action==="breathing"){setupActivity("🌬️","PAUSA","Respirar conmigo","Inhala cuando la esfera crezca. Exhala cuando vuelva a hacerse pequeña.");}
 else if(action==="game")setupGame();
 else if(action==="thoughts"){showScreen("journalScreen");$("#journalText").placeholder="Escribe qué está ocupando espacio en tu cabeza...";}
 else if(action==="connect")showScreen("connectScreen");
 else if(action==="help")showScreen("helpScreen");
 else setupActivity("🌱","PEQUEÑO PASO","Haz una cosa posible","Elige una acción pequeña y amable que puedas hacer durante los próximos cinco minutos.");
}
function setupActivity(icon,label,title,desc){
 $("#activityIcon").textContent=icon;$("#activityLabel").textContent=label;$("#activityTitle").textContent=title;$("#activityDescription").textContent=desc;
 $("#activityMessage").textContent="";$("#breathingCount").textContent="";$("#breathingOrb").classList.remove("breathe");$("#breathingWord").textContent="Respira";
 clearInterval(breathingInterval);breathingInterval=null;breathCycle=0;$("#activityStart").textContent="Comenzar";showScreen("activityScreen");
}
function startBreathing(){
 const orb=$("#breathingOrb"),word=$("#breathingWord"),count=$("#breathingCount"),msg=$("#activityMessage");
 if(breathingInterval){clearInterval(breathingInterval);breathingInterval=null;orb.classList.remove("breathe");word.textContent="Respira";msg.textContent="Muy bien. Quédate con una respiración tranquila.";return}
 orb.classList.add("breathe");breathCycle=0;let phase=0;msg.textContent="Inhala lentamente…";word.textContent="Inhala";
 breathingInterval=setInterval(()=>{
  phase++; if(phase%2===0){breathCycle++;count.textContent=`Respiración ${Math.min(breathCycle,5)} de 5`;word.textContent="Inhala";msg.textContent="Inhala lentamente…"}
  else{word.textContent="Exhala";msg.textContent="Suelta el aire despacio…"}
  if(breathCycle>=5){clearInterval(breathingInterval);breathingInterval=null;orb.classList.remove("breathe");word.textContent="Listo";msg.textContent="Terminaste. Quédate unos segundos aquí.";setTimeout(()=>showScreen("afterScreen"),900)}
 },4000);
}
function setupGame(){fireflyScore=0;updateScore();showScreen("gameScreen");spawnFirefly()}
function spawnFirefly(){const field=$("#fireflyField");field.innerHTML="";const b=document.createElement("button");b.className="firefly";b.setAttribute("aria-label","Luciérnaga");b.style.left=(7+Math.random()*85)+"%";b.style.top=(7+Math.random()*78)+"%";b.onclick=()=>{fireflyScore++;updateScore();spawnFirefly()};field.appendChild(b)}
function updateScore(){$("#gameScore").textContent=`${fireflyScore} ${fireflyScore===1?"luz encontrada":"luces encontradas"}`}
function showToast(text){const t=$("#toast");t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}

function ambient(){
 for(let i=0;i<90;i++){const d=document.createElement("i");d.className="drop";d.style.left=Math.random()*110+"%";d.style.animationDuration=(.65+Math.random()*1.1)+"s";d.style.animationDelay=(-Math.random()*2)+"s";d.style.height=(38+Math.random()*48)+"px";$("#rain").appendChild(d)}
 for(let i=0;i<60;i++){const s=document.createElement("i");s.className="star";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*75+"%";s.style.animationDelay=(-Math.random()*3)+"s";$("#stars").appendChild(s)}
}
ambient();

$("#moodGrid").onclick=e=>{const b=e.target.closest(".mood-card");if(b)setMood(b.dataset.mood)};
$("#helpBtn").onclick=renderNeeds;
$("#activityStart").onclick=startBreathing;
$("#activityDone").onclick=()=>{clearInterval(breathingInterval);breathingInterval=null;showScreen("afterScreen")};
$$("[data-go]").forEach(b=>b.onclick=()=>showScreen(b.dataset.go));
$("#menuBtn").onclick=()=>showScreen("allToolsScreen");
$$(".category-card").forEach(b=>b.onclick=()=>runAction(b.dataset.action));
$("#newFirefly").onclick=spawnFirefly;

$$("[data-after]").forEach(b=>b.onclick=()=>{
 const response={better:"Me alegra que haya cambiado un poquito. Un pequeño cambio también cuenta. 💛",same:"Está bien. No todo cambia en un solo momento. Podemos probar otra cosa.",worse:"Gracias por decírmelo. Si esto se siente demasiado difícil, busca compañía y considera pedir ayuda ahora."};
 $("#afterResponse").textContent=response[b.dataset.after];
 if(b.dataset.after==="worse")$("#afterEmoji").textContent="🫶";else if(b.dataset.after==="better")$("#afterEmoji").textContent="🌤️";else $("#afterEmoji").textContent="🌱";
});

$("#saveJournal").onclick=()=>{
 const text=$("#journalText").value.trim();if(!text){showToast("Escribe algo primero.");return}
 localStorage.setItem("mente_journal",JSON.stringify({text,date:new Date().toISOString(),mood:currentMood}));
 $("#savedNote").textContent="✓ Guardado en este dispositivo.";showToast("Tu momento quedó guardado.")
};
$("#soundBtn").onclick=()=>showToast("El ambiente sonoro será el siguiente módulo.");

const saved=localStorage.getItem("mente_journal");
if(saved)$("#journalText").value=JSON.parse(saved).text;
