javascript: (function () {
  var video = document.querySelector("video");
  if (video) {
    var speed = prompt("Enter playback speed:", "1.0");
    video.playbackRate = parseFloat(speed);
  } else {
    alert("No video found!");
  }
})();
