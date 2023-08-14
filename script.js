// Use a predefined (but still homemade) function to create the board
let mouseDown=false;
let eraser=false;
let paragraph
let colorBox=document.getElementById('col')
let valueList=[];
let noColorList=[]
let matrix=[]
for (let i=0;i<3136;i++) {valueList.push(0)}
for (let i=0;i<784;i++) {noColorList.push(-1)}
for (let i=0;i<28;i++) {
    let matrix_row=[]
    for (let i=0;i<28;i++) {
        matrix_row.push(0)
    }
    matrix.push(matrix_row)
}
// document.getElementById("guess").addEventListener('click',updatePredictions(matrix))
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
            if (tile.row<=27 && tile.column <= 27) {
                listOfSelected.push([tile.row,tile.column]);
                num=parseInt(tile.id.split("tile")[1])*4
                for (let i=num;i<4+num;i++) {
                    if (i == num+3) {
                        valueList[i]=255
                    } else {
                        valueList[i]=33
                    }
                }
                noColorList[num/4]=255;
                matrix[tile.row-1][tile.column-1]=1
            }
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
    let cookieToSave=colorList.join("::")
    console.log(cookieToSave)
    document.cookie=cookieToSave;
    console.log(document.cookie)
}
function recreate() {
    console.log(document.cookie)
    let colorList=document.cookie.split('::')
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
