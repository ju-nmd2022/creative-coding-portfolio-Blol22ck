let particles = [];
let revealedSquares = [];
const size = 20;
const colors = ['#FFF700', '#7BFF00', '#FF001E'];

function setup() {
  createCanvas(1000, 1000);
  background(0);
}

// Custom Particle Class with Perlin Noise movement and abstract shapes
class CustomParticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.lifespan = 100 + random(100); 
    this.size = size / 2; 
    this.color = random(colors);
    this.noiseOffset = createVector(random(1000), random(1000)); // Perlin noise offset
  }

  update() {
    this.lifespan--;
    
    // Using Perlin noise for smooth, organic movement
    let noiseX = noise(this.noiseOffset.x) * 2 - 1;
    let noiseY = noise(this.noiseOffset.y) * 2 - 1;
    this.position.add(createVector(noiseX, noiseY).mult(2)); // Increase 'mult' for faster movement

    // Slowly move the noise offset for continuous smooth movement
    this.noiseOffset.add(0.01, 0.01);
    
    // Color shifting as the particle ages
    let colorIndex = floor(map(this.lifespan, 0, 100, 0, colors.length));
    let nextColorIndex = (colorIndex + 1) % colors.length;
    this.color = lerpColor(color(this.color), color(colors[nextColorIndex]), 0.1);
  }

  draw() {
    fill(this.color);
    noStroke();

    // Size change as lifespan decreases
    let dynamicSize = map(this.lifespan, 0, 100, this.size * 2, this.size / 2);

    // Draw an abstract shape (e.g., star-like polygon)
    beginShape();
    let numPoints = 5; // Number of points for the star-like shape
    for (let i = 0; i < TWO_PI; i += TWO_PI / numPoints) {
      let radius = dynamicSize / 2 + (i % 2 == 0 ? dynamicSize / 3 : 0); // Create spikes
      let x = this.position.x + cos(i) * radius;
      let y = this.position.y + sin(i) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

// Generate particles at the correct position
function generateSquareParticles(x, y) {
  for (let i = 0; i < 400; i++) {
    particles.push(new CustomParticle(x + random(-size / 2, size / 2), y + random(-size / 2, size / 2)));
  }
}

function draw() {
  background(0, 50); // Slight fading effect for trailing particles

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
