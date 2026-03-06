
const desktop = document.getElementById('window-layer');

function updateClock() {
const now = new Date();
const str = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
document.getElementById('top-time').innerText = str;
if(document.getElementById('lock-time')) document.getElementById('lock-time').innerText = str;
}
setInterval(updateClock, 1000);

const APPS = {
terminal: { title: "Root Terminal", icon: "terminal", body: "<div style='color:#0f0; font-family:monospace;'>USAMA_OS [Version 1.0.4]<br>> Kernel Active...<br>> _</div>" },
notes: { title: "Liquid Notes", icon: "edit", body: "<textarea style='width:100%; height:90%; background:transparent; border:none; color:white; outline:none;' placeholder='Start typing...'></textarea>" },
ai: { title: "USAMA AI", icon: "robot", body: "<div style='height:80%; overflow:auto; padding:5px;'>Hello! I am USAMA AI. How can I help?</div><input type='text' style='width:100%; background:rgba(255,255,255,0.1); border:1px solid var(--border); color:white;' placeholder='Ask...'>" },
browser: { title: "Webview", icon: "globe", body: "<div style='text-align:center; padding:20px;'>Sandbox Mode: External URLs Restricted</div>" },
settings: { title: "Settings", icon: "cog", body: "<p>Theme: Liquid Dark</p><p>Version: 2026.1</p>" }
};

function openApp(key) {
const data = APPS[key];
const win = document.createElement('div');
win.className = 'window glass';
win.style.top = '100px'; win.style.left = '100px';
win.innerHTML = `
<div class="win-header">
<span><i class="fas fa-${data.icon}"></i> ${data.title}</span>
<div class="win-btns" onclick="this.closest('.window').remove()" style="cursor:pointer">✕</div>
</div>
<div class="win-content">${data.body}</div>
`;

desktop.appendChild(win);
makeDraggable(win);
new LiquidGlassEffect(win);
}

function makeDraggable(el) {
let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
el.querySelector('.win-header').onmousedown = (e) => {
p3 = e.clientX; p4 = e.clientY;
document.onmouseup = () => { document.onmousemove = null; };
document.onmousemove = (e) => {
p1 = p3 - e.clientX; p2 = p4 - e.clientY;
p3 = e.clientX; p4 = e.clientY;
el.style.top = (el.offsetTop - p2) + "px";
el.style.left = (el.offsetLeft - p1) + "px";
};
};
}

setTimeout(() => {
document.getElementById('boot-screen').classList.add('hidden');
document.getElementById('lock-screen').classList.remove('hidden');
}, 2500);

function unlockSystem() {
document.getElementById('lock-screen').classList.add('hidden');
document.getElementById('desktop').classList.remove('hidden');
new LiquidGlassEffect(document.getElementById('main-dock'));
}
