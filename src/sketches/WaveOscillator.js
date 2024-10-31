const WaveOscillator = (p, processedImageData) => {
    let angleOffset = 0;
    let numShapes = 15;
    let baseWaveRadius = 200;
    let colorOffset = 0;
    let smallCircleRadius = 15;
  
    p.setup = () => {
      const canvas = p.createCanvas(800, 800);
      canvas.parent('canvasContainer');
      p.angleMode(p.DEGREES);
      p.noFill();
      p.noLoop(); // redraw when new data
  
      // init params with processed image data if available
      if (processedImageData) {
        initializeParameters(processedImageData);
        p.redraw();
      }
    };
  
    p.draw = () => {
      p.background(15, 15, 35, 25);
      p.translate(p.width / 2, p.height / 2);
  
      colorOffset += 0.3;
  
      for (let i = 0; i < numShapes; i++) {
        const dynamicRadius = baseWaveRadius + p.sin(p.frameCount * 0.5 + i * 20) * 50;
        const currentOffset = angleOffset + i * 10;
  
        p.strokeWeight(1.5 + p.sin(p.frameCount * 0.1 + i * 15) * 3);
  
        // stroke color = image data's color palette
        let strokeColor = p.color(
          150 + p.sin(colorOffset + i * 25) * 105,
          100 + p.cos(colorOffset + i * 15) * 155,
          255 - i * 15
        );
  
        if (processedImageData && processedImageData.colorPalette) {
          const colors = Object.values(processedImageData.colorPalette).filter(Boolean);
          if (colors.length > 0) {
            strokeColor = p.color(p.random(colors));
          }
        }
        p.stroke(strokeColor);
  
        // drawing main oscillating shape
        p.beginShape();
        for (let angle = 0; angle < 360; angle += 5) {
          const offset = p.map(
            p.sin(angle * 2 + p.frameCount * 1.5 + i * 20),
            -1,
            1,
            -30,
            30
          );
          const x = (dynamicRadius + offset) * p.cos(angle + currentOffset);
          const y = (dynamicRadius + offset) * p.sin(angle + currentOffset);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
  
        // drawing additional small oscillating circles along the shape
        for (let angle = 0; angle < 360; angle += 30) {
          const smallOffset = p.map(
            p.cos(angle * 3 + p.frameCount * 2 - i * 10),
            -1,
            1,
            -10,
            10
          );
          const x = (dynamicRadius + smallOffset) * p.cos(angle + currentOffset);
          const y = (dynamicRadius + smallOffset) * p.sin(angle + currentOffset);
          p.push();
          p.translate(x, y);
          p.rotate(p.frameCount * 2);
          p.strokeWeight(1);
          p.ellipse(0, 0, smallCircleRadius + p.sin(p.frameCount * 2 + angle) * 5);
          p.pop();
        }
      }
  
      angleOffset += 0.4;
    };
  
    // init params based on EXIF data
    function initializeParameters(processedData) {
      const { exifData } = processedData;
  
      if (exifData.dateTime) {
        const [date, time] = exifData.dateTime.split(' ');
        const [year, month, day] = date.split(':').map(Number);
        const [hour, minute, second] = time.split(':').map(Number);
        const totalSeconds = hour * 3600 + minute * 60 + second + year + month / 12 + day / 365;
        numShapes = p.map(totalSeconds, 0, 24 * 60 * 60, 10, 30);
      } else if (exifData.latitude) {
        numShapes = p.map(exifData.latitude, -90, 90, 10, 30);
      }
    }
  };

  export default WaveOscillator;
  