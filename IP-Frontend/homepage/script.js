let currentSlide = 0;
let totalSlides;// = 3;
// window.addEventListener('load', nextSlide);
// document.getElementById('nextBtn').addEventListener('click', nextSlide);
// document.getElementById('prevBtn').addEventListener('click', prevSlide);
const toggleBtn = document.querySelector(".toggle-btn");
const toggleBtn2 = document.querySelector(".toggle-btn2");
const drawer = document.querySelector(".drawer");
let toggle = 0;

toggleBtn.addEventListener('click', openDrawer);

toggleBtn2.addEventListener('click', closeDrawer);

// function nextSlide() {
//   const current = document.getElementById(`slide${currentSlide}`);
//   current.classList.add('slide-out-to-left');

//   currentSlide++;
//   if (currentSlide > totalSlides) {
//     currentSlide = 1;
//   }

//   const next = document.getElementById(`slide${currentSlide}`);
//   next.classList.add('visible-coming-from-right');
//   next.classList.remove('slide-out-to-left');
//   next.classList.remove('slide-out-to-right');

//   setTimeout(() => {
//     current.classList.remove('visible-coming-from-right', 'visible-coming-from-left', 'slide-out-to-left');
//   }, 500); // Wait for the animation to finish (0.5s)
// }
// function prevSlide(){
//     const current = document.getElementById(`slide${currentSlide}`);
//     current.classList.add('slide-in');
//     currentSlide--;
//     if(currentSlide<=0){
//         currentSlide = 3;
//     }
//     const prev=document.getElementById(`slide${currentSlide}`);
//     prev.classList.add('visible');
//     prev.classList.remove('slide-in');

//     setTimeout(() => {
//         current.classList.remove('visible', 'slide-in');
//     }, 500); // Wait for the animation to finish (0.5s)
// }

// function prevSlide() {
//   const current = document.getElementById(`slide${currentSlide}`);
//   current.classList.add('slide-out-to-right');

//   currentSlide--;
//   if (currentSlide < 1) {
//     currentSlide = totalSlides;
//   }

//   const prev = document.getElementById(`slide${currentSlide}`);
//   prev.classList.add('visible-coming-from-left');
//   prev.classList.remove('slide-out-to-right');
//   prev.classList.remove('slide-out-to-left');

//   setTimeout(() => {
//     current.classList.remove('visible-coming-from-left', 'visible-coming-from-right', 'slide-out-to-right');
//   }, 500); // Wait for the animation to finish (0.5s)
// }

// document.addEventListener("DOMContentLoaded", function() {
//   const toggleBtn = document.querySelector(".toggle-btn");
//   const drawer = document.querySelector(".drawer");

//   toggleBtn.addEventListener("click", function() {
//     drawer.classList.toggle("open");
//   });
// });
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('scroll') === 'down') {
    const element = document.querySelector('.down');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
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

const fetching = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/clubs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json();
    console.log(data);
    const slides_container = document.getElementById('slides-container');
    data.forEach((item, index) => {
      console.log(item);
      const slides = document.createElement('div');
      slides.className = "slides";
      slides.id = `slide${index}`;

      const clubs = document.createElement('div');
      clubs.className = "clubs";

      const image = document.createElement("img");
      image.className = "image";
      image.src = `${item.file.replace(
        /\\/g,
        "/"
      )}`;


      const text = document.createElement("div");
      text.className = "text";


      const h2 = document.createElement('h2');
      h2.textContent = item.clubname;

      const p = document.createElement("p");
      p.textContent = item.about;


      text.appendChild(h2);
      text.appendChild(p);
      try{
        clubs.appendChild(image);
        clubs.appendChild(text);
        slides.appendChild(clubs);
        slides_container.appendChild(slides);
      }catch(error){
        console.log(error);
      }
      console.log(slides);
    })

  } catch (error) {
    console.log(error);
  }
};
// document.getElementById("slide1").addEventListener("click", () => {
//   window.location.href = 'file:///C:/Users/User/Desktop/html-css/IP/clubHomePage/index.html';
// });
// document.getElementById("signin").addEventListener("click", () => {
//   window.location.href = 'file:///C:/Users/User/Desktop/html-css/IP/login/index.html';
// });

document.addEventListener("DOMContentLoaded", fetching);

