
let currentSketch = null; // keep track of current p5 instance

window.addEventListener("load", function() {
  const fileInput = document.getElementById("imageUpload");
  const algorithmSelect = document.getElementById("algorithmSelect");

  // img upload
  if (fileInput) {
    fileInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        processImage(this.files[0]); // send to image_processor
      }
    });
  }

  // handle user selected algorithm
  if (algorithmSelect) {
    algorithmSelect.addEventListener("change", function() {
      const selectedAlgorithm = this.value;
      console.log(`Selected Algorithm: ${selectedAlgorithm}`);
      initializeSketch(selectedAlgorithm);
    });

    // init default sketch
    initializeSketch(algorithmSelect.value);
  }
});

// init selected sketch
function initializeSketch(algorithm) {
  // remove existing if exists
  if (currentSketch) {
    currentSketch.remove();
    currentSketch = null;
  }

  // clear canvas
  const canvasContainer = document.getElementById("canvasContainer");
  canvasContainer.innerHTML = '';

  // init based on algorithm
  switch (algorithm) {
    case 'lines':
      currentSketch = new p5(LinesSketch);
      break;
    case 'elaborate':
      currentSketch = new p5(ElaborateSketch);
      break;
    default:
      console.warn(`Unknown algorithm selected: ${algorithm}`);
  }
}
