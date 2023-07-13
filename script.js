document.addEventListener('DOMContentLoaded', function() {
    // default grid size
    var gridSize =  16;
    document.getElementById("grid-size-label").innerHTML = `${gridSize} x ${gridSize}`;

    // size slider
    const gridSizeSlider = document.getElementById("grid-size-slider")
    gridSizeSlider.addEventListener('input', function() {
      var newGridSize = gridSizeSlider.value;
      document.getElementById("grid-size-label").innerHTML = `${newGridSize} x ${newGridSize}`;
      compileSketchpad(gridSizeSlider.value);
      clear();
    });

    // create the sketchpad
    compileSketchpad(gridSize);

    // draw
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('dragstart', function(event) {
      event.preventDefault(); // Disable default dragging behavior
    });

    // color selector
    var color = document.getElementById('color-picker');
    color.addEventListener('input', function() {
      pickColor(color.value);
      if (eraseToggle === true) {
        eraseToggle = false;
        eraseBtn.classList.remove('erase-toggle');
      } 
    });

    // clear
    var clearBtn = document.querySelector('#clear-button');
    clearBtn.addEventListener("click", function() {
      clear();
      if (eraseToggle === true) {
        eraseToggle = false;
        drawingColor = color.value;
        eraseBtn.classList.remove('erase-toggle');
      } 
    });

    // erase
    var eraseToggle = false;
    var eraseBtn = document.querySelector('#erase-button');
    eraseBtn.addEventListener("click", function () {
      erase();
      if (eraseToggle === false) {
        eraseToggle = true;
        eraseBtn.classList.add('erase-toggle');
      } else {
        eraseToggle = false;
        drawingColor = color.value;
        eraseBtn.classList.remove('erase-toggle');
      }
    });
  });

// default settings
var backgroundColor = 'white';
var drawingColor = 'black';
var isDrawing = false;

// drawing functions
function startDrawing (square) {
  isDrawing = true;
  square.style.backgroundColor = drawingColor;
  square.addEventListener('mouseenter', draw);
  document.addEventListener('mousemove', draw);
}

function stopDrawing () {
  isDrawing = false;
  document.removeEventListener('mousemove', draw);
}

function draw(event) {
  if (isDrawing === true) {
    const square = event.target;
    if (square.matches('#sketchpad > div')) {
      square.style.backgroundColor = drawingColor;
    }
  }
}

function pickColor (color) {
  drawingColor = color;
}

function clear() {
  const sketchpad = document.querySelectorAll('#sketchpad > div');
  sketchpad.forEach(function(square) {
    square.style.backgroundColor = 'white';
  });
}

function erase() {
  drawingColor = backgroundColor;
}

function reset() {
  const sketchpad = document.getElementById('sketchpad');
  while (sketchpad.firstChild) {
    sketchpad.removeChild(sketchpad.firstChild);
  }
}

// sketchpad compiler
function compileSketchpad (gridSize) {
  // reset and clear sketchpad
  reset();
  clear();

  // set new size
  totalSquares = gridSize * gridSize;

  // Configure each square and place within the grid
  let squareWidth = (sketchpad.offsetWidth / gridSize);
  let squareHeight = (sketchpad.offsetHeight / gridSize);

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.style.width = squareWidth + 'px';
    square.style.height = squareHeight + 'px';

    // add drawing listeners to every square
    square.addEventListener('mousedown', function() {
      startDrawing(square);
    });

    sketchpad.appendChild(square);
  }
}