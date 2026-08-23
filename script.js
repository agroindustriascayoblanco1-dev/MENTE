// ============================================
// MIND
// SISTEMA PRINCIPAL
// ============================================


// ============================================
// ELEMENTOS PRINCIPALES
// ============================================

const feelings =
    document.querySelectorAll(".feeling");

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

const supportQuestion =
    document.querySelector(".support-question h2");

const supportOptions =
    document.querySelectorAll(".support-option");


// ============================================
// ESTADO
// ============================================

let selectedFeeling = null;



// ============================================
// INFORMACIÓN DE LAS EMOCIONES
// ============================================

const feelingData = {


    Ansioso: {

        icon: "😰",

        title:
            "Vamos a bajar un poco el ritmo.",

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
                    "Regresa tu atención a este momento."
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
                    "Escribe aquello que está dando vueltas."
            }

        ]

    },


    Triste: {

        icon: "😔",

        title:
            "No tienes que fingir que estás bien.",

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

        title:
            "Vamos a quitar un poco de peso de tu cabeza.",

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

        title:
            "También podemos conocerte mejor cuando estás tranquilo.",

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

        title:
            "Qué bueno que hoy te sientes bien.",

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
// SELECCIONAR EMOCIÓN
// ============================================

feelings.forEach(function (feeling) {


    feeling.addEventListener("click", function () {


        feelings.forEach(function (item) {

            item.classList.remove(
                "selected"
            );

        });


        feeling.classList.add(
            "selected"
        );


        selectedFeeling =
            feeling.dataset.feeling;


        continueButton.disabled =
            false;


    });

});



// ============================================
// ACTUALIZAR PANTALLA DE APOYO
// ============================================

function updateSupportScreen() {


    const data =
        feelingData[selectedFeeling];


    if (!data) {

        return;

    }


    supportIcon.textContent =
        data.icon;


    supportTitle.textContent =
        data.title;


    supportMessage.textContent =
        data.message;


    supportQuestion.textContent =
        data.question;


    supportOptions.forEach(
        function (button, index) {


            const option =
                data.options[index];


            if (!option) {

                return;

            }


            const icon =
                button.querySelector(
                    ".option-icon"
                );


            const title =
                button.querySelector(
                    "strong"
                );


            const description =
                button.querySelector(
                    "small"
                );


            icon.textContent =
                option.icon;


            title.textContent =
                option.title;


            description.textContent =
                option.description;


        }
    );

}



// ============================================
// CONTINUAR
// ============================================

continueButton.addEventListener(
    "click",
    function () {


        if (!selectedFeeling) {

            return;

        }


        updateSupportScreen();


        welcomeScreen.classList.add(
            "hidden"
        );


        supportScreen.classList.remove(
            "hidden"
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    }
);



// ============================================
// VOLVER
// ============================================

backButton.addEventListener(
    "click",
    function () {


        supportScreen.classList.add(
            "hidden"
        );


        welcomeScreen.classList.remove(
            "hidden"
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    }
);



// ============================================
// EXPERIENCIA DE RESPIRACIÓN
// ============================================

const breathingScreen =
    document.getElementById(
        "breathingScreen"
    );

const breathingIntro =
    document.getElementById(
        "breathingIntro"
    );

const breathingExercise =
    document.getElementById(
        "breathingExercise"
    );

const breathingFinish =
    document.getElementById(
        "breathingFinish"
    );


const startBreathing =
    document.getElementById(
        "startBreathing"
    );

const stopBreathing =
    document.getElementById(
        "stopBreathing"
    );

const breathingBack =
    document.getElementById(
        "breathingBack"
    );

const finishBreathing =
    document.getElementById(
        "finishBreathing"
    );


const breathingCircle =
    document.getElementById(
        "breathingCircle"
    );

const breathingPhase =
    document.getElementById(
        "breathingPhase"
    );

const breathingCounter =
    document.getElementById(
        "breathingCounter"
    );

const breathingInstruction =
    document.getElementById(
        "breathingInstruction"
    );

const breathingRound =
    document.getElementById(
        "breathingRound"
    );


const breathingDots =
    document.querySelectorAll(
        ".breathing-dots span"
    );


// ============================================
// ESTADO DE RESPIRACIÓN
// ============================================

let breathingTimer = null;

let breathingRunning = false;

let currentRound = 1;



// ============================================
// BOTÓN CALMAR MI CUERPO
// ============================================

const calmOption =
    document.querySelector(
        ".option-calm"
    );


if (calmOption) {


    calmOption.addEventListener(
        "click",
        function () {

            openBreathingExperience();

        }
    );

}



// ============================================
// ABRIR EXPERIENCIA
// ============================================

function openBreathingExperience() {


    supportScreen.classList.add(
        "hidden"
    );


    breathingScreen.classList.remove(
        "hidden"
    );


    breathingIntro.classList.remove(
        "hidden"
    );


    breathingExercise.classList.add(
        "hidden"
    );


    breathingFinish.classList.add(
        "hidden"
    );


    breathingRunning =
        false;


    currentRound =
        1;


    breathingRound.textContent =
        "1";


    resetBreathingVisuals();


}



// ============================================
// COMENZAR
// ============================================

startBreathing.addEventListener(
    "click",
    function () {


        breathingIntro.classList.add(
            "hidden"
        );


        breathingExercise.classList.remove(
            "hidden"
        );


        breathingRunning =
            true;


        currentRound =
            1;


        breathingRound.textContent =
            "1";


        startBreathingCycle();

    }
);



// ============================================
// CICLO
// ============================================

function startBreathingCycle() {


    if (!breathingRunning) {

        return;

    }


    runBreathingPhase(

        "inhale",

        "INHALA",

        "Toma aire lentamente.",

        4,

        function () {


            runBreathingPhase(

                "hold",

                "MANTÉN",

                "Quédate aquí un momento.",

                2,

                function () {


                    runBreathingPhase(

                        "exhale",

                        "EXHALA",

                        "Suelta el aire lentamente.",

                        6,

                        function () {

                            finishRound();

                        }

                    );

                }

            );

        }

    );

}



// ============================================
// FASE
// ============================================

function runBreathingPhase(
    phase,
    label,
    instruction,
    seconds,
    callback
) {


    if (!breathingRunning) {

        return;

    }


    breathingCircle.classList.remove(
        "inhale",
        "hold",
        "exhale"
    );


    breathingCircle.classList.add(
        phase
    );


    breathingPhase.textContent =
        label;


    breathingInstruction.textContent =
        instruction;


    let remaining =
        seconds;


    breathingCounter.textContent =
        remaining;


    breathingTimer =
        setInterval(
            function () {


                remaining--;


                breathingCounter.textContent =
                    remaining;


                if (remaining <= 0) {


                    clearInterval(
                        breathingTimer
                    );


                    callback();


                }

            },
            1000
        );

}



// ============================================
// FINAL DE RONDA
// ============================================

function finishRound() {


    if (!breathingRunning) {

        return;

    }


    if (currentRound >= 5) {


        finishBreathingSession();


        return;

    }


    breathingDots[
        currentRound - 1
    ].classList.add(
        "active"
    );


    currentRound++;


    breathingRound.textContent =
        currentRound;


    setTimeout(
        function () {

            startBreathingCycle();

        },
        500
    );

}



// ============================================
// FINALIZAR SESIÓN
// ============================================

function finishBreathingSession() {


    breathingRunning =
        false;


    clearInterval(
        breathingTimer
    );


    breathingExercise.classList.add(
        "hidden"
    );


    breathingFinish.classList.remove(
        "hidden"
    );


    breathingCircle.classList.remove(
        "inhale",
        "hold",
        "exhale"
    );

}



// ============================================
// DETENER RESPIRACIÓN
// ============================================

function stopBreathingExperience() {


    breathingRunning =
        false;


    clearInterval(
        breathingTimer
    );


    breathingScreen.classList.add(
        "hidden"
    );


    supportScreen.classList.remove(
        "hidden"
    );


    resetBreathingVisuals();

}



// ============================================
// BOTÓN TERMINAR
// ============================================

stopBreathing.addEventListener(
    "click",
    function () {

        stopBreathingExperience();

    }
);



// ============================================
// BOTÓN SALIR
// ============================================

breathingBack.addEventListener(
    "click",
    function () {

        stopBreathingExperience();

    }
);



// ============================================
// VOLVER A MIND
// ============================================

finishBreathing.addEventListener(
    "click",
    function () {


        breathingScreen.classList.add(
            "hidden"
        );


        supportScreen.classList.remove(
            "hidden"
        );


        resetBreathingVisuals();

    }
);



// ============================================
// RESPUESTA FINAL
// ============================================

const afterOptions =
    document.querySelectorAll(
        ".after-options button"
    );


afterOptions.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function () {


                afterOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


            }
        );

    }
);



// ============================================
// REINICIAR
// ============================================

function resetBreathingVisuals() {


    clearInterval(
        breathingTimer
    );


    breathingCircle.classList.remove(
        "inhale",
        "hold",
        "exhale"
    );


    breathingPhase.textContent =
        "Prepárate";


    breathingCounter.textContent =
        "4";


    breathingInstruction.textContent =
        "Sigue el círculo.";


    breathingDots.forEach(
        function (dot) {

            dot.classList.remove(
                "active"
            );

        }
    );

}
