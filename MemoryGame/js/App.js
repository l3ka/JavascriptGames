import {cardArray, grid, resultDisplay, numberOfGuesses, notificationDisplay} from './Helper.js';

cardArray.sort(() => 0.5 - Math.random());

// Helper array's
let cardsChosen = [];
let cardsChosenID = [];
let result = 0;


// create Game Board
export function createBoard() {
    resultDisplay.textContent = 0;
    numberOfGuesses.textContent = 0;
    for (let i = 0; i < cardArray.length; ++i) {
        let card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.append(card);
    }
}

function flipCard() {
    const choosenCardID = this.getAttribute('data-id');
    const lastChoosenCardID = cardsChosenID.length > 0 ? cardsChosenID[0] : -1;
    if (lastChoosenCardID === choosenCardID) {
        this.setAttribute('src', 'images/blank.png');
        resetArrays();
        return;
    }
    else if (cardsChosen.length < 2) {
        let cardID = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardID].name);
        cardsChosenID.push(cardID);
        this.setAttribute('src', cardArray[cardID].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }    
    }
}

function checkForMatch() {
    numberOfGuesses.textContent = parseInt(numberOfGuesses.textContent) + 1;
    var cards = document.querySelectorAll('img');
    const optionOneID = cardsChosenID[0];
    const optionTwoID = cardsChosenID[1];
    if (cardsChosen[0] === cardsChosen[1]) {        
        cards[optionOneID].setAttribute('src', 'images/white.png');
        cards[optionTwoID].setAttribute('src', 'images/white.png');
        cards[optionOneID].removeEventListener('click', flipCard);
        cards[optionTwoID].removeEventListener('click', flipCard);
        notificationDisplay.textContent = 'You found match';
        resultDisplay.textContent = ++result;
    }
    else {        
        cards[optionOneID].setAttribute('src', 'images/blank.png');
        cards[optionTwoID].setAttribute('src', 'images/blank.png');
        notificationDisplay.textContent = 'Sorry, try again';
    }
    resetArrays();
    if (result === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found them all!';
        location.reload();
    }
}

function resetArrays() {
    cardsChosen = [];
    cardsChosenID = [];
}