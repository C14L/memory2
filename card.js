'use strict';

customElements.define('app-card', class extends HTMLElement {

    static get observedAttributes () {
        return ['pic', 'show'];
    }

    constructor () {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="card.css">
            <div id="card">
                <div id="shadow"></div>
                <div id="front"></div>
                <div id="back"></div>
            </div>
            `;
    }

    connectedCallback () {
        this.pic = this.attributes.getNamedItem('pic').value;
        const picUrl = 'pics/' + this.pic + '.jpg';
        this._card = this._shadowRoot.children.card;
        this._card.children.front.style.backgroundImage = 'url(' + picUrl + ')';
    }

    disconnectedCallback () {
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if (name == 'show') {
            this._card.setAttribute(name, newValue);
        }
    }

    ///////////////////////////////////////////////////////

});
