function setup() {
    createCanvas(1000, 1000);
  }
  
  const size = 100;
  const layers = 20;

  const divider = 20;
  const numRows = 60;
  const numCols = 60;

  // Borrowed from Chatgpt to get the colors on the squares
  const colors = ['#858585', '#656565', '#5555ff', '#ff3535', '#00ff00', '#999999', '#ffffff'];

  function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 2, 1, -variance, variance);
  }
  
  function drawLayers(x, y, size, layers) {
    const variance = size / 3.5;
    noFill();
    strokeWeight(2);

    // Borroweed from Chatgpt to get the colors in a math.random
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    stroke(randomColor);
    strokeWeight(2);

    for (let i = 8; i < layers; i++) {
      if (Math.random() > 0.7) {
        continue;
      }
      const s = (size / layers) * i;
      const half = s / 2;
      beginShape();
      vertex(
        getRandomValue(x - half, variance),
        getRandomValue(y - half, variance)
      );
      vertex(
        getRandomValue(x + half, variance),
        getRandomValue(y - half, variance)
      );
      vertex(
        getRandomValue(x + half, variance),
        getRandomValue(y + half, variance)
      );
      vertex(
        getRandomValue(x - half, variance),
        getRandomValue(y + half, variance)
      );
      endShape(CLOSE);
    }
  }

  noLoop();
  
  function draw() {
    background(0, 0, 0);
  
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
      }
    }
    for (let y = 3; y < numRows; y++) {
        for (let x = 3; x < numCols; x++) {
          const value = noise(x / divider, y / divider) * size;
          ellipse(size + x * size, size /  + y * size, value);
        }
      }
  
    noLoop();
  }
