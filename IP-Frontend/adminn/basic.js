// Array to store club data
const clubData = [
    { name: "Chess Club", image: "images/club.jpg" },
    { name: "Photography Club", image: "images/club.jpg" },
    { name: "Coding Club", image: "./images/club.jpg" }
];

document.getElementById('clubForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const clubname = document.getElementById('clubname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const about = document.getElementById('about').value;
    const fileInput = document.getElementById('fileInput').files[0]; // Assuming you have an input element with id 'fileInput'

    const formData = new FormData();
    formData.append('clubname', clubname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('about', about);
    formData.append('file', fileInput); // Append the file to FormData

    try {
        const response = await fetch('http://localhost:4000/api/clubs', {
            method: 'POST',
            body: formData  // Send FormData instead of JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Club created successfully:', result);
    } catch (error) {
        console.error('Error creating club:', error);
    }
});


// Function to add club to DOM
function addClubToDOM(club) {
    const clubContainer = document.getElementById("clubContainer");
    const clubDiv = document.createElement("div");
    clubDiv.className = "club";

    const clubName = document.createElement("h3");
    clubName.innerText = club.name;
    clubDiv.appendChild(clubName);

    const clubImage = document.createElement("img");
    clubImage.src = club.image;
    clubDiv.appendChild(clubImage);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", () => {
        const newName = prompt("Enter the new name of the club", club.name);
        const newImage = prompt("Enter the URL of the new image for the club", club.image);

        if (newName && newImage) {
            club.name = newName;
            club.image = newImage;
            clubName.innerText = newName;
            clubImage.src = newImage;
        } else {
            alert("Both name and image URL are required to edit the club.");
        }
    });
    clubDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
        deleteClub(club);
        clubContainer.removeChild(clubDiv);
    });
    clubDiv.appendChild(deleteButton);

    clubContainer.appendChild(clubDiv);
}

// Function to delete club
function deleteClub(club) {
    const index = clubData.findIndex(c => c === club);
    if (index !== -1) {
        clubData.splice(index, 1);
    }
}

// Initialize existing clubs
document.addEventListener("DOMContentLoaded", () => {
    clubData.forEach(club => addClubToDOM(club));
});

document.getElementById("logOut").addEventListener('click',()=>{
    window.location.href = 'file:///C:/Users/User/Desktop/html-css/IP/homepage/index.html';
});

