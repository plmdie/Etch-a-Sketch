const gridSize = 10;
const container = document.querySelector('.container');

let isDrawing = false;
let isDarken = true;
createGrid();

/* make grid */
function createGrid() {
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize ** 2; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square'); 
        container.appendChild(squareDiv);    
    }
    container.addEventListener('click', addListeners);
}

function addListeners() {
    const square = document.querySelectorAll('.square');
    
    if (!isDrawing && isDarken) {
        square.forEach(item => {
        //  item.removeEventListener('mouseenter', e => e.target.style.backgroundColor = "red");
        //  item.removeEventListener('mouseleave', e => e.target.style.backgroundColor = "white");
            item.addEventListener('mouseover', changeColor);
            item.addEventListener('mouseover', darken);
        });
        isDrawing = true;
    } else if (!isDrawing) {
        square.forEach(item => {
            item.addEventListener('mouseover', changeColor);
        });
    isDrawing = true;
    } else {
        square.forEach(item => {
        //    item.addEventListener('mouseenter', e => e.target.style.backgroundColor = "red");
        //    item.addEventListener('mouseleave', e => e.target.style.backgroundColor = "white");
            item.removeEventListener('mouseover', changeColor);
            item.removeEventListener('mouseover', darken);
        });
    isDrawing = false;
    }
}

/*change background color*/

function changeColor(e) {
    if (isDarken) {
        let exists = e.target.classList.contains('first-time');

        if (exists) {
            let currentColor = getRGB(e.target.style.backgroundColor);
            for (let i=0; i < currentColor.length; i++) {
                currentColor[i] = currentColor[i] - parseInt(currentColor[i] / 5);
            }
            e.target.style.backgroundColor = `rgb(${currentColor})`; 
        } else if (!exists) {
            e.target.classList.add('first-time');
            e.target.style.backgroundColor = `rgb(51, 153, 255)`; 
        }
    } else {
        let square = document.querySelectorAll('.square');
        square.forEach(item => { item.classList.remove('first-time')});
        e.target.style.backgroundColor = `rgb(245, 212, 212)`; 
    }    
}

/* convert RGB string in array */

function getRGB(rgb){
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    return rgb;     
}