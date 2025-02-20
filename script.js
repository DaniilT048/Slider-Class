import {Slider} from "./Slider";
const images = [
    "img/slide-1.jpg",
    "img/slide-2.jpg",
    "img/slide-3.jpg",
];

const slider = new Slider();

//let intervalId = null;
//let currentSlide = 0;
const minDistanceForSwipe = 100;
let startTouchX = 0;
let endTouchX = 0;
let sliderTimer = 5;


const left = document.querySelector("#slider .left");
const right = document.querySelector("#slider .right");
const contentImg = document.querySelector("#slider .content");
generateImage()
generateDots()
const imgSlide = document.querySelector("#slider img");
const startSlider = document.querySelector("#slider .start-sliding");
const stopSlider = document.querySelector("#slider .stop-sliding");
const slideNavigation = document.querySelector("#slider .slider-navigation");

left.addEventListener("click", onLeft);
right.addEventListener("click", onRight);
slideNavigation.addEventListener("click", onDotClick)
startSlider.addEventListener('click', startAutoSlides);
stopSlider.addEventListener('click', stopAutoSlides);

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



// function generateImage() {
//     let imgHtml = '';
//     images.forEach((image) => {
//         imgHtml += `<img src=${image} alt="">`;
//     })
//     contentImg.innerHTML = imgHtml;
// }


function onLeft() {
    currentSlide--;
    if(currentSlide < 0){
        currentSlide = images.length -1;
    }
    contentImg.style.transform = `translate(-${currentSlide * imgSlide.offsetWidth}px)`;
    activeDot()
}


function onRight() {
    currentSlide++;
    if(currentSlide >= images.length){
        currentSlide = 0;
    }
    contentImg.style.transform = `translate(-${currentSlide * imgSlide.offsetWidth}px)`;
    activeDot()
}


function generateDots() {
    let resultHtml = '';
    images.forEach((image, index) => {
        const activeClass = index === 0 ? "active" : "";
        resultHtml += `<div class="dots ${activeClass}" data-dot="${index}"></div>`
    })
    document.querySelector('#slider .slider-navigation').innerHTML = resultHtml;
}


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