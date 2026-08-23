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
        second: [
            ["🔁", "Le doy muchas vueltas", "Una idea vuelve una y otra vez aunque quiera dejarla atrás."],
            ["🌪️", "Tengo muchas ideas a la vez", "Me cuesta ordenar todo lo que aparece en mi mente."],
            ["🔮", "Me adelanto a lo que podría pasar", "Suelo imaginar escenarios antes de que ocurran."],
            ["🪨", "Me quedo atrapado en una idea", "A veces una preocupación ocupa demasiado espacio."]
        ],
        third: {
            "Le doy muchas vueltas": [
                ["📝", "Busco entenderla", "Quiero saber qué hay detrás de ese pensamiento."],
                ["🌿", "Intento distraerme", "Prefiero ocuparme de otra cosa para dejar de pensar."],
                ["💬", "Necesito hablarlo", "Cuando lo expreso, siento que puedo ordenarlo."],
                ["🔎", "La reviso muchas veces", "Intento encontrar una respuesta que me deje tranquilo."]
            ],
            "Tengo muchas ideas a la vez": [
                ["📋", "Intento organizarlas", "Busco poner cada idea en su lugar."],
                ["🎯", "Me concentro en una", "Intento escoger qué merece mi atención."],
                ["🌪️", "Paso de una a otra", "Me cuesta mantenerme en una sola idea."],
                ["⏸️", "Dejo todo para después", "A veces necesito escapar de tanta información."]
            ],
            "Me adelanto a lo que podría pasar": [
                ["🔮", "Imagino lo peor", "Mi mente se prepara para lo que podría salir mal."],
                ["🛡️", "Intento estar preparado", "Pienso en soluciones antes de que ocurra algo."],
                ["🌱", "Intento no pensarlo", "Prefiero no imaginar lo que podría pasar."],
                ["🧭", "Busco certeza", "Quiero saber qué ocurrirá para sentirme tranquilo."]
            ],
            "Me quedo atrapado en una idea": [
                ["🔄", "La repaso", "Vuelvo mentalmente a lo mismo buscando una respuesta."],
                ["🙈", "Intento evitarla", "Hago algo para no tener que pensar en ella."],
                ["💬", "La comparto", "Hablar de ella me ayuda a verla de otra manera."],
                ["🧩", "Intento resolverla", "Busco una solución para poder soltarla."]
            ]
        }
    },
    "Mis emociones": {
        second: [
            ["🤐", "Me las guardo", "Me cuesta mostrar lo que siento aunque esté pasando por dentro."],
            ["🌊", "Me llegan con mucha intensidad", "Cuando aparecen, pueden ocupar gran parte de mi atención."],
            ["🌫️", "Me cuesta saber qué siento", "Sé que algo pasa, pero no siempre puedo identificarlo."],
            ["💬", "Necesito expresarlas", "Cuando siento algo importante, me nace hablar o demostrarlo."]
        ],
        third: {
            "Me las guardo": [
                ["🗣️", "Encuentro palabras después", "Primero necesito tiempo para entender lo que siento."],
                ["🛡️", "Me preocupa cómo reaccionarán", "A veces temo ser juzgado o incomprendido."],
                ["🤍", "No quiero preocupar a otros", "Prefiero manejarlo por mi cuenta."],
                ["🫂", "Me gustaría poder hablarlo", "Hay momentos en que sí quisiera sentir apoyo."]
            ],
            "Me llegan con mucha intensidad": [
                ["🌊", "Reacciono rápidamente", "La emoción puede influir en lo que hago en ese momento."],
                ["⏸️", "Me aparto un momento", "Necesito espacio para recuperar la calma."],
                ["💬", "Busco hablar", "Expresar lo que siento me ayuda a atravesarlo."],
                ["🌿", "Intento controlarla", "Quiero que la emoción baje antes de actuar."]
            ],
            "Me cuesta saber qué siento": [
                ["🌫️", "Solo sé que algo no está bien", "La sensación aparece antes que las palabras."],
                ["🧠", "Lo pienso mucho", "Intento entender racionalmente lo que me pasa."],
                ["📖", "Escribo o recuerdo lo ocurrido", "Busco pistas en lo que sucedió."],
                ["🤝", "Pregunto a alguien de confianza", "Otra persona a veces me ayuda a identificarlo."]
            ],
            "Necesito expresarlas": [
                ["💬", "Hablo inmediatamente", "Necesito sacar lo que estoy sintiendo."],
                ["📝", "Prefiero escribir", "Puedo expresarme mejor por escrito."],
                ["🫂", "Busco compañía", "Me ayuda no atravesarlo solo."],
                ["🎨", "Lo expreso de otra manera", "A veces necesito crear, dibujar o hacer algo con ello."]
            ]
        }
    },
    "Mi forma de ser": {
        second: [
            ["🏠", "Soy más yo cuando estoy solo", "A solas siento que puedo actuar sin pensar demasiado en los demás."],
            ["🫂", "Soy más yo con personas de confianza", "Necesito sentir seguridad para mostrarme realmente."],
            ["🎨", "Soy más yo haciendo lo que me gusta", "Mis intereses me permiten expresar partes importantes de mí."],
            ["🌎", "Estoy descubriéndome todavía", "Siento que algunas partes de mí todavía están cambiando."]
        ],
        third: {
            "Soy más yo cuando estoy solo": [
                ["🪞", "Pienso mucho en quién soy", "A solas tengo más espacio para observarme."],
                ["🕊️", "Me siento libre", "Puedo decidir cómo actuar sin preocuparme tanto."],
                ["🤍", "Me protejo", "A veces estar solo me resulta más cómodo y seguro."],
                ["🌱", "Quiero compartir más de mí", "Me gustaría llevar esa libertad a mis relaciones."]
            ],
            "Soy más yo con personas de confianza": [
                ["🫂", "Me siento aceptado", "Puedo mostrar partes de mí sin tanta preocupación."],
                ["💬", "Hablo con libertad", "Me resulta más fácil decir lo que pienso."],
                ["🛡️", "Bajo la guardia", "La confianza me permite relajarme."],
                ["🌱", "Quiero lograrlo en más espacios", "Me gustaría sentir esa seguridad fuera de mi círculo."]
            ],
            "Soy más yo haciendo lo que me gusta": [
                ["🎨", "Me siento creativo", "Hacer lo que disfruto despierta una parte importante de mí."],
                ["🎯", "Me siento capaz", "Mis intereses me recuerdan que puedo aprender y avanzar."],
                ["🌿", "Me siento tranquilo", "Es un espacio donde puedo estar presente."],
                ["🪞", "Me ayuda a conocer mis valores", "Lo que disfruto parece decir algo sobre lo que me importa."]
            ],
            "Estoy descubriéndome todavía": [
                ["🧭", "Estoy cambiando prioridades", "Hay cosas que antes quería y ahora veo diferente."],
                ["🪞", "Estoy descubriendo mis valores", "Quiero entender qué es realmente importante para mí."],
                ["❤️", "Estoy entendiendo mis necesidades", "Quiero reconocer qué necesito para sentirme bien."],
                ["🌱", "Estoy probando nuevas versiones de mí", "Quiero permitirme aprender sin tener una identidad definitiva."]
            ]
        }
    },
    "Mis relaciones": {
        second: [
            ["🤝", "Busco sentirme comprendido", "Para mí es importante poder ser escuchado y entendido."],
            ["🛡️", "Busco sentirme seguro", "Necesito confianza para poder abrirme de verdad."],
            ["💬", "Necesito poder hablar", "La comunicación es una parte importante de mis vínculos."],
            ["❤️", "Busco sentir cercanía", "Valoro compartir, conectar y sentir que importo."]
        ],
        third: {
            "Busco sentirme comprendido": [
                ["🗣️", "Explico lo que me pasa", "Intento que la otra persona entienda mi experiencia."],
                ["🤐", "Me callo cuando no me entienden", "A veces prefiero evitar seguir explicándome."],
                ["💬", "Busco otra forma de decirlo", "Intento encontrar palabras que expresen mejor lo que necesito."],
                ["🫂", "Busco a alguien que sí me comprenda", "Necesito sentir que mi experiencia tiene un espacio."]
            ],
            "Busco sentirme seguro": [
                ["🛡️", "Observo antes de abrirme", "Necesito tiempo para confiar."],
                ["🤝", "Me acerco poco a poco", "Prefiero construir la confianza con experiencias."],
                ["💬", "Pregunto y hablo", "La comunicación me ayuda a sentir seguridad."],
                ["🚪", "Me alejo si algo me incomoda", "Necesito protegerme cuando no me siento respetado."]
            ],
            "Necesito poder hablar": [
                ["💬", "Digo lo que pienso", "Siento que hablar evita que las cosas se acumulen."],
                ["❤️", "Digo lo que siento", "Necesito poder expresar mi parte emocional."],
                ["🎯", "Digo lo que necesito", "Quiero que mis conversaciones también incluyan mis necesidades."],
                ["⏸️", "Espero a estar tranquilo", "Prefiero hablar cuando puedo ordenar lo que quiero decir."]
            ],
            "Busco sentir cercanía": [
                ["❤️", "Comparto mucho de mí", "La intimidad emocional me hace sentir conectado."],
                ["🫂", "Busco pasar tiempo juntos", "La presencia y las experiencias compartidas son importantes."],
                ["💬", "Me gusta hablar profundamente", "Las conversaciones me hacen sentir cerca."],
                ["⚖️", "A veces temo perder mi espacio", "Quiero cercanía sin dejar de tener independencia."]
            ]
        }
    },
    "Lo que quiero para mi vida": {
        second: [
            ["🧭", "Me falta una dirección", "Tengo dudas sobre hacia dónde quiero ir."],
            ["🎯", "Tengo ideas pero me cuesta enfocarme", "Sé algunas cosas que quiero, pero no logro ordenarlas."],
            ["🌱", "Estoy descubriendo qué quiero", "Todavía estoy explorando posibilidades para mi futuro."],
            ["⚖️", "Quiero equilibrar mi vida", "Quiero que distintas áreas de mi vida puedan convivir mejor."]
        ],
        third: {
            "Me falta una dirección": [
                ["🔎", "Estoy buscando qué me importa", "Quiero descubrir qué valores quiero que guíen mis decisiones."],
                ["🧭", "Tengo varias posibilidades", "Hay caminos que me interesan y no sé cuál escoger."],
                ["🤍", "Me preocupa equivocarme", "La idea de tomar una decisión incorrecta me frena."],
                ["🌱", "Quiero empezar de a poco", "No necesito tener todo claro para dar un primer paso."]
            ],
            "Tengo ideas pero me cuesta enfocarme": [
                ["📋", "Tengo demasiadas prioridades", "Varias cosas parecen importantes al mismo tiempo."],
                ["⏳", "Me cuesta mantener la constancia", "Empiezo con entusiasmo pero después me cuesta continuar."],
                ["🎯", "Me distraigo fácilmente", "Otras cosas terminan alejándome de lo que quería hacer."],
                ["🌿", "Me presiono demasiado", "Siento que debería avanzar más rápido."]
            ],
            "Estoy descubriendo qué quiero": [
                ["🧪", "Quiero probar cosas nuevas", "Creo que experimentar puede ayudarme a descubrirme."],
                ["🪞", "Quiero escuchar mis propios deseos", "Me cuesta distinguirlos de lo que otros esperan."],
                ["🧭", "Quiero conocer mis valores", "Quiero entender qué quiero priorizar en mi vida."],
                ["🌱", "Quiero permitirme tiempo", "No quiero obligarme a tener todas las respuestas ahora."]
            ],
            "Quiero equilibrar mi vida": [
                ["⚖️", "Tengo demasiadas responsabilidades", "A veces siento que no queda espacio para mí."],
                ["🌿", "He dejado de lado mi bienestar", "Quiero volver a cuidar de mí."],
                ["🤝", "Necesito cuidar mis relaciones", "Quiero tener tiempo y energía para quienes son importantes."],
                ["🎨", "Me falta espacio para disfrutar", "Quiero recuperar actividades que me hacen bien."]
            ]
        }
    }
};;;

function openSelfKnowledgeExperience() {
    if (!selfKnowledgeScreen) return;

    supportScreen.classList.add("hidden");
    breathingScreen.classList.add("hidden");
    understandingScreen.classList.add("hidden");
    selfKnowledgeScreen.classList.remove("hidden");

    selfKnowledgeIntro.classList.remove("hidden");
    selfKnowledgeQuestion.classList.add("hidden");
    selfKnowledgeResult.classList.add("hidden");

    selfKnowledgeAnswers = { area: null, pattern: null, detail: null, goal: null };
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSelfKnowledgeQuestion(step) {
    const area = selfKnowledgeAnswers.area;
    const pattern = selfKnowledgeAnswers.pattern;
    const detail = selfKnowledgeAnswers.detail;
    let data;

    if (step === 1) {
        data = {
            title: "¿Qué parte de ti quieres conocer mejor?",
            description: "Elige una sola. Las siguientes tres preguntas seguirán el hilo de esta elección.",
            options: [
                ["🧠", "Mis pensamientos", "Quiero comprender mejor cómo funciona mi mente."],
                ["❤️", "Mis emociones", "Quiero comprender mejor lo que siento."],
                ["🪞", "Mi forma de ser", "Quiero descubrir más sobre quién soy."],
                ["🤝", "Mis relaciones", "Quiero entender mejor mis vínculos."],
                ["🎯", "Lo que quiero para mi vida", "Quiero aclarar hacia dónde quiero avanzar."]
            ]
        };
    } else if (step === 2) {
        const flow = selfKnowledgeFlows[area];
        data = {
            title: `Cuando piensas en ${area.toLowerCase()}, ¿qué se parece más a ti?`,
            description: "Tu respuesta define el camino de las siguientes preguntas.",
            options: flow.second
        };
    } else if (step === 3) {
        const flow = selfKnowledgeFlows[area];
        data = {
            title: "¿Qué suele pasar contigo en esa situación?",
            description: `Elegiste “${pattern}”. Ahora vamos un paso más profundo.`,
            options: flow.third[pattern]
        };
    } else {
        const fourth = {
            "Mis pensamientos": {
                "Le doy muchas vueltas": [
                    ["🌿", "Quiero sentir más calma", "Necesito aprender a soltar cuando ya no puedo cambiar algo."],
                    ["🔎", "Quiero comprender mis preocupaciones", "Necesito descubrir qué hay detrás de lo que repito mentalmente."],
                    ["🕊️", "Quiero confiar más", "Necesito tolerar que no siempre tendré una respuesta inmediata."],
                    ["📝", "Quiero ordenar mi mente", "Necesito convertir el ruido mental en algo que pueda observar."]
                ],
                "Tengo muchas ideas a la vez": [
                    ["🎯", "Quiero priorizar", "Necesito saber qué merece mi atención primero."],
                    ["📋", "Quiero organizarme", "Necesito una estructura que me ayude a avanzar."],
                    ["⏸️", "Quiero descansar mi mente", "Necesito dejar de sentir que todo requiere atención."],
                    ["🌱", "Quiero avanzar sin perfección", "Necesito permitirme hacer una cosa a la vez."]
                ],
                "Me adelanto a lo que podría pasar": [
                    ["🧭", "Quiero volver al presente", "Necesito distinguir lo que ocurre de lo que imagino."],
                    ["🌱", "Quiero tolerar la incertidumbre", "Necesito aceptar que no puedo conocer todo de antemano."],
                    ["🛡️", "Quiero prepararme sin preocuparme de más", "Necesito planificar sin vivir en escenarios futuros."],
                    ["🤍", "Quiero confiar en mi capacidad de responder", "Necesito recordar que podré afrontar lo que llegue."]
                ],
                "Me quedo atrapado en una idea": [
                    ["🔄", "Quiero verla desde otra perspectiva", "Necesito abrir espacio para otras interpretaciones."],
                    ["🌿", "Quiero tomar distancia", "Necesito observar el pensamiento sin seguirlo automáticamente."],
                    ["💬", "Quiero expresarlo", "Necesito ponerlo fuera de mi cabeza para entenderlo."],
                    ["🧩", "Quiero encontrar una acción", "Necesito saber qué puedo hacer y qué debo soltar."]
                ]
            },
            "Mis emociones": {
                "Me las guardo": [
                    ["🗣️", "Quiero poder expresarme", "Necesito encontrar palabras para decir lo que siento."],
                    ["🛡️", "Quiero sentirme seguro", "Necesito confiar en que puedo mostrarme sin ser juzgado."],
                    ["🫂", "Quiero pedir apoyo", "Necesito permitirme no cargar todo solo."],
                    ["🤍", "Quiero aceptar mis emociones", "Necesito dejar de pensar que sentir algo está mal."]
                ],
                "Me llegan con mucha intensidad": [
                    ["🌿", "Quiero regularme", "Necesito aprender a atravesar la emoción antes de actuar."],
                    ["⏸️", "Quiero darme tiempo", "Necesito crear un espacio entre sentir y responder."],
                    ["🔎", "Quiero entender mis detonantes", "Necesito reconocer qué suele activar estas emociones."],
                    ["❤️", "Quiero tratarme con paciencia", "Necesito dejar de exigirme controlar todo inmediatamente."]
                ],
                "Me cuesta saber qué siento": [
                    ["🏷️", "Quiero ponerle nombre", "Necesito distinguir mejor lo que ocurre dentro de mí."],
                    ["🧠", "Quiero entender mi necesidad", "Necesito escuchar qué puede estar señalando la emoción."],
                    ["📖", "Quiero reconocer patrones", "Necesito observar cuándo y cómo aparecen."],
                    ["🤝", "Quiero aprender a hablarlo", "Necesito apoyo para encontrar palabras."]
                ],
                "Necesito expresarlas": [
                    ["💬", "Quiero comunicarme mejor", "Necesito expresar lo que siento sin herir ni callarme."],
                    ["🎯", "Quiero decir lo que necesito", "Necesito que mis emociones también me ayuden a comunicar necesidades."],
                    ["⏸️", "Quiero elegir el momento", "Necesito saber cuándo hablar para hacerlo con calma."],
                    ["🤍", "Quiero sentirme escuchado", "Necesito espacios donde pueda ser sincero y respetado."]
                ]
            },
            "Mi forma de ser": {
                "Soy más yo cuando estoy solo": [
                    ["🫂", "Quiero llevar esa libertad a mis relaciones", "Necesito sentir que puedo ser auténtico con otros."],
                    ["🪞", "Quiero entender quién soy cuando nadie mira", "Necesito reconocer qué partes de mí son realmente mías."],
                    ["🌱", "Quiero aceptar mi manera de ser", "Necesito dejar de compararme con otros."],
                    ["💬", "Quiero expresarme con más libertad", "Necesito mostrar poco a poco lo que normalmente escondo."]
                ],
                "Soy más yo con personas de confianza": [
                    ["🛡️", "Quiero entender qué me hace sentir seguro", "Necesito reconocer qué condiciones me permiten abrirme."],
                    ["🌎", "Quiero sentirme así en más espacios", "Necesito llevar esa seguridad fuera de mi círculo cercano."],
                    ["💬", "Quiero expresar mis límites", "Necesito cuidar mis relaciones sin dejar de ser yo."],
                    ["🪞", "Quiero reconocer mi versión más auténtica", "Necesito observar quién soy cuando me siento libre."]
                ],
                "Soy más yo haciendo lo que me gusta": [
                    ["🎯", "Quiero conocer mis valores", "Necesito descubrir qué hay detrás de lo que disfruto."],
                    ["⏳", "Quiero darle más espacio a lo que amo", "Necesito proteger tiempo para mí."],
                    ["🌱", "Quiero crecer a través de mis intereses", "Necesito convertir lo que me gusta en una fuente de aprendizaje."],
                    ["🪞", "Quiero entender qué dice esto de mí", "Necesito reconocer las partes de mi identidad que aparecen allí."]
                ],
                "Estoy descubriéndome todavía": [
                    ["🧭", "Quiero saber qué es importante para mí", "Necesito reconocer mis valores."],
                    ["❤️", "Quiero entender mis necesidades", "Necesito saber qué me ayuda a sentirme bien conmigo."],
                    ["🪞", "Quiero aceptar mis cambios", "Necesito permitirme evolucionar sin perder mi valor."],
                    ["🎯", "Quiero tomar decisiones propias", "Necesito distinguir mis deseos de las expectativas externas."]
                ]
            },
            "Mis relaciones": {
                "Busco sentirme comprendido": [
                    ["🗣️", "Quiero explicar mejor lo que necesito", "Necesito comunicar mi experiencia con claridad."],
                    ["🤍", "Quiero aceptarme aunque no me entiendan", "Necesito que mi bienestar no dependa totalmente de la aprobación."],
                    ["🫂", "Quiero encontrar vínculos auténticos", "Necesito relaciones donde pueda ser yo."],
                    ["👂", "Quiero sentirme escuchado", "Necesito espacios donde pueda hablar sin miedo."]
                ],
                "Busco sentirme seguro": [
                    ["🛡️", "Quiero reconocer mis límites", "Necesito saber qué necesito para sentirme respetado."],
                    ["🤝", "Quiero construir confianza", "Necesito aprender a abrirme poco a poco."],
                    ["💬", "Quiero decir cuando algo me incomoda", "Necesito poder cuidar mi bienestar dentro de una relación."],
                    ["🔎", "Quiero reconocer qué vínculos me hacen bien", "Necesito observar cómo me siento después de compartir con alguien."]
                ],
                "Necesito poder hablar": [
                    ["❤️", "Quiero decir lo que siento", "Necesito expresar mi mundo emocional."],
                    ["🎯", "Quiero decir lo que necesito", "Necesito que mis conversaciones también incluyan mis necesidades."],
                    ["⏸️", "Quiero hablar sin reaccionar impulsivamente", "Necesito aprender a elegir el momento."],
                    ["👂", "Quiero escuchar mejor", "Necesito que la comunicación sea de ida y vuelta."]
                ],
                "Busco sentir cercanía": [
                    ["❤️", "Quiero mostrar afecto", "Necesito expresar mejor lo que siento por quienes quiero."],
                    ["🫂", "Quiero compartir más de mí", "Necesito permitir que otros me conozcan profundamente."],
                    ["⚖️", "Quiero cuidar mi espacio", "Necesito cercanía sin perder mi individualidad."],
                    ["🌱", "Quiero construir vínculos auténticos", "Necesito relaciones donde pueda ser yo mismo."]
                ]
            },
            "Lo que quiero para mi vida": {
                "Me falta una dirección": [
                    ["🧭", "Quiero descubrir qué me importa", "Necesito reconocer mis valores antes de decidir."],
                    ["🔎", "Quiero explorar opciones", "Necesito conocer caminos sin obligarme a elegir hoy."],
                    ["🤍", "Quiero perder el miedo a equivocarme", "Necesito aceptar que decidir también implica aprender."],
                    ["🌱", "Quiero dar un primer paso", "Necesito comenzar aunque todavía no vea todo el camino."]
                ],
                "Tengo ideas pero me cuesta enfocarme": [
                    ["📋", "Quiero ordenar prioridades", "Necesito saber qué merece mi atención primero."],
                    ["⏳", "Quiero ser constante", "Necesito aprender a avanzar incluso cuando baja la motivación."],
                    ["🎯", "Quiero convertir ideas en acciones", "Necesito pasar de pensar a comenzar."],
                    ["🌿", "Quiero bajar la presión", "Necesito avanzar sin sentir que todo debe suceder rápido."]
                ],
                "Estoy descubriendo qué quiero": [
                    ["🧪", "Quiero experimentar", "Necesito aprender sobre mí a través de nuevas experiencias."],
                    ["🪞", "Quiero escuchar mis deseos", "Necesito distinguirlos de lo que otros esperan."],
                    ["🧭", "Quiero conocer mis valores", "Necesito saber qué quiero priorizar."],
                    ["🌱", "Quiero darme tiempo", "Necesito permitirme descubrirme sin apresurarme."]
                ],
                "Quiero equilibrar mi vida": [
                    ["⚖️", "Quiero repartir mejor mi energía", "Necesito cuidar responsabilidades y bienestar."],
                    ["🌿", "Quiero cuidar mi bienestar", "Necesito volver a darme espacio."],
                    ["🤝", "Quiero cuidar mis relaciones", "Necesito reservar energía para quienes importan."],
                    ["🎨", "Quiero recuperar lo que disfruto", "Necesito que mi vida tenga espacio para mí."]
                ]
            }
        };
        data = {
            title: "¿Qué te gustaría fortalecer a partir de todo esto?",
            description: `Ya vimos qué quieres conocer, qué suele pasarte y cómo respondes. Ahora elige hacia dónde quieres llevar ese aprendizaje.`,
            options: fourth[area]?.[pattern] || []
        };
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
                selfKnowledgeAnswers.detail = null;
                selfKnowledgeAnswers.goal = null;
            } else if (step === 2) {
                selfKnowledgeAnswers.pattern = title;
                selfKnowledgeAnswers.detail = null;
                selfKnowledgeAnswers.goal = null;
            } else if (step === 3) {
                selfKnowledgeAnswers.detail = title;
                selfKnowledgeAnswers.goal = null;
            } else {
                selfKnowledgeAnswers.goal = title;
            }

            if (step < 4) renderSelfKnowledgeQuestion(step + 1);
            else renderSelfKnowledgeResult();
        });
        selfKnowledgeOptions.appendChild(button);
    });
}

function renderSelfKnowledgeResult() {
    selfKnowledgeQuestion.classList.add("hidden");
    selfKnowledgeResult.classList.remove("hidden");

    const { area, pattern, detail, goal } = selfKnowledgeAnswers;

    // El resultado se construye con las 4 respuestas, no con una sola categoría.
    const pathText = `${area} → ${pattern} → ${detail} → ${goal}`;

    const guidanceByArea = {
        "Mis pensamientos": {
            advice: "Haz una pausa de cinco minutos y separa en una hoja tres cosas: lo que sabes, lo que estás suponiendo y lo que sí puedes hacer hoy.",
            reflection: "¿Qué pensamiento necesitas comprender y cuál quizá necesitas aprender a soltar?",
            verse: "Proverbios 3:5-6",
            info: "Tus respuestas apuntan a la relación entre lo que aparece en tu mente, la forma en que reaccionas y tu deseo de encontrar más claridad. Pensar mucho no significa que debas resolverlo todo inmediatamente."
        },
        "Mis emociones": {
            advice: "Cuando aparezca una emoción fuerte, ponle un nombre, identifica qué la pudo activar y pregúntate qué necesitas antes de decidir qué hacer.",
            reflection: "¿Qué podría cambiar si escuchases lo que sientes sin permitir que la emoción decida por ti?",
            verse: "Salmo 34:18",
            info: "Tus respuestas muestran un recorrido entre reconocer una emoción, entender cómo la vives y descubrir una forma más consciente de responder a ella."
        },
        "Mi forma de ser": {
            advice: "Elige una situación esta semana donde puedas actuar de una manera que represente lo que descubriste sobre ti, sin compararte con nadie.",
            reflection: "¿Qué parte de ti estás empezando a aceptar y qué parte todavía estás aprendiendo a conocer?",
            verse: "Salmo 139:14",
            info: "Conocerte no significa encontrar una etiqueta definitiva. Tu identidad también se construye a través de experiencias, valores, límites y decisiones."
        },
        "Mis relaciones": {
            advice: "Elige un vínculo importante y practica una acción concreta relacionada con tu recorrido: expresar algo, escuchar, pedir apoyo, acercarte o poner un límite.",
            reflection: "¿Qué tipo de relación quieres construir y qué pequeño cambio puede comenzar contigo?",
            verse: "Eclesiastés 4:9-10",
            info: "Tus respuestas hablan de lo que necesitas en tus vínculos y de la forma en que intentas conseguirlo. Las relaciones saludables necesitan comunicación, respeto, límites y reciprocidad."
        },
        "Lo que quiero para mi vida": {
            advice: "Convierte tu última respuesta en un paso pequeño, concreto y posible. No necesitas resolver tu futuro completo para comenzar a construirlo.",
            reflection: "Si no tuvieras que tener todo claro hoy, ¿cuál sería el siguiente paso que sí puedes dar?",
            verse: "Proverbios 16:9",
            info: "Tus respuestas conectan lo que hoy estás viviendo con lo que quieres construir. La dirección puede aparecer mientras avanzas, no necesariamente antes de empezar."
        }
    };

    const areaGuide = guidanceByArea[area] || guidanceByArea["Mis pensamientos"];

    // Personalización adicional: las palabras elegidas modifican el consejo, reflexión y explicación.
    const text = `${pattern} ${detail} ${goal}`.toLowerCase();
    let adviceExtra = "";
    let reflectionExtra = "";

    if (/(calma|tranquil|regular|bajar|descans)/.test(text)) {
        adviceExtra = " Prioriza primero regularte y después analizar: una mente más tranquila suele permitir decisiones más claras.";
        reflectionExtra = " ¿Qué necesitas permitirte antes de intentar solucionar lo demás?";
    } else if (/(hablar|expresar|compart|escuchar|apoyo)/.test(text)) {
        adviceExtra = " Considera compartir una parte de este recorrido con alguien de confianza; ponerlo en palabras también puede ayudarte a ordenar lo que sientes.";
        reflectionExtra = " ¿Con quién podrías sentirte seguro siendo completamente sincero?";
    } else if (/(organ|orden|prior|acción|paso|constan)/.test(text)) {
        adviceExtra = " Convierte lo que descubriste en una sola acción pequeña. Lo concreto suele ser más útil que intentar cambiarlo todo de una vez.";
        reflectionExtra = " ¿Cuál es la única cosa que merece tu atención primero?";
    } else if (/(acept|descubr|conoc|ident|valores|deseos)/.test(text)) {
        adviceExtra = " Date permiso de observarte sin exigirte una respuesta definitiva; descubrirte también es un proceso.";
        reflectionExtra = " ¿Qué estás empezando a comprender sobre ti que antes no podías nombrar?";
    } else if (/(confi|incertid|miedo|preocup|futuro)/.test(text)) {
        adviceExtra = " Cuando aparezca la incertidumbre, vuelve a distinguir entre lo que puedes controlar y lo que tendrás que dejar abierto por ahora.";
        reflectionExtra = " ¿Qué podrías dejar de controlar por un momento para recuperar espacio mental?";
    }

    const advice = areaGuide.advice + adviceExtra;
    const reflection = areaGuide.reflection + reflectionExtra;

    // Versículo coherente con el área y con la última intención elegida.
    const verseByIntent = {
        "Quiero sentir más calma": "Salmo 46:10",
        "Quiero comprender mis preocupaciones": "Salmo 139:23-24",
        "Quiero confiar más": "Proverbios 3:5-6",
        "Quiero ordenar mi mente": "1 Corintios 14:33",
        "Quiero expresarme": "Gálatas 6:2",
        "Quiero sentirme seguro": "Salmo 4:8",
        "Quiero pedir apoyo": "Eclesiastés 4:9-10",
        "Quiero aceptar mis emociones": "Salmo 34:18",
        "Quiero regularme": "Proverbios 16:32",
        "Quiero comunicarme mejor": "Proverbios 15:1",
        "Quiero conocer mis valores": "Salmo 139:23-24",
        "Quiero aceptar mis cambios": "Isaías 43:19",
        "Quiero tomar decisiones propias": "Gálatas 6:5",
        "Quiero construir vínculos auténticos": "Proverbios 17:17",
        "Quiero descubrir qué me importa": "Proverbios 16:9",
        "Quiero dar un primer paso": "Salmo 37:23",
        "Quiero perder el miedo a equivocarme": "Josué 1:9",
        "Quiero ordenar prioridades": "Proverbios 21:5",
        "Quiero ser constante": "Gálatas 6:9",
        "Quiero escuchar mis deseos": "Salmo 37:4",
        "Quiero darme tiempo": "Eclesiastés 3:1",
        "Quiero cuidar mi bienestar": "3 Juan 1:2",
        "Quiero recuperar lo que disfruto": "Eclesiastés 3:13"
    };
    const verse = verseByIntent[goal] || areaGuide.verse;

    const completed = JSON.parse(localStorage.getItem("mindSelfKnowledgeAreas") || "[]");
    if (!completed.includes(area)) completed.push(area);
    localStorage.setItem("mindSelfKnowledgeAreas", JSON.stringify(completed));

    const areaLabels = [
        ["🧠", "Mis pensamientos"],
        ["❤️", "Mis emociones"],
        ["🪞", "Mi forma de ser"],
        ["🤝", "Mis relaciones"],
        ["🎯", "Lo que quiero para mi vida"]
    ];

    selfKnowledgeResultText.innerHTML = `
        <div class="result-block result-discovery">
            <span class="result-section-label">🔎 Lo que descubriste</span>
            <p class="result-section-text">
                Tu recorrido comenzó en <strong>${area}</strong>. Después reconociste que <strong>${pattern.toLowerCase()}</strong>, identificaste que <strong>${detail.toLowerCase()}</strong> y finalmente elegiste <strong>${goal.toLowerCase()}</strong> como algo que quieres fortalecer.
            </p>
            <div class="path-visual">
                <span>${area}</span><b>→</b><span>${pattern}</span><b>→</b><span>${detail}</span><b>→</b><span>${goal}</span>
            </div>
        </div>

        <div class="result-block">
            <span class="result-section-label">🌱 Lo que puedes trabajar</span>
            <p class="result-section-text">${areaGuide.info}</p>
        </div>

        <div class="result-block result-action">
            <span class="result-section-label">💡 Tu pequeño paso</span>
            <p class="result-section-text">${advice}</p>
        </div>

        <div class="result-block">
            <span class="result-section-label">📖 Una palabra para este momento</span>
            <div class="verse-card">
                <strong>${verse}</strong>
                <span>Una referencia elegida teniendo en cuenta el sentido de tu recorrido y lo que quieres fortalecer.</span>
            </div>
        </div>

        <div class="result-block">
            <span class="result-section-label">🪞 Para llevar contigo</span>
            <div class="result-quote">“${reflection}”</div>
        </div>

        <div class="result-block">
            <span class="result-section-label">🗺️ Mi mapa MIND</span>
            <div class="mind-map">
                ${areaLabels.map(([icon, label]) => `<div class="mind-map-item ${completed.includes(label) ? "completed" : ""}"><span>${icon}</span><small>${label}</small><b>${completed.includes(label) ? "✓ Explorado" : "Pendiente"}</b></div>`).join("")}
            </div>
        </div>

        <div class="result-block reflection-box">
            <span class="result-section-label">📝 Mi reflexión</span>
            <textarea id="mindReflection" maxlength="700" placeholder="Hoy me di cuenta de que..."></textarea>
            <button type="button" class="save-reflection" id="saveMindReflection">Guardar mi reflexión</button>
            <small class="save-status" id="mindReflectionStatus"></small>
        </div>

        <div class="result-disclaimer">
            MIND es una herramienta de reflexión y orientación. No realiza diagnósticos ni sustituye la atención de un profesional de salud mental.
        </div>

        <div class="result-actions">
            <button type="button" class="understanding-finish" id="exploreAnotherMindArea">Explorar otra parte de mí →</button>
        </div>
    `;

    const saved = localStorage.getItem("mindLastReflection");
    const reflectionBox = document.getElementById("mindReflection");
    if (saved && reflectionBox) reflectionBox.value = saved;

    document.getElementById("saveMindReflection")?.addEventListener("click", () => {
        const value = document.getElementById("mindReflection")?.value.trim();
        const status = document.getElementById("mindReflectionStatus");
        if (!value) {
            if (status) status.textContent = "Escribe algo primero para guardarlo.";
            return;
        }
        localStorage.setItem("mindLastReflection", value);
        localStorage.setItem("mindLastSelfKnowledge", JSON.stringify({ area, pattern, detail, goal, pathText, savedAt: new Date().toISOString() }));
        if (status) status.textContent = "✓ Tu reflexión quedó guardada en este dispositivo.";
    });

    document.getElementById("exploreAnotherMindArea")?.addEventListener("click", () => {
        selfKnowledgeResult.classList.add("hidden");
        selfKnowledgeIntro.classList.remove("hidden");
        selfKnowledgeAnswers = { area: null, pattern: null, detail: null, goal: null };
    });
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

