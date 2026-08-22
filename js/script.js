/* =========================================
   MENTE
   JAVASCRIPT PRINCIPAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTOS
    ===================================== */

    const homeScreen =
        document.getElementById("homeScreen");

    const toolScreen =
        document.getElementById("toolScreen");

    const backButton =
        document.getElementById("backButton");

    const toolTitle =
        document.getElementById("toolTitle");

    const toolDescription =
        document.getElementById("toolDescription");

    const toolHeaderIcon =
        document.getElementById("toolHeaderIcon");

    const toolLabel =
        document.getElementById("toolLabel");

    const dailyMessage =
        document.getElementById("dailyMessage");

    const dailyIcon =
        document.getElementById("dailyIcon");

    const verseText =
        document.getElementById("verseText");

    const verseReference =
        document.getElementById("verseReference");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================
       HERRAMIENTAS
    ===================================== */

    const panels = {

        calmar:
            document.getElementById("breathingPanel"),

        ordenar:
            document.getElementById("thoughtPanel"),

        concentrarme:
            document.getElementById("focusPanel"),

        escribir:
            document.getElementById("writingPanel"),

        relajarme:
            document.getElementById("relaxPanel"),

        aprender:
            document.getElementById("learnPanel")

    };


    const tools = {

        calmar: {

            icon: "🌬️",

            title:
                "Vamos a bajar el ritmo",

            description:
                "No necesitas hacer que todo desaparezca. Vamos a concentrarnos solamente en este momento.",

            label:
                "CALMARME"

        },


        ordenar: {

            icon: "🧠",

            title:
                "Vamos a ordenar tus pensamientos",

            description:
                "No tienes que solucionar todo de una vez. Primero vamos a identificar qué ocupa más espacio.",

            label:
                "ORDENAR MI MENTE"

        },


        concentrarme: {

            icon: "🎯",

            title:
                "Un momento de concentración",

            description:
                "Vamos a reducir el ruido y dedicar unos minutos a una sola cosa.",

            label:
                "CONCENTRARME"

        },


        escribir: {

            icon: "📝",

            title:
                "Ponlo en palabras",

            description:
                "Escribir puede ayudarte a sacar lo que tienes dando vueltas en la cabeza.",

            label:
                "ESCRIBIR"

        },


        relajarme: {

            icon: "😴",

            title:
                "Es momento de aflojar",

            description:
                "Suelta los hombros. Relaja la mandíbula. No tienes que estar haciendo algo todo el tiempo.",

            label:
                "RELAJARME"

        },


        aprender: {

            icon: "📚",

            title:
                "Entenderte también es cuidarte",

            description:
                "Conocer cómo funcionan tus pensamientos y emociones puede ayudarte a tratarlos con más paciencia.",

            label:
                "APRENDER"

        }

    };


    /* =====================================
       MENSAJES POR EMOCIÓN
    ===================================== */

    const moodData = {

        "muy-bien": {

            weather: "sunny",

            icon: "☀️",

            message:
                "Disfruta este momento. No tienes que esperar a sentirte mal para reconocer que hoy estás bien.",

            sound: "sunny"

        },


        "bien": {

            weather: "sunny",

            icon: "🌤️",

            message:
                "Qué bueno que hoy estás bien. Guarda un poco de esta calma para los días difíciles.",

            sound: "sunny"

        },


        "regular": {

            weather: "cloudy",

            icon: "⛅",

            message:
                "No todos los días tienen que ser extraordinarios. Hoy también cuenta.",

            sound: "cloudy"

        },


        "mal": {

            weather: "rainy",

            icon: "🌧️",

            message:
                "Está bien reconocer que hoy no estás bien. No tienes que fingir lo contrario.",

            sound: "rain"

        },


        "muy-mal": {

            weather: "night",

            icon: "🌙",

            message:
                "Si todo parece demasiado ahora, no intentes resolverlo todo. Quédate con el siguiente pequeño paso.",

            sound: "rain"

        }

    };


    /* =====================================
       VERSÍCULOS
    ===================================== */

    const verses = [

        {

            text:
                "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.",

            reference:
                "Isaías 41:10"

        },


        {

            text:
                "Echa sobre Jehová tu carga, y él te sustentará.",

            reference:
                "Salmos 55:22"

        },


        {

            text:
                "El Señor es mi pastor; nada me faltará.",

            reference:
                "Salmos 23:1"

        },


        {

            text:
                "Todo lo puedo en Cristo que me fortalece.",

            reference:
                "Filipenses 4:13"

        },


        {

            text:
                "Cercano está Jehová a los quebrantados de corazón.",

            reference:
                "Salmos 34:18"

        },


        {

            text:
                "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",

            reference:
                "Mateo 11:28"

        },


        {

            text:
                "Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.",

            reference:
                "Proverbios 16:3"

        },


        {

            text:
                "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios.",

            reference:
                "Filipenses 4:6"

        },


        {

            text:
                "Jehová es mi luz y mi salvación; ¿de quién temeré?",

            reference:
                "Salmos 27:1"

        },


        {

            text:
                "Aun cuando pase por el valle más oscuro, no temeré peligro alguno, porque tú estás conmigo.",

            reference:
                "Salmos 23:4"

        }

    ];


    /* =====================================
       FRASES
    ===================================== */

    const phrases = [

        "No tienes que tener todo resuelto hoy.",

        "Respirar también es avanzar.",

        "Puedes descansar sin sentir culpa.",

        "Un momento difícil no define toda tu historia.",

        "Sé paciente contigo.",

        "No necesitas ir tan rápido.",

        "Haz solamente lo que puedas hacer ahora.",

        "Tus emociones merecen ser escuchadas.",

        "También puedes empezar de nuevo.",

        "Un pequeño paso sigue siendo un paso."

    ];


    /* =====================================
       CAMBIAR VERSÍCULO
    ===================================== */

    function showRandomVerse() {

        const current =
            verses[
                Math.floor(
                    Math.random() *
                    verses.length
                )
            ];

        verseText.textContent =
            `"${current.text}"`;

        verseReference.textContent =
            current.reference;

    }


    const newVerseButton =
        document.getElementById("newVerseButton");


    if (newVerseButton) {

        newVerseButton.addEventListener(
            "click",
            () => {

                showRandomVerse();

                showToast(
                    "Nueva palabra para este momento."
                );

            }
        );

    }


    /* =====================================
       TOAST
    ===================================== */

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2800);

    }


    /* =====================================
       CAMBIO DE CLIMA
    ===================================== */

    function changeWeather(weather) {

        document.body.classList.remove(
            "weather-sunny",
            "weather-cloudy",
            "weather-rainy",
            "weather-night"
        );

        document.body.classList.add(
            `weather-${weather}`
        );

    }


    /* =====================================
       SELECCIÓN DE EMOCIÓN
    ===================================== */

    const moodButtons =
        document.querySelectorAll(
            ".mood-card"
        );


    moodButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                moodButtons.forEach(item => {

                    item.classList.remove(
                        "selected"
                    );

                });


                button.classList.add(
                    "selected"
                );


                const mood =
                    button.dataset.mood;

                const data =
                    moodData[mood];


                if (!data) return;


                changeWeather(
                    data.weather
                );


                dailyIcon.textContent =
                    data.icon;

                dailyMessage.textContent =
                    data.message;


                const phrase =
                    phrases[
                        Math.floor(
                            Math.random() *
                            phrases.length
                        )
                    ];


                showToast(
                    `${phrase}`
                );


                playMoodSound(
                    data.sound
                );


                localStorage.setItem(
                    "menteMood",
                    mood
                );


                localStorage.setItem(
                    "menteMoodDate",
                    new Date().toISOString()
                );

            }
        );

    });


    /* =====================================
       ABRIR HERRAMIENTA
    ===================================== */

    function openTool(toolName) {

        const tool =
            tools[toolName];

        if (!tool) return;


        /* Cambiar encabezado */

        toolHeaderIcon.textContent =
            tool.icon;

        toolTitle.textContent =
            tool.title;

        toolDescription.textContent =
            tool.description;

        toolLabel.textContent =
            tool.label;


        /* Ocultar todos los paneles */

        Object.values(panels)
            .forEach(panel => {

                if (panel) {

                    panel.classList.add(
                        "hidden"
                    );

                }

            });


        /* Mostrar panel */

        if (panels[toolName]) {

            panels[toolName]
                .classList.remove(
                    "hidden"
                );

        }


        /* Cambiar pantalla */

        homeScreen.classList.remove(
            "active"
        );

        toolScreen.classList.add(
            "active"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================
       BOTONES DE HERRAMIENTAS
    ===================================== */

    const toolButtons =
        document.querySelectorAll(
            ".tool-card"
        );


    toolButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openTool(
                    button.dataset.tool
                );

            }
        );

    });


    /* =====================================
       VOLVER
    ===================================== */

    backButton.addEventListener(
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

        }
    );


    /* =====================================
       NAVEGACIÓN INFERIOR
    ===================================== */

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    function activateNav(item) {

        navItems.forEach(nav => {

            nav.classList.remove(
                "active"
            );

        });

        if (item) {

            item.classList.add(
                "active"
            );

        }

    }


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const screen =
                    item.dataset.screen;

                if (screen === "homeScreen") {

                    toolScreen.classList.remove(
                        "active"
                    );

                    homeScreen.classList.add(
                        "active"
                    );

                    activateNav(item);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =====================================
       PARA TI
    ===================================== */

    const randomToolButton =
        document.getElementById(
            "randomToolButton"
        );


    randomToolButton.addEventListener(
        "click",
        () => {

            const mood =
                localStorage.getItem(
                    "menteMood"
                );


            let recommended;


            if (
                mood === "muy-mal" ||
                mood === "mal"
            ) {

                recommended =
                    "calmar";

            } else if (
                mood === "regular"
            ) {

                recommended =
                    "ordenar";

            } else {

                recommended =
                    "concentrarme";

            }


            openTool(recommended);

            activateNav(
                randomToolButton
            );

        }
    );


    /* =====================================
       BOTÓN PALABRA
    ===================================== */

    const verseNavButton =
        document.getElementById(
            "verseNavButton"
        );


    verseNavButton.addEventListener(
        "click",
        () => {

            showRandomVerse();

            toolScreen.classList.remove(
                "active"
            );

            homeScreen.classList.add(
                "active"
            );

            activateNav(
                verseNavButton
            );


            setTimeout(() => {

                document
                    .querySelector(".verse-card")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

            }, 100);

        }
    );


    /* =====================================
       BOTÓN NOTAS
    ===================================== */

    const journalNavButton =
        document.getElementById(
            "journalNavButton"
        );


    journalNavButton.addEventListener(
        "click",
        () => {

            openTool("escribir");

            activateNav(
                journalNavButton
            );

        }
    );


    /* =====================================
       RESPIRACIÓN
    ===================================== */

    const breathingStart =
        document.getElementById(
            "breathingStart"
        );

    const breathingCircle =
        document.getElementById(
            "breathingCircle"
        );

    const breathingInstruction =
        document.getElementById(
            "breathingInstruction"
        );

    const breathingCounter =
        document.getElementById(
            "breathingCounter"
        );

    const breathingPhase =
        document.getElementById(
            "breathingPhase"
        );

    const breathingText =
        document.getElementById(
            "breathingText"
        );


    let breathingRunning = false;

    let breathingTimeout;


    function startBreathing() {

        if (breathingRunning) return;

        breathingRunning = true;

        breathingStart.textContent =
            "Respira...";

        let cycle = 0;

        const totalCycles = 4;


        function phase(
            name,
            duration,
            className,
            instruction,
            text
        ) {

            return new Promise(resolve => {

                breathingCircle
                    .classList.remove(
                        "inhale",
                        "exhale"
                    );


                if (className) {

                    breathingCircle
                        .classList.add(
                            className
                        );

                }


                breathingInstruction
                    .textContent =
                    instruction;


                breathingPhase
                    .textContent =
                    name;


                breathingText
                    .textContent =
                    text;


                let remaining =
                    duration;


                breathingCounter
                    .textContent =
                    remaining;


                const timer =
                    setInterval(() => {

                        remaining--;

                        breathingCounter
                            .textContent =
                            remaining;


                        if (
                            remaining <= 0
                        ) {

                            clearInterval(
                                timer
                            );

                            resolve();

                        }

                    }, 1000);

            });

        }


        async function runCycle() {

            cycle++;


            await phase(
                "Inhala lentamente",
                4,
                "inhale",
                "Inhala",
                "Toma aire suavemente por la nariz."
            );


            await phase(
                "Sostén",
                2,
                "",
                "Mantén",
                "Quédate aquí un instante."
            );


            await phase(
                "Exhala lentamente",
                6,
                "exhale",
                "Exhala",
                "Suelta el aire poco a poco."
            );


            if (
                breathingRunning &&
                cycle < totalCycles
            ) {

                runCycle();

            } else {

                breathingRunning =
                    false;

                breathingCircle
                    .classList.remove(
                        "inhale",
                        "exhale"
                    );


                breathingInstruction
                    .textContent =
                    "Listo";

                breathingCounter
                    .textContent =
                    "✓";

                breathingPhase
                    .textContent =
                    "Ejercicio terminado";

                breathingText
                    .textContent =
                    "Tómate unos segundos para notar cómo te sientes ahora.";

                breathingStart.textContent =
                    "↻ Repetir ejercicio";

                showToast(
                    "Muy bien. Tómate un momento."
                );

            }

        }


        runCycle();

    }


    breathingStart.addEventListener(
        "click",
        () => {

            if (!breathingRunning) {

                startBreathing();

            } else {

                breathingRunning =
                    false;

                clearTimeout(
                    breathingTimeout
                );

            }

        }
    );


    /* =====================================
       DIARIO
    ===================================== */

    const journalText =
        document.getElementById(
            "journalText"
        );

    const saveJournal =
        document.getElementById(
            "saveJournal"
        );

    const clearJournal =
        document.getElementById(
            "clearJournal"
        );

    const savedNote =
        document.getElementById(
            "savedNote"
        );


    const storedNote =
        localStorage.getItem(
            "menteJournal"
        );


    if (storedNote) {

        journalText.value =
            storedNote;

    }


    saveJournal.addEventListener(
        "click",
        () => {

            const text =
                journalText.value.trim();


            if (!text) {

                showToast(
                    "Escribe algo antes de guardar."
                );

                return;

            }


            localStorage.setItem(
                "menteJournal",
                text
            );


            savedNote.classList.remove(
                "hidden"
            );


            showToast(
                "Tu nota quedó guardada."
            );

        }
    );


    clearJournal.addEventListener(
        "click",
        () => {

            journalText.value = "";

            savedNote.classList.add(
                "hidden"
            );

            localStorage.removeItem(
                "menteJournal"
            );

        }
    );


    /* =====================================
       ORDENAR PENSAMIENTOS
    ===================================== */

    const thoughtButtons =
        document.querySelectorAll(
            ".thought-options button"
        );

    const thoughtResponse =
        document.getElementById(
            "thoughtResponse"
        );


    const thoughtResponses = {

        problema:
            "Escribe el problema en una sola frase. Después pregúntate: ¿qué parte sí está bajo mi control hoy?",

        preocupacion:
            "Una preocupación puede sentirse enorme. Intenta separar lo que sabes de lo que estás imaginando que podría ocurrir.",

        decision:
            "No necesitas encontrar la decisión perfecta. Haz una lista de las opciones y escribe qué ganas y qué pierdes con cada una.",

        pensamiento:
            "No tienes que perseguir cada pensamiento. Observa uno, ponle nombre y vuelve lentamente a lo que estabas haciendo."

    };


    thoughtButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const thought =
                    button.dataset.thought;

                thoughtResponse.textContent =
                    thoughtResponses[thought];

            }
        );

    });


    /* =====================================
       CONCENTRACIÓN
    ===================================== */

    const focusStart =
        document.getElementById(
            "focusStart"
        );

    const focusStop =
        document.getElementById(
            "focusStop"
        );

    const focusMinutes =
        document.getElementById(
            "focusMinutes"
        );


    let focusSeconds = 300;

    let focusInterval = null;


    function updateFocusDisplay() {

        const minutes =
            Math.floor(
                focusSeconds / 60
            );

        const seconds =
            focusSeconds % 60;


        focusMinutes.textContent =
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    }


    focusStart.addEventListener(
        "click",
        () => {

            if (focusInterval) return;


            focusSeconds = 300;

            updateFocusDisplay();


            focusStart.classList.add(
                "hidden"
            );

            focusStop.classList.remove(
                "hidden"
            );


            showToast(
                "Tu momento de concentración comenzó."
            );


            focusInterval =
                setInterval(() => {

                    focusSeconds--;

                    updateFocusDisplay();


                    if (
                        focusSeconds <= 0
                    ) {

                        clearInterval(
                            focusInterval
                        );

                        focusInterval = null;

                        focusStart.classList.remove(
                            "hidden"
                        );

                        focusStop.classList.add(
                            "hidden"
                        );

                        showToast(
                            "Terminaste tu momento de concentración."
                        );

                    }

                }, 1000);

        }
    );


    focusStop.addEventListener(
        "click",
        () => {

            clearInterval(
                focusInterval
            );

            focusInterval = null;

            focusSeconds = 300;

            updateFocusDisplay();

            focusStart.classList.remove(
                "hidden"
            );

            focusStop.classList.add(
                "hidden"
            );

            showToast(
                "Sesión detenida."
            );

        }
    );


    /* =====================================
       RELAJACIÓN
    ===================================== */

    const relaxStart =
        document.getElementById(
            "relaxStart"
        );


    relaxStart.addEventListener(
        "click",
        () => {

            relaxStart.textContent =
                "✨ Sigue respirando";

            showToast(
                "Permítete bajar el ritmo."
            );


            setTimeout(() => {

                relaxStart.textContent =
                    "Comenzar relajación";

            }, 5000);

        }
    );


    /* =====================================
       SONIDOS
       
       Se utiliza Web Audio API.
       No necesitamos archivos MP3 externos.
    ===================================== */

    let audioContext = null;

    let soundEnabled = false;

    let rainNodes = [];


    const soundButton =
        document.getElementById(
            "soundButton"
        );


    function getAudioContext() {

        if (!audioContext) {

            const AudioCtx =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioCtx) {

                return null;

            }

            audioContext =
                new AudioCtx();

        }


        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        return audioContext;

    }


    function playTone(
        frequency,
        duration,
        volume = .04
    ) {

        const ctx =
            getAudioContext();

        if (!ctx || !soundEnabled)
            return;


        const oscillator =
            ctx.createOscillator();

        const gain =
            ctx.createGain();


        oscillator.frequency.value =
            frequency;

        oscillator.type =
            "sine";


        gain.gain.setValueAtTime(
            0,
            ctx.currentTime
        );


        gain.gain.linearRampToValueAtTime(
            volume,
            ctx.currentTime + .08
        );


        gain.gain.exponentialRampToValueAtTime(
            .001,
            ctx.currentTime + duration
        );


        oscillator.connect(gain);

        gain.connect(
            ctx.destination
        );


        oscillator.start();

        oscillator.stop(
            ctx.currentTime +
            duration
        );

    }


    function startRainSound() {

        const ctx =
            getAudioContext();

        if (!ctx || !soundEnabled)
            return;


        stopRainSound();


        const bufferSize =
            2 * ctx.sampleRate;


        const buffer =
            ctx.createBuffer(
                1,
                bufferSize,
                ctx.sampleRate
            );


        const data =
            buffer.getChannelData(0);


        for (
            let i = 0;
            i < bufferSize;
            i++
        ) {

            data[i] =
                Math.random() * 2 - 1;

        }


        const source =
            ctx.createBufferSource();

        source.buffer =
            buffer;

        source.loop =
            true;


        const filter =
            ctx.createBiquadFilter();

        filter.type =
            "lowpass";

        filter.frequency.value =
            1500;


        const gain =
            ctx.createGain();

        gain.gain.value =
            .035;


        source
            .connect(filter)
            .connect(gain)
            .connect(ctx.destination);


        source.start();


        rainNodes.push(
            source,
            filter,
            gain
        );

    }


    function stopRainSound() {

        rainNodes.forEach(node => {

            try {

                if (
                    node.stop
                ) {

                    node.stop();

                }

                node.disconnect();

            } catch (error) {}

        });


        rainNodes = [];

    }


    function playMoodSound(type) {

        if (!soundEnabled)
            return;


        if (type === "sunny") {

            stopRainSound();

            playTone(
                523.25,
                .6,
                .025
            );

            setTimeout(() => {

                playTone(
                    659.25,
                    .7,
                    .02
                );

            }, 180);

        }


        if (type === "cloudy") {

            stopRainSound();

            playTone(
                392,
                .8,
                .018
            );

        }


        if (type === "rain") {

            startRainSound();

        }

    }


    soundButton.addEventListener(
        "click",
        () => {

            const ctx =
                getAudioContext();


            if (!ctx) {

                showToast(
                    "Tu navegador no permite sonido."
                );

                return;

            }


            soundEnabled =
                !soundEnabled;


            if (soundEnabled) {

                soundButton.textContent =
                    "🔊";

                playTone(
                    523.25,
                    .5,
                    .03
                );

                showToast(
                    "Sonidos ambientales activados."
                );


                const mood =
                    localStorage.getItem(
                        "menteMood"
                    );


                if (
                    mood &&
                    moodData[mood]
                ) {

                    playMoodSound(
                        moodData[mood].sound
                    );

                }

            } else {

                soundButton.textContent =
                    "🔇";

                stopRainSound();

                showToast(
                    "Sonidos desactivados."
                );

            }

        }
    );


    /* =====================================
       RECUPERAR ESTADO ANTERIOR
    ===================================== */

    const savedMood =
        localStorage.getItem(
            "menteMood"
        );


    if (
        savedMood &&
        moodData[savedMood]
    ) {

        const savedButton =
            document.querySelector(
                `[data-mood="${savedMood}"]`
            );


        if (savedButton) {

            savedButton.classList.add(
                "selected"
            );

        }


        const data =
            moodData[savedMood];


        changeWeather(
            data.weather
        );


        dailyIcon.textContent =
            data.icon;

        dailyMessage.textContent =
            data.message;

    } else {

        changeWeather(
            "sunny"
        );

    }


    /* =====================================
       CAMBIO AUTOMÁTICO DE FRASE
    ===================================== */

    setInterval(() => {

        /*
         * Solo cambiamos el mensaje
         * ocasionalmente para que la
         * interfaz se sienta viva.
         */

        if (
            Math.random() > .65
        ) {

            const phrase =
                phrases[
                    Math.floor(
                        Math.random() *
                        phrases.length
                    )
                ];

            dailyMessage.textContent =
                phrase;

        }

    }, 18000);


    /* =====================================
       SALUDO SEGÚN HORA
    ===================================== */

    const greetingEmoji =
        document.getElementById(
            "greetingEmoji"
        );

    const welcomeText =
        document.getElementById(
            "welcomeText"
        );


    const hour =
        new Date().getHours();


    if (hour < 12) {

        greetingEmoji.textContent =
            "🌅";

        welcomeText.textContent =
            "Buenos días. Empieza este día a tu propio ritmo.";

    } else if (hour < 19) {

        greetingEmoji.textContent =
            "☀️";

        welcomeText.textContent =
            "Tómate un momento. No tienes que correr todo el tiempo.";

    } else {

        greetingEmoji.textContent =
            "🌙";

        welcomeText.textContent =
            "Ya es momento de bajar un poco el ritmo.";

    }


    /* =====================================
       INICIALIZACIÓN
    ===================================== */

    updateFocusDisplay();

    showRandomVerse();

});
