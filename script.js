/* =====================================================
   MENTE
   Sistema de navegación + conversación
===================================================== */


/* =====================================================
   ELEMENTOS
===================================================== */

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


/* MENÚ */

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


/* =====================================================
   ABRIR CONVERSACIÓN
===================================================== */

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

    }, 350);


    if (initialMessage) {

        setTimeout(() => {

            sendUserMessage(
                initialMessage
            );

        }, 250);

    }

}


/* =====================================================
   CERRAR CONVERSACIÓN
===================================================== */

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


/* =====================================================
   BOTÓN PRINCIPAL
===================================================== */

mainAction.addEventListener(
    "click",
    () => {

        openChat();

    }
);


/* =====================================================
   VOLVER
===================================================== */

backButton.addEventListener(
    "click",
    closeChat
);


/* =====================================================
   LOGO
===================================================== */

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


/* =====================================================
   TARJETAS
===================================================== */

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


/* =====================================================
   OPCIONES RÁPIDAS
===================================================== */

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


/* =====================================================
   FORMULARIO
===================================================== */

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


/* =====================================================
   ENVIAR MENSAJE
===================================================== */

function sendUserMessage(message) {

    addMessage(
        message,
        "user"
    );


    chatInput.value = "";

    resizeInput();


    showTyping();


    /*
       TODAVÍA NO TENEMOS IA.

       Por ahora simulamos una respuesta
       para comprobar que toda la experiencia
       funciona correctamente.
    */

    setTimeout(
        () => {

            hideTyping();

            generateTemporaryResponse(
                message
            );

        },
        1100
    );

}


/* =====================================================
   AGREGAR MENSAJE
===================================================== */

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

                <p>${escapeHTML(text)}</p>

            </div>

        `;

    } else {

        row.innerHTML = `

            <div class="bubble">

                <p>${escapeHTML(text)}</p>

            </div>

        `;

    }


    chatMessages.appendChild(row);


    scrollChatToBottom();

}


/* =====================================================
   RESPUESTA TEMPORAL
===================================================== */

function generateTemporaryResponse(
    userMessage
) {

    const lower =
        userMessage.toLowerCase();


    let response =
        "Gracias por contármelo. Podemos ir poco a poco. ¿Qué parte de todo esto es la que más pesa en este momento?";


    if (
        lower.includes("decisión") ||
        lower.includes("decidir")
    ) {

        response =
            "Podemos ordenar esa decisión sin apresurarnos. Primero quiero entender qué opciones tienes y qué es lo que más te preocupa de cada una.";

    }


    else if (
        lower.includes("abrum") ||
        lower.includes("ansiedad") ||
        lower.includes("ansioso")
    ) {

        response =
            "No vamos a intentar solucionar todo de una vez. Primero podemos bajar un poco el ritmo y después mirar qué está provocando que te sientas así.";

    }


    else if (
        lower.includes("solo") ||
        lower.includes("soledad")
    ) {

        response =
            "Gracias por decirlo. Sentirse solo puede ser muy pesado, especialmente cuando parece que no hay con quién hablar. Puedes quedarte aquí y contarme un poco más.";

    }


    else if (
        lower.includes("no sé") ||
        lower.includes("no se")
    ) {

        response =
            "Está bien no saber exactamente qué te pasa. Podemos descubrirlo juntos empezando por lo más reciente: ¿qué ocurrió antes de que empezaras a sentirte así?";

    }


    else if (
        lower.includes("contar") ||
        lower.includes("decir")
    ) {

        response =
            "Te escucho. Puedes decirlo directamente, aunque sea algo difícil, extraño o que nunca hayas contado antes.";

    }


    addMessage(
        response,
        "mente"
    );

}


/* =====================================================
   TYPING
===================================================== */

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


/* =====================================================
   SCROLL
===================================================== */

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


/* =====================================================
   TEXTAREA AUTOMÁTICO
===================================================== */

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


/* =====================================================
   ENTER
===================================================== */

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


/* =====================================================
   SEGURIDAD BÁSICA DE TEXTO
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* =====================================================
   MENÚ
===================================================== */

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


/* =====================================================
   OPCIONES DEL MENÚ
===================================================== */

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
                    `${destination} será una sección de Mente que construiremos próximamente.`
                );

            }
        );

    }
);


/* =====================================================
   ESC
===================================================== */

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
