$(document).ready( function() {

	var quiz;

	// Initialize a new quiz
	$('.newQuizButton').click( function() {
		console.log("New quiz started!");
		quiz = startQuiz(3);

		console.log( quiz );

		quiz.incrementScore (5);
	});

});

// Random number will be used to generate a random selection of questions
function randomQuestionNumber (minimum, maximum) {

	randomNumber = Math.floor( Math.random() * (maximum - minimum + 1)) + minimum; 
	return randomNumber;

};

// Starts a new quiz
function startQuiz( quizLength ) {
	var numberOfQuestions = quizLength;
	var currentQuestion = 1;
	var score = 0;
	var question = getQuestions( quizLength );

	// helper function increments score in the quiz and
	// makes a call to update the DOM
	function incrementScore ( scoreIncrement ) {
		score += scoreIncrement;
		setScoreDOM( score );
	}

	// code should also reset displayed score and questions in navbar
	setScoreDOM( 0 );

	return {
		numberOfQuestions: numberOfQuestions,
		currentQuestion: currentQuestion,
		score: score,
		question: question,
		incrementScore: incrementScore
	};
};

// populates an array with randomly selected questions
function getQuestions( quizLength ) {
	
	var questionBank = [];
	var questionNumbers = [];
	var totalQuestions = 5; // pre-determined constant

	for( var i=0; i < quizLength; i++ ) {

		//The range is determined by the number of pre-coded
		//questions available.
		var randomNumber = randomQuestionNumber (1, totalQuestions);

		// if the random number isn't used, proceed. If not,
		// keep generating a random number until that case
		while ( checkRandomNumber( quizLength, randomNumber, questionNumbers ) ) {
			randomNumber = randomQuestionNumber (1, totalQuestions );
		}

		questionBank[i] = makeQuestion( randomNumber );
		questionNumbers[i] = randomNumber;
 		console.log( questionBank[i] );

	}

	return questionBank;

};

// ensures the random number for a question hasn't been used
function checkRandomNumber( quizLength, randomNumber, questionNumbers ) {

	var numberWasUsed = false;

	for( var i=0; i < quizLength; i++ ) {
		if( questionNumbers[i] == randomNumber ) {
			numberWasUsed = true;
		}
	}

	return numberWasUsed;

}

// makeQuestion receives a random number and returns a 
// pre-written quiz question based on that number
function makeQuestion( number ) {

	var questionText;
	var answers;

	if( number == 1 ) {
		questionText = "This is test question 1 here";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
	}
	else if( number == 2 ) {
		questionText = "This is a test question 2 here";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
	}
	else if( number == 3 ) {
		questionText = "This is a test question 3 here";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
	}
	else if( number == 4 ) {
		questionText = "This is a test question 4 here";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
	}
	else if( number == 5 ) {
		questionText = "This is a test question 5 here";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
	}

	return {
		questionText: questionText,
		answers: answers
	};
};

//Updates the scoreboard
function setScoreDOM( score ) {

	$('#currentScore').text( score );

}