//DOM Elements
const board = document.querySelector('.board');
const start = document.querySelector('#start');
let score = document.querySelector('.score');
let snake = [[9, 10]];
let nextDirection = [0, 1];
let gameState =  {
    playing: false,
    }

//Event listeners
start.addEventListener('click', startGame);
document.addEventListener('keydown', function(ev){
    console.log(ev)
    if (ev.key === ' ') {
        startGame();  
    }
});
window.addEventListener('keydown', function(ev) {
    //up  
    if (ev.key === 'ArrowUp') {
        nextDirection = [-1, 0];
    }
    //down
    if (ev.key === 'ArrowDown') {
        nextDirection = [1, 0];
    }
    //left
    if (ev.key === 'ArrowLeft') {
        nextDirection = [0, -1];
    }
    //right
    if (ev.key === 'ArrowRight') {
        nextDirection = [0, 1];
    }
})

//Create board
function createBoard () {
    for(let x = 0; x < 20; x++){
        let row = document.createElement('tr');
        board.appendChild(row);
        for(let y = 0; y < 20; y++){
            let cell = document.createElement('td');
            cell.className = 'cell';
            cell.id = x + '-' + y;
            row.appendChild(cell);
        }
    }
}

createBoard();

//Generate Food
function genFood (){
    let foodX = Math.floor(Math.random() * 20); 
    let foodY = Math.floor(Math.random() * 20);
    let row = board.children[foodX];
    let cell = row.children[foodY];
    cell.classList.add('food');
}
genFood();

//Start Game
function startGame (){
    gameState.playing = !gameState.playing;
    if (gameState.playing){
        start.innerText = 'Pause'
    } else {
        start.innerText = 'Resume'
    }
    console.log('game has started');
    
}



//Tick
setInterval(function () {
    if(gameState.playing) {
        console.log('tick');
        moveSnake();
        return;
    } 
}, 300);

//Make Snake
function makeSnake () {
    for (let i = 0; i < snake.length; i++){
        let snakePos = snake[i];
        let x = snakePos[0];
        let y = snakePos[1];
        let pos = x + '-' + y;
        document.getElementById(pos).classList.add('snake')
    }
}
makeSnake()

//Remove Snake
function removeSnake () {
    for (let i = 0; i < snake.length; i++){
        let snakePos = snake[i];
        let y = snakePos[0];
        let x = snakePos[1];
        let pos = y + '-' + x;
        //Can remove 
        snake.shift(snake[0]);
        document.getElementById(pos).classList.remove('snake')
    }
}


//Move Snake
function moveSnake () {
    let head = snake[snake.length - 1];
    let nextHead = [head[0] + nextDirection[0], head[1] + nextDirection[1]];
    snake.push(nextHead);
    removeSnake ()
    makeSnake ()

}




    

// function makeSnake () {
//     for (let i = 0; i < snake.body.length; i++){
//         let body = snake.body[i];
//         console.log(body)
//         let y = body[0];
//         let x = body[1];
//         let pos = y + '-' + x;
        
//         // document.getElementById(pos).classList.add('snake')
//         document.getElementById(pos).classList.remove('snake');
//         makeSnake();
//         let newY = snake.nextDirection[1];
//         let newX = snake.nextDirection[0];
//         body[0] = body[0] + newY;
//         body[1] = body[1] + newX;
//     }
// }
    










