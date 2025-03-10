document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mailform");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        };

        try {
            const response = await fetch("/api/sendmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du formulaire");
            }

            alert("Message envoyé avec succès!");
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de l'envoi du message.");
        }
    });
});