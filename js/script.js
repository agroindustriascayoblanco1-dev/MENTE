/* =========================================================
   MENTE
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

const state = {

    emotion: null,

    sound: true,

    breathingRunning: false,

    focusRunning: false,

    focusSeconds: 300,

    focusInterval: null,

    breathingTimeout: null,

    weather: "default"

};


/* =========================================================
   ELEMENTOS
========================================================= */

const homeScreen =
    document.getElementById("homeScreen");

const toolScreen =
    document.getElementById("toolScreen");

const weatherBackground =
    document.getElementById("weatherBackground");

const weatherParticles =
    document.getElementById("weatherParticles");

const rain =
    document.getElementById("rain");

const soundToggle =
    document.getElementById("soundToggle");

const selectedEmotionLabel =
    document.getElementById("selectedEmotionLabel");

const emotionMessage =
    document.getElementById("emotionMessage");

const emotionMessageIcon =
    document.getElementById("emotionMessageIcon");

const emotionMessageTitle =
    document.getElementById("emotionMessageTitle");

const emotionMessageText =
    document.getElementById("emotionMessageText");

const wisdomText =
    document.getElementById("wisdomText");

const wisdomSource =
    document.getElementById("wisdomSource");

const newWisdom =
    document.getElementById("newWisdom");

const toolTitle =
    document.getElementById("toolTitle");

const toolDescription =
    document.getElementById("toolDescription");

const toolIcon =
    document.getElementById("toolIcon");

const backHome =
    document.getElementById("backHome");


/* =========================================================
   DATOS DE EMOCIONES
========================================================= */

const emotions = {

    "muy-bien": {

        weather: "sunny",

        icon: "☀️",

        title: "Qué bonito saberlo.",

        text:
            "Disfruta este momento. También vale la pena reconocer cuando las cosas están bien.",

        wisdom: [
            {
                text: "“Este es el día que hizo el Señor; nos gozaremos y alegraremos en él.”",
                source: "Salmos 118:24"
            },
            {
                text: "“Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.”",
                source: "Eclesiastés 3:1"
            }
        ]

    },


    "bien": {

        weather: "sunny",

        icon: "🌤️",

        title: "Me alegra saber que estás bien.",

        text:
            "No necesitas sentirte increíble todo el tiempo. Estar bien también es suficiente.",

        wisdom: [
            {
                text: "“El corazón alegre constituye buen remedio.”",
                source: "Proverbios 17:22"
            },
            {
                text: "A veces la tranquilidad también es una forma de felicidad.",
                source: "MENTE"
            }
        ]

    },


    "regular": {

        weather: "cloudy",

        icon: "🌥️",

        title: "Hoy parece un día intermedio.",

        text:
            "No tienes que solucionar todo ahora. Podemos empezar por entender qué necesitas.",

        wisdom: [
            {
                text: "“Todo lo puedo en Cristo que me fortalece.”",
                source: "Filipenses 4:13"
            },
            {
                text: "No todos los días tienen que ser extraordinarios.",
                source: "MENTE"
            }
        ]

    },


    "mal": {

        weather: "rainy",

        icon: "🌧️",

        title: "Gracias por decirlo.",

        text:
            "No tienes que esconder cómo te sientes. Vamos paso a paso.",

        wisdom: [
            {
                text: "“Cercano está Jehová a los quebrantados de corazón.”",
                source: "Salmos 34:18"
            },
            {
                text: "“Echa sobre Jehová tu carga, y él te sustentará.”",
                source: "Salmos 55:22"
            },
            {
                text: "Está bien detenerte un momento. No tienes que resolverlo todo hoy.",
                source: "MENTE"
            }
        ]

    },


    "muy-mal": {

        weather: "rainy",

        icon: "🌧️",

        title: "No estás obligado a cargarlo todo solo.",

        text:
            "Quédate aquí un momento. Respira. Podemos ir buscando un pequeño siguiente paso.",

        wisdom: [
            {
                text: "“Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.”",
                source: "Mateo 11:28"
            },
            {
                text: "“No temas, porque yo estoy contigo.”",
                source: "Isaías 41:10"
            },
            {
                text: "Un momento difícil no define toda tu historia.",
                source: "MENTE"
            }
        ]

    }

};


/* =========================================================
   FRASES GENERALES
========================================================= */

const quotes = [

    {
        text: "“No tienes que resolver toda tu vida hoy.”",
        source: "MENTE"
    },

    {
        text: "“Después de la tormenta viene la calma.”",
        source: "MENTE"
    },

    {
        text: "“Un pequeño paso sigue siendo un paso.”",
        source: "MENTE"
    },

    {
        text: "“También mereces hablarte con paciencia.”",
        source: "MENTE"
    },

    {
        text: "“Lo que sientes importa.”",
        source: "MENTE"
    },

    {
        text: "“Descansar no significa rendirse.”",
        source: "MENTE"
    },

    {
        text: "“Mañana puede ser diferente.”",
        source: "MENTE"
    }

];


let wisdomIndex = 0;

let quoteIndex = 0;


/* =========================================================
   HORA Y SALUDO
========================================================= */

function updateGreeting() {

    const hour =
        new Date().getHours();

    const greeting =
        document.getElementById("greetingTime");

    if (hour < 12) {

        greeting.textContent =
            "Buenos días ☀️";

    } else if (hour < 19) {

        greeting.textContent =
            "Buenas tardes 🌤️";

    } else {

        greeting.textContent =
            "Buenas noches 🌙";

    }

}


updateGreeting();


/* =========================================================
   SONIDO
========================================================= */

function playSound(type = "click") {

    if (!state.sound) {
        return;
    }

    /*
       Usamos Web Audio para evitar depender
       de archivos externos.
    */

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        const context =
            new AudioContext();

        const oscillator =
            context.createOscillator();

        const gain =
            context.createGain();

        oscillator.connect(gain);

        gain.connect(context.destination);

        const frequencies = {

            click: 420,

            success: 620,

            soft: 300

        };

        oscillator.frequency.value =
            frequencies[type] || 420;

        oscillator.type = "sine";

        gain.gain.setValueAtTime(
            0.0001,
            context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.04,
            context.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + 0.25
        );

        oscillator.start();

        oscillator.stop(
            context.currentTime + 0.25
        );

    } catch (error) {

        console.log(
            "Audio no disponible."
        );

    }

}


/* =========================================================
   BOTÓN SONIDO
========================================================= */

soundToggle.addEventListener(
    "click",
    () => {

        state.sound =
            !state.sound;

        soundToggle.textContent =
            state.sound
                ? "🔊"
                : "🔇";

        if (state.sound) {
            playSound("success");
        }

    }
);


/* =========================================================
   CAMBIAR CLIMA
========================================================= */

function changeWeather(weather) {

    weatherBackground.className =
        "weather-background";

    weatherBackground.classList.add(
        `weather-${weather}`
    );

    state.weather =
        weather;

    createWeatherParticles(weather);

}


/* =========================================================
   PARTÍCULAS
========================================================= */

function createWeatherParticles(weather) {

    weatherParticles.innerHTML = "";

    if (
        weather !== "sunny" &&
        weather !== "cloudy" &&
        weather !== "night"
    ) {
        return;
    }

    const amount =
        weather === "sunny"
            ? 10
            : 5;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDelay =
            `${Math.random() * 4}s`;

        particle.className =
            "weather-particle";

        weatherParticles.appendChild(
            particle
        );

    }

}


/* =========================================================
   EMOCIONES
========================================================= */

document
    .querySelectorAll(".emotion-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const emotion =
                    button.dataset.emotion;

                selectEmotion(
                    emotion,
                    button
                );

            }
        );

    });


function selectEmotion(
    emotion,
    selectedButton = null
) {

    state.emotion =
        emotion;

    const data =
        emotions[emotion];

    if (!data) {
        return;
    }


    document
        .querySelectorAll(".emotion-card")
        .forEach(card => {

            card.classList.remove(
                "selected"
            );

        });


    if (selectedButton) {

        selectedButton.classList.add(
            "selected"
        );

    }


    selectedEmotionLabel.textContent =
        data.title;


    emotionMessage.classList.remove(
        "hidden"
    );


    emotionMessageIcon.textContent =
        data.icon;

    emotionMessageTitle.textContent =
        data.title;

    emotionMessageText.textContent =
        data.text;


    changeWeather(
        data.weather
    );


    showWisdomForEmotion(
        data
    );


    playSound(
        "success"
    );

}


/* =========================================================
   REFLEXIONES
========================================================= */

function showWisdomForEmotion(data) {

    const collection =
        data.wisdom;

    wisdomIndex =
        Math.floor(
            Math.random() *
            collection.length
        );

    const wisdom =
        collection[wisdomIndex];

    wisdomText.textContent =
        wisdom.text;

    wisdomSource.textContent =
        wisdom.source;

}


newWisdom.addEventListener(
    "click",
    () => {

        if (!state.emotion) {

            showRandomWisdom();

            return;

        }

        const data =
            emotions[state.emotion];

        let newIndex =
            wisdomIndex + 1;

        if (
            newIndex >=
            data.wisdom.length
        ) {

            newIndex = 0;

        }

        wisdomIndex =
            newIndex;

        wisdomText.textContent =
            data.wisdom[newIndex].text;

        wisdomSource.textContent =
            data.wisdom[newIndex].source;

        playSound("click");

    }
);


function showRandomWisdom() {

    const item =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];

    wisdomText.textContent =
        item.text;

    wisdomSource.textContent =
        item.source;

}


/* =========================================================
   HERRAMIENTAS
========================================================= */

const tools = {

    calmar: {

        title: "Vamos a bajar el ritmo",

        description:
            "No necesitas hacer que todo desaparezca. Solo vamos a hacer una pausa.",

        icon: "🌬️",

        element: "breathingTool"

    },

    ordenar: {

        title: "Ordenemos tu mente",

        description:
            "Saca tus pensamientos de la cabeza y ponlos frente a ti.",

        icon: "🧠",

        element: "mindTool"

    },

    concentrar: {

        title: "Momento de concentración",

        description:
            "Cinco minutos. Una sola cosa.",

        icon: "🎯",

        element: "focusTool"

    },

    escribir: {

        title: "Escribe lo que sientes",

        description:
            "Este espacio es solamente para ti.",

        icon: "📝",

        element: "writingTool"

    },

    relajar: {

        title: "Vamos a relajarnos",

        description:
            "Haz espacio para la calma.",

        icon: "😴",

        element: "relaxTool"

    },

    aprender: {

        title: "Aprendamos sobre nosotros",

        description:
            "Entender lo que ocurre dentro de ti también es una herramienta.",

        icon: "📚",

        element: "learnTool"

    },

    gratitud: {

        title: "Un momento de gratitud",

        description:
            "Busca algo pequeño que haya sido bueno.",

        icon: "💛",

        element: "gratitudeTool"

    },

    frases: {

        title: "Palabras para este momento",

        description:
            "Quizá alguna de ellas sea justo lo que necesitabas leer.",

        icon: "💬",

        element: "quotesTool"

    },

    journal: {

        title: "Mi diario",

        description:
            "Lo que escribas se guarda solamente en este dispositivo.",

        icon: "📖",

        element: "diaryTool"

    }

};


/* =========================================================
   ABRIR HERRAMIENTA
========================================================= */

document
    .querySelectorAll(
        "[data-tool]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const tool =
                    button.dataset.tool;

                openTool(tool);

            }
        );

    });


function openTool(toolName) {

    const tool =
        tools[toolName];

    if (!tool) {
        return;
    }


    homeScreen.classList.remove(
        "active"
    );

    toolScreen.classList.add(
        "active"
    );


    toolTitle.textContent =
        tool.title;

    toolDescription.textContent =
        tool.description;

    toolIcon.textContent =
        tool.icon;


    document
        .querySelectorAll(".tool-content")
        .forEach(content => {

            content.classList.add(
                "hidden"
            );

        });


    const content =
        document.getElementById(
            tool.element
        );

    if (content) {

        content.classList.remove(
            "hidden"
        );

    }


    if (toolName === "journal") {

        loadDiary();

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    playSound("click");

}


/* =========================================================
   VOLVER
========================================================= */

backHome.addEventListener(
    "click",
    () => {

        toolScreen.classList.remove(
            "active"
        );

        homeScreen.classList.add(
            "active"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        playSound("click");

    }
);


/* =========================================================
   RESPIRACIÓN
========================================================= */

const breathingCircle =
    document.getElementById(
        "breathingCircle"
    );

const breathingText =
    document.getElementById(
        "breathingText"
    );

const breathingCounter =
    document.getElementById(
        "breathingCounter"
    );

const startBreathing =
    document.getElementById(
        "startBreathing"
    );


startBreathing.addEventListener(
    "click",
    startBreathingExercise
);


function startBreathingExercise() {

    if (state.breathingRunning) {
        return;
    }

    state.breathingRunning =
        true;

    startBreathing.disabled =
        true;

    let cycles = 0;

    const phases = [

        {
            text: "Inhala",
            className: "breathe-in",
            seconds: 4
        },

        {
            text: "Mantén",
            className: "breathe-in",
            seconds: 2
        },

        {
            text: "Exhala",
            className: "breathe-out",
            seconds: 6
        }

    ];


    function nextPhase(
        phaseIndex = 0
    ) {

        if (
            !state.breathingRunning
        ) {
            return;
        }

        const phase =
            phases[phaseIndex];


        breathingText.textContent =
            phase.text;


        breathingCircle.classList.remove(
            "breathe-in",
            "breathe-out"
        );


        breathingCircle.classList.add(
            phase.className
        );


        let remaining =
            phase.seconds;

        breathingCounter.textContent =
            remaining;


        const timer =
            setInterval(
                () => {

                    remaining--;

                    breathingCounter.textContent =
                        remaining;

                    if (
                        remaining <= 0
                    ) {

                        clearInterval(timer);

                        const next =
                            phaseIndex + 1;

                        if (
                            next >=
                            phases.length
                        ) {

                            cycles++;

                            if (
                                cycles >= 3
                            ) {

                                finishBreathing();

                                return;

                            }

                            nextPhase(0);

                        } else {

                            nextPhase(next);

                        }

                    }

                },
                1000
            );

    }


    nextPhase();

}


function finishBreathing() {

    state.breathingRunning =
        false;

    breathingCircle.classList.remove(
        "breathe-in",
        "breathe-out"
    );

    breathingText.textContent =
        "Muy bien";

    breathingCounter.textContent =
        "✓";

    startBreathing.disabled =
        false;

    playSound("success");

}


/* =========================================================
   ESCRITURA
========================================================= */

const journalInput =
    document.getElementById(
        "journalInput"
    );

const saveJournal =
    document.getElementById(
        "saveJournal"
    );

const clearJournal =
    document.getElementById(
        "clearJournal"
    );

const journalSaved =
    document.getElementById(
        "journalSaved"
    );


const JOURNAL_KEY =
    "mente_journal";


function loadJournal() {

    const saved =
        localStorage.getItem(
            JOURNAL_KEY
        );

    if (saved) {

        journalInput.value =
            saved;

    }

}


loadJournal();


saveJournal.addEventListener(
    "click",
    () => {

        const value =
            journalInput.value.trim();

        if (!value) {
            return;
        }

        localStorage.setItem(
            JOURNAL_KEY,
            value
        );

        journalSaved.classList.remove(
            "hidden"
        );

        playSound("success");

        setTimeout(
            () => {

                journalSaved.classList.add(
                    "hidden"
                );

            },
            2500
        );

    }
);


clearJournal.addEventListener(
    "click",
    () => {

        journalInput.value = "";

        localStorage.removeItem(
            JOURNAL_KEY
        );

        playSound("click");

    }
);


/* =========================================================
   ORDENAR MENTE
========================================================= */

const mindInput =
    document.getElementById(
        "mindInput"
    );

const organizeMind =
    document.getElementById(
        "organizeMind"
    );

const mindResult =
    document.getElementById(
        "mindResult"
    );


organizeMind.addEventListener(
    "click",
    () => {

        const text =
            mindInput.value.trim();

        if (!text) {

            mindResult.classList.remove(
                "hidden"
            );

            mindResult.textContent =
                "Primero escribe aquello que tienes dando vueltas en tu cabeza.";

            return;

        }


        const sentences =
            text
                .split(/[.!?]+/)
                .map(
                    item =>
                        item.trim()
                )
                .filter(Boolean);


        let result =
            "<strong>Vamos a separarlo:</strong><br><br>";


        if (sentences.length) {

            result +=
                "📝 Pensamientos que expresaste:<br>";

            sentences.forEach(
                sentence => {

                    result +=
                        `• ${escapeHTML(sentence)}<br>`;

                }
            );

        }


        result +=
            "<br>🌿 Ahora pregúntate: ¿qué de esto puedo controlar hoy?";


        mindResult.innerHTML =
            result;

        mindResult.classList.remove(
            "hidden"
        );

        playSound("success");

    }
);


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   CONCENTRACIÓN
========================================================= */

const focusTimer =
    document.getElementById(
        "focusTimer"
    );

const startFocus =
    document.getElementById(
        "startFocus"
    );

const resetFocus =
    document.getElementById(
        "resetFocus"
    );


function updateFocusTimer() {

    const minutes =
        Math.floor(
            state.focusSeconds / 60
        );

    const seconds =
        state.focusSeconds % 60;


    focusTimer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


startFocus.addEventListener(
    "click",
    () => {

        if (state.focusRunning) {
            return;
        }

        state.focusRunning =
            true;

        startFocus.textContent =
            "⏳ En marcha...";

        state.focusInterval =
            setInterval(
                () => {

                    state.focusSeconds--;

                    updateFocusTimer();

                    if (
                        state.focusSeconds <= 0
                    ) {

                        clearInterval(
                            state.focusInterval
                        );

                        state.focusRunning =
                            false;

                        startFocus.textContent =
                            "✓ Completado";

                        playSound(
                            "success"
                        );

                    }

                },
                1000
            );

        playSound("click");

    }
);


resetFocus.addEventListener(
    "click",
    () => {

        clearInterval(
            state.focusInterval
        );

        state.focusRunning =
            false;

        state.focusSeconds =
            300;

        startFocus.textContent =
            "▶ Comenzar";

        updateFocusTimer();

    }
);


updateFocusTimer();


/* =========================================================
   RELAJACIÓN
========================================================= */

const startRelax =
    document.getElementById(
        "startRelax"
    );


startRelax.addEventListener(
    "click",
    () => {

        changeWeather(
            "night"
        );

        startRelax.textContent =
            "🌙 Ambiente tranquilo activado";

        playSound("soft");

        setTimeout(
            () => {

                startRelax.textContent =
                    "🌙 Comenzar relajación";

            },
            3000
        );

    }
);


/* =========================================================
   APRENDER
========================================================= */

const lessons = [

    {
        title:
            "Las emociones son señales.",

        text:
            "Sentir tristeza, ansiedad, enojo o miedo no significa que estés fallando. Una emoción puede avisarte de que algo necesita atención."
    },

    {
        title:
            "No todo pensamiento es un hecho.",

        text:
            "A veces nuestra mente interpreta una situación de la manera más negativa posible. Puedes observar el pensamiento antes de aceptarlo como verdad."
    },

    {
        title:
            "Respirar puede ayudarte a hacer una pausa.",

        text:
            "Cuando estás alterado, reducir el ritmo de la respiración puede convertirse en una señal para detenerte y prestar atención al momento presente."
    },

    {
        title:
            "Pedir ayuda también es cuidarte.",

        text:
            "No tienes que enfrentar todo solo. Hablar con alguien de confianza o con un profesional puede ser un paso importante."
    }

];


let lessonIndex = 0;


const nextLesson =
    document.getElementById(
        "nextLesson"
    );


nextLesson.addEventListener(
    "click",
    () => {

        lessonIndex++;

        if (
            lessonIndex >=
            lessons.length
        ) {

            lessonIndex = 0;

        }

        const lesson =
            lessons[lessonIndex];

        document.querySelector(
            "#learnTool .lesson-card h3"
        ).textContent =
            lesson.title;

        document.querySelector(
            "#learnTool .lesson-card p"
        ).textContent =
            lesson.text;

        playSound("click");

    }
);


/* =========================================================
   GRATITUD
========================================================= */

const gratitudeInput =
    document.getElementById(
        "gratitudeInput"
    );

const saveGratitude =
    document.getElementById(
        "saveGratitude"
    );


saveGratitude.addEventListener(
    "click",
    () => {

        const value =
            gratitudeInput.value.trim();

        if (!value) {
            return;
        }


        const entries =
            getDiary();


        entries.push({

            date:
                new Date().toLocaleString(
                    "es-HN"
                ),

            text:
                `💛 Gratitud: ${value}`

        });


        saveDiary(
            entries
        );


        gratitudeInput.value = "";

        showModal(
            "💛 Guardado",
            "Tu momento de gratitud fue guardado en este dispositivo."
        );

        playSound("success");

    }
);


/* =========================================================
   FRASES
========================================================= */

const quoteBig =
    document.getElementById(
        "quoteBig"
    );

const quoteSource =
    document.getElementById(
        "quoteSource"
    );

const nextQuote =
    document.getElementById(
        "nextQuote"
    );


nextQuote.addEventListener(
    "click",
    () => {

        quoteIndex++;

        if (
            quoteIndex >=
            quotes.length
        ) {

            quoteIndex = 0;

        }

        quoteBig.textContent =
            quotes[quoteIndex].text;

        quoteSource.textContent =
            quotes[quoteIndex].source;

        playSound("click");

    }
);


/* =========================================================
   DIARIO
========================================================= */

const DIARY_KEY =
    "mente_diary";


function getDiary() {

    try {

        return JSON.parse(
            localStorage.getItem(
                DIARY_KEY
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveDiary(entries) {

    localStorage.setItem(
        DIARY_KEY,
        JSON.stringify(entries)
    );

}


function loadDiary() {

    const diaryEntries =
        document.getElementById(
            "diaryEntries"
        );

    const entries =
        getDiary();


    diaryEntries.innerHTML = "";


    if (!entries.length) {

        diaryEntries.innerHTML = `

            <div class="result-card">

                <strong>
                    Tu diario está vacío.
                </strong>

                <p style="margin-top:8px;">
                    Lo que escribas en las herramientas
                    de MENTE aparecerá aquí.
                </p>

            </div>

        `;

        return;

    }


    [...entries]
        .reverse()
        .forEach(entry => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "diary-entry";

            item.innerHTML = `

                <div class="diary-date">
                    ${escapeHTML(entry.date)}
                </div>

                <div>
                    ${escapeHTML(entry.text)}
                </div>

            `;

            diaryEntries.appendChild(
                item
            );

        });

}


/* =========================================================
   GUARDAR ESCRITURA TAMBIÉN EN DIARIO
========================================================= */

saveJournal.addEventListener(
    "click",
    () => {

        const value =
            journalInput.value.trim();

        if (!value) {
            return;
        }


        const entries =
            getDiary();


        entries.push({

            date:
                new Date().toLocaleString(
                    "es-HN"
                ),

            text:
                value

        });


        saveDiary(
            entries
        );

    }
);


/* =========================================================
   MODAL
========================================================= */

const modal =
    document.getElementById(
        "modal"
    );

const modalContent =
    document.getElementById(
        "modalContent"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


function showModal(
    title,
    text
) {

    modalContent.innerHTML = `

        <h2 style="margin-bottom:10px;">
            ${escapeHTML(title)}
        </h2>

        <p style="
            color:#71807c;
            line-height:1.7;
        ">
            ${escapeHTML(text)}
        </p>

    `;

    modal.classList.remove(
        "hidden"
    );

}


function closeModalWindow() {

    modal.classList.add(
        "hidden"
    );

}


closeModal.addEventListener(
    "click",
    closeModalWindow
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeModalWindow
    );


/* =========================================================
   INICIALIZACIÓN
========================================================= */

changeWeather(
    "default"
);


showRandomWisdom();


console.log(
    "MENTE iniciada correctamente ✓"
);
