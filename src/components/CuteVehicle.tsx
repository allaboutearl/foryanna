import React from 'react';

interface CuteVehicleProps {
  isDriving?: boolean;
  phase?: 'starting' | 'hop-in' | 'driving' | 'museum-arrive' | 'usagi-walk' | 'doors-open' | 'enter-museum';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showUsagi?: boolean; // Kept for prop compatibility
}

export const CuteVehicle: React.FC<CuteVehicleProps> = ({
  isDriving = false,
  className = '',
  size = 'sm',
}) => {
  // Dimensions based on size prop (generous, clear, and prominent)
  const dimensions = {
    sm: 'w-32 h-18 sm:w-36 sm:h-20',
    md: 'w-44 h-26 sm:w-48 sm:h-28',
    lg: 'w-52 h-30 sm:w-60 sm:h-34',
  }[size];

  return (
    <div className={`relative select-none ${dimensions} ${className}`}>
      {/* Puffing Heart Exhaust when driving */}
      {isDriving && (
        <div className="absolute bottom-5 -left-8 flex flex-col items-end pointer-events-none z-10">
          <span className="text-xs text-pink-300 animate-ping" style={{ animationDuration: '1.2s' }}>♡</span>
          <div className="flex items-center gap-1 -mt-1">
            <span className="text-xs text-rose-300 animate-pulse">♡</span>
            <span className="text-base text-pink-400">💨</span>
          </div>
        </div>
      )}

      {/* Main SVG Vector Roofed Vehicle */}
      <svg
        viewBox="0 0 280 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-xl overflow-visible ${
          isDriving ? 'animate-bounce' : ''
        }`}
        style={{ animationDuration: '0.45s' }}
      >
        <defs>
          {/* Main Car Body Gradient - Sweet Candy Rose */}
          <linearGradient id="roofedCarBodyGrad" x1="20" y1="35" x2="260" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFAEC0" />
            <stop offset="35%" stopColor="#FF6B8B" />
            <stop offset="100%" stopColor="#FA4A70" />
          </linearGradient>

          {/* Roof Dome Top Highlight */}
          <linearGradient id="roofHighlight" x1="110" y1="30" x2="110" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Tinted Window Glass Gradient */}
          <linearGradient id="tintedWindowGlass" x1="120" y1="38" x2="160" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.75" />
          </linearGradient>

          {/* Chrome Trim Gradient */}
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FCE7F3" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Headlight Warm Glow */}
          <radialGradient id="headlightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="70%" stopColor="#FDE047" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
          </radialGradient>

          {/* Wheel Rim Gradient */}
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="60%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F472B6" />
          </radialGradient>

          {/* Underbody Shadow */}
          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#701A35" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ================= 1. UNDERBODY ROAD SHADOW ================= */}
        <ellipse cx="140" cy="134" rx="115" ry="12" fill="#701A35" opacity="0.3" filter="blur(3px)" />

        {/* ================= 2. CUTE ROOFED CAR CHASSIS & CABIN ================= */}
        <g filter="url(#shadowFilter)">
          {/* Main Enclosed Body Outline (Beetle / Bubble Car Silhouette) */}
          <path
            d="
              M 22 100
              C 20 86, 32 78, 48 76
              C 52 56, 75 36, 115 34
              C 145 34, 168 40, 185 54
              C 194 62, 202 72, 206 78
              L 230 84
              C 248 88, 260 98, 260 108
              C 260 118, 252 124, 238 124
              L 226 124
              C 226 108, 194 108, 194 124
              L 96 124
              C 96 108, 64 108, 64 124
              L 32 124
              C 22 124, 20 114, 22 100
              Z
            "
            fill="url(#roofedCarBodyGrad)"
            stroke="#3B2219"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Glossy Roof Highlight */}
          <path
            d="M 68 44 C 95 36, 135 36, 162 44"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Glossy Hood Highlight */}
          <path
            d="M 215 86 C 230 88, 245 94, 252 102"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Curved Fender Over Rear Wheel */}
          <path
            d="M 52 124 C 52 100, 108 100, 108 124"
            fill="none"
            stroke="#3B2219"
            strokeWidth="3.5"
          />

          {/* Curved Fender Over Front Wheel */}
          <path
            d="M 182 124 C 182 100, 238 100, 238 124"
            fill="none"
            stroke="#3B2219"
            strokeWidth="3.5"
          />

          {/* Lower Rocker Trim (Cream White Stripe) */}
          <path
            d="M 108 116 L 182 116"
            stroke="#FFF1F2"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* ================= 3. TINTED ROOFED WINDOWS ================= */}
          {/* Rear Quarter Window */}
          <path
            d="
              M 58 74
              C 62 58, 78 46, 102 44
              L 102 74
              Z
            "
            fill="url(#tintedWindowGlass)"
            stroke="#3B2219"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Rear Window Shine Highlight */}
          <path
            d="M 72 52 L 95 70"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Front / Door Side Window */}
          <path
            d="
              M 110 44
              C 134 44, 154 48, 168 58
              C 174 63, 180 70, 184 74
              L 110 74
              Z
            "
            fill="url(#tintedWindowGlass)"
            stroke="#3B2219"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Front Window Diagonal Sun Glare Lines */}
          <path
            d="M 125 48 L 155 70"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 142 48 L 168 68"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Center Pillar between windows */}
          <line x1="106" y1="42" x2="106" y2="76" stroke="#3B2219" strokeWidth="3" />

          {/* Car Door Cut-Line */}
          <path
            d="M 106 74 L 106 118 C 106 120, 114 120, 158 120 L 176 74"
            fill="none"
            stroke="#C03554"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Cute Chrome Door Handle */}
          <rect
            x="115"
            y="84"
            width="14"
            height="4"
            rx="2"
            fill="url(#chromeGrad)"
            stroke="#3B2219"
            strokeWidth="1.2"
          />

          {/* ================= 4. CUTE ROOF ACCENTS (Chiikawa / Usagi Bunny Ears Fin) ================= */}
          {/* Left Decorative Bunny Ear Roof Accent */}
          <path
            d="M 108 34 C 106 20, 114 16, 118 20 C 122 24, 120 30, 118 34 Z"
            fill="#FFF2CB"
            stroke="#3B2219"
            strokeWidth="2"
          />
          <path
            d="M 110 32 C 109 23, 114 20, 116 23 Z"
            fill="#FFA2B6"
          />

          {/* Right Decorative Bunny Ear Roof Accent */}
          <path
            d="M 124 34 C 122 20, 130 16, 134 20 C 138 24, 136 30, 134 34 Z"
            fill="#FFF2CB"
            stroke="#3B2219"
            strokeWidth="2"
          />
          <path
            d="M 126 32 C 125 23, 130 20, 132 23 Z"
            fill="#FFA2B6"
          />

          {/* Front Sparkling Round Headlight */}
          <ellipse
            cx="255"
            cy="98"
            rx="6.5"
            ry="8"
            fill="url(#headlightGlow)"
            stroke="#3B2219"
            strokeWidth="2"
          />
          {/* Headlight Eyelash / Sparkle Cute Accent */}
          <path d="M 258 90 L 263 87" stroke="#3B2219" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 261 96 L 266 95" stroke="#3B2219" strokeWidth="1.5" strokeLinecap="round" />

          {/* Rear Heart-Shaped Taillight */}
          <path
            d="M 24 96 C 24 92, 28 90, 31 92 C 34 90, 38 92, 38 96 C 38 100, 31 104, 31 104 C 31 104, 24 100, 24 96 Z"
            fill="#EF4444"
            stroke="#3B2219"
            strokeWidth="1.5"
          />

          {/* Front Bumper with Chrome Shine */}
          <rect
            x="248"
            y="114"
            width="16"
            height="8"
            rx="4"
            fill="url(#chromeGrad)"
            stroke="#3B2219"
            strokeWidth="2"
          />

          {/* Rear Bumper with Chrome Shine */}
          <rect
            x="14"
            y="114"
            width="16"
            height="8"
            rx="4"
            fill="url(#chromeGrad)"
            stroke="#3B2219"
            strokeWidth="2"
          />
        </g>

        {/* ================= 5. WHEELS WITH ROTATING HEART HUBCAPS ================= */}
        {/* Rear Wheel (Positioned at X = 80, Y = 124) */}
        <g transform="translate(80, 124)">
          <g>
            {isDriving && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="0.55s"
                repeatCount="indefinite"
              />
            )}
            {/* Black Rubber Tire */}
            <circle cx="0" cy="0" r="22" fill="#292524" stroke="#3B2219" strokeWidth="3" />
            {/* White-Wall Classic Tire Ring */}
            <circle cx="0" cy="0" r="14.5" fill="#FFFFFF" stroke="#3B2219" strokeWidth="1.8" />
            {/* Cute Pastel Pink Rim */}
            <circle cx="0" cy="0" r="10.5" fill="url(#rimGrad)" stroke="#3B2219" strokeWidth="1.8" />
            {/* Embossed Sweet Heart Hubcap */}
            <path
              d="M -3.5 -1.2 C -3.5 -3.5, -1 -4, 0 -2.2 C 1 -4, 3.5 -3.5, 3.5 -1.2 C 3.5 1.5, 0 3.8, 0 3.8 C 0 3.8, -3.5 1.5, -3.5 -1.2 Z"
              fill="#FFFFFF"
              stroke="#3B2219"
              strokeWidth="1.2"
            />
          </g>
        </g>

        {/* Front Wheel (Positioned at X = 210, Y = 124) */}
        <g transform="translate(210, 124)">
          <g>
            {isDriving && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="0.55s"
                repeatCount="indefinite"
              />
            )}
            {/* Black Rubber Tire */}
            <circle cx="0" cy="0" r="22" fill="#292524" stroke="#3B2219" strokeWidth="3" />
            {/* White-Wall Classic Tire Ring */}
            <circle cx="0" cy="0" r="14.5" fill="#FFFFFF" stroke="#3B2219" strokeWidth="1.8" />
            {/* Cute Pastel Pink Rim */}
            <circle cx="0" cy="0" r="10.5" fill="url(#rimGrad)" stroke="#3B2219" strokeWidth="1.8" />
            {/* Embossed Sweet Heart Hubcap */}
            <path
              d="M -3.5 -1.2 C -3.5 -3.5, -1 -4, 0 -2.2 C 1 -4, 3.5 -3.5, 3.5 -1.2 C 3.5 1.5, 0 3.8, 0 3.8 C 0 3.8, -3.5 1.5, -3.5 -1.2 Z"
              fill="#FFFFFF"
              stroke="#3B2219"
              strokeWidth="1.2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
