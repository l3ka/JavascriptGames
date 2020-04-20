import {squares, resultDisplay, message, alienInvaders, width} from './Helpers.js'

let currentShooterIndex = 202;
let currentInvadesIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;

function startGame() {
    // add alien invaders
    alienInvaders.forEach(invader => squares[currentInvadesIndex + invader].classList.add('invader'));
    // add shooter
    squares[currentShooterIndex].classList.add('shooter');
    // add event listener for shooter to move on board
    document.addEventListener('keydown', moveShooter);
    // invoke invaders to move
    invaderId = setInterval(moveInvaders, 500);
    // invoke invaders to shoot
    document.addEventListener('keyup', shoot);
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');
    switch(e.keyCode) {
        case 37: 
            if (currentShooterIndex % width !== 0) {
                --currentShooterIndex;
                message.textContent = "";
            }
            else {
                message.textContent = "Cannot move anymore left";
            }
            break;
        case 39:
            if (currentShooterIndex % width < width - 1) {
                ++currentShooterIndex;
                message.textContent = "";
            }
            else {
                message.textContent = "Cannot move anymore right";
            }
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');    
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        direction = width;
    }
    else if (direction === width) {
        if (leftEdge) {
            direction = 1;
        }
        else {
            direction = -1;
        }
    }

    for (let i = 0; i <= alienInvaders.length - 1; ++i) {
        squares[alienInvaders[i]].classList.remove('invader');
    }    
    for (let i = 0; i <= alienInvaders.length - 1; ++i) {
        alienInvaders[i] += direction;
    }    
    for (let i = 0; i <= alienInvaders.length - 1; ++i) {
        if (!alienInvadersTakenDown.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader');
        }
    }

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.textContent = "Game Over!";
        squares[currentShooterIndex].classList.add('boom');
        clearInterval(invaderId);
    }

    for (let i = 0; i <= alienInvaders.length - 1; ++i) {
        if (alienInvaders[i] > (squares.length - (width - 1))) {
            resultDisplay.textContent = "Game Over!";
            clearInterval(invaderId);
        }
    }

    if (alienInvadersTakenDown.length === alienInvaders.length) {
        resultDisplay.textContent = "You Win!";
        clearInterval(invaderId);
    }
}

function shoot(e) {
    let laserId = null;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
            clearInterval(laserId);

            const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
            alienInvadersTakenDown.push(alienTakenDown);
            resultDisplay.textContent = ++result;
        }
        if (currentLaserIndex < width) {
            clearInterval(laserId);
            setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
        }
    }
    
    // document.addEventListener('keyup', e => {
    //     if (e.keyCode === 32) {
    //         laserId = setInterval(moveLaser, 100);
    //     }
    // });

    switch (e.keyCode) {
        case 32:
            laserId = setInterval(moveLaser, 100);
            break;
    }


}


export {startGame}