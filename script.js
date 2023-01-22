// Use a predefined (but still homemade) function to create the board
let mouseDown=false;
document.addEventListener('mousedown',(e)=>{mouseDown=true;})
document.addEventListener('mouseup',(e)=>{mouseDown=false;})
let listOfSelected=[];
function darken(tile) {
    if (mouseDown) {
        tile.style.backgroundColor='black';
        tile.style.opacity='1';
        listOfSelected.push(tile);
    }
}
createBoard(
    15,15,20,
    ["","white","dimgrey" ],[/*border "black",5,"dashed"*/],
    [['mouseover',darken]],
    [],[]
)