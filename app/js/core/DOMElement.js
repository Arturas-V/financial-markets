/**
 * DOMElement class holds DOM element related methods
 */

class DOMElement {

    /**
     * class constructor
     */
    constructor(){}

    /**
     * Method to create node element
     * 
     * @param {string} type - type of node, div, span, eg.
     * @return {Element} - created node
     */
    createElement(type = "div"){
        return document.createElement(type);
    }

    /**
     * Method responsible for adding element by appending or prepending
     * 
     * @param {Element} node - parent node
     * @param {Element} child - child element to be appended, prepended etc.
     * @param {boolean} prepend - flag to indicate if prepend 
     */
    appendChild(node = null, child = null, prepend = false){
        if(node === null || child === null) {return;}

        if(prepend) {
            node.prepend(child);
        } else {
            node.appendChild(child);
        }
    }

    /**
     * Method to remove element
     * 
     * @param {Element} node - node to be removed
     */
    removeChild(node = null){
        if(node === null) {return;}

        this.node.parentNode.removeChild(node);
    }

    /**
     * Method to add class name
     * 
     * @param {Element} node - dom element
     * @param {string} name - class name
     */
    addClass(node = null, name = ""){
        if(node === null) {return;}

        node.className === "" ? node.className = name : node.className = node.className + " " + name;
    }

    /**
     * Method to remove class name
     *
     * @param {Element} node - dom element
     * @param {string} name - class name
     */
    removeClass(node = null, name = "") {
        if(node === null) {return;}

        node.className = node.className.replace(name, "");
    }

    /**
     * Method to add text
     *
     * @param {Element} node - dom element
     * @param {string} text - text to be added
     */
    addText(node = null, text = ""){
        if(node === null) {return;}

        const textNode = document.createTextNode(text);

        node.appendChild(textNode);
    }

    /**
     * Method to add attribute on to element
     *
     * @param {string} name - attribute name
     * @param {string} value - attribute value
     */
    setAttribute(node = null, name = "", value = "") {
        if(node === null || name === "") { return; }

        node.setAttribute(name, value);
    }

    /**
     * Method to get elements by classs name(s)
     * 
     * @param {string} name - class name
     * @return {Element} - target element
     */
    getElementsByClassName(name = "") {
        if(name === "") {return;}

        return document.getElementsByClassName(name);
    }
}