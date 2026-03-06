
document.querySelectorAll("[data-app]").forEach(icon=>{
icon.onclick=()=>openApp(icon.dataset.app)
})

function openApp(app){

if(app==="notes"){
createWindow("Notes",
'<textarea style="width:100%;height:100%" id="note"></textarea>')
}

if(app==="calculator"){
createWindow("Calculator",
'<input id="calcInput"><button onclick="calc()">=</button><div id="calcResult"></div>')
}

if(app==="terminal"){
createWindow("Terminal",
'<div>> Welcome to USAMA OS Terminal</div>')
}

if(app==="browser"){
createWindow("Browser",
'<iframe src="https://example.com" width="100%" height="100%"></iframe>')
}

if(app==="settings"){
createWindow("Settings","Theme switch coming soon")
}

}

function calc(){
let v=document.getElementById("calcInput").value
document.getElementById("calcResult").innerText=eval(v)
}
