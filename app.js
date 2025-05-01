const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");
const newGameBtn = document.getElementById("new-game-btn");
const xWinsElement = document.getElementById("x-wins");
const oWinsElement = document.getElementById("o-wins");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let xWins = 0;
let oWins = 0;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

//  Main function when a cell is clicked
function handleMove(e) {
  if (gameOver) return;

  const index = e.target.dataset.index;

  if (board[index] === "") {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      handleWin();
    } else if (isDraw()) {
      handleDraw();
    } else {
      switchPlayer();
    }
  }
}

//  Check if current player has won
function checkWinner() {
  for (let i = 0; i < winPatterns.length; i++) {
    let [a, b, c] = winPatterns[i];

    if (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    ) {
      highlightCells(a, b, c);
      return true;
    }
  }
  return false;
}

//  Show green color on winning cells
function highlightCells(a, b, c) {
  cells[a].classList.add("bg-green-300");
  cells[b].classList.add("bg-green-300");
  cells[c].classList.add("bg-green-300");
}

//  Check if all cells are filled
function isDraw() {
  return !board.includes("");
}

//  When someone wins
function handleWin() {
  gameOver = true;
  if (currentPlayer === "X") {
    xWins++;
    xWinsElement.textContent = xWins;
  } else {
    oWins++;
    oWinsElement.textContent = oWins;
  }

  setTimeout(function () {
    alert(currentPlayer + " Wins!\nYah tu Win hy, Yah tu Learn hy!");
  }, 10);

}

//  When it's a draw
function handleDraw() {
  gameOver = true;
  setTimeout(function () {
    alert("It's a Draw!\n");
  }, 100);
}

//  Change player turn
function switchPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

//  Reset the board (keep scores)
function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;

  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("bg-green-300");
  }
}

//  Reset the board + scores
function newGame() {
  resetBoard();
  xWins = 0;
  oWins = 0;
  xWinsElement.textContent = "0";
  oWinsElement.textContent = "0";
}

//  Add event listeners
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleMove);
}
resetBtn.addEventListener("click", resetBoard);
newGameBtn.addEventListener("click", newGame);
