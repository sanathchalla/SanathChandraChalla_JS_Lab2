//Load the questions
//create question component which has the capability to have text,choices,answer
//create the quiz component similar to above one score,questionindex,questions(list of it)
//listeners to buttons what action to be done use clicks it
//after all the answers are added to list of questions we need show results
//show progress question 1 of 5 dynamically updating

function Question(text,choices,answer){
    this.text = text;
    this.choices=choices;
    this.answer=answer;
}
Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;
}
let questions = [
    new Question("Javascript Supports", ["Functions", "XHTML", "CSS", "HTML"], "Function"),
    new Question("Which language is used for styling web pages?", ["HTML", "Jquery", "CSS", "XML"], "CSS"),
    new Question("Which is not Javascript Framework?", ["Python Script", "Jquery", "Django", "NodeJS"], "Django"),
    new Question("Which is used to connect to DB?", ["PHP", "HTML", "JS", "ALL"], "PHP"),
    new Question("Javascript is a ",["Language", "Programming Language", "Development", "ALL"], "Programming Language"), 
];  
function Quiz(questions){
    this.score = 0;
    this.questions=questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}
Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

var quiz = new Quiz(questions);

function loadQuestions() {
    if (quiz.isEnded()) {
        showscores()
    } else {
        //show questions
        var elemnt = document.getElementById("question");
        elemnt.innerHTML = quiz.getQuestionByIndex().text;

        //showchoices
        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var ele = document.getElementById("choice" + i);
            ele.innerHTML = choices[i];

            //add listeners to the button
            handleOptionButton("btn" + i, choices[i])
        }
        showProgress()
    }
}

function showscores(){
    var quizOverHtml = "<h1>Result</h1>";
    quizOverHtml += "<h2 id='score'> Your Scores: " + quiz.score + ". And mark percentage is: " + (quiz.score/quiz.questions.length * 100) + "%" + "</h2";
    var ele = document.getElementById("quiz");
    ele.innerHTML = quizOverHtml;
}
function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

}
function handleOptionButton(id,choice){
    //get the element by id
    //add onclick listener to it
    //inside logic should evaluate the answer and increment the score and questionindex
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }

}
loadQuestions();