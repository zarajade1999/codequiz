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
var score=0;
var highScoreArr=[];
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


 // function to start quiz
 function startQuiz () {
    if(index === myQuestions.length){
        endQuiz() // checks that the length is equal to the index, using index to move to the next question
    }

    startButton.style.display="none"
   quizContainer.classList.replace("hide","show") //classList gives us back a list of all the classes, 'replace' allows us to replace anything called 'hide' or 'show


    questionEl.textContent=myQuestions[index].question; 
    answerbtns.innerHTML="";
     // This means you can pass entire html tags, it clears the tags for the next question 
    for (let i = 0; i < myQuestions[index].answers.length; i++) { 
        var quizbtn = myQuestions[index].answers[i]
        
        // Creates a loop so through the answers for each question so i can create a button
        var btn= document.createElement("button")
        btn.setAttribute("class", "quizbtn");
        btn.setAttribute('value',quizbtn);
        btn.textContent= quizbtn;
        btn.onclick=checkAnswer; //needed to call the function to fix
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
function checkAnswer(event){
    var answerEl = event.target
    if(answerEl.value == myQuestions[index].correct){ // Anything with .correct will match the question array
    answerStatus.textContent="Correct!";
    answerStatus.style.color="green";
    setTimeout(function() { // Preventing a code from running for a specific amount of time 
     answerStatus.innerHTML="";
     index++;
     score++;
     startQuiz()
    },1200) // Adds a delay so you can see the question you have answered

    }else{ // Shows when the person has got an answer incorrect and takes the timer down by 5 seconds
        answerStatus.textContent="Incorrect!"
        answerStatus.style.color="red"
        setTimeout(function(){
        answerStatus.innerHTML=""
        index++;
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
        highScoreArr.push(userObj) // push is when you want to add item to the end of array
        localStorage.setItem("highScores", JSON.stringify(highScoreArr)) //turns the object back into a string
        window.location.assign("scorePage.html") //helps redirect to another html page
    }
}
  
// button to start quiz with keyboard event
startButton.addEventListener("click", function() {
    startQuiz()
    setTimeLeft()
});  

answerbtns.addEventListener("click", function() {
    var userChoice= this.event.target.textContent
    checkAnswer(userChoice);
})
submitBtn.addEventListener("click", storage)


