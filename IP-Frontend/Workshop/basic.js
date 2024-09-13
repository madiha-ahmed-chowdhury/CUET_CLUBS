// Global array to store card data
const cardData = [
  { title: "Workshop 1", description: "The workshop title and description", imgSrc: "./images/download.jpeg" },
  { title: "Workshop 2", description: "The workshop title and description", imgSrc: "./images/download.jpeg" },
  { title: "Workshop 3", description: "The workshop title and description", imgSrc: "./images/download.jpeg" }
];


function addCardToDOM(card) {
  const cardContainer = document.getElementById("cardContainer");
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.style.width = "18rem";

  const cardImage = document.createElement("img");
  cardImage.className = "card-img-top";
  cardImage.src = card.imgSrc;
  cardImage.alt = card.title;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = card.title;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = card.description;

  const readMoreButton = document.createElement("a");
  readMoreButton.href = "#";
  readMoreButton.className = "btn btn-primary";
  readMoreButton.innerText = "READ MORE";

  const editButton = document.createElement("button");
  editButton.className = "btn btn-secondary hidden edit-button";
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
      const newTitle = prompt("Enter the new title of the card", card.title);
      const newDescription = prompt("Enter the new description of the card", card.description);
      const newImgSrc = prompt("Enter the new image URL of the card", card.imgSrc);

      if (newTitle && newDescription && newImgSrc) {
          card.title = newTitle;
          card.description = newDescription;
          card.imgSrc = newImgSrc;
          cardTitle.innerText = newTitle;
          cardText.innerText = newDescription;
          cardImage.src = newImgSrc;
      } else {
          alert("Title, description, and image URL are required to edit the card.");
      }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger hidden delete-button";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
      deleteCard(card);
      cardContainer.removeChild(cardDiv); // Remove the card container from DOM
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(readMoreButton);
  cardBody.appendChild(editButton);
  cardBody.appendChild(deleteButton);

  cardDiv.appendChild(cardImage);
  cardDiv.appendChild(cardBody);

  cardContainer.appendChild(cardDiv);
}

// Function to delete card from array
function deleteCard(card) {
  const index = cardData.findIndex(c => c === card);
  if (index !== -1) {
      cardData.splice(index, 1);
  }
}

// Function to add a new card
function addCard() {
  const newTitle = prompt("Enter the title of the new card");
  const newDescription = prompt("Enter the description of the new card");
  const newImgSrc = prompt("Enter the image URL of the new card");

  if (newTitle && newDescription && newImgSrc) {
      const newCard = { title: newTitle, description: newDescription, imgSrc: newImgSrc };
      cardData.push(newCard);
      addCardToDOM(newCard);
  } else {
      alert("Title, description, and image URL are required to add a new card.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize existing cards
  cardData.forEach(card => addCardToDOM(card));

  // Attach event listener to the "Add Card" button
  document.getElementById("addCard").addEventListener("click", addCard);
});


let loggedIN=0;
document.addEventListener("DOMContentLoaded", () => {
    if (loggedIN == 1) {
        //delete
        const dbuttons = document.querySelectorAll('.delete-button');
        
        // Iterate through each button and remove the 'Hidden' class
        dbuttons.forEach(dbutton => {
            dbutton.classList.remove('hidden');
        });


        // Select all buttons
        
        const ebuttons = document.querySelectorAll('.edit-button');
        
        // Iterate through each button and remove the 'Hidden' class
        ebuttons.forEach(ebutton => {
            ebutton.classList.remove('hidden');
        });
        console.log("HJHJ");
    }
    else {

        const dbuttons = document.querySelectorAll('.delete-button');
        
        // Iterate through each button and remove the 'Hidden' class
        dbuttons.forEach(dbutton => {
            dbutton.classList.add('hidden');
            console.log("hide");
        });
        const ebuttons = document.querySelectorAll('.edit-button');
        
        // Iterate through each button and remove the 'Hidden' class
        ebuttons.forEach(ebutton => {
            ebutton.classList.add('hidden');
            console.log("hide");
        });
        console.log("HJHJ hkh");
    }
    console.log("oio");
});

