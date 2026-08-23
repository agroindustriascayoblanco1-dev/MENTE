const feelings = document.querySelectorAll(".feeling");
const continueButton = document.getElementById("continueButton");

let selectedFeeling = null;

feelings.forEach((feeling) => {

    feeling.addEventListener("click", () => {

        feelings.forEach((item) => {
            item.classList.remove("selected");
        });

        feeling.classList.add("selected");

        selectedFeeling = feeling.dataset.feeling;

    });

});

continueButton.addEventListener("click", () => {

    if (!selectedFeeling) {
        alert("Primero cuéntanos cómo te sientes.");
        return;
    }

    alert(`Has seleccionado: ${selectedFeeling}`);

});
