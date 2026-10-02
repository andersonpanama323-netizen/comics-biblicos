import React from 'react';
import { ComicProject, SpeechBalloon } from '../types';
import { ComicPanelItem } from './ComicPanelItem';
import { ART_STYLES } from '../data/artStyles';
import { BookOpen, Layers, Sparkles, Plus, FolderOpen, PlusCircle } from 'lucide-react';

interface ComicCanvasProps {
  project: ComicProject;
  activePanelId: string;
  selectedBalloonId?: string;
  selectedCharacterId?: string;
  onSelectPanel: (panelId: string) => void;
  onSelectBalloon: (balloonId: string) => void;
  onSelectCharacter: (charId: string) => void;
  onAddBalloonToActive: (type: SpeechBalloon['type']) => void;
  onAddCharacterToActive: () => void;
  onGenerateAIArtForPanel?: (panelId: string) => void;
  onOpenCreateComic?: () => void;
  onOpenAddPanel?: () => void;
  onOpenProjects?: () => void;
}

export const ComicCanvas: React.FC<ComicCanvasProps> = ({
  project,
  activePanelId,
  selectedBalloonId,
  selectedCharacterId,
  onSelectPanel,
  onSelectBalloon,
  onSelectCharacter,
  onAddBalloonToActive,
  onAddCharacterToActive,
  onGenerateAIArtForPanel,
  onOpenCreateComic,
  onOpenAddPanel,
  onOpenProjects,
}) => {
  const currentStyle = ART_STYLES[project.artStyle] || ART_STYLES['classic-oil'];

  // Grid style depending on layoutType
  const getLayoutClasses = () => {
    switch (project.layoutType) {
      case 'single-hero':
        return 'grid grid-cols-1 gap-4 max-w-2xl mx-auto';
      case 'two-vertical':
        return 'grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto';
      case 'three-dynamic':
        return 'grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto [&>*:first-child]:md:col-span-2';
      case 'six-strip':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto';
      case 'four-classic':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Quick Creator Bar above canvas */}
      <div className="w-full max-w-6xl mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span className="font-semibold text-stone-200">{project.title}</span>
          <span>•</span>
          <span className="text-amber-400 font-medium">{project.panels.length} {project.panels.length === 1 ? 'viñeta' : 'viñetas'}</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenProjects && (
            <button
              onClick={onOpenProjects}
              className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg border border-stone-800 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Mis Cómics</span>
            </button>
          )}

          {onOpenAddPanel && (
            <button
              onClick={onOpenAddPanel}
              className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 rounded-lg border border-stone-800 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Añadir una viñeta extra a este cómic"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Añadir Viñeta</span>
            </button>
          )}

          {onOpenCreateComic && (
            <button
              onClick={onOpenCreateComic}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition"
              title="Crear un nuevo cómic bíblico con IA o desde cero"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Nuevo Cómic</span>
            </button>
          )}
        </div>
      </div>

      {/* Comic Page Canvas Frame */}
      <div className={`w-full max-w-6xl p-5 md:p-8 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl transition-all ${currentStyle.borderStyle}`}>
        {/* Comic Header / Title Banner */}
        <div className="mb-6 pb-4 border-b border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentStyle.accentBadge}`}>
                {currentStyle.name}
              </span>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {project.scriptureReference}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-stone-100 font-serif">
              {project.title}
            </h1>
            <p className="text-sm text-stone-400 font-medium">
              {project.subtitle} • <span className="text-amber-300/80 italic">{project.biblicalTheme}</span>
            </p>
          </div>

          {/* Devotional Christ Focus Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-stone-950/80 rounded-xl border border-amber-500/30 text-xs text-amber-200/90 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <div>
              <p className="font-semibold text-stone-200">Enfoque en Cristo Salvador</p>
              <p className="text-[11px] text-stone-400 line-clamp-1">
                {project.devotionalSummary.messageOfChrist}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Panels Layout */}
        <div className={getLayoutClasses()} id="comic-print-canvas">
          {project.panels.map((panel) => (
            <ComicPanelItem
              key={panel.id}
              panel={panel}
              artStyle={project.artStyle}
              isSelected={panel.id === activePanelId}
              selectedBalloonId={selectedBalloonId}
              selectedCharacterId={selectedCharacterId}
              onSelectPanel={() => onSelectPanel(panel.id)}
              onSelectBalloon={onSelectBalloon}
              onSelectCharacter={onSelectCharacter}
              onAddBalloon={onAddBalloonToActive}
              onAddCharacter={onAddCharacterToActive}
              onGenerateAIArt={
                onGenerateAIArtForPanel
                  ? () => onGenerateAIArtForPanel(panel.id)
                  : undefined
              }
            />
          ))}
        </div>

        {/* Add Panel Action Banner at bottom of panels */}
        {onOpenAddPanel && (
          <div className="mt-5 pt-3 border-t border-dashed border-stone-800 flex justify-center">
            <button
              onClick={onOpenAddPanel}
              className="py-2.5 px-4 bg-stone-950 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-700/80 hover:border-amber-500/50 rounded-xl text-xs font-semibold flex items-center gap-2 transition group"
            >
              <PlusCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Añadir Nueva Viñeta al Cómic (Viñeta #{project.panels.length + 1})</span>
            </button>
          </div>
        )}

        {/* Comic Footer Note */}
        <div className="mt-6 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{project.securityStatus.lastCloudBackup}</span>
          </div>
          <p className="font-serif italic text-stone-400">
            «Toda la Escritura es inspirada por Dios, y útil para enseñar» — 2 Timoteo 3:16
          </p>
        </div>
      </div>
    </div>
  );
};
