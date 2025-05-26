const SWORD_IMG = 'images/sword.png';
const RUNE_IMG = 'images/runes.png';

let board = Array(9).fill(null);
let xTurn = true;
let gameActive = true;
let scores = { X: 0, O: 0, D: 0 };

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const boardDiv = document.getElementById('board');
const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');
const drawScore = document.getElementById('draw-score');
const restartBtn = document.getElementById('restart');

function renderBoard() {
  boardDiv.innerHTML = '';
  board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.dataset.index = i;
    if (cell === 'X') {
      div.innerHTML = `<img src="${SWORD_IMG}" alt="Sword">`;
    } else if (cell === 'O') {
      div.innerHTML = `<img src="${RUNE_IMG}" alt="Rune">`;
    }
    boardDiv.appendChild(div);
  });
}

function getWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell)) return 'D';
  return null;
}

function onCellClick(e) {
  const idx = e.target.closest('.cell')?.dataset.index;
  if (idx === undefined || !gameActive || board[idx]) return;
  board[idx] = xTurn ? 'X' : 'O';
  renderBoard();
  const winner = getWinner();
  if (winner) {
    gameActive = false;
    if (winner === 'D') scores.D++;
    else scores[winner]++;
    updateScores();
  } else {
    xTurn = !xTurn;
  }
}

function updateScores() {
  xScore.textContent = scores.X;
  oScore.textContent = scores.O;
  drawScore.textContent = scores.D;
}

function restartGame() {
  board = Array(9).fill(null);
  xTurn = true;
  gameActive = true;
  renderBoard();
}

boardDiv.addEventListener('click', onCellClick);
restartBtn.addEventListener('click', () => {
  gameActive = true;
  restartGame();
});

renderBoard();
updateScores();
