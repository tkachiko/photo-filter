const fullscreen = document.querySelector(".fullscreen");

const togglefullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  fullscreen.addEventListener("click", togglefullscreen);