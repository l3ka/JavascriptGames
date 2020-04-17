import {squares, scoreDisplay, startBtn, width, message} from './Helpers.js'

let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0]

let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

startBtn.addEventListener('click', startGame);
document.addEventListener('keyup', controlMovement);

function controlMovement(e) {
    squares[currentIndex].classList.remove('snake');

    if (e.keyCode === 39) {         // right
        direction = 1;
    }
    else if (e.keyCode === 38) {    // top
        direction = -width;
    }
    else if (e.keyCode === 37) {    // left  
        direction = -1;
    }
    else if (e.keyCode === 40) {    // bottom
        direction = width;
    }    
}

function startGame() {
    // reset board 
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[currentSnake[0]].classList.remove('snakeHead')
    squares[appleIndex].classList.remove('apple');

    clearInterval(interval);    
    score = 0;
    direction = 1;
    scoreDisplay.textContent = score;
    intervalTime = 500;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));

    squares[currentSnake[0]].classList.remove('snake')
    squares[currentSnake[0]].classList.add('snakeHead')

    message.textContent = "Message: "
    addNewAppleOnBoard();
    interval = setInterval(moveOutcomes, intervalTime);
}

function moveOutcomes() {
    if ((currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) || 
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake'))
    {
        message.textContent = "Message: Game Over! Your score is: " + score;
        return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    squares[currentSnake[0]].classList.remove('snakeHead');
    squares[currentSnake[0]].classList.add('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);        
        addNewAppleOnBoard();
        scoreDisplay.textContent = ++score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snakeHead');
}

function addNewAppleOnBoard() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

export {startGame};