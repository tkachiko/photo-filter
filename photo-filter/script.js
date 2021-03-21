const input = document.querySelectorAll('.filters input');
const output = document.querySelectorAll('.filters output');
const fullscreen = document.querySelector('.fullscreen');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
  
  if (this.matches(`input[type="range"]`)) {
    output.forEach(output => {
      if (output.previousElementSibling.name === this.name)
        output.value = this.value;
    });
  }
}

const togglefullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

input.forEach(input => input.addEventListener('input', handleUpdate));

fullscreen.addEventListener('click', togglefullscreen);
