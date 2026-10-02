import React from 'react';
import { ComicPanel, ArtStyleId, SpeechBalloon, PanelCharacter } from '../types';
import { BiblicalSceneGraphic } from './BiblicalSceneGraphic';
import { SpeechBalloonGraphic } from './SpeechBalloonGraphic';
import { PanelCharacterGraphic } from './PanelCharacterGraphic';
import { Sparkles, MessageSquare, Plus, UserPlus, Image as ImageIcon } from 'lucide-react';

interface ComicPanelItemProps {
  panel: ComicPanel;
  artStyle: ArtStyleId;
  isSelected: boolean;
  selectedBalloonId?: string;
  selectedCharacterId?: string;
  onSelectPanel: () => void;
  onSelectBalloon: (balloonId: string) => void;
  onSelectCharacter: (charId: string) => void;
  onAddBalloon: (type: SpeechBalloon['type']) => void;
  onAddCharacter: () => void;
  onGenerateAIArt?: () => void;
}

export const ComicPanelItem: React.FC<ComicPanelItemProps> = ({
  panel,
  artStyle,
  isSelected,
  selectedBalloonId,
  selectedCharacterId,
  onSelectPanel,
  onSelectBalloon,
  onSelectCharacter,
  onAddBalloon,
  onAddCharacter,
  onGenerateAIArt
}) => {
  return (
    <div
      onClick={onSelectPanel}
      className={`group relative flex flex-col bg-stone-950 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'ring-4 ring-amber-500 shadow-2xl shadow-amber-500/20 scale-[1.008]'
          : 'border border-stone-800 hover:border-stone-600 shadow-lg'
      }`}
      style={{ minHeight: '340px' }}
    >
      {/* Panel Order Header badge */}
      <div className="absolute top-2 left-2 z-30 flex items-center gap-1.5 px-2 py-1 bg-stone-950/85 backdrop-blur-sm border border-stone-700/80 rounded-md text-xs font-bold text-amber-300 shadow-md">
        <span className="w-2 h-2 rounded-full bg-amber-500" />
        Viñeta {panel.order}
      </div>

      {/* Floating Panel Quick Action bar (visible when active or hovered) */}
      <div className={`absolute top-2 right-2 z-30 flex items-center gap-1 bg-stone-950/90 backdrop-blur-md border border-stone-700 p-1 rounded-lg transition-opacity shadow-lg ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddBalloon('dialog');
          }}
          title="Añadir Diálogo"
          className="p-1.5 text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded transition"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddCharacter();
          }}
          title="Añadir Personaje"
          className="p-1.5 text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded transition"
        >
          <UserPlus className="w-3.5 h-3.5" />
        </button>
        {onGenerateAIArt && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGenerateAIArt();
            }}
            title="Generar ilustración con IA"
            className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-950/60 rounded transition flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          </button>
        )}
      </div>

      {/* Main Visual Stage */}
      <div className="relative flex-1 w-full h-full min-h-[280px] bg-stone-900 overflow-hidden">
        {/* Background scene graphic or image */}
        <BiblicalSceneGraphic
          panelOrder={panel.order}
          artStyle={artStyle}
          scenePrompt={panel.scenePrompt}
          imageUrl={panel.imageUrl}
        />

        {/* Characters rendered on panel */}
        {panel.characters.map((char) => (
          <PanelCharacterGraphic
            key={char.id}
            character={char}
            isSelected={isSelected && selectedCharacterId === char.id}
            onSelect={() => onSelectCharacter(char.id)}
          />
        ))}

        {/* Speech Balloons rendered on panel */}
        {panel.balloons.map((balloon) => (
          <SpeechBalloonGraphic
            key={balloon.id}
            balloon={balloon}
            isSelected={isSelected && selectedBalloonId === balloon.id}
            onSelect={() => onSelectBalloon(balloon.id)}
          />
        ))}
      </div>

      {/* Bottom Scripture Caption Banner */}
      <div className="relative z-20 px-3 py-2 bg-stone-900/95 border-t border-stone-800 flex items-center justify-between text-xs">
        <span className="font-serif italic text-amber-200/90 truncate mr-2">
          «{panel.biblicalVerse}»
        </span>
        <span className="font-semibold text-amber-500 whitespace-nowrap text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
          {panel.verseReference}
        </span>
      </div>
    </div>
  );
};
