const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 10;
let snake = [{x: 50, y: 50}];
let direction = "right";
let food = {x: 0, y: 0};
let score = 0;
let gameInterval;

// Detectar si es un dispositivo móvil
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.getElementById("touchControls").style.display = "block";
}

// Función para iniciar el juego
function startGame() {
    snake = [{x: 50, y: 50}];
    direction = "right";
    score = 0;
    document.getElementById("score").textContent = score;
    generateFood();
    if (gameInterval)
        clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Función principal del juego
function gameLoop() {
    moveSnake();
    checkCollisions();
    clearCanvas();
    drawFood();
    drawSnake();
}

// Mover la serpiente
function moveSnake() {
    const head = {...snake[0]};

    if (direction === "up")
        head.y -= gridSize;
    if (direction === "down")
        head.y += gridSize;
    if (direction === "left")
        head.x -= gridSize;
    if (direction === "right")
        head.x += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// Verificar colisiones
function checkCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

// Finalizar el juego
function endGame() {
    clearInterval(gameInterval);
    alert("¡Game Over! Tu puntuación fue: " + score);
}

// Limpiar el canvas
function clearCanvas() {
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Dibujar la serpiente
function drawSnake() {
    ctx.fillStyle = "#ff453a";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Generar la comida
function generateFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    } while (snake.some(segment => segment.x === x && segment.y === y));
    food = {x, y};
}

// Dibujar la comida
function drawFood() {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Controles para PC (teclado)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "down")
        direction = "up";
    if (event.key === "ArrowDown" && direction !== "up")
        direction = "down";
    if (event.key === "ArrowLeft" && direction !== "right")
        direction = "left";
    if (event.key === "ArrowRight" && direction !== "left")
        direction = "right";
});

// Controles táctiles
function moveSnakeTouch(newDirection) {
    if (newDirection === "up" && direction !== "down")
        direction = "up";
    if (newDirection === "down" && direction !== "up")
        direction = "down";
    if (newDirection === "left" && direction !== "right")
        direction = "left";
    if (newDirection === "right" && direction !== "left")
        direction = "right";
}

document.getElementById("generateControlsBtn").addEventListener("click", function () {
    alert("Botón presionado");
    document.getElementById("touchControls").style.display = "flex";
});



// Botón para iniciar el juego
document.getElementById("startBtn").addEventListener("click", startGame);
