$(document).ready( function() {

	var quiz;
	var quizLength = 3;

	// Initialize a new quiz
	$('.newQuizButton').click( function() {
		
		quiz = startQuiz( quizLength );

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
		
		var yourGuess = parseInt( this.id, 10 );
		var isCorrect = checkAnswer( quiz.question[ quiz.currentQuestion - 1 ], yourGuess );
		
		giveFeedbackDOM ( isCorrect, quiz, yourGuess );

		if( quiz.currentQuestion != quizLength ) {

			// quiz is still going. increment question number and update ui
			quiz.currentQuestion++;
			setCurrentQuestionDOM( quiz.currentQuestion );
			displayQuestionDOM( quiz.question[ quiz.currentQuestion - 1 ], quiz.currentQuestion );

		}
		else {

			// the quiz is over. prepare and show the end card
			displayEndQuizCardDOM( quiz.score, quizLength );

		}
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
		answers = ['How many bags do you want?', 'What kind of bag do you want?', 'How many buns do you want?', 'What kind of buns would you like?'];
		key = 2;
	}
	else if( number == 2 ) {
		questionText = "What does the following character mean?";
		chineseText = "块";
		answers = ['Piece, lump or chunk', 'A measure word for pieces, lumps or chunks', 'A measure word for money', 'All of the above'];
		key = 3;
	}
	else if( number == 3 ) {
		questionText = "Translate the following sentence:";
		chineseText = "我不太会点中餐";
		answers = ['I do not know how to order Chinese food.', 'I am not very good at ordering Chinese food.', 'I know how to order Chinese food.', 'I am very good at ordering Chinese food.'];
		key = 1;
	}
	else if( number == 4 ) {
		questionText = "What do you do when you are on a subway train and a fellow passenger says the following to you?";
		chineseText = "下车";
		answers = ['Move aside', 'Take a seat', 'Give up your seat', 'Do nothing'];
		key = 0;
	}
	else if( number == 5 ) {
		questionText = "The following sentence is incorrect. Which character would you move to make it correct?";
		chineseText = "要不要吗?";
		answers = ['First', 'Second', 'Third', 'Fourth'];
		key = 3;
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

function getEndRank ( score, possibleScore ) {

	var percentile = (score / possibleScore) * 100;

	if( percentile > 90 ) {
		return "sage";
	}
	else if( percentile >= 80 ) {
		return "master";
	}
	else if( percentile >= 70 ) {
		return "senior disciple";
	}	
	else if( percentile >= 60 ) {
		return "disciple";
	}
	else {
		return "apprentice";
	}	
		
};

// Sets stage for a new quiz
function clearOldQuizDOM() {

	$( '#questionsSection' ).children().fadeToggle( 300, 'linear' );
	$( '#questionsSection' ).children().remove();
	$( '#answersSection' ).children().fadeToggle( 300, 'linear' );
	$( '#answersSection' ).children().remove();

	if( $('#endQuizCard').css('display') != 'none' ) {
		$('#endQuizCard').fadeToggle( 300, 'linear' );
		$('body').scrollTop(0);
	}

};

// Only removes the question
function clearQuestionDOM() {

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
	
	// Build html for the question
	var	questionHTML = "<div id=\"question" + currentQuestion + "\" class=\"grid12 center card marginAbove30 padding30 hidden\">";
		questionHTML += "<div class=\"grid1 circle center\">";
		questionHTML += "<h2 class=\"centerText question colorRed\"><span class=\"chinese chineseSmall colorRed\">第</span>" + currentQuestion + "</h2></div>";
		questionHTML += "<p class=\"centerText marginAbove20\">" + question.questionText + "</p>";
		questionHTML += "<p class=\"chinese chineseBig centerText colorRed\">" + question.chineseText + "</p>";

	// Cycle through answers array and generate HTML for each
	for( var i=0; i < 4; i++ ) {
		questionHTML += "<div id=\"" + i + "answer\" class=\"marginAbove10 roundedRectangle\">";
		questionHTML += "<p class=\"centerText\">" + question.answers[i] + "</p>";
		questionHTML += "</div>";
	}

		questionHTML += "</div>";

	// Now manipulate the DOM
	$( '#questionsSection' ).append( questionHTML );
	$( '#question' + currentQuestion ).fadeToggle( 300, 'linear' );

};

function giveFeedbackDOM ( isCorrect, quiz, yourGuess ) {

	// Remove the question card
	clearQuestionDOM();

	var answerHTML = "<div id=\"answer" + quiz.currentQuestion + "\" class=\"grid12 center card marginAbove30 padding30 hidden\">";
		answerHTML += "<div class=\"grid1 circle center\">";
		answerHTML += "<h2 class=\"centerText question colorRed\"><span class=\"chinese chineseSmall colorRed\">第</span>" + quiz.currentQuestion + "</h2>";
		answerHTML += "</div>";
		answerHTML += "<p class=\"centerText marginAbove20\">" + quiz.question[ quiz.currentQuestion - 1 ].questionText + "</p>";
		answerHTML += "<p class=\"chinese chineseBig centerText colorRed\">" + quiz.question[ quiz.currentQuestion - 1 ].chineseText + "</p>";
		answerHTML += "<div class=\"marginAbove10 yourAnswer\">";
		answerHTML += "<p class=\"centerText\">" + quiz.question[ quiz.currentQuestion - 1].answers[ yourGuess ] + "</p>";
		answerHTML += "</div>";
		answerHTML += "<p class=\"centerText marginAbove20 italic\">";

	if ( isCorrect ) {
		answerHTML += "You're right! You get 10 points!";
		quiz.score += 10;
	}
	else {
		answerHTML += "You're wrong. The correct answer is \"" + quiz.question[ quiz.currentQuestion - 1].answers[ quiz.question[ quiz.currentQuestion - 1].key ] + "\".";
	}
	
		answerHTML += "</p>";
		answerHTML += "</div>";

	$( '#answersSection' ).append( answerHTML );
	$( '#answer' + quiz.currentQuestion ).fadeToggle( 300, 'linear' );

	setScoreDOM ( quiz.score );

};

function displayEndQuizCardDOM ( score, quizLength ) {

	$( '#endScore' ).text( score );
	$( '#endRank').text( getEndRank( score, (quizLength*10) ) );
	$( '#endQuizCard').fadeToggle( 300, 'linear' );

}