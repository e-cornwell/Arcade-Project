//DOM Elements
const board = document.querySelector('.board');
const table = createBoard(); //Storing game board here <--
const start = document.querySelector('#start');
const scoreResult = document.querySelector('.scoreResult');
let score = 0;
let food = {
    position: [], //<-- why can't I find position on the grid??
    eaten: false
}
let snake = [[9, 10]];
let nextDirection = [0, 1];
let gameState =  {
    playing: false,
    gameLost: false
}


//Event listeners
start.addEventListener('click', startGame);
document.addEventListener('keydown', function(ev){
    ev.preventDefault();
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

//Create board (called on line 3)
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

//Generate Food
function genFood (){
    let foodX = Math.floor(Math.random() * 20); 
    let foodY = Math.floor(Math.random() * 20);
    let row = board.children[foodX];
    let cell = row.children[foodY];
    cell.classList.add('food');
    food.position = cell;
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
        eatFood();
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
        let x = snakePos[0];
        let y = snakePos[1];
        let pos = x + '-' + y;
        //Remove zero index and class of snake
        snake.shift(snake[0]);
        document.getElementById(pos).classList.remove('snake')
    }
}


//Move Snake
function moveSnake() {
    let head = snake[snake.length - 1];
    let nextHead = [head[0] + nextDirection[0], head[1] + nextDirection[1]];
    snake.push(nextHead);
    removeSnake();
    makeSnake();
}

//Check for Food, eat if available
function eatFood() {
    let snk = document.getElementsByClassName('snake')
    let fud = document.getElementsByClassName('food')

    if (snk[0] === fud[0]) {
        addScore();
        //What else happens when snake = food?
    }
}

//Function changes score result and will increment based on food eaten.
function addScore () {
    score++
    scoreResult.textContent = score;
}


