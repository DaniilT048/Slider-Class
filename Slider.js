export class Slider{
    images = [];
    intervalId = null;
    currentSlide = 0;
    minDistanceForSwipe = 100;
    startTouchX = 0;
    endTouchX = 0;
    sliderTimer = 2;

    constructor(){
        this.images = images;
        this.currentSlide = images.length ;
        this.intervalId = intervalId;
        // this.minDistanceForSwipe = minDistanceForSwipe;
        // this.endTouchX = endTouchX;
        // this.startTouchX = startTouchX;
        // this.sliderTimer = sliderTimer;
    }

    generateImage() {
        let imgHtml = '';
        this.images.forEach((image) => {
            imgHtml += `<img src='img/${image}' alt="">`;
        })
        document.querySelector('#slider .content').innerHTML = imgHtml;
    }
}