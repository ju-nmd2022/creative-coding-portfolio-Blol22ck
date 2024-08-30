function setup() {
    createCanvas(1000, 1000);
    frameRate(10);
  }
  
  const size = 100;
  const layers = 20;
  const divider = 20;
  const numRows = 60;
  const numCols = 60;
  let counter = 0;

  // Borrowed from Chatgpt to get the colors on the squares
  const colors = ['#FFFFFF', '#404040', '#606060', '#FF00ff', '#707070', '#202020', '#101010'];

  function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 10, 2, -variance, variance);
  }
  
  function drawLayers(x, y, size, layers) {
    const variance = size / 3.5;
    noFill();
    strokeWeight(2);

    // Borroweed from Chatgpt to get the colors in a math.random
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    stroke(randomColor);

    for (let i = 10; i < layers; i++) {
      if (Math.random() > 1) {
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

    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const value = noise(x / divider, y / divider, counter) * size;
          ellipse(size / 2 + x * size, size / 2 + y * size, value);
        }
      }
    
      counter += 0.1;
  }
