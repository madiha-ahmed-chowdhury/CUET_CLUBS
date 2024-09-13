
document.getElementById("signupForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData();
        const clubname = form.clubname.value;
        const email = form.email.value;
        const password = form.password.value;
        const about = form.about.value;
        const file = form.file.files[0];
        const phone_number = form.phone_number.value;
        const mailing_address = form.mailing_address.value;

        // Append collected data to FormData
        formData.append("clubname", clubname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("about", about);
        formData.append("file", file);
        formData.append("phone_number", phone_number);
        formData.append("mailing_address", mailing_address);

        console.log(formData); // Log formData content for debugging

        try {
            const response = await fetch("http://localhost:4000/api/temp-clubs/signup", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Something went wrong with the signup process.");
            }

            const data = await response.json();
            console.log("Signup successful:", data);
            alert("Signup successful!");

            // Optionally, you can redirect the user or clear the form
           
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    });

