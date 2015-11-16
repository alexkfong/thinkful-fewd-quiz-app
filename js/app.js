$(document).ready( function() {

	var quiz;

	// Initialize a new quiz
	$('.newQuizButton').click( function() {
		console.log("New quiz started!");
		quiz = startQuiz(3);

		console.log( quiz );
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

	return {
		numberOfQuestions: numberOfQuestions,
		currentQuestion: currentQuestion,
		score: score,
		question: question
	};
};

function getQuestions( quizLength ) {
	
	var questionBank = [];
	var randomNumber = [];

	for( var i=0; i < quizLength; i++ ) {

		
		
		questionBank[i] = makeQuestion( randomNumber[i] );
		console.log( questionBank[i]);

	}

	return questionBank;

};

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


	return {
		questionText: questionText,
		answers: answers
	};
};