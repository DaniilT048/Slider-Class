export class Slider{
    sliderTimer = 2;

    intervalId = null;
    minDistanceForSwipe = 100;
    startTouchX = 0;
    endTouchX = 0;


    constructor(images){
        if(!Array.isArray(images)||!images.length){
            throw new Error("No images selected");
        }
        this.images = images;
        this.currentSlide = images.length ;

        this.generateImage()
        this.generateDots()

        this.contentImg = document.querySelector("#slider .content");
        this.imgSlide = document.querySelector("#slider img");

        this.makeSubscriptionForElement()
    }


    makeSubscriptionForElement() {
        document.querySelector("#slider .left").addEventListener("click", this.onLeft.bind(this));
        document.querySelector("#slider .right").addEventListener("click", this.onRight.bind(this));
        document.querySelector("#slider .slider-navigation").addEventListener("click", onDotClick)
        document.querySelector("#slider .start-sliding").addEventListener('click', startAutoSlides);
        document.querySelector("#slider .stop-sliding").addEventListener('click', stopAutoSlides);
    }

    generateImage() {
        let imgHtml = '';
        this.images.forEach((image) => {
            imgHtml += `<img src='${image}' alt="">`;
        })
        document.querySelector('#slider .content').innerHTML = imgHtml;
    }

    generateDots() {
        let resultHtml = '';
        this.images.forEach((image, index) => {
            const activeClass = index === 0 ? "active" : "";
            resultHtml += `<div class="dots ${activeClass}" data-dot="${index}"></div>`
        })
        document.querySelector('#slider .slider-navigation').innerHTML = resultHtml;
    }

    onLeft() {
        this.currentSlide--;
        if(this.currentSlide < 0){
            this.currentSlide = this.images.length -1;
        }
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        activeDot()
    }
    onRight() {
        this.currentSlide++;
        if(this.currentSlide >= this.images.length){
            this.currentSlide = 0;
        }
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        activeDot()
    }

}