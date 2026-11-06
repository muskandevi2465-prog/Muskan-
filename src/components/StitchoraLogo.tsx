import React from 'react';

interface StitchoraLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
  className?: string;
}

// Professional Needle, Thread & Stitching Vector Emblem
const NeedleThreadEmblem: React.FC<{ sizeClass: string; dark?: boolean }> = ({
  sizeClass,
  dark = false,
}) => (
  <div className={`relative flex items-center justify-center shrink-0 ${sizeClass}`}>
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        {/* Medallion Background Gradient */}
        <linearGradient
          id={dark ? 'muskanDarkBg' : 'muskanLightBg'}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {dark ? (
            <>
              <stop offset="0%" stopColor="#FAF5EE" />
              <stop offset="50%" stopColor="#F5ECE0" />
              <stop offset="100%" stopColor="#EADBC8" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#4A281E" />
              <stop offset="50%" stopColor="#3B2118" />
              <stop offset="100%" stopColor="#25120B" />
            </>
          )}
        </linearGradient>

        {/* Polished Gold Needle Gradient */}
        <linearGradient id="goldNeedleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="30%" stopColor="#E6C875" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8C6B28" />
        </linearGradient>

        {/* Silk Stitching Thread Gradient */}
        <linearGradient id="silkThreadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCE7EE" />
          <stop offset="40%" stopColor="#D8B4C0" />
          <stop offset="80%" stopColor="#B77D8D" />
          <stop offset="100%" stopColor="#8F5567" />
        </linearGradient>

        {/* Needle Metallic Highlight */}
        <linearGradient id="needleShine" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
        </linearGradient>

        <filter id="emblemShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* 1. Outer Solid Circle Medallion */}
      <circle
        cx="50"
        cy="50"
        r="47.5"
        fill={`url(#${dark ? 'muskanDarkBg' : 'muskanLightBg'})`}
        stroke={dark ? '#D8B4C0' : '#8F5567'}
        strokeWidth="1.2"
        filter="url(#emblemShadow)"
      />

      {/* 2. Tailored Dashed Basting Stitch Border (Couture Stitching Motif) */}
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke={dark ? '#8F5567' : '#D8B4C0'}
        strokeWidth="1.8"
        strokeDasharray="4 2.8"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* 3. Subtle Inner Concentric Guide Ring */}
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke={dark ? '#3B2118' : '#FAF5EE'}
        strokeWidth="0.6"
        opacity="0.3"
      />

      {/* 4. Cardinal Cross-Stitch Accents (+ markers at 12, 3, 6, 9 o'clock) */}
      <g stroke={dark ? '#8F5567' : '#C5A059'} strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        <line x1="50" y1="4.5" x2="50" y2="7.5" />
        <line x1="50" y1="92.5" x2="50" y2="95.5" />
        <line x1="4.5" y1="50" x2="7.5" y2="50" />
        <line x1="92.5" y1="50" x2="95.5" y2="50" />
      </g>

      {/* 5. Fluid Silk Tailoring Thread (Looping through and around the needle) */}
      <path
        d="M 23 59 C 21 44, 30 28, 48 26 C 66 24, 78 35, 76 50 C 74 65, 59 72, 45 70 C 33 68, 27 58, 33 49 C 39 40, 53 34, 67 36 C 77 38, 83 47, 81 57"
        fill="none"
        stroke="url(#silkThreadGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* 6. Central 'M' Tailoring Monogram */}
      <path
        d="M 31 66 V 34 L 50 53 L 69 34 V 66"
        stroke={dark ? '#3B2118' : '#FAF5EE'}
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 7. Slender Gold Sewing Needle (Angled diagonally with pointed tip and eye) */}
      <g transform="rotate(-38 50 50)">
        {/* Needle Shaft & Tapered Point */}
        <path
          d="M 48.6 14 H 51.4 L 51 76 L 50 86 L 49 76 Z"
          fill="url(#goldNeedleGrad)"
          stroke={dark ? '#3B2118' : '#FAF5EE'}
          strokeWidth="0.4"
        />

        {/* Needle Metallic Highlight */}
        <path
          d="M 49.3 15 H 50.7 L 50.4 75 L 50 84 L 49.8 75 Z"
          fill="url(#needleShine)"
        />

        {/* Needle Eye (Slit near top) */}
        <ellipse cx="50" cy="22" rx="0.85" ry="3.8" fill={dark ? '#FAF5EE' : '#3B2118'} />

        {/* Thread Threading Through Needle Eye */}
        <path
          d="M 46 17 C 48 20.5, 52 23.5, 56 26"
          fill="none"
          stroke="url(#silkThreadGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* 8. Thread End Knot Accent */}
      <circle cx="81" cy="57" r="2.2" fill="url(#silkThreadGrad)" />
      <circle cx="23" cy="59" r="1.5" fill="url(#silkThreadGrad)" opacity="0.8" />
    </svg>
  </div>
);

export const StitchoraLogo: React.FC<StitchoraLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  dark = false,
  className = '',
}) => {
  const sizeMap = {
    sm: {
      emblem: 'w-8 h-8 sm:w-9 sm:h-9',
      title: 'text-sm sm:text-base tracking-[0.11em]',
      subtitle: 'text-[7.5px] sm:text-[8.5px] tracking-[0.24em]',
      spacing: 'gap-2 sm:gap-2.5',
    },
    md: {
      emblem: 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12',
      title: 'text-base sm:text-lg md:text-xl tracking-[0.12em]',
      subtitle: 'text-[8.5px] sm:text-[9.5px] tracking-[0.26em]',
      spacing: 'gap-2.5 sm:gap-3',
    },
    lg: {
      emblem: 'w-13 h-13 sm:w-15 sm:h-15',
      title: 'text-xl sm:text-2xl md:text-3xl tracking-[0.13em]',
      subtitle: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
      spacing: 'gap-3 sm:gap-4',
    },
    xl: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      title: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.14em]',
      subtitle: 'text-[11px] sm:text-[12.5px] tracking-[0.3em]',
      spacing: 'gap-3.5 sm:gap-4',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // 1. Mark Only Variant
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center select-none group ${className}`} title="Muskan's Stitching">
        <NeedleThreadEmblem sizeClass={currentSize.emblem} dark={dark} />
      </div>
    );
  }

  // 2. Stacked Variant (Emblem on top, text centered below)
  if (variant === 'stacked') {
    return (
      <div
        className={`inline-flex flex-col items-center text-center select-none group ${className}`}
        title="Muskan's Stitching"
      >
        <NeedleThreadEmblem sizeClass={currentSize.emblem} dark={dark} />

        <div className="flex flex-col items-center leading-tight mt-2">
          <span
            className={`font-extrabold uppercase font-sans ${currentSize.title} ${
              dark ? 'text-[#FAF5EE]' : 'text-[#3B2118]'
            }`}
          >
            Muskan's Stitching
          </span>

          {/* Stitch Line Divider */}
          <div className="flex items-center gap-1.5 my-0.5 opacity-70">
            <span className="w-3 h-px bg-current border-b border-dashed border-current" />
            <span className="text-[9px]">✦</span>
            <span className="w-3 h-px bg-current border-b border-dashed border-current" />
          </div>

          <span
            className={`uppercase font-semibold ${currentSize.subtitle} ${
              dark ? 'text-[#D8B4C0]' : 'text-[#8F5567]'
            }`}
          >
            Bespoke Couture & Tailoring
          </span>
        </div>
      </div>
    );
  }

  // 3. Default Horizontal Variant (Emblem on left, text on right)
  return (
    <div
      className={`inline-flex items-center ${currentSize.spacing} select-none group ${className}`}
      title="Muskan's Stitching — Bespoke Couture & Tailoring"
    >
      {/* Needle, Thread & Monogram Medallion */}
      <NeedleThreadEmblem sizeClass={currentSize.emblem} dark={dark} />

      {/* Typography with Couture Stitching Accent */}
      <div className="flex flex-col justify-center leading-none text-left">
        <div className="flex items-baseline">
          <span
            className={`font-black uppercase font-sans whitespace-nowrap transition-colors ${currentSize.title} ${
              dark ? 'text-[#FAF5EE] group-hover:text-white' : 'text-[#3B2118] group-hover:text-[#2A160F]'
            }`}
          >
            Muskan's Stitching
          </span>
        </div>

        {/* Subtitle with stitching motif */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`uppercase font-bold whitespace-nowrap ${currentSize.subtitle} ${
              dark ? 'text-[#D8B4C0]' : 'text-[#8F5567]'
            }`}
          >
            Bespoke Couture & Tailoring
          </span>
          <span
            className={`hidden sm:inline-block w-4 h-px border-b border-dashed ${
              dark ? 'border-[#D8B4C0]/50' : 'border-[#8F5567]/50'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export const MuskansStitchingLogo = StitchoraLogo;

