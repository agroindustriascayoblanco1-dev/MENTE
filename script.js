/* =========================================================
   MENTE — SCRIPT PRINCIPAL
   Compatible con el nuevo index.html
   ========================================================= */

const $ = (id) => document.getElementById(id);

const screens = {
    home: $("homeScreen"),
    explore: $("exploreScreen"),
    journal: $("journalScreen"),
    relax: $("relaxScreen"),
    article: $("articleScreen"),
    chat: $("chatScreen")
};

const openChatButton = $("openChatButton");
const chatForm = $("chatForm");
const messageInput = $("messageInput");
const chatMessages = $("chatMessages");
const typingIndicator = $("typingIndicator");
const backFromChat = $("backFromChat");

const journalEntry = $("journalEntry");
const saveJournalButton = $("saveJournalButton");
const journalEntries = $("journalEntries");

const MEMORY_KEY = "mente_chat_memory_v1";

function loadChatMemory() {
    try {
        const saved = JSON.parse(localStorage.getItem(MEMORY_KEY) || "[]");
        return Array.isArray(saved) ? saved.filter(item =>
            item && (item.role === "user" || item.role === "mente") &&
            typeof item.content === "string" && item.content.trim()
        ).slice(-30) : [];
    } catch (error) {
        console.warn("No se pudo cargar la memoria de Mente:", error);
        return [];
    }
}

function saveChatMemory() {
    try {
        localStorage.setItem(MEMORY_KEY, JSON.stringify(state.messages.slice(-30)));
    } catch (error) {
        console.warn("No se pudo guardar la memoria de Mente:", error);
    }
}

const state = {
    messages: loadChatMemory(),
    selectedMood: null
};

/* =========================================================
   UTILIDADES
   ========================================================= */

function normalize(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function containsAny(text, words) {
    const value = normalize(text);
    return words.some(word => value.includes(normalize(word)));
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text ?? "");
    return div.innerHTML;
}

function formatMessage(text) {
    const escaped = escapeHTML(text);
    return escaped
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}

/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function showScreen(name) {
    Object.entries(screens).forEach(([key, screen]) => {
        if (!screen) return;

        const active = key === name;

        screen.hidden = !active;
        screen.classList.toggle("active", active);
        screen.setAttribute("aria-hidden", active ? "false" : "true");
    });

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.screen === name
        );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    document.body.style.overflow =
        name === "chat" ? "hidden" : "";
}

function goHome() {
    showScreen("home");
}

function openChat() {
    showScreen("chat");

    if (!messageInput) return;

    messageInput.disabled = false;
    messageInput.readOnly = false;
    messageInput.removeAttribute("disabled");
    messageInput.removeAttribute("readonly");

    setTimeout(() => {
        messageInput.focus({ preventScroll: true });
        resizeInput();
        scrollChatToBottom();
    }, 150);
}

function closeChat() {
    goHome();
}

/* Navegación inferior */

document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
        const destination = button.dataset.screen;

        if (destination === "chat") {
            openChat();
        } else {
            showScreen(destination || "home");
        }
    });
});

if (openChatButton) {
    openChatButton.addEventListener("click", openChat);
}

if (backFromChat) {
    backFromChat.addEventListener("click", closeChat);
}

document.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
        showScreen(button.dataset.back || "home");
    });
});

/* =========================================================
   TEMAS
   ========================================================= */

const topics = {
    ansiedad: {
        category: "MENTE Y EMOCIONES",
        title: "Ansiedad",
        intro: "La ansiedad puede sentirse como preocupación, tensión, miedo o una sensación de que algo malo va a ocurrir.",
        sections: [
            ["¿Qué es?", "Es una respuesta que puede aparecer ante una amenaza, incertidumbre o situación que nuestro cerebro interpreta como difícil."],
            ["Señales frecuentes", "Puede aparecer preocupación constante, inquietud, tensión, dificultad para concentrarse, cambios en el sueño o sensaciones físicas intensas."],
            ["¿Qué puedes probar?", "Haz una pausa, respira lentamente, identifica lo que estás sintiendo y divide el problema en un paso pequeño."],
            ["Cuándo pedir ayuda", "Si la ansiedad interfiere mucho con tu vida diaria o resulta difícil de manejar, hablar con un profesional puede ser útil."]
        ]
    },

    tdah: {
        category: "APRENDER",
        title: "TDAH",
        intro: "El TDAH puede influir en la atención, organización, manejo del tiempo y control de impulsos.",
        sections: [
            ["Entenderlo", "Las dificultades relacionadas con el TDAH no significan falta de inteligencia ni de voluntad."],
            ["Organización", "Divide las tareas grandes en pasos pequeños, utiliza recordatorios y elige una prioridad para comenzar."],
            ["Concentración", "Reducir distracciones, trabajar durante periodos cortos y hacer pausas puede ayudar con algunas tareas."],
            ["Ayuda profesional", "Un profesional puede realizar una evaluación y orientar sobre las opciones adecuadas para cada persona."]
        ]
    },

    estres: {
        category: "BIENESTAR",
        title: "Estrés",
        intro: "El estrés puede aparecer cuando sentimos que las exigencias superan los recursos disponibles.",
        sections: [
            ["Reconocerlo", "Cansancio, irritabilidad, tensión, dificultad para dormir o sentir que todo es urgente pueden acompañar periodos de estrés."],
            ["Haz una pausa", "Identifica qué necesita atención hoy y qué puede esperar."],
            ["Cuida lo básico", "Dormir, alimentarte, moverte y tener momentos de descanso forman parte del cuidado personal."],
            ["Busca apoyo", "Si el estrés es persistente o afecta seriamente tu funcionamiento, considera hablar con un profesional."]
        ]
    },

    emociones: {
        category: "CONOCERTE",
        title: "Emociones",
        intro: "Las emociones son respuestas que nos ayudan a interpretar lo que ocurre y a reconocer nuestras necesidades.",
        sections: [
            ["Ponle nombre", "Preguntarte qué estás sintiendo puede ayudarte a convertir una sensación confusa en algo que puedas comprender."],
            ["No tienes que pelear con ella", "Una emoción puede ser incómoda sin que tengas que actuar inmediatamente sobre ella."],
            ["Pregúntate qué necesitas", "A veces necesitamos descanso, límites, compañía, expresar algo o simplemente tiempo."],
            ["Hablar ayuda", "Compartir lo que sientes con una persona de confianza puede hacer una situación más manejable."]
        ]
    },

    autoestima: {
        category: "CONOCERTE",
        title: "Autoestima",
        intro: "La autoestima tiene relación con la manera en que nos valoramos y tratamos a nosotros mismos.",
        sections: [
            ["Habla contigo con amabilidad", "Observa si utilizas contigo palabras mucho más duras de las que utilizarías con alguien querido."],
            ["Separa error de identidad", "Cometer un error no significa que seas un fracaso."],
            ["Reconoce pequeños avances", "Registrar esfuerzos y pequeños logros puede ayudarte a observar tu progreso."],
            ["Busca apoyo", "Si existe una sensación persistente de no valer o no merecer cosas buenas, hablar con un profesional puede ser útil."]
        ]
    },

    sueno: {
        category: "BIENESTAR",
        title: "Sueño",
        intro: "Dormir bien es importante para el cuerpo, la atención, el estado de ánimo y la capacidad de afrontar el día.",
        sections: [
            ["Prepara el momento", "Intenta crear una rutina tranquila antes de dormir y reducir estímulos intensos cerca de la hora de acostarte."],
            ["Mantén cierta regularidad", "Horarios relativamente constantes pueden ayudar a establecer una rutina."],
            ["No luches contra el sueño", "Si llevas mucho tiempo despierto, una actividad tranquila con poca luz puede ser mejor que frustrarte mirando el reloj."],
            ["Cuando es persistente", "Si los problemas de sueño son frecuentes o afectan mucho tu vida, considera consultarlo con un profesional."]
        ]
    }
};

function openTopic(key) {
    const data = topics[key];
    if (!data) return;

    const category = $("articleCategory");
    const title = $("articleTitle");
    const content = $("articleContent");

    if (!category || !title || !content) return;

    category.textContent = data.category;
    title.textContent = data.title;

    content.innerHTML = `
        <div class="article-intro">
            <p>${escapeHTML(data.intro)}</p>
        </div>
        ${data.sections.map(section => `
            <section class="article-section">
                <h2>${escapeHTML(section[0])}</h2>
                <p>${escapeHTML(section[1])}</p>
            </section>
        `).join("")}
    `;

    showScreen("article");
}

document.querySelectorAll("[data-topic]").forEach(button => {
    button.addEventListener("click", () => {
        openTopic(button.dataset.topic);
    });
});

/* =========================================================
   ARTÍCULOS
   ========================================================= */

const articles = {
    respiracion: {
        category: "EJERCICIO",
        title: "Una pausa para respirar",
        content: `
            <div class="article-intro">
                <p>Una pausa breve puede ayudarte a dirigir tu atención hacia el momento presente.</p>
            </div>
            <section class="article-section">
                <h2>Prueba esto</h2>
                <p>Inhala lentamente durante 4 segundos y después exhala durante 6 segundos. Repite varias veces sin forzarte.</p>
            </section>
            <section class="article-section">
                <h2>Recuerda</h2>
                <p>No necesitas conseguir una respiración perfecta. La idea es disminuir el ritmo y darte unos minutos de pausa.</p>
            </section>
        `
    },

    pensamientos: {
        category: "REFLEXIÓN",
        title: "Cuando tus pensamientos no paran",
        content: `
            <div class="article-intro">
                <p>No todos los pensamientos necesitan una respuesta inmediata.</p>
            </div>
            <section class="article-section">
                <h2>Escribe lo que aparece</h2>
                <p>Poner los pensamientos por escrito puede ayudarte a distinguir entre lo que puedes resolver ahora y lo que tendrá que esperar.</p>
            </section>
            <section class="article-section">
                <h2>Elige un solo paso</h2>
                <p>Pregúntate: ¿cuál es la cosa más pequeña que puedo hacer ahora mismo?</p>
            </section>
        `
    },

    ayuda: {
        category: "INFORMACIÓN",
        title: "¿Cuándo pedir ayuda?",
        content: `
            <div class="article-intro">
                <p>Pedir ayuda no significa que hayas fallado. Puede ser una manera responsable de cuidar de ti.</p>
            </div>
            <section class="article-section">
                <h2>Considera buscar apoyo</h2>
                <p>Si lo que estás viviendo interfiere mucho con tu vida o se mantiene durante mucho tiempo, hablar con un profesional puede ser importante.</p>
            </section>
            <section class="article-section">
                <h2>Si existe peligro inmediato</h2>
                <p>Busca ayuda inmediata, contacta los servicios de emergencia de tu país y procura estar acompañado por una persona de confianza.</p>
            </section>
        `
    }
};

document.querySelectorAll("[data-article]").forEach(button => {
    button.addEventListener("click", () => {
        const data = articles[button.dataset.article];
        if (!data) return;

        $("articleCategory").textContent = data.category;
        $("articleTitle").textContent = data.title;
        $("articleContent").innerHTML = data.content;

        showScreen("article");
    });
});

/* =========================================================
   RELAJACIÓN
   ========================================================= */

const exercises = {
    respiracion: {
        title: "Respiración consciente",
        text: "Inhala suavemente durante 4 segundos y exhala durante 6. Repite durante unos minutos, sin forzar la respiración."
    },
    grounding: {
        title: "Volver al presente",
        text: "Identifica 5 cosas que puedas ver, 4 que puedas tocar, 3 que puedas escuchar, 2 que puedas oler y 1 que puedas saborear."
    },
    pausa: {
        title: "Un minuto para ti",
        text: "Detente. Suelta los hombros. Respira lentamente y observa cómo se siente tu cuerpo."
    }
};

document.querySelectorAll("[data-exercise]").forEach(button => {
    button.addEventListener("click", () => {
        const exercise = exercises[button.dataset.exercise];
        if (!exercise) return;

        alert(`${exercise.title}\n\n${exercise.text}`);
    });
});

if ($("relaxButton")) {
    $("relaxButton").addEventListener("click", () => showScreen("relax"));
}

/* =========================================================
   DIARIO
   ========================================================= */

const JOURNAL_KEY = "mente_journal_v1";

function getJournal() {
    try {
        return JSON.parse(localStorage.getItem(JOURNAL_KEY) || "[]");
    } catch {
        return [];
    }
}

function renderJournal() {
    if (!journalEntries) return;

    const entries = getJournal();

    if (!entries.length) {
        journalEntries.innerHTML = `
            <div class="empty-journal">
                <p>Aún no tienes entradas.</p>
                <small>Este puede ser un espacio solo para ti.</small>
            </div>
        `;
        return;
    }

    journalEntries.innerHTML = entries.map(entry => `
        <article class="journal-entry">
            <div class="journal-entry-meta">
                <span>${escapeHTML(entry.date)}</span>
                <span>${escapeHTML(entry.mood || "")}</span>
            </div>
            <p>${escapeHTML(entry.text).replace(/\n/g, "<br>")}</p>
        </article>
    `).join("");
}

document.querySelectorAll("[data-mood]").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll("[data-mood]").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");
        state.selectedMood = button.dataset.mood;
    });
});

if (saveJournalButton) {
    saveJournalButton.addEventListener("click", () => {
        const text = journalEntry?.value.trim();

        if (!text) {
            alert("Escribe algo antes de guardar tu entrada.");
            journalEntry?.focus();
            return;
        }

        const entries = getJournal();

        entries.unshift({
            id: Date.now(),
            date: new Date().toLocaleString("es-HN", {
                dateStyle: "medium",
                timeStyle: "short"
            }),
            mood: state.selectedMood || "Sin estado de ánimo seleccionado",
            text
        });

        localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));

        journalEntry.value = "";
        state.selectedMood = null;

        document.querySelectorAll("[data-mood]").forEach(item => {
            item.classList.remove("selected");
        });

        renderJournal();
        alert("Tu entrada se guardó en este dispositivo.");
    });
}

if ($("journalButton")) {
    $("journalButton").addEventListener("click", () => {
        renderJournal();
        showScreen("journal");
    });
}

/* =========================================================
   SEGURIDAD
   ========================================================= */

function safetyLevel(message) {
    const selfHarm = [
        "quiero suicidarme",
        "quiero matarme",
        "me quiero matar",
        "voy a suicidarme",
        "voy a matarme",
        "quiero acabar con mi vida",
        "quiero quitarme la vida",
        "me voy a quitar la vida",
        "no quiero seguir viviendo",
        "no quiero vivir",
        "quiero morir",
        "me quiero morir",
        "me quiero hacer daño",
        "me quiero hacer dano",
        "quiero hacerme daño",
        "quiero hacerme dano"
    ];

    const immediate = [
        "estoy en peligro",
        "estoy en peligro ahora",
        "me quieren matar",
        "me estan atacando",
        "me están atacando",
        "me estan golpeando",
        "me están golpeando",
        "me estan amenazando",
        "me están amenazando"
    ];

    if (containsAny(message, selfHarm)) return "self_harm";
    if (containsAny(message, immediate)) return "danger";

    return null;
}

function safetyReply() {
    return `
        <strong>Quiero tomar esto en serio.</strong>
        <p>No tienes que enfrentar este momento completamente solo.</p>
        <p>Si existe peligro inmediato, aléjate de cualquier cosa con la que puedas hacerte daño y busca a una persona de confianza que pueda estar contigo ahora.</p>
        <p>En Honduras puedes llamar al <strong>911</strong> o acudir al servicio de urgencias más cercano.</p>
        <p>Si puedes, dime solamente esto: <strong>¿estás en peligro inmediato ahora mismo?</strong></p>
    `;
}

/* =========================================================
   CHAT — MEMORIA DE LA CONVERSACIÓN
   ========================================================= */

function addMessage(text, type) {
    if (!chatMessages) return;

    const row = document.createElement("div");
    row.className =
        type === "user"
            ? "message-row user-message"
            : "message-row mente-message";

    if (type === "user") {
        row.innerHTML = `
            <div class="bubble">
                <p>${escapeHTML(text)}</p>
            </div>
        `;
    } else {
        row.innerHTML = `
            <div class="message-avatar">
                <div class="mini-mascot">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="bubble">
                ${formatMessage(text)}
            </div>
        `;
    }

    chatMessages.appendChild(row);
    scrollChatToBottom();
}

function showTyping() {
    if (!typingIndicator) return;

    typingIndicator.hidden = false;
    typingIndicator.classList.add("visible");
    scrollChatToBottom();
}

function hideTyping() {
    if (!typingIndicator) return;

    typingIndicator.hidden = true;
    typingIndicator.classList.remove("visible");
}

function scrollChatToBottom() {
    if (!chatMessages) return;

    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 40);
}

function resizeInput() {
    if (!messageInput) return;

    messageInput.style.height = "auto";
    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 130) + "px";
}

/*
 * La URL se deja en una sola variable para que sea fácil
 * cambiarla si el Worker cambia en el futuro.
 */
const WORKER_URL =
    "https://mente-ai.cristhianosorio503.workers.dev/";

async function sendMessage(message) {
    const text = String(message || "").trim();

    if (!text) return;

    addMessage(text, "user");

    state.messages.push({
        role: "user",
        content: text
    });

    if (messageInput) {
        messageInput.value = "";
        resizeInput();
    }

    const safety = safetyLevel(text);

    if (safety) {
        showTyping();

        setTimeout(() => {
            hideTyping();

            const response = safetyReply();

            addMessage(response, "mente");

            state.messages.push({
                role: "mente",
                content: response
            });
            saveChatMemory();
        }, 500);

        return;
    }

    showTyping();

    try {
        /*
         * IMPORTANTE:
         * El Worker debe recibir también el historial.
         * De esta manera Mente puede mantener el contexto.
         */

        const history = state.messages
            .slice(0, -1)
            .slice(-24)
            .map(item => ({
                role: item.role === "mente" ? "model" : "user",
                text: item.content
            }))
            .filter(item => item.text);

        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text,
                history: history
            })
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            console.error("Mente AI:", data);
            throw new Error(
                data?.error || "Mente AI no pudo responder."
            );
        }

        const reply = data.reply;

        if (!reply) {
            throw new Error("Mente no devolvió una respuesta.");
        }

        hideTyping();

        addMessage(reply, "mente");

        state.messages.push({
            role: "mente",
            content: reply
        });
        saveChatMemory();

    } catch (error) {
        console.error("Error conectando con Mente:", error);

        hideTyping();

        addMessage(
            "No pude conectarme con Mente en este momento. Intenta nuevamente en unos segundos.",
            "mente"
        );
    }
}

/* Formulario */

if (chatForm) {
    chatForm.addEventListener("submit", event => {
        event.preventDefault();

        const text = messageInput?.value.trim();

        if (!text) return;

        sendMessage(text);
    });
}

/* Enter envía; Shift + Enter hace salto de línea */

if (messageInput) {
    messageInput.disabled = false;
    messageInput.readOnly = false;
    messageInput.removeAttribute("disabled");
    messageInput.removeAttribute("readonly");

    messageInput.addEventListener("input", resizeInput);

    messageInput.addEventListener("keydown", event => {
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.isComposing
        ) {
            event.preventDefault();
            chatForm?.requestSubmit();
        }
    });
}

/* =========================================================
   BIENVENIDA DEL CHAT
   ========================================================= */

function initializeChat() {
    if (!chatMessages) return;

    if (chatMessages.children.length === 0) {
        addMessage(
            "Hola. Soy Mente. Este es un espacio para hablar con calma sobre lo que tengas en mente.",
            "mente"
        );
    }
}

/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (screens.chat && !screens.chat.hidden) {
        closeChat();
    } else {
        goHome();
    }
});

/* =========================================================
   INICIO
   ========================================================= */

initializeChat();
renderJournal();
showScreen("home");
resizeInput();
