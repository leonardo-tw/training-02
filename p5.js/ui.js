function keyReleased() {
    if (key === '1') {
      currImage = images[0];
    }
    if (key === '2') {
      currImage = images[1];
    }
    if (key === '3') {
      currImage = images[2];
    }
    if (key === '4') {
      currImage = images[3];
    }
    if (key === '5') {
      currImage = images[4];
    }
    if (key === 'r') {
      scalar = random(1, 5);
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
    let e = event.delta;  // In p5.js si usa 'delta' per ottenere il movimento della rotella
    coutoutW += e * 0.1;  // Moltiplica per 0.1 per una sensibilità simile (aggiustabile)
  }
  