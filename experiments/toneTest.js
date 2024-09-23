// Used ChatpGPT to create a twirl effect, tweaked the code to create it more to my liking.
// Added stroke size change based on the volume

let fmSynth;
let wavePath = [];
let scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
let currentNote = '';
let noteColors = [
  '#ff0000', 
  '#ff7f00', 
  '#ffff00', 
  '#00ff00', 
  '#0000ff', 
  '#23CCBE', 
  '#8b00ff', 
  '#ffffff'
];
let currentColor = '#ffffff';
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  fmSynth = new Tone.FMSynth().toDestination();
  Tone.start();

  fmSynth.harmonicity.value = 3;
  fmSynth.modulationIndex.value = 10;
  fmSynth.envelope.attack = 0.1;
  fmSynth.envelope.release = 0.3;

  currentNote = '';
}

function draw() {
  background(30);

  let noteIndex = floor(map(mouseX, 0, width, 0, scale.length));
  noteIndex = constrain(noteIndex, 0, scale.length - 1); 
  let note = scale[noteIndex];

  let amp = map(mouseY, height, 0, 0, 1);

  fmSynth.volume.value = amp * -20;

  if (note !== currentNote && mouseIsPressed) {
    fmSynth.triggerAttack(note);
    currentNote = note;
    currentColor = noteColors[noteIndex];
  }

  if (mouseIsPressed) {
    angle += 0.5;  
    let radius = 50; 
    let twirlX = mouseX + cos(angle) * radius;
    let twirlY = mouseY + sin(angle) * radius;
    wavePath.push({ x: twirlX, y: twirlY });
  } else {
    wavePath.push({ x: mouseX, y: mouseY });
  }

  if (wavePath.length > 50) {
    wavePath.shift();
  }

  noFill();
  stroke(currentColor);
  strokeWeight(5 + amp * 20);
  beginShape();
  for (let i = 0; i < wavePath.length - 1; i++) {
    let pos1 = wavePath[i];
    let pos2 = wavePath[i + 1];
    let smoothX = lerp(pos1.x, pos2.x, 0.5);
    let smoothY = lerp(pos1.y, pos2.y, 0.5);
    vertex(smoothX, smoothY);
  }
  endShape();
}

function mousePressed() {
  let noteIndex = floor(map(mouseX, 0, width, 0, scale.length));
  noteIndex = constrain(noteIndex, 0, scale.length - 1);
  let note = scale[noteIndex];
  fmSynth.triggerAttack(note);
  currentNote = note;
  currentColor = noteColors[noteIndex];
}

function mouseReleased() {
  fmSynth.triggerRelease();
  currentNote = '';
}
