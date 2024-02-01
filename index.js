let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let gameMode = 'twoPlayers'; 

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const startGame = () => {
    if (gameMode === 'twoPlayers') {
        boxes.forEach(box => box.addEventListener('click', boxClicked));
    } else if (gameMode === 'computer') {
        boxes.forEach(box => box.addEventListener('click', boxClicked));
        if (currentPlayer === O_TEXT) {
            setTimeout(computerMove, 500); 
        }
    }
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => (boxes[box].style.backgroundColor = winnerIndicator));
        } else if (!spaces.includes(null)) {
            playerText.innerHTML = 'It\'s a tie!';
        } else {
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
            if (gameMode === 'computer' && currentPlayer === O_TEXT) {
                setTimeout(computerMove, 500); 
            }
        }
    }
   
}

function computerMove() {
    const emptySpaces = spaces.reduce((acc, val, index) => (val === null ? acc.concat(index) : acc), []);

    if (emptySpaces.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySpaces.length);
        const computerChoice = emptySpaces[randomIndex];

        spaces[computerChoice] = currentPlayer;
        boxes[computerChoice].innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => (boxes[box].style.backgroundColor = winnerIndicator));
        } else if (!spaces.includes(null)) {
            playerText.innerHTML = 'It\'s a tie!';
        }
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    
}
function setGameMode(mode) {
    gameMode = mode;
    restart();
    startGame();
}



function restart() {
    spaces = Array(9).fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;

    if (gameMode === 'computer' && currentPlayer === O_TEXT) {
        computerMove();
    }
}restartBtn.addEventListener('click', restart);



function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();
