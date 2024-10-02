let images = [];
let source;
let target;
let result;
let comp;

let artboard;
let buffer;
let currImage;

let POSTER_W;
let POSTER_H;

let TILES_X;
let TILES_Y;

let sx, sy, sw, sh, dx, dy, dw, dh;

let scalar = 1;
let offsetX = 0;
let offsetY = 0;
let cutoutW = 30;

let threshold = 100;

function preload() {
  images[0] = loadImage("1.jpg");
  images[1] = loadImage("2.jpg");
  images[2] = loadImage("3.jpg");
  images[3] = loadImage("4.jpg");
  images[4] = loadImage("5.jpg");
  images[5] = loadImage("1.jpg");
  images[6] = loadImage("2.jpg");
  images[7] = loadImage("3.jpg");
  images[8] = loadImage("4.jpg");
  images[9] = loadImage("5.jpg");
}

function setup() {
  let canvas = createCanvas(1080, 640); // Canvas a larghezza piena
  canvas.parent('canvas-container');

  POSTER_W = width / 3;
  POSTER_H = height;

  TILES_X = POSTER_W / 5;
  TILES_Y = POSTER_H / 5;

  source = createGraphics(POSTER_W, POSTER_H);
  target = createGraphics(POSTER_W, POSTER_H);
  result = createGraphics(POSTER_W, POSTER_H); 
  artboard = createGraphics(900, 900);
  comp = createGraphics(POSTER_W, POSTER_H);

  currImage = random(images);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  POSTER_W = windowWidth / 3;
  POSTER_H = windowHeight;

  source = createGraphics(POSTER_W, POSTER_H);
  target = createGraphics(POSTER_W, POSTER_H);
  result = createGraphics(POSTER_W, POSTER_H); 

  TILES_X = POSTER_W / 5;
  TILES_Y = POSTER_H / 5;
}

function draw() {
  background('#f1f1f1');

  drawSource();
  drawTarget();
  drawResult();

  image(source, 0, 0, POSTER_W, POSTER_H);
  image(target, POSTER_W, 0, POSTER_W, POSTER_H);
  image(result, POSTER_W * 2, 0, POSTER_W, POSTER_H);

  noFill();
  stroke('#ff0000');
  strokeWeight(2);

  drawArtboard();

  sw = cutoutW;
  sh = cutoutW;
  rect(mouseX, mouseY, sw, sh);
  rect(mouseX + POSTER_W, mouseY, sw, sh);
}

function drawSource() {
  source.background(0);
  source.imageMode(CENTER);

  source.push();
  source.translate(source.width / 2 + offsetX, source.height / 2 + offsetY);
  source.scale(scalar);
  source.image(currImage, 0, 0);
  source.pop();
}

function drawTarget() {
  buffer = source.get();
  if (frameCount == 1) target.background('#ffffff');

  sx = mouseX;
  sy = mouseY;
  sw = int(cutoutW);
  sh = int(cutoutW);
  dx = mouseX;
  dy = mouseY;
  dw = int(cutoutW);
  dh = int(cutoutW);

  if (mouseIsPressed) {
    target.copy(buffer, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}

function drawResult() {
  let tileW = POSTER_W / TILES_X;
  let tileH = POSTER_H / TILES_Y;

  let buffer = target.get();

  result.background('#f1f1f1');
  result.noStroke();

  for (let x = 0; x < TILES_X; x++) {
    for (let y = 0; y < TILES_Y; y++) {
      let px = constrain(int(x * tileW), 0, buffer.width - 1);
      let py = constrain(int(y * tileH), 0, buffer.height - 1);
      
      let c = buffer.get(px, py);
      let b = brightness(c);

      if (b < threshold) {
        result.fill(0);  // Nero
      } else {
        result.fill('#f1f1f1');  // Grigio chiaro
      }

      result.push();
      result.translate(x * tileW, y * tileH);
      result.rect(0, 0, tileW, tileH);
      result.pop();
    }
  }
}

function drawArtboard() {
  artboard.background(0);
  artboard.image(target, 0, 0, 300, 300);
  artboard.image(source, 300, 0, 300, 300);
  artboard.image(comp, 600, 0, 300, 300);

  image(artboard, 0, POSTER_H, artboard.width, artboard.height);
}

function randomComposition() {
  let padding = 50;

  comp.background(255);

  let diameter = random(300);

  comp.fill(0);
  comp.noStroke();
  comp.ellipse(random(padding, POSTER_W - padding), random(padding, POSTER_H - padding), diameter, diameter);

  comp.rect(random(padding, POSTER_W - padding), random(padding, POSTER_H - padding), diameter, diameter);

  comp.stroke(0);
  comp.strokeWeight(8);
  comp.strokeCap(SQUARE);  // RECT in p5.js si traduce in SQUARE
  comp.line(
    random(padding, POSTER_W - padding), 
    random(padding, POSTER_H - padding), 
    random(padding, POSTER_W - padding), 
    random(padding, POSTER_H - padding)
  );
}

function keyReleased() {
  if (key === '1') currImage = images[0];
  if (key === '2') currImage = images[1];
  if (key === '3') currImage = images[2];
  if (key === '4') currImage = images[3];
  if (key === '5') currImage = images[4];
  if (key === '6') currImage = images[5];
  if (key === '7') currImage = images[6];
  if (key === '8') currImage = images[7];
  if (key === '9') currImage = images[8];
  if (key === '0') currImage = images[9];
  if (key === 'r') {
    scalar = random(1, 9);
    offsetX = random(-800, 800);
    offsetY = random(-800, 800);
  }
  if (key === 't') {
    randomComposition();
    currImage = comp.get();
  }
  if (key === 'e') {
    scalar = 1;
    offsetX = 0;
    offsetY = 0;
  }
}

function mouseWheel(event) {
  cutoutW += event.delta * 0.1; // Usa un fattore di scala per regolare la sensibilità
  return false; // Impedisce lo scroll della pagina
}

