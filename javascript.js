

let Pencil = document.querySelector('#pencilButton');
let Eraser = document.querySelector('#eraserButton');
let ColorPicker = document.querySelector('#color-picker-button');
let Rainbow = document.querySelector('#rainbow-button');
let ResetButton = document.querySelector("#reset-button");

let GridContent = document.querySelector(".new-div-added-to-grid");
let ChoseGivenColors = document.querySelector(".colors");
let AllColors = document.querySelector("#colorPickerInput");


let selecting_pencil = false;
let selecting_eraser = false;
let selecting_colorPicker = false;
let selecting_rainbow = false;
let isDrawing = false;

let pencil_color = "#ffffff";

let universal_value = 23;

Pencil.addEventListener("click", ()=>{
    clearRainbowInterval();
    PreventOverlap(Pencil);
    selecting_pencil = ButtonStyle(Pencil,selecting_pencil);
});
Eraser.addEventListener("click", ()=>{
    clearRainbowInterval();
    PreventOverlap(Eraser);
    selecting_eraser = ButtonStyle(Eraser,selecting_eraser);
});
ColorPicker.addEventListener("click", ()=>{
    clearRainbowInterval();
    PreventOverlap(ColorPicker);
    selecting_colorPicker = ButtonStyle(ColorPicker,selecting_colorPicker);
});
// Rainbow.addEventListener("click", ()=>{
//     PreventOverlap(Rainbow);
//     selecting_rainbow = ButtonStyle(Rainbow,selecting_rainbow);
// });

function PreventOverlap(button){
    if(selecting_eraser && button != Eraser)selecting_eraser = ButtonStyle(Eraser,selecting_eraser);
    else if(selecting_rainbow && button != Rainbow)selecting_rainbow = ButtonStyle(Rainbow,selecting_rainbow);
    else if(selecting_colorPicker && button != ColorPicker)selecting_colorPicker = ButtonStyle(ColorPicker,selecting_colorPicker);
    else if(selecting_pencil && button != Pencil)selecting_pencil = ButtonStyle(Pencil,selecting_pencil);
}
function ButtonStyle(button, selecting_item) {
    selecting_item = !selecting_item;

    if(selecting_item){
        button.classList.remove("not-selected")
        button.classList.add("selected");
        //button.style.boxShadow = 'inset 5px 5px 10px 5px rgba(0, 0, 0, 0.5)';
    }
    else{
        button.classList.add("not-selected")
        button.classList.remove("selected");
        //button.style.boxShadow = '5px 5px 10px 5px rgba(0, 0, 0, 0.5)';
    }
    return selecting_item;
}

function updateGridSize(value){
    document.getElementById('grid-size-value').textContent = value;
    document.getElementById('grid-size-value2').textContent = value;

    universal_value = value;

    let height_of_square = 576/value + "px";
    let width_of_square = 576/value + "px";

    const parentDiv = document.getElementById("parent-grid");
    parentDiv.innerHTML = '';
    
    for(let i = 0;i < value;++i){

        const LocalParent = document.createElement('div');
        LocalParent.innerHTML = '';

        for(let j = 0;j < value;++j){
            const newDiv = document.createElement('div');

            newDiv.style.height = height_of_square;
            newDiv.style.width = width_of_square;
            newDiv.className = "new-div-added-to-grid";
            newDiv.addEventListener('dragstart',(event)=>{
                event.preventDefault();
            });

            LocalParent.appendChild(newDiv);
        }
        parentDiv.appendChild(LocalParent);
    }

    parentDiv.addEventListener('mousedown',(event)=>{
        if(event.target.classList.contains('new-div-added-to-grid')){
            isDrawing = true;
            colorCell(event.target);
        }
    });
    parentDiv.addEventListener('mouseover',(event)=>{
        if(isDrawing && event.target.classList.contains('new-div-added-to-grid')){
            colorCell(event.target);
        }
    });
    document.addEventListener('mouseup',()=>{
        isDrawing = false;
    });
    
}
function colorCell(cell){
    if(selecting_pencil){
        cell.style.backgroundColor = pencil_color;
    }
    else if(selecting_eraser){
        cell.style.backgroundColor = "#ffffff";
    }
    else if(selecting_rainbow){
        cell.style.backgroundColor = pencil_color;
    }
}
function selectColor(color){
    clearRainbowInterval();
    pencil_color = color;
}
ChoseGivenColors.addEventListener("click",(event)=>{
    clearRainbowInterval();
    if(!selecting_pencil)selecting_pencil = ButtonStyle(Pencil,selecting_pencil);
    PreventOverlap(Pencil);
    if(event.target && event.target.nodeName === "DIV"){
        let selectedColor = window.getComputedStyle(event.target).backgroundColor;
        pencil_color = selectedColor;
        AllColors.value = rgbToHex(pencil_color);
        selectColor(pencil_color);
    }
});


function rgbToHex(rgb) {
    // Check if the string is in the rgb or rgba format
    let rgbValues = rgb.match(/\d+/g);

    if (!rgbValues || rgbValues.length < 3) {
        return "#ffffff"; // Fallback to black if extraction fails
    }

    // Convert each RGB component to hex
    return "#" + rgbValues.slice(0, 3).map(x => {
        let hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}


document.addEventListener("DOMContentLoaded",()=>{
    let value = 23;
    document.getElementById('grid-size-value').textContent = value;
    document.getElementById('grid-size-value2').textContent = value;

    let height_of_square = 576 / value + "px";
    let width_of_square = 576 / value + "px";

    const parentDiv = document.getElementById("parent-grid");
    parentDiv.innerHTML = '';

    for(let i = 0;i < value;++i){
        const LocalParent = document.createElement('div');
        LocalParent.innerHTML = '';

        for (let j = 0;j < value;++j){
            const newDiv = document.createElement('div');

            newDiv.style.height = height_of_square;
            newDiv.style.width = width_of_square;
            newDiv.className = "new-div-added-to-grid";

            if((j <= 5 || j >= 17)){
                newDiv.style.backgroundColor = "rgb(255, 0, 0)";
            }
            else if((i >= 6 && i <= 16)){
                if(j == 12)newDiv.style.backgroundColor = "rgb(0, 128, 0)";
                if(i >= 7 && i <= 15 && j == 11)newDiv.style.backgroundColor = "rgb(0, 128, 0)";
                if(i >= 8 && i <= 14 && j == 10)newDiv.style.backgroundColor = "rgb(0, 128, 0)";
                if(i >= 9 && i <= 13 && j == 9)newDiv.style.backgroundColor = "rgb(0, 128, 0)";
                if(i >= 10 && i <= 12 && j == 8)newDiv.style.backgroundColor = "rgb(0, 128, 0)";
                if(i == 11 && j == 7)newDiv.style.backgroundColor = "rgb(0, 128, 0)";
            }
            if(i <= 12 && i >= 10){
                if(j == 13 || j == 14 || j == 15)newDiv.style.backgroundColor = "rgb(107, 57, 0)";
            }

            // Prevent dragging behavior on grid
            newDiv.addEventListener('dragstart',(event)=>{
                event.preventDefault();
            });

            LocalParent.appendChild(newDiv);
        }
        parentDiv.appendChild(LocalParent);
    }

    parentDiv.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('new-div-added-to-grid')) {
            isDrawing = true;
            colorCell(event.target);
        }
    });
    parentDiv.addEventListener('mouseover', (event) => {
        if (isDrawing && event.target.classList.contains('new-div-added-to-grid')) {
            colorCell(event.target);
        }
    });
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });
});


ColorPicker.addEventListener('click',()=>{
    selecting_colorPicker = true;
    alert("Click on a cell in the grid to pick its color!"); 
});

document.getElementById("parent-grid").addEventListener("click",(event)=>{
    if(selecting_colorPicker && event.target != null && event.target.nodeName === "DIV"){
        let selectedColor = window.getComputedStyle(event.target).backgroundColor;
        pencil_color = selectedColor; 
        selecting_colorPicker = ButtonStyle(ColorPicker,selecting_colorPicker);
        selecting_pencil = ButtonStyle(Pencil,selecting_pencil);
        AllColors.value = rgbToHex(selectedColor);
    }
});

ResetButton.addEventListener("click",()=>{
    updateGridSize(universal_value);
});

let intervalId = null;
let randomIndex = 0;

Rainbow.addEventListener('click',()=>{
    if(selecting_rainbow)clearRainbowInterval();
    
    PreventOverlap(Rainbow);
    selecting_rainbow = ButtonStyle(Rainbow, selecting_rainbow);
    let array_of_colors = ["rgb(255, 0, 0)","rgb(0, 0, 255)","rgb(160, 81, 28)","rgb(255, 238, 56)","rgb(238, 0, 255)","rgb(0, 255, 255)","rgb(255, 150, 0)","rgb(184, 184, 184)","rgb(255, 0, 200)","rgb(136, 255, 0)","rgb(128, 255, 0)","rgb(135, 0, 255)"];
    let MOD = 12;
    

    function changecolor(){
        randomIndex = (randomIndex + 1) % MOD;
        let current_color = array_of_colors[randomIndex];
        pencil_color = current_color;
        AllColors.value = rgbToHex(pencil_color);
    }
    if(selecting_rainbow){
        intervalId = setInterval(changecolor, 600);

        setTimeout(()=>{
            clearInterval(intervalId);
        }, 1000000);
    }
});

function clearRainbowInterval(){
    if(intervalId){
        clearInterval(intervalId); 
        intervalId = null; 
    }
}