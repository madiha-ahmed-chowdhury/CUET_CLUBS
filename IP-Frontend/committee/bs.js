function editCard(cardId) {
    const card = document.getElementById(cardId);
    const newName = prompt("Enter the new name", card.querySelector(".name h3").innerText);
    const newPost = prompt("Enter the new post", card.querySelector(".post").innerText);
    const newFacebookLink = prompt("Enter the new Facebook link", card.querySelector(".fa-facebook").parentNode.href);
    const newInstagramLink = prompt("Enter the new Instagram link", card.querySelector(".fa-instagram").parentNode.href);
    const newLinkedinLink = prompt("Enter the new LinkedIn link", card.querySelector(".fa-linkedin").parentNode.href);

    if (newName && newPost && newFacebookLink && newInstagramLink && newLinkedinLink) {
        card.querySelector(".name h3").innerText = newName;
        card.querySelector(".post").innerText = newPost;
        card.querySelector(".fa-facebook").parentNode.href = newFacebookLink;
        card.querySelector(".fa-instagram").parentNode.href = newInstagramLink;
        card.querySelector(".fa-linkedin").parentNode.href = newLinkedinLink;
    } else {
        alert("All fields are required to edit the card.");
    }
};
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

        const dbuttons = document.querySelectorAll('.edit-button');
        
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


