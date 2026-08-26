/* MENTE — versión compatible con index.html */
(() => {
  "use strict";

  const WORKER_URL = "https://mente-ai.cristhianosorio503.workers.dev/";

  const $ = (id) => document.getElementById(id);
  const homeScreen = $("homeScreen");
  const chatScreen = $("chatScreen");
  const exploreScreen = $("exploreScreen");
  const journalScreen = $("journalScreen");
  const relaxScreen = $("relaxScreen");
  const articleScreen = $("articleScreen");
  const bottomNavigation = $("bottomNavigation");

  const mainAction = $("mainAction");
  const backButton = $("backButton");
  const chatForm = $("chatForm");
  const chatInput = $("chatInput");
  const chatMessages = $("chatMessages");
  const quickOptions = $("quickOptions");
  const typingIndicator = $("typingIndicator");
  const brandButton = $("brandButton");
  const menuButton = $("menuButton");
  const closeMenu = $("closeMenu");
  const sideMenu = $("sideMenu");
  const menuOverlay = $("menuOverlay");

  const mente = {
    messages: [],
    safetyMode: false,
    sessionStarted: false,
    articleOrigin: "explore"
  };

  const topicData = {
    ansiedad: {
      category: "BIENESTAR",
      title: "Ansiedad",
      intro: "La ansiedad es una respuesta de alerta de nuestro cuerpo y nuestra mente. Puede aparecer cuando percibimos una amenaza, incertidumbre o una situación que sentimos difícil de controlar. En cierta medida es normal: nos prepara para actuar. El problema aparece cuando la alarma es demasiado intensa, frecuente o empieza a limitar nuestra vida.",
      sections: [
        ["¿Qué ocurre cuando sentimos ansiedad?", "El sistema de alerta del cuerpo puede activarse aunque no exista un peligro inmediato. El corazón puede acelerarse, los músculos tensarse, la respiración cambiar y la mente comenzar a anticipar escenarios negativos. Muchas personas también sienten inquietud, dificultad para concentrarse, sensación de pérdida de control o necesidad de evitar determinadas situaciones."],
        ["¿Por qué puede mantenerse?", "La evitación puede dar alivio durante unos minutos, pero a veces enseña al cerebro que la situación era realmente peligrosa. La preocupación constante también puede convertirse en un hábito mental. Comprender este ciclo ayuda a trabajar sobre él: notar la alarma, comprobar qué está ocurriendo realmente y recuperar poco a poco actividades que se han ido evitando."],
        ["¿Qué puedo hacer en el momento?", "Primero intenta bajar el ritmo en lugar de luchar contra la sensación. Apoya los pies en el suelo, mira a tu alrededor y respira de manera cómoda y lenta. Después pregúntate: ¿hay un peligro real ahora?, ¿qué parte de esto sí puedo controlar?, ¿cuál es el siguiente paso pequeño? No necesitas resolver toda la situación mientras estás muy activado."],
        ["Hábitos que pueden ayudar", "Dormir de forma regular, moverte durante el día, hacer pausas, reducir el exceso de cafeína si notas que aumenta tus síntomas, mantener contacto con personas de confianza y aprender técnicas de relajación pueden ser útiles. No existe una herramienta que funcione igual para todos; lo importante es observar qué te ayuda."],
        ["¿Cuándo buscar ayuda?", "Si la ansiedad es frecuente, muy intensa, aparece sin una causa clara, afecta tu sueño, trabajo, estudios, relaciones o hace que evites actividades importantes, merece la pena hablar con un profesional de salud mental. Pedir ayuda no significa que estés fallando: significa que estás atendiendo algo que te está afectando."]
      ]
    },
    tdah: {
      category: "APRENDER",
      title: "TDAH",
      intro: "El trastorno por déficit de atención e hiperactividad (TDAH) es una condición del neurodesarrollo que puede influir en la atención, la organización, la gestión del tiempo, el control de impulsos y la regulación de la actividad. No es simplemente falta de voluntad, pereza o desinterés.",
      sections: [
        ["¿Cómo puede manifestarse?", "Algunas personas tienen dificultad para mantener la atención en tareas poco estimulantes, recordar cosas, comenzar actividades, calcular cuánto tiempo necesitan o terminar lo que empezaron. Otras pueden experimentar inquietud o impulsividad. La forma en que se presenta es diferente de una persona a otra."],
        ["Organización sin complicarte", "En lugar de depender únicamente de la memoria, utiliza apoyos externos: una lista visible, alarmas, calendarios, objetos siempre en el mismo lugar y recordatorios concretos. Conviene escribir el siguiente paso de una tarea, no solamente el objetivo general."],
        ["Cuando no puedes empezar", "Haz que la primera acción sea muy pequeña. En vez de 'ordenar la casa', prueba 'recoger cinco objetos'. En vez de 'estudiar', abre el material y trabaja durante cinco minutos. Empezar reduce la barrera mental y muchas veces facilita continuar."],
        ["Concentración", "Reduce las distracciones que puedas controlar, trabaja en bloques cortos y alterna esfuerzo con descansos. Algunas personas se benefician de estudiar o trabajar junto a otra persona, de utilizar temporizadores o de convertir una tarea en pasos visuales."],
        ["Evaluación profesional", "Tener algunos de estos rasgos no significa automáticamente tener TDAH. Un diagnóstico requiere una evaluación profesional y considerar la historia de la persona, el contexto y otras posibles explicaciones."]
      ]
    },
    estres: {
      category: "BIENESTAR",
      title: "Estrés",
      intro: "El estrés es una respuesta física y mental ante demandas que percibimos como difíciles, excesivas o importantes. Puede ser útil durante un periodo corto porque nos prepara para actuar, pero mantenernos en alerta durante demasiado tiempo puede desgastarnos.",
      sections: [
        ["Señales que conviene reconocer", "Puedes notar tensión muscular, dolor de cabeza, cansancio, irritabilidad, dificultad para dormir, cambios en el apetito, problemas para concentrarte o sensación de estar siempre corriendo. A veces el cuerpo detecta el exceso antes de que nosotros lo reconozcamos."],
        ["El ciclo del estrés", "Cuando las demandas aumentan y el descanso disminuye, podemos funcionar en modo supervivencia: hacemos más, descansamos menos y acumulamos tensión. Por eso no siempre basta con 'aguantar'. También necesitamos recuperación."],
        ["Qué hacer cuando estás saturado", "Detente unos minutos, identifica qué es urgente y qué puede esperar, divide la tarea en una sola acción y elimina compromisos que no sean necesarios si tienes margen para hacerlo. Una pausa no es perder tiempo: puede ayudarte a recuperar claridad."],
        ["Hábitos protectores", "Dormir, comer regularmente, moverte, conversar con alguien, tomar descansos y establecer límites son formas de recuperación. Si todo depende de ti, pedir apoyo también es una estrategia."],
        ["Cuándo pedir ayuda", "Si el estrés es persistente, muy intenso o está afectando seriamente tu salud, sueño, relaciones o funcionamiento diario, hablar con un profesional puede ayudarte a identificar qué está ocurriendo y qué cambios necesitas."]
      ]
    },
    emociones: {
      category: "EMOCIONES",
      title: "Emociones",
      intro: "Las emociones son respuestas que aparecen ante lo que vivimos, pensamos, recordamos o interpretamos. No son enemigas que debamos eliminar. Pueden aportar información, aunque una emoción intensa no siempre significa que la interpretación que la acompaña sea correcta.",
      sections: [
        ["Primero, ponle nombre", "En lugar de quedarte en 'me siento mal', intenta precisar: tristeza, miedo, enojo, culpa, frustración, vergüenza, soledad, alivio o confusión. Nombrar lo que ocurre puede ayudarte a entenderlo mejor."],
        ["Observa el cuerpo", "Pregunta dónde sientes la emoción: pecho, garganta, estómago, mandíbula, hombros. Notar estas señales permite reconocer antes cuándo estás empezando a sobrecargarte."],
        ["Pregunta qué necesitas", "Una emoción puede señalar una necesidad: descanso, seguridad, conexión, espacio, límites, comprensión o resolución de un problema. No siempre podrás satisfacer esa necesidad inmediatamente, pero reconocerla es un comienzo."],
        ["No tienes que actuar de inmediato", "Sentir enojo no obliga a discutir. Sentir miedo no significa que debas evitar todo. Puedes reconocer la emoción, esperar a que baje su intensidad y decidir qué acción coincide con tus valores."],
        ["Hablar ayuda", "Compartir lo que sientes con alguien de confianza puede disminuir el aislamiento. Si las emociones son persistentes, abrumadoras o difíciles de manejar, un profesional puede ayudarte a comprenderlas y desarrollar herramientas."]
      ]
    },
    autoestima: {
      category: "AUTOCUIDADO",
      title: "Autoestima",
      intro: "La autoestima se relaciona con la valoración que hacemos de nosotros mismos. No significa pensar que somos perfectos; implica poder reconocer fortalezas y dificultades sin convertir un error en una condena sobre nuestro valor como persona.",
      sections: [
        ["La forma en que te hablas importa", "Observa frases como 'soy un fracaso', 'nunca hago nada bien' o 'todos son mejores que yo'. Intenta convertirlas en descripciones concretas: 'esta vez me salió mal', 'esta habilidad todavía me cuesta' o 'necesito aprender otra manera'."],
        ["Construye confianza con acciones", "La autoestima también crece cuando experimentamos que podemos cuidarnos y cumplir pequeños compromisos. Elige acciones alcanzables: terminar una tarea, descansar cuando lo necesitas, pedir ayuda o mantener un límite saludable."],
        ["Compararte puede distorsionar la realidad", "Normalmente vemos la vida completa de nosotros mismos y solo una parte de la vida de otras personas. Las comparaciones constantes pueden hacerte olvidar tus propios avances."],
        ["Aprende de los errores", "Un error puede ser información. Pregúntate qué ocurrió, qué aprendiste y qué puedes probar la próxima vez. Responsabilidad y autocompasión pueden existir al mismo tiempo."],
        ["Cuándo buscar apoyo", "Si la valoración negativa de ti mismo es muy intensa, se mantiene durante mucho tiempo o está relacionada con tristeza profunda, aislamiento o pensamientos de hacerte daño, busca apoyo profesional y humano."]
      ]
    },
    sueno: {
      category: "DESCANSO",
      title: "Sueño",
      intro: "Dormir es una parte esencial de la recuperación. Durante el sueño el cuerpo y el cerebro realizan procesos importantes relacionados con energía, memoria, regulación emocional y funcionamiento diario.",
      sections: [
        ["Una rutina ayuda", "Intenta mantener horarios relativamente estables y crea una rutina tranquila antes de acostarte. El objetivo no es hacerlo perfecto, sino darle al cuerpo señales repetidas de que se acerca el descanso."],
        ["Prepara el ambiente", "Un lugar oscuro, silencioso y cómodo puede facilitar el sueño. Si puedes, reserva la cama principalmente para dormir y evita convertirla en el lugar habitual para trabajar o pasar largos periodos despierto."],
        ["Qué hacer con las preocupaciones", "Si tu mente se activa al acostarte, anota pendientes o preocupaciones antes de ir a la cama. Escribirlos puede ayudarte a recordar que no necesitas resolverlos en ese momento."],
        ["Hábitos durante el día", "La actividad física, la luz natural y horarios regulares pueden favorecer un ritmo de sueño más estable. Observa también si la cafeína o ciertos hábitos nocturnos están interfiriendo."],
        ["Si no mejora", "Si los problemas de sueño son frecuentes, duran mucho tiempo, te dejan exhausto durante el día o se acompañan de otros síntomas, conviene consultar con un profesional."]
      ]
    }
  };

  const articleData = {
    respiracion: ["EJERCICIO", "Una pausa para respirar", "<p>Siéntate cómodamente y deja caer un poco los hombros.</p><ol><li>Inhala suavemente por la nariz.</li><li>Exhala despacio, sin forzar.</li><li>Repite durante unos minutos.</li></ol><p>Si concentrarte en la respiración te incomoda, detén el ejercicio y vuelve a una respiración natural.</p>"],
    pensamientos: ["REFLEXIÓN", "Cuando tus pensamientos no paran", "<p>Cuando la mente está llena, intentar resolver todo a la vez puede aumentar la sensación de agobio.</p><p>Prueba a escribir las preocupaciones y separar dos columnas: <strong>lo que puedo controlar</strong> y <strong>lo que no puedo controlar ahora</strong>.</p><p>Después elige una sola acción pequeña.</p>"],
    ayuda: ["INFORMACIÓN", "¿Cuándo pedir ayuda?", "<p>Pedir ayuda no significa que hayas fallado. Puede ser una forma responsable de cuidarte.</p><p>Considera hablar con un profesional si algo que estás viviendo es persistente, intenso o interfiere con tu trabajo, relaciones, sueño o vida diaria.</p><p>Si existe peligro inmediato, busca ayuda humana y servicios de emergencia de tu localidad.</p>"]
  };

  function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function containsAny(text, words) {
    const t = normalize(text);
    return words.some(w => t.includes(normalize(w)));
  }

  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text ?? "");
    return div.innerHTML;
  }

  function safeHTML(text) {
    let html = escapeHTML(String(text ?? ""));
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(^|\n)\* (.+)/g, '$1<span class="chat-bullet">• $2</span>');
    html = html.replace(/(^|\n)- (.+)/g, '$1<span class="chat-bullet">• $2</span>');
    html = html.replace(/\n\n/g, '<div class="chat-gap"></div>');
    html = html.replace(/\n/g, "<br>");
    return html;
  }

  function allScreens() {
    return [homeScreen, exploreScreen, journalScreen, relaxScreen, articleScreen, chatScreen];
  }

  function showScreen(name) {
    if (window.menteShowScreen) return window.menteShowScreen(name);
    const screens = ["home","explore","journal","relax","chat","article"];
    screens.forEach(key => {
      const el = document.getElementById(key + "Screen");
      if (el) el.hidden = key !== name;
    });
    window.scrollTo({top:0, behavior:"smooth"});
  }

  function openChat(initialMessage = null) {
    showScreen("chat");
    chatInput.disabled = false;
    chatInput.readOnly = false;
    chatInput.focus({ preventScroll: true });
    resizeInput();

    if (!mente.sessionStarted) {
      mente.sessionStarted = true;
      if (!chatMessages.children.length) {
        addMessage("Hola. Soy Mente. Puedes contarme lo que tengas en mente; no necesitas encontrar las palabras perfectas.", "mente");
      }
    }

    if (initialMessage) {
      setTimeout(() => sendUserMessage(initialMessage), 100);
    }
  }

  function closeChat() {
    showScreen("home");
  }

  function resizeInput() {
    if (!chatInput) return;
    chatInput.style.height = "auto";
    chatInput.style.height = Math.min(chatInput.scrollHeight, 140) + "px";
  }

  function addMessage(text, type) {
    const row = document.createElement("div");
    row.className = `message-row ${type === "user" ? "user-message" : "mente-message"}`;

    if (type === "mente") {
      row.innerHTML = `<div class="message-avatar"><span class="mini-face">••</span></div><div class="bubble">${safeHTML(text)}</div>`;
    } else {
      row.innerHTML = `<div class="bubble"><p>${escapeHTML(text)}</p></div>`;
    }

    chatMessages.appendChild(row);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function showTyping() {
    typingIndicator.hidden = false;
    scrollChatToBottom();
  }

  function hideTyping() {
    typingIndicator.hidden = true;
  }

  function detectSafety(message) {
    const direct = [
      "quiero suicidarme", "quiero matarme", "me quiero matar",
      "voy a suicidarme", "voy a matarme", "quiero acabar con mi vida",
      "quiero quitarme la vida", "me voy a quitar la vida",
      "no quiero seguir viviendo", "no quiero vivir", "quiero morir",
      "me quiero morir"
    ];
    const immediate = [
      "estoy en peligro ahora", "estoy en peligro", "me estan atacando",
      "me están atacando", "me estan golpeando", "me están golpeando",
      "me quieren matar", "tengo un arma", "hay un arma"
    ];
    if (containsAny(message, direct)) return "self_harm";
    if (containsAny(message, immediate)) return "danger";
    return null;
  }

  function safetyResponse() {
    return "<strong>Quiero tomar esto en serio.</strong>\n\nNo tienes que atravesar este momento completamente solo. Si existe peligro inmediato o sientes que podrías hacerte daño, aléjate de cualquier cosa con la que puedas lastimarte y busca ahora mismo a una persona de confianza que pueda estar físicamente contigo.\n\nContacta los servicios de emergencia de tu localidad o acude al servicio de urgencias más cercano.\n\nSi puedes, dime solamente: <strong>¿estás en peligro inmediato ahora mismo?</strong>";
  }

  async function sendUserMessage(message) {
    const text = String(message || "").trim();
    if (!text) return;

    addMessage(text, "user");
    mente.messages.push({ role: "user", content: text });
    chatInput.value = "";
    resizeInput();
    quickOptions.hidden = true;

    const safety = detectSafety(text);
    if (safety) {
      mente.safetyMode = true;
      showTyping();
      setTimeout(() => {
        hideTyping();
        const reply = safetyResponse();
        addMessage(reply, "mente");
        mente.messages.push({ role: "mente", content: reply });
      }, 450);
      return;
    }

    showTyping();

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: mente.messages.slice(-20)
        })
      });

      const data = await response.json();

      if (!response.ok || !data.ok || !data.reply) {
        console.error("Mente AI:", data);
        throw new Error(data?.error || "Respuesta inválida");
      }

      addMessage(data.reply, "mente");
      mente.messages.push({ role: "mente", content: data.reply });
    } catch (error) {
      console.error("Error conectando con Mente AI:", error);
      addMessage("No pude conectarme con Mente en este momento. Comprueba tu conexión e inténtalo nuevamente.", "mente");
    } finally {
      hideTyping();
      chatInput.focus({ preventScroll: true });
    }
  }

  function openArticle(key) {
    const data = articleData[key];
    if (!data) return;
    mente.articleOrigin = "home";
    $("articleCategory").textContent = data[0];
    $("articleTitle").textContent = data[1];
    $("articleContent").innerHTML = data[2];
    showScreen("article");
  }

  function openTopic(key) {
    const data = topicData[key];
    if (!data) return;
    mente.articleOrigin = document.getElementById("exploreScreen").hidden ? "home" : "explore";
    $("articleCategory").textContent = data.category;
    $("articleTitle").textContent = data.title;
    $("articleContent").innerHTML = `
      <p class="article-lead">${escapeHTML(data.intro)}</p>
      ${data.sections.map(([title, text]) => `<section><h2>${escapeHTML(title)}</h2><p>${escapeHTML(text)}</p></section>`).join("")}
    `;
    showScreen("article");
  }

  function openExercise(key) {
    mente.articleOrigin = "relax";
    const exercises = {
      respiracion: ["Respiración consciente", "Durante uno o dos minutos, permite que la respiración sea cómoda. La burbuja te mostrará el ritmo: crece lentamente al inhalar y vuelve a hacerse pequeña al exhalar. No necesitas llenar completamente los pulmones ni aguantar el aire."],
      grounding: ["Volver al presente", "Mira a tu alrededor y nombra cinco cosas que ves, cuatro que puedes tocar, tres que escuchas, dos que hueles y una que saboreas o imaginas saborear."],
      pausa: ["Un minuto para ti", "Apoya los pies en el suelo, relaja los hombros y observa durante un minuto lo que ocurre a tu alrededor sin intentar cambiarlo."]
    };
    const item = exercises[key];
    if (!item) return;
    $("articleCategory").textContent = "EJERCICIO";
    $("articleTitle").textContent = item[0];
    $("articleContent").innerHTML = `
      <div class="breathing-visual" aria-hidden="true"><div class="breathing-bubble"><span>Respira</span></div></div>
      <p class="article-lead">${escapeHTML(item[1])}</p>
      <div class="exercise-steps">
        <div><b>1</b><span>Busca una postura cómoda.</span></div>
        <div><b>2</b><span>Deja que tu respiración sea natural, sin forzarla.</span></div>
        <div><b>3</b><span>Observa cómo la burbuja crece al inhalar y disminuye al exhalar.</span></div>
        <div><b>4</b><span>Quédate aquí durante uno o dos minutos.</span></div>
      </div>
      <button class="primary-button" type="button" id="exerciseDone">Terminé</button>`;
    showScreen("article");
    $("exerciseDone").addEventListener("click", () => showScreen(mente.articleOrigin || "relax"));
  }

  function saveJournal() {
    const entry = $("journalEntry").value.trim();
    if (!entry) return;

    const mood = document.querySelector(".mood-options button.selected")?.dataset.mood || "🙂";
    const entries = JSON.parse(localStorage.getItem("mente_journal") || "[]");
    entries.unshift({ entry, mood, date: new Date().toLocaleString("es-HN", { dateStyle: "medium", timeStyle: "short" }) });
    localStorage.setItem("mente_journal", JSON.stringify(entries.slice(0, 50)));
    $("journalEntry").value = "";
    document.querySelectorAll(".mood-options button").forEach(b => b.classList.remove("selected"));
    renderJournal();
  }

  function renderJournal() {
    const container = $("journalEntries");
    const entries = JSON.parse(localStorage.getItem("mente_journal") || "[]");
    if (!entries.length) {
      container.innerHTML = `<div class="empty-state">Todavía no hay entradas. Cuando quieras, este espacio es tuyo.</div>`;
      return;
    }
    container.innerHTML = entries.map(item => `
      <article class="journal-entry">
        <div><span>${escapeHTML(item.mood)}</span><small>${escapeHTML(item.date)}</small></div>
        <p>${escapeHTML(item.entry)}</p>
      </article>
    `).join("");
  }

  function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");
    sideMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
  }

  function closeSideMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    sideMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
  }

  mainAction.addEventListener("click", () => openChat());
  backButton.addEventListener("click", closeChat);
  brandButton.addEventListener("click", () => { closeSideMenu(); showScreen("home"); });
  menuButton.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSideMenu);
  menuOverlay.addEventListener("click", closeSideMenu);

  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    sendUserMessage(chatInput.value);
  });

  chatInput.addEventListener("input", resizeInput);
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.requestSubmit();
    }
  });

  quickOptions.addEventListener("click", e => {
    const button = e.target.closest("button");
    if (button?.dataset.message) sendUserMessage(button.dataset.message);
  });

  document.querySelectorAll(".need-card").forEach(card => {
    card.addEventListener("click", () => openChat(card.dataset.action === "Calmarme" ? "Me siento abrumado y necesito calmarme." : card.textContent.trim()));
  });

  document.querySelectorAll("[data-topic]").forEach(card => card.addEventListener("click", () => openTopic(card.dataset.topic)));
  document.querySelectorAll("[data-article]").forEach(card => card.addEventListener("click", () => openArticle(card.dataset.article)));
  document.querySelectorAll("[data-exercise]").forEach(card => card.addEventListener("click", () => openExercise(card.dataset.exercise)));

  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      if (item.dataset.screen === "chat") openChat();
      else showScreen(item.dataset.screen);
    });
  });

  document.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.closest("#articleScreen") ? (mente.articleOrigin || "explore") : (button.dataset.back || "home");
      showScreen(destination);
    });
  });

  $("journalButton").addEventListener("click", () => { renderJournal(); showScreen("journal"); });
  $("relaxButton").addEventListener("click", () => showScreen("relax"));
  $("saveJournalButton").addEventListener("click", saveJournal);

  document.querySelectorAll(".mood-options button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".mood-options button").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", () => {
      closeSideMenu();
      const dest = link.dataset.menu;
      if (dest === "Inicio") showScreen("home");
      else if (dest === "Hablar") openChat();
      else if (dest === "Entender") showScreen("explore");
      else if (dest === "Relajación") showScreen("relax");
      else if (dest === "Diario") { renderJournal(); showScreen("journal"); }
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeSideMenu();
      if (!chatScreen.hidden) showScreen("home");
    }
  });

  renderJournal();
  showScreen("home");
})();


/* =========================================================
   NAVEGACIÓN ROBUSTA — MENTE
   Se usa delegación de eventos para que ningún botón quede
   sin funcionar aunque su contenido se renderice después.
   ========================================================= */
(function initRobustNavigation(){
  const screenNames = [
    "home","explore","journal","relax","chat","article"
  ];

  function getScreen(name){
    return document.getElementById(name + "Screen");
  }

  function hideAllScreens(){
    screenNames.forEach(name => {
      const el = getScreen(name);
      if (el) el.hidden = true;
    });
  }

  window.menteShowScreen = function(name){
    if (!screenNames.includes(name)) name = "home";
    hideAllScreens();
    const target = getScreen(name);
    if (target) target.hidden = false;

    document.querySelectorAll("[data-screen]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.screen === name);
    });

    window.scrollTo({top:0, behavior:"smooth"});
  };

  // Intercepta todos los elementos con data-screen.
  document.addEventListener("click", function(e){
    const button = e.target.closest("[data-screen]");
    if (!button) return;
    e.preventDefault();
    e.stopPropagation();
    window.menteShowScreen(button.dataset.screen);
  }, true);

  // Botones que abren temas/artículos.
  document.addEventListener("click", function(e){
    const topic = e.target.closest("[data-topic]");
    if (!topic) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof window.openTopic === "function") {
      window.openTopic(topic.dataset.topic);
    } else if (typeof openTopic === "function") {
      openTopic(topic.dataset.topic);
    }
  }, true);

  // Ejercicios.
  document.addEventListener("click", function(e){
    const exercise = e.target.closest("[data-exercise]");
    if (!exercise) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof window.openExercise === "function") {
      window.openExercise(exercise.dataset.exercise);
    } else if (typeof openExercise === "function") {
      openExercise(exercise.dataset.exercise);
    }
  }, true);

  // Botón de volver.
  document.addEventListener("click", function(e){
    const back = e.target.closest("[data-back]");
    if (!back) return;
    if (back.id === "articleBackButton" && window.menteArticleOrigin) {
      e.preventDefault();
      e.stopPropagation();
      window.menteShowScreen(window.menteArticleOrigin);
    }
  }, true);

  // Arranque seguro.
  document.addEventListener("DOMContentLoaded", function(){
    const visible = screenNames.find(name => {
      const el = getScreen(name);
      return el && !el.hidden;
    });
    window.menteShowScreen(visible || "home");
  });
})();

/* Exponer funciones principales para los botones */
try {
  window.openTopic = typeof openTopic === "function" ? openTopic : window.openTopic;
  window.openExercise = typeof openExercise === "function" ? openExercise : window.openExercise;
} catch(e) {}
