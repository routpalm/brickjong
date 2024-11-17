export const WaveOscillator = (p, processedImageData, canvasSize) => {
  let angleOffset = 0;
  const numShapes = 15;
  const baseWaveRadius = canvasSize / 2 - 20; // Adjusted for canvas size
  let colorOffset = 0;

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.angleMode(p.DEGREES);
    p.noFill();

    if (processedImageData && processedImageData.colorPalette) {
      initializeParameters(processedImageData);
    }
  };

  p.draw = () => {
    p.background(15, 15, 35, 25);
    p.translate(p.width / 2, p.height / 2);
    colorOffset += 0.3;

    const colors = processedImageData?.colorPalette || ["rgb(255, 255, 255)"]; // Fallback to white

    for (let i = 0; i < numShapes; i++) {
      const strokeColor = colors[Math.floor(Math.random() * colors.length)];
      p.stroke(strokeColor);

      p.beginShape();
      for (let angle = 0; angle < 360; angle += 5) {
        const offset = p.map(
          p.sin(angle * 2 + p.frameCount * 1.5 + i * 20),
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

    angleOffset += 0.4; // Add rotation over time
  };

  function initializeParameters(data) {
    const { exifData } = data;
    if (exifData && exifData.dateTime) {
      // Set parameters based on EXIF data, if needed
    }
  }
};
