var RebuildWordView = function(lettersOfTheWord, matchedLetters) {
	this.wordDisplay = "";

	for(var i=0; i < lettersOfTheWord.length; i++){
		if (matchedLetters.indexOf(lettersOfTheWord[i]) != -1){
			this.wordDisplay += lettersOfTheWord[i];
		}else{
			this.wordDisplay += ' _ ';
		}
	}

}

module.exports = RebuildWordView;
