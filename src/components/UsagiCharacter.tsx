import React from 'react';

interface UsagiCharacterProps {
  pose?: 'standing' | 'holding-heart' | 'waving' | 'cheering' | 'letter' | 'peeking' | 'giving-flowers' | 'holding-flowers';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  onClick?: () => void;
}

export const UsagiCharacter: React.FC<UsagiCharacterProps> = ({
  pose = 'standing',
  className = '',
  size = 'md',
  bubbleText,
  onClick,
}) => {
  const sizeClasses = {
    xs: 'w-14 h-14',
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
    xl: 'w-56 h-56',
  }[size];

  const strokeColor = '#2A1B10';
  const bodyColor = '#FFF6D6';
  const innerEarColor = '#FFA2B6';
  const blushColor = '#FFAEBf';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''
      } ${className}`}
    >
      {/* Optional Speech Bubble */}
      {bubbleText && (
        <div className="mb-2 relative bg-white/95 px-3 py-1.5 rounded-2xl shadow-sm border border-pink-200 text-xs font-cute text-pink-600 animate-bounce">
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-white" />
        </div>
      )}

      <div className={`relative ${sizeClasses} animate-usagi-wiggle`}>
        <svg
          viewBox="0 0 200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Soft Usagi Butter Yellow Gradient for depth */}
            <linearGradient id="usagiBodyGradient" x1="100" y1="50" x2="100" y2="230" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF9DC" />
              <stop offset="1" stopColor="#FFF2CB" />
            </linearGradient>

            {/* Glowing Heart Gradient */}
            <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FF6B8B" />
              <stop offset="1" stopColor="#FF4365" />
            </linearGradient>
          </defs>

          {/* LEFT BUNNY EAR (Upright Chiikawa Usagi Style) */}
          <g className="animate-ear-twitch origin-[82px_75px]">
            <path
              d="M74 80 C68 40 68 12 82 10 C96 8 98 40 94 80 Z"
              fill="url(#usagiBodyGradient)"
              stroke={strokeColor}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            {/* Left Inner Ear Pink */}
            <path
              d="M79 72 C76 42 77 22 84 20 C91 18 92 42 89 72 Z"
              fill={innerEarColor}
            />
          </g>

          {/* RIGHT BUNNY EAR (Upright Chiikawa Usagi Style) */}
          <g className="origin-[118px_75px]" style={{ animation: 'ear-twitch 2.8s ease-in-out infinite 0.4s' }}>
            <path
              d="M106 80 C102 40 104 8 118 10 C132 12 132 40 126 80 Z"
              fill="url(#usagiBodyGradient)"
              stroke={strokeColor}
              strokeWidth="3.6"
              strokeLinejoin="round"
            />
            {/* Right Inner Ear Pink */}
            <path
              d="M111 72 C108 42 109 18 116 20 C123 22 124 42 121 72 Z"
              fill={innerEarColor}
            />
          </g>

          {/* MAIN CHUBBY HEAD & BODY SILHOUETTE (Exact match to reference drawing) */}
          <path
            d="M100 70 
               C50 70 34 98 34 135 
               C34 168 50 188 56 195
               L58 224
               C58 232 72 232 74 224
               L76 220
               Q100 223 124 220
               L126 224
               C128 232 142 232 142 224
               L144 195
               C150 188 166 168 166 135
               C166 98 150 70 100 70 Z"
            fill="url(#usagiBodyGradient)"
            stroke={strokeColor}
            strokeWidth="3.6"
            strokeLinejoin="round"
          />

          {/* STUBBY FEET DIVIDER ACCENTS */}
          {/* Left foot outer curve */}
          <path d="M58 210 L58 226 C58 234 72 234 74 226 L74 218" stroke={strokeColor} strokeWidth="3.6" strokeLinecap="round" />
          {/* Right foot outer curve */}
          <path d="M126 218 L126 226 C126 234 140 234 140 226 L140 210" stroke={strokeColor} strokeWidth="3.6" strokeLinecap="round" />
          {/* Tummy bottom line */}
          <path d="M74 220 Q100 223 126 220" stroke={strokeColor} strokeWidth="3.6" strokeLinecap="round" />

          {/* ARMS FOR DEFAULT/STANDING/LETTER/PEEKING */}
          {pose !== 'cheering' && pose !== 'waving' && pose !== 'holding-heart' && (
            <g>
              {/* Left stubby arm at side */}
              <path
                d="M56 182 C48 186 48 202 56 204 C62 204 62 192 62 186"
                fill="url(#usagiBodyGradient)"
                stroke={strokeColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Right stubby arm at side */}
              <path
                d="M144 182 C152 186 152 202 144 204 C138 204 138 192 138 186"
                fill="url(#usagiBodyGradient)"
                stroke={strokeColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* ================= EXACT USAGI FACE ================= */}

          {/* 1. DISTINCT ARCHED EYEBROWS (High above eyes, exactly like reference) */}
          <path
            d="M64 104 C72 88 84 94 90 110"
            stroke={strokeColor}
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M110 110 C116 94 128 88 136 104"
            stroke={strokeColor}
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* 2. ROSY BLUSH CHEEKS WITH 4 VERTICAL SLASHES (Iconic Chiikawa Style) */}
          {/* Left Blush Oval */}
          <ellipse cx="66" cy="144" rx="14" ry="8.5" fill={blushColor} opacity="0.85" />
          {/* Left Cheek 4 Hatch Marks (////) */}
          <g stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round">
            <line x1="57" y1="139" x2="55" y2="148" />
            <line x1="62" y1="138" x2="60" y2="149" />
            <line x1="67" y1="138" x2="65" y2="149" />
            <line x1="72" y1="139" x2="70" y2="148" />
          </g>

          {/* Right Blush Oval */}
          <ellipse cx="134" cy="144" rx="14" ry="8.5" fill={blushColor} opacity="0.85" />
          {/* Right Cheek 4 Hatch Marks (////) */}
          <g stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round">
            <line x1="128" y1="139" x2="130" y2="148" />
            <line x1="133" y1="138" x2="135" y2="149" />
            <line x1="138" y1="138" x2="140" y2="149" />
            <line x1="143" y1="139" x2="145" y2="148" />
          </g>

          {/* 3. BIG SHINY ANIME EYES (Dual circular highlights per eye) */}
          {/* Left Eye */}
          <ellipse cx="82" cy="130" rx="8" ry="10" fill={strokeColor} />
          {/* Top circular reflection */}
          <circle cx="80.5" cy="125.5" r="3.4" fill="white" />
          {/* Bottom circular reflection */}
          <circle cx="84.5" cy="133.5" r="2.2" fill="white" />

          {/* Right Eye */}
          <ellipse cx="118" cy="130" rx="8" ry="10" fill={strokeColor} />
          {/* Top circular reflection */}
          <circle cx="116.5" cy="125.5" r="3.4" fill="white" />
          {/* Bottom circular reflection */}
          <circle cx="120.5" cy="133.5" r="2.2" fill="white" />

          {/* 4. CUTE BUNNY NOSE & 'ω' MOUTH */}
          {/* Center nose nub */}
          <path
            d="M98.5 140 L101.5 140 L100 142 Z"
            fill={strokeColor}
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Iconic 'ω' mouth */}
          <path
            d="M91 146 Q95.5 152 100 145 Q104.5 152 109 146"
            stroke={strokeColor}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Cute chin mark under mouth (from reference) */}
          <path
            d="M98.5 154 Q100 156 101.5 154"
            stroke={strokeColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* ================= POSE ACCESSORIES ================= */}

          {/* POSE: HOLDING HEART */}
          {pose === 'holding-heart' && (
            <g>
              {/* BIG GLOWING RED/PINK HEART */}
              <g className="animate-pulse origin-[100px_180px]">
                <path
                  d="M100 206 C100 206 68 184 68 160 C68 146 80 138 92 146 C96 149 100 155 100 155 C100 155 104 149 108 146 C120 138 132 146 132 160 C132 184 100 206 100 206 Z"
                  fill="url(#heartGradient)"
                  stroke="#FA486B"
                  strokeWidth="2.5"
                />
                {/* Heart Gloss highlight */}
                <path
                  d="M77 155 C76 150 80 146 85 147 C87 147.5 85 153 81 156 Z"
                  fill="white"
                  opacity="0.75"
                />
                <circle cx="74" cy="162" r="2" fill="white" opacity="0.65" />
              </g>

              {/* Usagi Little Paws Hugging Heart */}
              <ellipse cx="69" cy="172" rx="9" ry="7" fill={bodyColor} stroke={strokeColor} strokeWidth="3" transform="rotate(25 69 172)" />
              <ellipse cx="131" cy="172" rx="9" ry="7" fill={bodyColor} stroke={strokeColor} strokeWidth="3" transform="rotate(-25 131 172)" />
            </g>
          )}

          {/* POSE: WAVING */}
          {pose === 'waving' && (
            <g>
              {/* Right arm waving up high */}
              <g className="origin-[142px_170px] animate-bounce">
                <path
                  d="M140 178 C154 165 168 145 170 132 C172 124 164 120 156 128 C148 137 140 155 136 170 Z"
                  fill="url(#usagiBodyGradient)"
                  stroke={strokeColor}
                  strokeWidth="3.4"
                  strokeLinecap="round"
                />
                {/* Sparkle near waving hand */}
                <path d="M174 122 L178 116 L182 122 L188 126 L182 130 L178 136 L174 130 L168 126 Z" fill="#FFC93C" />
              </g>

              {/* Left hand relaxed */}
              <path
                d="M56 182 C48 186 48 202 56 204 C62 204 62 192 62 186"
                fill="url(#usagiBodyGradient)"
                stroke={strokeColor}
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* POSE: LETTER */}
          {pose === 'letter' && (
            <g>
              {/* Envelope */}
              <g transform="translate(68, 168)">
                <rect x="0" y="0" width="64" height="42" rx="6" fill="#FFFDF8" stroke="#F472B6" strokeWidth="2.4" />
                <path d="M0 0 L32 24 L64 0" stroke="#F472B6" strokeWidth="2.2" fill="#FDF2F8" />
                <circle cx="32" cy="22" r="7" fill="#E11D48" />
                {/* Mini heart seal */}
                <path d="M32 25 C32 25 28.5 22 28.5 20 C28.5 18 30.5 17.5 32 19.5 C33.5 17.5 35.5 18 35.5 20 C35.5 22 32 25 32 25 Z" fill="white" />
              </g>
              {/* Paws holding envelope */}
              <ellipse cx="67" cy="188" rx="8" ry="6.5" fill={bodyColor} stroke={strokeColor} strokeWidth="3" />
              <ellipse cx="133" cy="188" rx="8" ry="6.5" fill={bodyColor} stroke={strokeColor} strokeWidth="3" />
            </g>
          )}

          {/* POSE: CHEERING */}
          {pose === 'cheering' && (
            <g>
              {/* Both arms up cheering */}
              <path
                d="M58 178 C46 162 34 140 32 128 C30 120 40 115 48 124 C56 134 66 155 70 170 Z"
                fill="url(#usagiBodyGradient)"
                stroke={strokeColor}
                strokeWidth="3.4"
                strokeLinecap="round"
              />
              <path
                d="M142 178 C154 162 166 140 168 128 C170 120 160 115 152 124 C144 134 134 155 130 170 Z"
                fill="url(#usagiBodyGradient)"
                stroke={strokeColor}
                strokeWidth="3.4"
                strokeLinecap="round"
              />
              {/* Cheerful sparkles above hands */}
              <circle cx="36" cy="106" r="3.5" fill="#FFB703" />
              <circle cx="164" cy="106" r="3.5" fill="#FFB703" />
            </g>
          )}

          {/* POSE: PEEKING */}
          {pose === 'peeking' && (
            <g>
              {/* Paws resting on edge */}
              <ellipse cx="76" cy="192" rx="9" ry="6.5" fill={bodyColor} stroke={strokeColor} strokeWidth="3" />
              <ellipse cx="124" cy="192" rx="9" ry="6.5" fill={bodyColor} stroke={strokeColor} strokeWidth="3" />
            </g>
          )}

          {/* POSE: GIVING / HOLDING FLOWERS */}
          {(pose === 'giving-flowers' || pose === 'holding-flowers') && (
            <g className="origin-[100px_180px] animate-pulse">
              {/* Kraft Floral Wrapping Cone */}
              <path
                d="M78 165 L122 165 L108 218 Q100 224 92 218 Z"
                fill="#FDF2E9"
                stroke="#E0A96D"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M84 165 L100 220 L116 165"
                stroke="#F2C498"
                strokeWidth="1.8"
                fill="none"
              />

              {/* Silk Ribbon Bow */}
              <g transform="translate(100, 195)">
                {/* Ribbon tails */}
                <path d="M-4 4 Q-10 14 -12 24" stroke="#FB7185" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M4 4 Q10 14 12 24" stroke="#FB7185" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                {/* Left bow loop */}
                <ellipse cx="-7" cy="0" rx="8" ry="5" fill="#FDA4AF" stroke="#FB7185" strokeWidth="2" transform="rotate(-15 -7 0)" />
                {/* Right bow loop */}
                <ellipse cx="7" cy="0" rx="8" ry="5" fill="#FDA4AF" stroke="#FB7185" strokeWidth="2" transform="rotate(15 7 0)" />
                {/* Ribbon knot center */}
                <circle cx="0" cy="0" r="4.2" fill="#F43F5E" />
              </g>

              {/* Lush Floral Leaves */}
              <path d="M72 162 Q64 150 72 142 Q82 146 78 160 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.6" />
              <path d="M128 162 Q136 150 128 142 Q118 146 122 160 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.6" />
              <path d="M96 142 Q100 130 104 142 Z" fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.4" />

              {/* Beautiful Blooming Roses & Flowers */}
              {/* Left Pink Rose */}
              <g transform="translate(80, 150)">
                <circle cx="0" cy="0" r="13" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="2" />
                <path d="M-6 -2 Q0 -10 6 -2 Q4 6 -4 6 Z" fill="#F43F5E" />
                <path d="M-2 -1 Q2 -5 4 -1" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </g>

              {/* Right Rose */}
              <g transform="translate(120, 150)">
                <circle cx="0" cy="0" r="13" fill="#FDA4AF" stroke="#F43F5E" strokeWidth="2" />
                <path d="M-6 -2 Q0 -10 6 -2 Q4 6 -4 6 Z" fill="#F43F5E" />
                <path d="M-2 -1 Q2 -5 4 -1" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </g>

              {/* Center Big Red/Deep Pink Rose */}
              <g transform="translate(100, 142)">
                <circle cx="0" cy="0" r="16" fill="#FB7185" stroke="#E11D48" strokeWidth="2.2" />
                <path d="M-8 -3 Q0 -13 8 -3 Q6 8 -6 8 Z" fill="#E11D48" />
                <path d="M-3 -2 Q2 -7 5 -2" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="0" cy="0" r="4.5" fill="#FFE4E6" />
              </g>

              {/* Accent Sakura Blossoms & Baby's Breath */}
              <circle cx="88" cy="134" r="5" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
              <circle cx="112" cy="134" r="5" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1.5" />
              <circle cx="100" cy="124" r="4" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
              <circle cx="70" cy="154" r="2.5" fill="white" />
              <circle cx="130" cy="154" r="2.5" fill="white" />
              <circle cx="98" cy="120" r="2" fill="white" />

              {/* Little Paws Holding Bouquet Forward */}
              <ellipse cx="68" cy="172" rx="9" ry="7.5" fill={bodyColor} stroke={strokeColor} strokeWidth="3" transform="rotate(20 68 172)" />
              <ellipse cx="132" cy="172" rx="9" ry="7.5" fill={bodyColor} stroke={strokeColor} strokeWidth="3" transform="rotate(-20 132 172)" />

              {/* Sparkles around the bouquet */}
              <g className="animate-sparkle">
                <path d="M60 135 L63 129 L66 135 L72 138 L66 141 L63 147 L60 141 L54 138 Z" fill="#FDE047" />
                <path d="M136 135 L139 129 L142 135 L148 138 L142 141 L139 147 L136 141 L130 138 Z" fill="#FDE047" />
                <path d="M100 110 L102 105 L104 110 L109 112 L104 114 L102 119 L100 114 L95 112 Z" fill="#FB7185" />
              </g>
            </g>
          )}
        </svg>

        {/* Floating Stars and Sparkles decoration around character */}
        <div className="absolute -top-2 -left-2 text-yellow-400 text-lg animate-sparkle pointer-events-none">✦</div>
        <div className="absolute top-4 -right-3 text-pink-400 text-base animate-sparkle pointer-events-none" style={{ animationDelay: '0.8s' }}>💖</div>
        <div className="absolute bottom-2 -left-3 text-yellow-300 text-sm animate-sparkle pointer-events-none" style={{ animationDelay: '1.4s' }}>✨</div>
        <div className="absolute -bottom-1 -right-2 text-pink-300 text-xs animate-sparkle pointer-events-none" style={{ animationDelay: '0.5s' }}>🌸</div>
      </div>
    </div>
  );
};
