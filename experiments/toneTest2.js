let guitarSampler;
let wavePath = [];
let scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']; // A simple major scale
let currentNote = '';
let noteColors = [
  '#ff0000', // Red for C4
  '#ff7f00', // Orange for D4
  '#ffff00', // Yellow for E4
  '#00ff00', // Green for F4
  '#0000ff', // Blue for G4
  '#23CCBE', // Cyan for A4
  '#8b00ff', // Violet for B4
  '#ffffff'  // White for C5
];
let currentColor = '#ffffff';

function preload() {
  // Load guitar samples (make sure you have these samples available)
  guitarSampler = new Tone.Sampler({
    'C4': 'path/to/guitar_C4.mp3',
    'D4': 'path/to/guitar_D4.mp3',
    'E4': 'path/to/guitar_E4.mp3',
    'F4': 'path/to/guitar_F4.mp3',
    'G4': 'path/to/guitar_G4.mp3',
    'A4': 'path/to/guitar_A4.mp3',
    'B4': 'path/to/guitar_B4.mp3',
    'C5': 'path/to/guitar_C5.mp3',
  }).toDestination();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Tone.start();
}

function draw() {
  background(30);

  // Map mouse position to a note and amplitude
  let noteIndex = floor(map(mouseX, 0, width, 0, scale.length));
  noteIndex = constrain(noteIndex, 0, scale.length - 1); 
  let note = scale[noteIndex];

  let amp = map(mouseY, height, 0, 0, 1);
  
  // Update the sampler volume (amplitude)
  guitarSampler.volume.value = amp * -20;

  // Change note only if it differs from the current note
  if (note !== currentNote && mouseIsPressed) {
    guitarSampler.triggerAttack(note);
    currentNote = note;
    currentColor = noteColors[noteIndex]; // Change the stroke color based on the note
  }

  // Store the mouse position in an array for wave animation
  wavePath.push({ x: mouseX, y: mouseY });

  // Only keep the last 50 points for smoother performance
  if (wavePath.length > 50) {
    wavePath.shift();
  }

  // Draw the path of the wave
  noFill();
  stroke(currentColor); // Set the stroke color based on the current note
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < wavePath.length; i++) {
    let pos = wavePath[i];
    vertex(pos.x, pos.y);
  }
  endShape();
}

function mousePressed() {
  // Trigger note when the mouse is pressed
  let noteIndex = floor(map(mouseX, 0, width, 0, scale.length));
  noteIndex = constrain(noteIndex, 0, scale.length - 1);
  let note = scale[noteIndex];
  guitarSampler.triggerAttack(note);
  currentNote = note;
  currentColor = noteColors[noteIndex]; // Set color for the stroke
}

function mouseReleased() {
  // Stop sound when mouse is released
  guitarSampler.triggerRelease(currentNote);
  currentNote = ''; // Clear the current note
}
