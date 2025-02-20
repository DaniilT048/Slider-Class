import {Slider} from "./Slider.js";
const images = [
    "img/slide-1.jpg",
    "img/slide-2.jpg",
    "img/slide-3.jpg",
];

const slider = new Slider(images);


let intervalId = null;
const minDistanceForSwipe = 100;
let startTouchX = 0;
let endTouchX = 0;
let sliderTimer = 5;









contentImg.addEventListener('touchstart', (event) => {
    startTouchX = event.touches[0].clientX;
}, {passive: false});

contentImg.addEventListener('touchend', (event) => {
    endTouchX = event.changedTouches[0].clientX;
    slideSwipe();
});

contentImg.addEventListener('mousedown', (event) => {
    startTouchX = event.clientX;
})

contentImg.addEventListener('mouseup', (event) => {
    endTouchX = event.clientX;
    slideSwipe();
})

document.querySelectorAll('img').forEach(img => {
    img.ondragstart = () => false;    // block dragging of img
})


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight': onRight(); break;
        case 'ArrowLeft': onLeft();
    }
})




function onDotClick(event) {
    if (!event.target.classList.contains("dots")) {
        return;
    }
  currentSlide = event.target.dataset.dot;
  contentImg.style.transform = `translate(-${currentSlide * imgSlide.offsetWidth}px)`;
    activeDot()
}


function activeDot() {
    const activeClass = document.querySelector("#slider .active");
    if (activeClass) {
        activeClass.classList.remove("active");
    }
    document.querySelector(`#slider div[data-dot='${currentSlide}']`)
    .classList.add("active");
}


function startAutoSlides () {
    if (!intervalId) {
        intervalId = setInterval(() => {
            onRight();
        }, sliderTimer * 1000)
    }
}


function stopAutoSlides () {
    clearInterval(intervalId)
    intervalId = null;
}


function slideSwipe(){
    if (endTouchX - startTouchX >= minDistanceForSwipe ) {
        onLeft()
    }else if (startTouchX - endTouchX >= minDistanceForSwipe) {
        onRight()
    }
}