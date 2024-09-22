class Agent {
    constructor(x, y, maxSpeed, maxForce) {
      this.position = createVector(x, y);
      this.lastPosition = createVector(x, y);
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, 0);
      this.maxSpeed = maxSpeed;
      this.maxForce = maxForce;
      
      // Assign a random color from the array to each agent
      this.color = random(colorArray);
    }
  
    follow(desiredDirection) {
      desiredDirection = desiredDirection.copy();
      desiredDirection.mult(this.maxSpeed);
      
      let randomSteer = p5.Vector.random2D();
      randomSteer.mult(0.5); 
      
      desiredDirection.add(randomSteer);
      
      let steer = p5.Vector.sub(desiredDirection, this.velocity);
      steer.limit(this.maxForce * 10); // Creating sharper turns
      this.applyForce(steer);
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.lastPosition = this.position.copy();
  
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    checkBorders() {
      if (this.position.x < 0) {
        this.position.x = innerWidth;
        this.lastPosition.x = innerWidth;
      } else if (this.position.x > innerWidth) {
        this.position.x = 0;
        this.lastPosition.x = 0;
      }
      if (this.position.y < 0) {
        this.position.y = innerHeight;
        this.lastPosition.y = innerHeight;
      } else if (this.position.y > innerHeight) {
        this.position.y = 0;
        this.lastPosition.y = 0;
      }
    }
  
    draw() {
      push();
      stroke(this.color); // Use the agent's assigned color
      strokeWeight(10);
      line(
        this.lastPosition.x,
        this.lastPosition.y,
        this.position.x,
        this.position.y
      );
      pop();
    }
  }
  
  function setup() {
    createCanvas(1000, 1000);
    background(255, 255, 255);
    
    // Define an array of colors
    colorArray = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#33FFF5', '#FFAA33'];
  
    field = generateField();
    generateAgents();
  }
  
  function generateField() {
    let field = [];
    noiseSeed(Math.random() * 100);
    for (let x = 0; x < maxCols; x++) {
      field.push([]);
      for (let y = 0; y < maxRows; y++) {
        const value = noise(x / (divider / 2), y / (divider / 2)) * Math.PI * 4; // Angular flow
        field[x].push(p5.Vector.fromAngle(value));
      }
    }
    return field;
  }
  
  function generateAgents() {
    for (let i = 0; i < 100; i++) {
      let agent = new Agent(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        2, // Slightly faster maxSpeed for more spiky movement
        0.5 // Increased maxForce for sharper turns
      );
      agents.push(agent);
    }
  }
  
  const fieldSize = 10;
  const maxCols = Math.ceil(innerWidth / fieldSize);
  const maxRows = Math.ceil(innerHeight / fieldSize);
  const divider = 500;
  let field;
  let agents = [];
  let colorArray; // Color array to store different colors
  
  function draw() {
    for (let agent of agents) {
      const x = Math.floor(agent.position.x / fieldSize);
      const y = Math.floor(agent.position.y / fieldSize);
      const desiredDirection = field[x][y];
      agent.follow(desiredDirection);
      agent.update();
      agent.checkBorders();
      agent.draw();
    }
  }
  