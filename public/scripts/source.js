document.addEventListener("DOMContentLoaded", function () {

    // MAIL FORM
    const form = document.getElementById("mailform");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formButton = document.getElementById("mailform-submit");
        if (formButton.classList.contains("btn_disabled")) {
            return;
        }

        const formData = new FormData(form);
        let jsonData = {};
        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });

        const alertError = document.getElementById("alert-mailform-error");
        const alertSuccess = document.getElementById("alert-mailform-success");

        try {
            alertSuccess.classList.add("hidden");
            alertSuccess.classList.add("hidden");

            const response = await fetch("/api/sendmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) {
                alertError.classList.remove("hidden");
                throw new Error("Erreur lors de l'envoi du formulaire");
            }

            alertSuccess.classList.remove("hidden");
            form.reset();
            formButton.classList.add("btn_disabled");
        } catch (error) {
            alertError.classList.remove("hidden");
        }
    });

    const alertElements = document.getElementsByClassName("alertHideOnClick");
    for (const element of alertElements) {
        element.addEventListener("click", () => {
            element.classList.add("hidden");
        });
    }

    // GIFTCARD FORM (carte cadeau)
    const giftcardform = document.getElementById('giftcard-form');

    giftcardform.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formButton = document.getElementById("giftcardform-submit");

        if (formButton.classList.contains("btn_disabled")) {
            return;
        }

        const formData = new FormData(giftcardform);
        let jsonData = {};
        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });

        const alertError = document.getElementById("alert-giftcardform-error");
        const alertSuccess = document.getElementById("alert-giftcardform-success");

        try {
            const response = await fetch('/api/sendgiftcard', {
                method: 'POST',
                body: JSON.stringify(jsonData)
            });

            if (!response.ok) {
                alertError.classList.remove("hidden");
                throw new Error("Erreur lors de l'envoi du formulaire");
            }

            alertSuccess.classList.remove("hidden");
            formButton.classList.add("btn_disabled");
        } catch (error) {
            alertError.classList.remove("hidden");
            console.error(error);
        }
    });
});
