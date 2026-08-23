// ================================
// ELEMENTOS DE LA PÁGINA
// ================================

const feelings = document.querySelectorAll(".feeling");
const continueButton = document.getElementById("continueButton");

const welcomeScreen = document.getElementById("welcomeScreen");
const supportScreen = document.getElementById("supportScreen");

const backButton = document.getElementById("backButton");

const supportIcon = document.getElementById("supportIcon");
const supportTitle = document.getElementById("supportTitle");
const supportMessage = document.getElementById("supportMessage");


// ================================
// ESTADO SELECCIONADO
// ================================

let selectedFeeling = null;


// ================================
// INFORMACIÓN DE CADA EMOCIÓN
// ================================

const feelingData = {

    Ansioso: {
        icon: "😰",

        title: "Gracias por contarnos cómo estás.",

        message:
            "Hoy parece que estás sintiendo ansiedad. No tienes que resolverlo todo ahora. Podemos ir paso a paso."
    },

    Triste: {
        icon: "😔",

        title: "Gracias por compartirlo con nosotros.",

        message:
            "Parece que hoy estás pasando por un momento triste. No tienes que esconder lo que sientes. Podemos quedarnos aquí un momento."
    },

    Abrumado: {
        icon: "😵",

        title: "Parece que tienes mucho sobre ti.",

        message:
            "Cuando todo parece demasiado, no tenemos que resolverlo todo de una vez. Podemos empezar por una sola cosa."
    },

    Normal: {
        icon: "😐",

        title: "Gracias por contarnos cómo estás.",

        message:
            "Hoy parece ser un día tranquilo. También puedes utilizar MIND para conocerte mejor, reflexionar o simplemente hacer una pausa."
    },

    Bien: {
        icon: "😊",

        title: "Nos alegra saber que estás bien.",

        message:
            "Puedes aprovechar este momento para cuidar de ti, conocerte mejor o simplemente disfrutar de cómo te sientes hoy."
    }

};


// ================================
// SELECCIONAR UNA EMOCIÓN
// ================================

feelings.forEach(function (feeling) {

    feeling.addEventListener("click", function () {

        console.log("Emoción seleccionada:", feeling.dataset.feeling);


        // Quitamos la selección anterior
        feelings.forEach(function (item) {

            item.classList.remove("selected");

        });


        // Seleccionamos la nueva emoción
        feeling.classList.add("selected");


        // Guardamos la emoción
        selectedFeeling = feeling.dataset.feeling;


        // Activamos el botón Continuar
        continueButton.disabled = false;

    });

});


// ================================
// BOTÓN CONTINUAR
// ================================

continueButton.addEventListener("click", function () {

    console.log("Continuar presionado");


    // Si no hay emoción seleccionada, no hacemos nada
    if (!selectedFeeling) {

        return;

    }


    // Obtenemos la información
    const data = feelingData[selectedFeeling];


    // Actualizamos la segunda pantalla
    supportIcon.textContent = data.icon;

    supportTitle.textContent = data.title;

    supportMessage.textContent = data.message;


    // Ocultamos la primera pantalla
    welcomeScreen.classList.add("hidden");


    // Mostramos la segunda pantalla
    supportScreen.classList.remove("hidden");


    // Animación
    supportScreen.classList.remove("entering");

    void supportScreen.offsetWidth;

    supportScreen.classList.add("entering");


    // Volvemos arriba
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================================
// BOTÓN VOLVER
// ================================

backButton.addEventListener("click", function () {

    // Ocultar segunda pantalla
    supportScreen.classList.add("hidden");


    // Mostrar primera pantalla
    welcomeScreen.classList.remove("hidden");


    // Animación
    welcomeScreen.classList.remove("entering");

    void welcomeScreen.offsetWidth;

    welcomeScreen.classList.add("entering");


    // Volver arriba
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
