/*****************Reels********************/
const reels_container = document.querySelector(".reels");

if (reels_container) {
  const numVideos = 10; // Número total de vídeos que você tem

  for (let i = 1; i <= numVideos; i++) {
    const reel_div = document.createElement('div');
    reel_div.classList.add("reel");
    
    const videoHtml = `
      <div class="video">
        <video src="./video/${i}.mp4" ${i == 1 ? 'autoplay' : ''} loop></video>
        <div class="content">
          <div class="sound"></div>
          <div class="play">
            <img src="./images/play-button-arrowhead.png">
          </div>
        </div>
      </div>
    `;
    
    reel_div.innerHTML = videoHtml;
    if (i == 1) {
      reel_div.setAttribute("id", 'video_play');
    }
    
    reels_container.appendChild(reel_div);
  }
}

/**************************video**************************/
// play video onscroll
const videos = document.querySelectorAll("video");
const reels = document.querySelector(".reels");
window.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY + window.innerHeight;
  videos.forEach((video, index) => {
    reels.children[index].removeAttribute("id");
    const videoPosition = video.getBoundingClientRect().top + video.offsetHeight / 2;
    if (scrollPosition > videoPosition && videoPosition > 0 && videoPosition <= video.offsetHeight) {
      video.play();
      reels.children[index].setAttribute("id", "video_play");
    } else {
      video.pause();
    }
  });
});

// play && pause && mute video
let video_container = document.querySelectorAll(".video");
video_container.forEach(function(item) {
  let video = item.children[0];
  
  // if the user click on the video pause it 
  let button_play = item.children[1].children[1];
  item.addEventListener("click", function() {
    if (button_play.classList.contains("opac_1")) {
      video.play();
    } else {
      video.pause();
    }
    button_play.classList.toggle("opac_1");
  });

  // if the user click the mute btn make the video mute
  let mute_btn = item.children[1].children[0];
  let volum_up = mute_btn.children[0];
  let volum_mute = mute_btn.children[1];
  mute_btn.addEventListener("click", function(e) {
    e.stopPropagation();
    if (!video.muted) {
      video.muted = true;
      volum_up.classList.add("hide_img");
      volum_mute.classList.add("display");
    } else {
      video.muted = false;
      volum_up.classList.remove("hide_img");
      volum_mute.classList.remove("display");
    }
  });
});
