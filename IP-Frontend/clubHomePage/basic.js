document.getElementById("emailEdit").addEventListener("click", () => {
    let newEmail = prompt("Enter the new email address");
    if (newEmail) {
        document.getElementById("email").innerText = newEmail;
    }
});

document.getElementById("numberEdit").addEventListener("click", () => {
    let newEmail = prompt("Enter the number");
    if (newEmail) {
        document.getElementById("number").innerText = newEmail;
    }
});

document.getElementById("addressEdit").addEventListener("click", () => {
    let newEmail = prompt("Enter the new address");
    if (newEmail) {
        document.getElementById("address").innerText = newEmail;
    }
});
let loggedIN=1;
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




