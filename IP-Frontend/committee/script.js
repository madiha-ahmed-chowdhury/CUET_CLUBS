const token = localStorage.getItem('token');
console.log(token);
const club_id = localStorage.getItem('club_id');
const clubname=localStorage.getItem("club_name");
document.getElementById("clubname").innerHTML = clubname;
console.log(club_id);
if (!token) {
  document.getElementById("new-member").classList.add("hidden");
}


  window.addEventListener('scroll', function() {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

const editItem = async (index, item_id, data) => {
  // Prompt the user to edit the event details
  const updatedItem = {
    name: prompt("Edit the name", data[index].name),
    email: prompt("Edit the email link", data[index].email),
    position: prompt("Edit the position", data[index].position),
    facebook: prompt("Edit the Facebook link", data[index].facebook),
    instgram: prompt("Edit the instagram link", data[index].instagram),
    linkedin: prompt("Edit the linkedin link", data[index].linkedin)
  };

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page if token is not available
    window.location.href = "../login/index.html";
    return;
  }

  try {
    // Send a PUT request to update the event
    const response = await fetch(
      `http://localhost:4000/api/committee/${item_id}`,
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
      `http://localhost:4000/api/committee/${item_id}`,
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

const fetching = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/committee/club/${club_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const container = document.getElementById("main1");
    console.log(data);
    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";//settting the class name
      card.id = `card-${index}`;//setting the id with index

      const carding= document.createElement("div");
      carding.className = "carding";
      carding.classList.add("one_in_a_row");
      const name1 = document.createElement("div");
      name1.className = "name1";
      name1.textContent = item.name;

      const post = document.createElement("div");
      post.className = "post";
      post.textContent = item.position;

      
      const image = document.createElement("img");
      image.className = "image";
      image.src = `${item.file.replace(
        /\\/g,
        "/"
      )}`;

      const facebook = document.createElement("a");
      facebook.href = item.facebook;
      facebook.className = "fa-brands fa-facebook";
      facebook.classList.add("name-icon");

      const instagram = document.createElement("a");
      instagram.href = item.instagram;
      instagram.className = "fa-brands fa-instagram";
      instagram.classList.add("name-icon");

      const linkedin = document.createElement("a");
      linkedin.href = item.linkedin;
      linkedin.className = "fa-brands fa-linkedin";
      linkedin.classList.add("name-icon");

      const editBtn = document.createElement("button");
      editBtn.className = "edit-button";
      editBtn.classList.add("btn");
      editBtn.textContent='Edit';
      // if (!token) {
      //   editBtn.classList.add("hidden");
      // }
      editBtn.addEventListener("click", () => {
        editItem(index, item._id, data);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-button";
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn")
      // if (!token) {
      //   deleteBtn.classList.add("hidden");
      // }
      deleteBtn.addEventListener("click", () => {
        deleteItem(index, item._id);
      });

      //const lineBreak = document.createElement('br');

      const logos= document.createElement("div");
      logos.className = "three_in_a_row";
      carding.appendChild(name1);
      carding.appendChild(post);
      //carding.innerHTML += '</br>';
      logos.appendChild(linkedin);
      logos.appendChild(facebook);
      logos.appendChild(instagram);

      carding.appendChild(logos);

      card.appendChild(carding);

      card.appendChild(image);
      const buttons=document.createElement("div");
      buttons.className = "one_in_a_row";

      buttons.appendChild(editBtn);
      buttons.appendChild(deleteBtn);
      if(token){
        card.appendChild(buttons);
      }

      container.appendChild(card);
      //console.log(card);
    });
  } catch (error) {

  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("new_name").value;
  const position = document.getElementById("new_position").value;
  const facebook = document.getElementById("new_facebook").value;
  const instagram = document.getElementById("new_instagram").value;
  const file = document.getElementById("new_file").files[0];
  const email = document.getElementById("new_email").value;
  const linkedin = document.getElementById("new_linkedin").value;
  // const club_id=club_id;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("position", position);
  formData.append("facebook", facebook);
  formData.append("instagram", instagram);
  //formData.append("instagram", drive);
  formData.append("file", file);
  formData.append("linkedin", linkedin);
  formData.append("email", email);
  //formData.append("club_id",club_id);
  //formData.append("file", file);
  console.log(formData);
  console.log(formData.email);

  try {
    const response = await fetch(`http://localhost:4000/api/committee/club/${club_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is not null or undefined
      },
      body: formData, // Ensure formData is properly populated
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Optionally, update the UI to reflect the submission
    // For example, you might want to reset the form or show a success message
    console.log("Form submitted successfully");
    windows.location.reload();

    // Reload the window manually (uncomment if needed)
    // window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user
  }


}

document.addEventListener("DOMContentLoaded", fetching());

const form = document.getElementById("new-member");
form.addEventListener("submit", handleSubmit);