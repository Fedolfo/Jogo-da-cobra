const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
let box = Number('32');
let snake = [];
let direction = 'right';

snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let apple = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

const creating = () => {
  context.fillStyle = 'gray';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

const creatingSnake = () => {
  for (let index = 0; index < snake.length; index++) {
    context.fillStyle = 'green';
    context.fillRect(snake[index].x, snake[index].y, box, box);
  }
}

const drawFood = () => {
  context.fillStyle = 'Red';
  context.fillRect(apple.x, apple.y, box, box);
}

const snakeRedirectInBlock = () => {
  (snake[0].x > 15 * box && direction === 'right') ? snake[0].x = 0 : undefined;
  (snake[0].x < 0 * box && direction === 'left') ? snake[0].x = 16 * box : undefined;
  (snake[0].y > 15 * box && direction === 'down') ? snake[0].y = 0 : undefined;
  (snake[0].y < 0 * box && direction === 'up') ? snake[0].y = 16 * box : undefined;
}

const snakeBodyRule = () => {
  for (let index = 1; index < snake.length; index++) {
    if (snake[0].x === snake[index].x && snake[0].y === snake[index].y) {
      clearInterval(game);
      const element = document.createElement('h2');
      element.innerHTML = 'Você perdeu!'
      element.className = 'Game-over'
      document.body.appendChild(element);
      playAgain();
    }
  }
}

const startGame = () => {

  creating();
  creatingSnake();
  drawFood();
  snakeBodyRule();
  snakeRedirectInBlock();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  (direction === 'right' ? snakeX += box : undefined);
  (direction === 'left' ? snakeX -= box : undefined);
  (direction === 'up' ? snakeY -= box : undefined);
  (direction === 'down' ? snakeY += box : undefined);


  if (snakeX !== apple.x || snakeY !== apple.y) {
    snake.pop()
  } else {
    apple.x = Math.floor(Math.random() * 15 + 1) * box,
    apple.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  const newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);
}

const update = (e) => {
  (e.keyCode === 39 && direction !== 'left') ? direction = 'right' : undefined;
  (e.keyCode === 40 && direction !== 'up') ? direction = 'down' : undefined;
  (e.keyCode === 37 && direction !== 'right') ? direction = 'left' : undefined;
  (e.keyCode === 38 && direction !== 'down') ? direction = 'up' : undefined;
}

const playAgain = () => {
  const element = document.createElement('button');
  element.innerHTML = 'Play again';
  document.body.appendChild(element);
}

document.addEventListener('keydown', update)

const game = setInterval(startGame, Number('100'));