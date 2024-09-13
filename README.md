## CUET CLUBS
CUET CLUBS is a web platform that combines the various club websites under the organization CUET (Chittagong University of Engineering & Technology). Built using Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript, the platform allows CUET clubs to create, manage, and display their own websites in a unified manner.

Features
Club Admin Registration: Club admins can sign up to create and manage their club's website.

Club Admin Login: Once signed up, club admins can log in to update and edit their club information, including events, workshops, and more.

Public Access: Regular users can view the website without needing to log in. All club information is available for public viewing.

Website Admin: A dedicated website admin has the authority to add new clubs or delete existing clubs from the platform.

Technology Stack

Backend: Node.js, Express.js

Database: MongoDB

Frontend: HTML, CSS, JavaScript

Installation

Clone the repository:


bash
Copy code
git clone https://github.com/yourusername/cuet-clubs.git
Install dependencies:

bash
Copy code
cd cuet-clubs
npm install
Create a .env file in the root directory and add your environment variables:

bash
Copy code
PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Run the app:

bash
Copy code
npm start
Access the platform at http://localhost:3000.

Usage
Club Admins:

Sign up as a club admin to create a new club website.
Log in to your account to manage and update your club's information.
Users:

View all club websites without the need to log in.
Website Admin:

Add or delete clubs as needed.
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License.
