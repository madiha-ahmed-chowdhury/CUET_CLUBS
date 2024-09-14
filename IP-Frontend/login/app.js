document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const requestBody = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:4000/api/clubs/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.accessToken); // Store the token
                localStorage.setItem('club_id', data._id);
                console.log(data._id);
                console.log(data);
                //localStorage.setItem('id', data.id);
                //console.log(data.clubname);
                setTimeout(() => {
                    // Redirect to the homepage
                    window.location.href = '../clubHomePage/index.html';
                }, 10);  // Redirect to the homepage
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
