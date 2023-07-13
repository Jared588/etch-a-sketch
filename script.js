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
        eraseBtn.classList.remove('toggle');
      }
      if (rainbowToggle) {
        rainbowToggle = false;
        drawingColor = color.value;
        rainbowBtn.classList.remove('toggle');
      }
    });

    // clear
    var clearBtn = document.querySelector('#clear-button');
    clearBtn.addEventListener("click", function() {
      clear();
      if (eraseToggle) {
        eraseToggle = false;
        drawingColor = color.value;
        eraseBtn.classList.remove('toggle');
      }
      if (rainbowToggle) {
        rainbowToggle = false;
        drawingColor = color.value;
        rainbowBtn.classList.remove('toggle');
      }
    });

    // erase
    var eraseToggle = false;
    var eraseBtn = document.querySelector('#erase-button');
    eraseBtn.addEventListener("click", function () {
      erase();
      if (eraseToggle === false) {
        eraseToggle = true;
        eraseBtn.classList.add('toggle');
      } else {
        eraseToggle = false;
        drawingColor = color.value;
        eraseBtn.classList.remove('toggle');
      }
      if (rainbowToggle) {
        rainbowToggle = false;
        rainbowBtn.classList.remove('toggle');
      }
    });

    // button highlights when hovered on
    var buttons = document.querySelectorAll(".options"); // select all buttons with class .btn

    buttons.forEach(function(button) {
      button.addEventListener("mouseover", function() {
        button.classList.add('highlight');
      });
  
      button.addEventListener("mouseout", function() {
        button.classList.remove('highlight');
      });
    });

    // rainbow mode
    var rainbowBtn = document.querySelector('#rainbow-button');
    rainbowBtn.addEventListener('click', function () {
      if (rainbowToggle === false) {
        rainbowToggle = true;
        rainbowBtn.classList.add('toggle');
      } else {
        rainbowToggle = false;
        rainbowBtn.classList.remove('toggle');
      }
      if (eraseToggle) {
        eraseToggle = false;
        eraseBtn.classList.remove('toggle');
      }
    });
  });

// default settings
var backgroundColor = 'white';
var drawingColor = 'black';
var isDrawing = false;

// drawing functions
function startDrawing () {
  isDrawing = true;
}

function stopDrawing () {
  isDrawing = false;
}

rainbowToggle = false;
function draw() {
  if (isDrawing === true) {
    const square = event.target;
    if (square.matches('#sketchpad > div') && (rainbowToggle === false)) {
      square.style.backgroundColor = drawingColor;
    } else {
      square.style.backgroundColor = getRandomColor();
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
      startDrawing();
      draw();
    });
    square.addEventListener('mouseup', stopDrawing);
    square.addEventListener('mouseenter', draw);

    sketchpad.appendChild(square);
  }
}

// Utility function to generate a random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}