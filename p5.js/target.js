function drawTarget() {
    target.beginDraw();
  
    buffer = source.get();  // Cattura l'immagine del canvas 'source'
  
    if (frameCount === 1) {
      target.background('#ffffff');  // Setta il background bianco al primo frame
    }
  
    sx = mouseX;
    sy = mouseY;
    sw = int(coutoutW);
    sh = int(coutoutW);
  
    dx = mouseX;
    dy = mouseY;
    dw = int(coutoutW);
    dh = int(coutoutW);
  
    if (mouseIsPressed) {
      target.copy(buffer, sx, sy, sw, sh, dx, dy, dw, dh);  // Copia parte dell'immagine buffer
    }
  
    target.endDraw();
  }
  