/* =========================================================
   MENTE — INTERFAZ Y CONVERSACIÓN CON MENTE AI
   ========================================================= */

const homeScreen = document.getElementById("homeScreen");
const chatScreen = document.getElementById("chatScreen");
const mainAction = document.getElementById("mainAction");
const backButton = document.getElementById("backButton");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const quickOptions = document.getElementById("quickOptions");
const typingIndicator = document.getElementById("typingIndicator");
const brandButton = document.getElementById("brandButton");
const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".menu-link");

const mente = { category: null, messages: [], safetyMode: false };

function normalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function containsAny(text, words) {
    const normalized = normalize(text);
    return words.some(word => normalized.includes(normalize(word)));
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = String(text ?? "");
    return div.innerHTML;
}

function safeHTML(text) {
    const container = document.createElement("div");
    container.innerHTML = String(text ?? "");
    const allowed = new Set(["P", "STRONG", "BR"]);

    function clean(node) {
        if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.nodeValue);
        if (node.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");

        if (!allowed.has(node.tagName)) {
            const fragment = document.createDocumentFragment();
            Array.from(node.childNodes).forEach(child => fragment.appendChild(clean(child)));
            return fragment;
        }

        const element = document.createElement(node.tagName.toLowerCase());
        Array.from(node.childNodes).forEach(child => element.appendChild(clean(child)));
        return element;
    }

    const wrapper = document.createElement("div");
    Array.from(container.childNodes).forEach(child => wrapper.appendChild(clean(child)));
    return wrapper.innerHTML.replace(/\n/g, "<br>");
}

function openChat(initialMessage = null) {
    homeScreen.style.display = "none";
    chatScreen.classList.add("open");
    chatScreen.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    chatInput.disabled = false;
    chatInput.readOnly = false;
    chatInput.removeAttribute("disabled");
    chatInput.removeAttribute("readonly");
    chatInput.style.pointerEvents = "auto";
    chatInput.style.userSelect = "text";
    chatInput.style.webkitUserSelect = "text";

    const inputArea = document.querySelector(".chat-input-area");
    if (inputArea) {
        inputArea.style.pointerEvents = "auto";
        inputArea.style.position = "relative";
        inputArea.style.zIndex = "1000";
    }

    setTimeout(() => chatInput.focus({ preventScroll: true }), 350);

    if (initialMessage) {
        setTimeout(() => sendUserMessage(initialMessage), 450);
    }
}

function closeChat() {
    chatScreen.classList.remove("open");
    chatScreen.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => { homeScreen.style.display = ""; }, 300);
}

mainAction.addEventListener("click", () => openChat());
backButton.addEventListener("click", closeChat);

brandButton.addEventListener("click", () => {
    if (chatScreen.classList.contains("open")) closeChat();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const cardMessages = {
    Entender: "Quiero entender lo que me está pasando.",
    Decidir: "Tengo una decisión que necesito tomar.",
    Calmarme: "Me siento abrumado y necesito calmarme.",
    Hablar: "Hay algo que necesito contar."
};

document.querySelectorAll(".need-card").forEach(card => {
    card.addEventListener("click", () => openChat(cardMessages[card.dataset.action] || null));
});

quickOptions.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    const message = button.dataset.message;
    if (!message) return;
    quickOptions.style.display = "none";
    sendUserMessage(message);
});

chatForm.addEventListener("submit", event => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    sendUserMessage(message);
});

chatInput.addEventListener("input", resizeInput);

chatInput.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

function resizeInput() {
    chatInput.style.height = "auto";
    chatInput.style.height = Math.min(chatInput.scrollHeight, 130) + "px";
}

function detectSafety(message) {
    const directRisk = [
        "quiero suicidarme", "quiero matarme", "me quiero matar",
        "voy a suicidarme", "voy a matarme", "quiero acabar con mi vida",
        "quiero quitarme la vida", "me voy a quitar la vida",
        "no quiero seguir viviendo", "no quiero vivir", "quiero morir",
        "me quiero morir"
    ];

    const immediateDanger = [
        "me estan golpeando", "me están golpeando",
        "me estan atacando", "me están atacando",
        "me quieren matar", "estoy en peligro",
        "estoy en peligro ahora", "tengo un arma", "hay un arma",
        "me estan amenazando", "me están amenazando"
    ];

    if (containsAny(message, directRisk)) return "self_harm";
    if (containsAny(message, immediateDanger)) return "immediate_danger";
    return null;
}

function safetyResponse() {
    return `
        <strong>Quiero tomar esto en serio.</strong>
        <p>No tienes que enfrentar este momento completamente solo.</p>
        <p>Si existe peligro inmediato, aléjate de cualquier cosa con la que puedas hacerte daño y busca a una persona de confianza que pueda estar físicamente contigo ahora.</p>
        <p>También puedes contactar a los servicios de emergencia de tu país o acudir al servicio de urgencias más cercano.</p>
        <p>Si puedes, dime solamente esto: <strong>¿estás en peligro inmediato ahora mismo?</strong></p>
    `;
}

function detectCategory(message) {
    const decision = ["decidir", "decisión", "decision", "no sé si", "no se si", "debería", "deberia", "qué hago", "que hago", "elegir", "escoger"];
    const anxiety = ["ansiedad", "ansioso", "ansiosa", "ataque de pánico", "ataque de panico", "panico", "pánico", "abrumado", "abrumada", "me supera", "no puedo respirar", "nervioso", "nerviosa", "no puedo dormir", "estrés", "estres"];
    const loneliness = ["estoy solo", "estoy sola", "me siento solo", "me siento sola", "soledad", "nadie me entiende", "nadie me escucha", "no tengo amigos", "no tengo a nadie"];
    const relationship = ["mi novio", "mi novia", "mi pareja", "mi ex", "me engañó", "me engaño", "terminamos", "quiero terminar", "me dejó", "me dejo", "discutí con", "discuti con"];
    const sadness = ["estoy triste", "me siento triste", "estoy deprimido", "estoy deprimida", "me siento mal", "llorar", "estoy llorando", "no tengo ganas", "vacío", "vacio", "sin ganas"];
    const anger = ["estoy enojado", "estoy enojada", "estoy furioso", "estoy furiosa", "me da rabia", "me da cólera", "me da colera", "quiero vengarme", "quiero golpear", "quiero pegar"];

    if (containsAny(message, decision)) return "decision";
    if (containsAny(message, anxiety)) return "anxiety";
    if (containsAny(message, loneliness)) return "loneliness";
    if (containsAny(message, relationship)) return "relationship";
    if (containsAny(message, sadness)) return "sadness";
    if (containsAny(message, anger)) return "anger";
    return "general";
}

async function sendUserMessage(message) {
    addMessage(message, "user");
    mente.messages.push({ role: "user", content: message });

    chatInput.value = "";
    resizeInput();

    const safety = detectSafety(message);

    if (safety) {
        mente.safetyMode = true;
        showTyping();

        setTimeout(() => {
            hideTyping();
            const response = safetyResponse();
            addMessage(response, "mente");
            mente.messages.push({ role: "mente", content: response });
        }, 700);

        return;
    }

    mente.category = detectCategory(message);
    showTyping();

    try {
        const response = await fetch(
            "https://mente-ai.cristhianosorio503.workers.dev/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
    message,
    history: mente.messages
})
            }
        );

        const data = await response.json();

        if (!response.ok || !data.ok) {
            console.error("Mente AI error:", data);
            throw new Error(data?.error || "Mente AI no pudo responder.");
        }

        hideTyping();

        if (!data.reply) {
            addMessage("No pude obtener una respuesta en este momento. Intenta nuevamente.", "mente");
            return;
        }

        addMessage(data.reply, "mente");
        mente.messages.push({ role: "mente", content: data.reply });

    } catch (error) {
        console.error("Error conectando con Mente AI:", error);
        hideTyping();
        addMessage(
            "No pude conectarme con Mente en este momento. Intenta nuevamente en unos segundos.",
            "mente"
        );
    }
}

function addMessage(text, type) {
    const row = document.createElement("div");
    row.className = `message-row ${type === "user" ? "user-message" : "mente-message"}`;

    if (type === "mente") {
        row.innerHTML = `
            <div class="message-avatar">
                <div class="mini-mascot"><span></span><span></span></div>
            </div>
            <div class="bubble">${safeHTML(text)}</div>
        `;
    } else {
        row.innerHTML = `<div class="bubble"><p>${escapeHTML(text)}</p></div>`;
    }

    chatMessages.appendChild(row);
    scrollChatToBottom();
}

function showTyping() {
    typingIndicator.classList.add("visible");
    scrollChatToBottom();
}

function hideTyping() {
    typingIndicator.classList.remove("visible");
}

function scrollChatToBottom() {
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: "smooth"
        });
    }, 50);
}

function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");
    sideMenu.setAttribute("aria-hidden", "false");
    menuButton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeSideMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    sideMenu.setAttribute("aria-hidden", "true");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

menuButton.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeSideMenu);
menuOverlay.addEventListener("click", closeSideMenu);

menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        const destination = link.dataset.menu;
        closeSideMenu();

        if (destination === "Inicio") {
            if (chatScreen.classList.contains("open")) closeChat();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (["Hablar", "Entender", "Decidir"].includes(destination)) {
            openChat();
            return;
        }

        alert(`${destination} será una sección que construiremos después.`);
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeSideMenu();
        if (chatScreen.classList.contains("open")) closeChat();
    }
});

/* Asegurar que el campo nunca quede bloqueado. */
chatInput.disabled = false;
chatInput.readOnly = false;
chatInput.removeAttribute("disabled");
chatInput.removeAttribute("readonly");
chatInput.style.pointerEvents = "auto";
chatInput.style.userSelect = "text";
chatInput.style.webkitUserSelect = "text";

const chatInputArea = document.querySelector(".chat-input-area");
if (chatInputArea) {
    chatInputArea.style.pointerEvents = "auto";
    chatInputArea.style.position = "relative";
    chatInputArea.style.zIndex = "1000";
}
