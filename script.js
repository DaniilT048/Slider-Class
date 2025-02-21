import {Slider} from "./Slider.js";
const images = [
    "img/slide-1.jpg",
    "img/slide-2.jpg",
    "img/slide-3.jpg",
];
const sliderFirst = new Slider('#slider', images, 2, false);
const slider = new Slider('#slider-white', images, 2, true);
