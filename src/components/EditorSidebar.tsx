import React, { useState } from 'react';
import { ComicProject, ComicPanel, SpeechBalloon, PanelCharacter, LayoutType, ArtStyleId } from '../types';
import { ART_STYLES } from '../data/artStyles';
import { 
  Sparkles, 
  MessageSquare, 
  UserPlus, 
  Type, 
  Trash2, 
  Maximize2, 
  Layers, 
  Wand2, 
  RefreshCw, 
  BookOpen, 
  Sliders, 
  ChevronRight,
  MoveHorizontal,
  Copy,
  Plus,
  PlusCircle
} from 'lucide-react';

interface EditorSidebarProps {
  project: ComicProject;
  activePanel?: ComicPanel;
  selectedBalloonId?: string;
  selectedCharacterId?: string;
  onUpdateProject: (updated: Partial<ComicProject>) => void;
  onUpdatePanel: (panelId: string, updated: Partial<ComicPanel>) => void;
  onUpdateBalloon: (panelId: string, balloonId: string, updated: Partial<SpeechBalloon>) => void;
  onDeleteBalloon: (panelId: string, balloonId: string) => void;
  onUpdateCharacter: (panelId: string, charId: string, updated: Partial<PanelCharacter>) => void;
  onDeleteCharacter: (panelId: string, charId: string) => void;
  onAddBalloon: (type: SpeechBalloon['type']) => void;
  onAddCharacter: () => void;
  onGenerateAIScript: (promptText: string, passage: string) => Promise<void>;
  onGenerateAIArtForActivePanel: () => Promise<void>;
  isGeneratingScript: boolean;
  isGeneratingArt: boolean;
  onOpenAddPanel?: () => void;
  onDeleteActivePanel?: (panelId: string) => void;
  onDuplicateActivePanel?: (panelId: string) => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  project,
  activePanel,
  selectedBalloonId,
  selectedCharacterId,
  onUpdateProject,
  onUpdatePanel,
  onUpdateBalloon,
  onDeleteBalloon,
  onUpdateCharacter,
  onDeleteCharacter,
  onAddBalloon,
  onAddCharacter,
  onGenerateAIScript,
  onGenerateAIArtForActivePanel,
  isGeneratingScript,
  isGeneratingArt,
  onOpenAddPanel,
  onDeleteActivePanel,
  onDuplicateActivePanel
}) => {
  const [activeTab, setActiveTab] = useState<'panel' | 'ai-prompt' | 'layout'>('panel');
  const [promptInput, setPromptInput] = useState('');
  const [passageInput, setPassageInput] = useState('');

  const selectedBalloon = activePanel?.balloons.find((b) => b.id === selectedBalloonId);
  const selectedCharacter = activePanel?.characters.find((c) => c.id === selectedCharacterId);

  const handleScriptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    await onGenerateAIScript(promptInput, passageInput);
  };

  return (
    <aside className="w-full lg:w-96 bg-stone-900 border-l border-stone-800 flex flex-col h-full overflow-y-auto select-none">
      {/* Sidebar Tabs */}
      <div className="flex items-center border-b border-stone-800 bg-stone-950/70 p-2 gap-1 sticky top-0 z-20">
        <button
          onClick={() => setActiveTab('panel')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'panel'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Viñeta & Elementos
        </button>
        <button
          onClick={() => setActiveTab('ai-prompt')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'ai-prompt'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          Guion IA Bíblico
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'layout'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Diseño
        </button>
      </div>

      <div className="p-4 space-y-6 flex-1">
        {/* TAB 1: Panel & Elements Inspector */}
        {activeTab === 'panel' && activePanel && (
          <div className="space-y-6">
            {/* Active Panel Overview */}
            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Viñeta #{activePanel.order} de {project.panels.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onGenerateAIArtForActivePanel}
                    disabled={isGeneratingArt}
                    className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-md text-[11px] font-semibold flex items-center gap-1 transition disabled:opacity-50"
                    title="Generar o previsualizar arte con IA"
                  >
                    <Sparkles className={`w-3 h-3 ${isGeneratingArt ? 'animate-spin' : ''}`} />
                    {isGeneratingArt ? 'Generando...' : 'Arte IA'}
                  </button>
                  {onDuplicateActivePanel && (
                    <button
                      onClick={() => onDuplicateActivePanel(activePanel.id)}
                      className="p-1 rounded-md text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
                      title="Duplicar esta viñeta"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteActivePanel && project.panels.length > 1 && (
                    <button
                      onClick={() => onDeleteActivePanel(activePanel.id)}
                      className="p-1 rounded-md text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition"
                      title="Eliminar esta viñeta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {onOpenAddPanel && (
                <button
                  type="button"
                  onClick={onOpenAddPanel}
                  className="w-full py-1.5 px-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-800 hover:border-amber-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Añadir Otra Viñeta al Cómic</span>
                </button>
              )}

              <div>
                <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                  Título de la viñeta
                </label>
                <input
                  type="text"
                  value={activePanel.title}
                  onChange={(e) => onUpdatePanel(activePanel.id, { title: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                  Versículo Bíblico asociado
                </label>
                <textarea
                  rows={2}
                  value={activePanel.biblicalVerse}
                  onChange={(e) => onUpdatePanel(activePanel.id, { biblicalVerse: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 resize-none font-serif italic"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                  Cita Bíblica (Libro Capítulo:Versículo)
                </label>
                <input
                  type="text"
                  value={activePanel.verseReference}
                  onChange={(e) => onUpdatePanel(activePanel.id, { verseReference: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  placeholder="ej. Marcos 4:39"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                  Prompt visual de la escena
                </label>
                <textarea
                  rows={3}
                  value={activePanel.scenePrompt}
                  onChange={(e) => onUpdatePanel(activePanel.id, { scenePrompt: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-amber-500 resize-none"
                  placeholder="Descripción artística de la composición, plano y luz sagrada..."
                />
              </div>
            </div>

            {/* Globos de Diálogo / Speech Balloons Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  Globos de Diálogo ({activePanel.balloons.length})
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onAddBalloon('dialog')}
                    className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-semibold rounded flex items-center gap-1"
                    title="Añadir Diálogo"
                  >
                    + Diálogo
                  </button>
                  <button
                    onClick={() => onAddBalloon('shout')}
                    className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold rounded flex items-center gap-1"
                    title="Añadir Grito Épico"
                  >
                    + Épico
                  </button>
                  <button
                    onClick={() => onAddBalloon('thought')}
                    className="px-2 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[11px] font-semibold rounded flex items-center gap-1"
                    title="Añadir Pensamiento"
                  >
                    + Nube
                  </button>
                </div>
              </div>

              {/* Selected Balloon Editor */}
              {selectedBalloon ? (
                <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-500/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      Editando Globo ({selectedBalloon.type})
                    </span>
                    <button
                      onClick={() => onDeleteBalloon(activePanel.id, selectedBalloon.id)}
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition"
                      title="Eliminar este globo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                      Texto del diálogo o exclamación
                    </label>
                    <textarea
                      rows={2}
                      value={selectedBalloon.text}
                      onChange={(e) =>
                        onUpdateBalloon(activePanel.id, selectedBalloon.id, { text: e.target.value })
                      }
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 resize-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">Personaje que habla</label>
                      <input
                        type="text"
                        value={selectedBalloon.characterSpeaker || ''}
                        onChange={(e) =>
                          onUpdateBalloon(activePanel.id, selectedBalloon.id, { characterSpeaker: e.target.value })
                        }
                        placeholder="ej. Jesús, Pedro..."
                        className="w-full bg-stone-900 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">Tipo de Globo</label>
                      <select
                        value={selectedBalloon.type}
                        onChange={(e) =>
                          onUpdateBalloon(activePanel.id, selectedBalloon.id, { type: e.target.value as any })
                        }
                        className="w-full bg-stone-900 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200"
                      >
                        <option value="dialog">Diálogo normal</option>
                        <option value="shout">Grito / Épico</option>
                        <option value="thought">Pensamiento (Nube)</option>
                        <option value="scripture">Cita Bíblica</option>
                        <option value="onomatopoeia">Onomatopeya</option>
                      </select>
                    </div>
                  </div>

                  {/* Position sliders */}
                  <div className="space-y-2 pt-1 border-t border-stone-800">
                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                        <span>Posición Horizontal (X)</span>
                        <span>{selectedBalloon.x}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={selectedBalloon.x}
                        onChange={(e) =>
                          onUpdateBalloon(activePanel.id, selectedBalloon.id, { x: Number(e.target.value) })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                        <span>Posición Vertical (Y)</span>
                        <span>{selectedBalloon.y}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={selectedBalloon.y}
                        onChange={(e) =>
                          onUpdateBalloon(activePanel.id, selectedBalloon.id, { y: Number(e.target.value) })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-stone-950/40 rounded-lg border border-dashed border-stone-800 text-center text-xs text-stone-400">
                  Haz clic sobre un globo en el lienzo para ajustar su posición, tamaño y texto.
                </div>
              )}
            </div>

            {/* Personajes Bíblicos Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                  Personajes en Viñeta ({activePanel.characters.length})
                </h3>
                <button
                  onClick={onAddCharacter}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded flex items-center gap-1"
                >
                  + Añadir Personaje
                </button>
              </div>

              {/* Selected Character Inspector */}
              {selectedCharacter ? (
                <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-500/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400">
                      Personaje: {selectedCharacter.name}
                    </span>
                    <button
                      onClick={() => onDeleteCharacter(activePanel.id, selectedCharacter.id)}
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 transition"
                      title="Eliminar personaje"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">Nombre</label>
                      <input
                        type="text"
                        value={selectedCharacter.name}
                        onChange={(e) =>
                          onUpdateCharacter(activePanel.id, selectedCharacter.id, { name: e.target.value })
                        }
                        className="w-full bg-stone-900 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">Postura / Ademán</label>
                      <select
                        value={selectedCharacter.pose}
                        onChange={(e) =>
                          onUpdateCharacter(activePanel.id, selectedCharacter.id, { pose: e.target.value as any })
                        }
                        className="w-full bg-stone-900 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200"
                      >
                        <option value="standing">De pie</option>
                        <option value="preaching">Predicando / Maestro</option>
                        <option value="praying">Orando en paz</option>
                        <option value="pointing">Señalando</option>
                        <option value="kneeling">De rodillas / Clamor</option>
                        <option value="glorious">Glorioso / Autoridad</option>
                      </select>
                    </div>
                  </div>

                  {/* Flip and scale */}
                  <div className="flex items-center justify-between gap-3 pt-1 border-t border-stone-800 text-xs">
                    <button
                      onClick={() =>
                        onUpdateCharacter(activePanel.id, selectedCharacter.id, { flipX: !selectedCharacter.flipX })
                      }
                      className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded flex items-center gap-1.5"
                    >
                      <MoveHorizontal className="w-3 h-3" />
                      Invertir mirada (Espejo)
                    </button>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-stone-400">Escala:</span>
                      <input
                        type="range"
                        min="0.6"
                        max="1.8"
                        step="0.1"
                        value={selectedCharacter.scale}
                        onChange={(e) =>
                          onUpdateCharacter(activePanel.id, selectedCharacter.id, { scale: Number(e.target.value) })
                        }
                        className="w-20 accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Position sliders */}
                  <div className="space-y-2 pt-1 border-t border-stone-800">
                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                        <span>Posición Horizontal (X)</span>
                        <span>{selectedCharacter.x}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={selectedCharacter.x}
                        onChange={(e) =>
                          onUpdateCharacter(activePanel.id, selectedCharacter.id, { x: Number(e.target.value) })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-stone-400 mb-0.5">
                        <span>Posición Vertical (Y)</span>
                        <span>{selectedCharacter.y}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="90"
                        value={selectedCharacter.y}
                        onChange={(e) =>
                          onUpdateCharacter(activePanel.id, selectedCharacter.id, { y: Number(e.target.value) })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-stone-950/40 rounded-lg border border-dashed border-stone-800 text-center text-xs text-stone-400">
                  Selecciona un personaje en la viñeta para ajustar su postura y posición.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI Biblical Script Generator */}
        {activeTab === 'ai-prompt' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-amber-950/40 border border-amber-500/30 rounded-xl">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Generador de Guiones con Gemini 3.8 Flash
              </div>
              <p className="text-[11px] text-amber-200/80 leading-relaxed">
                Describe cualquier pasaje, parábola o milagro bíblico. La IA estructurará automáticamente las viñetas, citas exactas de las Escrituras, posturas de personajes y diálogos con fidelidad teológica.
              </p>
            </div>

            <form onSubmit={handleScriptSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Relato o Escena Bíblica
                </label>
                <textarea
                  rows={3}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ej: Jesús camina sobre las aguas y rescata a Pedro cuando empieza a hundirse por dudar..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 resize-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Pasaje o Libro Bíblico (Opcional)
                </label>
                <input
                  type="text"
                  value={passageInput}
                  onChange={(e) => setPassageInput(e.target.value)}
                  placeholder="Ej: Mateo 14:22-33 o Juan 11"
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingScript || !promptInput.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isGeneratingScript ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                    Elaborando guion bíblico...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-stone-950" />
                    Generar Cómic Bíblico Completo
                  </>
                )}
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="pt-2 border-t border-stone-800 space-y-2">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Relatos Bíblicos Sugeridos
              </label>
              <div className="space-y-1.5">
                {[
                  { title: 'La Resurrección de Jesús', ref: 'Lucas 24' },
                  { title: 'El Buen Samaritano', ref: 'Lucas 10:25-37' },
                  { title: 'La Pesca Milagrosa', ref: 'Lucas 5:1-11' },
                  { title: 'El Hijo Pródigo', ref: 'Lucas 15:11-32' },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      setPromptInput(item.title);
                      setPassageInput(item.ref);
                    }}
                    className="w-full text-left px-2.5 py-1.5 bg-stone-950/60 hover:bg-stone-800 border border-stone-800 rounded-lg text-xs text-stone-300 flex items-center justify-between transition"
                  >
                    <span>{item.title}</span>
                    <span className="text-[10px] text-amber-400 font-semibold">{item.ref}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Layout and Art Style Selection */}
        {activeTab === 'layout' && (
          <div className="space-y-6">
            {/* Page Layout Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                Distribución de Viñetas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'single-hero', label: '1 Viñeta (Póster / Splash)' },
                  { id: 'two-vertical', label: '2 Viñetas (Doble)' },
                  { id: 'three-dynamic', label: '3 Viñetas (Dinámico)' },
                  { id: 'four-classic', label: '4 Viñetas (2x2 Clásico)' },
                  { id: 'six-strip', label: '6 Viñetas (Tira Completa)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onUpdateProject({ layoutType: item.id as LayoutType })}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      project.layoutType === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Art Style Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                Estilo Artístico Activo
              </label>
              <div className="space-y-2">
                {Object.values(ART_STYLES).map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onUpdateProject({ artStyle: style.id as ArtStyleId })}
                    className={`w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                      project.artStyle === style.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{style.name}</p>
                      <p className="text-[10px] text-stone-400">{style.tagline}</p>
                    </div>
                    <div className="flex gap-1">
                      {style.palette.slice(0, 3).map((col, idx) => (
                        <div
                          key={idx}
                          className="w-3 h-3 rounded-full border border-stone-700"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
