/*
 * Create a list that holds all of your cards
 */
var deck = document.getElementById('deck');

window.onload = function() {
	var cards = [];
	var cardsShuffled = [];

	for (var i=0; i<deck.children.length; i++) {
		deck.children[i].id = 'card' + i;
		cards.push(deck.children[i]);
	}
	cardsShuffled = shuffle(cards);

/*	for (var j=0; j<cardsShuffled.length; j++){
		console.log(cardsShuffled[j].id);
	}
*/
	//reset number of moves to zero
}


document.getElementById('deck').addEventListener('mousedown', function(event) {
	var cardClickedId = event.target.id;
	var cardClicked = document.getElementById(cardClickedId);
	var firstCardOpened;
	var secondCardOpened;

	//console.log(cardClicked);
	cardClicked.className += ' open show';
	firstCardOpened = cardClicked.children[0].className;
	console.log(firstCardOpened);

	//for loop to check if there is any opened card (through class open show)
	if(firstCardOpened === secondCardOpened) {
		console.log("matched!");
	}
	else {
		console.log("not matched!");
	}



})





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
