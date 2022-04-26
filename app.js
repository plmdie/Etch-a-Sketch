
const container = document.querySelector('#container');
const slider = document.querySelector('.ranger input ');
const clear = document.querySelector('.clear');
const sliderValue = document.querySelector('output');
const option = document.querySelectorAll('.option');
const colorSel = document.querySelector('#color');
const backgroundColor = '#c8e0ed';
let square = document.querySelectorAll('.square');
let isDrawing = false;
let isDarken = true;

createGrid();


/* Slider  */
/* Update slider value and create grid */
sliderValue.innerHTML = slider.value;

slider.addEventListener('input', function () {
    sliderValue.innerHTML = slider.value;
}, false);

slider.addEventListener('change', () => createGrid());

/* Clear Button */
///// Create nav buttons event listeners/////
clear.addEventListener('click', () => {
    createGrid();
    isDrawing = false;   
});


            



function clearGrid() {
   const grid = document.querySelectorAll('.square');
   grid.forEach(item => item.remove());
}

/* make grid */
function createGrid() {
    clearGrid();
    const gridSize = slider.value;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize ** 2; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.style.backgroundColor = backgroundColor; 
        container.appendChild(squareDiv);     
    }
    container.addEventListener('click', addListeners);
}

function addListeners() {
    square = document.querySelectorAll('.square');
    if (!isDrawing) {
        square.forEach(item => item.addEventListener('mouseover', colorSelected));
        isDrawing = true;
    } else {
        square.forEach(item => item.removeEventListener('mouseover', colorSelected));
        isDrawing = false;
    }
}

function colorSelected(e) {
    let colorMode = setColorMode();
    console.log(`color mode is ${colorMode}`);
    if (colorMode === 'darken') {
        
        let exists = e.target.classList.contains('first-time');
        if (exists) {
            let currentColor = getRGB(e.target.style.backgroundColor);
            const currentColorDarken = currentColor.map(rgb => rgb - rgb / 10);
            e.target.style.backgroundColor = `rgb(${currentColorDarken})`;
        } else {
            e.target.classList.add('first-time');
            if (e.target.style.backgroundColor === hexToRgb(backgroundColor)) e.target.style.backgroundColor = '#bfbfbf';
        }
            
    } 
    if (colorMode === 'rainbow') e.target.style.backgroundColor = rainbow();
    if (colorMode === 'color')  {
        square.forEach(item => item.classList.remove('first-time'));
        e.target.style.backgroundColor = colorSel.value
    }
}


function setColorMode() {
    let colorMode;
    option.forEach(item => {
        if (item.checked) colorMode = item.classList[0];
    });
    return colorMode;
}



/* function changeColor(e) {
    
    if (isDarken) {
        let exists = e.target.classList.contains('first-time');

        if (exists) {
            let currentColor = e.target.style.backgroundColor;
            
            for (let i=0; i < currentColor.length; i++) {
                currentColor[i] = currentColor[i] - parseInt(currentColor[i] / 10);
            }
            e.target.style.backgroundColor = `rgb(${currentColor})`; 
        } else if (!exists) {
            e.target.classList.add('first-time');
            e.target.style.backgroundColor = `#000000`; 
        }
    } else {
        square.forEach(item => item.classList.remove('first-time'));
        
    }    
} */

/* convert RGB string to array */

function getRGB(rgb){
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    return rgb;     
}

function hexToRgb(hex) {
    return `rgb(${parseInt(hex.substr(1,2), 16)}, ${parseInt(hex.substr(3,2), 16)}, ${parseInt(hex.substr(5,2), 16)})`;
}  

  function rainbow() {
    const rainbow = [];
    for (let i = 0; i < 3; i++) {
        rainbow[i] = Math.floor(Math.random() * 254); 
    }
    return `rgb(${rainbow})`;
  }