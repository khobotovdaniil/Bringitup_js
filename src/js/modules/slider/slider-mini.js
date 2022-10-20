import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor (container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        while (true) {
            if (this.slides[1].tagName !== 'BUTTON') {
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
                break;
            } else {
                this.container.appendChild(this.slides[0]);
            }
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
           
            while (true) {
                let active = this.slides[this.slides.length - 1];
                if (active.tagName !== 'BUTTON') {
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                } else {
                    this.container.insertBefore(active, this.slides[0]);
                }
            }
        }); 
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            let timer;        
            if (this.autoplay) {
                const activateTimer = () => {
                    timer = setInterval(() => this.nextSlide(), 5000);
                };
                activateTimer(timer);

                this.container.addEventListener('mouseenter', () => {
                    clearInterval(timer);
                });

                this.container.addEventListener('mouseleave', () => {
                    activateTimer(timer);
                });
            }
        } catch(e){}
    }
}