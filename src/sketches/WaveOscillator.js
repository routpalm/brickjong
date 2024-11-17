export const WaveOscillator = (p, processedImageData, canvasSize = 512) => {
  let angleOffset = 0;
  const numShapes = 15;
  const baseWaveRadius = canvasSize / 3; // scale radius based on canvas size

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize);
    if (p._userNode) {
      canvas.parent(p._userNode);
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.angleMode(p.DEGREES);
    p.noFill();
    p.noLoop();

    if (processedImageData && processedImageData.colorPalette) {
      initializeParameters(processedImageData);
      p.redraw();
    }
  };

  p.draw = () => {
    p.background(15, 15, 35, 25);
    p.translate(p.width / 2, p.height / 2);

    const colors = processedImageData?.colorPalette || ["rgb(255, 255, 255)"];

    for (let i = 0; i < numShapes; i++) {
      const strokeColor = colors[Math.floor(Math.random() * colors.length)];
      p.stroke(strokeColor);

      p.beginShape();
      for (let angle = 0; angle < 360; angle += 5) {
        const offset = p.map(
          p.sin(angle * 2 + i * 20),
          -1,
          1,
          -30,
          30
        );
        const x = (baseWaveRadius + offset) * p.cos(angle + angleOffset);
        const y = (baseWaveRadius + offset) * p.sin(angle + angleOffset);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    }
  };

  function initializeParameters(data) {
    const { exifData } = data;
    if (exifData && exifData.dateTime) {
      // customize parameters based on EXIF data, if needed
    }
  }
};
