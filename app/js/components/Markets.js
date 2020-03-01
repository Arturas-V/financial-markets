/**
 * Markets class to display market price table.
 */
class Markets extends DOMElement {

    /**
     * Markets class constructor.
     * 
     * @param {Element} container - element to append markets table to.
     */
    constructor(container = null) {
        super();

        if(!container) { return; } //stop markets rendering in case container element not passed. We may set up default selector.

        //table container reference
        this.container = container;

        // component wrapper reference
        this.wrapper = null;

        this.getMarketsData();
    }

    /**
     * Method to make request call to get markets data from server.
     */
    getMarketsData() {
        
        const fetchData = async () => {
            const response = await fetch(API.URI["marketsData"]);

            return await response.json();
        };

        fetchData()
        .then((data) => {
            this.createdDOM(data);
        });
    }

    /**
     * Method responsible for creating markets table dom
     * 
     * @param {object} data - json type object contains markets data 
     */
    createdDOM(data = null) {
        const slider = this.createElement("div");
        const tabs = this.createElement("nav");
        const container = this.createElement("section");
        const grid = this.createElement("div");
        const caption = this.createElement("div");
        const wrapper = this.createElement("section");

        this.addClass(wrapper, "markets");
        this.addClass(caption, "markets__caption");
        this.addClass(slider, "markets__slider");
        this.addClass(tabs, "markets__nav");
        this.addClass(grid, "markets__grid");
        this.addClass(container, "markets__container");

        this.addText(caption, "Prices are indicative only");

        for(let market in data.Markets) {
            const marketItem = data.Markets[market];
            const tabItem = this.createElement("span");
            const gridItem = this.createElement("div");
            const gridLine = this.createElement("div");
            const sellBuyCell = this.createElement("span");

            this.addClass(tabItem, "markets__nav-item");
            this.addClass(gridItem, "markets__market");
            this.addClass(gridLine, "markets__market-line");
            this.addClass(sellBuyCell, "markets__market-cell")

            this.addText(tabItem, market);
            this.appendChild(tabs, tabItem);

            for(let i = 0; i < marketItem.Actions.length; i++) {
                const gridLineItem = this.createElement("span");

                if(i === 2 || i === 3) {
                    this.addClass(gridLineItem, "markets__market-cell--sub");
                    this.addText(gridLineItem, marketItem.Actions[i]);
                    this.appendChild(sellBuyCell, gridLineItem);
                    
                    if(i === 2) { continue; }

                    this.appendChild(gridLine, sellBuyCell);
                    continue;
                }

                this.addClass(gridLineItem, "markets__market-cell");
                this.addText(gridLineItem, marketItem.Actions[i]);
                this.appendChild(gridLine, gridLineItem);
            }

            this.appendChild(gridItem, gridLine);

            let instrumentIndex = 1; // for later use to have dummy selection for falling or rising price cell

            for (let instrument in marketItem.Instruments) {
                const instrumentLine = this.createElement("div");
                const instrumentLineItem = this.createElement("span");
                const sellBuy = this.createElement("span");

                this.addClass(instrumentLine, "markets__market-line");
                this.addClass(instrumentLineItem, "markets__market-cell");
                this.addClass(sellBuy, "markets__market-cell")
                this.addText(instrumentLineItem, instrument);
                this.appendChild(instrumentLine, instrumentLineItem);

                for (let i = 0; i < marketItem.Instruments[instrument].length; i++) {
                    const instrumentCell = this.createElement("span");

                    if(i === 1 || i === 2) {
                        this.addClass(instrumentCell, "markets__market-cell--sub");
                        this.addText(instrumentCell, marketItem.Instruments[instrument][i]);
                        this.appendChild(sellBuy, instrumentCell);

                        // dummy logic to select falling rising price cell
                        if(instrumentIndex === 2 || instrumentIndex === 4){
                            this.addClass(instrumentCell, "markets__market-cell--green");
                        } else {
                            this.addClass(instrumentCell, "markets__market-cell--red");
                        }
                        
                        if(i === 1) { continue; }
                        
                        this.appendChild(instrumentLine, sellBuy);
                        continue;
                    }

                    // dummy logic to select falling rising price cell
                    if(i === 3){
                        if(marketItem.Instruments[instrument][i].indexOf("-") > -1) {
                            this.addClass(instrumentCell, "markets__market-cell--red");
                        } else {
                            this.addClass(instrumentCell, "markets__market-cell--blue");
                        }
                    } 

                    this.addClass(instrumentCell, "markets__market-cell");
                    this.addText(instrumentCell, marketItem.Instruments[instrument][i]);
                    this.appendChild(instrumentLine, instrumentCell);
                }

                this.appendChild(gridItem, instrumentLine);
                instrumentIndex++;
            }
            
            this.appendChild(grid, gridItem);            
        }

        this.appendChild(slider, tabs);
        this.appendChild(container, grid);
        this.appendChild(slider, container);
        this.appendChild(wrapper, slider);
        this.appendChild(wrapper, caption);
        this.appendChild(this.container, wrapper);

        this.initCarousel();
    }

    /**
     * Method to initialise carousel functionality
     * 
     */
    initCarousel() {
        const carousel = new Carousel({
            wrapper: "markets__slider",
            content: "markets__grid",
            pagination: "markets__nav",
            arrows: true
        });

        carousel.init();
    }
}