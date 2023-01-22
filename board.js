function log(message) {console.log(message)}
function classify(object) {return Object.values(object)}
function createEndRowList(width,height) {
    //console.log("Hello!")
    let endRowList=[]
    for (let i=width;i<=height*width-1;i+=width) {
        endRowList.push(i)
    }
    //log(endRowList)
    return endRowList
}
//createEndRowList(5,3)
function colorSwitch(colors,tileNumber,endRowList,width) {
    switchBool=!endRowList.includes(tileNumber)
    prev=switchBool
    if (width%2===1) {
        switchBool=true
    }
    if (switchBool===false) {
        log("End of row")
        log(switchBool)
    }
    if (switchBool) {       
        if (colors[0]===colors[1]) {
            colors[0]=colors[2]
            return colors[2];
        } else {
            colors[0]=colors[1]
            return colors[1];
        }
    } else {
        return colors[0]
    }
}
//log(colorSwitch(["red","blue","red"],7,createEndRowList(8,8)))
//log(colorSwitch(["red","blue","red"],5,createEndRowList(8,8)))
function createBoard(width,height,squareDimensions,colors,border,eventHandlers,tileProperties,additionalInfo) {
    column=1
    row=1
    let endRowList=createEndRowList(width,height)
    let board=document.createElement('div')
    board.id="board"
    board.style.display="grid"
    board.style.height=height*squareDimensions+"px"
    board.style.width=width*squareDimensions+"px"
    board.style.gridTemplate=`repeat(${height},1fr) / repeat(${width},1fr)`
    board.style.backgroundColor=border[0];board.style.gap=`${border[1]}px`;board.style.border=`${border[2]} ${border[1]}px ${border[0]}`
    if (additionalInfo[0]) {
        document.createElement("center")
    }
    document.body.appendChild(board)
    for (let i=0;i<width*height;i++) {
        let endOfRow=endRowList.includes(i+1)
        //log([endRowList,i,endOfRow])
        //log("!!")
        let tile=document.createElement('div');
        tileProperties.forEach(propPair => {
            tile[propPair[0]]=propPair[1]
        });
        eventHandlers.forEach(evPair => {
            tile.addEventListener(evPair[0],()=>{
                evPair[1](tile)
                //log("!!!")
            })
        });
        tile.classList.add('tile');
        tile.classList.add(`column${column}`)
        tile.classList.add(`row${row}`)
        tile.id=`tile${i}`;
        tile.style.backgroundColor=colorSwitch(colors,i,endRowList,width);
        if (tile.style.backgroundColor===colors[1]) {
            tile.classList.add("color1")
        } else {
            tile.classList.add("color2")
        }
        //tile.style.boxShadow=`inset 0 0 ${border[1]}px ${border[0]}, inset 0 0 ${border[1]}px ${border[0]}, inset 0 0 ${border[1]}px ${border[0]}`
        board.appendChild(tile)
        tile.coordinates=[`column${column}`, `row${row}`]
        tile.addEventListener('click', function(){
            //console.log(tile.coordinates.join(', '))
        })
        if (endOfRow) {
            row++;
            column=1;
        } else {
            column++;
        } 
        //log([row,column])
    }
}
//createBoard(10,20,80,["white","blue","green"])