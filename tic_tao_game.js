// const PLAYER_X_CLASS = "x";
// const PLAYER_O_CLASS = "circle";

// const WINNING_COMBINATIONS = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

//Pradinis palanas:
//1. Padaryti, kad paspaudus ant laukelio įdėtu X arba O
//2. Kai įdedamas X ar O tikrinti ar yra laimėtojas. WINNING_COMBINATIONS yra sąrašas kombinacijų, kurios jei atitinka laimėjo (pagalvokit kaip jis gali veikti :) taip, aš irgi užtrukau kol supratau)
//3 Kai kažkas, tai pranešti laimėtoją

//Dar padaryti, kai bus pdaryta viskas:
//lygiosios
//pradėti iš naujo
//sekti rezultatus, kas kiek kartų laimėjo (jei dar nebūsum praėję, papasakoti apie local storage, session storage)

// let cells = document.getElementsByClassName("cell");
// console.log(cells);
// let first = true;
// console.log("pries for loop");

// for (let i = 0; i < cells.length; i++) {
//   // cells[i];
//   // console.log(cells[i]);
//   cells[i].addEventListener("click", (event) => {
//     // console.log(event.target);
//     console.log(first);
//     // first = !first;
//     if (first) {
//       first = false;
//       console.log("keiciam i false");
//     } else {
//       first = true;
//       console.log("keiciam i true");
//     }
//   });
// }

// // for (i = 0; i < cells.length, i++) {
// //   console.log(cells[i]i)
// // }
// const WINNING_COMBINATIONS = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];
// let cells = document.getElementsByClassName("cell");
// let first = true;
// for (let i = 0; i < cells.length; i++) {
//   cells[i].addEventListener("click", (event) => {
//     let clickedCell = event.target;
//     // 1. ar elemntas yra tuscias, ir jei tik tuscias edame kazkoki zenkliuka X/O
//     // cia irasau X - jei true, O - jei false
//     clickedCell.textContent = first ? "X" : "O";
//     // cia irasau green - jei true, yellow - jei false
//     clickedCell.style.backgroundColor = first ? "green" : "yellow";
//     first = !first;
//   });
// }
//Pradinis palanas:
//1. Padaryti, kad paspaudus ant laukelio įdėtu X arba O
//2. Kai įdedamas X ar O tikrinti ar yra laimėtojas. WINNING_COMBINATIONS yra sąrašas kombinacijų, kurios jei atitinka laimėjo (pagalvokit kaip jis gali veikti :) taip, aš irgi užtrukau kol supratau)
//3 Kai kažkas, tai pranešti laimėtoją
//Dar padaryti, kai bus pdaryta viskas:
//lygiosios
//pradėti iš naujo
//sekti rezultatus, kas kiek kartų laimėjo (jei dar nebūsum praėję, papasakoti apie local storage, session storage)

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
