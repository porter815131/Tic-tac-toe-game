const CROSS_CLASS = "x";
const CIRCLE_CLASS = "o";
const cellEls = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningModal = document.getElementById("winningModal");
const winningText = document.querySelector("[data-winning]");
const restart = document.getElementById("restartButton");
// 設定勝利條件
const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let playerTurn;

gameStart();
restart.addEventListener("click", gameStart);

// 一開始就有 hover 的效果圖示，及重新開始
function gameStart() {
  playerTurn = false;
  cellEls.forEach(cell => {
    cell.classList.remove(CROSS_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", clickHandler);
    cell.addEventListener("click", clickHandler, { once: true });
  });
  setBoardHoverMark();
  winningModal.classList.remove("show");
}

// 點擊處理
function clickHandler(e) {
  const cell = e.target;
  const currentClass = playerTurn ? CIRCLE_CLASS : CROSS_CLASS;
  setMark(cell, currentClass);
  if (checkWinner(currentClass)) {
    gameOver(false);
  } else if (isDraw()) {
    gameOver(true);
  } else {
    playerSwitch();
    setBoardHoverMark();
  }
}

function gameOver(draw) {
  if (draw) {
    winningText.innerText = "平手";
  } else {
    winningText.innerText = `${playerTurn ? "圈圈" : "叉叉"} 勝利 `;
  }
  winningModal.classList.add("show");
}

// 設標誌
function setMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
// 玩家轉換
function playerSwitch() {
  playerTurn = !playerTurn;
}
// 有 hover 的圖示，以判斷是哪一方玩家
function setBoardHoverMark() {
  board.classList.remove(CROSS_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (playerTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(CROSS_CLASS);
  }
}
// 檢查勝利者
function checkWinner(currentClass) {
  return WINNING_CONDITIONS.some(condition =>
    condition.every(i => cellEls[i].classList.contains(currentClass))
  );
}
// 檢查是否平手
function isDraw() {
  return [...cellEls].every(
    cell =>
      cell.classList.contains(CIRCLE_CLASS) ||
      cell.classList.contains(CROSS_CLASS)
  );
}
