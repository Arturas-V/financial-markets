/**
 * Carousel class building custom slider component
 */
class Carousel extends DOMElement {

    /**
     * Carousel class constructor 
     * 
     * @param {Object} settings - parameters for customisation
     * 
     * Currently accepted settings:
     *      wrapper {string} - carousel wrapper element class name
     *      content {string} - main content class name
     *      pagination {string} - optional carousel navigation or pagination class name
     *      arrows {boolean} - optional if we want to have arrows for previous and next slide
     */
    constructor(settings) {
        super();

        if( settings.content === (null || "") || settings.wrapper === (null || "") ) {
            console.log("Carousel wrapper or content parameters are missing");
            return;
        }

        this.settings = settings;
        this.slidesTotal = 0;
        this.slideWidth = 0;
        this.slideIndex = 0;
        this.wrapper = this.getElementsByClassName(settings.wrapper)[0];
        this.content = this.getElementsByClassName(settings.content)[0];

        const resizeHandler = this.reInit.bind(this);

        window.addEventListener('resize', resizeHandler);
    }

    /**
     * Method to initialise carousel
     */
    init(){
        this.setup();

        if(this.settings.pagination) {
            this.initPaging();
            
        }

        if(this.settings.arrows) {
            this.initArrows();
        }
    }

    /**
     * Method to re initialise carousel, eg after screens resize
     */
    reInit(){
        this.setup();
        this.navigate(0);
    }

    /**
     * Method to setup carousel styles properties
     */
    setup(){
        const slides = this.content.children;

        this.slidesTotal = slides.length;
        this.slideWidth = this.content.parentNode.clientWidth;
        this.content.style.width = this.slideWidth * slides.length + "px";

        for(let slide of slides) {
            slide.style.width = this.slideWidth + "px";
        }
    }

    /**
     * Method to initialise carousel pagination
     */
    initPaging() {
        const buttons = this.getElementsByClassName(this.settings.pagination)[0].children;

        for(let button of buttons) {
            button.addEventListener("click", (event) => {
                const target = event.target;

                this.navigate(Array.prototype.indexOf.call(target.parentNode.children, target));
            });
        }

        this.addClass(buttons[0], "markets__nav-item--selected");
    }

    /**
     * Method to intialise prev and next arrows navigation
     */
    initArrows() {
        const prev = this.createElement("span");
        const next = this.createElement("span");

        this.addClass(prev, "markets__slider-prev");
        this.addClass(next, "markets__slider-next");

        this.appendChild(this.wrapper, prev, true);
        this.appendChild(this.wrapper, next);

        prev.addEventListener("click", () => { this.navigate(-1) });
        next.addEventListener("click", () => { this.navigate(999) }); // cannot pass 1 or +1 as it would indicate Indices tab

    }

    /**
     * Method to perform navigation to indexed slide
     * @param {number} index - slide index
     */
    navigate(index = 0) {
        const tabs = this.getElementsByClassName("markets__nav-item");
        const currentTab = this.getElementsByClassName("markets__nav-item--selected")[0];

        if( (index === -1 && this.slideIndex === 0) ||
            (index === 999 && this.slideIndex === this.slidesTotal - 1) ) {
            return;
        }

        if(index === -1) {
            index = this.slideIndex + index;
        } else if(index === 999) {
            index = this.slideIndex + 1;
        }

        this.removeClass(currentTab, " markets__nav-item--selected");
        this.addClass(tabs[index], "markets__nav-item--selected")

        this.slideIndex = index;
        this.content.style.left = -this.slideWidth * this.slideIndex + "px";
    }
}