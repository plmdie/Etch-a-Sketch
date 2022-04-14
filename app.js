const gridSize = 64;
const container = document.querySelector('.container');

let isDrawing = false;


/* make grid */

for (let i = 0; i < gridSize ** 2; i++) {
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('square'); 
    squareDiv.addEventListener('mousemove', e => {
        if (isDrawing === true) { 
            squareDiv.style.backgroundColor = "blue";
            console
        }
      });
   container.appendChild(squareDiv);    
}

const square = document.querySelectorAll('.square');

container.addEventListener('mousedown', e => {
    isDrawing = true;
});

container.addEventListener('mouseup', e => {
    if (isDrawing === true) {
        isDrawing = false;
    }
});

/*change background color*/

function changeColor(item) {
    item.style.backgroundColor = "blue";     
}


