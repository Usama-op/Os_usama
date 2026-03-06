
function createWindow(title,content){

let win=document.createElement("div")
win.className="window glass"

win.innerHTML=`
<div class="windowHeader">
<span>${title}</span>
<button onclick="this.closest('.window').remove()">X</button>
</div>
<div class="windowContent">${content}</div>
`

document.getElementById("windows").appendChild(win)
createGlass(win)
dragElement(win)
}

function dragElement(el){

let pos1=0,pos2=0,pos3=0,pos4=0
let header=el.querySelector(".windowHeader")

header.onmousedown=dragMouseDown

function dragMouseDown(e){
e.preventDefault()
pos3=e.clientX
pos4=e.clientY
document.onmouseup=closeDrag
document.onmousemove=elementDrag
}

function elementDrag(e){
pos1=pos3-e.clientX
pos2=pos4-e.clientY
pos3=e.clientX
pos4=e.clientY

el.style.top=(el.offsetTop-pos2)+"px"
el.style.left=(el.offsetLeft-pos1)+"px"
}

function closeDrag(){
document.onmouseup=null
document.onmousemove=null
}

}
