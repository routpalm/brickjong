/*
  If the canvas can be redrawn by multipla p5 scripts, each script needs to be in instance mode, to avoid errors.
*/

function ElaborateSketch(p) {
    let processedImageData = null; // ref to global var
  
    p.setup = function() {
      let canvas = p.createCanvas(800, 800);
      canvas.parent('canvasContainer');
      p.colorMode(p.HSB, 360, 100, 100);
      p.background(0);
      p.noLoop();
  
      // listen for imageProcessed event to proceed
      document.addEventListener("imageProcessed", function() {
        console.log("'imageProcessed' event received in ElaborateSketch.");
        if (window.processedImageData) {
          processedImageData = window.processedImageData;
          p.redraw(); // draw
        }
      });
    };
  
    p.draw = function() {
      p.background(0); // starting with black background (for contrast) (changeable)
  
      if (processedImageData) {
        const { colorPalette, exifData, pixelCluster } = processedImageData;
  
        // extract dominant colors
        const dominantColors = Object.values(colorPalette).filter(color => color);
  
        // create gradient background using the two most dominant colors
        if (dominantColors.length >= 2) {
          setGradient(p, 0, 0, p.width, p.height, p.color(dominantColors[0]), p.color(dominantColors[1]), "Y");
        } else if (dominantColors.length === 1) {
          p.background(p.color(dominantColors[0]));
        }
  
        // angle offset and number of shapes will be influenced by exif data
        let numShapes = mapData(exifData, 'dateTime', 10, 50); 
        let angleOffset = mapData(exifData, 'latitude', -p.PI, p.PI);
  
        // draw geometric patterns
        for (let i = 0; i < numShapes; i++) {
          p.push();
          p.translate(p.width / 2, p.height / 2);
          p.rotate(angleOffset + i * (p.TWO_PI / numShapes));
  
          // colors determined by palette
          let fillColor = p.color(p.random(dominantColors));
          p.fill(fillColor);
          p.strokeWeight(2);
          p.stroke(p.color(255 - p.red(fillColor), 255 - p.green(fillColor), 255 - p.blue(fillColor)));
  
          // shapes determined by pixel cluster length
          let sizeFactor = p.map(pixelCluster.length, 0, 100, 10, 100);
          let shapeType = i % 3;
  
          if (shapeType === 0) {
            p.ellipse(0, 0, sizeFactor, sizeFactor);
          } else if (shapeType === 1) {
            p.rectMode(p.CENTER);
            p.rect(0, 0, sizeFactor, sizeFactor);
          } else {
            p.triangle(
              0, -sizeFactor / 2,
              sizeFactor / 2, sizeFactor / 2,
              -sizeFactor / 2, sizeFactor / 2
            );
          }
  
          p.pop();
        }
  
        // add layer of lines based on palette
        for (let i = 0; i < 100; i++) {
          p.strokeWeight(1);
          p.stroke(p.color(p.random(dominantColors)));
          let x1 = p.random(p.width);
          let y1 = p.random(p.height);
          let x2 = x1 + p.random(-50, 50);
          let y2 = y1 + p.random(-50, 50);
          p.line(x1, y1, x2, y2);
        }
  
        // particle effects (for funsies)
        for (let i = 0; i < pixelCluster.length; i++) {
          let [r, g, b, a] = pixelCluster[i];
          let pColor = p.color((r / 255) * 360, (g / 255) * 100, (b / 255) * 100, (a / 255) * 100);
          p.fill(pColor);
          p.noStroke();
          p.ellipse(p.random(p.width), p.random(p.height), 5, 5);
        }
  
        // draw once, then stop looping until new data
        p.noLoop();
      };
  
    // set the aforementioned gradient
    function setGradient(p, x, y, w, h, c1, c2, axis) {
      p.noFill();
      if (axis === "Y") {
        for (let i = y; i <= y + h; i++) {
          let inter = p.map(i, y, y + h, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(x, i, x + w, i);
        }
      } else if (axis === "X") {
        for (let i = x; i <= x + w; i++) {
          let inter = p.map(i, x, x + w, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(i, y, i, y + h);
        }
      }
    }
  
    // maps exifs data to usable values
    function mapData(exifData, key, min, max) {
      if (!exifData[key]) return (min + max) / 2;
  
      // if datetime is available, cont.
      if (key === 'dateTime') {
        // assuming dateTime is in the format "YYYY:MM:DD HH:MM:SS"
        let dateStr = exifData[key];
        let parts = dateStr.split(' ');
        let date = parts[0].split(':').map(Number);
        let time = parts[1].split(':').map(Number);
        let totalSeconds = date[0] * 3600 + date[1] * 60 + date[2] + time[0] + time[1] / 60 + time[2] / 3600;
        return p.map(totalSeconds, 0, 24, min, max);
      }
  
      // if gps data is available, cont.
      if (key === 'latitude' || key === 'longitude') {
        let value = exifData[key];
        return p.map(value, -180, 180, min, max);
      }
  
      return (min + max) / 2; // default
    }
  }
}