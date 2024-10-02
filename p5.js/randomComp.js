function randomComposition() {
    let padding = 50;
  
    comp.beginDraw();
    comp.background(255);
  
    let diameter = random(300);
  
    comp.fill(0);
    comp.noStroke();
    comp.ellipse(random(padding, POSTER_W - padding), random(padding, POSTER_H - padding), diameter, diameter);
  
    comp.stroke(0);
    comp.strokeWeight(8);
    comp.strokeCap(SQUARE);  // In p5.js si usa SQUARE invece di RECT per 'strokeCap'
    comp.line(random(padding, POSTER_W - padding), random(padding, POSTER_H - padding), random(padding, POSTER_W - padding), random(padding, POSTER_H - padding));
  
    comp.endDraw();
  }
  