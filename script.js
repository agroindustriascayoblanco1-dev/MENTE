// ============================================
// MIND — SISTEMA DE EMOCIONES
// ============================================


// ELEMENTOS PRINCIPALES

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


// EMOCIÓN SELECCIONADA

let selectedFeeling = null;


// ============================================
// CONTENIDO DE CADA EMOCIÓN
// ============================================

const feelingData = {

    Ansioso: {

        icon: "😰",

        title: "Vamos a bajar un poco el ritmo.",

        message:
            "No tienes que resolver todo ahora. Podemos concentrarnos solamente en este momento.",

        question:
            "¿Qué necesitas ahora?",

        options: [

            {
                icon: "🌬️",
                title: "Calmar mi cuerpo",
                description:
                    "Haz una pausa y acompaña tu respiración."
            },

            {
                icon: "🎯",
                title: "Volver al presente",
                description:
                    "Un ejercicio para alejarte un momento de los pensamientos."
            },

            {
                icon: "🧠",
                title: "Entender mi ansiedad",
                description:
                    "Explora qué puede estar provocando lo que sientes."
            },

            {
                icon: "💬",
                title: "Sacarlo de mi cabeza",
                description:
                    "Escribe aquello que está dando vueltas en tu mente."
            }

        ]

    },


    Triste: {

        icon: "😔",

        title: "No tienes que fingir que estás bien.",

        message:
            "Puedes darte permiso para sentir lo que estás sintiendo. Vamos a ir despacio.",

        question:
            "¿Qué te haría bien en este momento?",

        options: [

            {
                icon: "💙",
                title: "Acompañar lo que siento",
                description:
                    "Quédate un momento con tus emociones sin juzgarte."
            },

            {
                icon: "💭",
                title: "Entender mi tristeza",
                description:
                    "Explora qué puede estar detrás de cómo te sientes."
            },

            {
                icon: "🌤️",
                title: "Hacer algo pequeño",
                description:
                    "Encuentra una pequeña acción para cuidar de ti."
            },

            {
                icon: "💬",
                title: "Quiero expresarlo",
                description:
                    "Pon en palabras aquello que llevas dentro."
            }

        ]

    },


    Abrumado: {

        icon: "😵",

        title: "Vamos a quitar un poco de peso de tu cabeza.",

        message:
            "No necesitamos resolverlo todo. Vamos a ordenar una cosa a la vez.",

        question:
            "¿Por dónde quieres empezar?",

        options: [

            {
                icon: "🧩",
                title: "Ordenar mis pensamientos",
                description:
                    "Saca todo lo que tienes en la cabeza y ponlo en orden."
            },

            {
                icon: "🌬️",
                title: "Bajar la tensión",
                description:
                    "Haz una pausa para darle descanso a tu mente."
            },

            {
                icon: "📋",
                title: "Organizar lo urgente",
                description:
                    "Distingue qué necesita tu atención primero."
            },

            {
                icon: "💬",
                title: "Necesito sacar todo",
                description:
                    "Escribe libremente todo aquello que te está saturando."
            }

        ]

    },


    Normal: {

        icon: "😐",

        title: "También podemos conocerte mejor cuando estás tranquilo.",

        message:
            "No necesitas sentirte mal para cuidar tu mente. Este puede ser un buen momento para detenerte y conocerte.",

        question:
            "¿Qué te gustaría explorar?",

        options: [

            {
                icon: "🪞",
                title: "Conocerme mejor",
                description:
                    "Descubre más sobre tus pensamientos, emociones y hábitos."
            },

            {
                icon: "🧠",
                title: "Reflexionar",
                description:
                    "Hazte algunas preguntas y mira hacia dentro."
            },

            {
                icon: "🌱",
                title: "Trabajar en mí",
                description:
                    "Explora pequeños cambios que podrían ayudarte."
            },

            {
                icon: "✍️",
                title: "Escribir cómo estoy",
                description:
                    "Haz una pausa y escribe cómo ha sido tu día."
            }

        ]

    },


    Bien: {

        icon: "😊",

        title: "Qué bueno que hoy te sientes bien.",

        message:
            "Podemos aprovechar este momento para fortalecer aquello que te hace sentir así.",

        question:
            "¿Qué quieres hacer con este momento?",

        options: [

            {
                icon: "✨",
                title: "Potenciar mi bienestar",
                description:
                    "Descubre pequeñas cosas que pueden ayudarte a mantenerte bien."
            },

            {
                icon: "🎯",
                title: "Pensar en mis metas",
                description:
                    "Convierte esta energía en algo que quieras construir."
            },

            {
                icon: "🧠",
                title: "Conocerme mejor",
                description:
                    "Explora quién eres, cómo piensas y qué necesitas."
            },

            {
                icon: "📖",
                title: "Crear un hábito",
                description:
                    "Empieza algo pequeño que pueda ayudarte a largo plazo."
            }

        ]

    }

};


// ============================================
// REFERENCIAS A LAS OPCIONES
// ============================================

const optionButtons =
    document.querySelectorAll(".support-option");


// ============================================
// SELECCIONAR EMOCIÓN
// ============================================

feelings.forEach(function (feeling) {

    feeling.addEventListener("click", function () {


        // Quitar selección anterior

        feelings.forEach(function (item) {

            item.classList.remove("selected");

        });


        // Seleccionar esta emoción

        feeling.classList.add("selected");


        // Guardar emoción

        selectedFeeling =
            feeling.dataset.feeling;


        // Activar botón

        continueButton.disabled = false;


    });

});


// ============================================
// MOSTRAR OPCIONES SEGÚN EMOCIÓN
// ============================================

function updateSupportScreen() {


    const data =
        feelingData[selectedFeeling];


    if (!data) {
        return;
    }


    // ICONO

    supportIcon.textContent =
        data.icon;


    // TÍTULO

    supportTitle.textContent =
        data.title;


    // MENSAJE

    supportMessage.textContent =
        data.message;


    // PREGUNTA

    const question =
        document.querySelector(".support-question h2");


    if (question) {

        question.textContent =
            data.question;

    }


    // OPCIONES

    optionButtons.forEach(function (button, index) {


        const option =
            data.options[index];


        if (!option) {
            return;
        }


        const icon =
            button.querySelector(".option-icon");

        const title =
            button.querySelector("strong");

        const description =
            button.querySelector("small");


        icon.textContent =
            option.icon;


        title.textContent =
            option.title;


        description.textContent =
            option.description;


    });

}


// ============================================
// BOTÓN CONTINUAR
// ============================================

continueButton.addEventListener("click", function () {


    if (!selectedFeeling) {
        return;
    }


    // Actualizar contenido

    updateSupportScreen();


    // Ocultar inicio

    welcomeScreen.classList.add("hidden");


    // Mostrar segunda pantalla

    supportScreen.classList.remove("hidden");


    // Reiniciar animación

    supportScreen.classList.remove("entering");


    void supportScreen.offsetWidth;


    supportScreen.classList.add("entering");


    // Subir al inicio

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


});


// ============================================
// BOTÓN VOLVER
// ============================================

backButton.addEventListener("click", function () {


    // Ocultar segunda pantalla

    supportScreen.classList.add("hidden");


    // Mostrar inicio

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
