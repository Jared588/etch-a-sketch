document.addEventListener('DOMContentLoaded', function() {
    // Get the grid element
    const sketchpad = document.getElementById("sketchpad");
    let gridSize = 64;
    let totalSquares = gridSize * gridSize;
  
    // Configure each square and place within the grid
    let squareWidth = (sketchpad.offsetWidth / gridSize);
    let squareHeight = (sketchpad.offsetHeight / gridSize);
  
    // Add event listener to each square for drawing functionality
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement('div');
      square.style.width = squareWidth + 'px';
      square.style.height = squareHeight + 'px';
  
      square.addEventListener('mousedown', function() {
        // Set the background color of the square when the mouse is pressed
        startDrawing(square);
      });

      sketchpad.appendChild(square);
    }

    // draw
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('dragstart', function(event) {
      event.preventDefault(); // Disable default dragging behavior
    });

    // color selector
    var color = document.getElementById('color-picker');
    color.addEventListener('input', function() {
      pickColor(color.value);
    });

    // clear
    var clearBtn = document.querySelector('#clear-button');
    clearBtn.addEventListener("click", function() {
      clear();
    });

    // erase
    var eraseBtn = document.querySelector('#erase-button');
    eraseBtn.addEventListener("click", function () {
      erase();
    });
  });

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
