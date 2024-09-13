const token = localStorage.getItem("token"); //access token from localStorage
//const clubname = localStorage.getItem("club"); // clubname from localStorage
const club_id = localStorage.getItem("club_id"); //club id from localStorage

if(!token){
  document.getElementById("header").classList.add("hidden");
}

const fetchClubInfo = async () => {

  if (!club_id) {
    alert("Club name is not specified.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/clubs/club/${club_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const club = await response.json();
    //console.log(data);
    // console.log(club.about);
    // document.getElementById("para").innerHTML = club.about;
    document.getElementById("clubemail").textContent = club.email;
    document.getElementById("address").textContent = club.mailing_address;
    document.getElementById("number").textContent = club.phone_number;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(club);

    // Update the DOM with the club info


  } catch (error) {
    console.error("Error fetching club info:", error);
    const clubInfoContainer = document.getElementById("clubInfoContainer");
    //clubInfoContainer.textContent = "Error fetching club information.";
  }
};

const modal = document.getElementById("editModal");
const btn = document.getElementById("editBtn");
if(!token){
  btn.classList.add("hidden");
}

const span = document.getElementsByClassName("close")[0];

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = event => { if (event.target == modal) modal.style.display = "none"; }

document.getElementById("editForm").onsubmit = async function (event) {
  event.preventDefault();

  const updatedClub = {
    clubname: document.getElementById("clubname").value,
    email: document.getElementById("email").value,
    about: document.getElementById("about").value,
    phone_number: document.getElementById("phone_number").value,
    mailing_address: document.getElementById("mailing_address").value
  };

  // const club_id = "your_club_id_here";
  // const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:4000/api/clubs/edit/${club_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedClub),
    });

    if (response.ok) window.location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
};


// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchClubInfo);

