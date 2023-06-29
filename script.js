"use strict";

const $ = document;

const btnNew = $.querySelector(".btn--new");
const btnHold = $.querySelector(".btn--hold");
const btnRoll = $.querySelector(".btn--roll");
const diceEl = $.querySelector(".dice");
const current0El = $.getElementById("current--0");
const current1El = $.getElementById("current--1");
const score0El = $.getElementById("score--0");
const score1El = $.getElementById("score--1");
const player0El = $.querySelector(".player--0");
const player1El = $.querySelector(".player--1");
const diceSound = new Audio("./sound effect/sound dice.mp3");
const holdSound = new Audio("./sound effect/soundhold.wav");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  $.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  diceSound.currentTime = 0;
  diceSound.play();
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `./image/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      $.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  holdSound.currentTime = 0;
  holdSound.play();
  if (playing) {
    if (currentScore) {
      scores[activePlayer] += currentScore;
      $.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add("hidden");

        $.querySelector(`.player--${activePlayer}`).classList.remove(
          "player--active"
        );

        $.querySelector(`.player--${activePlayer}`).classList.add(
          "player--winner"
        );
      } else {
        switchPlayer();
      }
    }
  }
});

btnNew.addEventListener("click", init);
