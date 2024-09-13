
// Make videoData a global array
const videoData = [
    { title: "Video 1", src: "https://drive.google.com/file/d/1lHZXGmL0RWur331M9z5fBOEt9kTaeU3n/preview" },
    { title: "Video 2", src: "https://drive.google.com/file/d/13-kBZvvlW-lC_gOnQR0GAV8CVDP1-vSY/preview" },
    { title: "Video 3", src: "https://drive.google.com/file/d/1lWGsmEd64nns-qgc7_dYNPcbTqzdFoHV/preview" },
];

function addVideoToDOM(video) {
    const videoContainer = document.getElementById("videoContainer");
    const videoDiv = document.createElement("div");
    videoDiv.className = "video-container";

    const title = document.createElement("h3");
    title.innerText = video.title;
    videoDiv.appendChild(title);

    // Create Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        const newTitle = prompt("Enter the new title of the video", video.title);
        const newSrc = prompt("Enter the new source URL of the video", video.src);

        if (newTitle && newSrc) {
            video.title = newTitle;
            video.src = newSrc;
            title.innerText = newTitle;
            const iframe = videoDiv.querySelector("iframe");
            iframe.src = newSrc;
        } else {
            alert("Both title and source URL are required to edit the video.");
        }
    });
    editButton.className = "edit-button"; // Add hidden class
    videoDiv.appendChild(editButton);

    // Create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteVideo(video);
        videoContainer.removeChild(videoDiv); // Remove the video container from DOM
    });
    deleteButton.className = "delete-button"; // Add hidden class
    videoDiv.appendChild(deleteButton);

    const br = document.createElement("br");
    videoDiv.appendChild(br);

    const iframe = document.createElement("iframe");
    iframe.src = video.src;
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    videoDiv.appendChild(iframe);

    videoContainer.appendChild(videoDiv);
}

// Function to delete video from array
function deleteVideo(video) {
    const index = videoData.findIndex(v => v === video);
    if (index !== -1) {
        videoData.splice(index, 1);
    }
}

// Global function to add video
function addVideo() {
    const newTitle = prompt("Enter the title of the new video");
    const newSrc = prompt("Enter the source URL of the new video");

    if (newTitle && newSrc) {
        const newVideo = { title: newTitle, src: newSrc };
        videoData.push(newVideo);
        addVideoToDOM(newVideo);
    } else {
        alert("Both title and source URL are required to add a new video.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize existing videos
    videoData.forEach(video => addVideoToDOM(video));

    // Attach event listener to the "Add Video" button
    document.getElementById("add").addEventListener("click", addVideo);

    // Add hidden class to all buttons
    
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


