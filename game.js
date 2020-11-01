const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]'); 
const board = document.getElementById('board');
const restartButton = document.getElementById('restart-btn');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageText = document.querySelector('[winning-message-text]');
let circleTurn;

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener('click', handleClick, {once: true});
        // once: true means only ever fire this event listener once so once we click on the cell its gonna 
        //fire again 
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(event) {

    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    //Check For win
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    //cellElements does not actually have the 'every()' method so that's why we are destructing it
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
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

// Game Logic
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}


/******** SOCIAL ICONS SETTINGS **********/
// This setting has a bug we'll fix it later 

let icons = document.querySelector('.icon-bar');
let arrowToHide = document.querySelector(".left-arrow");
let arrowToShow = document.querySelector(".right-arrow");

icons.addEventListener('mouseover', function () {
    arrowToHide.classList.add("show-left-arrow");
});

icons.addEventListener('mouseout', function() {
    arrowToHide.classList.remove("show-left-arrow");
});

//Adding Event listener to left arrow
arrowToHide.addEventListener("click", function() {
    icons.classList.add('hide-icon-bar');
    arrowToShow.classList.add('show-right-arrow');
});

//Adding event listener to right arrow
arrowToShow.addEventListener('click', function() {
    arrowToHide.classList.remove('show-right-arrow');
    icons.classList.remove('hide-icon-bar');
});