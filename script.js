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
let understandingMode = "anxiety";
let selfKnowledgeArea = null;
let selfKnowledgeSecond = null;
let selfKnowledgeThird = null;

const understandingQuestions = [
    {
        title: "¿Qué parte de ti quieres conocer mejor?",
        description:
            "Elige el área que más te gustaría comprender en este momento.",
        options: [
            {
                icon: "🧠",
                title: "Mis pensamientos",
                description: "Quiero entender cómo pienso y qué pasa por mi mente."
            },
            {
                icon: "❤️",
                title: "Mis emociones",
                description: "Quiero comprender mejor lo que siento."
            },
            {
                icon: "🪞",
                title: "Mi forma de ser",
                description: "Quiero descubrir más sobre quién soy."
            },
            {
                icon: "🤝",
                title: "Mis relaciones",
                description: "Quiero entender cómo me relaciono con los demás."
            },
            {
                icon: "🎯",
                title: "Lo que quiero para mi vida",
                description: "Quiero tener más claridad sobre lo que busco."
            }
        ]
    }
];

const selfKnowledgeBranches = {
    "Mis pensamientos": {
        question: "¿Qué suele pasar con tus pensamientos cuando tienes un momento difícil?",
        description:
            "No hay una respuesta correcta. Elige lo que más se parezca a ti.",
        options: [
            {
                icon: "🔁",
                title: "Pienso demasiado las cosas",
                description: "Le doy muchas vueltas antes de poder soltarlo."
            },
            {
                icon: "🌪️",
                title: "Mi mente se llena de cosas",
                description: "Me cuesta concentrarme en una sola idea."
            },
            {
                icon: "🔮",
                title: "Me adelanto a lo que podría pasar",
                description: "Suelo imaginar distintos escenarios."
            },
            {
                icon: "🌙",
                title: "Intento desconectarme",
                description: "Prefiero dejar de pensar en el tema."
            }
        ],
        third: {
            title: "¿Qué te gustaría aprender a hacer mejor con tus pensamientos?",
            options: [
                ["🧩", "Ordenarlos", "Quiero poder distinguir lo importante de lo que no."],
                ["🌿", "Darles una pausa", "Quiero aprender a bajar el ruido mental."],
                ["🔎", "Entenderlos", "Quiero saber de dónde vienen algunas ideas."],
                ["🕊️", "Soltarlos", "Quiero aprender a no quedarme atrapado en ellos."]
            ]
        }
    },

    "Mis emociones": {
        question: "¿Qué suele pasar cuando una emoción se vuelve intensa?",
        description:
            "Piensa en lo que normalmente haces cuando sientes algo con mucha fuerza.",
        options: [
            {
                icon: "🤐",
                title: "Me la guardo",
                description: "Prefiero no mostrar lo que estoy sintiendo."
            },
            {
                icon: "🙈",
                title: "Intento ignorarla",
                description: "Hago otras cosas para no pensar en ella."
            },
            {
                icon: "💬",
                title: "La expreso",
                description: "Necesito decir o mostrar lo que siento."
            },
            {
                icon: "🫂",
                title: "Busco a alguien",
                description: "Me ayuda hablar con una persona de confianza."
            },
            {
                icon: "🌫️",
                title: "No sé qué hacer con ella",
                description: "La siento, pero me cuesta entenderla."
            }
        ],
        third: {
            title: "¿Qué te gustaría aprender a hacer mejor con lo que sientes?",
            options: [
                ["🔎", "Entenderlo", "Quiero reconocer qué hay detrás de una emoción."],
                ["💬", "Expresarlo", "Quiero comunicar lo que siento de una forma sana."],
                ["🌿", "Regularlo", "Quiero responder sin sentir que la emoción me controla."],
                ["🫂", "Pedir ayuda", "Quiero sentirme más cómodo buscando apoyo."],
                ["🤍", "Aceptarlo", "Quiero dejar de juzgarme por sentir ciertas cosas."]
            ]
        }
    },

    "Mi forma de ser": {
        question: "¿En qué situaciones sientes que puedes ser más tú mismo?",
        description:
            "Piensa en los momentos en los que no necesitas aparentar ni esconder partes de ti.",
        options: [
            {
                icon: "🏠",
                title: "Cuando estoy solo",
                description: "Me siento más libre cuando estoy conmigo."
            },
            {
                icon: "🫂",
                title: "Con personas de confianza",
                description: "Me muestro más cuando me siento seguro."
            },
            {
                icon: "🎨",
                title: "Cuando hago lo que me gusta",
                description: "Mis intereses me permiten expresarme."
            },
            {
                icon: "🌎",
                title: "En lugares nuevos",
                description: "A veces me siento más libre fuera de mi entorno habitual."
            }
        ],
        third: {
            title: "¿Qué te gustaría conocer mejor de ti?",
            options: [
                ["🪞", "Mis fortalezas", "Quiero reconocer lo que hago bien."],
                ["🧭", "Mis límites", "Quiero entender qué necesito y qué no quiero aceptar."],
                ["❤️", "Lo que necesito", "Quiero reconocer mejor mis necesidades."],
                ["🌱", "Lo que puedo mejorar", "Quiero crecer sin exigirme ser perfecto."]
            ]
        }
    },

    "Mis relaciones": {
        question: "¿Qué suele ser más importante para ti en una relación?",
        description:
            "Puede ser una amistad, una relación familiar o cualquier vínculo importante.",
        options: [
            {
                icon: "🤝",
                title: "Sentirme comprendido",
                description: "Necesito sentir que puedo ser yo mismo."
            },
            {
                icon: "🛡️",
                title: "Sentirme seguro",
                description: "Valoro la confianza y la tranquilidad."
            },
            {
                icon: "💬",
                title: "Poder hablar",
                description: "Para mí es importante comunicar lo que pienso."
            },
            {
                icon: "❤️",
                title: "Sentir cercanía",
                description: "Valoro compartir y sentir conexión."
            }
        ],
        third: {
            title: "¿Qué te gustaría fortalecer en tus relaciones?",
            options: [
                ["💬", "Comunicarme", "Quiero expresar mejor lo que necesito."],
                ["🧭", "Poner límites", "Quiero aprender a cuidar mi espacio."],
                ["🤍", "Confiar", "Quiero sentir más seguridad al abrirme."],
                ["🫂", "Conectar", "Quiero construir vínculos más auténticos."]
            ]
        }
    },

    "Lo que quiero para mi vida": {
        question: "¿Qué sientes que te hace falta para tener más claridad?",
        description:
            "No tienes que tener la respuesta. Elige lo que más se acerque a tu momento actual.",
        options: [
            {
                icon: "🧭",
                title: "Una dirección",
                description: "Quiero saber hacia dónde quiero ir."
            },
            {
                icon: "🎯",
                title: "Una meta",
                description: "Sé lo que quiero, pero necesito enfocarme."
            },
            {
                icon: "🌱",
                title: "Conocerme más",
                description: "Siento que todavía estoy descubriendo quién soy."
            },
            {
                icon: "⚖️",
                title: "Equilibrio",
                description: "Quiero ordenar mejor las distintas partes de mi vida."
            }
        ],
        third: {
            title: "¿Qué te gustaría fortalecer para acercarte a esa vida?",
            options: [
                ["🧭", "Dirección", "Quiero tomar decisiones con más claridad."],
                ["💪", "Confianza", "Quiero creer más en mis capacidades."],
                ["⏳", "Constancia", "Quiero avanzar aunque sea poco a poco."],
                ["🌿", "Bienestar", "Quiero cuidar mejor de mí mientras avanzo."]
            ]
        }
    }
};

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
    selfKnowledgeArea = null;
    selfKnowledgeSecond = null;
    selfKnowledgeThird = null;

    const selectedOptionText =
        understandOption?.querySelector("strong")?.textContent.trim() || "";

    understandingMode =
        selectedOptionText === "Conocerme mejor"
            ? "self"
            : "anxiety";

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

        if (understandingMode === "self") {
            showSelfKnowledgeQuestion();
        } else {
            showUnderstandingQuestion();
        }
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


function showSelfKnowledgeQuestion() {
    let question;

    if (currentUnderstandingQuestion === 0) {
        question = understandingQuestions[0];
    } else {
        const branch =
            selfKnowledgeBranches[selfKnowledgeArea];

        if (currentUnderstandingQuestion === 1) {
            question = {
                title: branch.question,
                description: branch.description,
                options: branch.options
            };
        } else {
            question = {
                title: branch.third.title,
                description:
                    "No busques la respuesta perfecta. Elige lo que más te gustaría desarrollar.",
                options: branch.third.options.map(function (item) {
                    return {
                        icon: item[0],
                        title: item[1],
                        description: item[2]
                    };
                })
            };
        }
    }

    understandingStep.textContent =
        currentUnderstandingQuestion + 1;

    questionNumber.textContent =
        "PREGUNTA " + (currentUnderstandingQuestion + 1);

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
            selectSelfKnowledgeAnswer(option.title);
        });

        questionOptions.appendChild(button);
    });
}

function selectSelfKnowledgeAnswer(answer) {
    if (currentUnderstandingQuestion === 0) {
        selfKnowledgeArea = answer;
    } else if (currentUnderstandingQuestion === 1) {
        selfKnowledgeSecond = answer;
    } else {
        selfKnowledgeThird = answer;
    }

    setTimeout(function () {
        currentUnderstandingQuestion++;

        if (currentUnderstandingQuestion >= 3) {
            showSelfKnowledgeResult();
        } else {
            showSelfKnowledgeQuestion();
        }
    }, 280);
}

function showSelfKnowledgeResult() {
    understandingQuestion.classList.add("hidden");
    understandingResult.classList.remove("hidden");

    const area = selfKnowledgeArea;
    const second = selfKnowledgeSecond;
    const third = selfKnowledgeThird;

    const profiles = {
        "Mis pensamientos":
            "Tu forma de pensar parece ser un punto importante en cómo procesas lo que vives.",
        "Mis emociones":
            "Parece que estás prestando especial atención a tu mundo emocional y a cómo expresas lo que sientes.",
        "Mi forma de ser":
            "Parece que estás en un proceso de descubrir y aceptar distintas partes de quién eres.",
        "Mis relaciones":
            "Parece que tus vínculos tienen un papel importante en tu bienestar y en la manera en que te conoces.",
        "Lo que quiero para mi vida":
            "Parece que estás buscando más claridad sobre el rumbo que quieres darle a tu vida."
    };

    const reflections = {
        "Mis pensamientos":
            "Observar tus pensamientos sin creer automáticamente todo lo que dicen puede ayudarte a distinguir entre una preocupación y un hecho.",
        "Mis emociones":
            "Una emoción es una señal, no una orden. Puedes reconocerla, escucharla y decidir cómo responder.",
        "Mi forma de ser":
            "Conocerte no significa encontrar una definición definitiva de ti. Las personas cambian, aprenden y descubren nuevas partes de sí mismas.",
        "Mis relaciones":
            "Una relación saludable permite cercanía, pero también espacio para expresar necesidades y límites.",
        "Lo que quiero para mi vida":
            "No siempre necesitas tener todo el camino claro. A veces una dirección pequeña y realista es suficiente para comenzar."
    };

    const advice = {
        "Mis pensamientos":
            "Cuando notes que tu mente se acelera, escribe durante unos minutos qué estás pensando y separa los hechos de las suposiciones.",
        "Mis emociones":
            "La próxima vez que sientas algo intenso, prueba decir: “Estoy sintiendo ___ porque ___”. Ponerle nombre puede ayudarte a observarlo.",
        "Mi forma de ser":
            "Anota una fortaleza, un límite y una cosa que quieras aprender de ti. No necesitas cambiar para merecer valor.",
        "Mis relaciones":
            "Practica expresar una necesidad pequeña con claridad, sin disculparte por tenerla.",
        "Lo que quiero para mi vida":
            "Elige una acción pequeña que puedas realizar esta semana y que te acerque a lo que quieres."
    };

    const text =
        `${profiles[area] || "Estás prestando atención a algo importante de ti."} ` +
        `Cuando dices que ${second ? second.toLowerCase() : "vives ciertas situaciones de esta manera"}, ` +
        `y que te gustaría ${third ? third.toLowerCase() : "seguir conociéndote"}, aparece una pista sobre lo que hoy puede ser importante para ti.`;

    understandingResultText.innerHTML = `
        <span class="result-section-label">🔎 Lo que podrías estar descubriendo</span>
        <span class="result-section-text">${text}</span>

        <span class="result-section-label">💡 Un pequeño consejo</span>
        <span class="result-section-text">${advice[area] || "Date un momento para observarte sin juzgarte."}</span>

        <span class="result-section-label">🪞 Para reflexionar</span>
        <span class="result-quote">“¿Qué cambiaría si pudieras conocerte sin exigirte ser diferente?”</span>

        <span class="result-section-label">ℹ️ Algo importante</span>
        <span class="result-section-text">${reflections[area] || "Conocerte mejor es un proceso, no una prueba que tengas que aprobar."}</span>
    `;
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
    if (understandingMode === "self") {
        showSelfKnowledgeResult();
        return;
    }

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

