
var ChosenWord = function(wordsToPick){
	this.wordRandom = wordsToPick[Math.floor(Math.random() * wordsToPick.length)];
}

module.exports = ChosenWord;
