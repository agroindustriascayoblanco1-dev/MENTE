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
    sessionStarted: false
  };

  const topicData = {
    ansiedad: {
      category: "BIENESTAR",
      title: "Ansiedad",
      intro: "La ansiedad puede aparecer cuando tu mente interpreta una situación como amenazante o difícil de manejar.",
      sections: [
        ["¿Cómo puede sentirse?", "Puede aparecer como preocupación intensa, tensión, inquietud, dificultad para concentrarte o síntomas físicos como palpitaciones o respiración rápida."],
        ["¿Qué puedes probar?", "Haz una pausa, respira lentamente, identifica qué está bajo tu control y divide el problema en un paso pequeño. Si los síntomas son frecuentes o interfieren con tu vida, hablar con un profesional puede ser útil."],
        ["Una idea para hoy", "No necesitas resolver todo de una vez. Pregúntate: ¿qué es lo más pequeño que puedo hacer ahora mismo?"]
      ]
    },
    tdah: {
      category: "APRENDER",
      title: "TDAH",
      intro: "El TDAH puede afectar la atención, la organización, la gestión del tiempo y el control de impulsos. No es simplemente falta de voluntad.",
      sections: [
        ["Estrategias prácticas", "Divide una tarea grande en acciones pequeñas, utiliza recordatorios visibles, reduce distracciones y trabaja durante periodos cortos con descansos."],
        ["Organización", "Elige una sola lista principal para tus pendientes y define cuál es el siguiente paso, en vez de intentar organizar todo al mismo tiempo."],
        ["Importante", "Solo un profesional puede evaluar y diagnosticar TDAH. Si crees que puede estar afectándote, considera hablar con un profesional de salud."]
      ]
    },
    estres: {
      category: "BIENESTAR",
      title: "Estrés",
      intro: "El estrés es una respuesta del cuerpo y la mente ante demandas o situaciones que percibimos como difíciles.",
      sections: [
        ["Señales", "Puede aparecer como irritabilidad, tensión muscular, cansancio, problemas para dormir o dificultad para desconectar."],
        ["Una pausa útil", "Aléjate unos minutos de la fuente de tensión si puedes, respira con calma y decide qué tarea realmente necesita tu atención ahora."],
        ["Si persiste", "Si el estrés es intenso, prolongado o está afectando significativamente tu vida, buscar apoyo profesional puede ayudarte."]
      ]
    },
    emociones: {
      category: "EMOCIONES",
      title: "Emociones",
      intro: "Las emociones son señales que pueden darte información sobre lo que estás viviendo, necesitando o valorando.",
      sections: [
        ["Primero, nómbrala", "En lugar de quedarte solo con 'me siento mal', prueba: estoy triste, preocupado, enojado, frustrado, asustado o confundido."],
        ["Después, pregunta", "¿Qué ocurrió? ¿Qué necesito? ¿Hay algo que pueda hacer ahora? Poner nombre a una emoción no la elimina, pero puede hacerla más comprensible."],
        ["Recuerda", "Sentir una emoción no significa que tengas que actuar inmediatamente según ella."]
      ]
    },
    autoestima: {
      category: "AUTOCUIDADO",
      title: "Autoestima",
      intro: "La autoestima tiene relación con la manera en que valoras y tratas a la persona que eres.",
      sections: [
        ["Habla contigo como hablarías con alguien querido", "Observa si utilizas contigo palabras que nunca usarías con otra persona. Cambiar ese tono no significa ignorar tus errores; significa tratarlos con respeto."],
        ["Pequeñas acciones", "Cumplir pequeñas promesas contigo mismo puede fortalecer la sensación de confianza: descansar, terminar una tarea o pedir ayuda cuando la necesitas."],
        ["Sin perfección", "Tu valor no depende de hacerlo todo bien."]
      ]
    },
    sueno: {
      category: "DESCANSO",
      title: "Sueño",
      intro: "Dormir bien ayuda a la recuperación física y mental. El descanso también puede verse afectado por estrés, hábitos y horarios.",
      sections: [
        ["Rutina", "Intenta mantener horarios relativamente constantes y crea una transición tranquila antes de dormir."],
        ["Menos estímulos", "Si puedes, reduce pantallas, cafeína y actividades muy estimulantes cerca de la hora de dormir."],
        ["Si continúa", "Los problemas persistentes de sueño merecen una evaluación profesional, especialmente si afectan tu funcionamiento durante el día."]
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
    const wrapper = document.createElement("div");
    wrapper.textContent = String(text ?? "");
    return wrapper.innerHTML.replace(/\n/g, "<br>");
  }

  function allScreens() {
    return [homeScreen, exploreScreen, journalScreen, relaxScreen, articleScreen, chatScreen];
  }

  function showScreen(name) {
    const map = { home: homeScreen, explore: exploreScreen, journal: journalScreen, relax: relaxScreen, article: articleScreen, chat: chatScreen };
    const target = map[name] || homeScreen;

    allScreens().forEach(screen => {
      const active = screen === target;
      screen.hidden = !active;
      screen.classList.toggle("active", active);
    });

    if (bottomNavigation) {
      bottomNavigation.hidden = name === "chat" || name === "article";
      bottomNavigation.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle("active", item.dataset.screen === name);
      });
    }

    document.body.classList.toggle("chat-open", name === "chat");
    window.scrollTo({ top: 0, behavior: "auto" });
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
    $("articleCategory").textContent = data[0];
    $("articleTitle").textContent = data[1];
    $("articleContent").innerHTML = data[2];
    showScreen("article");
  }

  function openTopic(key) {
    const data = topicData[key];
    if (!data) return;
    $("articleCategory").textContent = data.category;
    $("articleTitle").textContent = data.title;
    $("articleContent").innerHTML = `
      <p class="article-lead">${escapeHTML(data.intro)}</p>
      ${data.sections.map(([title, text]) => `<section><h2>${escapeHTML(title)}</h2><p>${escapeHTML(text)}</p></section>`).join("")}
    `;
    showScreen("article");
  }

  function openExercise(key) {
    const exercises = {
      respiracion: ["Respiración consciente", "Durante un minuto, respira de manera natural y presta atención a la sensación del aire al entrar y salir. No necesitas forzar respiraciones profundas."],
      grounding: ["Volver al presente", "Mira a tu alrededor y nombra cinco cosas que ves, cuatro que puedes tocar, tres que escuchas, dos que hueles y una que saboreas o imaginas saborear."],
      pausa: ["Un minuto para ti", "Apoya los pies en el suelo, relaja los hombros y observa durante un minuto lo que ocurre a tu alrededor sin intentar cambiarlo."]
    };
    const item = exercises[key];
    if (!item) return;
    $("articleCategory").textContent = "EJERCICIO";
    $("articleTitle").textContent = item[0];
    $("articleContent").innerHTML = `<p class="article-lead">${escapeHTML(item[1])}</p><button class="primary-button" type="button" id="exerciseDone">Terminé</button>`;
    showScreen("article");
    $("exerciseDone").addEventListener("click", () => showScreen("relax"));
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
    button.addEventListener("click", () => showScreen(button.dataset.back || "home"));
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
