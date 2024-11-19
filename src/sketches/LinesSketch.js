export const LinesSketch = (p, processedImageData, canvasSize = 512) => {
  const numlines = 8;

  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize);
    if (p._userNode) {
      canvas.parent(p._userNode);
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB, 255, 255, 255);
    p.noLoop();

    if (processedImageData && processedImageData.colorPalette) {
      p.redraw();
    }
  };

  p.draw = () => {
    p.background(220); // white background

    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"];

    for (let i = 0; i < numlines; i++) {
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      p.stroke(chosenColor);
      p.line(
        p.random(p.width),
        p.random(p.height),
        p.random(p.width),
        p.random(p.height)
      );
      console.log(`Drawing line ${i + 1} with color ${chosenColor}`);
    }
  };
};
