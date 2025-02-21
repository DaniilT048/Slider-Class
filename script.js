import {Slider} from "./Slider.js";
const images = [
    "img/slide-1.jpg",
    "img/slide-2.jpg",
    "img/slide-3.jpg",
];

const imagesWhite = [
    "img/sliderTwo (1).jpg",
    "img/sliderTwo (2).jpg",
    "img/sliderTwo (3).jpg",
]

const sliderFirst = new Slider('#slider', images, 2, false);
const slider = new Slider('#slider-white', imagesWhite, 2, true);
