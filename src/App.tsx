import React from 'react'
import { FracturedLogo } from './components/Logo'
import { ClockIcon, StopWatchIcon, FocusIcon, PaletteIcon, AndroidIcon, GithubIcon, SparklesIcon } from './components/Icons'

const App: React.FC = () => {
  const handleDownload = () => {
  window.location.href = "https://github.com/Whitestar14/pane-app/releases/download/v0.7.1/pane-v0.7.1-beta.apk";
};

  return (
    // MAIN CONTAINER: Full viewport height, grid-like precision.
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-pane-blue">

      {/* =========================================
          LEFT PANEL (APP) - 60%
          ========================================= */}
      <div className="w-full lg:w-[60%] bg-pane-blue text-white flex flex-col justify-between relative overflow-hidden">

        {/* Background Ambient Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[70vh] h-[70vh] bg-white/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"></div>

        {/* [HEADER] Logo - Exact same padding as Right Panel */}
        <header className="p-8 lg:p-12 xl:p-16 flex items-center z-10">
          <div className="flex items-center gap-4">
            <FracturedLogo size={48} className="bg-white text-pane-blue shadow-lg" />
            <div>
              <span className="font-black text-3xl tracking-tighter block leading-none">Pane</span>
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-60 block mt-1">Time Fractured</span>
            </div>
          </div>
        </header>

        {/* [MAIN] Content - Vertically centered */}
        <main className="flex-grow flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-8 relative z-10">
          <div className="max-w-2xl">

            {/* Version Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-mono text-xs font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-pane-orange"></span>
              <span>v0.7.1</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              MAKE TIME<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pane-orange to-amber-300">YOURS.</span>
              <span className="text-2xl font-black tracking-tighter"> (KINDA)</span>
            </h1>

            {/* The Hook */}
            <div className="mb-10 pl-6 border-l-4 border-white/20">
              <h2 className="flex items-center gap-2 text-xl font-bold font-mono text-white mb-2">
                <SparklesIcon className="w-5 h-5 text-pane-orange" />
                The Chameleon Engine
              </h2>
              <p className="text-lg md:text-xl text-blue-100 font-medium text-pretty leading-relaxed">
                Pane is not just a clock. No, really. It isn't. Its a timer, pomodoro, alarm, stopwatch, wallpaper mock app that automatically blends to whatever's on screen.
                <span className="text-white font-bold"> It belongs on your screen.</span>
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { icon: <ClockIcon />, label: "Flip Clock" },
                { icon: <FocusIcon />, label: "Pomodoro" },
                { icon: <StopWatchIcon />, label: "Stopwatch" },
                { icon: <PaletteIcon />, label: "Theme Sync" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-pane-orange" })}
                  <span className="font-mono text-xs font-bold tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                aria-label="Download"
                onClick={handleDownload}
                className="group px-8 w-full py-5 bg-white text-pane-blue rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0"
              >
                <AndroidIcon className="transition-transform align-middle group-hover:scale-110" />
                <span>Download .apk</span>
              </button>
              <div className="font-mono text-xs text-blue-200 opacity-80 pl-2">
                <p>~30MB • No Internet Required • No Ads</p>
                
              </div>
            </div>

          </div>
        </main>

        {/* [FOOTER] Copyright - Exact same padding as Right Panel */}
        <footer className="p-8 lg:p-12 xl:p-16 z-10">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-200/60 uppercase tracking-widest">
            <span>&copy; 2025 Pane App. Stud.io</span>
          </div>
        </footer>
      </div>


      {/* =========================================
          RIGHT PANEL (TERMS) - 40%
          ========================================= */}
      <div className="w-full lg:w-[40%] bg-pane-orange text-slate-900 flex flex-col justify-between border-t-8 lg:border-t-0 lg:border-l-8 border-white/10">

        {/* [HEADER] Nav Button - Exact same padding as Left Panel */}
        <header className="p-8 lg:p-12 xl:p-16 flex justify-end items-center">
          <button
            onClick={handleDownload}
            className="hidden lg:flex font-mono text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors items-center gap-2"
          >
            Get App <span className="text-lg leading-none mb-0.5">&darr;</span>
          </button>
          {/* Mobile Spacer to match layout if needed */}
          <div className="lg:hidden h-8"></div>
        </header>

        {/* [MAIN] Content - Vertically centered */}
        <main className="flex-grow flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-8">
          <div className="max-w-md mx-auto lg:mx-0 w-full">

            <div className="mb-10 flex items-center gap-3 opacity-90">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-pane-orange flex items-center justify-center font-serif italic text-xl font-bold">i</div>
              <h3 className="text-3xl font-black tracking-tighter uppercase text-slate-900">The Human Terms</h3>
            </div>

            <div className="space-y-4">
              {[
                { title: "01. Offline First", desc: "Pane has no servers. No analytics. No tracking. It doesn't even have the internet permission. Your data stays on your phone." },
                { title: "02. As Is", desc: "This is a project of passion. If it breaks, I'll fix it when I can. If you love it, tell your friends." },
                { title: "03. Your Style", desc: "You own the look. Tweak the extracted colors, change the fonts, and make it yours." }
              ].map((term, i) => (
                <div key={i} className="group p-6 bg-white/20 border border-slate-900/10 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-[1.02] cursor-default">
                  <h4 className="font-black text-lg text-slate-900 mb-1">{term.title}</h4>
                  <p className="font-mono text-sm font-medium text-slate-800 leading-snug">{term.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* [FOOTER] Github Link - Exact same padding as Left Panel */}
        <footer className="p-8 lg:p-12 xl:p-16 flex justify-end">
          <a
            href="https://github.com/Whitestar14/pane-app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-white transition-colors"
          >
            <span>Whitestar14 / pane-app</span>
            <div className="p-2 bg-slate-900 text-pane-orange rounded-full transition-transform group-hover:rotate-12">
              <GithubIcon className="w-4 h-4" />
            </div>
          </a>
        </footer>

      </div>
    </div>
  )
}

export default App