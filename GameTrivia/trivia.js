"use strict";

const getElement = selector => document.querySelector(selector);

//DOM elements
const startButton = document.querySelector("#start-btn")
const addButton = document.querySelector("#adding-btn")
const questionHeader = document.querySelector(".placeholder")
const answerLabels = document.querySelectorAll(".answer .label")
const answerContainers = document.querySelectorAll(".answer")

//Game stats
let gameQuestions = [];
let currentIndex = 0;
let score = 0;
let toggleButtons = true;

//Big questions variable 
let questions = [
    {
        question: "What color is Pikachu from Pokemon?",
        options: ["Blue", "Orange", "Yellow", "Black"],
        answer: "Yellow"
    },
    {
        question: "What is the most sold video game of all time?",
        options: ["Minecraft", "Persona 5", "GTA 5", "Skyrim"],
        answer: "Minecraft"
    },
    {
        question: "What console does Sony make?",
        options: ["Switch", "Steam Deck", "Xbox", "Playstation"],
        answer: "Playstation"
    },
    {
        question: "What was the first video game ever created?",
        options: ["Tennis for Two", "Donkey Kong", "Super Mario Bros", "Pong"],
        answer: "Tennis for Two"
    },
    {
        question: "Which was the first ever video game console ever made and sold commercially?",
        options: ["NES (Nintendo Entertainment System)", "Magnavox Odyssey", "Atari", "Gameboy"],
        answer: "Magnavox Odyssey"
    },
    {
        question: "What is Sonics signature ability?",
        options: ["To cast magic powers", "To jump high and stomp on enemies", "To run really fast", "To play poker really well"],
        answer: "To run really fast"
    },
    {
        question: "What is Marios profession?",
        options: ["Chef", "Accountant", "Plumber", "Prince"],
        answer: "Plumber"
    },
    {
        question: "Which of these video game series is known to be very hard?",
        options: ["Dark Souls", "Kirby", "Minecraft", "Mario"],
        answer: "Dark Souls"
    },
    {
        question: "Which game first introduced the character Waluigi?",
        options: ["Mario Party 3", "Mario Tennis", "Mario Kart: Double Dash", "Super Smash Bros Melee"],
        answer: "Mario Tennis"
    },
    {
        question: "What color is most associated with Nintendos brand?",
        options: ["Dark Blue", "Green", "Yellow", "Red"],
        answer: "Red"
    },
    {
        question: "Which of the following is NOT a Nintendo console?",
        options: ["Switch", "Gamecube", "Xbox", "Wii"],
        answer: "Xbox"
    },
    {
        question: "What is the name of the princess that Mario rescues time and time again?",
        options: ["Peach", "Zelda", "Samus", "Daisy"],
        answer: "Peach"
    },
    {
        question: "Which is the most popular puzzle game of all time?",
        options: ["Warios woods", "Picross", "Dr.Mario", "Tetris"],
        answer: "Tetris"
    },
    {
        question: "What item does Mario use to power up?",
        options: ["Chaos Emeralds", "Mushroom", "Diamond sword", "Soul"],
        answer: "Mushroom"
    },
    {
        question: "Which of the following is NOT a character from Team Fortress 2?",
        options: ["The Scout", "The Medic", "The Knight", "The Spy"],
        answer: "The Knight"
    }
]

function getQuestions(questions, num = 10) {
    const shuffle = [...questions]
    for (let i = shuffle.length - 1; i > 0; i--) {
        const position = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[position]] = [shuffle[position], shuffle[i]]
    }
    return shuffle.slice(0, num)
};

//Starting the game
startButton.addEventListener("click", startGame);


function startGame() {
    gameQuestions = getQuestions(questions, 10);
    currentIndex = 0;
    score = 0;
    
    startButton.style.display = "none";
    addButton.style.display = "none"
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
    answerContainers.forEach(btn => (btn.onclick = null));
    // if (toggleButtons) {
    //     addButton.addEventListener("click", startGame);
    // } else {
    //     startButton.addEventListener("click", startGame)
    // }
}