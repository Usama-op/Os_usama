
let aiBtn=document.getElementById("aiOpen")
let aiPanel=document.getElementById("aiPanel")

aiBtn.onclick=()=>{
aiPanel.classList.toggle("hidden")
}

document.getElementById("aiInput").addEventListener("keypress",e=>{
if(e.key==="Enter"){

let msg=e.target.value
let chat=document.getElementById("aiChat")

chat.innerHTML+=`<div>User: ${msg}</div>`
chat.innerHTML+=`<div>AI: Gemini integration coming soon</div>`

e.target.value=""
}
})
