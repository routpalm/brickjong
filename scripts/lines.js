/*
  If the canvas can be redrawn by multipla p5 scripts, each script needs to be in instance mode, to avoid errors.
*/

function LinesSketch(p) {
  let size = 800;
  let numlines = 8;

  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSB, 360, 100, 100);
    p.noLoop();

    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {
      console.log("'imageProcessed' event received in LinesSketch.");
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

  p.draw = function() {
    p.background(220); // white background

    if (window.processedImageData) {
      // color palette 
      const palette = window.processedImageData.colorPalette;
      const colors = Object.values(palette).filter(color => color);

      // draw lines with colors from the palette
      for (let i = 0; i < numlines; i++) {
        let chosenColor = p.color(p.random(colors));
        p.stroke(chosenColor);
        p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
        console.log(`Drawing line ${i+1} with color ${chosenColor}`);
      }

      p.noLoop();
    }
  };
}
