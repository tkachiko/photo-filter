const input = document.querySelectorAll('.filters input');
const output = document.querySelectorAll('.filters output');
const fullscreen = document.querySelector('.fullscreen');
const buttons = document.querySelectorAll('.btn');
const btnReset = document.querySelector('.btn-reset');
const btnNext = document.querySelector('.btn-next');
const btnLoad = document.querySelector('.btn-load--input');
const btnSave = document.querySelector('.btn-save');
const imgTag = document.querySelector('img');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
];
const date = new Date();
let time = date.getHours();
let hours = '';
let i = 0;

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  if (this.matches(`input[type="range"]`)) {
    output.forEach(output => {
      if (output.previousElementSibling.name === this.name) output.value = this.value;
    });
  }
}

function resetFilters() {
  input.forEach(input => {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${input.name}`, '');
    input.value = input.defaultValue;
    input.nextElementSibling.value = input.value;
  });
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
  if (time >= 6 && time < 12) hours = 'morning/';
  if (time >= 12 && time < 18) hours = 'day/';
  if (time >= 18 && time <= 23) hours = 'evening/';
  if (time >= 0 && time < 6) hours = 'night/';

  const imageSrc = base + hours + images[index];
  viewBgImage(imageSrc);
  i++;
};

function loadPicture (e) {
  const file = btnLoad.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imgTag.src = reader.result;
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function drawImage() {
  const canvas = document.createElement('canvas');
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = imgTag.src;
  img.onload = function () {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    let blurSize = canvas.height / imgTag.height;
    const ctx = canvas.getContext('2d');
    output.forEach(el => {
      if (el.previousElementSibling.name === 'blur') ctx.filter = getComputedStyle(imgTag).filter.replace(`blur(${el.value}px)`, `blur(${Math.ceil(el.value * blurSize)}px)`);
    });
    ctx.drawImage(imgTag, 0, 0, canvas.width, canvas.height);
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link = 0;
  };
}

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
btnLoad.addEventListener('change', loadPicture);
btnSave.addEventListener('click', drawImage);

buttons.forEach(btn =>
  btn.addEventListener('click', function (e) {
    buttons.forEach(btn => {
      if (btn.classList.contains('btn-active')) {
        btn.classList.remove('btn-active');
      }
    });
    e.target.classList.add('btn-active');
  })
);

fullscreen.addEventListener('click', togglefullscreen);
