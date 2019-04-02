
//set card list here 
const playersList = ['kdb','ronaldo','messi','pogba','hazard','modric','neymar','salah'];
let duplicateList; 

let counter;
let starsCount;
let secondsElapsed = 0;
let timer; 

const counterDisplay = document.querySelector('.moves');
let openCards = [];

setupGame();
//click to start game
document.querySelector('.deck').addEventListener('click', function(event){

	if (event.target.classList[0] ==='card'){

		startTimer();
		
		console.log('what to show: ' + event.target.children.item(0).classList);

		let cardNode = event.target;

		let childNode = cardNode.children.item(0);
		let cardName = cardNode.children.item(0).classList[1];

		showCard(childNode);

		//function determine matching
		if (openCards.length === 0 ){
			openCards.push(cardNode);
		} else {

			let cardFromList = openCards.pop();
			let cardFromListName = cardFromList.children.item(0).classList[1];

			if (cardFromListName === cardName){
				console.log('Card Matched');

				cardNode.classList.add('match');
				cardFromList.classList.add('match');

				removeCardFromList(cardName);
			}else{

				console.log('Card do not matched');
				cardNode.classList.add('notmatch');
				cardFromList.classList.add('notmatch');

				unflipCard(cardFromListName, cardName);
			}
			incrementCounter();
			calculateStarRating();

		}

		if (duplicateList.length === 0){
			gameFinished(counter);
		}
	}

});

//click to restart game
document.querySelector('.restart').addEventListener('click', function(event){
	setupGame();
});


/*
* @descriptor start the timer at first click
*  -stop timer if more than 5 minutes passed
*/ 
function startTimer(){
	if (secondsElapsed === 0 ){
		secondsElapsed++;
		timer = setInterval(function(){
			document.querySelector('.timer').innerText = secondsElapsed++;
			if (secondsElapsed > 120){
				clearInterval(timer);
			}
		},1000);
	}
}

/*
* @descriptor reset timer and display
*/ 
function resetTimer(){
	clearInterval(timer);
	document.querySelector('.timer').innerText = secondsElapsed;
}

/*
* @descripto create array with duplicates
* @param {list} originalList
* @return {list} list containing duplicate element
*/
function performDuplicate(originalList){
	const duplicateList=[];

	for(let i = 0; i< originalList.length;++i){
	  duplicateList.push(originalList[i]);
	  duplicateList.push(originalList[i]);
	}
	return duplicateList; 
}


/* 
 * @descriptor setup the game
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function setupGame(){

	counter = 0;
	starsCount = 3;
	secondsElapsed = 0;
	counterDisplay.textContent = counter;

	displayNewGame(true);
	resetStars();
	resetTimer();	

	duplicateList = performDuplicate(playersList);

	const listRandom = shuffle(duplicateList);
	const deck = document.querySelector('.deck');

	deck.innerHTML = '';
	openCards = [];
	listRandom.forEach(function(player){
		deck.innerHTML += `<li class='card'>
                <i class='tile ${player}'></i>
           		</li>`;
	});
}

/*
* @descriptor display a new game
* @param {boolean} display new game else result
*/
function displayNewGame(boolean){
	if (boolean){
		document.querySelector('.container').style.display = 'flex';
		document.querySelector('.finished').style.display = 'none';
	}else{
		document.querySelector('.container').style.display = 'none';
		document.querySelector('.finished').style.display = 'flex';
	}
}


/*
* @descriptor flip and animate the card on the screen
* @param {event target} card
*/
function showCard(card){
	card.classList.add('show');
}


/*
* @descriptor Remove card from list
* @param {string} cardName
*/ 
function removeCardFromList(cardName){

	duplicateList = duplicateList.filter(function(element) {
    	return element !== cardName;
	});
}

/*
* @descritor unflip 2 cards when they do not match
* @param {string} firstCard 
* @param {string} secondCard
*/
function unflipCard(firstCard, secondCard){

let firstCardNode = document.querySelectorAll('.'+ firstCard), i;
let secondCardNode = document.querySelectorAll('.'+ secondCard), n;

	setTimeout(function(){
		for (i = 0; i < firstCardNode.length; ++i) {
				if (firstCardNode[i].classList.contains('show')){
					firstCardNode[i].classList.remove('show');
					firstCardNode[i].parentElement.classList.remove('notmatch');
				}
		}
		for (n = 0; n < secondCardNode.length; ++n) {
				if (secondCardNode[n].classList.contains('show')){
					secondCardNode[n].classList.remove('show');
					secondCardNode[n].parentElement.classList.remove('notmatch');
				}
		}
	 }, 1000);
}


/*
* @descriptor increment count of click by 1 
*/
function incrementCounter(){
	counter++;
	counterDisplay.textContent = counter;
}

/*
* @descriptor reset to 3 stars for new game
*/
function resetStars(){
	const stars = document.querySelector('.stars');
	stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
}

/*
* @descritor determinie and display star rating based on counter 
*/
function calculateStarRating(){
	const stars = document.querySelector('.stars');
	if (counter === 11 || counter === 16){
		stars.removeChild(stars.firstElementChild);
		stars.insertAdjacentHTML('beforeend',"<li><i class='fa fa-star-o'></i></li>");
		starsCount--;
	}
}

/*
* @descritor display game results
* @param {number} counter
*/
function gameFinished(counter){

				console.log('Game Finished!!');
				clearInterval(timer);

				displayNewGame(false);

				const finishedText = document.querySelector('.finished-result');

				finishedText.innerHTML = '';

				const result = document.createElement('p');

				result.textContent = `With ${counter} moves, ${starsCount} stars, and ${secondsElapsed} seconds elapsed.`;

				document.querySelector('.finished-result').append(result);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
