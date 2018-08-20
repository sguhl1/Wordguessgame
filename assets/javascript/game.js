
var $wordspace = document.getElementById("wordspace");
var $guessed = document.getElementById("guessed");
var $remaining = document.getElementById("remaining");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

var composers = ["Brahms","Beethoven","Bach","Mozart","Schubert"];
var wins = 0;
var losses = 0;
var remaining = 13;
var gameRunning = false;
var pickedcomposer = "";
var pickedcomposerarray = [];
var guessedLetters = [];
var incorrectletters = [];

  
function newGame() {
  gameRunning = true;
  remaining = 13;
  guessedLetters = [];
  incorrectletters = [];
  pickedcomposerarray = [];
  

  pickedcomposer = composers[Math.floor(Math.random() * composers.length)];

  for (var i = 0; i < pickedcomposer.length; i++) {
    if (pickedcomposer[i] === " ") {
      pickedcomposerarray.push(" ");
    } else {
      pickedcomposerarray.push("_");
    }
  }
  $remaining.textContent = remaining;
  $wordspace.textContent = pickedcomposerarray.join("");
  $guessed.textContent = incorrectletters;
}

function letterGuess(letter) {
  if (gameRunning === true && guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    for (var i = 0; i < pickedcomposer.length; i++) {
      if (pickedcomposer[i].toLowerCase() === letter.toLowerCase()) {
        pickedcomposerarray[i] = pickedcomposer[i];
      }
    }
    $wordspace.textContent = pickedcomposerarray.join("");
    checkIncorrect(letter);

  }
  else {
    if (!gameRunning) {
      alert("The game isn't running");
    } else {
      alert("You've already guessed this letter");
    }
  }
}

function checkIncorrect(letter) {
  if (pickedcomposerarray.indexOf(letter.toLowerCase()) === -1 && pickedcomposerarray.indexOf(letter.toUpperCase()) === -1) {
  remaining--;
  incorrectletters.push(letter);
  $guessed.textContent = incorrectletters.join(" ");
  $remaining.textContent = remaining;
  }
  checkWin();
}
function checkWin() {
  if (pickedcomposer.toLowerCase() === pickedcomposerarray.join(" ").toLowerCase())
  {
    wins++;
    gameRunning = false;
    $wins.textContent = wins;
  }
  checkLoss();
}
function checkLoss() {
  if (remaining === 0) {
    losses++;
    gameRunning = false;
    $losses.textContent = losses;
    $wordspace.textContent = wordspace;
  } 
  
}




document.addEventListener("keyup", function (e) {
  if (13 == e.keyCode) {
      newGame()
    }
  }
); 
  

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
    
  }
}

