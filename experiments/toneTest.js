let fmSynth;
let wavePath = [];
let scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']; // A simple major scale
let currentNote = '';

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a Frequency Modulation Synth
  fmSynth = new Tone.FMSynth().toDestination();
  Tone.start();

  // Set FM modulation parameters for a nicer sound
  fmSynth.harmonicity.value = 3; // Controls the harmonic content
  fmSynth.modulationIndex.value = 10; // Intensity of modulation
  fmSynth.envelope.attack = 0.1;
  fmSynth.envelope.release = 0.3;

  // Initially trigger no note
  currentNote = '';
}

function draw() {
  background(30);

  // Map mouse position to a note and amplitude
  let noteIndex = floor(map(mouseX, 0, width, 0, scale.length)); // Map x to the scale
  noteIndex = constrain(noteIndex, 0, scale.length - 1); // Constrain within the scale
  let note = scale[noteIndex]; // Pick a note from the scale

  let amp = map(mouseY, height, 0, 0, 1); // Amplitude from Y-axis

  // Update the FM Synth volume (amplitude)
  fmSynth.volume.value = amp * -20; // Scale amplitude to dB

  // Change note only if it differs from the current note
  if (note !== currentNote && mouseIsPressed) {
    fmSynth.triggerAttack(note);
    currentNote = note; // Update the current note being played
  }

  // Store the mouse position in an array for wave animation
  wavePath.push({ x: mouseX, y: mouseY });

  // Only keep the last 50 points for smoother performance
  if (wavePath.length > 50) {
    wavePath.shift();
  }

  // Draw the path of the wave
  noFill();
  stroke(255);
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
  fmSynth.triggerAttack(note);
  currentNote = note;
}

function mouseReleased() {
  // Stop sound when mouse is released
  fmSynth.triggerRelease();
  currentNote = ''; // Clear the current note
}
