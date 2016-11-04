/* need variables to hold score, guesses remaining
arrays to hold possible words, letters guessed

*/

//counters
var wins = 0;
var words = ["goldfish", "guppy", "northern pike",  "gilt-head bream", "carp", "catfish", "suckermouth", "salmon", "koi", "megalodon"];
var wordIndex = 0; 
var guessesRemaining = 10;
var deaths = 0;
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
	updateStats();
};

function placeUnknownLetters() {
	//first empty anything currently in letters
	document.querySelector("#letters").innerHTML = " ";
	//loop to create letters and add them to letters ul
	for (i = 0; i < currentWord.length; i++) {
		correctLetters.push(currentWord[i]);
		//create a new list item to be added to the letters ul
		var newli = document.createElement("li");

		if (alphabet.indexOf(currentWord[i]) >= 0) {
			//give it a data attribute that contains its letter
			newli.setAttribute("data-letter", currentWord.charAt(i));
			newli.setAttribute("class", "listLetters");
			//set its html to _ so that for now it displays as _
			newli.innerHTML = "_";
		} else {
			newli.setAttribute("data-letter", "found");
			newli.setAttribute("class", "found");
			newli.innerHTML = currentWord[i];
		}
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
	document.querySelector("#deathsWrapper").innerHTML = "<p>Deaths: " + deaths + "</p>";
	switch (guessesRemaining) {
		case 10:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman10.png");
			break;
		case 9:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman9.png");
			break;
		case 8:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman8.png");
			break;
		case 7:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman7.png");
			break;
		case 6:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman6.png");
			break;
		case 5:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman5.png");
			break;
		case 4:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman4.png");
			break;
		case 3:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman3.png");
			break;
		case 2:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman2.png");
			break;
		case 1:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman1.png");
			break;
		case 0:
			document.querySelector("#hangmanImage").setAttribute("src", "assets/images/hangman0.png");
			break;
	}
}


resetGame();

/*every single time i push a key, i want to first check if i'm done with the current word.
if i'm done with the current word, then keypress should give me a new word.
if i'm not done with current word, then keypress should check against the current word and
reveal a letter on hit, or add the incorrect letter to letters guessed section. */

document.onkeyup = function(event) {
	var userInput = String.fromCharCode(event.keyCode).toLowerCase(); //this var holds the key that user pressed
	console.log(correctLetters);
	//check to make sure user pressed a key in the alphabet, if not, game does nothing
	if (alphabet.indexOf(userInput) >= 0) {
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
					document.querySelector("[data-letter="+currentWord[i]+"]").setAttribute("data-letter", "found");
					//update gotHit
					gotHit = true;
				}
			}
			//if user didnt get a hit and the guessed letter isnt already in letters guessed array
			if (gotHit === false && lettersGuessed.indexOf(" " + userInput) < 0) {
				guessesRemaining--;
				lettersGuessed.push(" " + userInput);
			}
			//if guesses remaining is 0 
			if (guessesRemaining === 0) {
				deaths++;
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
	}
	
}