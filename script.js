import {Slider} from "./Slider.js";
const images = [
    "img/slide-1.jpg",
    "img/slide-2.jpg",
    "img/slide-3.jpg",
];

const slider = new Slider(images, 2, false);


const minDistanceForSwipe = 100;
let startTouchX = 0;
let endTouchX = 0;









// contentImg.addEventListener('touchstart', (event) => {
//     startTouchX = event.touches[0].clientX;
// }, {passive: false});
//
// contentImg.addEventListener('touchend', (event) => {
//     endTouchX = event.changedTouches[0].clientX;
//     slideSwipe();
// });
//
// contentImg.addEventListener('mousedown', (event) => {
//     startTouchX = event.clientX;
// })
//
// contentImg.addEventListener('mouseup', (event) => {
//     endTouchX = event.clientX;
//     slideSwipe();
// })
//
// document.querySelectorAll('img').forEach(img => {
//     img.ondragstart = () => false;    // block dragging of img
// })
//
//
// window.addEventListener('keydown', (event) => {
//     switch (event.key) {
//         case 'ArrowRight': onRight(); break;
//         case 'ArrowLeft': onLeft();
//     }
// })
//
//
//
//
//
//
//
//
//
// function slideSwipe(){
//     if (endTouchX - startTouchX >= minDistanceForSwipe ) {
//         onLeft()
//     }else if (startTouchX - endTouchX >= minDistanceForSwipe) {
//         onRight()
//     }
// }