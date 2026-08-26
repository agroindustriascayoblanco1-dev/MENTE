/* =====================================================
   MENTE
   Funcionalidad inicial
   ===================================================== */


/* -----------------------------------------------------
   ELEMENTOS
   ----------------------------------------------------- */

const mainAction = document.querySelector(".main-action");
const needCards = document.querySelectorAll(".need-card");
const chatButton = document.querySelector(".center-action");
const menuButton = document.querySelector(".menu-button");


/* -----------------------------------------------------
   MENSAJE PRINCIPAL
   ----------------------------------------------------- */

mainAction.addEventListener("click", () => {
    showMessage(
        "Cuéntame qué está pasando",
        "No necesitas explicarlo perfectamente. Puedes empezar por lo primero que tengas en la cabeza."
    );
});


/* -----------------------------------------------------
   TARJETAS DE NECESIDADES
   ----------------------------------------------------- */

needCards.forEach((card) => {

    card.addEventListener("click", () => {

        const title = card.querySelector(".need-title").textContent.trim();

        handleNeed(title);

    });

});


/* -----------------------------------------------------
   BOTÓN CENTRAL — HABLAR
   ----------------------------------------------------- */

chatButton.addEventListener("click", () => {

    showMessage(
        "Estoy aquí",
        "Este será tu espacio para hablar. Pronto podremos conversar contigo de una forma más personal."
    );

});


/* -----------------------------------------------------
   MENÚ
   ----------------------------------------------------- */

menuButton.addEventListener("click", () => {

    showMessage(
        "Mente",
        "Aquí iremos incorporando tus opciones, privacidad, configuración y ayuda."
    );

});


/* -----------------------------------------------------
   ACCIONES SEGÚN NECESIDAD
   ----------------------------------------------------- */

function handleNeed(title) {

    switch (title) {

        case "Entender":

            showMessage(
                "Vamos a entenderlo",
                "Cuéntame qué estás sintiendo o qué situación quieres comprender."
            );

            break;


        case "Decidir":

            showMessage(
                "Vamos a pensarlo juntos",
                "No voy a decidir por ti. Primero vamos a mirar la situación desde diferentes puntos de vista."
            );

            break;


        case "Calmarme":

            showMessage(
                "Vamos a bajar un poco el ritmo",
                "Antes de intentar resolverlo todo, podemos ocuparnos de cómo te sientes ahora."
            );

            break;


        case "Hablar":

            showMessage(
                "Puedes empezar aquí",
                "No necesitas encontrar las palabras perfectas. Cuéntame lo que quieras."
            );

            break;


        default:

            showMessage(
                "Estoy aquí",
                "Cuéntame qué está pasando."
            );

    }

}


/* -----------------------------------------------------
   MENSAJE TEMPORAL
   ----------------------------------------------------- */

function showMessage(title, text) {

    const existingMessage =
        document.querySelector(".temporary-message");

    if (existingMessage) {
        existingMessage.remove();
    }


    const message = document.createElement("div");

    message.className = "temporary-message";


    message.innerHTML = `
        <div class="temporary-message-content">

            <button
                class="temporary-close"
                type="button"
                aria-label="Cerrar"
            >
                ×
            </button>

            <p class="temporary-eyebrow">
                MENTE
            </p>

            <h2>
                ${title}
            </h2>

            <p>
                ${text}
            </p>

            <button
                class="temporary-action"
                type="button"
            >
                Continuar
            </button>

        </div>
    `;


    document.body.appendChild(message);


    requestAnimationFrame(() => {
        message.classList.add("visible");
    });


    const closeButton =
        message.querySelector(".temporary-close");

    const continueButton =
        message.querySelector(".temporary-action");


    closeButton.addEventListener("click", () => {
        closeMessage(message);
    });


    continueButton.addEventListener("click", () => {
        closeMessage(message);
    });


    message.addEventListener("click", (event) => {

        if (event.target === message) {
            closeMessage(message);
        }

    });

}


/* -----------------------------------------------------
   CERRAR MENSAJE
   ----------------------------------------------------- */

function closeMessage(message) {

    message.classList.remove("visible");

    setTimeout(() => {
        message.remove();
    }, 220);

}
