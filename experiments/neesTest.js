function setup() {
    createCanvas(1000, 1000);
    background(255);
    stroke(0);
    strokeWeight(1);
  
    // Number of lines to draw
    let numLines = 50;
  
    // Draw random lines
    for (let i = 0; i < numLines; i++) {
      let x1 = random(width); 
      let y1 = random(height); 
      let x2 = random(width); 
      let y2 = random(height);
  
      line(x1, y1, x2, y2); // Draw the line between points
    }
  }
  // Used Chatgpt to make the lines go over eachother