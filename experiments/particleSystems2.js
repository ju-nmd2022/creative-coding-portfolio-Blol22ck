let particles = [];
let revealedSquares = [];
const size = 20;
const colors = ['#00FF19', '#66FAB3', '#FA9BF2'];

function setup() {
  createCanvas(1000, 1000);
  background(0);
}

//Borrowed from the complexity lecture
class SquareParticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(0.2 + random());
    this.lifespan = 100 + random(100); 
    this.size = size / 2; 
    this.color = random(colors);
  }

  update() {
    this.lifespan--;
    this.position.add(this.velocity);
    this.velocity.mult(0.99);

    // ChatGPT to create color shifting
    let colorIndex = floor(map(this.lifespan, 0, 100, 0, colors.length));
    let nextColorIndex = (colorIndex + 1) % colors.length; // Get the next color index
    this.color = lerpColor(color(this.color), color(colors[nextColorIndex]), 0.1);
  }

  draw() {
    fill(this.color);
    //stroke(10);
    noStroke();
    rectMode(CENTER);

    // Color shifting code used as a base to create particle size changing
    let dynamicSize = map(this.lifespan, 0, 100, this.size * 2, this.size / 2);
    ellipse(this.position.x, this.position.y, dynamicSize);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

//Chatgpt to make the particles generate on the right X and Y position.
function generateSquareParticles(x, y) {
  for (let i = 0; i < 400; i++) {
    particles.push(new SquareParticle(x + random(-size / 2, size / 2), y + random(-size / 2, size / 2)));
  }
}

function draw() {
  background(0);

  for (let square of revealedSquares) {
    drawSquare(square.x, square.y);
  }

  particles = particles.filter(p => {
    p.update();
    p.draw();
    return !p.isDead();
  });
}

function drawSquare(x, y) {
  const variance = size / 3.5;
  const randomColor = random(colors);
  stroke(randomColor);
  strokeWeight(2);
  noFill();
}

function mouseClicked() {
  const gridX = Math.floor(mouseX / size) * size + size / 2;
  const gridY = Math.floor(mouseY / size) * size + size / 2;

  if (!revealedSquares.some(PI => PI.x === gridX && PI.y === gridY)) {
    revealedSquares.push({ x: gridX, y: gridY });
  }

  generateSquareParticles(gridX, gridY);
}
