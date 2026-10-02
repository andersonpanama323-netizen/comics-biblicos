import React, { useState } from 'react';
import { ComicPanel, PanelCharacter, SpeechBalloon } from '../types';
import { X, Plus, Layers, Sparkles, BookOpen } from 'lucide-react';

interface AddPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextOrder: number;
  scriptureReference: string;
  onAddPanel: (panel: ComicPanel) => void;
}

export const AddPanelModal: React.FC<AddPanelModalProps> = ({
  isOpen,
  onClose,
  nextOrder,
  scriptureReference,
  onAddPanel
}) => {
  const [title, setTitle] = useState(`Nueva Escena #${nextOrder}`);
  const [verse, setVerse] = useState('');
  const [verseRef, setVerseRef] = useState(scriptureReference);
  const [scenePrompt, setScenePrompt] = useState('');
  const [dialogue, setDialogue] = useState('Paz a vosotros.');
  const [speaker, setSpeaker] = useState('Personaje');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPanel: ComicPanel = {
      id: `panel-${Date.now()}`,
      order: nextOrder,
      title: title.trim() || `Viñeta #${nextOrder}`,
      scenePrompt: scenePrompt.trim() || `Escena bíblica de ${title}.`,
      visualDescription: `Composición bíblica para la viñeta #${nextOrder}.`,
      biblicalVerse: verse.trim() || 'El Señor es mi pastor; nada me faltará.',
      verseReference: verseRef.trim() || scriptureReference || 'Salmos 23:1',
      artPresetId: 'classic-oil',
      characters: [
        {
          id: `char-new-${Date.now()}`,
          name: speaker.trim() || 'Personaje Bíblico',
          role: 'Siervo',
          x: 45,
          y: 65,
          scale: 1,
          flipX: false,
          pose: 'standing',
          color: '#F59E0B'
        }
      ],
      balloons: dialogue.trim() ? [
        {
          id: `bal-new-${Date.now()}`,
          type: 'dialog',
          text: dialogue.trim(),
          characterSpeaker: speaker.trim() || 'Personaje',
          x: 50,
          y: 25,
          fontSize: 13,
          tailDirection: 'bottom-left',
          bgColor: '#FFFFFF',
          textColor: '#0F172A'
        }
      ] : []
    };

    onAddPanel(newPanel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 font-serif">
                Añadir Viñeta #{nextOrder}
              </h3>
              <p className="text-[11px] text-stone-400">
                Agrega un nuevo cuadro a la secuencia de tu cómic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-300 block mb-1">
              Título de la Viñeta
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. El Encuentro en el Monte"
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-300 block mb-1">
                Cita Bíblica
              </label>
              <input
                type="text"
                value={verseRef}
                onChange={(e) => setVerseRef(e.target.value)}
                placeholder="Ej. Mateo 5:1"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="font-bold text-stone-300 block mb-1">
                Personaje Principal
              </label>
              <input
                type="text"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                placeholder="Ej. Jesús, Pedro, Moisés..."
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-300 block mb-1">
              Texto del Versículo Bíblico (para el cuadro)
            </label>
            <textarea
              rows={2}
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              placeholder="Ej. Viendo la multitud, subió al monte; y sentándose, vinieron a él sus discípulos."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-stone-300 block mb-1">
              Diálogo Inicial del Globo de Texto
            </label>
            <input
              type="text"
              value={dialogue}
              onChange={(e) => setDialogue(e.target.value)}
              placeholder="Ej. Bienaventurados los de limpio corazón..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-stone-300 block mb-1">
              Descripción Visual / Prompt de Escena
            </label>
            <input
              type="text"
              value={scenePrompt}
              onChange={(e) => setScenePrompt(e.target.value)}
              placeholder="Ej. Jesús en la ladera del monte, luz cálida de atardecer, multitud atenta..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow-lg transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Viñeta al Cómic</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
