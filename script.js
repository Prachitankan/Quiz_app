const quizDB = [
    {
        question: "What is the full form of HTML?",
        options: ["Hello To My Land", "Hey Text Markup Language", "HyperText Makeup Language", "Hypertext Markup Language"],
        ans: 3         
    },
    {
        question: "What is the full form of css?",
        options: ["Cascading Style Sheets", "Cascading Style Sheep", "Cartoon Style Sheets", "Cascading Super Sheets"],
        ans: 0
    },
    {
        question: "What is the full form of HTTP?",
        options: ["Hypertext Transfer Product", "Hypertext Test Protocol", "Hey Transfer Protocol", "Hypertext Transfer Protocol"],
        ans: 3       
    },
    {
        question: "2+2=?",
        options: [5,4,3,2],
        ans: 1      
    }, 
   
];

const questionNo = document.querySelector(".question-no");
const question = document.querySelector(".question");
const optionContainer = document.querySelector(".option-container");
const btn = document.querySelector(".btn");
const showscore = document.querySelector(".showscore");
const quizBox = document.querySelector(".quiz-box");

const inputArea = document.querySelector(".input-area");
const inputAreaemail = document.querySelector(".input-area-email");
const start = document.querySelector(".start");

const userBox = document.querySelector(".user");
var nameText;


let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
var sum=0;

// setting up the timer function
 function startTimer(){
    let date = new Date(new Date().setTime(0));
    let time = date.getTime();
    let sec = Math.floor((time%(100*60))/1000);
    let min = Math.floor((time%(1000*60*60))/(1000*60));
    let stop = 1;
    //setting timer
    let x = setInterval(() => {
        
        if(sec < 59){
            sec++;
        }
        else{
            sec = 0;
            min++;
            if(min == stop && sec == 0){ 
                clearInterval(x);
                quizBox.classList.add("hide");

                //creating element
                const msg = document.createElement("h5");
                msg.setAttribute("class","msg");
                msg.innerHTML = `Times up! 👎`
                showscore.appendChild(msg);

                const scoreBtn = document.createElement("button");
                scoreBtn.setAttribute("class", "btn scoreBtn");
                scoreBtn.innerText = "show result";
                showscore.appendChild(scoreBtn);

                // creating click event
                scoreBtn.addEventListener("click",()=>{
                    msg.classList.add("hide");
                    scoreBtn.classList.add("hide");
                    showResult();
                });
              
            }
            else{
                min; 
            }
        }
        let formattedsec = sec < 10 ? `0${sec}`:`${sec}`;
        let formattedmin = min < 10 ? `0${min}`:`${min}`;
    
        document.querySelector(".timer").innerHTML = `${formattedmin} : ${formattedsec}`;
        console.log(formattedmin,formattedsec);
    }, 1000);
 }

const totlaQuestion = quizDB.length;


//loading quizdb into availableArray
function setAvailableQuestion(){
    quizDB.forEach(function(value){
        availableQuestion.push(value);
    });
}

function getNewQuestion(){
    //set the question no
    questionNo. innerHTML = "Question " + (questionCounter + 1) + " of " + totlaQuestion;

    //get random questions
    const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
    currentQuestion = questionIndex;
    question.innerText = (questionCounter + 1) + ". " + currentQuestion.question;

    const index1 = availableQuestion.indexOf(questionIndex);
    availableQuestion.splice(index1,1);

    //setting options
     const optionLen = currentQuestion.options.length;
     //push options into availableoptions array
     for(let i=0; i<optionLen;i++){
         availableOptions.push(i);
     }
     optionContainer.innerHTML = " ";
     for(let i=0; i<optionLen;i++) {

       //random options
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);

        // splice it so the same option does not repeat 
        availableOptions.splice(index2,1);

         //creating a div to showcase in front
        const op = document.createElement("div");
        op.innerHTML = currentQuestion.options[optionIndex];
        op.id = optionIndex;
        optionLen.className = "option";
        optionContainer.appendChild(op);

        // initializing click
        op.setAttribute("onclick","getResult(this)");
    }
   
    questionCounter++;
}
function getResult(element){
    const id = parseInt(element.id);
   
    if(id === currentQuestion.ans){
        console.log("correct");
        sum++;
        element.classList.add("correct");
    }
    else{
        console.log("wrong");
        element.classList.add("wrong");
    }
    // once user select one element they cannot deselct it or select another option
    unclickableOption();
}

function unclickableOption(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen;i++){
        optionContainer.children[i].classList.add("alreadyAnswered");
    }
}

btn.addEventListener("click", function(){
   
    if(questionCounter === quizDB.length){
        console.log(sum);
        quizBox.classList.add("hide");
        showResult();
        console.log(nameText);
         
    }
    else{
        getNewQuestion();
    }
});

function showResult(){
        const result = document.createElement("h4");
        result.setAttribute("class", "result");
         result.innerHTML = `Congratulations! <br> ${nameText} You have scored: ${sum} / ${totlaQuestion}`;
        showscore.appendChild(result); 
}
//get the user name to print 
start.addEventListener("click", function(){
    nameText = inputArea.value;
    userBox.classList.add("hide");
    quizBox.classList.remove("hide");
    startTimer();
});

//first set all ques in availabequeation
setAvailableQuestion();
//get the question
getNewQuestion();
