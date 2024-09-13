// localStorage.clear();
const token = localStorage.getItem("token");
//console.log(token);
// if (!token) {
//   let addCard = document.getElementById("add");
//   addCard.classList.add("hidden");
// } else {
//   let addCard = document.getElementById("add");
//   addCard.classList.remove("hidden");
// }
let loggedIN = 0;

const club = localStorage.getItem("club_id");
//const club = "new club";
console.log(club);
const clubname = localStorage.getItem("club_name");
document.getElementById("clubname").innerHTML = clubname;
// Array to store card data
let cardData = [];

const editItem = async (index, item_id) => {
  // Prompt the user to edit the event details
  const updatedItem = {
    name: prompt("Edit the name"),
    description: prompt("Edit the description"),
    facebook: prompt("Edit the Facebook link"),
    drive: prompt("Edit the Drive link"),
  };

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page if token is not available
    window.location.href = "login.html";
    return;
  }

  try {
    // Send a PUT request to update the event
    const response = await fetch(
      `http://localhost:4000/api/events/${item_id}`,
      {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedItem), // Convert updatedItem to JSON string
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON data
    const data = await response.json();
    console.log("Updated Item:", data);
    // Optionally, update the UI or notify the user of the successful update
  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user
  }

  // Reload the window manually to reflect updates
  window.location.reload();
};

const deleteItem = async (index, item_id) => {
  if (!token) {
    window.location.href = "login.html"; // Redirect to login page if token is not available
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/events/${item_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //console.log("Deleted Item:", titleText);
    // Optionally, update the UI to reflect the deletion
    // Re-fetch the todo list to update the UI
    // Reload the window manually

  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user
  }
  window.location.reload();
  document.addEventListener("DOMContentLoaded", fetching());
};

// funtion to fetch the events
const fetching = async () => {
  try {
    const gettingURL = `http://localhost:4000/api/events/club_id/${club}`;
    const response = await fetch(gettingURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Todo List:", data);
    total = data.length;

    //Update the DOM with the items
    const cardContainer = document.getElementById("cardContainer");
    data.forEach((item, index) => {
      const cardItem = document.createElement("div");
      cardItem.className = "card-item";
      cardItem.id = `card-item-${index}`;
      const title = document.createElement("div");
      title.id = `title${index}`;
      title.className = "title";
      title.textContent = item.name;
      const description = document.createElement("div");
      description.className = "description";
      description.textContent = item.description;
      description.id = `description${index}`;
      const facebookLink = document.createElement("a"); // Assuming you want to create a link element
      facebookLink.className = "facebook-link";
      facebookLink.href = item.facebook; // Assuming item is your object containing the facebook link
      facebookLink.textContent = "Visit Facebook"; // Optional: Set link text
      const driveLink = document.createElement("a"); // Assuming you want to create a link element
      driveLink.className = "drive-link";
      driveLink.href = item.drive; // Assuming item is your object containing the facebook link
      driveLink.textContent = "Visit Drive"; // Optional: Set link text

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";

      editBtn.textContent = "Edit";
      editBtn.id = `edit-btn-${index}`;
      editBtn.addEventListener("click", () => {
        editItem(index, item._id);
      });
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";

      deleteBtn.textContent = "Delete";
      deleteBtn.id = `delete-btn-${index}`;
      deleteBtn.addEventListener("click", () => {
        deleteItem(index, item._id);
      });

      cardItem.appendChild(title);
      if (item.image) {
        // const image = document.createElement("img");
        // console.log(item.image);
        // image.src = item.image; // Set image source
        // image.alt = item.name; // Optional: Set alt attribute for accessibility
        // cardItem.appendChild(image);
        cardItem.style.backgroundImage = `url('${item.image.replace(
          /\\/g,
          "/"
        )}')`;
      }
      //if(item.image)cardItem.appendChild(image);
      cardItem.appendChild(description);
      cardItem.appendChild(facebookLink);
      cardItem.appendChild(driveLink);
      if(token)
      {
        cardItem.appendChild(editBtn);
        cardItem.appendChild(deleteBtn);
      }
      cardContainer.appendChild(cardItem);
    });
  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user in the DOM
  }
};
document.addEventListener("DOMContentLoaded", fetching());

const addItem = document.getElementById("add"); // Assuming you have an element with id "add" for triggering the form display
const formContainer = document.getElementById("formContainer"); // Container where the form will be appended

// Event listener for the add button to display the form
// addItem.addEventListener("click", () => {
//   // Create the form elements
//   const form = document.createElement("form");
//   form.setAttribute("id", "uploadForm");
//   form.classList.add("hidden"); // Initially hide the form, you can define a "hidden" class for this in your CSS if needed

//   // Create input fields for name, description, facebook, drive
//   const nameInput = createInputElement("text", "name", "Enter name");
//   const descriptionInput = createInputElement(
//     "textarea",
//     "description",
//     "Enter description"
//   );
//   const facebookInput = createInputElement(
//     "text",
//     "facebook",
//     "Enter Facebook link"
//   );
//   const driveInput = createInputElement("text", "drive", "Enter Drive link");

//   const fileInput = document.createElement("input");
//   fileInput.type = "file";
//   fileInput.name = "file"; // Name attribute for file upload
//   fileInput.accept = "image/*"; // Accept only image files

//   const submitButton = document.createElement("button");
//   submitButton.type = "submit";
//   submitButton.textContent = "Create Event";

//   // Form submission event handler
//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("name", nameInput.value);
//     formData.append("description", descriptionInput.value);
//     formData.append("facebook", facebookInput.value);
//     formData.append("drive", driveInput.value);
//     formData.append("file", fileInput.files[0]); // Append the selected file

//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/events/club/${club}`, // Adjust the endpoint according to your backend setup
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Event created successfully:", data);
//       // Optionally handle success (e.g., update UI)
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error (e.g., display error message)
//     }
//   });

//   // Helper function to create input elements
//   function createInputElement(type, name, placeholder) {
//     const inputElement = document.createElement(type);
//     inputElement.name = name;
//     inputElement.placeholder = placeholder;
//     return inputElement;
//   }

//   // Append input fields and submit button to the form
//   form.appendChild(nameInput);
//   form.appendChild(descriptionInput);
//   form.appendChild(facebookInput);
//   form.appendChild(driveInput);
//   form.appendChild(fileInput);
//   form.appendChild(submitButton);

//   // Append the form to the container and display it
//   formContainer.innerHTML = ""; // Clear existing content
//   formContainer.appendChild(form);
//   form.classList.remove("hidden"); // Display the form
// });
const form = document.getElementById("create-event-form");
if(!token){
  form.classList.add("hidden");
}
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const facebook = document.getElementById("facebook").value;
  const drive = document.getElementById("drive").value;
  const file = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("facebook", facebook);
  formData.append("drive", drive);
  formData.append("file", file);
  //formData.append("file", file);

  try {
    const response = await fetch(
      `http://localhost:4000/api/events/${club}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //console.log("Deleted Item:", titleText);
    // Optionally, update the UI to reflect the deletion
    // Re-fetch the todo list to update the UI
    // Reload the window manually
    //window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user
  }
  window.location.reload();
}
