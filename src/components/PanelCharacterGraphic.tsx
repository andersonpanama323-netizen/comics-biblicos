import React from 'react';
import { PanelCharacter } from '../types';

interface PanelCharacterGraphicProps {
  character: PanelCharacter;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PanelCharacterGraphic: React.FC<PanelCharacterGraphicProps> = ({
  character,
  isSelected = false,
  onSelect
}) => {
  const { name, role, x, y, scale, flipX, pose, color } = character;

  // Visual SVG silhouette/figure based on pose
  const renderPoseGraphic = () => {
    const isJesus = role.toLowerCase().includes('jesús') || role.toLowerCase().includes('cristo') || role.toLowerCase().includes('salvador');

    return (
      <svg
        viewBox="0 0 100 140"
        className="w-24 h-36 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        style={{
          transform: `${flipX ? 'scaleX(-1)' : 'scaleX(1)'}`,
        }}
      >
        <defs>
          <radialGradient id={`halo-${character.id}`} cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Divine Halo if Jesus */}
        {isJesus && (
          <circle
            cx="50"
            cy="32"
            r="28"
            fill={`url(#halo-${character.id})`}
            filter="drop-shadow(0 0 10px #F59E0B)"
          />
        )}

        {/* Head */}
        <circle cx="50" cy="32" r="14" fill="#FDE68A" stroke="#451A03" strokeWidth="2" />
        {/* Hair / Beard */}
        <path d="M 36 28 C 36 18 64 18 64 28 C 64 42 60 48 50 48 C 40 48 36 42 36 28 Z" fill="#78350F" opacity="0.85" />
        <circle cx="50" cy="32" r="11" fill="#FEF08A" />

        {/* Robe and Body depending on pose */}
        {pose === 'glorious' && (
          <g>
            {/* Raised majestic arms */}
            <path d="M 40 50 L 15 25" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
            <path d="M 60 50 L 85 25" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
            {/* White/Golden flowing robe */}
            <path d="M 38 46 L 22 135 L 78 135 L 62 46 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
            {/* Red / Blue sash */}
            <path d="M 38 46 Q 52 80 74 135" stroke="#DC2626" strokeWidth="6" fill="none" />
          </g>
        )}

        {pose === 'kneeling' && (
          <g>
            {/* Hands clasped in pleading */}
            <path d="M 42 55 L 30 75 L 45 78" stroke={color || '#3B82F6'} strokeWidth="7" strokeLinecap="round" />
            {/* Kneeling tunic */}
            <path d="M 40 46 L 25 110 L 75 110 L 60 46 Z" fill={color || '#3B82F6'} stroke="#1E293B" strokeWidth="2" />
            {/* Lower legs folded on floor */}
            <path d="M 25 110 L 15 130 L 65 130" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
          </g>
        )}

        {pose === 'praying' && (
          <g>
            {/* Hands together in prayer */}
            <path d="M 42 55 L 50 68 L 58 55" stroke="#FEF08A" strokeWidth="6" strokeLinecap="round" />
            {/* Calm robe */}
            <path d="M 38 46 L 26 135 L 74 135 L 62 46 Z" fill={color || '#EAB308'} stroke="#451A03" strokeWidth="2" />
            <path d="M 50 50 L 50 135" stroke="#CA8A04" strokeWidth="2" />
          </g>
        )}

        {pose === 'preaching' && (
          <g>
            {/* Right hand pointing up or forward teaching */}
            <path d="M 60 50 L 82 45 L 85 30" stroke={color || '#F59E0B'} strokeWidth="7" strokeLinecap="round" />
            <path d="M 40 50 L 25 70" stroke={color || '#F59E0B'} strokeWidth="7" strokeLinecap="round" />
            {/* Standing robe */}
            <path d="M 38 46 L 24 135 L 76 135 L 62 46 Z" fill={color || '#F59E0B'} stroke="#78350F" strokeWidth="2" />
          </g>
        )}

        {(pose === 'standing' || pose === 'walking' || pose === 'pointing') && (
          <g>
            {pose === 'pointing' && (
              <path d="M 40 50 L 15 42" stroke={color || '#3B82F6'} strokeWidth="7" strokeLinecap="round" />
            )}
            <path d="M 60 50 L 75 75" stroke={color || '#3B82F6'} strokeWidth="7" strokeLinecap="round" />
            {/* Standard bibical tunic */}
            <path d="M 38 46 L 25 135 L 75 135 L 62 46 Z" fill={color || '#3B82F6'} stroke="#0F172A" strokeWidth="2" />
            {/* Belt */}
            <rect x="36" y="70" width="28" height="6" fill="#78350F" rx="2" />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: isSelected ? 25 : 15,
        cursor: 'grab'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      className={`group flex flex-col items-center select-none transition-transform active:cursor-grabbing ${
        isSelected ? 'scale-105' : ''
      }`}
    >
      {/* Selection Halo Indicator */}
      {isSelected && (
        <div className="absolute -inset-2 border-2 border-amber-400 border-dashed rounded-xl pointer-events-none animate-pulse" />
      )}

      {/* Visual character pose graphic */}
      {renderPoseGraphic()}

      {/* Name badge tag */}
      <div className="mt-1 px-2 py-0.5 bg-stone-900/90 border border-amber-500/40 rounded-full text-[10px] font-semibold text-amber-200 shadow-md backdrop-blur-xs whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};
