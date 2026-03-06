
(function(){

function smoothStep(a,b,t){
t=Math.max(0,Math.min(1,(t-a)/(b-a)))
return t*t*(3-2*t)
}

function length(x,y){return Math.sqrt(x*x+y*y)}

function roundedRectSDF(x,y,w,h,r){
const qx=Math.abs(x)-w+r
const qy=Math.abs(y)-h+r
return Math.min(Math.max(qx,qy),0)+length(Math.max(qx,0),Math.max(qy,0))-r
}

function generateId(){
return "glass-"+Math.random().toString(36).substr(2,9)
}

class LiquidGlass{

constructor(el){
this.el=el
const rect=el.getBoundingClientRect()
this.width=rect.width||300
this.height=rect.height||200
this.id=generateId()

this.canvas=document.createElement("canvas")
this.canvas.width=this.width
this.canvas.height=this.height
this.ctx=this.canvas.getContext("2d")

this.createFilter()
this.mouse={x:.5,y:.5}

document.addEventListener("mousemove",e=>{
const r=this.el.getBoundingClientRect()
this.mouse.x=(e.clientX-r.left)/r.width
this.mouse.y=(e.clientY-r.top)/r.height
this.update()
})

this.update()
}

createFilter(){

this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg")
this.svg.setAttribute("width","0")
this.svg.setAttribute("height","0")

const defs=document.createElementNS("http://www.w3.org/2000/svg","defs")
const filter=document.createElementNS("http://www.w3.org/2000/svg","filter")
filter.setAttribute("id",this.id)

this.feImage=document.createElementNS("http://www.w3.org/2000/svg","feImage")
this.feImage.setAttribute("id",this.id+"_map")
this.feImage.setAttribute("width",this.width)
this.feImage.setAttribute("height",this.height)

this.feDisplacement=document.createElementNS("http://www.w3.org/2000/svg","feDisplacementMap")
this.feDisplacement.setAttribute("in","SourceGraphic")
this.feDisplacement.setAttribute("in2",this.id+"_map")
this.feDisplacement.setAttribute("scale","35")
this.feDisplacement.setAttribute("xChannelSelector","R")
this.feDisplacement.setAttribute("yChannelSelector","G")

filter.appendChild(this.feImage)
filter.appendChild(this.feDisplacement)
defs.appendChild(filter)
this.svg.appendChild(defs)
document.body.appendChild(this.svg)

this.el.style.filter=`url(#${this.id})`
this.el.style.backdropFilter="blur(20px)"
}

update(){

const w=this.width
const h=this.height
const data=new Uint8ClampedArray(w*h*4)
let i=0

for(let y=0;y<h;y++){
for(let x=0;x<w;x++){

let uvx=x/w
let uvy=y/h

const ix=uvx-.5
const iy=uvy-.5

const dist=roundedRectSDF(ix,iy,.3,.3,.6)
const d=smoothStep(.8,0,dist-.1)

const mx=this.mouse.x-.5
const my=this.mouse.y-.5

const dx=mx*.08*d
const dy=my*.08*d

data[i++]=(dx+.5)*255
data[i++]=(dy+.5)*255
data[i++]=0
data[i++]=255

}}

this.ctx.putImageData(new ImageData(data,w,h),0,0)
this.feImage.setAttributeNS("http://www.w3.org/1999/xlink","href",this.canvas.toDataURL())
}

}

window.createGlass=function(el){return new LiquidGlass(el)}

window.addEventListener("load",()=>{
document.querySelectorAll(".glass").forEach(el=>createGlass(el))
})

})()
