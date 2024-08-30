function setup() {
    createCanvas(1000, 1000);
  }
  
  const size = 100;
  const layers = 20;

  // Define an array of colors
  const colors = ['#FFFFFF', '#00FFFF', '#FF00FF', '#FF0000', '#00FF00', '#FFFF00', '#0000FF'];

  function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 2, 1, -variance, variance);
  }
  
  function drawLayers(x, y, size, layers) {
    const variance = size / 3.5;
    noFill();
    strokeWeight(2);

    // Pick a random color from the colors array
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    stroke(randomColor); // Set the stroke color to the chosen random color

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
  
  function draw() {
    background(0, 0, 0);
  
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
      }
    }
  
    noLoop();
  }
