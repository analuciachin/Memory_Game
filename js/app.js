/*
* Create a list that holds all cards
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


/*
* Count up timer which shows minute:second in the format 00:00
*/
var timerVar = setInterval(countTimer, 1000); 
var totalSeconds = 0;
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

document.getElementById('deck').addEventListener('click', function(event) {
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
    }
    else if (firstCardOpenedSymbol !== undefined && secondCardOpenedSymbol === undefined 
        && firstCardOpenedId !== cardClickedId) {
        /*
        * To prevent double clicking on the same card
        * secondCardOpenedSymbol === undefined && firstCardOpenedId !== cardClickedId
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
                document.getElementById(firstCardOpenedId).className = 'card match match-animation';
                document.getElementById(secondCardOpenedId).className = 'card match match-animation';
                firstCardOpenedSymbol = undefined;
                firstCardOpenedId = undefined;
                secondCardOpenedSymbol = undefined;
                secondCardOpenedId = undefined;
                cardsMatched = cardsMatched + 2;
                if(cardsMatched === 16) {
                    document.getElementById('gameScore').style.display = 'block';
                    showResults();
                    clearInterval(timerVar);
                }
            }, 1000);
        }
           
    } 

 
    function countMoves() {
        moveSpan.innerHTML = moves;
        if ((moves > 20 && moves < 28) && starsUl.children.length === 3
            && firstCardOpenedId !== secondCardOpenedId) {
            starsUl.removeChild(starsUl.children[0]);
        }
        else if (moves >= 28 && starsUl.children.length === 2
            && firstCardOpenedId !== secondCardOpenedId) {
            starsUl.removeChild(starsUl.children[0]);
        }
    }

    function showResults() {
        var starResult = document.querySelector('span.starModal');
        var movesResult = document.querySelector('span.movesModal');
        var timerResult = document.querySelector('span.timerModal');

        movesResult.innerHTML = moves;
        starResult.innerHTML = starsUl.children.length;
        timerResult.innerHTML = document.getElementById("timer").innerHTML;
    }
    
})


/*
* Reload the page with the restart icon
*/  
document.getElementById('restart').addEventListener('click', function(event) {
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
  
 
/*
* Modal popup
*/ 
var modal = document.getElementById('gameScore');
var noButton = document.getElementById('noButton');
var yesButton = document.getElementById('yesButton'); 
var gameOver = document.getElementById('gameOver');

noButton.addEventListener('click', function() {
    modal.style.display = 'none';
    gameOver.style.display = 'block';
})

yesButton.addEventListener('click', function() {
    window.location.reload();
})