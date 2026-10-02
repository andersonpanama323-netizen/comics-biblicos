import React from 'react';
import { ART_STYLES } from '../data/artStyles';
import { ArtStyleId } from '../types';
import { Palette, Check, Sparkles, Copy } from 'lucide-react';

interface ArtStyleGalleryProps {
  currentStyleId: ArtStyleId;
  onSelectStyle: (styleId: ArtStyleId) => void;
}

export const ArtStyleGallery: React.FC<ArtStyleGalleryProps> = ({
  currentStyleId,
  onSelectStyle
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyPrompt = (styleId: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(styleId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-400">
          <Palette className="w-3.5 h-3.5" />
          Galería de Estilos Artísticos Predefinidos
        </div>
        <h2 className="text-3xl font-black text-stone-100 font-serif">
          Estéticas Sagradas e Históricas
        </h2>
        <p className="text-sm text-stone-400">
          Selecciona entre técnicas clásicas de pintura, grabado monumental y estilos contemporáneos para transformar visualmente cada escena bíblica.
        </p>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(ART_STYLES).map((style) => {
          const isSelected = currentStyleId === style.id;

          return (
            <div
              key={style.id}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-500/60 bg-stone-900 shadow-xl shadow-amber-500/10 scale-[1.02]'
                  : 'border-stone-800 bg-stone-950/80 hover:border-stone-700 hover:bg-stone-900'
              }`}
            >
              {/* Header card preview banner */}
              <div className={`h-28 bg-gradient-to-br ${style.sampleGradient} p-4 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full border ${style.accentBadge}`}>
                    {style.id}
                  </span>
                  {isSelected && (
                    <span className="px-2 py-0.5 bg-amber-500 text-stone-950 text-[10px] font-bold rounded-full flex items-center gap-1 shadow">
                      <Check className="w-3 h-3" />
                      Activo
                    </span>
                  )}
                </div>
                <div className="z-10">
                  <h3 className="text-lg font-bold text-stone-100 font-serif leading-tight">
                    {style.name}
                  </h3>
                  <p className="text-xs text-stone-300 font-medium">
                    {style.tagline}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-400 leading-relaxed">
                  {style.description}
                </p>

                {/* Color Palette */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                    Paleta Característica
                  </span>
                  <div className="flex items-center gap-2">
                    {style.palette.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border border-stone-700 shadow-sm flex items-center justify-center text-[9px] text-white/50"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Prompt Modifier */}
                <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-[11px] text-stone-400 font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                      Prompt Modifier (IA)
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(style.id, style.promptModifier)}
                      className="text-stone-400 hover:text-amber-400 p-1 rounded transition"
                      title="Copiar modificador de prompt"
                    >
                      {copiedId === style.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <p className="line-clamp-2 italic text-stone-300">
                    "{style.promptModifier}"
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectStyle(style.id as ArtStyleId)}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Estilo Seleccionado
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Aplicar al Cómic
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
