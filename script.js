const feelings = document.querySelectorAll(".feeling");

const continueButton =
    document.getElementById("continueButton");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const supportScreen =
    document.getElementById("supportScreen");

const backButton =
    document.getElementById("backButton");

const supportIcon =
    document.getElementById("supportIcon");

const supportTitle =
    document.getElementById("supportTitle");

const supportMessage =
    document.getElementById("supportMessage");


let selectedFeeling = null;


/* =========================
   INFORMACIÓN DE CADA ESTADO
========================= */

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


/* =========================
   SELECCIONAR EMOCIÓN
========================= */

feelings.forEach((feeling) => {

    feeling.addEventListener("click", () => {

        feelings.forEach((item) => {
            item.classList.remove("selected");
        });


        feeling.classList.add("selected");


        selectedFeeling =
            feeling.dataset.feeling;


        continueButton.disabled = false;

    });

});


/* =========================
   CONTINUAR
========================= */

continueButton.addEventListener("click", () => {

    if (!selectedFeeling) {
        return;
    }


    const data =
        feelingData[selectedFeeling];


    supportIcon.textContent =
        data.icon;


    supportTitle.textContent =
        data.title;


    supportMessage.textContent =
        data.message;


    welcomeScreen.classList.add("hidden");


    supportScreen.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   VOLVER
========================= */

backButton.addEventListener("click", () => {

    supportScreen.classList.add("hidden");

    welcomeScreen.classList.remove("hidden");

});
