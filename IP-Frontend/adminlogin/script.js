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
            const response = await fetch('http://localhost:4000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.accessToken); // Store the token
                console.log(data.accessToken);
                setTimeout(() => {
                    // Redirect to the homepage
                    window.location.href = '../adminn/index.html';
                }, 1000);  // Redirect to the homepage
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
