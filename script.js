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


// ============================================
// EXPERIENCIA: ENTENDER LO QUE SIENTO
// ============================================

const understandingScreen =
    document.getElementById("understandingScreen");

const understandingIntro =
    document.getElementById("understandingIntro");

const understandingQuestion =
    document.getElementById("understandingQuestion");

const understandingResult =
    document.getElementById("understandingResult");

const understandingStart =
    document.getElementById("understandingStart");

const understandingBack =
    document.getElementById("understandingBack");

const understandingFinish =
    document.getElementById("understandingFinish");

const understandingStep =
    document.getElementById("understandingStep");

const questionNumber =
    document.getElementById("questionNumber");

const questionTitle =
    document.getElementById("questionTitle");

const questionDescription =
    document.getElementById("questionDescription");

const questionOptions =
    document.getElementById("questionOptions");

const understandingResultText =
    document.getElementById("understandingResultText");

const understandingIntroTitle =
    document.getElementById("understandingIntroTitle");

const understandingIntroMessage =
    document.getElementById("understandingIntroMessage");

// ============================================
// ACCIONES DE LAS OPCIONES DE APOYO
// ============================================
// Las clases visuales son fijas; el contenido cambia según la emoción.
// Por eso usamos el texto actual del botón para decidir qué experiencia abrir.

supportOptions.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const titleElement = button.querySelector("strong");
        const title = titleElement
            ? titleElement.textContent.trim()
            : "";

        if (title === "Calmar mi cuerpo") {
            openBreathingExperience();
            return;
        }

        if (title === "Conocerme mejor") {
            openUnderstandingExperience("self");
            return;
        }

        if (title.indexOf("Entender mi") === 0) {
            openUnderstandingExperience("anxiety");
            return;
        }

        // Las demás opciones todavía no tienen una experiencia
        // específica; no se redirigen accidentalmente a respiración.
    });
});

let understandingAnswers = {
    first: null,
    second: null,
    third: null
};

let currentUnderstandingQuestion = 0;

let understandingMode = "anxiety";

const selfUnderstandingQuestions = [
    {
        title: "¿Qué parte de ti te gustaría conocer mejor?",
        description: "No hay una respuesta correcta. Elige aquello que más curiosidad te despierte.",
        options: [
            { icon: "🧠", title: "Mis pensamientos", description: "Quiero entender cómo funciona mi mente." },
            { icon: "💗", title: "Mis emociones", description: "Quiero reconocer mejor lo que siento." },
            { icon: "🔄", title: "Mis hábitos", description: "Quiero descubrir patrones en mi día a día." },
            { icon: "✨", title: "Lo que quiero", description: "Quiero entender mejor mis deseos y metas." },
            { icon: "🪞", title: "Quién soy", description: "Quiero explorar mi identidad y lo que me hace ser yo." }
        ]
    },
    {
        title: "¿Qué suele influir más en cómo te sientes?",
        description: "Piensa en lo que más cambia tu estado de ánimo durante un día normal.",
        options: [
            { icon: "👥", title: "Las personas", description: "Lo que ocurre con quienes me rodean." },
            { icon: "🏠", title: "Mi entorno", description: "El lugar y las situaciones que vivo." },
            { icon: "📋", title: "Mis responsabilidades", description: "Todo lo que tengo que hacer o resolver." },
            { icon: "🌙", title: "Mi descanso", description: "Cómo duermo, descanso y recupero energía." },
            { icon: "💭", title: "Lo que pienso", description: "La forma en que interpreto lo que ocurre." }
        ]
    },
    {
        title: "¿Qué te gustaría fortalecer en ti?",
        description: "Elige algo que te gustaría cultivar poco a poco.",
        options: [
            { icon: "🌿", title: "Tranquilidad", description: "Quiero sentir más calma en mi día." },
            { icon: "🛡️", title: "Confianza", description: "Quiero confiar más en mí y en mis decisiones." },
            { icon: "💬", title: "Expresión", description: "Quiero comunicar mejor lo que siento y pienso." },
            { icon: "🧭", title: "Dirección", description: "Quiero tener más claridad sobre hacia dónde voy." },
            { icon: "💛", title: "Bienestar", description: "Quiero aprender a cuidarme mejor." }
        ]
    }
];

const understandingQuestions = [
    {
        title: "¿Qué es lo que más está ocupando tu mente?",
        description:
            "No lo pienses demasiado. Elige lo primero que se acerque a lo que estás viviendo.",
        options: [
            {
                icon: "🔄",
                title: "Algo que pasó",
                description: "Algo del pasado sigue dando vueltas."
            },
            {
                icon: "🔮",
                title: "Algo que podría pasar",
                description: "Estoy pensando mucho en el futuro."
            },
            {
                icon: "👤",
                title: "Una persona",
                description: "Hay alguien que está ocupando mi mente."
            },
            {
                icon: "📋",
                title: "Algo que tengo que hacer",
                description: "Tengo algo pendiente que me preocupa."
            },
            {
                icon: "🌫️",
                title: "No estoy seguro",
                description: "Sé que algo pasa, pero no sé exactamente qué."
            }
        ]
    },
    {
        title: "¿Cómo se siente eso dentro de ti?",
        description:
            "Puedes elegir la emoción que más se acerque, aunque no sea exactamente la palabra que usarías.",
        options: [
            {
                icon: "😟",
                title: "Preocupación",
                description: "Mi mente no deja de pensar en ello."
            },
            {
                icon: "😨",
                title: "Miedo",
                description: "Siento que algo malo puede ocurrir."
            },
            {
                icon: "😣",
                title: "Culpa",
                description: "Siento que hice algo mal o pude hacerlo mejor."
            },
            {
                icon: "😠",
                title: "Enojo",
                description: "Hay algo que me molesta mucho."
            },
            {
                icon: "😔",
                title: "Tristeza",
                description: "Esto me está haciendo sentir decaído."
            },
            {
                icon: "🌫️",
                title: "Confusión",
                description: "No logro entender exactamente qué siento."
            }
        ]
    },
    {
        title: "¿Qué crees que necesitas ahora?",
        description:
            "No tienes que elegir lo que deberías necesitar. Elige lo que realmente sientes que te ayudaría.",
        options: [
            {
                icon: "🛡️",
                title: "Sentirme seguro",
                description: "Necesito sentir que estoy a salvo."
            },
            {
                icon: "🌙",
                title: "Descansar",
                description: "Mi mente y mi cuerpo necesitan una pausa."
            },
            {
                icon: "🧩",
                title: "Resolver algo",
                description: "Hay algo concreto que quiero solucionar."
            },
            {
                icon: "🫂",
                title: "Hablar con alguien",
                description: "No quiero cargar esto completamente solo."
            },
            {
                icon: "🪞",
                title: "Entenderme",
                description: "Quiero conocer mejor lo que me está pasando."
            },
            {
                icon: "💬",
                title: "Dejarlo salir",
                description: "Necesito expresar todo lo que tengo dentro."
            }
        ]
    }
];



function openUnderstandingExperience(mode = "anxiety") {
    if (!understandingScreen) {
        return;
    }

    understandingMode = mode;

    supportScreen.classList.add("hidden");
    breathingScreen.classList.add("hidden");
    understandingScreen.classList.remove("hidden");

    understandingIntro.classList.remove("hidden");
    understandingQuestion.classList.add("hidden");
    understandingResult.classList.add("hidden");

    understandingAnswers = {
        first: null,
        second: null,
        third: null
    };

    currentUnderstandingQuestion = 0;

    const feelingMessages = {
        Ansioso: {
            title: "Vamos a entender un poco mejor lo que está pasando.",
            message:
                "No tienes que encontrar una explicación perfecta. Solo vamos a observar qué está alimentando lo que sientes."
        },
        Triste: {
            title: "Vamos a darle un poco de espacio a lo que sientes.",
            message:
                "No tienes que dejar de sentirte triste ahora. Podemos intentar entender qué hay detrás de esa emoción."
        },
        Abrumado: {
            title: "Vamos a ordenar un poco todo lo que tienes encima.",
            message:
                "No vamos a resolverlo todo de una vez. Primero vamos a descubrir qué está ocupando más espacio."
        },
        Normal: {
            title: "Vamos a conocerte un poco mejor.",
            message:
                "No necesitas estar pasando por un mal momento para detenerte y entender tus pensamientos y necesidades."
        },
        Bien: {
            title: "También podemos aprender de los momentos buenos.",
            message:
                "Vamos a mirar qué estás sintiendo y qué necesitas para cuidar este momento."
        }
    };

    if (understandingMode === "self") {
        understandingIntroTitle.textContent =
            "Vamos a conocerte un poco mejor.";

        understandingIntroMessage.textContent =
            "No se trata de ponerte una etiqueta. Vamos a explorar tus pensamientos, emociones, hábitos y necesidades con curiosidad.";
    } else {
        const content =
            feelingMessages[selectedFeeling] ||
            feelingMessages.Ansioso;

        understandingIntroTitle.textContent =
            content.title;

        understandingIntroMessage.textContent =
            content.message;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

if (understandingStart) {
    understandingStart.addEventListener("click", function () {
        understandingIntro.classList.add("hidden");
        understandingQuestion.classList.remove("hidden");
        currentUnderstandingQuestion = 0;
        showUnderstandingQuestion();
    });
}

function showUnderstandingQuestion() {
    const questionSet = understandingMode === "self"
        ? selfUnderstandingQuestions
        : understandingQuestions;

    const question =
        questionSet[currentUnderstandingQuestion];

    if (!question) {
        showUnderstandingResult();
        return;
    }

    const questionIndex =
        currentUnderstandingQuestion + 1;

    understandingStep.textContent =
        questionIndex;

    questionNumber.textContent =
        "PREGUNTA " + questionIndex;

    questionTitle.textContent =
        question.title;

    questionDescription.textContent =
        question.description;

    questionOptions.innerHTML = "";

    question.options.forEach(function (option) {
        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "question-option";

        button.innerHTML = `
            <div class="question-option-icon">
                ${option.icon}
            </div>

            <div class="question-option-text">
                <strong>${option.title}</strong>
                <small>${option.description}</small>
            </div>

            <span class="question-option-arrow">→</span>
        `;

        button.addEventListener("click", function () {
            selectUnderstandingAnswer(option.title);
        });

        questionOptions.appendChild(button);
    });
}

function selectUnderstandingAnswer(answer) {
    if (currentUnderstandingQuestion === 0) {
        understandingAnswers.first = answer;
    } else if (currentUnderstandingQuestion === 1) {
        understandingAnswers.second = answer;
    } else if (currentUnderstandingQuestion === 2) {
        understandingAnswers.third = answer;
    }

    setTimeout(function () {
        currentUnderstandingQuestion++;

        if (
            currentUnderstandingQuestion >=
            (understandingMode === "self"
                ? selfUnderstandingQuestions.length
                : understandingQuestions.length)
        ) {
            showUnderstandingResult();
        } else {
            showUnderstandingQuestion();
        }
    }, 280);
}

function showUnderstandingResult() {
    understandingQuestion.classList.add("hidden");
    understandingResult.classList.remove("hidden");

    const first =
        understandingAnswers.first;

    const second =
        understandingAnswers.second;

    const third =
        understandingAnswers.third;

    let result = "";

    if (understandingMode === "self") {
        result =
            `Hoy descubriste algo importante sobre ti: quieres conocer mejor ${first ? first.toLowerCase() : "tu mundo interior"}. También notas que ${second ? second.toLowerCase() : "hay cosas que influyen en cómo te sientes"} y te gustaría fortalecer ${third ? third.toLowerCase() : "tu bienestar"}.`;

        result +=
            " No necesitas cambiar todo de una vez. Conocerte mejor también significa aprender a observarte con curiosidad y sin juzgarte.";
    } else if (
        second === "Preocupación" ||
        second === "Miedo"
    ) {
        result =
            `Parece que ${first ? first.toLowerCase() : "algo"} está ocupando bastante espacio en tu mente y está despertando ${second.toLowerCase()}. Cuando algo nos importa, nuestra mente puede intentar anticiparse a todo lo que podría ocurrir.`;
    } else if (second === "Tristeza") {
        result =
            `Parece que ${first ? first.toLowerCase() : "algo"} está conectado con una sensación de tristeza. No tienes que obligarte a dejar de sentirla inmediatamente. Reconocerla puede ser una forma de empezar a cuidarte.`;
    } else if (second === "Enojo") {
        result =
            `Parece que hay algo que te está generando bastante enojo. Esa emoción también puede estar señalando que algo importante para ti se sintió afectado o que algún límite fue cruzado.`;
    } else if (second === "Culpa") {
        result =
            `Parece que hay algo que estás cargando con cierta culpa. Mirar una situación con honestidad no significa que tengas que castigarte por ella.`;
    } else {
        result =
            `Parece que hay algo que necesita un poco más de atención dentro de ti. No tienes que entenderlo completamente hoy. Lo importante es que te permitiste detenerte y observarlo.`;
    }

    result +=
        ` Ahora mismo sientes que necesitas ${third ? third.toLowerCase() : "un momento para ti"}.`;

    understandingResultText.textContent =
        result;
}

if (understandingBack) {
    understandingBack.addEventListener("click", function () {
        understandingScreen.classList.add("hidden");
        supportScreen.classList.remove("hidden");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

if (understandingFinish) {
    understandingFinish.addEventListener("click", function () {
        understandingScreen.classList.add("hidden");
        supportScreen.classList.remove("hidden");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

