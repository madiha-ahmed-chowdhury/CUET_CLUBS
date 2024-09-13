const workshopId = localStorage.getItem('idOfWorkshop');
const clubname=localStorage.getItem("club_name");
document.getElementById("clubname").innerHTML = clubname;
const token = localStorage.getItem('token');

// Function to edit a video link
async function editVideoLinkByIndex(workshopId, index, videoLink) {
    // Assuming the token is stored in localStorage
    const newVideoLink = prompt("Enter the new video link", videoLink);
    if (!token) {
        alert('User is not authenticated');
        return;
    }

    const url = `http://localhost:4000/api/workshops/${workshopId}/index/${index}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adding the token to the request header
            },
            body: JSON.stringify({ newVideoLink }) // Sending the new video link in the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Updated Workshop:', data);

        // Optionally, update the DOM or notify the user of the successful update
        alert('Video link updated successfully');
        window.location.reload();
    } catch (error) {
        console.error('Error updating video link:', error);
        alert('Failed to update video link');
    }

}

// Function to delete a video link
const deleteVideoLink = async (workshopId, index) => {
    try {
        const response = await fetch(`http://localhost:4000/api/workshops/${workshopId}/index/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const updatedWorkshop = await response.json();
        console.log('Updated Workshop:', updatedWorkshop);

        // Update the DOM to reflect the deletion
        document.getElementById(`video-container-${index}`).remove();
        window.location.reload();
    } catch (error) {
        console.error('Error deleting video link:', error);
    }


};

// Function to upload a single video link
const uploadVideoLink = async (workshopId) => {
    const videoLink = prompt("Upload the link of the new video");
    try {
        const response = await fetch(`http://localhost:4000/api/workshops/${workshopId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
            },
            body: JSON.stringify({ videoLink })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const updatedWorkshop = await response.json();
        console.log('Updated Workshop:', updatedWorkshop);

        window.location.reload();
        // Optionally, update the DOM to reflect the new video link
        //addVideoToDOM(videoLink, updatedWorkshop.videoLinks.length - 1);
    } catch (error) {
        console.error('Error uploading video link:', error);
    }
    // Create a new DOMContentLoaded event



};

async function fetching() {
    //const workshopId = localStorage.getItem("idOfWorkshop");
    try {
        const response = await fetch(`http://localhost:4000/api/workshops/${workshopId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        //document.getElementById('result').textContent = JSON.stringify(data, null, 2);

        // Assuming data contains a `videoLinkList` array
        const videoLinks = data.videoLinks;
        console.log(videoLinks);
        videoLinks.forEach((videoLink, index) => {
            console.log(videoLink);
            const videoContainer = document.getElementById("videoContainer");
            const videoDiv = document.createElement("div");
            videoDiv.className = "video-container";

            const title = document.createElement("h3");
            title.innerText = `Video ${index + 1}`; // Assuming videoLink has a title property
            videoDiv.appendChild(title);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            // editButton.addEventListener("click", () => {
            //     const newTitle = prompt("Enter the new title of the video", videoLink.title);
            //     const newSrc = prompt("Enter the new source URL of the video", videoLink.src);

            //     if (newTitle && newSrc) {
            //         videoLink.title = newTitle;
            //         videoLink.src = newSrc;
            //         title.innerText = newTitle;
            //         const iframe = videoDiv.querySelector("iframe");
            //         iframe.src = newSrc;
            //     } else {
            //         alert("Both title and source URL are required to edit the video.");
            //     }
            // });

            editButton.addEventListener('click', () => {
                editVideoLinkByIndex(workshopId, index, videoLink);
            });
            if (token) { videoDiv.appendChild(editButton); }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            // deleteButton.addEventListener("click", () => {
            //     deleteVideo(videoLink);
            //     videoContainer.removeChild(videoDiv); // Remove the video container from DOM
            // });
            deleteButton.addEventListener('click', () => {
                deleteVideoLink(workshopId, index);
            })
            if(token)
            { videoDiv.appendChild(deleteButton); }

            const br = document.createElement("br");
            videoDiv.appendChild(br);

            const iframe = document.createElement("iframe");
            iframe.src = videoLink;
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;
            videoDiv.appendChild(iframe);

            videoContainer.appendChild(videoDiv);
        });

    } catch (error) {
        console.error('Error fetching workshop:', error);
        //document.getElementById('result').textContent = error.message;
    }
};


document.addEventListener("DOMContentLoaded", fetching());


const add=document.getElementById("add");
if(!token){
    add.classList.add("hidden");
}
add.addEventListener('click', () => {
    uploadVideoLink(workshopId);
});