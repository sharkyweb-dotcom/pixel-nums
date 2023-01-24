// Use a predefined (but still homemade) function to create the board
let mouseDown=false;
let eraser=false;
let paragraph
let colorBox=document.getElementById('col')
function viewMatrix() {
    listAsString=''
    listOfSelected.forEach((val)=>{
        listAsString+='['+val[0]+','+val[1]+']<br>'
    })
    paragraph.innerHTML=listAsString
}
function processMatrix() {
    listAsString=''
    listOfSelected.forEach((val)=>{
        listAsString+='['+val[0]+','+val[1]+'],'
    })
    paragraph.innerHTML=listAsString
}
document.addEventListener('mousedown',(e)=>{mouseDown=true;})
document.addEventListener('mouseup',(e)=>{mouseDown=false;})
let listOfSelected=[];
function eraseChange() {
    eraser=!eraser;
}
function darken(tile,color) {
    if (mouseDown && !eraser) {
        if (color==undefined) {
            color=colorBox.value;
            if (color=='') {
                color='black';
            }
        }
        tile.style.backgroundColor=color;
        tile.style.opacity='1';
        listOfSelected.push([tile.row,tile.column]);
    } else if (mouseDown && eraser) {
        tile.style.backgroundColor=tile.oriColor;
        tile.style.opacity='0.1';
        listOfSelected.splice(listOfSelected.indexOf([tile.row,tile.column]),1);
    }
}
function save() {
    let colorList=[]
    Object.values(document.getElementById('board').children).forEach((child)=>{
        let color=child.style.backgroundColor;
        if (!color) {
            color='white'
        }
        colorList.push(color)
    })
    let cookieToSave=colorList.join()
    console.log(cookieToSave)
    document.cookie=cookieToSave;
}
function recreate() {
    let colorList=document.cookie.split(',')
    let index=0
    Object.values(document.getElementById('board').children).forEach((child)=>{
        darken(child,colorList[index])
        index++
    })
}
createBoard(
    28,28,13,
    ["","white","dimgrey" ],[/*border "black",5,"dashed"*/],
    [['mouseover',darken],['click',darken]],
    [],[]
)
paragraph = document.createElement('p');
document.body.appendChild(paragraph)
paragraph.id='view'