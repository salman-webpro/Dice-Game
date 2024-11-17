'use strict';

const player_1 = document.querySelector('.player--0');
const player_2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

let activePlayer = 0;
let currentScore = 0;
const finalScores = [0, 0];
dice.classList.add('hidden');

const swithPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_1.classList.toggle('player--active');
  player_2.classList.toggle('player--active');
};

const CalcCurrentScore = function () {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceNumber}.png`;
  dice.classList.remove('hidden');
  if (diceNumber === 1) {
    swithPlayer();
  } else {
    currentScore += diceNumber;
  }
};

const actionOnDiceRoll = function () {
  CalcCurrentScore();
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  console.log(currentScore);
};

const actiOnHold = function () {
  document.getElementById(`score--${activePlayer}`).textContent = finalScores[
    activePlayer
  ] += currentScore;
  if (finalScores[activePlayer] >= 50) {
    finishGame();
  } else {
    swithPlayer();
  }
  dice.classList.add('hidden');
};

const finishGame = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document.querySelector(`#name--${activePlayer}`).textContent = 'Winner 🥳';
  document.getElementById(`score--${activePlayer}`).style.color = 'white';
  btnDiceRoll.disabled = true;
  btnHold.disabled = true;
};

btnDiceRoll.addEventListener('click', actionOnDiceRoll);
btnHold.addEventListener('click', actiOnHold);

btnNewGame.addEventListener('click', function () {
  window.location.reload();
});
