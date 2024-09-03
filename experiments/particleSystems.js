let particles = [];
let revealedSquares = [];
const size = 100;
const colors = ['#00FFFF', '#FF00FF', '#FF0000'];

function setup() {
  createCanvas(1000, 1000);
  background(0);
}

//Borrowed from the complexity lecture
class SquareParticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    //p5.js.org "random2D"
    this.velocity = p5.Vector.random2D().mult(0.2 + random());
    this.lifespan = 100 + random(100);
    this.size = size / 4;
    this.color = random(colors);
  }

  update() {
    this.lifespan--;
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
  }

  draw() {
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.size);
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

  // Draw revealed squares
  for (let square of revealedSquares) {
    drawSquare(square.x, square.y);
  }

  // Chatgpt to update and draw square particles
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
