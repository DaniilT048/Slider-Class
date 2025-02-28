export class Slider {
    minDistanceForSwipe = 100;
    startTouchX = 0;
    endTouchX = 0;
    intervalId = null;

    constructor(settings) {
        if (!Array.isArray(settings.images) || !settings.images.length) {
            throw new Error("No images selected");
        }

        if(!settings.sliderId) {
            throw new Error("Slider id is not found");
        }

       const defaultSettings = {
            sliderId: '',
            images: [],
            sliderTimer: 1,
            isDotsHidden: false,
            isAutoSlidesButtonHidden: false,
            primaryColor: '#008B8B',
       }

       const options ={
           ...defaultSettings,
           ...settings,
       }


        this.sliderId = `#${options.sliderId}`;
        this.images = options.images;
        this.currentSlide = options.images.length;
        this.sliderTimer = options.sliderTimer;
        this.isDotsHidden = options.isDotsHidden;
        this.isAutoSlidesButtonHidden = options.isAutoSlidesButtonHidden;
        this.primaryColor = options.primaryColor;
        this.buttonSliderColor = options.buttonSliderColor;

        if (!this.isDotsHidden) {
            this.generateDots()
        }

        this.setSliderColor()
        this.generateImage()
        this.slideSwipe()

        this.makeSubscriptionForElement()
        this.initTouchSliderEvents()
        this.initAutoSlideButton()
    }

    makeSubscriptionForElement() {
        document.querySelector(`${this.sliderId} .left`).addEventListener("click", this.onLeft.bind(this));
        document.querySelector(`${this.sliderId} .right`).addEventListener("click", this.onRight.bind(this));
        document.querySelector(`${this.sliderId} .slider-navigation`).addEventListener("click", this.onDotClick.bind(this));
        document.querySelector(`${this.sliderId} .auto-sliding`).addEventListener("click", this.startStopAutoSlides.bind(this));
        this.contentImg = document.querySelector(`${this.sliderId} .content`);
        this.imgSlide = document.querySelector(`${this.sliderId} img`);

    }


    initAutoSlideButton(){
        if(!this.isAutoSlidesButtonHidden) {
            this.autoSlidesButton = document.querySelector(`${this.sliderId} .auto-sliding`);
            this.autoSlidesButton.innerHTML = `<div class="sliding">&#9658;</div>`;
        }
    }

    initTouchSliderEvents(){
        this.contentImg.addEventListener('touchstart', (event) => {
            this.startTouchX = event.touches[0].clientX;
        }, {passive: false});


        this.contentImg.addEventListener('touchend', (event) => {
            this.endTouchX = event.changedTouches[0].clientX;
            this.slideSwipe();
        });


        this.contentImg.addEventListener('mousedown', (event) => {
            this.startTouchX = event.clientX;
        })


        this.contentImg.addEventListener('mouseup', (event) => {
            this.endTouchX = event.clientX;
            this.slideSwipe();
        })


        document.querySelectorAll('img').forEach(img => {
            img.ondragstart = () => false;    // block dragging of img
        })


        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowRight': this.onRight(); break;
                case 'ArrowLeft': this.onLeft();
            }
        })
    }

    generateImage() {
        let imgHtml = '';
        this.images.forEach((image) => {
            imgHtml += `<img src='${image}' alt="">`;
        })
        document.querySelector(`${this.sliderId} .content`).innerHTML = imgHtml;
    }

    generateDots() {
        let resultHtml = '';
        this.images.forEach((image, index) => {
            const activeClass = index === 0 ? "active" : "";
            resultHtml += `<div class="dots ${activeClass}" data-dot="${index}"></div>`
        })
        document.querySelector(`${this.sliderId} .slider-navigation`).innerHTML = resultHtml;
    }

    onLeft() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.images.length - 1;
        }
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        this.updateActiveDot()
    }

    onRight() {
        this.currentSlide++;
        if (this.currentSlide >= this.images.length) {
            this.currentSlide = 0;
        }
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        this.updateActiveDot()
    }

    onDotClick(event) {
        if (!event.target.classList.contains("dots")) {
            return;
        }
        this.currentSlide = event.target.dataset.dot;
        this.contentImg.style.transform = `translate(-${this.currentSlide * this.imgSlide.offsetWidth}px)`;
        this.updateActiveDot()
    }

    updateActiveDot() {
        if (this.isDotsHidden) {
            return;
        }
        const activeClass = document.querySelector(`${this.sliderId} .active`);
        if (activeClass) {
            activeClass.classList.remove("active");
        }
        document.querySelector(`${this.sliderId} div[data-dot='${this.currentSlide}']`)
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


    slideSwipe(){
        if (this.endTouchX - this.startTouchX >= this.minDistanceForSwipe ) {
            this.onLeft()
        }else if (this.startTouchX - this.endTouchX >= this.minDistanceForSwipe) {
            this.onRight()
        }
    }

    setSliderColor() {
        document.querySelector(`${this.sliderId}.slider`).style.background = this.primaryColor;
    }
}