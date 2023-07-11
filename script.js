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

    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('dragstart', function(event) {
      event.preventDefault(); // Disable default dragging behavior
    });

    var clearBtn = document.querySelector('#clear-button');
    clearBtn.addEventListener("click", function() {
      clear();
    });
  });

var isDrawing = false;

// drawing functions
function startDrawing (square) {
  isDrawing = true;
  square.style.backgroundColor = 'black';
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
      square.style.backgroundColor = 'black';
    }
  }
}

// button functions

function clear() {
  const sketchpad = document.querySelectorAll('#sketchpad > div');
  sketchpad.forEach(function(square) {
    square.style.backgroundColor = 'white';
  });
}
