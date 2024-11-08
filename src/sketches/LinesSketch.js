export const LinesSketch = (p, processedImageData) => {
  const size = 800;
  const numlines = 8;

  p.setup = () => {
    const canvas = p.createCanvas(size, size);
    canvas.parent('canvasContainer');
    p.colorMode(p.RGB, 255, 255, 255); // Set color mode to RGB
    p.noLoop();

    if (processedImageData && processedImageData.colorPalette) {
      p.redraw();
    }
  };

  p.draw = () => {
    p.background(220); // white background

    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing

    for (let i = 0; i < numlines; i++) {
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      p.stroke(chosenColor);
      p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
      console.log(`Drawing line ${i + 1} with color ${chosenColor}`);
    }

    p.noLoop();
  };
};
