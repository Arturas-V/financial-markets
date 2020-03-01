/**
 * Global App classm, wiring components.
 */
class App {

    /**
     * App class constructor.
     */
    constructor() {}

    /**
     * Method to render market price table.
     * 
     * @return {Element} - component to render.
     */
    showMarkets() {
        const marketsContainer = document.getElementById("content");

        return new Markets(marketsContainer);
    }

}


const app = new App();
app.showMarkets();