// localStorage.clear();
const token = localStorage.getItem("token");
// console.log(token);
// if (!token) {
//   let addCard = document.getElementById("add");
//   addCard.classList.add("hidden");
// } else {
//   let addCard = document.getElementById("add");
//   addCard.classList.remove("hidden");
// }
let loggedIN = 0;

const club_id = localStorage.getItem("club_id");
//const club = "new club";

const clubname = localStorage.getItem("club_name");
document.getElementById("clubname").innerHTML = clubname;
//going to the specific workshop page
const goTo = async (index, item_id) => {
    localStorage.setItem("idOfWorkshop", item_id);
    window.location.href = '../Workshop 2.0/index.html';
};
//editing the item
const editItem = async (index, item_id) => {
    // Prompt the user to edit the event details
    const updatedItem = {
        title: prompt("Edit the name"),
        description: prompt("Edit the description"),
        // facebook: prompt("Edit the Facebook link"),
        // drive: prompt("Edit the Drive link"),
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
            `http://localhost:4000/api/workshops/${item_id}`,
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

//delete the item
const deleteItem = async (index, item_id) => {
    if (!token) {
        window.location.href = "login.html"; // Redirect to login page if token is not available
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:4000/api/workshops/${item_id}`,
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
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
        // Optionally, display the error message to the user
    }
    document.addEventListener("DOMContentLoaded", fetching());
};


function addMentorField() {
    const mentorListDiv = document.getElementById("mentor-list");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "mentorList";
    //input.placeholder = `Mentor ${mentorListDiv.children.length}`;
    mentorListDiv.appendChild(input);
    mentorListDiv.appendChild(document.createElement("br"));
}

function addVideoLinkField() {
    const videoLinkListDiv = document.getElementById("video-link-list");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "videoLinkList";
    //input.placeholder = `Video Link ${videoLinkListDiv.children.length}`;
    videoLinkListDiv.appendChild(input);
    videoLinkListDiv.appendChild(document.createElement("br"));
}

// funtion to fetch the events
const fetching = async () => {
    try {
        const gettingURL = `http://localhost:4000/api/workshops/club/${club_id}`;
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
            //adding the title
            const title = document.createElement("div");
            title.id = `title${index}`;
            title.className = "title";
            title.textContent = item.title;
            cardItem.appendChild(title);
            //adding the image
            if (item.file) {
                const cardImage = document.createElement("img");
                cardImage.src = `${item.file.replace(/\\/g, "/")}`; // using cardImage instead of img
                cardItem.appendChild(cardImage);
            }
            //adding the description
            const description = document.createElement("div");
            description.className = "description";
            description.textContent = item.description;
            description.id = `description${index}`;
            cardItem.appendChild(description);
            //going to the specific workshop page
            // Adding the go button
            
            const goBtn = document.createElement("button");
            goBtn.id = `go-btn-${index}`;
            goBtn.classList.add('go-btn');
            goBtn.textContent = "Go to Workshop";
            goBtn.addEventListener('click', () => {
                goTo(index, item._id);
            });
            cardItem.appendChild(goBtn);


            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            // if (!token) {
            //     editBtn.className = "edit-btn hidden";
            // } else {
            //     editBtn.className = "edit-btn";
            // }
            editBtn.textContent = "Edit";
            editBtn.id = `edit-btn-${index}`;
            editBtn.addEventListener("click", () => {
                editItem(index, item._id);
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            // if (!token) {
            //     deleteBtn.className = "delete-btn hidden";
            // } else {
            //     deleteBtn.className = "delete-btn";
            // }
            deleteBtn.textContent = "Delete";
            deleteBtn.id = `delete-btn-${index}`;
            deleteBtn.addEventListener("click", () => {
                deleteItem(index, item._id);
            });
            //console.log(item.file);
            
            // if (item.file) {
            //     cardItem.style.backgroundImage = `url('${item.file.replace(
            //         /\\/g,
            //         "/"
            //     )}')`;
            // }
            //if(item.image)cardItem.appendChild(image);

            //   cardItem.appendChild(facebookLink);
            //   cardItem.appendChild(driveLink);
            if (token) {
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

const workshopForm = document.getElementById("create-workshop-form");
if (!token) {
    workshopForm.classList.add("hidden");
}
if (!token) {
    workshopForm.classList.add("hidden");
}
workshopForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData();
    const title = form.title.value;
    const file = form.image.files[0];
    const mentors = [];
    const videoLinks = [];

    // Gather mentorList
    document.getElementsByName("mentorList").forEach((input) => {
        if (input.value) mentors.push(input.value);
    });

    // Gather videoLinkList
    document.getElementsByName("videoLinkList").forEach((input) => {
        if (input.value) videoLinks.push(input.value);
    });

    // Append collected data to FormData
    formData.append("title", title);
    formData.append("file", file);
    mentors.forEach((mentor, index) => {
        formData.append(`mentors[${index}]`, mentor);
    });
    videoLinks.forEach((link, index) => {
        formData.append(`videoLinks[${index}]`, link);
    });
    console.log(formData);
    try {
        const response = await fetch(
            `http://localhost:4000/api/workshops/club/${club_id}`,
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`, // Add your authorization token if needed
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Workshop created successfully:", data);

        // Optionally handle success (e.g., update UI)
    } catch (error) {
        console.error("Error:", error);
        // Handle error (e.g., display error message)
    }
    //window.location.reload();
});
