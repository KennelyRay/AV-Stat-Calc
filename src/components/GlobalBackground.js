import React from 'react';

const GlobalBackground = () => {
  return (
    <>
      {/* Global Animated Particles */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 15 + 15}s`,
              background: `radial-gradient(circle, ${
                ['rgba(0, 217, 255, 0.4)', 'rgba(124, 58, 237, 0.4)', 'rgba(245, 158, 11, 0.4)'][
                  Math.floor(Math.random() * 3)
                ]
              } 0%, transparent 70%)`,
              filter: 'blur(1px)'
            }}
          ></div>
        ))}
      </div>

      {/* Global Twinkling Stars */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          ></div>
        ))}
      </div>

      {/* Global Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div 
          className="floating-orb w-32 h-32 top-[10%] left-[5%]" 
          style={{animationDelay: '0s', animationDuration: '20s'}}
        ></div>
        <div 
          className="floating-orb w-24 h-24 top-[70%] right-[10%]" 
          style={{animationDelay: '7s', animationDuration: '25s'}}
        ></div>
        <div 
          className="floating-orb w-20 h-20 bottom-[20%] left-[15%]" 
          style={{animationDelay: '14s', animationDuration: '18s'}}
        ></div>
        <div 
          className="floating-orb w-28 h-28 top-[40%] right-[5%]" 
          style={{animationDelay: '21s', animationDuration: '22s'}}
        ></div>
      </div>
    </>
  );
};

export default GlobalBackground; 