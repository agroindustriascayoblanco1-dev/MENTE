(() => {
"use strict";

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

const moods = {
  "muy-bien": {i:"😊", t:"Qué bonito sentirte así.", x:"Disfruta este momento sin sentir que tienes que aprovecharlo al máximo.", w:"sunny", wt:"Un día luminoso", wx:"Quédate un momento aquí. No tienes que correr hacia lo siguiente.", r:"Conserva un poquito de este momento."},
  "bien": {i:"🌿", t:"Está bien.", x:"Gracias por decir cómo te sientes. Vamos paso a paso.", w:"calm", wt:"Un día tranquilo", wx:"No necesitas cambiarlo todo hoy. Un pequeño paso también cuenta.", r:"Una pequeña pausa."},
  "regular": {i:"🌤️", t:"Tiene sentido tener días así.", x:"No necesitas justificar lo que sientes. Podemos empezar por algo pequeño.", w:"cloudy", wt:"El cielo está un poco nublado", wx:"Que haya nubes no significa que el día esté perdido.", r:"Hoy puedes ir despacio."},
  "mal": {i:"🌧️", t:"Siento que estés pasando por esto.", x:"No vamos a exigirle a este momento más de lo que puede dar. Primero, bajemos el ritmo.", w:"rainy", wt:"Está lloviendo un poco", wx:"No tienes que arreglar la tormenta de una vez. Primero ponte a salvo y respira.", r:"Primero estabilizar, después decidir."},
  "muy-mal": {i:"🤍", t:"Gracias por contarlo.", x:"Ahora mismo no necesitas hacerlo todo. Busca compañía y concéntrate en el siguiente paso seguro.", w:"night", wt:"Hagamos una pausa", wx:"Cuando todo pesa, reducir el momento a un solo paso puede ayudar.", r:"Quédate con el siguiente minuto."}
};

const quotes = [
  ["Reflexión","Cada día puede comenzar de nuevo.","Una pausa también es avanzar."],
  ["Reflexión","No tienes que tener todo resuelto para seguir adelante.","Un paso pequeño sigue siendo un paso."],
  ["Versículo","“Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.”","Eclesiastés 3:1"],
  ["Versículo","“El Señor está cerca de los quebrantados de corazón.”","Salmos 34:18"],
  ["Versículo","“No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.”","Isaías 41:10"],
  ["Versículo","“Echa sobre el Señor tu carga, y él te sustentará.”","Salmos 55:22"],
  ["Versículo","“En paz me acostaré, y asimismo dormiré; porque solo tú, Señor, me haces vivir confiado.”","Salmos 4:8"],
  ["Versículo","“Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.”","Mateo 11:28"],
  ["Reflexión","Descansar no significa rendirse.","Tu bienestar también merece espacio."],
  ["Reflexión","No necesitas sentirte bien para empezar a cuidarte.","Empieza exactamente desde donde estás."]
];

const learn = {
  ansiedad:"La ansiedad es una respuesta de alarma del cuerpo y la mente. Puede aparecer ante una amenaza real o anticipada. A veces ayuda a prepararnos; cuando es intensa o persistente puede ser útil hablar con un profesional.",
  tdah:"En el TDAH pueden existir dificultades con atención, organización, memoria de trabajo y regulación del impulso. No significa falta de inteligencia ni de voluntad. Temporizadores, listas visibles y tareas pequeñas pueden ayudar.",
  rumiacion:"Rumiar es quedarse atrapado dando vueltas a un pensamiento sin llegar a una acción útil. Puedes escribirlo, separar lo que controlas de lo que no y elegir una acción pequeña.",
  emociones:"Las emociones aportan información y preparan al cuerpo para responder. No todas son instrucciones para actuar: puedes reconocer una emoción sin obedecerla inmediatamente."
};

let audioCtx = null;
let ambientSource = null;
let ambientGain = null;
let rainNoise = null;
let rainGain = null;
let breathTimer = null;
let focusTimer = null;
let focusSeconds = 600;
let fireflyTimer = null;
let fireflyCount = 0;
let bubbleCount = 0;

function toast(text){
  const e = $("#toast");
  if(!e) return;
  e.textContent = text;
  e.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(()=>e.classList.remove("show"),2400);
}

function nav(id){
  $$(".section").forEach(s=>s.classList.toggle("active",s.id===id));
  $$(".bottom button").forEach(b=>b.classList.toggle("active",b.dataset.section===id));
  window.scrollTo({top:0,behavior:"smooth"});
  closeMenu();
}

function openMenu(){ $("#drawer").classList.add("open"); $("#overlay").classList.add("show"); }
function closeMenu(){ $("#drawer").classList.remove("open"); $("#overlay").classList.remove("show"); }

function audioOn(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if(audioCtx.state==="suspended") audioCtx.resume();
  return audioCtx;
}

function beep(freq=520,duration=.09){
  if(!(window.AudioContext || window.webkitAudioContext)) return;
  const c=audioOn();
  const o=c.createOscillator(), g=c.createGain();
  o.type="sine"; o.frequency.value=freq;
  g.gain.setValueAtTime(.0001,c.currentTime);
  g.gain.exponentialRampToValueAtTime(.035,c.currentTime+.018);
  g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);
  o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime+duration+.02);
}

/* Ambiente sonoro: lluvia más suave y continua, generado localmente. */
function startRainSound(){
  if(rainNoise) return;
  const c=audioOn();
  const buffer=c.createBuffer(1,c.sampleRate*2,c.sampleRate);
  const data=buffer.getChannelData(0);
  let last=0;
  for(let i=0;i<data.length;i++){
    const white=Math.random()*2-1;
    last=last*.985+white*.015;
    data[i]=last;
  }
  rainNoise=c.createBufferSource();
  rainNoise.buffer=buffer; rainNoise.loop=true;
  const filter=c.createBiquadFilter(); filter.type="lowpass"; filter.frequency.value=4300;
  rainGain=c.createGain(); rainGain.gain.value=.025;
  rainNoise.connect(filter).connect(rainGain).connect(c.destination);
  rainNoise.start();
  $("#soundBtn").textContent="🔊";
}

function stopRainSound(){
  if(rainNoise){ try{rainNoise.stop()}catch(e){} rainNoise=null; }
  if($("#soundBtn")) $("#soundBtn").textContent="🔇";
}

function startSoftAmbient(){
  const c=audioOn();
  if(ambientSource) return;
  ambientSource=c.createOscillator();
  ambientSource.type="sine"; ambientSource.frequency.value=196;
  ambientGain=c.createGain(); ambientGain.gain.value=.008;
  ambientSource.connect(ambientGain).connect(c.destination);
  ambientSource.start();
}

function stopSoftAmbient(){
  if(ambientSource){try{ambientSource.stop()}catch(e){} ambientSource=null;}
}

function buildRain(){
  const layer=$("#rainLayer");
  if(!layer) return;
  layer.innerHTML="";
  for(let i=0;i<105;i++){
    const d=document.createElement("i");
    d.className="rain-drop";
    d.style.left=(Math.random()*108-4)+"%";
    d.style.height=(14+Math.random()*23)+"px";
    d.style.opacity=(.22+Math.random()*.62).toFixed(2);
    d.style.animationDuration=(.55+Math.random()*.7)+"s";
    d.style.animationDelay=(-Math.random()*2.2)+"s";
    layer.appendChild(d);
  }
}

function buildStars(){
  const layer=$("#starsLayer");
  if(!layer) return;
  for(let i=0;i<65;i++){
    const s=document.createElement("i");
    s.className="star";
    s.style.left=(Math.random()*100)+"%";
    s.style.top=(Math.random()*75)+"%";
    s.style.animationDelay=(Math.random()*3)+"s";
    layer.appendChild(s);
  }
}

function mood(m){
  const d=moods[m];
  if(!d) return;
  document.body.dataset.mood=m;
  $$(".moods button").forEach(b=>b.classList.toggle("selected",b.dataset.mood===m));
  $("#moodIcon").textContent=d.i;
  $("#moodTitle").textContent=d.t;
  $("#moodText").textContent=d.x;
  $("#weatherTitle").textContent=d.wt;
  $("#weatherText").textContent=d.wx;
  $("#weatherMode").textContent = m==="mal" ? "LLUVIA SUAVE" : m==="muy-mal" ? "NOCHE TRANQUILA" : m==="regular" ? "CIELO NUBLADO" : m==="muy-bien" ? "LUZ DE DÍA" : "AMBIENTE TRANQUILO";
  const step=["muy-bien","bien","regular","mal","muy-mal"].indexOf(m)+1;
  $("#moodStep").textContent=step;
  if(d.w==="rainy") startRainSound(); else stopRainSound();
  localStorage.setItem("menteMood",m);
  beep(m==="muy-mal"?220:m==="mal"?340:520);
}

function randomQuote(){
  const q=quotes[Math.floor(Math.random()*quotes.length)];
  $("#quoteKind").textContent=q[0]==="Versículo"?"PALABRA PARA HOY":"PARA ESTE MOMENTO";
  $("#quoteText").textContent=q[1];
  $("#quoteSource").textContent=q[2];
}

function wall(){
  const arr=[...quotes].sort(()=>Math.random()-.5).slice(0,8);
  $("#quoteWall").innerHTML=arr.map(q=>`
    <article class="quote-tile">
      <span>${escapeHtml(q[0])}</span>
      <p>${escapeHtml(q[1])}</p>
      <small>${escapeHtml(q[2])}</small>
    </article>`).join("");
}

function tool(name){
  nav("herramientas");
  setTimeout(()=>$("#tool-"+name)?.scrollIntoView({behavior:"smooth",block:"center"}),90);
}

function startBreath(){
  if(breathTimer) return;
  const phases=[["Inhala","inhale",4],["Sostén","hold",2],["Exhala","exhale",6]];
  let phase=0, left=phases[0][2];
  const update=()=>{
    $("#breath").className="breath "+phases[phase][1];
    $("#breathLabel").textContent=phases[phase][0];
    $("#breathTime").textContent=left+" s";
  };
  update();
  breathTimer=setInterval(()=>{
    left--;
    if(left<=0){phase=(phase+1)%phases.length;left=phases[phase][2];beep(phase===2?350:520);}
    update();
  },1000);
  toast("Sigue el círculo. Nada más.");
}

function stopBreath(){
  clearInterval(breathTimer); breathTimer=null;
  $("#breath").className="breath";
  $("#breathLabel").textContent="Listo"; $("#breathTime").textContent="0";
}

function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function setFocus(min){
  focusSeconds=min*60; $("#focusTime").textContent=fmt(focusSeconds);
  $$(".timer-options button").forEach(b=>b.classList.toggle("active",+b.dataset.min===min));
}
function startFocus(){
  if(focusTimer) return;
  focusTimer=setInterval(()=>{
    focusSeconds--;
    $("#focusTime").textContent=fmt(focusSeconds);
    if(focusSeconds<=0){
      clearInterval(focusTimer); focusTimer=null; beep(800,.25); toast("Terminaste. Ahora toma una pausa.");
    }
  },1000);
  toast("Enfoque iniciado.");
  beep(600);
}
function resetFocus(){
  clearInterval(focusTimer); focusTimer=null;
  setFocus(+$(" .timer-options .active")?.dataset.min||10);
}

function grounding(){
  const steps=[
    "5 cosas que puedes ver 👀",
    "4 cosas que puedes tocar ✋",
    "3 sonidos que puedes escuchar 👂",
    "2 olores que puedes notar 👃",
    "1 cosa que puedes saborear o imaginar 🍃"
  ];
  let i=0;
  const box=$("#grounding");
  box.innerHTML=`<p>${steps[0]}</p><button class="primary-btn" id="groundNext">Siguiente</button>`;
  $("#groundNext").onclick=()=>{
    i++;
    if(i>=steps.length){
      box.innerHTML="<p>Terminaste. Mira a tu alrededor y nota que estás aquí, ahora. 🤍</p>";
      beep(650);
    }else{
      box.querySelector("p").textContent=steps[i];
      beep(480);
    }
  };
}

const proactiveText={
  cuerpo:"Haz un chequeo amable: toma agua, come si lo necesitas, revisa cuánto has dormido y mueve el cuerpo durante un par de minutos. A veces cuidar lo básico cambia mucho el nivel de tensión.",
  pausa:"Pon un temporizador de 2 minutos. Deja el teléfono, baja los hombros y mira por una ventana o un punto lejano. No tienes que producir nada durante esa pausa.",
  prioridad:"Pregúntate: “¿Qué es lo único que sí necesito mover hoy?”. Escríbelo en una frase y deja lo demás para después.",
  conexion:"Piensa en una persona segura y envíale un mensaje sencillo: “Hoy estoy un poco saturado/a, ¿puedes hablar conmigo un momento?” No necesitas explicar todo."
};

function renderTrusted(){
  const saved=JSON.parse(localStorage.getItem("menteTrusted")||"null");
  const box=$("#trustedContact");
  if(!saved){box.innerHTML="";return;}
  box.innerHTML=`<div class="saved-contact"><div><b>🫂 ${escapeHtml(saved.name)}</b><small>${escapeHtml(saved.phone)}</small></div><a class="call-btn" href="tel:${escapeHtml(saved.phone)}">Llamar</a></div>`;
}

function saveTrusted(){
  const name=$("#trustedName").value.trim(), phone=$("#trustedPhone").value.trim();
  if(!name||!phone){toast("Completa el nombre y teléfono.");return;}
  localStorage.setItem("menteTrusted",JSON.stringify({name,phone}));
  $("#trustedName").value=""; $("#trustedPhone").value="";
  renderTrusted(); toast("Contacto guardado en este dispositivo.");
}

function saveDiary(){
  const text=$("#diaryText").value.trim();
  if(!text){toast("Escribe algo antes de guardar.");return;}
  const entries=JSON.parse(localStorage.getItem("menteDiary")||"[]");
  entries.unshift({date:new Date().toLocaleString("es-HN",{dateStyle:"medium",timeStyle:"short"}),m:$("#diaryMood").value,t:text});
  localStorage.setItem("menteDiary",JSON.stringify(entries.slice(0,50)));
  $("#diaryText").value=""; renderDiary(); toast("Entrada guardada.");
}

function renderDiary(){
  const entries=JSON.parse(localStorage.getItem("menteDiary")||"[]");
  $("#entries").innerHTML=entries.length ? entries.map(e=>`
    <article class="entry">
      <div class="entry-head"><b>${escapeHtml(e.m)}</b><small>${escapeHtml(e.date)}</small></div>
      <p>${escapeHtml(e.t)}</p>
    </article>`).join("") : '<p class="muted">Todavía no hay entradas.</p>';
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

function startFireflies(){
  const field=$("#fireflyField");
  field.innerHTML="";
  fireflyCount=0; $("#gameScore").textContent="0 / 12"; $("#gameMessage").textContent="Sigue una luz. No hay prisa.";
  spawnFirefly();
}

function spawnFirefly(){
  if(fireflyCount>=12){
    $("#gameMessage").textContent="Terminaste. Toma una respiración lenta. 🌿";
    toast("Juego completado.");
    return;
  }
  const field=$("#fireflyField");
  const f=document.createElement("button");
  f.className="firefly"; f.setAttribute("aria-label","Luciérnaga");
  const x=8+Math.random()*84, y=10+Math.random()*78;
  f.style.left=x+"%"; f.style.top=y+"%";
  f.style.animationDelay=(Math.random()*1.4)+"s";
  f.onclick=()=>{
    beep(620+fireflyCount*10,.07);
    f.remove(); fireflyCount++;
    $("#gameScore").textContent=fireflyCount+" / 12";
    $("#gameMessage").textContent=fireflyCount<12 ? "Bien. Suelta el aire y busca la siguiente." : "Muy bien. Quédate unos segundos aquí.";
    setTimeout(spawnFirefly,220);
  };
  field.appendChild(f);
}

function resetFireflies(){
  clearTimeout(fireflyTimer);
  $("#fireflyField").innerHTML=`<div class="game-start"><span>🌌</span><b>Un pequeño juego para aquietar la mente</b><button class="primary-btn" id="startFireflies">Empezar</button></div>`;
  $("#startFireflies").onclick=()=>{audioOn();startFireflies()};
  fireflyCount=0; $("#gameScore").textContent="0 / 12"; $("#gameMessage").textContent="Busca una luz y síguela.";
}

function bubbleTap(){
  bubbleCount++;
  $("#bubbleMessage").textContent=bubbleCount%2 ? "Ahora exhala lentamente… 🌬️" : "Muy bien. Vuelve a observar cómo crece.";
  beep(bubbleCount%2?360:520,.08);
  if(bubbleCount>=8){toast("Has hecho varias pausas. Puedes parar cuando quieras.");bubbleCount=0;}
}

function init(){
  buildRain(); buildStars();
  $("#menuBtn").onclick=openMenu; $("#closeBtn").onclick=closeMenu; $("#overlay").onclick=closeMenu;
  $$("[data-section]").forEach(b=>b.onclick=e=>{e.preventDefault();nav(b.dataset.section)});
  $$(".moods button").forEach(b=>b.onclick=()=>mood(b.dataset.mood));
  $$("[data-tool]").forEach(b=>b.onclick=()=>tool(b.dataset.tool));

  $("#newQuote").onclick=randomQuote; $("#moreQuotes").onclick=wall;
  $("#breathStart").onclick=()=>{audioOn();startBreath()}; $("#breathStop").onclick=stopBreath;
  $("#saveMind").onclick=()=>{
    const v=$("#mind").value.trim();
    if(v){localStorage.setItem("menteMind",v);toast("Guardado en este dispositivo.")}else toast("No hay nada que guardar.");
  };
  $("#clearMind").onclick=()=>{$("#mind").value="";localStorage.removeItem("menteMind");toast("Espacio limpio.")};
  if(localStorage.getItem("menteMind")) $("#mind").value=localStorage.getItem("menteMind");

  $$(".timer-options button").forEach(b=>b.onclick=()=>setFocus(+b.dataset.min));
  $("#focusStart").onclick=()=>{audioOn();startFocus()}; $("#focusReset").onclick=resetFocus;
  $("#groundingStart").onclick=()=>{audioOn();grounding()};

  $$(".learn button").forEach(b=>b.onclick=()=>$("#answer").textContent=learn[b.dataset.learn]);
  $$(".action-card").forEach(b=>b.onclick=()=>{$("#proactiveResult").textContent=proactiveText[b.dataset.proactive];beep(500)});
  $$("[data-scan]").forEach(b=>b.onclick=()=>{
    $$("[data-scan]").forEach(x=>x.classList.remove("active")); b.classList.add("active");
    const tips={
      frente:"Suaviza la frente y separa un poco las cejas. No tienes que conseguirlo perfecto.",
      mandibula:"Deja que los dientes se separen ligeramente y permite que la lengua descanse.",
      hombros:"Súbelos suavemente… y déjalos caer. Nota la diferencia.",
      pecho:"No fuerces la respiración. Solo observa cómo entra y sale el aire.",
      manos:"Abre las manos, mueve los dedos y nota la temperatura de la piel.",
      piernas:"Apoya los pies en el suelo y siente el contacto con la superficie."
    };
    $("#scanResult").textContent=tips[b.dataset.scan]; beep(430);
  });

  $("#soundBtn").onclick=()=>{
    if(rainNoise){stopRainSound();stopSoftAmbient();}else{startSoftAmbient();startRainSound();}
  };
  $("#ambientBtn").onclick=()=>{
    if(rainNoise){stopRainSound();stopSoftAmbient();$("#ambientBtn").textContent="🔊 Escuchar ambiente";}
    else{startSoftAmbient();startRainSound();$("#ambientBtn").textContent="🔇 Detener ambiente";}
  };

  $("#saveDiary").onclick=saveDiary; $("#clearDiary").onclick=()=>{$("#diaryText").value="";toast("Texto limpiado.")};
  $("#saveTrusted").onclick=saveTrusted;
  $("#helpBreath").onclick=()=>{nav("herramientas");setTimeout(()=>{tool("respirar");audioOn();startBreath()},100)};

  $("#startFireflies").onclick=()=>{audioOn();startFireflies()};
  $("#resetFireflies").onclick=resetFireflies;
  $("#calmBubble").onclick=()=>{audioOn();bubbleTap()};

  randomQuote(); wall(); renderDiary(); renderTrusted();

  const savedMood=localStorage.getItem("menteMood");
  if(savedMood && moods[savedMood]) mood(savedMood);
}

document.addEventListener("DOMContentLoaded",init);
})();
