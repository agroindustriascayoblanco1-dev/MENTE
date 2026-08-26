/* =====================================================
   MENTE
   Funcionalidad principal
   ===================================================== */


/* =====================================================
   ELEMENTOS
   ===================================================== */

const menuButton = document.getElementById("menuButton");

const closeMenu = document.getElementById("closeMenu");

const sideMenu = document.getElementById("sideMenu");

const menuOverlay = document.getElementById("menuOverlay");

const mainAction = document.getElementById("mainAction");

const needCards = document.querySelectorAll(".need-card");

const menuLinks = document.querySelectorAll(".menu-link");

const messageLayer = document.getElementById("messageLayer");

const messageClose = document.getElementById("messageClose");

const messageAction = document.getElementById("messageAction");

const messageTitle = document.getElementById("messageTitle");

const messageText = document.getElementById("messageText");


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

    document.body.style.overflow = "hidden";
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

    document.body.style.overflow = "";
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
   ESC PARA CERRAR
   ===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeSideMenu();

            closeMessage();

        }

    }
);


/* =====================================================
   BOTÓN PRINCIPAL
   ===================================================== */

mainAction.addEventListener(
    "click",
    () => {

        showMessage(
            "Puedes empezar aquí.",
            "No necesitas explicarlo perfectamente. Cuéntame qué está pasando y vamos a ordenarlo juntos."
        );

    }
);


/* =====================================================
   TARJETAS
   ===================================================== */

needCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                const action =
                    card.dataset.action;

                handleAction(action);

            }
        );

    }
);


/* =====================================================
   ACCIONES
   ===================================================== */

function handleAction(action) {

    const responses = {

        Entender: {
            title: "Vamos a entenderlo.",
            text: "Cuéntame qué estás sintiendo o qué situación quieres comprender. No tienes que saber exactamente cómo llamarlo."
        },

        Decidir: {
            title: "Vamos a pensarlo juntos.",
            text: "No voy a decidir por ti. Primero vamos a mirar lo que está pasando, tus opciones y las posibles consecuencias."
        },

        Calmarme: {
            title: "Vamos a bajar un poco el ritmo.",
            text: "Antes de intentar solucionar todo, podemos ocuparnos de este momento y ayudarte a recuperar un poco de calma."
        },

        Hablar: {
            title: "Puedes contarlo aquí.",
            text: "No necesitas encontrar las palabras perfectas. Empieza por la parte que más te cuesta decir."
        }

    };


    const response =
        responses[action];


    if (!response) {
        return;
    }


    showMessage(
        response.title,
        response.text
    );

}


/* =====================================================
   MENÚ
   ===================================================== */

menuLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                const label =
                    link.textContent.trim();


                if (label === "Inicio") {

                    closeSideMenu();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    return;

                }


                closeSideMenu();


                showMessage(
                    label,
                    "Esta sección la construiremos juntos. Queremos que cada parte de Mente tenga una utilidad real."
                );

            }
        );

    }
);


/* =====================================================
   MENSAJE
   ===================================================== */

function showMessage(
    title,
    text
) {

    messageTitle.textContent =
        title;

    messageText.textContent =
        text;

    messageLayer.classList.add(
        "open"
    );

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CERRAR MENSAJE
   ===================================================== */

function closeMessage() {

    messageLayer.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";
}


messageClose.addEventListener(
    "click",
    closeMessage
);


messageAction.addEventListener(
    "click",
    closeMessage
);


messageLayer.addEventListener(
    "click",
    (event) => {

        if (
            event.target === messageLayer
        ) {

            closeMessage();

        }

    }
);
