document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mailform");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
            "h-captcha-response": formData.get("h-captcha-response"),
        };

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
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                alertError.classList.remove("hidden");
                throw new Error("Erreur lors de l'envoi du formulaire");
            }

            alertSuccess.classList.remove("hidden");
        } catch (error) {
            alertError.classList.remove("hidden");
        }
    });

    const hideOnClick = function(event) {
        this.classList.add("hidden");
    }

    const alertElements = document.getElementsByClassName("alert-mailform");
    for (const element of alertElements) {
        element.addEventListener("click", hideOnClick);
    }
});
