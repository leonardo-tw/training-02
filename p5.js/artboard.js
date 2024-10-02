function drawArtboard() {
    artboard.beginDraw();
    artboard.background(0);
    artboard.imageMode(CENTER);
    
    let buffer = result.get();  // 'result.get()' funziona in p5.js allo stesso modo per ottenere un'immagine dal canvas
    
    artboard.image(buffer, artboard.width / 2, artboard.height / 2);
    artboard.endDraw();
  }
  