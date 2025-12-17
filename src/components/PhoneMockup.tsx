import React from 'react';
import { Battery } from 'lucide-react';
import FlipCard from './FlipCard';

interface PhoneMockupProps {
  hours: string;
  minutes: string;
  seconds: string;
  day: string;
  backgroundImage?: string;
}

const WavyBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#003566]">
    <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 200">
        <path d="M0,0 L30,0 C50,40 10,60 30,100 C50,140 10,160 30,200 L0,200 Z" fill="#F77F00" />
        <path d="M30,0 L60,0 C80,40 40,60 60,100 C80,140 40,160 60,200 L30,200 C10,160 50,140 30,100 C10,60 50,40 30,0 Z" fill="#FDF0D5" />
        <path d="M60,0 L90,0 C110,40 70,60 90,100 C110,140 70,160 90,200 L60,200 C40,160 80,140 60,100 C40,60 80,40 60,0 Z" fill="#4CC9F0" opacity="0.3"/>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10 pointer-events-none"></div>
  </div>
);

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ hours, minutes, seconds, day, backgroundImage }) => {
  return (
    <div className="relative w-full h-full bg-[#003566] font-sans text-white overflow-hidden select-none backface-hidden [transform:translateZ(0)]">
      
      {/* Background Layer: Use image if provided, otherwise default pattern */}
      {backgroundImage ? (
        <img 
          src={backgroundImage} 
          alt="Wallpaper" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <WavyBackground />
      )}

      {/* Status Bar - DOUBLED SIZES */}
      <div className="relative z-20 flex justify-between items-center px-12 pt-12 pb-4">
        <span className="text-white/90 font-bold text-[26px] tracking-wide drop-shadow-md">Pane</span>
        <div className="flex items-center gap-3 text-white/90 drop-shadow-md">
          <span className="text-[22px] font-bold tracking-wide">91%</span>
          <Battery size={32} className="fill-white/90 text-white/90" />
        </div>
      </div>

      {/* Main Interface */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 pb-32">
        
        {/* Clock Container - Gap is handled by specific margin/layout to ensure tightness */}
        <div className="flex flex-col w-full gap-2">
            {/* Hour Card - DOUBLED SIZES */}
            <div className="w-full aspect-[1.15/1] relative shadow-[0_30px_70px_rgba(0,0,0,0.3)] rounded-[5rem] overflow-hidden z-10">
                <FlipCard 
                    digit={hours}
                    textColor="#FFFFFF"
                    cardColor="#002855"
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight={900}
                    fontSize="23rem"
                    borderRadius="5rem"
                />
            </div>

            {/* Minute Card Container - DOUBLED SIZES */}
            <div className="w-full aspect-[1.15/1] relative shadow-[0_30px_70px_rgba(0,0,0,0.3)] rounded-[5rem] overflow-hidden z-0">
                <FlipCard 
                    digit={minutes}
                    textColor="#FFFFFF"
                    cardColor="#002855"
                    fontFamily="Space Grotesk, sans-serif"
                    fontWeight={900}
                    fontSize="23rem"
                    borderRadius="5rem"
                />
                
                {/* Date Overlay (Artifact) - Positioned over the top of the minute card */}
                <div className="absolute top-4 left-0 w-full text-center z-20">
                    <span className="text-pane-tangerine font-black text-3xl tracking-[0.25em] uppercase drop-shadow-sm mix-blend-screen bg-[#002855]/20 backdrop-blur-[4px] px-6 py-2 rounded-full">
                        {day}
                    </span>
                </div>

                {/* Seconds Indicator */}
                <div className="absolute bottom-10 right-14 z-30">
                    <div className="font-display font-bold text-[4rem] text-pane-cream tabular-nums drop-shadow-md leading-none">
                        {seconds}
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};