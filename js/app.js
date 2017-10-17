/*
* Create a list that holds all of your cards
*/
var deck = document.getElementById('deck');
var cards = [];
var cardsShuffled = [];
 
window.onload = function() {        
    for (var i=0; i<deck.children.length; i++) {
        deck.children[i].id = 'card' + i;
        cards.push(deck.children[i]);
    }
    cardsShuffled = shuffle(cards);
   
    function makeShuffleCards(arrayCards) {
        var list = document.querySelector('ul.deck');
        for(var i=0; i<deck.children.length; i++) {
            var item = document.querySelector('li');
            item = arrayCards[i];
            list.appendChild(item);
        }
        return list;
    }
    makeShuffleCards(cardsShuffled);
}



var timerVar = setInterval(countTimer, 1000); 
var totalSeconds = 0;
// Count up timer which shows minute:second
function countTimer() {
    ++totalSeconds;
    var minute = ('0'+ Math.floor(totalSeconds/60)).slice(-2);
    var seconds = ('0'+ (totalSeconds - minute*60)).slice(-2);

    document.getElementById("timer").innerHTML = minute + ":" + seconds;
}


var firstCardOpenedSymbol;
var firstCardOpenedId; 
var secondCardOpenedSymbol;     
var secondCardOpenedId;
var moves = 0;
var cardsMatched = 0;

document.getElementById('deck').addEventListener('mousedown', function(event) {
    var cardClickedId = event.target.id;
    var cardClicked = document.getElementById(cardClickedId);
    var moveSpan = document.querySelector('span');
    var starsUl = document.getElementById('stars');   
    cardClicked.className += ' open show';
    
    //Store card info
    if (firstCardOpenedSymbol === undefined) {
        firstCardOpenedSymbol = cardClicked.children[0].className;
        firstCardOpenedId = cardClickedId;
        moves += 1;
        countMoves();
        //countTimer();
    }
    else if (firstCardOpenedSymbol !== undefined && secondCardOpenedSymbol === undefined 
        && firstCardOpenedId !== cardClickedId) {
        
        /* secondCardOpenedSymbol === undefined 
        ** && firstCardOpenedId !== cardClickedId - prevents double clicking on the same card
        */
        secondCardOpenedSymbol = cardClicked.children[0].className;
        secondCardOpenedId = cardClickedId;
        moves += 1;
        countMoves();
 
        //Compare whether cards match
        if (firstCardOpenedSymbol !== secondCardOpenedSymbol) {
            setTimeout(function() {
                document.getElementById(firstCardOpenedId).className = 'card';
                document.getElementById(secondCardOpenedId).className = 'card';
                firstCardOpenedSymbol = undefined;
                firstCardOpenedId = undefined;
                secondCardOpenedSymbol = undefined;
                secondCardOpenedId = undefined;
            }, 1000);
        }
        else {
            setTimeout(function(){
                document.getElementById(firstCardOpenedId).className = 'card match';
                document.getElementById(secondCardOpenedId).className = 'card match';
                firstCardOpenedSymbol = undefined;
                firstCardOpenedId = undefined;
                secondCardOpenedSymbol = undefined;
                secondCardOpenedId = undefined;
                cardsMatched = cardsMatched + 2;
                if(cardsMatched === 2) {
                    document.getElementById('gameScore').style.display = 'block';
                    showResults();
                    clearInterval(timerVar);
                }
            }, 1000);
        }
           
    }
 

 
    function countMoves() {
        if ((moves >= 2 && moves < 6) && starsUl.children.length === 3
            && firstCardOpenedId !== secondCardOpenedId) {
            starsUl.removeChild(starsUl.childNodes[0]);
        }
        else if (moves >= 6 && starsUl.children.length === 2
            && firstCardOpenedId !== secondCardOpenedId) {
            starsUl.removeChild(starsUl.childNodes[0]);
        }
        moveSpan.innerHTML = moves;
    }

    function showResults() {
        var starResult = document.querySelector('span.starModal');
        var movesResult = document.querySelector('span.movesModal');
        var timerResult = document.querySelector('span.timerModal');

        movesResult.innerHTML = moves;
        starResult.innerHTML = starsUl.children.length;
        timerResult.innerHTML = document.getElementById("timer").innerHTML;
    }


    //console.log("firstCardOpenedId = " , firstCardOpenedId);
    //console.log("firstCardOpenedSymbol = ", firstCardOpenedSymbol);
    //console.log("secondCardOpenedId = ", secondCardOpenedId);
    //console.log("secondCardOpenedSymbol = ", secondCardOpenedSymbol);
    
    

 
})

  
document.getElementById('restart').addEventListener('mousedown', function(event) {
    window.location.reload();
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
  
 
//Modal function from https://www.w3schools.com/howto/howto_css_modals.asp
 
// Get the modal
var modal = document.getElementById('gameScore');
 
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
 
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
 
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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
 
 