const $ = id => document.getElementById(id);

const screens = {
    home: $("homeScreen"),
    explore: $("exploreScreen"),
    journal: $("journalScreen"),
    relax: $("relaxScreen"),
    article: $("articleScreen"),
    biblical: $("biblicalScreen"),
    chat: $("chatScreen")
};

const chatForm = $("chatForm");
const chatInput = $("chatInput");
const chatMessages = $("chatMessages");
const typingIndicator = $("typingIndicator");
const sendButton = $("sendButton");
const journalEntry = $("journalEntry");
const saveJournalButton = $("saveJournalButton");
const journalEntries = $("journalEntries");

const WORKER_URL = "https://mente-ai.cristhianosorio503.workers.dev/";
const CHAT_KEY = "mente_chat_memory_v2";
const JOURNAL_KEY = "mente_journal_v1";
const state = { messages: [], selectedMood: null, articleBack: "home", busy: false };

// Utility Functions
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text ?? "");
    return div.innerHTML;
}

function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function containsAny(text, keywords) {
    const normalized = normalize(text);
    return keywords.some(kw => normalized.includes(normalize(kw)));
}

// Screen Navigation
function showScreen(name) {
    if (!screens[name]) name = "home";
    Object.entries(screens).forEach(([key, screen]) => {
        if (screen) {
            screen.hidden = key !== name;
            screen.classList.toggle("active", key === name);
            screen.setAttribute("aria-hidden", key === name ? "false" : "true");
        }
    });
    document.body.classList.toggle("chat-open", name === "chat");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (name === "journal") renderJournal();
    if (name === "chat") {
        restoreChat();
        setTimeout(() => {
            chatInput?.focus({ preventScroll: true });
            scrollChatToBottom();
        }, 80);
    }
}

function openChat() { closeMenu(); showScreen("chat"); }
function openExplore() { closeMenu(); showScreen("explore"); }
function openRelax() { closeMenu(); showScreen("relax"); }
function openJournal() { closeMenu(); showScreen("journal"); }
function openBiblical() { closeMenu(); showScreen("biblical"); }
function goHome() { closeMenu(); showScreen("home"); }
function closeChat() { showScreen("home"); }

// Menu
function openMenu() {
    $("sideMenu")?.classList.add("open");
    $("menuOverlay")?.classList.add("visible");
    $("sideMenu")?.setAttribute("aria-hidden", "false");
    $("menuButton")?.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    $("sideMenu")?.classList.remove("open");
    $("menuOverlay")?.classList.remove("visible");
    $("sideMenu")?.setAttribute("aria-hidden", "true");
    $("menuButton")?.setAttribute("aria-expanded", "false");
}

function menuAction(action) {
    if (action === "Inicio") goHome();
    else if (action === "Hablar") openChat();
    else if (action === "Entender") openExplore();
    else if (action === "Relajación") openRelax();
    else if (action === "Diario") openJournal();
    else if (action === "Biblia") openBiblical();
    else if (action === "Decidir") openDecision();
    closeMenu();
}

// Topics Data
const topics = {
    ansiedad: ["MENTE Y EMOCIONES", "Ansiedad", "La ansiedad es una respuesta de alerta que puede aparecer ante incertidumbre, presión o situaciones que interpretamos como amenazantes.", [
        ["¿Qué es?", "Puede manifestarse como preocupación constante, tensión física, o miedo sin una causa clara."],
        ["Reconocerla", "Palpitaciones, sudoración, respiración acelerada, dificultad para concentrarse."],
        ["Estrategias", "Respiración profunda, ejercicio físico, técnicas de relajación, hablar con alguien."]
    ]],
    tdah: ["APRENDER", "TDAH", "El TDAH es una condición del neurodesarrollo que puede influir en atención, organización, manejo del tiempo, impulsividad y regulación de la actividad.", [
        ["Entenderlo", "No es falta de voluntad, es cómo funciona tu cerebro."],
        ["Estrategias", "Listas, alarmas, espacios sin distracciones, movimiento regular."],
        ["Apoyo", "Profesionales, comunidad, aceptación de tus ritmos."]
    ]],
    estres: ["BIENESTAR", "Estrés", "El estrés aparece cuando percibimos que las demandas son difíciles, excesivas o importantes.", [
        ["Reconocerlo", "Cansancio, irritabilidad, tensión, dificultad para dormir."],
        ["Factores", "Trabajo, relaciones, cambios, presión financiera."],
        ["Reducirlo", "Descanso, movimiento, límites claros, actividades placenteras."]
    ]],
    emociones: ["CONOCERTE", "Emociones", "Las emociones aparecen ante lo que vivimos, pensamos, recordamos o interpretamos. Pueden aportar información sobre nuestras necesidades.", [
        ["Ponle nombre", "Tristeza, miedo, alegría, rabia. Nombrar ayuda a procesar."],
        ["Acepta todas", "No hay emociones 'malas', todas tienen un propósito."],
        ["Expresa", "Habla, escribe, dibuja, muévete. La expresión libera."]
    ]],
    autoestima: ["CONOCERTE", "Autoestima", "La autoestima se relaciona con la valoración que hacemos de nosotros mismos.", [
        ["Cómo te hablas", "Observa si usas contigo palabras mucho más duras de las que usarías con un amigo."],
        ["Cambiar", "Pequeños actos de cuidado, reconocer logros, aceptar imperfecciones."],
        ["Construir", "Paciencia, compasión contigo mismo, buscar apoyo cuando lo necesites."]
    ]],
    sueno: ["DESCANSO", "Sueño", "Dormir es parte esencial de la recuperación y puede influir en energía, memoria, estado de ánimo y funcionamiento diario.", [
        ["Rutina", "Horarios relativamente estables, incluso los fines de semana."],
        ["Ambiente", "Oscuro, frío, silencioso. Sin pantallas una hora antes."],
        ["Hábitos", "Evita cafeína tarde, ejercicio de día, relajación antes de dormir."]
    ]]
};

// Biblical Emotional Intelligence
const biblicalTopics = {
    miedo: ["FE Y CONFIANZA", "Miedo y Confianza en Dios", "El miedo es natural, pero la fe nos recuerda que no estamos solos. Dios nos invita a confiar en su protección y amor.", [
        ["Entender el miedo", "El miedo puede ser una señal de que necesitamos ayuda. No es debilidad, es parte de ser humano."],
        ["Confía en Dios", "Salmos 27:1 - 'El Señor es mi luz y mi salvación, ¿de quién tendré temor?'"],
        ["Pasos prácticos", "Ora, busca comunidad, recuerda momentos en que Dios te cuidó, lee promesas de Dios."]
    ]],
    ansiedad_biblica: ["PAZ INTERIOR", "Ansiedad y Paz", "Filipenses 4:6-7 - 'Por nada estén ansiosos, sino que en toda situación, mediante la oración y la petición, presenten sus peticiones a Dios.'", [
        ["Reconoce tus preocupaciones", "Permite que tus miedos salgan a la luz. Dios ya los conoce."],
        ["Oración transformadora", "Presenta a Dios lo que te preocupa. La paz que sobrepasa el entendimiento guardarás tu corazón."],
        ["Herramientas", "Meditación en la Palabra, oración constante, comunidad de fe."]
    ]],
    ira: ["PERDÓN Y SANIDAD", "Ira y Perdón", "Efesios 4:26-27 - 'Si se enojan, no pequen.' La ira es válida, pero cómo la manejamos importa.", [
        ["Expresa tu ira", "Está bien sentir enojo ante la injusticia. Dios también se enoja."],
        ["El poder del perdón", "Perdonar no significa que lo que hicieron estuvo bien, sino liberarte del resentimiento."],
        ["Pasos hacia la sanidad", "Reconoce la ira, habla con Dios, busca reconciliación cuando sea posible, perdónate a ti mismo."]
    ]],
    tristeza: ["ESPERANZA Y CONSUELO", "Tristeza y Esperanza", "Romanos 15:13 - 'Que el Dios de la esperanza os llene de todo gozo y paz en vuestra fe.'", [
        ["La tristeza es válida", "Jesús lloró. Permitirse sentir tristeza es parte del proceso de sanidad."],
        ["Dios está contigo", "Salmos 34:18 - 'Cercano est�� el Señor a los de corazón quebrantado.'"],
        ["Caminar hacia la luz", "Busca apoyo, expresa tu dolor, confía en que hay esperanza, ayuda a otros."]
    ]],
    culpa: ["GRACIA Y PERDÓN", "Culpa y Gracia", "1 Juan 1:9 - 'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados.'", [
        ["Diferencia importante", "Convicción (nos lleva a cambiar) vs culpa (nos paraliza). Dios ofrece convicción, no culpa."],
        ["La gracia de Dios", "Tu valor no depende de tus errores. Eres amado incondicionalmente."],
        ["Movimiento hacia adelante", "Confiesa, acepta el perdón, perdónate a ti mismo, crece desde ahí."]
    ]],
    soledad: ["COMUNIDAD Y AMOR", "Soledad y Comunidad", "1 Tesalonicenses 5:11 - 'Por eso, anímense y edifíquense unos a otros.'", [
        ["No estás solo", "Dios siempre está contigo. Además, Él nos creó para la comunidad."],
        ["Busca conexión", "Pequeños grupos, iglesia, amigos de fe. La comunidad sana."],
        ["Da y recibe", "La soledad se reduce cuando servimos y permitimos ser servidos por otros."]
    ]]
};

function openTopic(key) {
    const data = topics[key];
    if (!data) return;
    
    state.articleBack = "explore";
    $("articleCategory").textContent = data[0];
    $("articleTitle").textContent = data[1];
    
    $("articleContent").innerHTML = `<div class="article-intro"><p>${escapeHTML(data[2])}</p></div>` +
        data[3].map(section => `<section class="article-section"><h2>${escapeHTML(section[0])}</h2><p>${escapeHTML(section[1])}</p></section>`).join("") +
        `<div class="article-note"><strong>Recuerda</strong><p>La información de Mente es educativa y no sustituye una evaluación profesional.</p></div>`;
    
    showScreen("article");
}

function openBiblicalTopic(key) {
    const data = biblicalTopics[key];
    if (!data) return;
    
    state.articleBack = "biblical";
    $("articleCategory").textContent = data[0];
    $("articleTitle").textContent = data[1];
    
    $("articleContent").innerHTML = `<div class="article-intro"><p>${escapeHTML(data[2])}</p></div>` +
        data[3].map(section => `<section class="article-section"><h2>${escapeHTML(section[0])}</h2><p>${escapeHTML(section[1])}</p></section>`).join("") +
        `<div class="article-note"><strong>Reflexión</strong><p>Que esta sabiduría te acompañe en tu camino. Que encuentres paz en la fe.</p></div>`;
    
    showScreen("article");
}

function openDecision() {
    state.articleBack = "home";
    $("articleCategory").textContent = "REFLEXIÓN";
    $("articleTitle").textContent = "Tomar una decisión";
    
    $("articleContent").innerHTML = `
        <div class="article-intro"><p>Cuando una decisión pesa mucho, dividirla en pasos puede reducir la presión.</p></div>
        <section class="article-section"><h2>1. Define qué estás decidiendo</h2><p>Escribe la decisión en una sola frase.</p></section>
        <section class="article-section"><h2>2. Separa lo que controlas</h2><p>Distingue las cosas que dependen de ti de las que no.</p></section>
        <section class="article-section"><h2>3. Mira las opciones</h2><p>Piensa en ventajas, dificultades y consecuencias razonables.</p></section>
        <section class="article-section"><h2>4. Elige el siguiente paso</h2><p>No siempre necesitas resolver toda la situación hoy.</p></section>
    `;
    
    showScreen("article");
}

// Exercises
const exercises = {
    respiracion: ["EJERCICIO", "Respiración consciente", `
        <div class="article-intro"><p>Permite que tu respiración sea cómoda. La burbuja crece al inhalar y disminuye al exhalar.</p></div>
        <div class="breathing-box">
            <div class="breathing-bubble"><span>Respira</span></div>
            <div class="breathing-label">Sigue el ritmo de la burbuja</div>
        </div>
        <section class="article-section"><h2>Cómo hacerlo</h2><p>Inhala lentamente por la nariz durante 4 segundos. Mantén durante 4 segundos. Exhala durante 4 segundos. Repite 5-10 veces.</p></section>
    `],
    grounding: ["EJERCICIO", "Volver al presente", `
        <div class="article-intro"><p>Dirige tu atención hacia lo que puedes observar aquí y ahora.</p></div>
        <section class="article-section"><h2>5 · 4 · 3 · 2 · 1</h2><p>
            <strong>5 cosas que ves:</strong> Observa tu entorno con detenimiento.<br>
            <strong>4 cosas que sientes:</strong> La textura del suelo, la ropa en tu piel.<br>
            <strong>3 cosas que escuchas:</strong> Sonidos cercanos y lejanos.<br>
            <strong>2 cosas que hueles:</strong> Aromas a tu alrededor.<br>
            <strong>1 cosa que pruebas:</strong> Una bebida, comida, sabor.
        </p></section>
    `],
    pausa: ["EJERCICIO", "Un minuto para ti", `
        <div class="article-intro"><p>No tienes que resolverlo todo durante este minuto. Solo necesitas detenerte.</p></div>
        <section class="article-section"><h2>Detente</h2><p>Respira profundo. Siéntete aquí. Mira a tu alrededor. Es suficiente.</p></section>
    `],
    oracion: ["EJERCICIO", "Oración Guiada", `
        <div class="article-intro"><p>Un momento para conectar con Dios y encontrar paz interior.</p></div>
        <section class="article-section"><h2>Prepárate</h2><p>Encuentra un lugar tranquilo. Siéntate cómodamente. Respira profundo.</p></section>
        <section class="article-section"><h2>Oración</h2><p>"Señor, reconozco que no puedo hacer esto solo. Te entrego mis preocupaciones, mis miedos, mi carga. Ayúdame a confiar en ti. Lléname de tu paz. Que tu amor me transforme. Amén."</p></section>
    `]
};

function openExercise(key) {
    const data = exercises[key];
    if (!data) return;
    state.articleBack = "relax";
    $("articleCategory").textContent = data[0];
    $("articleTitle").textContent = data[1];
    $("articleContent").innerHTML = data[2];
    showScreen("article");
}

// Journal
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
    
    if (entries.length === 0) {
        journalEntries.innerHTML = '<div class="empty-journal"><p>Aún no tienes entradas. ¡Comienza a escribir!</p></div>';
        return;
    }
    
    journalEntries.innerHTML = entries.map(entry => `
        <article class="journal-entry">
            <div class="journal-entry-meta">
                <span>${escapeHTML(entry.date)}</span>
                <span>${escapeHTML(entry.mood || "")}</span>
            </div>
            <p>${escapeHTML(entry.text)}</p>
        </article>
    `).join("");
}

// Chat - Memory Management
function saveChat() {
    try {
        localStorage.setItem(CHAT_KEY, JSON.stringify(state.messages.slice(-30)));
    } catch { }
}

function loadChat() {
    try {
        const data = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
        return Array.isArray(data) ? 
            data.filter(x => (x.role === "user" || x.role === "mente") && typeof x.content === "string" && x.content.trim()) :
            [];
    } catch {
        return [];
    }
}

function restoreChat() {
    if (!chatMessages) return;
    const messages = loadChat();
    
    if (messages.length) {
        state.messages = messages;
        chatMessages.innerHTML = "";
        messages.forEach(msg => addMessage(msg.content, msg.role));
        return;
    }
    
    state.messages = [];
    chatMessages.innerHTML = "";
    addMessage("Estoy aquí.\n\nNo tienes que saber exactamente cómo explicarlo.\n\nCuéntame qué está pasando.", "mente");
}

function addMessage(text, type) {
    const row = document.createElement("div");
    row.className = type === "user" ? "message-row user-message" : "message-row mente-message";
    
    if (type === "user") {
        row.innerHTML = `<div class="bubble"><p>${escapeHTML(text).replace(/\n/g, "<br>")}</p></div>`;
    } else {
        row.innerHTML = `
            <div class="message-avatar">
                <div class="mini-mascot">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="bubble">${text.split("\n\n").map(p => `<p>${escapeHTML(p).replace(/\n/g, "<br>")}</p>`).join("")}</div>
        `;
    }
    
    chatMessages?.appendChild(row);
    scrollChatToBottom();
}

function showTyping() {
    typingIndicator?.classList.add("visible");
    if (typingIndicator) typingIndicator.hidden = false;
    scrollChatToBottom();
}

function hideTyping() {
    typingIndicator?.classList.remove("visible");
    if (typingIndicator) typingIndicator.hidden = true;
}

function scrollChatToBottom() {
    setTimeout(() => {
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 30);
}

async function sendUserMessage(message) {
    const text = String(message || "").trim();
    if (!text || state.busy) return;
    
    state.busy = true;
    if (sendButton) sendButton.disabled = true;
    
    addMessage(text, "user");
    state.messages.push({ role: "user", content: text });
    saveChat();
    
    if (chatInput) {
        chatInput.value = "";
        resizeInput();
    }
    
    // Safety check
    const safety = containsAny(text, [
        "quiero suicidarme", "quiero matarme", "me quiero matar",
        "quiero quitarme la vida", "no quiero seguir viviendo",
        "quiero hacerme daño", "quiero hacerme dano"
    ]);
    
    if (safety) {
        showTyping();
        setTimeout(() => {
            const response = `<strong>Quiero tomar esto en serio.</strong><p>Si existe peligro inmediato, busca a una persona de confianza y ayuda de emergencia. En Honduras: Línea PAS 2239-6200. En otros países, busca servicios de crisis local.</p>`;
            hideTyping();
            addMessage(response, "mente");
            state.messages.push({ role: "mente", content: response });
            saveChat();
            state.busy = false;
            if (sendButton) sendButton.disabled = false;
        }, 1000);
        return;
    }
    
    showTyping();
    
    try {
        const history = state.messages
            .slice(0, -1)
            .slice(-24)
            .map(x => ({
                role: x.role === "mente" ? "model" : "user",
                text: x.content
            }));
        
        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, history })
        });
        
        const data = await response.json();
        
        if (!response.ok || !data.ok || !data.reply) {
            throw new Error(data?.error || "Mente no pudo responder.");
        }
        
        hideTyping();
        addMessage(data.reply, "mente");
        state.messages.push({ role: "mente", content: String(data.reply) });
        saveChat();
    } catch (error) {
        console.error(error);
        hideTyping();
        addMessage("No pude conectarme con Mente en este momento. Intenta nuevamente en unos segundos.", "mente");
    } finally {
        state.busy = false;
        if (sendButton) sendButton.disabled = false;
    }
}

function resizeInput() {
    if (chatInput) {
        chatInput.style.height = "auto";
        chatInput.style.height = Math.min(chatInput.scrollHeight, 130) + "px";
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Navigation
    $("brandButton")?.addEventListener("click", goHome);
    $("menuButton")?.addEventListener("click", openMenu);
    $("closeMenu")?.addEventListener("click", closeMenu);
    $("menuOverlay")?.addEventListener("click", closeMenu);
    
    // Main actions
    $("mainAction")?.addEventListener("click", openChat);
    $("relaxButton")?.addEventListener("click", openRelax);
    $("journalButton")?.addEventListener("click", openJournal);
    $("biblicalButton")?.addEventListener("click", openBiblical);
    $("chatMenuButton")?.addEventListener("click", openMenu);
    
    // Menu links
    document.querySelectorAll("[data-menu]").forEach(btn => {
        btn.addEventListener("click", () => menuAction(btn.dataset.menu));
    });
    
    // Action buttons
    document.querySelectorAll("[data-action]").forEach(btn => {
        btn.addEventListener("click", () => {
            const actions = {
                "Entender": openExplore,
                "Calmarme": openRelax,
                "Hablar": openChat,
                "Decidir": openDecision,
                "Biblia": openBiblical
            };
            actions[btn.dataset.action]?.();
        });
    });
    
    // Topics
    document.querySelectorAll("[data-topic]").forEach(btn => {
        btn.addEventListener("click", () => openTopic(btn.dataset.topic));
    });

    // Biblical Topics
    document.querySelectorAll("[data-biblical]").forEach(btn => {
        btn.addEventListener("click", () => openBiblicalTopic(btn.dataset.biblical));
    });
    
    // Exercises
    document.querySelectorAll("[data-exercise]").forEach(btn => {
        btn.addEventListener("click", () => openExercise(btn.dataset.exercise));
    });
    
    // Articles
    document.querySelectorAll("[data-article]").forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.article;
            if (key === "respiracion") openExercise("respiracion");
            else if (key === "pensamientos") openDecision();
            else if (key === "ayuda") openTopic("autoestima");
        });
    });
    
    // Back buttons
    document.querySelectorAll("[data-back]").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.closest("#articleScreen")) {
                showScreen(state.articleBack || "home");
            } else {
                showScreen(btn.dataset.back || "home");
            }
        });
    });
    
    // Mood selector
    document.querySelectorAll("[data-mood]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("[data-mood]").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            state.selectedMood = btn.dataset.mood;
        });
    });
    
    // Journal save
    saveJournalButton?.addEventListener("click", () => {
        const text = journalEntry?.value.trim();
        if (!text) {
            alert("Escribe algo antes de guardar tu entrada.");
            return;
        }
        
        const entries = getJournal();
        const now = new Date();
        entries.unshift({
            id: Date.now(),
            date: now.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }),
            mood: state.selectedMood || "",
            text: text
        });
        
        try {
            localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
            journalEntry.value = "";
            document.querySelectorAll("[data-mood]").forEach(b => b.classList.remove("selected"));
            state.selectedMood = null;
            renderJournal();
            alert("✅ Entrada guardada");
        } catch {
            alert("No pude guardar tu entrada. Intenta de nuevo.");
        }
    });
    
    // Chat form
    chatForm?.addEventListener("submit", e => {
        e.preventDefault();
        sendUserMessage(chatInput?.value);
    });
    
    chatInput?.addEventListener("input", resizeInput);
    chatInput?.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
            e.preventDefault();
            chatForm?.requestSubmit();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeMenu();
            if (!screens.chat?.hidden) closeChat();
            else if (!screens.article?.hidden) showScreen(state.articleBack || "home");
        }
    });
    
    // Initialize
    renderJournal();
    showScreen("home");
});
