'use strict';
// prblems
// - Dice Rolls and show a random dice.
// - Assign the number on that dice to currentScore.
// - Hold button will add the current score to the main score.
// - IF Dice one appears the current score will be zero.
// - Current player switch on hold and dice one.
// - reset game.

// Solution
// - get the html elements store into variables.
// - genarate random number between 1-6.
// - if roll dice button is cliked show according dice image based on that number.
// - add the number in currentScore.
// - if hold button is clicked add the current score in main score.
// - Switch the player to the second one.
// - repeat the process for second player.
// - if the dice is 1 then the currentScore is emtied and the focus switch to he next player.
// - Whoever reach the score of 100 wins.

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
