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

const sliderFirst = new Slider({
    sliderId: 'slider',
    images: images,
    sliderTimer: 3,
    isDotsHidden: false,
    isAutoSlidesButtonHidden: false,
    })

const slider = new Slider({
    sliderId: 'slider-white',
    images: imagesWhite,
    sliderTimer: 1,
    isDotsHidden: true,
    isAutoSlidesButtonHidden: true,
});
