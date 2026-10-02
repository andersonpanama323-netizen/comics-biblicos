import React from 'react';
import { ArtStyleId } from '../types';

interface BiblicalSceneGraphicProps {
  panelOrder: number;
  artStyle: ArtStyleId;
  scenePrompt: string;
  className?: string;
  imageUrl?: string;
}

export const BiblicalSceneGraphic: React.FC<BiblicalSceneGraphicProps> = ({
  panelOrder,
  artStyle,
  scenePrompt,
  className = '',
  imageUrl
}) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={scenePrompt}
        className={`w-full h-full object-cover ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Generate stylized backdrop based on artStyle and panel theme
  const getStyleOverlay = () => {
    switch (artStyle) {
      case 'classic-oil':
        return (
          <div className="absolute inset-0 bg-radial from-transparent via-amber-950/40 to-black/80 pointer-events-none mix-blend-multiply" />
        );
      case 'vintage-engraving':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] mix-blend-overlay" />
        );
      case 'graphic-novel':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:8px_8px]" />
        );
      case 'byzantine-mosaic':
        return (
          <div className="absolute inset-0 bg-radial from-amber-400/20 via-yellow-700/30 to-black/60 pointer-events-none" />
        );
      case 'biblical-watercolor':
        return (
          <div className="absolute inset-0 bg-amber-50/10 pointer-events-none mix-blend-soft-light" />
        );
      default:
        return null;
    }
  };

  // Distinct biblical backdrops by panel
  const renderBackgroundScene = () => {
    // Scene 1: Fierce storm on the Sea of Galilee
    if (panelOrder === 1) {
      return (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="stormSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B1325" />
              <stop offset="40%" stopColor="#1C2740" />
              <stop offset="85%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="lightningGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="40%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>

          {/* Dark Storm Sky */}
          <rect width="600" height="400" fill="url(#stormSky)" />

          {/* Lightning flash */}
          <path d="M 320 0 L 300 110 L 335 125 L 290 230 L 310 235 L 270 320" stroke="#F8FAFC" strokeWidth="3" fill="none" opacity="0.85" filter="drop-shadow(0 0 8px #93C5FD)" />
          <path d="M 300 110 L 260 160" stroke="#93C5FD" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Heavy rain lines */}
          <g stroke="#94A3B8" strokeWidth="1" opacity="0.3" strokeDasharray="15,25">
            <line x1="50" y1="0" x2="0" y2="400" />
            <line x1="150" y1="0" x2="100" y2="400" />
            <line x1="250" y1="0" x2="200" y2="400" />
            <line x1="350" y1="0" x2="300" y2="400" />
            <line x1="450" y1="0" x2="400" y2="400" />
            <line x1="550" y1="0" x2="500" y2="400" />
          </g>

          {/* Giant Raging Sea Waves (Background) */}
          <path d="M 0 260 Q 90 200 180 250 T 360 230 T 540 270 L 600 280 L 600 400 L 0 400 Z" fill="#0C2340" opacity="0.8" />

          {/* Galilee Fishing Boat tilted in the tempest */}
          <g transform="translate(180, 160) rotate(-14)">
            {/* Mast and torn sail */}
            <line x1="110" y1="30" x2="110" y2="150" stroke="#78350F" strokeWidth="7" />
            <path d="M 110 40 Q 150 70 140 120 L 110 110 Z" fill="#E2E8F0" opacity="0.75" />
            <path d="M 110 50 Q 80 80 85 115 L 110 105 Z" fill="#CBD5E1" opacity="0.6" />
            {/* Hull */}
            <path d="M 20 130 Q 100 125 190 120 C 220 120 225 155 195 170 C 130 190 60 185 10 160 C -5 145 0 130 20 130 Z" fill="#451A03" stroke="#292524" strokeWidth="3" />
            <path d="M 25 135 Q 100 130 185 125" stroke="#9A3412" strokeWidth="4" />
          </g>

          {/* Raging Fore Waves with White Foam */}
          <path d="M 0 310 Q 80 230 170 300 C 240 220 330 250 420 310 C 500 240 570 280 600 320 L 600 400 L 0 400 Z" fill="url(#waveFront)" />
          <path d="M 0 315 Q 80 235 165 305" stroke="#E2E8F0" strokeWidth="5" fill="none" opacity="0.8" />
          <path d="M 240 225 Q 320 255 415 315" stroke="#E2E8F0" strokeWidth="6" fill="none" opacity="0.9" />
          <circle cx="170" cy="300" r="14" fill="#F8FAFC" opacity="0.7" />
          <circle cx="190" cy="308" r="8" fill="#F8FAFC" opacity="0.6" />
          <circle cx="420" cy="310" r="16" fill="#F8FAFC" opacity="0.7" />
        </svg>
      );
    }

    // Scene 2: The disciples waking Jesus in the stern
    if (panelOrder === 2) {
      return (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cabinNight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="60%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>
            <radialGradient id="jesusGlow" cx="70%" cy="70%" r="45%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="600" height="400" fill="url(#cabinNight)" />

          {/* Wooden hull planks */}
          <line x1="0" y1="80" x2="600" y2="60" stroke="#451A03" strokeWidth="8" opacity="0.6" />
          <line x1="0" y1="170" x2="600" y2="150" stroke="#451A03" strokeWidth="8" opacity="0.6" />
          <line x1="0" y1="260" x2="600" y2="240" stroke="#451A03" strokeWidth="8" opacity="0.6" />

          {/* Water crashing into boat edge */}
          <path d="M 0 100 Q 120 180 20 280 L 0 300 Z" fill="#38BDF8" opacity="0.5" />
          <circle cx="110" cy="190" r="4" fill="#E0F2FE" />
          <circle cx="95" cy="220" r="6" fill="#E0F2FE" />

          {/* Divine peaceful aura where Jesus sleeps */}
          <circle cx="430" cy="280" r="170" fill="url(#jesusGlow)" />

          {/* The pillow and calm silhouette of Christ resting */}
          <path d="M 360 310 C 370 270 480 270 540 310 C 560 330 540 360 480 370 C 400 380 340 350 360 310 Z" fill="#F8FAFC" opacity="0.85" />
          <path d="M 400 260 C 440 250 490 270 510 300" stroke="#D97706" strokeWidth="4" fill="none" opacity="0.6" />
        </svg>
      );
    }

    // Scene 3: Jesus stands with divine majesty, rebuking the wind
    if (panelOrder === 3) {
      return (
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cloudBreak" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="35%" stopColor="#1C2541" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <radialGradient id="divineLight" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="600" height="400" fill="url(#cloudBreak)" />

          {/* Holy Beams of Light breaking through clouds */}
          <polygon points="300,0 220,400 380,400" fill="url(#divineLight)" opacity="0.7" />
          <polygon points="300,0 120,400 240,400" fill="url(#divineLight)" opacity="0.4" />
          <polygon points="300,0 360,400 480,400" fill="url(#divineLight)" opacity="0.4" />

          {/* Parting storm clouds */}
          <path d="M 0 0 Q 140 100 0 220 Z" fill="#030712" opacity="0.8" />
          <path d="M 600 0 Q 460 100 600 220 Z" fill="#030712" opacity="0.8" />

          {/* Divine Halo circle behind where Jesus stands */}
          <circle cx="300" cy="180" r="110" fill="none" stroke="#FBBF24" strokeWidth="4" opacity="0.9" filter="drop-shadow(0 0 16px #F59E0B)" />
          <circle cx="300" cy="180" r="125" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="6,6" opacity="0.75" />

          {/* Calming wave base */}
          <path d="M 0 320 Q 150 290 300 310 T 600 305 L 600 400 L 0 400 Z" fill="#1E3A8A" opacity="0.9" />
          <path d="M 0 340 Q 300 325 600 335 L 600 400 L 0 400 Z" fill="#0F172A" />
        </svg>
      );
    }

    // Scene 4: Complete calm, golden dawn and worship
    return (
      <svg viewBox="0 0 600 400" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="peaceDawn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="25%" stopColor="#9333EA" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="glassSea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="30%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>

        {/* Peaceful dawn sky */}
        <rect width="600" height="400" fill="url(#peaceDawn)" />

        {/* Rising Sun */}
        <circle cx="300" cy="220" r="65" fill="#FFFBEB" filter="drop-shadow(0 0 25px #F59E0B)" />

        {/* Gentle Hills of Galilee in distance */}
        <path d="M 0 250 Q 150 200 300 240 T 600 225 L 600 260 L 0 260 Z" fill="#3B0764" opacity="0.45" />

        {/* Mirror-like Glass Sea */}
        <rect y="255" width="600" height="145" fill="url(#glassSea)" />

        {/* Sun reflection on calm water */}
        <polygon points="280,255 320,255 350,400 250,400" fill="#FEF08A" opacity="0.45" />
        <line x1="260" y1="280" x2="340" y2="280" stroke="#FFFBEB" strokeWidth="2" opacity="0.8" />
        <line x1="240" y1="310" x2="360" y2="310" stroke="#FFFBEB" strokeWidth="2" opacity="0.8" />
        <line x1="220" y1="345" x2="380" y2="345" stroke="#FFFBEB" strokeWidth="3" opacity="0.9" />

        {/* Peaceful Boat resting */}
        <path d="M 220 310 Q 300 305 380 300 C 410 305 400 330 370 340 C 310 350 260 345 220 335 Z" fill="#451A03" opacity="0.95" />
        <line x1="300" y1="240" x2="300" y2="315" stroke="#78350F" strokeWidth="4" />
      </svg>
    );
  };

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {renderBackgroundScene()}
      {getStyleOverlay()}
    </div>
  );
};
