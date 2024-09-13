// Array to store card data
let cardData = [];

// Define the function to fetch events
async function fetchEvents() {
  try {
    // Make an API call to your backend to get events
    const response = await fetch(
      "http://localhost:4000/api/events/club/new club"
    ); // Adjust the URL if necessary
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const events = await response.json();

    // Store events in the array
    cardData = events;

    // Log the events array to the console
    console.log(cardData);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
fetchEvents();
// Function to create a card for each event
function createEventCards(cards) {
  const container = document.getElementById("cardContainer");

  cards.forEach((card) => {
    const cardElem = document.createElement("div");
    cardElem.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = card.name;

    const desc = document.createElement("p");
    desc.textContent = card.description;

    const driveLink = document.createElement("p");
    const driveAnchor = document.createElement("a");
    driveAnchor.href = card.drive;
    driveAnchor.textContent = "Drive Link";
    driveAnchor.target = "_blank";
    driveLink.appendChild(driveAnchor);

    const facebookLink = document.createElement("p");
    const facebookAnchor = document.createElement("a");
    facebookAnchor.href = card.facebook;
    facebookAnchor.textContent = "Facebook Link";
    facebookAnchor.target = "_blank";
    facebookLink.appendChild(facebookAnchor);

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      editCard(card);
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      deleteCard(card);
    });

    cardElem.appendChild(title);
    cardElem.appendChild(desc);
    cardElem.appendChild(driveLink);
    cardElem.appendChild(facebookLink);
    cardElem.appendChild(editButton);
    cardElem.appendChild(deleteButton);

    container.appendChild(cardElem);
  });
}

// Function to edit a card
function editCard(card) {
  // Show modal for editing card details
  console.log("Editing card:", card);
  // Replace with your logic to show a modal and populate with card data
}

// Function to delete a card
function deleteCard(card) {
  // Show confirmation dialog for deleting card
  const confirmDelete = confirm(
    `Are you sure you want to delete "${card.name}"?`
  );
  if (confirmDelete) {
    // Perform deletion logic (e.g., make API call to delete card)
    console.log("Deleting card:", card);
    // Replace with your logic to delete the card
  }
}

// Call the function to create card elements
createEventCards(cardData);

function addCard() {
  const newContent = prompt("Enter the content of the new card");
  const newLink = prompt("Enter the URL of the new card");

  if (newContent && newLink) {
    const newCard = { content: newContent, link: newLink };
    cardData.push(newCard);
    addCardToDOM(newCard);
  } else {
    alert("Both content and URL are required to add a new card.");
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//     cardData.forEach(card => addCardToDOM(card));

//     document.getElementById("addCard").addEventListener("click", addCard);

//     // Add hidden class to all buttons
//     const buttons = document.querySelectorAll(".card-csefest button");
//     buttons.forEach(button => button.classList.add("hidden"));
// });

let loggedIN = 1;
document.addEventListener("DOMContentLoaded", () => {
  if (loggedIN == 1) {
    //delete
    const dbuttons = document.querySelectorAll(".delete-button");

    // Iterate through each button and remove the 'Hidden' class
    dbuttons.forEach((dbutton) => {
      dbutton.classList.remove("hidden");
    });

    // Select all buttons

    const ebuttons = document.querySelectorAll(".edit-button");

    // Iterate through each button and remove the 'Hidden' class
    ebuttons.forEach((ebutton) => {
      ebutton.classList.remove("hidden");
    });
    console.log("HJHJ");
  } else {
    const dbuttons = document.querySelectorAll(".edit-button");

    // Iterate through each button and remove the 'Hidden' class
    dbuttons.forEach((dbutton) => {
      dbutton.classList.add("hidden");
      console.log("hide");
    });
    const ebuttons = document.querySelectorAll(".edit-button");

    // Iterate through each button and remove the 'Hidden' class
    ebuttons.forEach((ebutton) => {
      ebutton.classList.add("hidden");
      console.log("hide");
    });
    console.log("HJHJ hkh");
  }
  console.log("oio");
});
