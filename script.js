
// All the variables
var start = document.getElementById("start");
var introduction = document.querySelector("#intro");
var next = document.getElementById("choices");
var question = document.getElementById("question");
var quiz = document.getElementById("quiz");
var answer1 = document.getElementById("A");
var answer2 = document.getElementById("B");
var answer3 = document.getElementById("C");
var answer4 = document.getElementById("D");
var message = document.getElementById("justify");
var form = document.getElementById("form");
var display = document.getElementById("submit");
var scorelist = document.getElementById("scorelist");
var user = document.getElementById("name");
var alertuser = document.getElementById("alert");
var clear = document.getElementById("clear");
var goback = document.getElementById("goback");
var timerdisplay = document.getElementById("seconds");
var storescorelist = document.getElementById("userlist");
var viewscorehistory = document.getElementById("score");
var isanswerselected = false;
var showingscorelist = true;
var totalSeconds = 75;
var interval;
var questioncount = 0;
var lastQuestion = questions.length - 1;
var score = 0;
var time;
var viewattempt = [];

// Hide the result list
scorelist.style.display = "none";


 
// Where quiz starts
start.addEventListener("click", function(){
    startquiz();
    startTimer(); 
    showingscorelist = false;
    //hide attempt list
    storescorelist.style.display = "none";
})

// Make the time starts counting down
function startTimer() {
  interval = setInterval(function() {
  totalSeconds--;
  timerdisplay.textContent = " " + totalSeconds;

// If the user is not finish but time is up 
if(questioncount <= lastQuestion && totalSeconds === 0){
    clearInterval(interval);
    alert("You are out of time! Please try again");
    scorerender();
}
}, 1000);

};

// Printing the question and answers from question object
function renderQuestion(){
var q =  questions[questioncount]; 
    question.innerHTML = q.title;
    answer1.innerHTML = q.choices[0];
    answer2.innerHTML = q.choices[1];
    answer3.innerHTML = q.choices[2];
    answer4.innerHTML = q.choices[3];
    message.style.display = "none";
    clearInterval(time);
};


// Start quiz 
function startquiz (){
    start.style.display = "none";
    introduction.style.display = "none";
    quiz.style.display = "block";
    renderQuestion();
};

// Next question
next.addEventListener("click", function(event) {
event.preventDefault();

// User only can select once
if (isanswerselected){
    alert ("You only can select one time");
    return; 
}

isanswerselected =  true;

// Checking answer is correct or not
if(event.target.matches("button")) {
    checkAnswer(event.target.innerHTML);
}
});

// Checking answer function
function checkAnswer (answer){
    console.log(answer);
    if(answer === questions[questioncount].answer){
        // Answer is correct
        score++;
        answerIsCorrect();
    }else{
        // Answer is wrong and minus 10 seconds as penalty
        answerIsWrong(); 
        totalSeconds-=10;
    }
    time = setInterval(nextquestion, 1000); 
};

// Next question function
function nextquestion() {
    isanswerselected =  false;
    // Continue to next question 
    if(questioncount < lastQuestion){
        questioncount++;
        clearInterval(time);
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(interval);
        scorerender();
    }
};

// Answer is correct
function answerIsCorrect(){
    message.style.display = "block";
    message.textContent = "Correct";
};

// Answer is Wrong
function answerIsWrong(){
    message.style.display = "block";
    message.textContent = "Wrong";
};


// Displaying socre
function scorerender(){
    quiz.style.display = "none";
    form.style.display = "block";
    message.style.display = "block";
    message.textContent = "Your score is: " + score;  
};

viewscorehistory.addEventListener("click", function(){

if (showingscorelist == true) {
    viewscore(); 
    
for (var i = 0; i < viewattempt.length; i++) {
    var list = viewattempt[i];
    var li = document.createElement("li");
    li.textContent = list.name + ":" + list.userscore;
    storescorelist.appendChild(li); 
    storescorelist.style.display = "block";
};
       // localStorage.removeItem("user");
}
    showingscorelist = false;
});

//display error message if the User name is blank
function displayMessage(type, message){
    alertuser.textContent = message;
    alertuser.setAttribute("class", type);
};

function viewscore() {
    var storedscore = JSON.parse(localStorage.getItem("user"));
    if (storedscore !== null) {
        viewattempt.push(storedscore);
      }  
};


// Printing username and score to a list
display.addEventListener("click", function(event){
    event.preventDefault(); 
var username = user.value;   
showingscorelist = true;
if (username !== ""){
    clear.style.display = "block";
    goback.style.display = "block";
    scorelist.style.display = "block";
    alertuser.textContent = "";
    form.innerHTML = "";
    var li = document.createElement("li");
    li.textContent = username + ": " + score +" point(s)";
    scorelist.appendChild(li);    
} else {  
    displayMessage("error","Name cannot be blank!");
    return false;
}

// Storing attempt
var attempt = {
    name: username,
    userscore: score,
};

console.log(attempt);

localStorage.setItem("user", JSON.stringify(attempt));

});

// Clear the list
clear.addEventListener("click", function(){
    scorelist.innerHTML="";
    scorelist.style.display = "none";
    message.style.display = "none";
});

// Reload the quiz
goback.addEventListener("click", function(){
    location.reload();
    showingscorelist = true;
})
