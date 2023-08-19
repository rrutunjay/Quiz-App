const questions = [
    {
        question: "Which one of the following also known as Conditional Expression:",
        answers: [
            { text: "Alternative to if-else", correct: false}, 
            { text: "Switch statement", correct: false},
            { text: "If-then-else statement", correct: false}, 
            { text: "immediate if", correct: true}
        ]
        
    },
    {
        question: "Which one of the following is the correct way for calling the JavaScript code?",
        answers: [
            { text: "Preprocessor", correct: false}, 
            { text: "Triggering Event", correct: false},
            { text: "Function/Method", correct: true}, 
            { text: "RMI", correct: false}
        ]
        
    },
    {
        question: "In the JavaScript, which one of the following is not considered as an error:",
        answers: [
            { text: "Syntax error", correct: false}, 
            { text: "Missing of semicolons", correct: false},
            { text: "Division by zero", correct: true}, 
            { text: "Missing of Bracket", correct: false}
        ]
        
    },
    {
        question: " Which of the following number object function returns the value of the number?",
        answers: [
            { text: "toString()", correct: false}, 
            { text: "valueOf()", correct: true},
            { text: "toLocaleString()", correct: false}, 
            { text: "toPrecision()", correct: false}
        ]
        
    },
    {
        question: "Which one of the following operator is used to check weather a specific property exists or not:",
        answers: [
            { text: "Exists", correct: false}, 
            { text: "exist", correct: false},
            { text: "within", correct: false}, 
            { text: "in", correct: true}
        ]
        
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
