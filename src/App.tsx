import React, { useState, useEffect } from 'react';
import { Download, Github, Smartphone, Timer, Palette, ArrowRight, Zap } from 'lucide-react';
// @ts-ignore
import Lenis from 'lenis';
import { FracturedLogo } from './components/Logo';
import { PhoneMockup } from './components/PhoneMockup';

// --- Components ---

const EditorialBadge = ({ text, className }: { text: string, className?: string }) => (
  <div className={`inline-flex items-center gap-2 border-b-2 border-current pb-1 mb-4 font-mono text-xs tracking-widest uppercase ${className}`}>
    <span>{text}</span>
  </div>
);

const NumberCircle = ({ num }: { num: string }) => (
  <div className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 rounded-full border border-current flex items-center justify-center font-display font-bold text-lg md:text-xl rotate-12 bg-inherit z-10">
    {num}
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  // Default fallback state (hardcoded values in case API fails)
  const [releaseData, setReleaseData] = useState({
    version: 'v0.11.0',
    downloadUrl: 'https://github.com/Whitestar14/pane-app/releases/download/v0.11.0/pane-v0.11.0-beta.apk'
  });

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch latest release from GitHub API
  useEffect(() => {
    fetch('https://api.github.com/repos/Whitestar14/pane-app/releases/latest')
      .then(res => {
        if (!res.ok) throw new Error('GitHub API response was not ok');
        return res.json();
      })
      .then(data => {
        // Find the first asset ending in .apk
        const apkAsset = data.assets?.find((asset: any) => asset.name.endsWith('.apk'));
        
        if (data.tag_name && apkAsset) {
          setReleaseData({
            version: data.tag_name,
            downloadUrl: apkAsset.browser_download_url
          });
        }
      })
      .catch((error) => {
        console.warn('Failed to fetch latest release, using fallback.', error);
      });
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    return { hours, minutes, seconds, day };
  };

  const { hours, minutes, seconds, day } = formatTime(time);
  const githubLink = "https://github.com/Whitestar14/pane-app";

  return (
    <div className="min-h-screen bg-pane-cream font-sans">
      
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="pointer-events-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 flex items-center gap-3">
             <FracturedLogo size={24} className="bg-pane-navy text-white" />
             <span className="font-display font-bold text-xl tracking-tight text-black">PANE</span>
          </div>
          
          <div className="pointer-events-auto hidden md:flex flex-col gap-2 items-end">
             <a href={releaseData.downloadUrl} className="bg-pane-tangerine text-black border-2 border-black font-bold px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2">
                GET THE APP <ArrowRight size={16} />
             </a>
          </div>
        </div>
      </nav>

      {/* Main Split Layout */}
      <main className="flex flex-col-reverse md:flex-row min-h-screen">
        
        {/* LEFT PANEL: The Visual (Navy Blue) */}
        {/* We removed overflow-hidden from this parent so the "Bridge Card" can stick out on desktop */}
        <div className="w-full md:w-1/2 bg-pane-navy relative min-h-[60vh] md:min-h-screen border-t-2 md:border-t-0 border-black md:border-r-0">
            
            {/* Inner Container: Handles clipping for Phone & Background Pattern */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-6 md:p-12 [perspective:1500px]">
                {/* Wavy Background Elements - Stabilized with translateZ */}
                <div className="absolute inset-0 opacity-20 [transform:translateZ(0)]" 
                     style={{ 
                        backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0px, transparent 20px, #4CC9F0 20px, #4CC9F0 40px)' 
                     }}>
                </div>
                
                {/* The Phone Mockup */}
                <div className="relative z-10 transform scale-[0.425] md:scale-50 rotate-[15deg] translate-y-16 md:translate-y-0 md:rotate-[-6deg] hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center [transform-style:preserve-3d] [transform:translateZ(0)] backface-hidden">
                    <div className="relative w-[640px] h-[1320px] bg-black rounded-[6rem] border-[24px] border-black shadow-[50px_60px_100px_-24px_rgba(0,0,0,0.5)] overflow-hidden [transform:translateZ(0)]">
                        <div className="absolute inset-0">
                            <PhoneMockup backgroundImage={'./royal-zest.png'} hours={hours} minutes={minutes} seconds={seconds} day={day} />
                        </div>
                    </div>
                </div>

                {/* Circular Graphic Element */}
                <div className="absolute top-[15%] left-[10%] w-32 h-32 border border-pane-azure rounded-full flex items-center justify-center animate-spin-slow opacity-60">
                    <div className="w-full h-[1px] bg-pane-azure"></div>
                </div>
                <div className="absolute bottom-[10%] right-[10%] text-pane-azure font-display font-bold text-9xl opacity-10 select-none">
                    12
                </div>
            </div>

            {/* The "Bridge" Card */}
            <div className="absolute top-6 left-6 md:top-[50%] md:left-auto md:right-10 md:translate-x-1/2 md:-translate-y-1/2 z-20 w-48 md:w-64 bg-white border-2 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(247,127,0,1)] md:shadow-[8px_8px_0px_0px_rgba(247,127,0,1)] [transform:translateZ(0)] backface-hidden">
                <h3 className="font-display font-bold text-lg md:text-xl uppercase mb-2 text-black">Able &<br/>Ready</h3>
                <p className="text-[10px] md:text-xs font-mono text-gray-500 mb-4">COLLECTION {releaseData.version}</p>
                <div className="text-xs md:text-sm leading-snug text-black">
                   Inspired by classic flip clocks, engineered for modern focus.
                </div>
                <div className="mt-4 flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-pane-navy"></div>
                   <div className="w-3 h-3 rounded-full bg-pane-tangerine"></div>
                   <div className="w-3 h-3 rounded-full bg-pane-sun"></div>
                </div>
            </div>
        </div>

        {/* RIGHT PANEL: The Content (Orange) */}
        {/* On mobile, this appears at the top */}
        <div className="w-full md:w-1/2 bg-pane-tangerine text-black relative flex flex-col justify-center p-8 pt-32 md:p-20 md:pl-32">
            
            <EditorialBadge text="Productivity Tools" className="border-black text-black" />

            <h1 className="font-display font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-8 uppercase">
                Mixing<br/>
                <span className="text-white">Style</span><br/>
                With<br/>
                Focus
            </h1>

            <div className="max-w-md space-y-6">
               <p className="font-sans text-lg font-medium leading-relaxed border-l-4 border-black pl-6">
                  Pane is a customizable dashboard for your desk. Featuring a retro flip-clock, Pomodoro timer, and stopwatch in one aesthetic package.
               </p>

               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-black text-white p-4 shadow-[4px_4px_0px_0px_#000000]">
                     <Timer className="mb-2 text-pane-sun" />
                     <div className="font-bold font-display uppercase">Pomodoro</div>
                     <div className="text-xs text-gray-400">Workflow</div>
                  </div>
                  <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000000]">
                     <Zap className="mb-2 text-pane-tangerine" />
                     <div className="font-bold font-display uppercase">Stopwatch</div>
                     <div className="text-xs text-gray-500">Precision</div>
                  </div>
               </div>
            </div>

            {/* Mobile-only CTA */}
            <div className="mt-8 md:hidden relative z-20">
               <a href={releaseData.downloadUrl} className="w-full flex items-center justify-center gap-3 bg-black text-white font-bold py-4 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.25)] hover:bg-gray-900 transition-colors">
                  <Download size={20} />
                  <span>Download APK</span>
               </a>
            </div>

            {/* Decorative bottom text */}
            <div className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-widest opacity-60 hidden md:block">
               Walk. Run. Leap.
            </div>
        </div>
      </main>

      {/* Feature Strip - Wavy Pattern */}
      <section className="bg-pane-sun py-20 px-6 border-t-2 border-black overflow-hidden relative">
         <div className="absolute inset-0 opacity-10" 
              style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 20px, #F77F00 20px, #F77F00 40px)' }}>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-start">
               
               <div className="md:w-1/3">
                  <h2 className="font-display font-black text-5xl md:text-6xl mb-6">THE<br/>SPECS</h2>
                  <p className="font-medium">
                     Built with standard web technologies, wrapped in Capacitor for native performance on Android.
                  </p>
               </div>

               <div className="md:w-2/3 grid md:grid-cols-2 gap-6">
                  {/* Feature Box 1 */}
                  <div className="bg-white border-2 border-black p-8 relative shadow-[8px_8px_0px_0px_#003566]">
                     <NumberCircle num="01" />
                     <h3 className="font-bold text-2xl mb-2 font-display">Customization</h3>
                     <p className="text-sm text-gray-600 mb-4">Change accent colors, wallpapers, and fonts. Make it match your physical space.</p>
                     <Palette size={24} className="text-pane-tangerine" />
                  </div>

                  {/* Feature Box 2 */}
                  <div className="bg-pane-navy text-white p-8 relative shadow-[8px_8px_0px_0px_#000000]">
                     <NumberCircle num="02" />
                     <h3 className="font-bold text-2xl mb-2 font-display">Battery Friendly</h3>
                     <p className="text-sm text-gray-300 mb-4">OLED-black backgrounds and efficient rendering keep your battery happy.</p>
                     <Smartphone size={24} className="text-pane-sun" />
                  </div>
                  
                  {/* Feature Box 3 */}
                  <div className="bg-pane-azure border-2 border-black p-8 relative shadow-[8px_8px_0px_0px_#F77F00] md:col-span-2 flex flex-col md:flex-row items-center gap-6">
                     <NumberCircle num="03" />
                     <div className="flex-1">
                        <h3 className="font-bold text-3xl mb-2 font-display">Open Source</h3>
                        <p className="text-sm text-black/80">
                           Transparency is key. The entire codebase is available on GitHub. 
                           Contributions and forks are welcome.
                        </p>
                     </div>
                     <a href={githubLink} target="_blank" rel="noreferrer" className="shrink-0 bg-white border-2 border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors flex items-center gap-2">
                        <Github size={20} />
                        GITHUB REPO
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer / Credits */}
      <footer className="bg-black text-white py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
               <div className="flex items-center gap-2 mb-4">
                  <FracturedLogo size={32} className="bg-white text-black" />
                  <span className="font-display font-bold text-2xl">PANE</span>
               </div>
               <p className="font-mono text-xs text-gray-500 max-w-xs">
                  © {new Date().getFullYear()} Pane Project.<br/>
                  Designed for focus.
               </p>
            </div>
            {/* Updated to flex-col on mobile, flex-row on desktop */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 font-display font-bold text-lg">
               <a href={releaseData.downloadUrl} className="hover:text-pane-tangerine transition-colors">DOWNLOAD</a>
               <a href={githubLink} className="hover:text-pane-tangerine transition-colors">SOURCE</a>
               <a href="#" className="hover:text-pane-tangerine transition-colors">CONTACT</a>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default App;