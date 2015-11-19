$(document).ready( function() {

	var quiz;

	// Initialize a new quiz
	$('.newQuizButton').click( function() {
		
		quiz = startQuiz(3);

		// First quiz, load the navbar
		if( $('navbar').css('display') == 'none' ) {		
			switchToQuizInterfaceDOM();
		}
		
		clearOldQuizDOM();	
		
		// load the first question here
		displayQuestionDOM( quiz.question[ quiz.currentQuestion - 1 ], quiz.currentQuestion );

	});

	// Answer to question has been clicked
	$( '#questionsSection' ).on( 'click', '.card > .roundedRectangle', function() {
		
		console.log("Answer clicked");

		var isCorrect = checkAnswer( quiz.question[ quiz.currentQuestion - 1 ], parseInt( this.id, 10 ) );

		console.log(isCorrect);

		// give feedback to the user with the answer card

		// if it's correct, increment the score

		// display the next question or the end card
	
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

	function incrementQuestion () {
		currentQuestion ++;
		setCurrentQuestionDOM( currentQuestion );
	}

	// code should also reset displayed score and questions in navbar
	setScoreDOM( 0 );
	setCurrentQuestionDOM( currentQuestion );
	setTotalQuestionsDOM( numberOfQuestions );

	return {
		numberOfQuestions: numberOfQuestions,
		currentQuestion: currentQuestion,
		score: score,
		question: question,
		incrementScore: incrementScore,
		incrementQuestion: incrementQuestion
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

};

// makeQuestion receives a random number and returns a 
// pre-written quiz question based on that number
function makeQuestion( number ) {

	var questionText;
	var chineseText;
	var answers;
	var key;

	if( number == 1 ) {
		questionText = "Translate the following sentence:";
		chineseText = "你要几个包子?";
		answers = ['How many bags do you want?', 'What kind of bag do you want?', 'How many dumplings do you want?', 'What kind of dumplings would you like?'];
		key = 2;
	}
	else if( number == 2 ) {
		questionText = "This is a test question 2 here";
		chineseText = "你要几个包子?";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
		key = 1;
	}
	else if( number == 3 ) {
		questionText = "This is a test question 3 here";
		chineseText = "你要几个包子?";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
		key = 1;
	}
	else if( number == 4 ) {
		questionText = "This is a test question 4 here";
		chineseText = "你要几个包子?";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
		key = 1;
	}
	else if( number == 5 ) {
		questionText = "This is a test question 5 here";
		chineseText = "你要几个包子?";
		answers = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
		key = 1;
	}

	return {
		questionText: questionText,
		chineseText: chineseText,
		answers: answers,
		key: key
	};
};

function checkAnswer ( question, guess ) {

	if( question.key == guess ) {
		return true;
	}
	else {
		return false;
	}

};

function clearOldQuizDOM() {

	$( '#questionsSection' ).children().fadeToggle( 300, 'linear' );
	$( '#questionsSection' ).children().remove();

};

//
function switchToQuizInterfaceDOM() {

	$('#noQuizSpace').hide();
	$('#quizSpace').show();
	$('navbar').fadeToggle( 300, 'linear');
	$('#headerStartButton').hide();
	$('#introduction').fadeToggle( 300, 'linear' );
	$('#headerNewQuizButton').fadeToggle( 300, 'linear');

}; 

//Updates the scoreboard in navbar
function setScoreDOM( score ) {

	$('#currentScore').text( score );

};

//Updates what question we're in navbar
function setCurrentQuestionDOM( currentQuestion ) {

	$('#questionNumber').text( currentQuestion );

};

//Updates the total quiz length in the navbar
function setTotalQuestionsDOM( quizLength ) {

	$('#totalQuestions').text( quizLength );

};

// Incomplete function that displays question cards
function displayQuestionDOM( question, currentQuestion ) {

	console.log( "Building question card");
	
	// Build html for the question
	var	questionHTML = "<div id=\"question" + currentQuestion + "\" class=\"grid12 center card marginAbove30 padding30 hidden\">";
		questionHTML += "<div class=\"grid1 circle center\">";
		questionHTML += "<h2 class=\"centerText question colorRed\"><span class=\"chinese chineseSmall colorRed\">第</span>" + currentQuestion + "</h2></div>";
		questionHTML += "<p class=\"centerText marginAbove20\">" + question.questionText + "</p>";
		questionHTML += "<p class=\"chinese chineseBig centerText colorRed\">" + question.chineseText + "</p>";

	for( var i=0; i < 4; i++ ) {
		questionHTML += "<div id=\"" + i + "answer\" class=\"marginAbove10 roundedRectangle\">";
		questionHTML += "<p class=\"centerText\">" + question.answers[i] + "</p>";
		questionHTML += "</div>";
	}

		questionHTML += "</div>";

	$( '#questionsSection' ).append( questionHTML );
	$( '#question' + currentQuestion ).fadeToggle( 300, 'linear' );

};