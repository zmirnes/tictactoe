"use strict";

class Game {
  constructor(gameContainer, fields, winnerText, currentPlayerText, resetBtn) {
    this.fields = fields;
    this.winnerText = winnerText;
    console.log(this.winnerText);
    this.currentPlayerText = currentPlayerText;
    this.currPlayer = "Player 1(X)";
    this.resetBtn = resetBtn;
    this.placeChar();
    this.xInputs = [];
    this.oInputs = [];
    this.winCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
  }

  placeChar() {
    this.fields.forEach((field) => {
      field.addEventListener("click", () => {
        field.style.pointerEvents = "none";
        if (this.currPlayer === "Player 1(X)") {
          field.innerText = "X";
          this.xInputs.push(Number(field.getAttribute("value")));
          this.checkForWin(this.xInputs);
          if (this.xInputs.length === 5) {
            this.finishGame();
            this.winnerText.innerText = "Neriješeno!";
          }
          this.changePlayer();
        } else if (this.currPlayer === "Player 2(O)") {
          field.innerText = "O";
          this.oInputs.push(Number(field.getAttribute("value")));
          this.checkForWin(this.oInputs);
          this.changePlayer();
        }
      });
    });
  }

  checkForWin(playerInputs) {
    this.winCombinations.forEach((combination) => {
      if (combination.every((number) => playerInputs.includes(number))) {
        this.finishGame();
      }
    });
  }

  finishGame() {
    gameContainer.style.opacity = "0.5";
    fields.forEach((field) => (field.style.pointerEvents = "none"));
    this.winnerText.innerText = `${this.currPlayer} WINN`;
  }

  changePlayer() {
    if (this.currPlayer === "Player 1(X)") {
      this.currPlayer = "Player 2(O)";
      this.currentPlayerText.innerText = `${this.currPlayer} turn!`;
    } else {
      this.currPlayer = "Player 1(X)";
      this.currentPlayerText.innerText = `${this.currPlayer} turn!`;
    }
  }

  resetGame() {
    gameContainer.style.opacity = "1";
    this.fields.forEach((field) => {
      field.textContent = "";
      field.style.pointerEvents = "auto";
    });
    this.winner = undefined;
    this.winnerText.innerText = "TicTacToe Game";
    this.currPlayer = "Player 1(X)";
    this.currentPlayerText.innerText = `${this.currPlayer} turn!`;
    this.xInputs = [];
    this.oInputs = [];
  }
}

const fields = document.querySelectorAll("[data-field]");
const resetBtn = document.querySelector(".reset-game");
const winnerText = document.querySelector(".winner");
const currentPlayerText = document.querySelector(".current-player");
const gameContainer = document.querySelector(".game");

const game = new Game(
  gameContainer,
  fields,
  winnerText,
  currentPlayerText,
  resetBtn
);

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  game.resetGame();
});
