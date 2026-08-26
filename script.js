/* =========================================================
   MENTE — INTERFAZ
   IMPORTANTE: la conexión con tu Worker se mantiene aislada.
   ========================================================= */

const WORKER_URL = "https://mente-ai-worker.agroindustriascayoblanco1.workers.dev";

const $ = (id) => document.getElementById(id);

const state = {
  screen: "home",
  articleOrigin: "explore",
  messages: []
};

const topics = {
  ansiedad: {
    category: "BIENESTAR",
    title: "Ansiedad",
    intro: "La ansiedad es una respuesta de alerta de nuestro cuerpo y nuestra mente. Puede aparecer ante incertidumbre, presión o situaciones que interpretamos como amenazantes. En cierta medida es normal y puede ayudarnos a prepararnos. Se vuelve especialmente importante atenderla cuando es intensa, frecuente o empieza a limitar nuestra vida.",
    sections: [
      ["¿Qué puede sentirse?", "Puede aparecer como preocupación constante, sensación de peligro, inquietud, tensión muscular, respiración acelerada, palpitaciones, dificultad para concentrarse o necesidad de evitar determinadas situaciones. No todas las personas la experimentan de la misma manera."],
      ["¿Por qué se mantiene?", "A veces evitamos aquello que nos provoca ansiedad y sentimos alivio inmediato. El problema es que ese alivio puede enseñar al cerebro que evitar era necesario. La preocupación repetida también puede convertirse en un hábito."],
      ["¿Qué puedes hacer?", "Cuando aparezca, intenta bajar el ritmo. Apoya los pies en el suelo, observa lo que ocurre y respira cómodamente. Pregúntate qué peligro existe realmente ahora, qué parte sí puedes controlar y cuál es el siguiente paso pequeño."],
      ["Hábitos que ayudan", "Dormir con cierta regularidad, moverte durante el día, hacer pausas, mantener contacto con personas de confianza y observar si la cafeína aumenta tus síntomas pueden ayudarte. Las herramientas funcionan de forma diferente para cada persona."],
      ["Cuándo buscar ayuda", "Si la ansiedad interfiere con tu sueño, trabajo, estudios, relaciones o actividades importantes, hablar con un profesional de salud mental puede ser un paso útil. Pedir ayuda es una forma de cuidado."]
    ]
  },
  tdah: {
    category: "APRENDER",
    title: "TDAH",
    intro: "El TDAH es una condición del neurodesarrollo que puede influir en la atención, la organización, la gestión del tiempo, la impulsividad y la regulación de la actividad. No es simplemente falta de voluntad o pereza.",
    sections: [
      ["¿Cómo puede manifestarse?", "Algunas personas tienen dificultad para comenzar o terminar tareas, recordar cosas, calcular el tiempo, mantener la atención en actividades poco estimulantes o controlar impulsos. La forma de presentarse es diferente en cada persona."],
      ["Usa apoyos externos", "No dependas solamente de la memoria. Utiliza alarmas, calendarios, listas visibles y lugares fijos para los objetos importantes. Es más útil escribir el siguiente paso que una meta demasiado grande."],
      ["Haz las tareas pequeñas", "En lugar de 'ordenar todo', prueba con cinco objetos. En lugar de 'estudiar', abre el material y trabaja cinco minutos. Reducir el tamaño del comienzo puede hacer que sea más fácil iniciar."],
      ["Concentración", "Prueba bloques cortos de trabajo, descansos, menos distracciones y temporizadores. Algunas personas también se benefician de trabajar cerca de otra persona."],
      ["Evaluación", "Tener algunos de estos rasgos no significa automáticamente tener TDAH. Una evaluación profesional considera la historia de la persona, diferentes contextos y otras posibles explicaciones."]
    ]
  },
  estres: {
    category: "BIENESTAR",
    title: "Estrés",
    intro: "El estrés es una respuesta física y mental ante demandas que percibimos como difíciles, excesivas o importantes. Puede ser útil durante un tiempo corto, pero permanecer en alerta durante demasiado tiempo puede desgastarnos.",
    sections: [
      ["Señales", "Tensión muscular, cansancio, irritabilidad, cambios en el sueño, dificultad para concentrarte, dolor de cabeza o sensación de estar siempre corriendo pueden ser señales de sobrecarga."],
      ["El ciclo", "Cuando aumentan las demandas y disminuye el descanso, podemos entrar en un ciclo de hacer más y recuperarnos menos. Una pausa no es perder tiempo: puede ayudarte a recuperar claridad."],
      ["Cuando estás saturado", "Identifica qué es urgente, qué puede esperar y cuál es la siguiente acción concreta. Si tienes margen, reduce compromisos que no sean necesarios y pide apoyo."],
      ["Hábitos protectores", "Dormir, comer regularmente, moverte, descansar, hablar con alguien y establecer límites son formas de recuperación."],
      ["Buscar apoyo", "Si el estrés persiste o afecta seriamente tu vida diaria, conviene hablar con un profesional para comprender qué está ocurriendo y qué cambios necesitas."]
    ]
  },
  emociones: {
    category: "EMOCIONES",
    title: "Emociones",
    intro: "Las emociones son respuestas que aparecen ante lo que vivimos, pensamos, recordamos o interpretamos. No son enemigas que debamos eliminar. Pueden darnos información, aunque una emoción intensa no siempre significa que la interpretación que la acompaña sea correcta.",
    sections: [
      ["Ponle nombre", "En lugar de 'me siento mal', intenta precisar: tristeza, miedo, enojo, culpa, frustración, vergüenza, soledad o confusión. Nombrar ayuda a comprender."],
      ["Observa tu cuerpo", "Pregúntate dónde sientes la emoción: pecho, garganta, estómago, mandíbula u hombros. Reconocer estas señales puede ayudarte a detectar la sobrecarga antes."],
      ["Pregunta qué necesitas", "Puede haber una necesidad de descanso, seguridad, conexión, espacio, límites o comprensión. No siempre podrás satisfacerla inmediatamente, pero reconocerla es un comienzo."],
      ["No actúes de inmediato", "Sentir enojo no obliga a discutir. Sentir miedo no significa que debas evitar todo. Puedes reconocer la emoción, dejar que baje su intensidad y después decidir."],
      ["Hablar ayuda", "Compartir lo que sientes con alguien de confianza puede disminuir el aislamiento. Si las emociones resultan abrumadoras o persistentes, busca apoyo."]
    ]
  },
  autoestima: {
    category: "AUTOCUIDADO",
    title: "Autoestima",
    intro: "La autoestima se relaciona con la valoración que hacemos de nosotros mismos. No significa pensar que somos perfectos. Significa poder reconocer fortalezas y dificultades sin convertir un error en una condena sobre nuestro valor.",
    sections: [
      ["Cómo te hablas", "Observa frases como 'soy un fracaso' o 'nunca hago nada bien'. Intenta convertirlas en descripciones concretas: 'esta vez me salió mal' o 'esta habilidad todavía me cuesta'."],
      ["Confianza mediante acciones", "La confianza también crece cuando cumplimos pequeños compromisos: terminar una tarea, descansar, pedir ayuda o mantener un límite."],
      ["Comparaciones", "Normalmente conocemos nuestra vida completa y solo una parte de la vida de otras personas. Compararte constantemente puede hacerte olvidar tus propios avances."],
      ["Errores", "Un error puede convertirse en información. Pregunta qué ocurrió, qué aprendiste y qué puedes probar la próxima vez."],
      ["Apoyo", "Si la valoración negativa de ti mismo es muy intensa o se relaciona con aislamiento o pensamientos de hacerte daño, busca apoyo profesional y humano."]
    ]
  },
  sueno: {
    category: "DESCANSO",
    title: "Sueño",
    intro: "Dormir es parte esencial de la recuperación. El cuerpo y el cerebro realizan procesos importantes relacionados con energía, memoria, regulación emocional y funcionamiento diario.",
    sections: [
      ["Rutina", "Horarios relativamente estables y una rutina tranquila antes de acostarte pueden darle al cuerpo señales repetidas de que se acerca el descanso."],
      ["Ambiente", "Un espacio oscuro, silencioso y cómodo puede facilitar el sueño. Si es posible, reserva la cama principalmente para dormir."],
      ["Preocupaciones", "Si la mente se activa al acostarte, anota pendientes o preocupaciones antes de ir a la cama. Así no necesitas resolverlos todos en ese momento."],
      ["Durante el día", "La actividad física, la luz natural y horarios regulares pueden favorecer un ritmo de sueño estable. Observa si la cafeína o hábitos nocturnos interfieren."],
      ["Si no mejora", "Si los problemas de sueño son frecuentes, duran mucho tiempo o te dejan exhausto durante el día, conviene consultar con un profesional."]
    ]
  }
};

const exercises = {
  respiracion: {
    title: "Respiración consciente",
    text: "Durante unos minutos, permite que tu respiración sea cómoda. La burbuja te acompaña: crece al inhalar y disminuye al exhalar. No necesitas forzar ni aguantar el aire."
  },
  pausa: {
    title: "Pausa de un minuto",
    text: "Detente. Apoya los pies en el suelo. Relaja los hombros. Observa tres cosas que puedas ver, dos sonidos y una sensación de tu cuerpo. Después continúa lentamente."
  },
  sentidos: {
    title: "5 sentidos",
    text: "Mira a tu alrededor y encuentra cinco cosas que puedas ver, cuatro que puedas tocar, tres que puedas escuchar, dos que puedas oler y una que puedas saborear o imaginar."
  }
};

function showScreen(name) {
  const ids = ["home","explore","journal","relax","chat","article"];
  ids.forEach(id => {
    const screen = $(id + "Screen");
    if (screen) screen.hidden = id !== name;
  });

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === name);
  });

  const nav = $("bottomNav");
  if (nav) nav.hidden = name === "chat" || name === "article";

  state.screen = name;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openChat() {
  showScreen("chat");
  const input = $("messageInput");
  if (input) setTimeout(() => input.focus(), 50);
}

function escapeHTML(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* Gemini puede devolver Markdown. Lo convertimos a HTML seguro. */
function renderAI(text) {
  let html = escapeHTML(text);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|\n)[*-] (.+)/g, '$1<span class="chat-bullet">• $2</span>');
  html = html.replace(/\n\n/g, '<div class="chat-gap"></div>');
  html = html.replace(/\n/g, "<br>");
  return html;
}

function addMessage(text, who = "ai") {
  const messages = $("messages");
  if (!messages) return;

  const row = document.createElement("div");
  row.className = "message " + who;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = who === "ai" ? renderAI(text) : escapeHTML(text).replace(/\n/g, "<br>");

  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function openTopic(key) {
  const topic = topics[key];
  if (!topic) return;

  state.articleOrigin = "explore";
  $("articleCategory").textContent = topic.category;

  let html = `
    <h1>${escapeHTML(topic.title)}</h1>
    <p class="article-lead">${escapeHTML(topic.intro)}</p>
  `;

  topic.sections.forEach(section => {
    html += `<section><h2>${escapeHTML(section[0])}</h2><p>${escapeHTML(section[1])}</p></section>`;
  });

  html += `<div class="article-note"><b>Recuerda</b><p>La información de Mente es educativa y no sustituye una evaluación profesional.</p></div>`;

  $("articleContent").innerHTML = html;
  showScreen("article");
}

function openExercise(key) {
  const exercise = exercises[key];
  if (!exercise) return;

  state.articleOrigin = "relax";
  $("articleCategory").textContent = "PAUSA";

  const visual = key === "respiracion" ? `
    <div class="breathing-box">
      <div class="breathing-bubble"><span>Respira</span></div>
      <div class="breathing-label">inhala · exhala</div>
    </div>` : "";

  $("articleContent").innerHTML = `
    <h1>${escapeHTML(exercise.title)}</h1>
    ${visual}
    <p class="article-lead">${escapeHTML(exercise.text)}</p>
    <div class="steps">
      <div><b>1</b><span>Busca una postura cómoda.</span></div>
      <div><b>2</b><span>Deja que tu cuerpo encuentre su propio ritmo.</span></div>
      <div><b>3</b><span>Si tu mente se distrae, vuelve suavemente al ejercicio.</span></div>
      <div><b>4</b><span>Cuando termines, continúa tu día sin prisa.</span></div>
    </div>
    <button class="primary-btn" id="finishExercise" type="button">Terminé</button>
  `;

  showScreen("article");
  $("finishExercise").addEventListener("click", () => showScreen(state.articleOrigin));
}

function loadJournal() {
  const entries = JSON.parse(localStorage.getItem("mente_journal") || "[]");
  const container = $("journalEntries");
  if (!container) return;

  if (!entries.length) {
    container.innerHTML = `<div class="empty-state">Todavía no hay entradas. Este espacio puede ser tuyo.</div>`;
    return;
  }

  container.innerHTML = entries.map(entry => `
    <article class="entry">
      <small>${escapeHTML(entry.date)}</small>
      <p>${escapeHTML(entry.text).replace(/\n/g, "<br>")}</p>
    </article>
  `).join("");
}

function saveJournal() {
  const text = $("journalText").value.trim();
  if (!text) return;

  const entries = JSON.parse(localStorage.getItem("mente_journal") || "[]");
  entries.unshift({
    text,
    date: new Date().toLocaleString("es-HN", { dateStyle: "medium", timeStyle: "short" })
  });

  localStorage.setItem("mente_journal", JSON.stringify(entries));
  $("journalText").value = "";
  $("journalStatus").textContent = "Guardado ✓";
  setTimeout(() => $("journalStatus").textContent = "", 1800);
  loadJournal();
}

async function sendToMente(message) {
  addMessage(message, "user");
  state.messages.push({ role: "user", text: message });

  const sendButton = $("sendMessage");
  sendButton.disabled = true;

  try {
    /* ESTA ES LA ÚNICA PARTE QUE HABLA CON TU IA.
       Se mantiene separada de toda la interfaz. */
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok || !data.reply) {
      throw new Error("No se recibió respuesta.");
    }

    addMessage(data.reply, "ai");
    state.messages.push({ role: "ai", text: data.reply });
  } catch (error) {
    addMessage("No pude conectarme en este momento. Inténtalo nuevamente en unos segundos.", "ai");
    console.error(error);
  } finally {
    sendButton.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  /* Navegación */
  document.querySelectorAll("[data-screen]").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.screen));
  });

  document.querySelectorAll("[data-action='chat']").forEach(button => {
    button.addEventListener("click", openChat);
  });

  document.querySelectorAll("[data-topic]").forEach(button => {
    button.addEventListener("click", () => openTopic(button.dataset.topic));
  });

  document.querySelectorAll("[data-exercise]").forEach(button => {
    button.addEventListener("click", () => openExercise(button.dataset.exercise));
  });

  $("articleBack").addEventListener("click", () => showScreen(state.articleOrigin));

  /* Diario */
  $("saveJournal").addEventListener("click", saveJournal);
  loadJournal();

  /* Chat */
  $("chatForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("messageInput");
    const message = input.value.trim();
    if (!message) return;

    input.value = "";
    input.style.height = "auto";
    sendToMente(message);
  });

  $("messageInput").addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      $("chatForm").requestSubmit();
    }
  });

  $("messageInput").addEventListener("input", event => {
    event.target.style.height = "auto";
    event.target.style.height = Math.min(event.target.scrollHeight, 130) + "px";
  });

  showScreen("home");
});
