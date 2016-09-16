exports.UpdateGuesses = function(letter, guessedLetters, lettersOfTheWord, guessesLeft){

  this.guessedLetter = null;
  this.guessesLeft = guessesLeft;
  if ((guessedLetters.indexOf(letter) == -1) && (lettersOfTheWord.indexOf(letter) == -1)){
    // this.guessedLetters.push(letter);
    this.guessedLetter = letter;
    this.guessesLeft--;

  }

};

exports.UpdateMatchedLetters = function(letter, lettersOfTheWord, matchedLetters){
  this.matchedLetter = null;
  for (var i = 0; i < lettersOfTheWord.length; i++) {
    if ((letter === lettersOfTheWord[i]) && (matchedLetters.indexOf(letter) == -1)){
      this.matchedLetter = letter;
    };
  };
};
