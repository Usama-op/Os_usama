
class LiquidGlassEffect {
constructor(el) {
this.el = el;
this.id = 'filter-' + Math.random().toString(36).substr(2, 5);
this.init();
}

init() {
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("style", "position:fixed; width:0; height:0;");
svg.innerHTML = `
<filter id="${this.id}">
<feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
<feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
</filter>`;
document.body.appendChild(svg);
this.el.style.filter = `url(#${this.id})`;

this.el.addEventListener('mousemove', (e) => {
const rect = this.el.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width) * 100;
const y = ((e.clientY - rect.top) / rect.height) * 100;
this.el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 50%), var(--glass)`;
});
}
}
