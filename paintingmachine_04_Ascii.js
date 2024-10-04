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

let threshold = 50;

function preload() {
  images[0] = loadImage("1.jpg");
  images[1] = loadImage("2.jpg");
  images[2] = loadImage("3.jpg");
  images[3] = loadImage("4.jpg");
  images[4] = loadImage("5.jpg");
  images[5] = loadImage("6.jpg");
  images[6] = loadImage("7.jpg");
  images[7] = images[2];
  images[8] = images[3];
  images[9] = images[4];
}

function setup() {
  let canvas = createCanvas(1280, 640);
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

  drawSource();
  drawTarget();
  drawResult();
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
  stroke('#ffbb00');
  strokeWeight(2);

  drawArtboard();

  sw = cutoutW;
  sh = cutoutW;
  
  // Mostra il cursore anche nella terza slide
  rect(mouseX, mouseY, sw, sh);
  rect(mouseX + POSTER_W, mouseY, sw, sh);
  rect(mouseX + POSTER_W * 2, mouseY, sw, sh); // Cursore anche nella terza area
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
    
    // Aumenta la dimensione del testo
    let asciiScaleFactor = 2;  // Puoi modificare questo valore per ingrandire ulteriormente i caratteri
    result.textSize(tileW * asciiScaleFactor);  // Imposta la dimensione del testo più grande
    result.textAlign(CENTER, CENTER);  // Centra il testo nei tile
  
    // Lista di caratteri ASCII per la conversione (dal più scuro al più chiaro)
    let asciiChars = '@#8&OLI|i:. ';
  
    for (let x = 0; x < TILES_X; x++) {
      for (let y = 0; y < TILES_Y; y++) {
        let px = constrain(int(x * tileW), 0, buffer.width - 1);
        let py = constrain(int(y * tileH), 0, buffer.height - 1);
        
        let c = buffer.get(px, py);
        let b = brightness(c);
  
        // Mappa la luminosità ai caratteri ASCII
        let asciiIndex = int(map(b, 0, 100, 0, asciiChars.length - 1));
  
        // Seleziona il carattere ASCII corrispondente
        let asciiChar = asciiChars[asciiIndex];
  
        // Imposta il colore per il testo
        if (b < threshold) {
          result.fill(0);  // Nero
        } else {
          result.fill('#555555');  // Grigio scuro
        }
  
        // Disegna il carattere al centro del tile
        result.text(asciiChar, x * tileW + tileW / 2, y * tileH + tileH / 2);
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
  comp.strokeCap(SQUARE);  
  comp.line(
    random(padding, POSTER_W - padding), 
    random(padding, POSTER_H - padding), 
    random(padding, POSTER_W - padding), 
    random(padding, POSTER_H - padding)
  );
}

function keyReleased() {
  if (key >= '0' && key <= '9') {
    currImage = images[int(key)];  
  } else if (key === 'r') {
    scalar = random(1, 9);
    offsetX = random(-800, 800);
    offsetY = random(-800, 800);
  } else if (key === 't') {
    randomComposition();
    currImage = comp.get();
  } else if (key === 'e') {
    scalar = 1;
    offsetX = 0;
    offsetY = 0;
  }
}

function mouseWheel(event) {
  cutoutW = constrain(cutoutW + event.delta * 0.1, 10, 200);  
  return false; 
}
