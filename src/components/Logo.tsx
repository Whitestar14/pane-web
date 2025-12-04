import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "text-xl" }) => {
  return (
    <div className={`font-black tracking-tighter flex items-center justify-center bg-slate-900 text-white w-10 h-10 rounded-lg relative overflow-hidden ${className}`}>
      {/* The Fractured 12 Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative z-10 font-sans text-xl leading-none">
            {/* Top Half */}
            <span className="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pb-[1px]" style={{ clipPath: 'inset(0 0 0 0)' }}>12</span>
            {/* Bottom Half */}
            <span className="block absolute top-1/2 left-1/2 -translate-x-1/2 pt-[1px] text-gray-300" style={{ clipPath: 'inset(0 0 0 0)' }}>12</span>
            {/* Divider */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/25 z-20"></div>
        </span>
      </div>
    </div>
  );
};

export const FracturedLogo: React.FC<{ size?: number, className?: string }> = ({ size = 32, className = "bg-slate-900 text-white" }) => {
    return (
        <div 
            style={{ width: size, height: size }} 
            className={`rounded-[8px] flex items-center justify-center relative overflow-hidden shrink-0 shadow-sm ${className}`}
        >
           <div className="font-black font-sans leading-none relative w-full h-full text-current">
                {/* Top Half */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'translateY(-1px)' }}>
                    <span style={{ fontSize: size * 0.6 }}>12</span>
                </div>
                {/* Horizontal Divider Line - Subtle Glass */}
                <div className="absolute top-[50%] left-0 w-full h-[8%] bg-current opacity-20 z-10 transform -translate-y-1/2"></div>
                {/* Bottom Half */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)', transform: 'translateY(1px)' }}>
                     <span style={{ fontSize: size * 0.6 }}>12</span>
                </div>
           </div>
        </div>
    );
};