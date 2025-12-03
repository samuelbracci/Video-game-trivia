import questions from "./trivialib.js"
"use strict";

const getElement = selector => document.querySelector(selector);

//DOM elements
const startButton = document.querySelector("#start-btn")
const addButton = document.querySelector("#adding-btn")
const questionHeader = document.querySelector(".placeholder")
const answerLabels = document.querySelectorAll(".answer .label")
const answerContainers = document.querySelectorAll(".answer")
const formArea = document.querySelector("#question-form")
const submitQuestion = document.querySelector("#submit-question")
const playAgainButton = document.querySelector("#play-again-btn")


//Game stats
let gameQuestions = [];
let currentIndex = 0;
let score = 0;

//Big questions variable 

function getQuestions(questions, num = 10) {
    const shuffle = [...questions]
    for (let i = shuffle.length - 1; i > 0; i--) {
        const position = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[position]] = [shuffle[position], shuffle[i]]
    }
    return shuffle.slice(0, num)
};

//Event listeners
addButton.addEventListener("click", () => {
    startButton.style.display = "none"
    addButton.style.display = "none"
    answerContainers.forEach(btn => btn.style.display = "none")

    formArea.style.display = "block";
})

submitQuestion.addEventListener("click", () => {
    const newQ = document.querySelector("#new-question").value.trim();
    const optA = document.querySelector("#optA").value.trim();
    const optB = document.querySelector("#optB").value.trim();
    const optC = document.querySelector("#optC").value.trim();
    const optD = document.querySelector("#optD").value.trim();
    const newAns = document.querySelector("#new-answer").value.trim();
    const options = [optA, optB, optC, optD]; //Variable to make else if easier to write

    if (!newQ || !optA || !optB || !optC || !optD || !newAns) {
        questionHeader.textContent = "Error, please fill out all spots";
        return;
    } else if (!options.includes(newAns)) {
        questionHeader.textContent = "Error, please have answer match an option"
        return;
    }

    questions.push({
        question: newQ,
        options: [optA, optB, optC, optD],
        answer: newAns
    })

    formArea.style.display = "none";
    startButton.style.display = "inline-block";
    addButton.style.display = "inline-block";
    questionHeader.textContent = "Welcome to the Video Game Trivia website!";

})

playAgainButton.addEventListener("click", () => {
    startGame();
    playAgainButton.style.display = "none";
})

//Starting the game
answerContainers.forEach(btn => btn.style.display = "none")
startButton.addEventListener("click", startGame);

function startGame() {
    gameQuestions = getQuestions(questions, 10);
    currentIndex = 0;
    score = 0;
    
    startButton.style.display = "none";
    addButton.style.display = "none"
    answerContainers.forEach(btn => btn.style.display = "inline-block");
    showQuestion()
}

function showQuestion() {
    const currentQuestion = gameQuestions[currentIndex];
    questionHeader.textContent = currentQuestion.question;
    
    currentQuestion.options.forEach((opt, i) => {
        if (answerLabels[i]) {
            answerLabels[i].textContent = opt;
            answerContainers[i].onclick = () => handleAnswer(opt);
        }
    });
}

function handleAnswer(selected) {
    const questionPick = gameQuestions[currentIndex];
    if (selected === questionPick.answer) {
        score++;
    }
    
    currentIndex++;
    if (currentIndex < gameQuestions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    questionHeader.textContent = `Game Over! You got ${score}/${gameQuestions.length} questions right!`;
    answerLabels.forEach(btn => (btn.textContent = "-----"));
    answerContainers.forEach(btn => btn.style.display = "none")
    
    playAgainButton.style.display = "inline-block";
}