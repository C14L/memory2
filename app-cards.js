"use strict";

customElements.define('app-cards', class extends HTMLElement {

    static get observedAttributes () {
        return ['count', 'pics'];
    }

    constructor () {
        super();
        const doc = document.currentScript.ownerDocument;

        this._appCounterEl = doc.getElementsByTagName('app-counter')[0];
        console.log(this._appCounterEl);

        this._itemNames = this.attributes.getNamedItem('pics').value.split(' '); // [dog, cat, ...] etc.
        this._cardPairs = this.getCardNamesFromItemNames(this._itemNames); // [dog-1, dog-2, cat-1, ...] etc.
        this._cardPics = this.shuffleArray(this._cardPairs);
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._cardEls = [];

        for (let i=0; i<this._cardPics.length; i++) {
            this._cardEls[i] = doc.createElement('app-card');
            this._cardEls[i].setAttribute('pic', this._cardPics[i]);
            this._shadowRoot.appendChild(this._cardEls[i]);
        }
    }

    connectedCallback () {
        for (let i=0; i<this._cardEls.length; i++) {
            this._cardEls[i].addEventListener('click', this.handleCardClick.bind(this));
        }
    }

    disconnectedCallback () {
        for (let i=0; i<this._cardEls.length; i++) {
            this._cardEls[i].removeEventListener('click', this.handleCardClick.bind(this));
        }
    }

    attributeChangedCallback (name, oldValue, newValue) {
    }

    ///////////////////////////////////////////////////////

    /**
     * Returns a list of the currently revealed card names.
     */
    get revealedCards () {
        return this._cardEls.filter(function(elem, idx, arr) {
            return elem.getAttribute('show') === 'revealed';
        });
    }

    /**
     * Returns the number of currently revealed cards.
     */
    get revealedCount () {
        return this.revealedCards.length;
    }

    /**
     * A card was clicked.
     */
    handleCardClick (event) {
        // If the card was already removed, ignore the click.
        const state = event.target.attributes.getNamedItem('show');
        if (state && state.value === 'removed') return;

        // If there are currently two cards revealed, this next click 
        // will conceal them, so that all cards on the field are concealed.
        if (this.revealedCount >= 2) return this.concealAllCards();

        // Otherwise, the clicked card is revealed.
        if (this.revealCard(event.target)) {
            // Check if that was the second card to be revealed.
            if (this.revealedCount === 2) {
                // If so, count another pair revealed.
                let ctr = parseInt(this._appCounterEl.getAttribute('count'));
                this._appCounterEl.setAttribute('count', ctr + 1);

                // Check if the revealed cards match.
                const matchName = this.checkForMatch();
                if (matchName) {
                    // Count the match
                    let ctr = parseInt(this._appCounterEl.getAttribute('match'));
                    this._appCounterEl.setAttribute('match', ctr + 1);
                    // and remove the pair.
                    this.removeCards(matchName);
                }
            }
        }
    }

    /**
     * Call only when exactly 2 cards are visible. Then, compare
     * if those cards are a match. Return true if they match.
     */
    checkForMatch () {
        const cards = this.revealedCards;
        const name1 = cards[0] && cards[0].getAttribute('pic');
        const name2 = cards[1] && cards[1].getAttribute('pic');
        return name1 && name2 && name1.split('-')[0] === name2.split('-')[0] ? name2.split('-')[0] : false;
    }

    /**
     * Cards are concealed all at once. This will walk through the 
     * shadow DOM list of "card" elements and, for the "show" property,
     * replace all values "revealed" with the value "concealed".
     */
    concealAllCards () {
        for (let i=0; i<this._cardEls.length; i++) {
            if (this._cardEls[i].getAttribute('show') == "revealed") {
                this._cardEls[i].setAttribute('show', "concealed");
            }
        }
    }

    /**
     * Cards are revead by adding a property to the element 
     * in the shadow DOM.
     */
    revealCard (target) {
        if (target.getAttribute('show') !== 'revealed') {
            target.setAttribute('show', "revealed");
            return true;
        }
    }

    /**
     * Find and remove a currently revealed cards.
     */
    removeCards (name) {
        for (let i=0; i<this._cardEls.length; i++) {
            if (this._cardEls[i].getAttribute('show') == "revealed") {
                // FIXME: Removing the even listener doesn't work. Who knows why? 
                // this._cardEls[i].removeEventListener('click', this.handleCardClick.bind(this));
                // Work-around; ignore clicks on cards with show="removed" parameter.
                this._cardEls[i].setAttribute('show', "removed");
            }
        }
    }

    /**
     * Receives an array of item names and converts it into pairs, with
     * each name having "-1" and "-2" appended. Then return the array 
     */
    getCardNamesFromItemNames (names) {
        let arr = [];
        for (let i=0; i<names.length; i++) {
            arr.push(names[i] + '-1');
            arr.push(names[i] + '-2');
        }        
        return arr;
    }

    /**
     * Randomize array element order, using Durstenfeld shuffle algorithm.
     */
    shuffleArray (arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }
});