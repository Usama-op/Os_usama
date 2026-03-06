
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq,type,duration){
const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();

osc.type = type;
osc.frequency.setValueAtTime(freq,audioCtx.currentTime);

gain.gain.setValueAtTime(0.1,audioCtx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+duration);

osc.connect(gain);
gain.connect(audioCtx.destination);

osc.start();
osc.stop(audioCtx.currentTime+duration);
}

function initAudio(){
if(audioCtx.state==="suspended") audioCtx.resume();
}

const canvas=document.getElementById("bg-canvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

function drawBg(){
ctx.clearRect(0,0,canvas.width,canvas.height);

const time=Date.now()*0.001;

for(let i=0;i<3;i++){
ctx.beginPath();

const x=canvas.width/2+Math.sin(time*0.5+i)*200;
const y=canvas.height/2+Math.cos(time*0.3+i)*200;

const grad=ctx.createRadialGradient(x,y,0,x,y,400);

grad.addColorStop(0,`rgba(${i*50},242,255,0.15)`);
grad.addColorStop(1,"transparent");

ctx.fillStyle=grad;
ctx.fillRect(0,0,canvas.width,canvas.height);
}

requestAnimationFrame(drawBg);
}

drawBg();

const APPS={
settings:{
title:"SYSTEM PREFERENCES",
icon:"sliders-h",
body:`
<label>Theme Accent</label>
<input type="color" onchange="updateTheme(this.value)" value="#00f2ff">
<p>Kernel: 2.5.0-Liquid</p>
`
},
terminal:{
title:"NEURAL_TERMINAL",
icon:"terminal",
body:`[OK] Neural Link Active...<br>> Ready for input.`
},
ai:{
title:"USAMA_AI",
icon:"atom",
body:`I am USAMA AI. Analyzing your biometric data...`
}
};

function updateTheme(color){
document.documentElement.style.setProperty('--accent',color);
playSound(440,'sine',0.2);
}

function openApp(key){

playSound(880,'sine',0.1);

const data=APPS[key]||{title:"App",icon:"th",body:"WIP"};

const win=document.createElement("div");
win.className="window glass";

win.style.width="550px";
win.style.height="400px";
win.style.top="100px";
win.style.left="100px";

win.innerHTML=`
<div class="win-header">

<div class="win-controls">
<div class="dot close" onclick="this.closest('.window').remove()"></div>
<div class="dot min"></div>
<div class="dot max"></div>
</div>

<span><i class="fas fa-${data.icon}"></i> ${data.title}</span>

<div style="width:60px"></div>

</div>

<div class="win-content">
${data.body}
</div>
`;

document.getElementById("window-layer").appendChild(win);
}

setTimeout(()=>{

document.getElementById("boot-screen").style.opacity="0";

setTimeout(()=>{
document.getElementById("boot-screen").remove();
document.getElementById("desktop").classList.remove("hidden");
},1000);

},3000);
