const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameOver = false;

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell;
    div.addEventListener('click', () => handleCellClick(index));
    board.appendChild(div);
  });
}

function handleCellClick(index) {
 if (cells[index] !== '' || gameOver) return;

  cells[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
  } else if (cells.every(cell => cell !== '')) {
    status.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

resetButton.addEventListener('click', () => {
  currentPlayer = 'X';
  cells = Array(9).fill('');
  gameOver = false;
  status.textContent = "Player X's turn";
  renderBoard();
});

renderBoard();
