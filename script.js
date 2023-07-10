document.addEventListener('DOMContentLoaded', function() {
    // Get the grid element
    const sketchpad = document.getElementById("sketchpad");
    let gridSize = 16;
    let totalSquares = gridSize * gridSize;
  
    // Configure each square and place within the grid
    let squareWidth = (sketchpad.offsetWidth / gridSize);
    let squareHeight = (sketchpad.offsetHeight / gridSize);
  
    // Set grid-template-columns property to create a grid layout
    sketchpad.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
    // Add event listener to each square for drawing functionality
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement('div');
      square.style.width = squareWidth + 'px';
      square.style.height = squareHeight + 'px';
  
      square.addEventListener('mouseover', function() {
        // Set the background color of the square when the mouse is over it
        square.style.backgroundColor = 'black';
      });
  
      sketchpad.appendChild(square);
    }
  });