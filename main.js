// State
let board;
let turn;

// Cached elements
const wholeBoard = document.querySelector('.main-board');
const whoseTurn = document.querySelector('.turn');
const player1Well = document.querySelector('.player-1');
const player2Well = document.querySelector('.player-2');
const allPits = document.querySelectorAll('.pit');
const pitContainer = document.querySelector('.pit-rows');

// TOP = A
const pitsA = document.querySelectorAll('.pocket-a');
// BOTTOM = B
const pitsB = document.querySelectorAll('.pocket-b');

// Event listeners
pitContainer.addEventListener('click', handleMove);

// Functions
function init() {
    board = [3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0];
    turn = 1;
    render();
}

function render() {
    allPits.forEach(pit => {
        pit.innerText = board[pit.id];
    })

    player1Well.innerText =
    `Player 1 (Bottom)
    -
    Score : ${board[13]}`;

    player2Well.innerText =
    `Player 2 (Top)
    -
    Score : ${board[6]}`;

    whoseTurn.innerText = `It is ${turn === 1 ? 'tops' : 'bottoms'} turn.
    Pieces move in clockwise direction when being dropped.`
    
    if (checkForWinner()) {
        player1Well.innerText =
        `Player 1 (Bottom)
        -
        Score : ${board[13]}`;

        player2Well.innerText =
        `Player 2 (Top)
        -
        Score : ${board[6]}`;
        whoseTurn.innerText = `${board[6] > board[13] ? 'TOP' : 'BOTTOM'} WINS!!!! 😀`
        allPits.forEach(pit => {
            pit.innerText = 0;
            pit.classList.remove("on");
        })
        return;
    }
    illuminatePits();
}

function illuminatePits() {
    if (turn === 1) {
        pitsA.forEach(pit => {
            board[pit.id] === 0 ? pit.classList.remove('on') : pit.classList.add('on')
        })
        pitsB.forEach(pit => {
            pit.classList.remove('on')
        })
    } else {
        pitsB.forEach(pit => {
            board[pit.id] === 0 ? pit.classList.remove('on') : pit.classList.add('on')
        })
        pitsA.forEach(pit => {
            pit.classList.remove('on')
        })
    }
}

function handleMove(event) {
    // If user doesnt click on a pit, return
    if (!event.target.classList.contains('pit')) return;

    // Find index
    let pitIndex = parseInt(event.target.id);

    // Cant click on other teams spots
    if (turn === 1 && pitIndex > 5) return;
    if (turn === -1 && (pitIndex < 6)) return;

    // Find number of stones, cant pick up 0 stones
    let numOfStones = board[pitIndex];
    if (numOfStones === 0) return;

    // Set number of stones in pit picked to 0
    board[pitIndex] = 0;
    pitIndex += 1;

    while (numOfStones > 0) {
        if ((turn === 1 && pitIndex === 13) || (turn === -1 && pitIndex === 6)) {
            pitIndex += 1;
        };
        if (pitIndex > 13) pitIndex = 0;
        board[pitIndex] += 1;
        numOfStones -= 1;
        pitIndex += 1;
    }
    turn *= -1;
    console.log(board);
    render();
}

function checkForWinner() {
    let topEmpty = Array.from(pitsA).every(pit => board[pit.id] === 0)
    let bottomEmpty = Array.from(pitsB).every(pit => board[pit.id] === 0);

    if (topEmpty) {
        pitsB.forEach(pit => {
            board[13] += board[pit.id];
        })
    } else if (bottomEmpty) {
        pitsA.forEach(pit => {
            board[6] += board[pit.id];
        })
    }
    return topEmpty || bottomEmpty;
}






init();