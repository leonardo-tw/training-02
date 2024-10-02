function drawSource() {
    source.beginDraw();
    source.background(0);
    source.imageMode(CENTER);
    source.push();
    source.translate(source.width / 2 + offsetX, source.height / 2 + offsetY);
    source.scale(scalar);
    source.image(currImage, 0, 0);
    source.pop();
    source.endDraw();
  }
  