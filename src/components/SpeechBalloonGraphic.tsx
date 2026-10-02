import React from 'react';
import { SpeechBalloon } from '../types';

interface SpeechBalloonGraphicProps {
  balloon: SpeechBalloon;
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdateText?: (newText: string) => void;
}

export const SpeechBalloonGraphic: React.FC<SpeechBalloonGraphicProps> = ({
  balloon,
  isSelected = false,
  onSelect,
  onUpdateText
}) => {
  const { type, text, characterSpeaker, x, y, fontSize, bgColor, textColor, tailDirection } = balloon;

  const stylePosition: React.CSSProperties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: isSelected ? 30 : 20,
    cursor: 'pointer'
  };

  // Onomatopoeia comic sound effect
  if (type === 'onomatopoeia') {
    return (
      <div
        style={stylePosition}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        className={`group transition-transform hover:scale-105 select-none ${
          isSelected ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black/50' : ''
        }`}
      >
        <div
          style={{ fontSize: `${fontSize * 1.5}px` }}
          className="font-black italic tracking-tighter uppercase text-amber-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] stroke-black [text-shadow:_2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_4px_8px_rgba(239,68,68,0.8)] rotate-[-6deg]"
        >
          {text}
        </div>
      </div>
    );
  }

  // Scripture Quote / Scripture Narration Banner
  if (type === 'scripture') {
    return (
      <div
        style={stylePosition}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        className={`max-w-xs transition-all shadow-xl select-none ${
          isSelected ? 'ring-2 ring-amber-400' : ''
        }`}
      >
        <div
          style={{
            backgroundColor: bgColor || '#1C1917',
            color: textColor || '#F59E0B',
            fontSize: `${fontSize}px`
          }}
          className="px-3 py-1.5 rounded-sm border-l-4 border-amber-500 font-serif shadow-lg backdrop-blur-xs bg-opacity-95"
        >
          <p className="italic font-medium leading-tight">{text}</p>
        </div>
      </div>
    );
  }

  // Shout / Starburst Comic Balloon
  if (type === 'shout') {
    return (
      <div
        style={stylePosition}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        className={`relative inline-block select-none group max-w-xs ${
          isSelected ? 'scale-105' : ''
        }`}
      >
        <div
          style={{
            backgroundColor: bgColor || '#FFFFFF',
            color: textColor || '#000000',
            fontSize: `${fontSize}px`
          }}
          className="relative px-4 py-2.5 font-black uppercase tracking-wide border-2 border-black rounded-lg shadow-xl [clip-path:polygon(0%_15%,10%_0%,25%_12%,45%_0%,65%_12%,85%_0%,100%_15%,92%_35%,100%_55%,90%_75%,100%_90%,80%_88%,65%_100%,50%_88%,30%_100%,18%_85%,0%_90%,8%_65%,0%_45%,10%_25%)]"
        >
          {characterSpeaker && (
            <span className="block text-[10px] text-red-600 font-bold tracking-wider">
              {characterSpeaker}
            </span>
          )}
          <span className="leading-tight block font-extrabold">{text}</span>
        </div>
      </div>
    );
  }

  // Thought Cloud Balloon
  if (type === 'thought') {
    return (
      <div
        style={stylePosition}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        className={`relative inline-block select-none max-w-xs ${
          isSelected ? 'ring-2 ring-indigo-400 rounded-2xl p-0.5' : ''
        }`}
      >
        <div
          style={{
            backgroundColor: bgColor || '#F8FAFC',
            color: textColor || '#1E293B',
            fontSize: `${fontSize}px`
          }}
          className="px-4 py-2.5 rounded-3xl border-2 border-stone-800 shadow-md font-sans italic relative leading-snug"
        >
          {characterSpeaker && (
            <span className="block text-[10px] text-stone-500 font-semibold mb-0.5 not-italic">
              {characterSpeaker} (pensando):
            </span>
          )}
          <span>{text}</span>

          {/* Thought bubbles trail */}
          <div className="absolute -bottom-3 left-4 w-3 h-3 bg-slate-100 border-2 border-stone-800 rounded-full" />
          <div className="absolute -bottom-5 left-2 w-2 h-2 bg-slate-100 border border-stone-800 rounded-full" />
        </div>
      </div>
    );
  }

  // Standard Dialog Speech Bubble with Tail
  return (
    <div
      style={stylePosition}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      className={`relative inline-block select-none max-w-xs transition-all ${
        isSelected ? 'ring-2 ring-amber-400 rounded-2xl p-0.5' : ''
      }`}
    >
      <div
        style={{
          backgroundColor: bgColor || '#FFFFFF',
          color: textColor || '#0F172A',
          fontSize: `${fontSize}px`
        }}
        className="px-3.5 py-2 rounded-2xl border-2 border-stone-900 shadow-lg font-sans relative leading-snug"
      >
        {characterSpeaker && (
          <span className="block text-[10px] uppercase font-bold text-amber-800 tracking-wider mb-0.5">
            {characterSpeaker}:
          </span>
        )}
        <span className="font-medium">{text}</span>

        {/* Tail */}
        {tailDirection === 'bottom-left' && (
          <div className="absolute -bottom-2.5 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-stone-900">
            <div className="absolute -top-[12px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>
        )}
        {tailDirection === 'bottom-right' && (
          <div className="absolute -bottom-2.5 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-stone-900">
            <div className="absolute -top-[12px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>
        )}
      </div>
    </div>
  );
};
