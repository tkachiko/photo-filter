const input = document.querySelectorAll('.filters input');
const output = document.querySelectorAll('.filters output');
const fullscreen = document.querySelector('.fullscreen');
const buttons = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.querySelector('.btn-load');
const btnSave = document.querySelector('.btn-save');
const imgTag = document.querySelector('img');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg','02.jpg','03.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg',];
let i = 0;
const date = new Date();
let time = date.getHours();
let hours = '';

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

function resetFilters() {
    input.forEach(input => {
        const suffix = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${input.name}`, '')
        input.value = input.defaultValue
        input.nextElementSibling.value = input.value
    })
}

function viewBgImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    imgTag.src = `${src}`;
  };
}

const showNextPicture = () => {
  const index = i % images.length;
  switch (time) {
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      hours = 'morning/';
      break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      hours = 'day/';
      break;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
      hours = 'evening/';
      break;
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      hours = 'night/';
      break;
  }
  const imageSrc = base + hours + images[index];
  viewBgImage(imageSrc);
  i++;
};

const togglefullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

input.forEach(input => input.addEventListener('input', handleUpdate));
btnReset.addEventListener('click', resetFilters);
btnNext.addEventListener('click', showNextPicture);
btnNext.addEventListener('click', resetFilters);

buttons.forEach(btn =>
  btn.addEventListener('click', function (event) {
    buttons.forEach(btn => {
      if (btn.classList.contains('btn-active')) {
        btn.classList.remove('btn-active');
      }
    });
    event.target.classList.add('btn-active');
  })
);

fullscreen.addEventListener('click', togglefullscreen);
