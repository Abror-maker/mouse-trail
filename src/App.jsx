import { useState, useEffect } from "react";

export default function CrystalTrailFX() {
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState("rainbow");
  const [size, setSize] = useState(16);
  const [opacity, setOpacity] = useState(0.9);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    function playClick() { audio.currentTime = 0; audio.play(); }

    function clickExplosion(e) {
      playClick();
      for (let i = 0; i < 12; i++) {
        const hue = Math.random() * 360;
        const el = document.createElement("div");
        el.style.position = "absolute";
        el.style.width = "8px";
        el.style.height = "8px";
        el.style.left = e.clientX + "px";
        el.style.top = e.clientY + "px";
        el.style.borderRadius = "50%";
        el.style.background = `hsl(${hue},100%,50%)`;
        el.style.pointerEvents = "none";
        el.style.transition = "0.5s ease-out";

        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 40;

        document.body.appendChild(el);
        setTimeout(() => {
          el.style.transform = `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0.4)`;
          el.style.opacity = 0;
        }, 20);
        setTimeout(() => el.remove(), 500);
      }
    }

    window.addEventListener("click", clickExplosion);
    return () => window.removeEventListener("click", clickExplosion);
  }, []);

  const onMove = (e) => {
    if (!enabled) return;
    const x = e.clientX;
    const y = e.clientY;
    create3DCursor(x, y);
    createNeonAura(x, y);

    switch (mode) {
      case "gradient": createGradient(x, y); break;
      case "rainbow": createRainbow(x, y); break;
      case "glass": createGlass(x, y); break;
      case "streak": createStreak(x, y); break;
      case "particles": createParticles(x, y); break;
      default: break;
    }
  };

  // EFFECT FUNCTIONS (same as before)
  const createRainbow = (x, y) => { const hue=Math.random()*360; createCircle(x,y,`hsl(${hue},100%,50%)`); };
  const createGradient = (x, y) => { const hue1=Math.random()*360; const hue2=Math.random()*360; createCircle(x,y,`linear-gradient(45deg,hsl(${hue1},100%,50%),hsl(${hue2},100%,50%))`,true); };
  const createGlass = (x, y) => { const hue=Math.random()*360; createCircle(x,y,`hsl(${hue},100%,80%)`,false,"blur(12px)"); };
  const createStreak = (x, y) => { const hue=Math.random()*360; const el=document.createElement("div"); el.style.position="absolute"; el.style.width=size*5+"px"; el.style.height=size/2+"px"; el.style.left=x+"px"; el.style.top=y+"px"; el.style.translate="-50% -50%"; el.style.background=`hsl(${hue},100%,50%)`; el.style.filter="blur(6px)"; el.style.borderRadius="20px"; el.style.opacity=opacity; el.style.pointerEvents="none"; el.style.transition="0.4s ease-out"; document.body.appendChild(el); setTimeout(()=>{ el.style.opacity=0; el.style.transform="translate(-50%,-50%) scaleX(0)"; },10); setTimeout(()=>el.remove(),400); };
  const createParticles = (x,y)=>{for(let i=0;i<8;i++){const hue=Math.random()*360;const el=document.createElement("div"); el.style.position="absolute"; el.style.width="6px"; el.style.height="6px"; el.style.background=`hsl(${hue},100%,50%)`; el.style.borderRadius="50%"; el.style.left=x+"px"; el.style.top=y+"px"; el.style.pointerEvents="none"; el.style.transition="0.5s ease-out"; const angle=Math.random()*Math.PI*2; const dist=40+Math.random()*30; document.body.appendChild(el); setTimeout(()=>{ el.style.transform=`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0.4)`; el.style.opacity=0; },20); setTimeout(()=>el.remove(),500); }};
  const createCircle = (x,y,bg,isGradient=false,filter="")=>{const el=document.createElement("div"); el.style.position="absolute"; el.style.width=size+"px"; el.style.height=size+"px"; el.style.left=x+"px"; el.style.top=y+"px"; el.style.translate="-50% -50%"; el.style.borderRadius="50%"; el.style.opacity=opacity; el.style.pointerEvents="none"; el.style.transition="0.5s ease-out"; if(isGradient) el.style.background=bg; else el.style.background=bg; el.style.filter=filter||"blur(2px)"; document.body.appendChild(el); setTimeout(()=>{ el.style.transform="translate(-50%,-50%) scale(0)"; el.style.opacity=0; },10); setTimeout(()=>el.remove(),500); };
  const create3DCursor=(x,y)=>{const el=document.createElement("div"); el.style.position="absolute"; el.style.width=size+"px"; el.style.height=size+"px"; el.style.left=x+"px"; el.style.top=y+"px"; el.style.translate="-50% -50%"; el.style.borderRadius="50%"; el.style.background=`radial-gradient(circle, rgba(255,255,255,0.9), hsl(${Math.random()*360},100%,50%))`; el.style.boxShadow="0 0 20px white"; el.style.transform="rotateX(60deg) rotateY(20deg)"; el.style.opacity=opacity; el.style.transition="0.4s ease-out"; el.style.pointerEvents="none"; document.body.appendChild(el); setTimeout(()=>{el.style.opacity=0; el.style.transform+=" scale(0.2)";},30); setTimeout(()=>el.remove(),400); };
  const createNeonAura=(x,y)=>{const hue=Math.random()*360; const el=document.createElement("div"); el.style.position="absolute"; el.style.width=size*2+"px"; el.style.height=size*2+"px"; el.style.left=x+"px"; el.style.top=y+"px"; el.style.translate="-50% -50%"; el.style.borderRadius="50%"; el.style.background=`radial-gradient(circle, hsla(${hue},100%,60%,0.8), transparent)`; el.style.filter="blur(12px)"; el.style.opacity=opacity; el.style.transition="0.6s ease-out"; el.style.pointerEvents="none"; document.body.appendChild(el); setTimeout(()=>{ el.style.opacity=0; el.style.transform="scale(2)"; },10); setTimeout(()=>el.remove(),600); };

  return (
    <div onMouseMove={onMove} className="w-full h-screen bg-black text-white p-6 select-none">
      <div className="relative max-w-sm">
        <button onClick={()=>setPanelOpen(!panelOpen)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl w-full mb-2">
          {panelOpen ? "Hide Panel" : "Show Panel"}
        </button>
        {panelOpen && (
          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold">Crystal Trail FX Engine</h2>
            <select value={mode} onChange={(e)=>setMode(e.target.value)} className="bg-white/20 p-2 rounded-xl w-full">
              <option value="rainbow">🌈 Rainbow</option>
              <option value="gradient">🔮 Gradient</option>
              <option value="glass">💎 Glass Blur</option>
              <option value="streak">🌀 Motion Streak</option>
              <option value="particles">🚀 Particle Burst</option>
            </select>
            <div><label>Size: {size}px</label><input type="range" min="6" max="40" value={size} onChange={(e)=>setSize(Number(e.target.value))} className="w-full" /></div>
            <div><label>Opacity: {opacity}</label><input type="range" min="0.1" max="1" step="0.1" value={opacity} onChange={(e)=>setOpacity(Number(e.target.value))} className="w-full" /></div>
            <button onClick={()=>setEnabled(!enabled)} className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 w-full">{enabled?"Disable":"Enable"}</button>
          </div>
        )}
      </div>
    </div>
  );
}