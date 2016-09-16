var Inquirer = require('inquirer');
var Game = require('./game.js');
var Word = require('./word.js');
var Letter = require('./letter.js');
var wordchoice = ["Audi", "Mercedes", "BMW", "Porsche", "Ferrari", "Lamborghini", "Maserati", "Nissan", "Toyota", "Lexus", "Mazda", "Infinity", "Hyundai", "Kia", "Ford", "GM", "volkswagen", "chevrolet", "subaru"];
var wordchoice2 = [""]

var hangman = function(){
  this.wordInPlay = null;
	this.lettersOfTheWord = [];
	this.matchedLetters = [];
	this.guessedLetters = [];
	this.guessesLeft = 0;
	this.totalGuesses = 0;
	this.letterGuessed = null;
	this.wins = 0;
	this.wordDisplay = null;

  this.setupGame =  function (wordPick){
    this.wordGameObj = new Game(wordPick);
		this.wordInPlay = this.wordGameObj.wordRandom;
		this.lettersOfTheWord = this.wordInPlay.split('');


    this.RebuildWordViewObj = new Letter(this.lettersOfTheWord, this.matchedLetters);
    this.wordDisplay = this.RebuildWordViewObj.wordDisplay;
    this.processUpdateTotalGuesses();
  };


  this.updatePage = function(letter) {
		if (this.guessesLeft == 0){
			this.restartGame();
			console.log("over");
    }else{
			// this.updateGuesses(letter);
			this.guessesObj = new Word.UpdateGuesses(letter, this.guessedLetters, this.lettersOfTheWord, this.guessesLeft);
			this.letterGuessed = this.guessesObj.guessedLetter;
			this.guessedLetters.push(this.guessesObj.guessedLetter);
			this.guessesLeft = this.guessesObj.guessesLeft;
			// this.updateMatchedLetters(letter);
			this.matchedObj = new Word.UpdateMatchedLetters(letter, this.lettersOfTheWord, this.matchedLetters);
			this.matchedLetters.push(this.matchedObj.matchedLetter);

			// this.rebuildWordView();
			this.wordviewObj = new Letter(this.lettersOfTheWord, this.matchedLetters);
			this.wordDisplay = this.wordviewObj.wordDisplay;

			if (this.updateWins() == true){
				this.restartGame();
			}

		}

	};





  this.processUpdateTotalGuesses = function() {
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;


      console.log('Guess a car brand');
  };





  this.restartGame = function(){
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  }

  this.updateWins = function() {



    if (this.matchedLetters.length == 0){
      var win = false;
    }else{
      var win = true
    }

    for (var i=0; i < this.lettersOfTheWord.length; i++){
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) == -1){
        win = false;
      }
    }

    if (win == true){
      this.wins =  this.wins + 1;


      return true;
    }else{
      return false;
    }
  }
  };




  var play = new hangman();

  play.setupGame(wordchoice);

  // console.log('play after setup', play);

  // play.updatePage("a"); // hard code to simulate user input.

  // console.log('play after update: ', play);

  var playCount = play.totalGuesses;

  var count = 0;

  var letsPlay = function(){

  if (count < playCount) {
    Inquirer.prompt([{
      name : "name",
      message : "Wins: " + play.wins + "| Guesses Allowed: " + play.totalGuesses + "| Guesses Left: " + play.guessesLeft + "| Car Brand: " + play.wordDisplay
    }]).then(function(answers) {
      play.updatePage(answers.name);

        count++;
        letsPlay();
      // }
    })
  }else {
    console.log('over');
  }
  }

  letsPlay();
