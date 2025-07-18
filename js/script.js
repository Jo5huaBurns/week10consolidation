//This is the JavaScript for the Tic Tac Toe game
// Get all cell elements, status display, and reset button
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// Track the board and current player
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Check for a win or draw
function checkGame() {
    // All possible winning combinations
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // columns
        [0,4,8],[2,4,6]          // diagonals
    ];
    // Check each win pattern
    for (let w of wins) {
        if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[1]] === board[w[2]]) {
            return board[w[0]]; // Return 'X' or 'O'
        }
    }
    // If no empty cells, it's a draw
    if (!board.includes('')) return 'Draw';
    return null; // Game continues
}

// When a cell is clicked
function handleCell(e) {
    const i = e.target.dataset.index;
    if (!gameActive || board[i]) return; // Ignore if game over or cell filled
    board[i] = currentPlayer; // Set board
    e.target.textContent = currentPlayer; // Show on UI

    const result = checkGame();
    if (result) {
        gameActive = false;
        status.textContent = result === 'Draw' ? "Stalemate" : `${result} wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCell));
resetBtn.addEventListener('click', resetGame);

// Set initial status
status.textContent = `Player ${currentPlayer}'s turn`;