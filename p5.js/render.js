function render() {
    if (frameCount % 10 === 0) {
      saveCanvas(artboard, 'out/' + nf(frameCount, 6), 'png');
    }
  }
  