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

let understandingAnswers = {
    first: null,
    second: null,
    third: null
};

let currentUnderstandingQuestion = 0;

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

const understandOption =
    document.querySelector(".option-clear");

if (understandOption) {
    understandOption.addEventListener("click", function () {
        openUnderstandingExperience();
    });
}

function openUnderstandingExperience() {
    if (!understandingScreen) {
        return;
    }

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

    const content =
        feelingMessages[selectedFeeling] ||
        feelingMessages.Ansioso;

    understandingIntroTitle.textContent =
        content.title;

    understandingIntroMessage.textContent =
        content.message;

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
    const question =
        understandingQuestions[currentUnderstandingQuestion];

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
            understandingQuestions.length
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

    if (
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



// ============================================
// CONOCERME MEJOR — EXPERIENCIA INDEPENDIENTE
// ============================================

const selfKnowledgeScreen = document.getElementById("selfKnowledgeScreen");
const selfKnowledgeIntro = document.getElementById("selfKnowledgeIntro");
const selfKnowledgeQuestion = document.getElementById("selfKnowledgeQuestion");
const selfKnowledgeResult = document.getElementById("selfKnowledgeResult");
const selfKnowledgeStart = document.getElementById("selfKnowledgeStart");
const selfKnowledgeBack = document.getElementById("selfKnowledgeBack");
const selfKnowledgeFinish = document.getElementById("selfKnowledgeFinish");
const selfKnowledgeStep = document.getElementById("selfKnowledgeStep");
const selfKnowledgeNumber = document.getElementById("selfKnowledgeNumber");
const selfKnowledgeTitle = document.getElementById("selfKnowledgeTitle");
const selfKnowledgeDescription = document.getElementById("selfKnowledgeDescription");
const selfKnowledgeOptions = document.getElementById("selfKnowledgeOptions");
const selfKnowledgeResultText = document.getElementById("selfKnowledgeResultText");

let selfKnowledgeAnswers = {
    area: null,
    pattern: null,
    need: null
};

const selfKnowledgeFlows = {
    "Normal": {
        area: "Mi forma de ser",
        second: {
            title: "¿En qué momentos sientes que puedes ser más tú mismo?",
            options: [
                ["🏠", "Cuando estoy solo", "Me siento libre para pensar y actuar a mi manera."],
                ["🫂", "Con personas de confianza", "Puedo mostrar partes de mí sin tanta preocupación."],
                ["🎨", "Cuando hago lo que me gusta", "Mis intereses me ayudan a expresarme."],
                ["🌎", "En lugares nuevos", "A veces un entorno diferente me permite soltarme."]
            ]
        },
        third: {
            title: "¿Qué te gustaría conocer mejor de ti?",
            options: [
                ["🪞", "Mis fortalezas", "Quiero reconocer lo que hago bien."],
                ["🧭", "Mis límites", "Quiero entender qué necesito y qué no quiero aceptar."],
                ["❤️", "Mis necesidades", "Quiero reconocer mejor lo que necesito."],
                ["🌱", "Lo que puedo mejorar", "Quiero crecer sin exigirme ser perfecto."]
            ]
        }
    },

    "Bien": {
        area: "Mi bienestar",
        second: {
            title: "¿Qué crees que está ayudando a que hoy te sientas bien?",
            options: [
                ["🌿", "Mi tranquilidad", "He encontrado un poco de calma."],
                ["🫂", "Mis relaciones", "Sentirme acompañado influye positivamente en mí."],
                ["🎯", "Mis logros", "Estoy viendo avances que me hacen sentir bien."],
                ["☀️", "Las pequeñas cosas", "Hay detalles sencillos que estoy disfrutando."]
            ]
        },
        third: {
            title: "¿Qué te gustaría cuidar más de este momento?",
            options: [
                ["🌱", "Mi bienestar", "Quiero mantener hábitos que me hagan bien."],
                ["❤️", "Mis relaciones", "Quiero cuidar los vínculos importantes."],
                ["🧠", "Mi equilibrio", "Quiero aprender a cuidar también mi mente."],
                ["🎨", "Mi autenticidad", "Quiero seguir siendo yo mismo."]
            ]
        }
    }
};

function openSelfKnowledgeExperience() {
    if (!selfKnowledgeScreen) return;

    supportScreen.classList.add("hidden");
    breathingScreen.classList.add("hidden");
    understandingScreen.classList.add("hidden");
    selfKnowledgeScreen.classList.remove("hidden");

    selfKnowledgeIntro.classList.remove("hidden");
    selfKnowledgeQuestion.classList.add("hidden");
    selfKnowledgeResult.classList.add("hidden");

    selfKnowledgeAnswers = { area: null, pattern: null, need: null };
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSelfKnowledgeQuestion(step) {
    const flow = selfKnowledgeFlows[selectedFeeling] || selfKnowledgeFlows["Normal"];
    let data;

    if (step === 1) {
        data = {
            title: "¿Qué parte de ti quieres conocer mejor?",
            description: "Elige lo que más te gustaría comprender en este momento.",
            options: [
                ["🧠", "Mis pensamientos", "Quiero entender cómo funciona mi mente."],
                ["❤️", "Mis emociones", "Quiero comprender mejor lo que siento."],
                ["🪞", flow.area, "Quiero descubrir más sobre quién soy."],
                ["🤝", "Mis relaciones", "Quiero entender cómo me relaciono."],
                ["🎯", "Lo que quiero para mi vida", "Quiero tener más claridad."]
            ]
        };
    } else if (step === 2) {
        data = flow.second;
    } else {
        data = flow.third;
    }

    selfKnowledgeStep.textContent = step;
    selfKnowledgeNumber.textContent = `PREGUNTA ${step}`;
    selfKnowledgeTitle.textContent = data.title;
    selfKnowledgeDescription.textContent = data.description;
    selfKnowledgeOptions.innerHTML = "";

    data.options.forEach(([icon, title, description]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "question-option";
        button.innerHTML = `
            <div class="question-option-icon">${icon}</div>
            <div class="question-option-text">
                <strong>${title}</strong>
                <small>${description}</small>
            </div>
            <span class="question-option-arrow">→</span>
        `;

        button.addEventListener("click", () => {
            if (step === 1) selfKnowledgeAnswers.area = title;
            if (step === 2) selfKnowledgeAnswers.pattern = title;
            if (step === 3) selfKnowledgeAnswers.need = title;

            if (step < 3) {
                renderSelfKnowledgeQuestion(step + 1);
            } else {
                renderSelfKnowledgeResult();
            }
        });

        selfKnowledgeOptions.appendChild(button);
    });
}

function renderSelfKnowledgeResult() {
    selfKnowledgeQuestion.classList.add("hidden");
    selfKnowledgeResult.classList.remove("hidden");

    const a = selfKnowledgeAnswers;
    const area = a.area || "una parte de ti";
    const pattern = a.pattern || "cómo vives algunas situaciones";
    const need = a.need || "seguir conociéndote";

    let advice = "Date unos minutos esta semana para observarte sin juzgarte.";
    let information = "Conocerte mejor no significa encontrar una etiqueta definitiva. Tus necesidades y formas de reaccionar pueden cambiar.";

    if (a.area === "Mis emociones") {
        advice = "Cuando aparezca una emoción intensa, intenta nombrarla antes de intentar cambiarla: “Estoy sintiendo ___ porque ___”.";
        information = "Las emociones pueden darte información sobre necesidades, límites y experiencias, pero una emoción por sí sola no define quién eres.";
    } else if (a.area === "Mis pensamientos") {
        advice = "Escribe un pensamiento que se repita y sepáralo en dos partes: lo que sabes que ocurrió y lo que tu mente está suponiendo.";
        information = "Un pensamiento puede sentirse muy convincente sin ser necesariamente un hecho. Observarlo con curiosidad puede ayudarte a tomar distancia.";
    } else if (a.area === "Mis relaciones") {
        advice = "Prueba expresar una necesidad pequeña con claridad, sin sentir que tienes que justificarla demasiado.";
        information = "Conocerte también incluye reconocer qué necesitas de los demás y qué límites ayudan a cuidar tus relaciones.";
    } else if (a.area === "Lo que quiero para mi vida") {
        advice = "Elige una acción pequeña para esta semana que te acerque a lo que quieres, en lugar de intentar resolver todo de una vez.";
        information = "Tener dudas sobre el futuro es normal. La claridad muchas veces aparece mientras avanzas, no antes.";
    }

    selfKnowledgeResultText.innerHTML = `
        <span class="result-section-label">🔎 Lo que podrías estar descubriendo</span>
        <span class="result-section-text">
            Elegiste explorar <strong>${area.toLowerCase()}</strong>.
            También identificaste que <strong>${pattern.toLowerCase()}</strong>
            y que te gustaría <strong>${need.toLowerCase()}</strong>.
            Juntas, estas respuestas sugieren un área de ti que merece más atención y curiosidad.
        </span>

        <span class="result-section-label">💡 Un pequeño consejo</span>
        <span class="result-section-text">${advice}</span>

        <span class="result-section-label">🪞 Para reflexionar</span>
        <span class="result-quote">
            “¿Qué podrías descubrir de ti si, en lugar de juzgarte, empezaras a escucharte?”
        </span>

        <span class="result-section-label">ℹ️ Algo importante</span>
        <span class="result-section-text">${information}</span>
    `;
}

if (selfKnowledgeStart) {
    selfKnowledgeStart.addEventListener("click", () => {
        selfKnowledgeIntro.classList.add("hidden");
        selfKnowledgeQuestion.classList.remove("hidden");
        renderSelfKnowledgeQuestion(1);
    });
}

if (selfKnowledgeBack) {
    selfKnowledgeBack.addEventListener("click", () => {
        selfKnowledgeScreen.classList.add("hidden");
        supportScreen.classList.remove("hidden");
    });
}

if (selfKnowledgeFinish) {
    selfKnowledgeFinish.addEventListener("click", () => {
        selfKnowledgeScreen.classList.add("hidden");
        supportScreen.classList.remove("hidden");
    });
}

// Conecta el botón por su texto visible, no por la posición de la tarjeta.
document.querySelectorAll(".support-option").forEach((button) => {
    button.addEventListener("click", function (event) {
        const title = this.querySelector("strong")?.textContent.trim() || "";

        if (title === "Conocerme mejor") {
            event.stopImmediatePropagation();
            openSelfKnowledgeExperience();
        }
    }, true);
});

