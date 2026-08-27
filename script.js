const $=id=>document.getElementById(id);

const screens={
 home:$("homeScreen"),explore:$("exploreScreen"),journal:$("journalScreen"),
 relax:$("relaxScreen"),article:$("articleScreen"),chat:$("chatScreen")
};
const chatForm=$("chatForm"),chatInput=$("chatInput"),chatMessages=$("chatMessages"),
 typingIndicator=$("typingIndicator"),sendButton=$("sendButton"),
 journalEntry=$("journalEntry"),saveJournalButton=$("saveJournalButton"),journalEntries=$("journalEntries");

const WORKER_URL="https://mente-ai.cristhianosorio503.workers.dev/";
const CHAT_KEY="mente_chat_memory_v2",JOURNAL_KEY="mente_journal_v1";
const state={messages:[],selectedMood:null,articleBack:"home",busy:false};

function escapeHTML(t){const d=document.createElement("div");d.textContent=String(t??"");return d.innerHTML}
function normalize(t){return String(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function containsAny(t,a){const v=normalize(t);return a.some(x=>v.includes(normalize(x)))}
function formatMessage(t){
 let h=escapeHTML(t).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
 h=h.replace(/(^|\n)[*-]\s+(.+)/g,'$1<span class="chat-bullet">• $2</span>');
 return h.replace(/\n\n+/g,'<div class="chat-gap"></div>').replace(/\n/g,"<br>");
}

function showScreen(name){
 if(!screens[name])name="home";
 Object.entries(screens).forEach(([k,s])=>{if(s){s.hidden=k!==name;s.classList.toggle("active",k===name);s.setAttribute("aria-hidden",k===name?"false":"true")}});
 document.body.classList.toggle("chat-open",name==="chat");
 window.scrollTo({top:0,behavior:"smooth"});
 if(name==="journal")renderJournal();
 if(name==="chat"){restoreChat();setTimeout(()=>{chatInput?.focus({preventScroll:true});scrollChatToBottom()},80)}
}
function openChat(){closeMenu();showScreen("chat")}
function openExplore(){closeMenu();showScreen("explore")}
function openRelax(){closeMenu();showScreen("relax")}
function openJournal(){closeMenu();showScreen("journal")}
function goHome(){closeMenu();showScreen("home")}
function closeChat(){showScreen("home")}

function openMenu(){ $("sideMenu")?.classList.add("open");$("menuOverlay")?.classList.add("visible");$("sideMenu")?.setAttribute("aria-hidden","false");$("menuButton")?.setAttribute("aria-expanded","true");document.body.classList.add("menu-open")}
function closeMenu(){ $("sideMenu")?.classList.remove("open");$("menuOverlay")?.classList.remove("visible");$("sideMenu")?.setAttribute("aria-hidden","true");$("menuButton")?.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")}
function menuAction(a){
 if(a==="Inicio")goHome();else if(a==="Hablar")openChat();else if(a==="Entender")openExplore();else if(a==="Relajación")openRelax();else if(a==="Diario")openJournal();else if(a==="Decidir")openDecision();
 closeMenu()
}

const topics={
 ansiedad:["MENTE Y EMOCIONES","Ansiedad","La ansiedad es una respuesta de alerta que puede aparecer ante incertidumbre, presión o situaciones que interpretamos como amenazantes.",[["¿Qué es?","Puede producir preocupación, tensión, inquietud y cambios físicos. En cierta medida es normal; conviene atenderla cuando es intensa, frecuente o limita la vida."],["Señales","Preocupación constante, tensión muscular, respiración rápida, dificultad para concentrarse, cambios en el sueño o sensaciones físicas intensas."],["¿Qué puedes hacer?","Haz una pausa, apoya los pies en el suelo, observa lo que ocurre y pregúntate qué puedes controlar ahora. Divide el problema en un paso pequeño."],["Cuándo pedir ayuda","Si interfiere con el trabajo, estudios, relaciones, sueño o actividades importantes, hablar con un profesional puede ser útil."]]],
 tdah:["APRENDER","TDAH","El TDAH es una condición del neurodesarrollo que puede influir en atención, organización, manejo del tiempo, impulsividad y regulación de la actividad.",[["Entenderlo","No es simplemente pereza o falta de voluntad. Las dificultades y fortalezas pueden presentarse de maneras diferentes."],["Organización","Usa alarmas, calendarios, listas visibles y lugares fijos para objetos importantes."],["Concentración","Divide tareas en periodos cortos, reduce distracciones y programa descansos."],["Evaluación","Tener algunos rasgos no significa automáticamente tener TDAH. Una evaluación profesional considera la historia y distintos contextos."]]],
 estres:["BIENESTAR","Estrés","El estrés aparece cuando percibimos que las demandas son difíciles, excesivas o importantes.",[["Reconocerlo","Cansancio, irritabilidad, tensión, dificultad para dormir o sentir que todo es urgente pueden acompañar una sobrecarga."],["Romper el ciclo","Una pausa puede ayudarte a recuperar claridad. Identifica qué es urgente, qué puede esperar y cuál es el siguiente paso."],["Cuida lo básico","Dormir, alimentarte, moverte, descansar, hablar con alguien y establecer límites forman parte de la recuperación."],["Busca apoyo","Si el estrés persiste o afecta seriamente tu funcionamiento, considera hablar con un profesional."]]],
 emociones:["CONOCERTE","Emociones","Las emociones aparecen ante lo que vivimos, pensamos, recordamos o interpretamos. Pueden aportar información sobre nuestras necesidades.",[["Ponle nombre","En vez de 'me siento mal', intenta precisar tristeza, miedo, enojo, culpa, frustración, soledad o confusión."],["Observa tu cuerpo","Nota dónde aparece la emoción: pecho, garganta, estómago, mandíbula u hombros."],["Pregunta qué necesitas","Puede existir una necesidad de descanso, seguridad, conexión, espacio, límites o comprensión."],["No actúes de inmediato","Una emoción intensa no obliga a actuar inmediatamente. Puedes reconocerla y decidir cuando baje su intensidad."]]],
 autoestima:["CONOCERTE","Autoestima","La autoestima se relaciona con la valoración que hacemos de nosotros mismos.",[["Cómo te hablas","Observa si usas contigo palabras mucho más duras de las que usarías con alguien querido."],["Separa error de identidad","Cometer un error describe una experiencia; no define todo lo que eres."],["Pequeños avances","Registrar esfuerzos y pequeños logros puede ayudarte a observar tu progreso."],["Busca apoyo","Si la valoración negativa de ti mismo es muy intensa o persistente, hablar con un profesional puede ser útil."]]],
 sueno:["DESCANSO","Sueño","Dormir es parte esencial de la recuperación y puede influir en energía, memoria, estado de ánimo y funcionamiento diario.",[["Rutina","Horarios relativamente estables y una rutina tranquila antes de acostarte pueden ayudar."],["Ambiente","Un espacio oscuro, silencioso y cómodo puede facilitar el sueño."],["Preocupaciones","Anota pendientes antes de acostarte para no intentar resolverlos todos en ese momento."],["Cuando es persistente","Si los problemas de sueño son frecuentes o afectan mucho tu vida, considera consultarlo con un profesional."]]]
};

function openTopic(k){
 const d=topics[k];if(!d)return;
 state.articleBack="explore";$("articleCategory").textContent=d[0];$("articleTitle").textContent=d[1];
 $("articleContent").innerHTML=`<div class="article-intro"><p>${escapeHTML(d[2])}</p></div>`+
 d[3].map(x=>`<section class="article-section"><h2>${escapeHTML(x[0])}</h2><p>${escapeHTML(x[1])}</p></section>`).join("")+
 `<div class="article-note"><strong>Recuerda</strong><p>La información de Mente es educativa y no sustituye una evaluación profesional.</p></div>`;
 showScreen("article")
}
function openDecision(){
 state.articleBack="home";$("articleCategory").textContent="REFLEXIÓN";$("articleTitle").textContent="Tomar una decisión";
 $("articleContent").innerHTML=`<div class="article-intro"><p>Cuando una decisión pesa mucho, dividirla en pasos puede reducir la presión.</p></div>
 <section class="article-section"><h2>1. Define qué estás decidiendo</h2><p>Escribe la decisión en una sola frase.</p></section>
 <section class="article-section"><h2>2. Separa lo que controlas</h2><p>Distingue las cosas que dependen de ti de las que no.</p></section>
 <section class="article-section"><h2>3. Mira las opciones</h2><p>Piensa en ventajas, dificultades y consecuencias razonables.</p></section>
 <section class="article-section"><h2>4. Elige el siguiente paso</h2><p>No siempre necesitas resolver toda la situación hoy.</p></section>`;
 showScreen("article")
}

const exercises={
 respiracion:["EJERCICIO","Respiración consciente",`<div class="article-intro"><p>Permite que tu respiración sea cómoda. La burbuja crece al inhalar y disminuye al exhalar.</p></div><div class="breathing-box"><div class="breathing-bubble"><span>Respira</span></div><div class="breathing-label">inhala · exhala</div></div><section class="article-section"><h2>Cómo hacerlo</h2><p>Inhala suavemente durante 4 segundos y exhala durante 6. No fuerces ni aguantes el aire.</p></section>`],
 grounding:["EJERCICIO","Volver al presente",`<div class="article-intro"><p>Dirige tu atención hacia lo que puedes observar aquí y ahora.</p></div><section class="article-section"><h2>5 · 4 · 3 · 2 · 1</h2><p>Observa 5 cosas que ves, 4 que puedes tocar, 3 sonidos, 2 olores y 1 sabor.</p></section>`],
 pausa:["EJERCICIO","Un minuto para ti",`<div class="article-intro"><p>No tienes que resolverlo todo durante este minuto. Solo necesitas detenerte.</p></div><section class="article-section"><h2>Detente</h2><p>Apoya los pies en el suelo, suelta los hombros y observa cómo te sientes.</p></section>`]
};
function openExercise(k){const d=exercises[k];if(!d)return;state.articleBack="relax";$("articleCategory").textContent=d[0];$("articleTitle").textContent=d[1];$("articleContent").innerHTML=d[2];showScreen("article")}

/* Diario */
function getJournal(){try{return JSON.parse(localStorage.getItem(JOURNAL_KEY)||"[]")}catch{return[]}}
function renderJournal(){
 if(!journalEntries)return;const a=getJournal();
 journalEntries.innerHTML=a.length?a.map(e=>`<article class="journal-entry"><div class="journal-entry-meta"><span>${escapeHTML(e.date)}</span><span>${escapeHTML(e.mood||"")}</span></div><p>${escapeHTML(e.text).replace(/\n/g,"<br>")}</p></article>`).join(""):`<div class="empty-journal"><p>Aún no tienes entradas.</p><small>Este puede ser un espacio solo para ti.</small></div>`
}

/* Memoria */
function saveChat(){try{localStorage.setItem(CHAT_KEY,JSON.stringify(state.messages.slice(-30)))}catch{}}
function loadChat(){try{const a=JSON.parse(localStorage.getItem(CHAT_KEY)||"[]");return Array.isArray(a)?a.filter(x=>(x.role==="user"||x.role==="mente")&&typeof x.content==="string"&&x.content.trim()).slice(-30):[]}catch{return[]}}
function restoreChat(){
 if(!chatMessages)return;const a=loadChat();
 if(a.length){state.messages=a;chatMessages.innerHTML="";a.forEach(x=>addMessage(x.content,x.role));return}
 state.messages=[];chatMessages.innerHTML="";addMessage("Estoy aquí.\n\nNo tienes que saber exactamente cómo explicarlo.\n\nCuéntame qué está pasando.","mente")
}
function addMessage(text,type){
 const row=document.createElement("div");row.className=type==="user"?"message-row user-message":"message-row mente-message";
 row.innerHTML=type==="user"?`<div class="bubble"><p>${escapeHTML(text).replace(/\n/g,"<br>")}</p></div>`:`<div class="message-avatar"><div class="mini-mascot"><span></span><span></span></div></div><div class="bubble">${formatMessage(text)}</div>`;
 chatMessages?.appendChild(row);scrollChatToBottom()
}
function showTyping(){typingIndicator?.classList.add("visible");if(typingIndicator)typingIndicator.hidden=false;scrollChatToBottom()}
function hideTyping(){typingIndicator?.classList.remove("visible");if(typingIndicator)typingIndicator.hidden=true}
function scrollChatToBottom(){setTimeout(()=>{if(chatMessages)chatMessages.scrollTop=chatMessages.scrollHeight},30)}

async function sendUserMessage(message){
 const text=String(message||"").trim();if(!text||state.busy)return;
 state.busy=true;if(sendButton)sendButton.disabled=true;addMessage(text,"user");state.messages.push({role:"user",content:text});saveChat();
 if(chatInput){chatInput.value="";resizeInput()}
 const safety=containsAny(text,["quiero suicidarme","quiero matarme","me quiero matar","quiero quitarme la vida","no quiero seguir viviendo","quiero hacerme daño","quiero hacerme dano"]);
 if(safety){showTyping();setTimeout(()=>{const r="<strong>Quiero tomar esto en serio.</strong><p>Si existe peligro inmediato, busca a una persona de confianza y ayuda de emergencia. En Honduras puedes llamar al <strong>911</strong>.</p><p>¿Estás en peligro inmediato ahora mismo?</p>";hideTyping();addMessage(r,"mente");state.messages.push({role:"mente",content:r});saveChat();state.busy=false;if(sendButton)sendButton.disabled=false},650);return}
 showTyping();
 try{
   const history=state.messages.slice(0,-1).slice(-24).map(x=>({role:x.role==="mente"?"model":"user",text:x.content}));
   const r=await fetch(WORKER_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,history})});
   const data=await r.json();if(!r.ok||!data.ok||!data.reply)throw new Error(data?.error||"Mente no pudo responder.");
   hideTyping();addMessage(data.reply,"mente");state.messages.push({role:"mente",content:String(data.reply)});saveChat()
 }catch(e){console.error(e);hideTyping();addMessage("No pude conectarme con Mente en este momento. Intenta nuevamente en unos segundos.","mente")}
 finally{state.busy=false;if(sendButton)sendButton.disabled=false}
}
function resizeInput(){if(chatInput){chatInput.style.height="auto";chatInput.style.height=Math.min(chatInput.scrollHeight,130)+"px"}}

document.addEventListener("DOMContentLoaded",()=>{
 $("brandButton")?.addEventListener("click",goHome);$("menuButton")?.addEventListener("click",openMenu);$("closeMenu")?.addEventListener("click",closeMenu);$("menuOverlay")?.addEventListener("click",closeMenu);
 $("mainAction")?.addEventListener("click",openChat);$("relaxButton")?.addEventListener("click",openRelax);$("journalButton")?.addEventListener("click",openJournal);$("backButton")?.addEventListener("click",closeChat);
 document.querySelectorAll("[data-menu]").forEach(b=>b.addEventListener("click",()=>menuAction(b.dataset.menu)));
 document.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>{const f={Entender:openExplore,Calmarme:openRelax,Hablar:openChat,Decidir:openDecision}[b.dataset.action];if(f)f();}));
 document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>openTopic(b.dataset.topic)));
 document.querySelectorAll("[data-exercise]").forEach(b=>b.addEventListener("click",()=>openExercise(b.dataset.exercise)));
 document.querySelectorAll("[data-article]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.article;if(k==="respiracion")openExercise("respiracion");else if(k==="pensamientos")openDecision();else openDecision()}));
 document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>{if(b.closest("#articleScreen"))showScreen(state.articleBack||"home");else showScreen(b.dataset.back||"home")}));
 document.querySelectorAll("[data-mood]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-mood]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");state.selectedMood=b.dataset.mood}));
 saveJournalButton?.addEventListener("click",()=>{const text=journalEntry?.value.trim();if(!text){alert("Escribe algo antes de guardar tu entrada.");return}const a=getJournal();a.unshift({id:Date.now(),date:new Date().toLocaleString("es-HN",{dateStyle:"medium",timeStyle:"short"}),mood:state.selectedMood||"Sin estado de ánimo seleccionado",text});localStorage.setItem(JOURNAL_KEY,JSON.stringify(a));journalEntry.value="";state.selectedMood=null;document.querySelectorAll("[data-mood]").forEach(x=>x.classList.remove("selected"));renderJournal()});
 document.querySelectorAll("[data-message]").forEach(b=>b.addEventListener("click",()=>{openChat();sendUserMessage(b.dataset.message)}));
 chatForm?.addEventListener("submit",e=>{e.preventDefault();sendUserMessage(chatInput?.value)});
 chatInput?.addEventListener("input",resizeInput);chatInput?.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.isComposing){e.preventDefault();chatForm?.requestSubmit()}});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();if(!screens.chat?.hidden)closeChat();else if(!screens.article?.hidden)showScreen(state.articleBack||"home")}});
 renderJournal();showScreen("home")
});
