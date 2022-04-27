
const container = document.querySelector('#container');
const slider = document.querySelector('.ranger input ');
const clear = document.querySelector('.clear');
const sliderValue = document.querySelector('output');
const option = document.querySelectorAll('.option');
const colorSel = document.querySelector('#color');
const backgroundColor = '#c8e0ed';
let square = document.querySelectorAll('.square');
let isDrawing = false;


createGrid();

/* Setup range slider and clear button*/

function addInitialSetup() {
    slider.addEventListener('input', function () {
        sliderValue.innerHTML = slider.value;
    }, false);
    slider.addEventListener('change', () => createGrid());
    clear.addEventListener('click', () => {
        createGrid();
        isDrawing = false;   
    });
}

/* Clear grid */

function clearGrid() {
   const grid = document.querySelectorAll('.square');
   grid.forEach(item => item.remove());
}

/* Create grid */

function createGrid() {
    addInitialSetup();
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

/* Add event listeners */

function addListeners() {
    square = document.querySelectorAll('.square');
    if (!isDrawing) {
        square.forEach(item => item.addEventListener('mouseover', paintColor));
        isDrawing = true;
    } else {
        square.forEach(item => item.removeEventListener('mouseover', paintColor));
        isDrawing = false;
    }
}

/* Paint on grid */

function paintColor(e) {   
    let colorMode = setColorMode();
    if (colorMode === 'darken') e.target.style.backgroundColor = darken(e);
    if (colorMode === 'rainbow') e.target.style.backgroundColor = rainbow();
    if (colorMode === 'color')  {
        square.forEach(item => item.classList.remove('first-time'));
        e.target.style.backgroundColor = colorSel.value;
    }
}

/* Return active Color Mode */

function setColorMode() {
    let colorMode;
    option.forEach(item => {
        if (item.checked) colorMode = item.classList[0];
    });
    return colorMode;
}

/* convert RGB string to array */

function getRGB(rgb){
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    return rgb;     
}

/* convert hex to RGB */

function hexToRgb(hex) {
    return `rgb(${parseInt(hex.substr(1,2), 16)}, ${parseInt(hex.substr(3,2), 16)}, ${parseInt(hex.substr(5,2), 16)})`;
}  

/* Create rainbow colors */

function rainbow() {
const rainbow = [];
for (let i = 0; i < 3; i++) {
    rainbow[i] = Math.floor(Math.random() * 254); 
}
return `rgb(${rainbow})`;
}

/* Create darken colors */

function darken(e) {
    let exists = e.target.classList.contains('first-time');
    if (exists) {
        let currentColor = getRGB(e.target.style.backgroundColor);
        const currentColorDarken = currentColor.map(rgb => rgb - rgb / 10);
        return `rgb(${currentColorDarken})`;
    } else {
        e.target.classList.add('first-time');
        if (e.target.style.backgroundColor === hexToRgb(backgroundColor)) return '#bfbfbf';
    }
}