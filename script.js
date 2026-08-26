/* =========================================================
   MENTE
   PRIMER CEREBRO DE CONVERSACIÓN
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
   BOTÓN PRINCIPAL
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
                        "Quiero entender lo que me está pasando.",

                    Decidir:
                        "Tengo una decisión que necesito tomar.",

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
   OPCIONES RÁPIDAS
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

            addMessage(
                safetyResponse(),
                "mente"
            );

        }, 900);


        return;

    }


    /*
       Si no hay una señal de peligro,
       analizamos la intención.
    */

    mente.category =
        detectCategory(message);


    showTyping();


    setTimeout(() => {

        hideTyping();

        const response =
            generateResponse(
                message,
                mente.category
            );


        addMessage(
            response,
            "mente"
        );


        mente.messages.push({

            role: "mente",

            content: response

        });


    }, 900);

}


/* =========================================================
   DETECTAR SITUACIONES DE SEGURIDAD
   ========================================================= */

function detectSafety(message) {

    const text =
        normalize(message);


    /*
       Estas frases NO significan automáticamente
       que exista una emergencia.

       Solamente activan una respuesta de seguridad
       para no tratar una situación potencialmente
       grave como una conversación normal.
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

        "me están golpeando",

        "me esta golpeando",

        "me están atacando",

        "me estan atacando",

        "me quieren matar",

        "estoy en peligro",

        "estoy en peligro ahora",

        "tengo un arma",

        "hay un arma",

        "me están amenazando",

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
        Si existe peligro inmediato, aléjate de
        cualquier cosa con la que puedas hacerte
        daño y busca a una persona de confianza
        que pueda estar físicamente contigo ahora.
        </p>

        <p>
        También puedes contactar a los servicios
        de emergencia de tu país o acudir al servicio
        de urgencias más cercano.
        </p>

        <p>
        Si puedes, dime solamente esto:
        <strong>¿estás en peligro inmediato ahora mismo?</strong>
        </p>
    `;

}


/* =========================================================
   DETECTAR CATEGORÍA
   ========================================================= */

function detectCategory(message) {

    const text =
        normalize(message);


    /*
       DECISIONES
    */

    const decisionWords = [

        "decidir",

        "decisión",

        "decision",

        "no sé si",

        "no se si",

        "debería",

        "deberia",

        "qué hago",

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

        "ataque de pánico",

        "ataque de panico",

        "panico",

        "pánico",

        "abrumado",

        "abrumada",

        "me supera",

        "no puedo respirar",

        "nervioso",

        "nerviosa",

        "no puedo dormir",

        "demasiado estrés",

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

        "me engañó",

        "me engaño",

        "terminamos",

        "quiero terminar",

        "me dejó",

        "me dejo",

        "discutí con",

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

        "vacío",

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

        "me da cólera",

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
       SI NO SABEMOS TODAVÍA
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
                No necesitas tomar una decisión
                mientras estás completamente abrumado.

                <p>
                Primero quiero entender las opciones.
                </p>

                <p>
                <strong>
                ¿Cuáles son las dos o tres opciones
                que estás considerando?
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
                ¿Qué estaba pasando justo antes de
                que empezaras a sentirte así?
                </strong>
                </p>
            `;


        case "loneliness":

            return `
                Gracias por decirlo.

                <p>
                Sentirse solo no siempre significa
                simplemente estar físicamente solo.
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
                ¿Desde cuándo te has estado sintiendo así?
                </strong>
                </p>
            `;


        case "relationship":

            return `
                Parece que hay algo importante
                detrás de lo que estás contando.

                <p>
                Antes de decirte qué deberías hacer,
                prefiero entender qué ocurrió.
                </p>

                <p>
                <strong>
                ¿Qué fue lo que pasó?
                </strong>
                </p>
            `;


        case "sadness":

            return `
                Está bien decir que no estás bien.

                <p>
                No voy a intentar convertir esto
                inmediatamente en una frase positiva.
                Primero podemos entenderlo.
                </p>

                <p>
                <strong>
                ¿Qué ha sido lo más difícil de estos
                últimos días?
                </strong>
                </p>
            `;


        case "anger":

            return `
                Primero hagamos una pausa.

                <p>
                Cuando estamos muy enojados podemos
                tomar decisiones que después tienen
                consecuencias difíciles de deshacer.
                </p>

                <p>
                No significa que tu enojo no sea válido.
                Significa que podemos darle espacio
                antes de actuar.
                </p>

                <p>
                <strong>
                ¿Qué fue lo que pasó para que llegaras
                a sentir tanta rabia?
                </strong>
                </p>
            `;


        default:

            return `
                Gracias por contármelo.

                <p>
                No tienes que encontrar las palabras
                perfectas. Podemos ir descubriendo
                qué está pasando poco a poco.
                </p>

                <p>
                <strong>
                ¿Qué es lo que más te preocupa
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

    /*
       Las respuestas de Mente son creadas
       internamente por nosotros.

       Los mensajes del usuario siempre
       utilizan escapeHTML().
    */

    return text;

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
   MENÚ
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
   MENÚ DE NAVEGACIÓN
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
                    `${destination} será una sección que construiremos después.`
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
