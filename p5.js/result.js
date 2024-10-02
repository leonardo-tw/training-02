function drawResult() {
    let tileW = result.width / TILES_X;
    let tileH = result.height / TILES_Y;
  
    let buffer = target.get();
  
    result.beginDraw();
    result.background('#f1f1f1');
  
    result.noStroke();
    
    for (let x = 0; x < TILES_X; x++) {
      for (let y = 0; y < TILES_Y; y++) {
        let px = int(x * tileW);
        let py = int(y * tileH);
        let c = buffer.get(px, py);
        let b = brightness(c);
  
        if (b < threshold) {
          result.fill(0);
        } else {
          result.fill('#f1f1f1');
        }
        
        result.push();
        result.translate(x * tileW, y * tileH);
        result.rect(0, 0, tileW, tileH);
        result.pop();
      }
    }
  
    result.endDraw();
  }
  