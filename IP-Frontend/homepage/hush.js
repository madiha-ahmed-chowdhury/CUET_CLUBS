localStorage.clear();
let currentSlideIndex = 0;
let slides = [];


const fetchForDrawer = async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/clubs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        // console.log("why");
        const clubList = document.getElementById("clubList");

        data.forEach((item, index) => {
            const h4 = document.createElement("h4");
            h4.innerHTML = item.clubname;
            h4.addEventListener("click", () => {
                localStorage.setItem("club_id", item._id);
                localStorage.setItem("club_name", item.clubname);
                window.location.href = '../clubHomePage/index.html';
            });
            clubList.appendChild(h4);
        })
    } catch (error) {
        console.log(error);
    }
}
function openDrawer() {
    drawer.classList.add('visible-coming-from-right');
    drawer.classList.remove('hidden');
    //drawer.classList.remove('slide-out-to-left');

}

function closeDrawer() {
    drawer.classList.remove('visible-coming-from-right');
    drawer.classList.add('hidden');
    // drawer.classList.add('slide-out-to-right');
    //drawer.classList.add('hidden');

}

const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtn2 = document.querySelector(".toggle-btn2");
const drawer = document.querySelector(".drawer");
let toggle = 0;

toggleBtn.addEventListener('click', openDrawer);

toggleBtn2.addEventListener('click', closeDrawer);

const showSlide = (index) => {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.style.display = "none"; // Hide all slides
        slide.classList.remove("visible-coming-from-left", "visible-coming-from-right"); // Remove any existing animation classes
    });

    // Show the selected slide with animation
    slides[index].style.display = "flex";
    slides[index].classList.add(index > currentSlideIndex ? "visible-coming-from-right" : "visible-coming-from-left");
    currentSlideIndex = index;
};

const fetching = async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/clubs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);

        const slides_container = document.getElementById('slides-container');
        slides_container.innerHTML = ''; // Clear any existing slides

        data.forEach((item, index) => {
            console.log(item);
            const slide = document.createElement('div');
            slide.className = "slides";
            slide.id = `slide${index}`;

            const clubs = document.createElement('div');
            clubs.className = "clubs";

            const image = document.createElement("img");
            image.className = "image";
            image.src = `${item.file.replace(/\\/g, "/")}`;

            const text = document.createElement("div");
            text.className = "text";

            const h2 = document.createElement('h2');
            h2.textContent = item.clubname;

            const p = document.createElement("p");
            p.textContent = item.about;

            text.appendChild(h2);
            text.appendChild(p);
            clubs.appendChild(image);
            clubs.appendChild(text);
            slide.appendChild(clubs);
            slide.addEventListener("click", () => {
                localStorage.setItem("club_id", item._id);
                localStorage.setItem("club_name", item.clubname);
                window.location.href = '../clubHomePage/index.html';
            });
            slides_container.appendChild(slide);
        });

        slides = Array.from(document.getElementsByClassName('slides')); // Update the slides array
        showSlide(currentSlideIndex); // Show the first slide

    } catch (error) {
        console.log(error);
    }
};

// Function to go to the next slide
const nextSlide = () => {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0; // Wrap around to the first slide
    }
    showSlide(nextIndex);
};

// Function to go to the previous slide
const prevSlide = () => {
    let prevIndex = currentSlideIndex - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1; // Wrap around to the last slide
    }
    showSlide(prevIndex);
};

// Attach event listeners to the next and previous buttons
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

document.getElementById("signin").addEventListener("click", () => { 
    window.location.href='../login/index.html';
});

// Fetch the slides on page load
fetching();
fetchForDrawer();
