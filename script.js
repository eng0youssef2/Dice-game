'use strict';
let totalS1 = Number(document.querySelector("#score--0").textContent);
let totalS2 = Number(document.querySelector("#score--1").textContent);
let currentS = Number(document.querySelector("#current--0").textContent);
let activePlayer = 0;
const dice = document.querySelector(".dice");

function switchPlayer() {
    currentS = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentS;
    if (activePlayer === 0) {
        activePlayer = 1;
        document.querySelector(`.player--0`).classList.remove("player--active");
        document.querySelector(`.player--1`).classList.add("player--active");
    }
    else {
        activePlayer = 0;
        document.querySelector(`.player--1`).classList.remove("player--active");
        document.querySelector(`.player--0`).classList.add("player--active");
    }
}
function Winer() {
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    dice.classList.add('hidden');
    document.querySelector('.btn--roll').classList.add("hidden");
    document.querySelector('.btn--hold').classList.add("hidden");
}
function roll() {
    dice.classList.remove('hidden');
    let random = Math.trunc(Math.random() * 6 + 1);
    if (random !== 1) {
        dice.src = `dice-${random}.png`;

        if (activePlayer === 0) {
            currentS += random;
            document.querySelector(`#current--${activePlayer}`).textContent = currentS;
        } else {
            currentS += random;
            document.querySelector(`#current--${activePlayer}`).textContent = currentS;
        }
    }
    else {
        dice.src = `dice-${random}.png`;
        switchPlayer();
    }
}
function hold() {
    if (activePlayer === 0) {
        totalS1 += currentS;
        if (totalS1 >= 30) {
            Winer();
            document.querySelector(`#score--0`).textContent = totalS1;
        }
        else {
            switchPlayer();
            document.querySelector(`#score--0`).textContent = totalS1;
        }
    }
    else {
        totalS2 += currentS;
        if (totalS2 >= 30) {
            Winer();
            document.querySelector(`#score--1`).textContent = totalS2;
        }
        else {
            switchPlayer();
            document.querySelector(`#score--1`).textContent = totalS2;
        }
    }
}
function newGame() {
    totalS1 = 0;
    totalS2 = 0;
    currentS = 0;
    if (activePlayer === 1) {
        document.querySelector(`.player--1`).classList.remove("player--winner");
        switchPlayer();
    }
    else {
        document.querySelector(`.player--0`).classList.remove("player--winner");
        document.querySelector(`.player--0`).classList.add("player--active");
    }
    document.querySelector(`#score--0`).textContent = totalS1;
    document.querySelector(`#score--1`).textContent = totalS1;
    document.querySelector(`#current--0`).textContent = currentS;
    document.querySelector(`#current--1`).textContent = currentS;
    dice.classList.add('hidden');
    document.querySelector('.btn--roll').classList.remove('hidden');
    document.querySelector('.btn--hold').classList.remove('hidden');
}

document.querySelector('.btn--roll').addEventListener('click', roll);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', newGame);
