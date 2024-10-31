const LinesSketch = (p, processedImageData) => {
    const size = 800;
    const numlines = 8;
  
    p.setup = () => {
      const canvas = p.createCanvas(size, size);
      canvas.parent('canvasContainer');
      p.colorMode(p.HSB, 360, 100, 100);
      p.noLoop();
  
      // redrwa canvas if there is processed image data
      if (processedImageData) {
        p.redraw();
      }
    };
  
    p.draw = () => {
      p.background(220); // white background
  
      if (processedImageData) {
        //use color palette from processed image data
        const palette = processedImageData.colorPalette;
        const colors = Object.values(palette).filter(color => color);
  
        // draw lines with colors from palette
        for (let i = 0; i < numlines; i++) {
          const chosenColor = p.color(p.random(colors));
          p.stroke(chosenColor);
          p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
          console.log(`Drawing line ${i + 1} with color ${chosenColor}`);
        }
  
        p.noLoop();
      }
    };
  };
  export default LinesSketch;