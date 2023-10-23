var startButton = document.querySelector(".start-button"); 
var timerCountEl = document.querySelector("#timer"); 
var questionEl = document.getElementById("question"); 
var quizContainer=document.querySelector(".quiz-container")
var answerbtns= document.querySelector(".answer-btns")
var answerStatus= document.querySelector(".answer-status")
var inputForm= document.querySelector(".input-form")
var userInput= document.querySelector("#initials-input")
var submitBtn=document.getElementById("submit-btn")
var timer;
var timerCountdown = 60;
var index=0;
var score=0
var highScoreArr=[]

 // function to start quiz
 function startQuiz () {
    if(index === myQuestions.length){
        endQuiz()
    }

    startButton.style.display="none"
   quizContainer.classList.replace("hide","show")

    questionEl.textContent=myQuestions[index].question
    answerbtns.innerHTML=""
    for (let i = 0; i < myQuestions[index].answers.length; i++) {
        const btn= document.createElement("button")
        btn.setAttribute("class", "quiz-btn")
        btn.textContent=myQuestions[index].answers[i]
        answerbtns.append(btn)
        
    }
}
    
// function to start timer
function setTimeLeft() {
    timer = setInterval(function() {  //This defines the timer and gives it a value
        timerCountdown--;
        timerCountEl.textContent = timerCountdown;
if(timerCountdown == 0) {
    endQuiz()
}
    }, 1000);
}
function checkAnswer(answer){
    answerStatus.textContent="Correct!"
    answerStatus.style.color="green"
    if(answer === myQuestions[index].correct){
        setTimeout(()=>{
         answerStatus.innerHTML=""
        index++
        score++
        startQuiz()
    },1200)

    }else{ // Shows when the person has got an answer incorrect and takes the timer down by 5 seconds
        answerStatus.textContent="Incorrect!"
        answerStatus.style.color="red"
        setTimeout(()=>{
        answerStatus.innerHTML=""
        index++
        timerCountdown-=5
        startQuiz()
    },1200)
    }

}
function endQuiz(){
    clearInterval(timer);
    quizContainer.style.display="none"
    inputForm.classList.replace("hide", "show")

}
// function to store the persons high score locally 
function storage(){
    var initials =userInput.value
    if(initials !== ""){
        highScoreArr=JSON.parse(localStorage.getItem("highScores")) || []

        var userObj={
            initials:initials,
            score:score
        }
        highScoreArr.push(userObj) 
        localStorage.setItem("highScores", JSON.stringify(highScoreArr)) //turns the object back into a string
        window.location.assign("scorePage.html")
    }
}
  
// button to start quiz with keyboard event
startButton.addEventListener("click", ()=>{
    startQuiz()
    setTimeLeft()
});  

answerbtns.addEventListener("click", ()=>{
    var userChoice= this.event.target.textContent
    checkAnswer(userChoice);
})
submitBtn.addEventListener("click", storage)

// Variable with property and value (the question) and the code that shows the correct answer
var myQuestions = [
    {
        question: "What is a function?", 
        answers: [
          "A container for storing information",
           "A data type", 
             "A block of code designed to perform a particular task", 
             "A collection of properties"

        ],
        correct:"A block of code designed to perform a particular task"
    },
    {   question: "What kind of programming language is Javascript?", 
    answers: [
       "Both",
         "A server side", 
         "A client side", 

        ],
        correct:"Both"
    },
    
    {   question: "What is NOT a datatype supported by Javascript", 
    answers: [
       "Function",
         "Boolean", 
         "String", 

        ],
        correct:"Function"
    },
    {   question: "Is Javascript a case sensitive language?", 
    answers: [
       "Yes",
         "No", 

        ],
        correct:"Yes"
    },
    {   question: "What is NOT a scope of a variable in Javascript?", 
    answers: [
       "Global",
         "Local", 
        "Inner"
        ],
        correct:"Inner"
    },
];
