const moods = {
  great: {
    emoji:"😊", title:"Qué bonito saber que estás bien.", text:"Disfruta este momento. También puedes guardarlo para recordarlo en días más difíciles.",
    wisdomType:"Para celebrar este momento", wisdom:"La alegría también merece un espacio. Permítete disfrutar lo que hoy está bien.",
    tools:[
      ["💛","Tres cosas buenas","Guarda tres cosas que hoy quieres recordar.","journal"],
      ["✨","Luciérnagas","Un juego breve para disfrutar el presente.","game"],
      ["🌱","Pequeño propósito","Elige una cosa que quieras cuidar hoy.","activate"]
    ]
  },
  good: {
    emoji:"🙂", title:"Parece que hoy tienes un poco de calma.", text:"Quédate un momento aquí. Podemos ayudarte a cuidar este equilibrio.",
    wisdomType:"Una palabra para ti", wisdom:"No necesitas estar perfecto para estar avanzando.",
    tools:[
      ["🌬️","Respirar conmigo","Una pausa de un minuto para bajar el ritmo.","breathing"],
      ["✨","Luciérnagas","Lleva suavemente tu atención al presente.","game"],
      ["📖","Escribir un momento","Pon en palabras lo que quieres conservar de hoy.","journal"]
    ]
  },
  okay: {
    emoji:"😐", title:"Hay días que simplemente son así.", text:"No tienes que decidir ahora mismo cómo sentirte. Primero podemos escuchar lo que necesitas.",
    wisdomType:"Para este momento", wisdom:"Haz una cosa pequeña. A veces eso es suficiente para empezar.",
    tools:[
      ["🧠","Ordenar mi mente","Separa lo que puedes resolver de lo que puede esperar.","thoughts"],
      ["🌬️","Respirar conmigo","Un pequeño descanso antes de continuar.","breathing"],
      ["✨","Luciérnagas","Cambia el foco sin exigirte nada.","game"]
    ]
  },
  sad: {
    emoji:"😔", title:"Está bien no estar bien.", text:"No tienes que resolverlo todo ahora. Podemos ir paso a paso.",
    wisdomType:"Una palabra para ti", wisdom:"Lo que sientes merece ser escuchado. No tienes que cargarlo todo de una vez.",
    tools:[
      ["🌬️","Respirar conmigo","Empecemos por hacer espacio para una respiración tranquila.","breathing"],
      ["🧠","Sacar lo que tengo dentro","Escribe sin filtros aquello que pesa.","thoughts"],
      ["✨","Luciérnagas","Una actividad suave para volver al presente.","game"],
      ["🫶","Buscar compañía","A veces acompañarnos es parte de cuidarnos.","connect"]
    ]
  },
  "very-sad": {
    emoji:"😣", title:"Gracias por decir cómo estás.", text:"No tienes que atravesar este momento solo. Primero vamos a buscar un poco de calma y seguridad.",
    wisdomType:"Ahora mismo", wisdom:"Un minuto a la vez. Quédate cerca de alguien seguro si puedes.",
    tools:[
      ["🌬️","Respirar conmigo","Vamos a bajar el ritmo juntos, sin prisa.","breathing"],
      ["🫧","Burbuja de calma","Sigue el movimiento y concéntrate solamente en tu respiración.","breathing"],
      ["🫶","Buscar compañía","Contacta a una persona de confianza.","connect"],
      ["🤍","Necesito ayuda","Si estás en peligro inmediato, busca ayuda ahora.","help"]
    ]
  }
};

const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const rain = document.getElementById("rain");
const stars = document.getElementById("stars");
let currentMood = "neutral";
let breathingTimer = null;
let fireflyScore = 0;

function makeAmbient(){
  for(let i=0;i<85;i++){
    const d=document.createElement("i"); d.className="drop";
    d.style.left=Math.random()*110+"%";
    d.style.animationDuration=(.65+Math.random()*1.1)+"s";
    d.style.animationDelay=(-Math.random()*2)+"s";
    d.style.height=(38+Math.random()*48)+"px";
    d.style.opacity=.25+Math.random()*.55;
    rain.appendChild(d);
  }
  for(let i=0;i<55;i++){
    const s=document.createElement("i"); s.className="star";
    s.style.left=Math.random()*100+"%"; s.style.top=Math.random()*75+"%";
    s.style.animationDelay=(-Math.random()*3)+"s";
    stars.appendChild(s);
  }
}
makeAmbient();

function showScreen(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  navItems.forEach(n=>n.classList.toggle("active",n.dataset.go===id || (id==="homeScreen"&&n.dataset.go==="homeScreen")));
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderMood(mood){
  currentMood=mood;
  document.body.dataset.mood=mood;
  const data=moods[mood];
  document.getElementById("selectedMood").textContent=data.emoji;
  document.getElementById("supportTitle").textContent=data.title;
  document.getElementById("supportText").textContent=data.text;
  document.getElementById("wisdomType").textContent=data.wisdomType;
  document.getElementById("wisdomText").textContent=data.wisdom;
  document.getElementById("supportEyebrow").textContent=mood==="very-sad"?"VAMOS A CUIDARTE":"PARA ESTE MOMENTO";
  showScreen("supportScreen");
}

function renderTools(){
  const data=moods[currentMood] || moods.okay;
  const list=document.getElementById("toolList");
  list.innerHTML="";
  data.tools.slice(0,5).forEach(([icon,title,desc,action])=>{
    const b=document.createElement("button"); b.className="tool-card";
    b.innerHTML=`<span class="tool-icon">${icon}</span><span><strong>${title}</strong><small>${desc}</small></span>`;
    b.addEventListener("click",()=>runAction(action));
    list.appendChild(b);
  });
  document.getElementById("toolsIntro").textContent=`Estas opciones están pensadas para cuando te sientes ${currentMood==="great"?"muy bien":currentMood==="good"?"bien":currentMood==="okay"?"regular":currentMood==="sad"?"mal":"muy mal"}.`;
  showScreen("toolsScreen");
}

function runAction(action){
  if(action==="breathing"){setupActivity("🌬️","PAUSA","Respirar conmigo","Inhala cuando la esfera crezca y exhala cuando vuelva a hacerse pequeña.");}
  else if(action==="game") setupGame();
  else if(action==="journal"||action==="thoughts"){showScreen("journalScreen"); document.getElementById("journalText").placeholder=action==="thoughts"?"Escribe qué está ocupando espacio en tu cabeza...":"Hoy necesito decir que...";}
  else if(action==="connect") showScreen("connectScreen");
  else if(action==="help") showScreen("helpScreen");
  else setupActivity("🌱","PEQUEÑO PASO","Haz una cosa posible","Elige una acción pequeña y amable que puedas hacer durante los próximos cinco minutos.");
}

function setupActivity(icon,label,title,desc){
  document.getElementById("activityIcon").textContent=icon;
  document.getElementById("activityLabel").textContent=label;
  document.getElementById("activityTitle").textContent=title;
  document.getElementById("activityDescription").textContent=desc;
  document.getElementById("activityMessage").textContent="";
  document.getElementById("activityStart").textContent=title.includes("Respirar")?"Comenzar":"Empezar";
  document.getElementById("breathingOrb").classList.remove("breathe");
  showScreen("activityScreen");
}

document.getElementById("moodGrid").addEventListener("click",e=>{
  const card=e.target.closest(".mood-card"); if(card) renderMood(card.dataset.mood);
});
document.getElementById("helpBtn").addEventListener("click",renderTools);
document.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>showScreen(el.dataset.go)));
document.getElementById("menuBtn").addEventListener("click",()=>showScreen("allToolsScreen"));

document.getElementById("activityStart").addEventListener("click",()=>{
  const orb=document.getElementById("breathingOrb");
  const msg=document.getElementById("activityMessage");
  if(orb.classList.contains("breathe")){
    orb.classList.remove("breathe"); clearInterval(breathingTimer); breathingTimer=null; msg.textContent="Muy bien. Quédate con una respiración tranquila.";
    return;
  }
  orb.classList.add("breathe");
  let phase=true;
  msg.textContent="Inhala…";
  breathingTimer=setInterval(()=>{phase=!phase;msg.textContent=phase?"Inhala…":"Exhala…";},4000);
});

document.querySelectorAll(".category-card").forEach(c=>c.addEventListener("click",()=>runAction(c.dataset.action)));

document.getElementById("saveJournal").addEventListener("click",()=>{
  const text=document.getElementById("journalText").value.trim();
  if(!text){showToast("Escribe algo primero.");return;}
  localStorage.setItem("mente_journal",JSON.stringify({text,date:new Date().toISOString(),mood:currentMood}));
  document.getElementById("savedNote").textContent="✓ Guardado en este dispositivo.";
  showToast("Tu momento quedó guardado.");
});

function setupGame(){
  showScreen("gameScreen"); fireflyScore=0; updateScore(); spawnFirefly();
}
function updateScore(){document.getElementById("gameScore").textContent=`${fireflyScore} ${fireflyScore===1?"luz encontrada":"luces encontradas"}`;}
function spawnFirefly(){
  const field=document.getElementById("fireflyField"); field.innerHTML="";
  const b=document.createElement("button"); b.className="firefly"; b.setAttribute("aria-label","Luciérnaga");
  b.style.left=(8+Math.random()*82)+"%"; b.style.top=(8+Math.random()*78)+"%";
  b.addEventListener("click",()=>{fireflyScore++;updateScore();spawnFirefly();});
  field.appendChild(b);
}
document.getElementById("newFirefly").addEventListener("click",spawnFirefly);

document.getElementById("soundBtn").addEventListener("click",()=>{
  showToast("El ambiente sonoro se activará desde aquí en la siguiente etapa.");
});

function showToast(text){
  const t=document.getElementById("toast");t.textContent=text;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2400);
}
