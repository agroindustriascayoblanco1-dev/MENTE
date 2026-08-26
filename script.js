/* =========================================================
   MENTE
   PRIMER CEREBRO DE CONVERSACIÃ“N
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const homeScreen =
    document.getElementById("homeScreen");

const chatScreen =
    document.getElementById("chatScreen");

const mainAction =
    document.getElementById("mainAction");

const backButton =
    document.getElementById("backButton");

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");

const quickOptions =
    document.getElementById("quickOptions");

const typingIndicator =
    document.getElementById("typingIndicator");

const brandButton =
    document.getElementById("brandButton");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const sideMenu =
    document.getElementById("sideMenu");

const menuOverlay =
    document.getElementById("menuOverlay");

const menuLinks =
    document.querySelectorAll(".menu-link");


/* =========================================================
   ESTADO DE MENTE
   ========================================================= */

const mente = {

    category: null,

    conversationStarted: false,

    messages: [],

    safetyMode: false

};


/* =========================================================
   ABRIR CHAT
   ========================================================= */

function openChat(initialMessage = null) {

    homeScreen.style.display = "none";

    chatScreen.classList.add("open");

    chatScreen.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";


    setTimeout(() => {

        chatInput.focus();

    }, 300);


    if (initialMessage) {

        setTimeout(() => {

            sendUserMessage(
                initialMessage
            );

        }, 250);

    }

}


/* =========================================================
   CERRAR CHAT
   ========================================================= */

function closeChat() {

    chatScreen.classList.remove("open");

    chatScreen.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";


    setTimeout(() => {

        homeScreen.style.display =
            "";

    }, 300);

}


/* =========================================================
   BOTÃ“N PRINCIPAL
   ========================================================= */

mainAction.addEventListener(
    "click",
    () => {

        openChat();

    }
);


/* =========================================================
   VOLVER
   ========================================================= */

backButton.addEventListener(
    "click",
    closeChat
);


/* =========================================================
   LOGO
   ========================================================= */

brandButton.addEventListener(
    "click",
    () => {

        if (
            chatScreen.classList.contains("open")
        ) {

            closeChat();

        }

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   TARJETAS DE INICIO
   ========================================================= */

const needCards =
    document.querySelectorAll(
        ".need-card"
    );


needCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                const action =
                    card.dataset.action;


                const messages = {

                    Entender:
                        "Quiero entender lo que me estÃ¡ pasando.",

                    Decidir:
                        "Tengo una decisiÃ³n que necesito tomar.",

                    Calmarme:
                        "Me siento abrumado y necesito calmarme.",

                    Hablar:
                        "Hay algo que necesito contar."

                };


                openChat(
                    messages[action]
                );

            }
        );

    }
);


/* =========================================================
   OPCIONES RÃPIDAS
   ========================================================= */

quickOptions.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const message =
            button.dataset.message;


        if (!message) {
            return;
        }


        quickOptions.style.display =
            "none";


        sendUserMessage(message);

    }
);


/* =========================================================
   FORMULARIO
   ========================================================= */

chatForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const message =
            chatInput.value.trim();


        if (!message) {
            return;
        }


        sendUserMessage(message);

    }
);


/* =========================================================
   ENVIAR MENSAJE
   ========================================================= */

function sendUserMessage(message) {

    addMessage(
        message,
        "user"
    );

    mente.messages.push({
        role: "user",
        content: message
    });

    chatInput.value = "";
    resizeInput();

    /*
       Primero comprobamos seguridad.
    */

    const safety =
        detectSafety(message);

    if (safety) {

        mente.safetyMode = true;

        showTyping();

        setTimeout(() => {

            hideTyping();

            const response =
                safetyResponse();

            addMessage(
                response,
                "mente"
            );

            mente.messages.push({
                role: "mente",
                content: response
            });

        }, 900);

        return;
    }

    /*
       Guardamos la categorÃ­a localmente para que
       la interfaz siga teniendo contexto.
    */

    mente.category =
        detectCategory(message);

    /*
       Enviar el mensaje al Worker de Mente AI.
    */

    showTyping();

    fetch(
        "https://mente-ai.cristhianosorio503.workers.dev/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        }
    )
    .then(async (response) => {

        const data =
            await response.json();

        if (!response.ok || !data.ok) {

            console.error(
                "Mente AI error:",
                data
            );

            throw new Error(
                data?.error ||
                "Mente AI no pudo responder."
            );
        }

        return data;
    })
    .then((data) => {

        hideTyping();

        const reply =
            data.reply;

        if (!reply) {

            addMessage(
                "No pude obtener una respuesta en este momento. Intenta nuevamente.",
                "mente"
            );

            return;
        }

        addMessage(
            reply,
            "mente"
        );

        mente.messages.push({
            role: "mente",
            content: reply
        });

    })
    .catch((error) => {

        console.error(
            "Error conectando con Mente AI:",
            error
        );

        hideTyping();

        addMessage(
            "No pude conectarme con Mente en este momento. Intenta nuevamente en unos segundos.",
            "mente"
        );
    });
}


/* =========================================================
   DETECTAR SITUACIONES DE SEGURIDAD
   ========================================================= */

function detectSafety(message) {

    const text =
        normalize(message);


    /*
       Estas frases NO significan automÃ¡ticamente
       que exista una emergencia.

       Solamente activan una respuesta de seguridad
       para no tratar una situaciÃ³n potencialmente
       grave como una conversaciÃ³n normal.
    */

    const directRisk = [

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

        "voy a morir"

    ];


    const immediateDanger = [

        "me estÃ¡n golpeando",

        "me esta golpeando",

        "me estÃ¡n atacando",

        "me estan atacando",

        "me quieren matar",

        "estoy en peligro",

        "estoy en peligro ahora",

        "tengo un arma",

        "hay un arma",

        "me estÃ¡n amenazando",

        "me estan amenazando"

    ];


    if (
        containsAny(
            text,
            directRisk
        )
    ) {

        return "self_harm";

    }


    if (
        containsAny(
            text,
            immediateDanger
        )
    ) {

        return "immediate_danger";

    }


    return null;

}


/* =========================================================
   RESPUESTA DE SEGURIDAD
   ========================================================= */

function safetyResponse() {

    return `
        <strong>Quiero tomar esto en serio.</strong>

        <p>
        No tienes que enfrentar este momento
        completamente solo.
        </p>

        <p>
        Si existe peligro inmediato, alÃ©jate de
        cualquier cosa con la que puedas hacerte
        daÃ±o y busca a una persona de confianza
        que pueda estar fÃ­sicamente contigo ahora.
        </p>

        <p>
        TambiÃ©n puedes contactar a los servicios
        de emergencia de tu paÃ­s o acudir al servicio
        de urgencias mÃ¡s cercano.
        </p>

        <p>
        Si puedes, dime solamente esto:
        <strong>Â¿estÃ¡s en peligro inmediato ahora mismo?</strong>
        </p>
    `;

}


/* =========================================================
   DETECTAR CATEGORÃA
   ========================================================= */

function detectCategory(message) {

    const text =
        normalize(message);


    /*
       DECISIONES
    */

    const decisionWords = [

        "decidir",

        "decisiÃ³n",

        "decision",

        "no sÃ© si",

        "no se si",

        "deberÃ­a",

        "deberia",

        "quÃ© hago",

        "que hago",

        "elegir",

        "escoger",

        "terminar",

        "aceptar",

        "rechazar"

    ];


    if (
        containsAny(
            text,
            decisionWords
        )
    ) {

        return "decision";

    }


    /*
       ANSIEDAD / ABRUMAMIENTO
    */

    const anxietyWords = [

        "ansiedad",

        "ansioso",

        "ansiosa",

        "ataque de pÃ¡nico",

        "ataque de panico",

        "panico",

        "pÃ¡nico",

        "abrumado",

        "abrumada",

        "me supera",

        "no puedo respirar",

        "nervioso",

        "nerviosa",

        "no puedo dormir",

        "demasiado estrÃ©s",

        "demasiado estres"

    ];


    if (
        containsAny(
            text,
            anxietyWords
        )
    ) {

        return "anxiety";

    }


    /*
       SOLEDAD
    */

    const lonelinessWords = [

        "estoy solo",

        "estoy sola",

        "me siento solo",

        "me siento sola",

        "soledad",

        "nadie me entiende",

        "nadie me escucha",

        "no tengo amigos",

        "no tengo a nadie"

    ];


    if (
        containsAny(
            text,
            lonelinessWords
        )
    ) {

        return "loneliness";

    }


    /*
       RELACIONES
    */

    const relationshipWords = [

        "mi novio",

        "mi novia",

        "mi pareja",

        "mi ex",

        "me engaÃ±Ã³",

        "me engaÃ±o",

        "terminamos",

        "quiero terminar",

        "me dejÃ³",

        "me dejo",

        "discutÃ­ con",

        "discuti con"

    ];


    if (
        containsAny(
            text,
            relationshipWords
        )
    ) {

        return "relationship";

    }


    /*
       TRISTEZA
    */

    const sadnessWords = [

        "estoy triste",

        "me siento triste",

        "estoy deprimido",

        "estoy deprimida",

        "me siento mal",

        "llorar",

        "estoy llorando",

        "no tengo ganas",

        "vacÃ­o",

        "vacio",

        "sin ganas"

    ];


    if (
        containsAny(
            text,
            sadnessWords
        )
    ) {

        return "sadness";

    }


    /*
       ENOJO
    */

    const angerWords = [

        "estoy enojado",

        "estoy enojada",

        "estoy furioso",

        "estoy furiosa",

        "me da rabia",

        "me da cÃ³lera",

        "me da colera",

        "quiero vengarme",

        "quiero golpear",

        "quiero pegar"

    ];


    if (
        containsAny(
            text,
            angerWords
        )
    ) {

        return "anger";

    }


    /*
       SI NO SABEMOS TODAVÃA
    */

    return "general";

}


/* =========================================================
   GENERAR RESPUESTA
   ========================================================= */

function generateResponse(
    message,
    category
) {

    switch (category) {


        case "decision":

            return `
                Podemos ordenar esto juntos.
                No necesitas tomar una decisiÃ³n
                mientras estÃ¡s completamente abrumado.

                <p>
                Primero quiero entender las opciones.
                </p>

                <p>
                <strong>
                Â¿CuÃ¡les son las dos o tres opciones
                que estÃ¡s considerando?
                </strong>
                </p>
            `;


        case "anxiety":

            return `
                Vamos a bajar un poco el ritmo
                antes de intentar resolver todo.

                <p>
                Pon ambos pies en el suelo y suelta
                los hombros si puedes.
                </p>

                <p>
                No necesitas hacer desaparecer lo
                que sientes. Primero queremos darle
                un poco menos de intensidad.
                </p>

                <p>
                <strong>
                Â¿QuÃ© estaba pasando justo antes de
                que empezaras a sentirte asÃ­?
                </strong>
                </p>
            `;


        case "loneliness":

            return `
                Gracias por decirlo.

                <p>
                Sentirse solo no siempre significa
                simplemente estar fÃ­sicamente solo.
                A veces significa sentir que nadie
                nos comprende o que no tenemos un
                lugar donde decir lo que realmente
                pensamos.
                </p>

                <p>
                No tienes que explicarlo perfectamente.
                </p>

                <p>
                <strong>
                Â¿Desde cuÃ¡ndo te has estado sintiendo asÃ­?
                </strong>
                </p>
            `;


        case "relationship":

            return `
                Parece que hay algo importante
                detrÃ¡s de lo que estÃ¡s contando.

                <p>
                Antes de decirte quÃ© deberÃ­as hacer,
                prefiero entender quÃ© ocurriÃ³.
                </p>

                <p>
                <strong>
                Â¿QuÃ© fue lo que pasÃ³?
                </strong>
                </p>
            `;


        case "sadness":

            return `
                EstÃ¡ bien decir que no estÃ¡s bien.

                <p>
                No voy a intentar convertir esto
                inmediatamente en una frase positiva.
                Primero podemos entenderlo.
                </p>

                <p>
                <strong>
                Â¿QuÃ© ha sido lo mÃ¡s difÃ­cil de estos
                Ãºltimos dÃ­as?
                </strong>
                </p>
            `;


        case "anger":

            return `
                Primero hagamos una pausa.

                <p>
                Cuando estamos muy enojados podemos
                tomar decisiones que despuÃ©s tienen
                consecuencias difÃ­ciles de deshacer.
                </p>

                <p>
                No significa que tu enojo no sea vÃ¡lido.
                Significa que podemos darle espacio
                antes de actuar.
                </p>

                <p>
                <strong>
                Â¿QuÃ© fue lo que pasÃ³ para que llegaras
                a sentir tanta rabia?
                </strong>
                </p>
            `;


        default:

            return `
                Gracias por contÃ¡rmelo.

                <p>
                No tienes que encontrar las palabras
                perfectas. Podemos ir descubriendo
                quÃ© estÃ¡ pasando poco a poco.
                </p>

                <p>
                <strong>
                Â¿QuÃ© es lo que mÃ¡s te preocupa
                en este momento?
                </strong>
                </p>
            `;

    }

}


/* =========================================================
   AGREGAR MENSAJE
   ========================================================= */

function addMessage(
    text,
    type
) {

    const row =
        document.createElement("div");


    row.className =
        `message-row ${
            type === "user"
                ? "user-message"
                : "mente-message"
        }`;


    if (type === "mente") {

        row.innerHTML = `

            <div class="message-avatar">

                <div class="mini-mascot">

                    <span></span>
                    <span></span>

                </div>

            </div>

            <div class="bubble">

                ${safeHTML(text)}

            </div>

        `;

    }

    else {

        row.innerHTML = `

            <div class="bubble">

                <p>
                    ${escapeHTML(text)}
                </p>

            </div>

        `;

    }


    chatMessages.appendChild(row);


    scrollChatToBottom();

}


/* =========================================================
   HTML CONTROLADO
   ========================================================= */

function safeHTML(text) {

    const container =
        document.createElement("div");

    container.innerHTML =
        String(text ?? "");

    const allowedTags = new Set([
        "P",
        "STRONG",
        "BR"
    ]);

    function cleanNode(node) {

        if (node.nodeType === Node.TEXT_NODE) {
            return document.createTextNode(node.nodeValue);
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return document.createTextNode("");
        }

        if (!allowedTags.has(node.tagName)) {

            const fragment =
                document.createDocumentFragment();

            Array.from(node.childNodes).forEach(
                child => {
                    fragment.appendChild(
                        cleanNode(child)
                    );
                }
            );

            return fragment;
        }

        const clean =
            document.createElement(
                node.tagName.toLowerCase()
            );

        Array.from(node.childNodes).forEach(
            child => {
                clean.appendChild(
                    cleanNode(child)
                );
            }
        );

        return clean;
    }

    const result =
        document.createDocumentFragment();

    Array.from(container.childNodes).forEach(
        child => {
            result.appendChild(
                cleanNode(child)
            );
        }
    );

    const wrapper =
        document.createElement("div");

    wrapper.appendChild(result);

    return wrapper.innerHTML
        .replace(/
/g, "<br>");
}


function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   NORMALIZAR TEXTO
   ========================================================= */

function normalize(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


/* =========================================================
   BUSCAR PALABRAS
   ========================================================= */

function containsAny(
    text,
    words
) {

    return words.some(
        word =>
            text.includes(
                normalize(word)
            )
    );

}


/* =========================================================
   INDICADOR
   ========================================================= */

function showTyping() {

    typingIndicator.classList.add(
        "visible"
    );


    scrollChatToBottom();

}


function hideTyping() {

    typingIndicator.classList.remove(
        "visible"
    );

}


/* =========================================================
   SCROLL CHAT
   ========================================================= */

function scrollChatToBottom() {

    setTimeout(
        () => {

            chatMessages.scrollTo({

                top:
                    chatMessages.scrollHeight,

                behavior:
                    "smooth"

            });

        },
        50
    );

}


/* =========================================================
   TEXTAREA
   ========================================================= */

chatInput.addEventListener(
    "input",
    resizeInput
);


function resizeInput() {

    chatInput.style.height =
        "auto";


    chatInput.style.height =
        Math.min(
            chatInput.scrollHeight,
            130
        ) + "px";

}


/* =========================================================
   ENTER
   ========================================================= */

chatInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            chatForm.requestSubmit();

        }

    }
);


/* =========================================================
   MENÃš
   ========================================================= */

function openMenu() {

    sideMenu.classList.add("open");

    menuOverlay.classList.add("open");

    sideMenu.setAttribute(
        "aria-hidden",
        "false"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow =
        "hidden";

}


function closeSideMenu() {

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("open");

    sideMenu.setAttribute(
        "aria-hidden",
        "true"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow =
        "";

}


menuButton.addEventListener(
    "click",
    openMenu
);


closeMenu.addEventListener(
    "click",
    closeSideMenu
);


menuOverlay.addEventListener(
    "click",
    closeSideMenu
);


/* =========================================================
   MENÃš DE NAVEGACIÃ“N
   ========================================================= */

menuLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                const destination =
                    link.dataset.menu;


                closeSideMenu();


                if (
                    destination === "Inicio"
                ) {

                    if (
                        chatScreen.classList.contains(
                            "open"
                        )
                    ) {

                        closeChat();

                    }


                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });


                    return;

                }


                if (
                    destination === "Hablar" ||
                    destination === "Entender" ||
                    destination === "Decidir"
                ) {

                    openChat();

                    return;

                }


                alert(
                    `${destination} serÃ¡ una secciÃ³n que construiremos despuÃ©s.`
                );

            }

        );

    }
);


/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeSideMenu();


            if (
                chatScreen.classList.contains(
                    "open"
                )
            ) {

                closeChat();

            }

        }

    }
);
