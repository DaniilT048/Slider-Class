export class Slider {


    minDistanceForSwipe = 100;
    startTouchX = 0;
    endTouchX = 0;


    constructor(images, sliderTimer, dots) {
        if (!Array.isArray(images) || !images.length) {
            throw new Error("No images selected");
        }
        this.images = images;
        this.currentSlide = images.length;
        this.sliderTimer = sliderTimer;
        this.intervalId = null;

        this.generateDots()
        this.generateImage()


        this.contentImg = document.querySelector("#slider .content");
        this.imgSlide = document.querySelector("#slider img");
        this.autoSlidesButton = document.querySelector("#slider .auto-sliding");
        this.autoSlidesButton.innerHTML = `<div class="sliding">&#9658;</div>`;
        this.makeSubscriptionForElement()
    }


    makeSubscriptionForElement() {
        document.querySelector("#slider .left").addEventListener("click", this.onLeft.bind(this));
        document.querySelector("#slider .right").addEventListener("click", this.onRight.bind(this));
        document.querySelector("#slider .slider-navigation").addEventListener("click", this.onDotClick.bind(this));
        document.querySelector("#slider .auto-sliding").addEventListener("click", this.startStopAutoSlides.bind(this));
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
        if (this.currentSlide < 0) {
            this.currentSlide = this.images.length - 1;
        }
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        this.activeDot()
    }

    onRight() {
        this.currentSlide++;
        if (this.currentSlide >= this.images.length) {
            this.currentSlide = 0;
        }
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        this.activeDot()
    }

    onDotClick(event) {
        if (!event.target.classList.contains("dots")) {
            return;
        }
        this.currentSlide = event.target.dataset.dot;
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        this.activeDot()
    }

    activeDot() {
        const activeClass = document.querySelector("#slider .active");
        if (activeClass) {
            activeClass.classList.remove("active");
        }
        document.querySelector(`#slider div[data-dot='${this.currentSlide}']`)
            .classList.add("active");
    }

    startStopAutoSlides() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.onRight();
            }, this.sliderTimer * 1000);
            this.autoSlidesButton.innerHTML = `<div class="sliding">&#9632;</div>`;
        } else {
            clearInterval(this.intervalId)
            this.intervalId = null;
            this.autoSlidesButton.innerHTML = `<div class="sliding">&#9658;</div>`;
        }
    }
}