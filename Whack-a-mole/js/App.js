 import {square, mole, timeLeft} from './Helpers.js'

 let score = document.querySelector('#score')
 let result = 0;
 let currentTime = timeLeft.textContent;
 let timerID = setInterval(countDown, 1000);
 let hitPosition = -1;

 square.forEach(item => {
    item.addEventListener('mouseup', () => {
       if (item.id === hitPosition) {
           ++result;
           score.textContent = result;
       }
    });
});

function countDown() {
    timeLeft.textContent = --currentTime;
    if (currentTime === 0) {
        clearInterval(timerID);         
        alert('GAME OVER! Your score is ' + result)
    }
}

 function randomSquare() {
     square.forEach(className => {
         className.classList.remove('mole');
     });
     let randomPositionSquare = square[Math.floor(Math.random() * 9)];
     randomPositionSquare.classList.add('mole');

     // assign the id of the randomPositionSquare to hitPosition for us to use later
     hitPosition = randomPositionSquare.id;
 }

 function moveMole() {
     let timerId = null;
     timerId = setInterval(randomSquare, 1000);
 }

export {moveMole as startGame};