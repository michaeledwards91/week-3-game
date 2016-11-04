/* need variables to hold score, guesses remaining
arrays to hold possible words, letters guessed

*/

//counters
var wins = 0;
var words = ["goldfish", "guppy", "carp", "catfish", "suckermouth"];
var wordIndex = 0; 
var guessesRemaining = 10;
//
var lettersGuessed = [];
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
				'n','o','p','q','r','s','t','u','v','w','x','y','z'];
var correctLetters = [];
var currentWord = words[wordIndex];
var doneWithWord = true;

function resetGame() {
	guessesRemaining = 10;
	lettersGuessed = [];
	correctLetters = [];
	doneWithWord = true;
	currentWord = words[wordIndex];
	//reset all dom elements to starting values
	document.querySelector("#winsWrapper").innerHTML = "<p>Wins: " + wins + "</p>";
	document.querySelector("#lettersUsedWrapper").innerHTML = "<p>Letters Already Used: " + lettersGuessed + "</p>";
	document.querySelector("#guessesRemainingWrapper").innerHTML = "<p>Guesses Remaining: " + guessesRemaining + "</p>";
};

function placeUnknownLetters() {
	//first empty anything currently in letters
	document.querySelector("#letters").innerHTML = " ";
	//loop to create letters and add them to letters ul
	for (i = 0; i < currentWord.length; i++) {
		correctLetters.push(currentWord[i]);
		//create a new list item to be added to the letters ul
		var newli = document.createElement("li");
		//give it a data attribute that contains its letter
		newli.setAttribute("data-letter", currentWord.charAt(i));
		newli.setAttribute("class", "listLetters");
		//set its html to _ so that for now it displays as _
		newli.innerHTML = "_";
		//append it to letters ul
		document.querySelector("#letters").appendChild(newli);
		doneWithWord = false;
	}
	guessesRemaining = 10;
}

function updateStats() {
	document.querySelector("#lettersUsedWrapper").innerHTML = "<p>Letters already used: " + lettersGuessed + "</p>";
	document.querySelector("#guessesRemainingWrapper").innerHTML = "<p>Guesses Remaining: " + guessesRemaining + "</p>";
	document.querySelector("#winsWrapper").innerHTML = "<p>Wins: " + wins + "</p>";
}


resetGame();

/*every single time i push a key, i want to first check if i'm done with the current word.
if i'm done with the current word, then keypress should give me a new word.
if i'm not done with current word, then keypress should check against the current word and
reveal a letter on hit, or add the incorrect letter to letters guessed section. */

document.onkeyup = function(event) {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase(); //this var holds the key that user pressed
	console.log(userInput);
	//initialize game
	console.log(correctLetters);
	if (doneWithWord === true) {
		placeUnknownLetters();
	} else if (doneWithWord === false) {
		//iterate through current word
		var gotHit = false;
		for (i = 0; i < currentWord.length; i++) {
			//check if user input matches
			if (userInput === currentWord[i]) {
				//if it does, change the corresponding li html to the user input
				document.querySelector("[data-letter="+currentWord[i]+"]").innerHTML = currentWord[i];
				document.querySelector("[data-letter="+currentWord[i]+"]").setAttribute("class", "found");
				//update gotHit
				gotHit = true;
			}
		}
		//if user didnt get a hit and the guessed letter isnt already in letters guessed array
		if (gotHit === false && lettersGuessed.indexOf(userInput) < 0) {
			guessesRemaining--;
			lettersGuessed.push(" " + userInput);
		}
		//if guesses remaining is 0 
		if (guessesRemaining === 0) {
			alert("You lost");
			wordIndex++;
			resetGame();
		} else if (document.querySelector(".listLetters") === null) {
			wins++;
			wordIndex++;
			resetGame();
		}
		console.log("guesses remaining: " + guessesRemaining);
		console.log("letters guessed: " + lettersGuessed);
		console.log("word index is: " + wordIndex);
		console.log("done with word: " + doneWithWord);
		updateStats();
	}
	
	//for loop, append an _ li in letters ul for each character that isnt a space in currentWord?

	//use loop to iterate through characters of currentWord and push them into correctLetters array?
	//test user input against correctLetters array, if match then change li to the found letter?

}