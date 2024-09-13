const token = localStorage.getItem("token");
console.log(token);
if(!token){
  window.location.href = '../adminlogin/index.html';
}

//deleteing existing club
const deleteClub =  async (index, club_id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/admin/delete/${club_id}`,
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
}

//deleting temp clubs
const deleteTempClub =  async (index, club_id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/temp-clubs/delete/${club_id}`,
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
}

//approving temp clubs
const approveTempClub =async (index, club_id)=>{
  try{
    const response =await fetch(
      `http://localhost:4000/api/temp-clubs/approve/${club_id}`,
      {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //console.log("Deleted Item:", titleText);
    // Optionally, update the UI to reflect the deletion
    // Re-fetch the todo list to update the UI
    // Reload the window manually
    window.location.reload();
  }catch(error){
    console.log("Error: ",error);
  }
}

// fetching existing clubs 
const fetchingClubs = async () => {
  try {
    const gettingURL = `http://localhost:4000/api/clubs`;
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
    console.log(data);
    total = data.length;
    const clubContainer = document.getElementById("clubContainer");
    data.forEach((club, index) => {
      console.log(club._id);
      const cardItem = document.createElement("div");
      cardItem.className = "card-item";// exising card club
      cardItem.id = `card-item-${index}`;

      const clubname = document.createElement("div");
      clubname.className = "club-name";
      clubname.id = `club-name-${index}`;
      clubname.textContent = club.clubname;

      const email = document.createElement("div");
      email.className = "club-email";
      email.id = `club-email-${index}`;
      email.textContent = club.email;

      const id=club._id;
      const deletebtn = document.createElement("button");
      deletebtn.className = "delete-btn";
      deletebtn.id = `delete-btn-${index}`;
      deletebtn.textContent = "Delete";
      deletebtn.addEventListener("click", () => {
        deleteClub(index, id);
      });

      cardItem.appendChild(clubname);
      cardItem.appendChild(email);
      cardItem.appendChild(deletebtn);

      clubContainer.appendChild(cardItem);
    });


  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user in the DOM
  }
};

//fetching the temporary clubs
const fetchingTempClubs = async () => {
  try {
    const gettingURL = `http://localhost:4000/api/temp-clubs`;
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
    console.log(data);
    total = data.length;
    const clubContainer = document.getElementById("tempClubContainer");//temporary club container
    data.forEach((club, index) => {
      console.log(club._id);
      const cardItem = document.createElement("div");
      cardItem.className = "temp-card-item";
      cardItem.id = `temp-card-item-${index}`;

      const clubname = document.createElement("div");
      clubname.className = "temp-club-name";
      clubname.id = `temp-club-name-${index}`;
      clubname.textContent = club.clubname;

      const email = document.createElement("div");
      email.className = "temp-club-email";
      email.id = `temp-club-email-${index}`;
      email.textContent = club.email;

      const id=club._id;

      const deletebtn = document.createElement("button");
      deletebtn.className = "temp-delete-btn";
      deletebtn.id = `temp-delete-btn-${index}`;
      deletebtn.textContent = "Delete";
      deletebtn.addEventListener("click", () => {
        deleteTempClub(index, id);
      });

      const approvebtn = document.createElement("button");
      approvebtn.className = "temp-approve-btn";
      approvebtn.id = `temp-approve-btn-${index}`;
      approvebtn.textContent = "Approve";
      approvebtn.addEventListener("click", () => {
        approveTempClub(index, id);
      });

      cardItem.appendChild(clubname);
      cardItem.appendChild(email);
      cardItem.appendChild(deletebtn);
      cardItem.appendChild(approvebtn);

      clubContainer.appendChild(cardItem);
    });


  } catch (error) {
    console.error("Error:", error);
    // Optionally, display the error message to the user in the DOM
  }
};
document.addEventListener("DOMContentLoaded", () => {
  fetchingClubs();
  fetchingTempClubs();
});


// document.addEventListener("DOMContentLoaded", fetchingClubs());
// document.addEventListener("DOMContentLoaded", fetchingTempClubs());

const getout=()=>{
  window.location.href = '../adminlogin/index.html';
}
document.getElementById("logOut").addEventListener('click',()=>{
  localStorage.clear();
  getout();
});