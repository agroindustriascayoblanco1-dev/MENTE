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
    "Mis pensamientos": {
        intro: "Quieres comprender cómo funciona tu mente y qué ocurre dentro de ella.",
        second: [
            ["🔁", "Le doy muchas vueltas", "Una idea vuelve una y otra vez aunque quiera dejarla atrás."],
            ["🌪️", "Tengo muchas ideas a la vez", "Me cuesta ordenar todo lo que aparece en mi mente."],
            ["🔮", "Me adelanto a lo que podría pasar", "Suelo imaginar escenarios antes de que ocurran."],
            ["🪨", "Me quedo atrapado en una idea", "A veces una preocupación ocupa demasiado espacio."]
        ],
        third: {
            "Le doy muchas vueltas": [
                ["📝", "Ordenar lo que pienso", "Quiero separar lo importante de lo que puedo soltar."],
                ["🌿", "Aprender a parar", "Quiero encontrar una forma de darle descanso a mi mente."],
                ["🔎", "Entender por qué me pasa", "Quiero descubrir qué activa esos pensamientos."],
                ["🕊️", "Dejar ir algunas ideas", "Quiero aprender a no seguir cada pensamiento."]
            ],
            "Tengo muchas ideas a la vez": [
                ["📋", "Organizarme", "Quiero poner mis ideas en un orden que pueda manejar."],
                ["🎯", "Concentrarme", "Quiero poder quedarme con una cosa a la vez."],
                ["🧹", "Reducir el ruido", "Quiero distinguir lo que necesito atender de lo demás."],
                ["⚖️", "Encontrar equilibrio", "Quiero pensar sin sentir que todo es urgente."]
            ],
            "Me adelanto a lo que podría pasar": [
                ["🧭", "Volver al presente", "Quiero distinguir lo que ocurre ahora de lo que imagino."],
                ["🔎", "Diferenciar hechos y posibilidades", "Quiero pensar con más claridad."],
                ["🌱", "Tolerar la incertidumbre", "Quiero sentirme más tranquilo cuando no sé qué pasará."],
                ["🛡️", "Sentirme preparado sin preocuparme de más", "Quiero planificar sin vivir en escenarios futuros."]
            ],
            "Me quedo atrapado en una idea": [
                ["🔄", "Cambiar de perspectiva", "Quiero poder mirar una situación desde otro ángulo."],
                ["🧩", "Entender qué la mantiene", "Quiero descubrir por qué esa idea sigue regresando."],
                ["🌿", "Tomar distancia", "Quiero observar lo que pienso sin quedar atrapado."],
                ["💬", "Hablarlo", "Quiero poder poner en palabras lo que me pasa."]
            ]
        }
    },

    "Mis emociones": {
        intro: "Quieres comprender mejor lo que sientes y la manera en que respondes a tus emociones.",
        second: [
            ["🤐", "Me las guardo", "Me cuesta mostrar lo que siento aunque esté pasando por dentro."],
            ["🌊", "Me llegan con mucha intensidad", "Cuando aparecen, pueden ocupar gran parte de mi atención."],
            ["🌫️", "Me cuesta saber qué siento", "Sé que algo pasa, pero no siempre puedo identificarlo."],
            ["💬", "Necesito expresarlas", "Cuando siento algo importante, me nace hablar o demostrarlo."]
        ],
        third: {
            "Me las guardo": [
                ["🗣️", "Encontrar palabras", "Quiero poder explicar lo que siento sin bloquearme."],
                ["🛡️", "Sentirme seguro al expresarme", "Quiero dejar de sentir que mostrarme me hace vulnerable."],
                ["🤍", "Aceptar lo que siento", "Quiero dejar de juzgar mis propias emociones."],
                ["🫂", "Aprender a pedir apoyo", "Quiero poder acercarme a alguien cuando lo necesito."]
            ],
            "Me llegan con mucha intensidad": [
                ["🌿", "Regular la intensidad", "Quiero aprender a atravesar una emoción sin sentir que me domina."],
                ["🔎", "Entender qué la activa", "Quiero reconocer qué hay detrás de mis reacciones."],
                ["⏸️", "Dar espacio antes de reaccionar", "Quiero tener un momento para elegir cómo responder."],
                ["❤️", "Tratarme con más paciencia", "Quiero dejar de exigirme controlar todo inmediatamente."]
            ],
            "Me cuesta saber qué siento": [
                ["🏷️", "Ponerle nombre", "Quiero distinguir mejor entre las emociones que aparecen."],
                ["🧠", "Entender qué necesito", "Quiero descubrir qué me está intentando comunicar una emoción."],
                ["📖", "Reconocer mis patrones", "Quiero observar cuándo suelen aparecer determinadas emociones."],
                ["🤝", "Aprender a hablar de ello", "Quiero encontrar una manera sencilla de explicarlo."]
            ],
            "Necesito expresarlas": [
                ["💬", "Comunicar sin lastimar", "Quiero expresar lo que siento cuidando también al otro."],
                ["🎯", "Decir lo que necesito", "Quiero que mis emociones puedan ayudarme a explicar mis necesidades."],
                ["⏸️", "Elegir el momento", "Quiero saber cuándo es mejor hablar y cuándo esperar."],
                ["🤍", "Sentirme escuchado", "Quiero aprender a buscar espacios donde pueda expresarme con confianza."]
            ]
        }
    },

    "Mi forma de ser": {
        intro: "Quieres descubrir qué partes de tu personalidad, valores y necesidades forman la manera en que eres.",
        second: [
            ["🏠", "Soy más yo cuando estoy solo", "A solas siento que puedo actuar sin pensar demasiado en los demás."],
            ["🫂", "Soy más yo con personas de confianza", "Necesito sentir seguridad para mostrarme realmente."],
            ["🎨", "Soy más yo haciendo lo que me gusta", "Mis intereses me permiten expresar partes importantes de mí."],
            ["🌎", "Estoy descubriéndome todavía", "Siento que algunas partes de mí todavía están cambiando."]
        ],
        third: {
            "Soy más yo cuando estoy solo": [
                ["🪞", "Entender qué necesito de los demás", "Quiero llevar esa autenticidad también a mis relaciones."],
                ["🗣️", "Expresarme con más libertad", "Quiero mostrar más de mí sin sentir tanta presión."],
                ["🤝", "Construir confianza", "Quiero encontrar personas con las que pueda sentirme seguro."],
                ["🌱", "Aceptar mi manera de ser", "Quiero dejar de comparar mi forma de ser con la de otros."]
            ],
            "Soy más yo con personas de confianza": [
                ["🛡️", "Entender qué me hace sentir seguro", "Quiero reconocer qué necesito para abrirme."],
                ["🌿", "Llevar esa seguridad a otros espacios", "Quiero sentirme más cómodo fuera de mi círculo cercano."],
                ["💬", "Expresar mis límites", "Quiero cuidar esa confianza sin dejar de decir lo que necesito."],
                ["🪞", "Reconocer quién soy cuando me siento libre", "Quiero identificar qué partes de mí aparecen en esos momentos."]
            ],
            "Soy más yo haciendo lo que me gusta": [
                ["🎯", "Reconocer mis intereses", "Quiero entender qué dicen mis gustos sobre mí."],
                ["⏳", "Darles más espacio", "Quiero proteger tiempo para las cosas que disfruto."],
                ["🌱", "Convertir intereses en crecimiento", "Quiero usar lo que me gusta para seguir desarrollándome."],
                ["🪞", "Conocer mis valores", "Quiero descubrir qué hay detrás de las cosas que me importan."]
            ],
            "Estoy descubriéndome todavía": [
                ["🧭", "Entender mis valores", "Quiero saber qué cosas son realmente importantes para mí."],
                ["❤️", "Reconocer mis necesidades", "Quiero saber qué necesito para sentirme bien conmigo."],
                ["🪞", "Aceptar mis cambios", "Quiero entender que cambiar también forma parte de mí."],
                ["🎯", "Tomar decisiones más propias", "Quiero distinguir lo que quiero de lo que otros esperan de mí."]
            ]
        }
    },

    "Mis relaciones": {
        intro: "Quieres comprender qué necesitas de tus vínculos y cómo puedes construir relaciones más auténticas.",
        second: [
            ["🤝", "Busco sentirme comprendido", "Para mí es importante poder ser escuchado y entendido."],
            ["🛡️", "Busco sentirme seguro", "Necesito confianza para poder abrirme de verdad."],
            ["💬", "Necesito poder hablar", "La comunicación es una parte importante de mis vínculos."],
            ["❤️", "Busco sentir cercanía", "Valoro compartir, conectar y sentir que importo."]
        ],
        third: {
            "Busco sentirme comprendido": [
                ["🗣️", "Explicar mejor lo que necesito", "Quiero ayudar a los demás a entenderme."],
                ["👂", "Escuchar sin miedo a ser juzgado", "Quiero sentir que puedo hablar de lo que realmente me pasa."],
                ["🤍", "Aceptarme aunque no me entiendan", "Quiero que mi bienestar no dependa completamente de ser comprendido."],
                ["🫂", "Encontrar vínculos donde pueda ser yo", "Quiero rodearme de relaciones donde exista autenticidad."]
            ],
            "Busco sentirme seguro": [
                ["🛡️", "Reconocer mis límites", "Quiero saber qué necesito para sentirme respetado."],
                ["🤝", "Construir confianza poco a poco", "Quiero aprender a abrirme sin apresurarme."],
                ["🔎", "Distinguir seguridad de costumbre", "Quiero observar qué vínculos realmente me hacen bien."],
                ["💬", "Decir cuando algo me incomoda", "Quiero poder cuidar mi bienestar dentro de una relación."]
            ],
            "Necesito poder hablar": [
                ["💬", "Decir lo que siento", "Quiero expresar mis emociones con claridad."],
                ["🎯", "Decir lo que necesito", "Quiero que mis conversaciones también incluyan mis necesidades."],
                ["⏸️", "Aprender a conversar en momentos difíciles", "Quiero evitar reaccionar impulsivamente."],
                ["👂", "Aprender a escuchar", "Quiero que la comunicación sea de ida y vuelta."]
            ],
            "Busco sentir cercanía": [
                ["❤️", "Mostrar afecto", "Quiero expresar mejor lo que siento por las personas importantes."],
                ["🫂", "Compartir más de mí", "Quiero permitir que otros conozcan partes más profundas de mí."],
                ["⚖️", "Equilibrar cercanía y espacio", "Quiero cuidar el vínculo sin perder mi individualidad."],
                ["🌱", "Crear vínculos auténticos", "Quiero relaciones donde pueda sentirme yo mismo."]
            ]
        }
    },

    "Lo que quiero para mi vida": {
        intro: "Quieres explorar qué dirección, necesidades o prioridades pueden ayudarte a construir una vida más acorde contigo.",
        second: [
            ["🧭", "Me falta una dirección", "Tengo dudas sobre hacia dónde quiero ir."],
            ["🎯", "Tengo ideas pero me cuesta enfocarme", "Sé algunas cosas que quiero, pero no logro ordenarlas."],
            ["🌱", "Estoy descubriendo qué quiero", "Todavía estoy explorando posibilidades para mi futuro."],
            ["⚖️", "Quiero equilibrar mi vida", "Quiero que distintas áreas de mi vida puedan convivir mejor."]
        ],
        third: {
            "Me falta una dirección": [
                ["🧭", "Descubrir qué me importa", "Quiero empezar por mis valores y prioridades."],
                ["🔎", "Conocer mis opciones", "Quiero explorar caminos sin sentir que debo decidir inmediatamente."],
                ["🎯", "Elegir un primer paso", "Quiero comenzar aunque todavía no tenga todo claro."],
                ["🤍", "Dejar de compararme", "Quiero construir una dirección que tenga sentido para mí."]
            ],
            "Tengo ideas pero me cuesta enfocarme": [
                ["📋", "Ordenar mis prioridades", "Quiero saber qué merece mi atención primero."],
                ["⏳", "Ser constante", "Quiero avanzar sin abandonar cuando pierdo motivación."],
                ["🎯", "Convertir una idea en acción", "Quiero pasar de pensar a hacer."],
                ["🌿", "Bajar la presión", "Quiero avanzar sin sentir que todo tiene que ocurrir rápido."]
            ],
            "Estoy descubriendo qué quiero": [
                ["🧪", "Probar cosas nuevas", "Quiero aprender sobre mí a través de experiencias."],
                ["🪞", "Reconocer lo que me importa", "Quiero descubrir qué actividades y valores realmente conectan conmigo."],
                ["🗣️", "Escuchar mi propia voz", "Quiero distinguir mis deseos de las expectativas externas."],
                ["🌱", "Dar tiempo al proceso", "Quiero permitirme descubrirme sin tener todas las respuestas."]
            ],
            "Quiero equilibrar mi vida": [
                ["⚖️", "Repartir mejor mi energía", "Quiero cuidar mis responsabilidades sin olvidarme de mí."],
                ["🌿", "Cuidar mi bienestar", "Quiero que mi salud emocional tenga un lugar en mi vida."],
                ["🤝", "Cuidar mis relaciones", "Quiero reservar espacio para las personas importantes."],
                ["🎨", "Recuperar lo que disfruto", "Quiero que mi vida también tenga espacio para cosas que me hacen bien."]
            ]
        }
    }
};;

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
    const selectedArea = selfKnowledgeAnswers.area;
    let data;

    if (step === 1) {
        data = {
            title: "¿Qué parte de ti quieres conocer mejor?",
            description: "Elige una sola. Las siguientes preguntas se construirán a partir de esta elección.",
            options: [
                ["🧠", "Mis pensamientos", "Quiero comprender mejor cómo funciona mi mente."],
                ["❤️", "Mis emociones", "Quiero comprender mejor lo que siento."],
                ["🪞", "Mi forma de ser", "Quiero descubrir más sobre quién soy."],
                ["🤝", "Mis relaciones", "Quiero entender mejor mis vínculos."],
                ["🎯", "Lo que quiero para mi vida", "Quiero aclarar hacia dónde quiero avanzar."]
            ]
        };
    } else {
        const flow = selfKnowledgeFlows[selectedArea];
        if (!flow) return;

        if (step === 2) {
            data = {
                title: `Ya elegiste explorar ${selectedArea.toLowerCase()}. ¿Qué sucede más contigo?`,
                description: flow.intro,
                options: flow.second
            };
        } else {
            data = {
                title: flow.third[selfKnowledgeAnswers.pattern]?.[0]
                    ? "Ahora profundicemos un poco más. ¿Qué te gustaría trabajar?"
                    : "¿Qué te gustaría trabajar de esto?",
                description: `Tu respuesta anterior fue: “${selfKnowledgeAnswers.pattern}”. Esta pregunta nace directamente de ella.`,
                options: flow.third[selfKnowledgeAnswers.pattern] || []
            };
        }
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
            if (step === 1) {
                selfKnowledgeAnswers.area = title;
                selfKnowledgeAnswers.pattern = null;
                selfKnowledgeAnswers.need = null;
            } else if (step === 2) {
                selfKnowledgeAnswers.pattern = title;
                selfKnowledgeAnswers.need = null;
            } else {
                selfKnowledgeAnswers.need = title;
            }

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

    const area = selfKnowledgeAnswers.area;
    const pattern = selfKnowledgeAnswers.pattern;
    const need = selfKnowledgeAnswers.need;

    const adviceByArea = {
        "Mis pensamientos": "Durante esta semana, prueba a escribir un pensamiento que se repita y separa lo que sabes que ocurrió de lo que tu mente está anticipando.",
        "Mis emociones": "Cuando aparezca una emoción intensa, primero intenta nombrarla: “Estoy sintiendo ___ porque ___”. No necesitas resolverla inmediatamente.",
        "Mi forma de ser": "Anota una cualidad que reconoces en ti, un límite que quieres cuidar y algo que te gustaría aprender. Conocerte también es aceptar que estás en proceso.",
        "Mis relaciones": "Elige una relación importante y practica expresar una necesidad pequeña de forma clara y respetuosa.",
        "Lo que quiero para mi vida": "Escoge una acción pequeña relacionada con lo que quieres. La claridad muchas veces aparece mientras avanzas."
    };

    const infoByArea = {
        "Mis pensamientos": "Los pensamientos son interpretaciones de nuestra experiencia, no siempre hechos. Observarlos con curiosidad puede ayudarte a tomar distancia.",
        "Mis emociones": "Las emociones pueden aportar información sobre necesidades y experiencias, pero no definen por sí solas quién eres ni determinan cómo debes actuar.",
        "Mi forma de ser": "Tu personalidad no es una etiqueta inmóvil. Puedes descubrir nuevas partes de ti y desarrollar habilidades sin dejar de ser quien eres.",
        "Mis relaciones": "Conocerte también implica reconocer qué necesitas, qué límites tienes y qué tipo de vínculos te ayudan a sentirte respetado.",
        "Lo que quiero para mi vida": "No tener todo claro no significa estar perdido. A veces una dirección se construye con pequeñas decisiones y experiencias."
    };

    selfKnowledgeResultText.innerHTML = `
        <span class="result-section-label">🔗 Cómo se conectan tus respuestas</span>
        <span class="result-section-text">
            Primero elegiste explorar <strong>${area.toLowerCase()}</strong>.
            Después identificaste que <strong>${pattern.toLowerCase()}</strong>.
            Finalmente señalaste que quieres <strong>${need.toLowerCase()}</strong>.
            <br><br>
            Esto forma un pequeño hilo: <strong>lo que quieres conocer → lo que estás viviendo → lo que necesitas desarrollar</strong>.
            No es una etiqueta ni un diagnóstico; es una pista para observarte con más atención.
        </span>

        <span class="result-section-label">💡 Un pequeño consejo</span>
        <span class="result-section-text">${adviceByArea[area] || "Reserva unos minutos para observar esta parte de ti sin juzgarla."}</span>

        <span class="result-section-label">🪞 Para reflexionar</span>
        <span class="result-quote">
            “Si ya sabes qué quieres comprender y qué necesitas desarrollar, ¿qué pequeño paso podrías dar para conocerte un poco más?”
        </span>

        <span class="result-section-label">ℹ️ Información importante</span>
        <span class="result-section-text">${infoByArea[area] || "Conocerte mejor es un proceso continuo. Esta experiencia sirve para reflexionar y no sustituye una evaluación profesional."}</span>
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

