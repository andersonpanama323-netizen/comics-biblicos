import React, { useState } from 'react';
import { ComicProject, ArtStyleId, LayoutType, ComicPanel } from '../types';
import { ART_STYLES } from '../data/artStyles';
import { 
  Sparkles, 
  X, 
  BookOpen, 
  Palette, 
  Layers, 
  Plus, 
  Check, 
  Wand2, 
  FileEdit, 
  Flame, 
  ChevronRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';

interface CreateComicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWithAI: (params: {
    topic: string;
    passage: string;
    artStyle: ArtStyleId;
    panelCount: number;
    theologicalFocus: string;
  }) => Promise<void>;
  onCreateBlank: (comic: Partial<ComicProject>) => void;
  onSelectTemplate: (template: Partial<ComicProject>) => void;
  isGenerating: boolean;
}

const PRESET_STORIES = [
  {
    title: 'David y Goliat: Victoria de la Fe',
    passage: '1 Samuel 17:32-50',
    theme: 'La batalla es del Señor y no del hombre con espada',
    style: 'spiritual-manga' as ArtStyleId,
    panels: 4,
    theology: 'Fe y Milagros',
    badge: 'Popular'
  },
  {
    title: 'El Hijo Pródigo: La Gracia del Padre',
    passage: 'Lucas 15:11-32',
    theme: 'El amor incondicional y el abrazo del perdón de Dios',
    style: 'vintage-engraving' as ArtStyleId,
    panels: 4,
    theology: 'Amor y Misericordia',
    badge: 'Evangelio'
  },
  {
    title: 'La Resurrección de Jesucristo',
    passage: 'Mateo 28:1-10',
    theme: 'Cristo venció la muerte y nos otorga salvación eterna',
    style: 'epic-concept' as ArtStyleId,
    panels: 4,
    theology: 'Cristocéntrico y Salvación',
    badge: 'Salvación'
  },
  {
    title: 'La Creación del Mundo',
    passage: 'Génesis 1:1-31',
    theme: 'El Dios soberano creó los cielos y la tierra con Su Palabra',
    style: 'classic-oil' as ArtStyleId,
    panels: 6,
    theology: 'Poder y Liberación',
    badge: 'Génesis'
  },
  {
    title: 'Moisés y el Paso del Mar Rojo',
    passage: 'Éxodo 14:13-31',
    theme: 'Estad quietos y ved la salvación que Jehová hará hoy',
    style: 'graphic-novel' as ArtStyleId,
    panels: 4,
    theology: 'Poder y Liberación',
    badge: 'Liberación'
  },
  {
    title: 'Daniel en el Foso de los Leones',
    passage: 'Daniel 6:16-23',
    theme: 'Dios envió su ángel y cerró la boca de los leones',
    style: 'biblical-watercolor' as ArtStyleId,
    panels: 4,
    theology: 'Fe y Milagros',
    badge: 'Fidelidad'
  },
  {
    title: 'Jesús Alimenta a los Cinco Mil',
    passage: 'Juan 6:1-14',
    theme: 'Jesús es el Pan de Vida que sacia toda necesidad',
    style: 'biblical-watercolor' as ArtStyleId,
    panels: 3,
    theology: 'Cristocéntrico y Salvación',
    badge: 'Milagro'
  },
  {
    title: 'La Cruz y el Sacrificio de Salvación',
    passage: 'Juan 19:16-30 & Juan 3:16',
    theme: 'Porque de tal manera amó Dios al mundo: ¡Consumado es!',
    style: 'classic-oil' as ArtStyleId,
    panels: 4,
    theology: 'Cristocéntrico y Salvación',
    badge: 'Redención'
  }
];

export const CreateComicModal: React.FC<CreateComicModalProps> = ({
  isOpen,
  onClose,
  onCreateWithAI,
  onCreateBlank,
  onSelectTemplate,
  isGenerating
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'blank' | 'templates'>('ai');

  // AI Form State
  const [topic, setTopic] = useState('David y Goliat: La Victoria de la Fe');
  const [passage, setPassage] = useState('1 Samuel 17:32-50');
  const [panelCount, setPanelCount] = useState<number>(4);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyleId>('classic-oil');
  const [theologicalFocus, setTheologicalFocus] = useState('Cristocéntrico y Salvación');

  // Blank Form State
  const [blankTitle, setBlankTitle] = useState('Mi Cómic Bíblico');
  const [blankSubtitle, setBlankSubtitle] = useState('Relato gráfico de fe y esperanza');
  const [blankPassage, setBlankPassage] = useState('Salmos 23:1');
  const [blankTheme, setBlankTheme] = useState('La fidelidad y providencia de Dios');
  const [blankPanelsCount, setBlankPanelsCount] = useState<number>(4);
  const [blankStyle, setBlankStyle] = useState<ArtStyleId>('classic-oil');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_STORIES[0]) => {
    setTopic(preset.title);
    setPassage(preset.passage);
    setSelectedStyle(preset.style);
    setPanelCount(preset.panels);
    setTheologicalFocus(preset.theology);
  };

  const handleCreateWithAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    await onCreateWithAI({
      topic: topic.trim(),
      passage: passage.trim() || 'Evangelios',
      artStyle: selectedStyle,
      panelCount,
      theologicalFocus
    });
  };

  const handleCreateBlankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = blankPanelsCount;
    let layout: LayoutType = 'four-classic';
    if (count === 1) layout = 'single-hero';
    else if (count === 2) layout = 'two-vertical';
    else if (count === 3) layout = 'three-dynamic';
    else if (count === 6) layout = 'six-strip';

    const panels: ComicPanel[] = Array.from({ length: count }, (_, i) => ({
      id: `panel-${Date.now()}-${i + 1}`,
      order: i + 1,
      title: `Viñeta #${i + 1}: Escena de ${blankTitle}`,
      scenePrompt: `Escena bíblica representativa de ${blankTitle}, cuadro ${i + 1}.`,
      visualDescription: `Composición bíblica basada en ${blankPassage}.`,
      biblicalVerse: i === 0 ? 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.' : 'Porque con Dios nada será imposible.',
      verseReference: blankPassage || 'Salmos 119:105',
      artPresetId: blankStyle,
      characters: [
        {
          id: `char-init-${i}-1`,
          name: i === 0 ? 'Mensajero' : 'Testigo',
          role: 'Siervo de Dios',
          x: 45,
          y: 65,
          scale: 1,
          flipX: false,
          pose: i === 0 ? 'pointing' : 'praying',
          color: '#F59E0B'
        }
      ],
      balloons: [
        {
          id: `bal-init-${i}-1`,
          type: 'dialog',
          text: i === 0 ? `Comienza el relato de ${blankTitle}.` : '¡Grande es la misericordia del Señor!',
          characterSpeaker: 'Personaje',
          x: 50,
          y: 25,
          fontSize: 13,
          tailDirection: 'bottom-left',
          bgColor: '#FFFFFF',
          textColor: '#0F172A'
        }
      ]
    }));

    onCreateBlank({
      title: blankTitle.trim() || 'Mi Cómic Bíblico',
      subtitle: blankSubtitle.trim(),
      scriptureReference: blankPassage.trim() || 'Escrituras',
      biblicalTheme: blankTheme.trim() || 'Enseñanza Bíblica',
      artStyle: blankStyle,
      layoutType: layout,
      panels,
      devotionalSummary: {
        messageOfChrist: `Este relato de ${blankTitle} nos revela el corazón de Dios y la obra redentora de Jesucristo.`,
        practicalApplication: 'Aplica los principios de la fe en tus decisiones diarias confiando en las promesas de Dios.',
        prayerFocus: 'Señor Jesús, gracias por guiarnos a través de Tu Palabra y revelarte como nuestro Salvador.'
      }
    });
    onClose();
  };

  const getLayoutForCount = (count: number): LayoutType => {
    switch (count) {
      case 1: return 'single-hero';
      case 2: return 'two-vertical';
      case 3: return 'three-dynamic';
      case 6: return 'six-strip';
      case 4:
      default: return 'four-classic';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-100 font-serif flex items-center gap-2">
                Crear Nuevo Cómic Bíblico
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Estudio Creativo
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Visualiza historias de las Escrituras con IA teológica o diseña tu propio guion desde cero
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950/40 px-5 pt-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`pb-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'ai'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            Generar con IA (Gemini)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blank')}
            className={`pb-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'blank'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-blue-400" />
            Crear en Blanco (Desde Cero)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`pb-2.5 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'templates'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            Historias Preparadas (Plantillas)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* ================= TAB 1: AI GENERATOR ================= */}
          {activeTab === 'ai' && (
            <form onSubmit={handleCreateWithAISubmit} className="space-y-5">
              {/* Quick Story Suggestion Chips */}
              <div>
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5 mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Historias y Pasajes Bíblicos Recomendados (Clic rápido):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_STORIES.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition text-left flex items-center gap-1.5 ${
                        topic === p.title
                          ? 'bg-amber-500/25 border-amber-500/60 text-amber-200 font-semibold'
                          : 'bg-stone-800/80 border-stone-700/60 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{p.title.split(':')[0]}</span>
                      <span className="text-[10px] text-stone-400">({p.passage.split('&')[0].trim()})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Prompt Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Tema o Relato Bíblico a Ilustrar <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ej. El Buen Pastor da su vida por las ovejas..."
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Puedes escribir cualquier pasaje o enseñanza bíblica del Antiguo o Nuevo Testamento.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Cita Bíblica de Referencia <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={passage}
                    onChange={(e) => setPassage(e.target.value)}
                    placeholder="Ej. Juan 10:11-18, 1 Samuel 17, etc."
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-stone-400 mt-1">
                    Se incluirán versículos bíblicos literales en cada viñeta.
                  </p>
                </div>
              </div>

              {/* Layout & Panels Selector */}
              <div>
                <label className="text-xs font-bold text-stone-300 flex items-center justify-between mb-2">
                  <span>Número de Viñetas y Estructura:</span>
                  <span className="text-amber-400 text-[11px] font-normal">
                    {panelCount === 1 && '1 Viñeta (Portada / Póster Splash)'}
                    {panelCount === 2 && '2 Viñetas (Doble Cuadro)'}
                    {panelCount === 3 && '3 Viñetas (Narrativa Dinámica)'}
                    {panelCount === 4 && '4 Viñetas (Clásico 2x2 Cuadrícula)'}
                    {panelCount === 6 && '6 Viñetas (Tira Bíblica Completa)'}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { count: 1, label: '1 Viñeta', sub: 'Portada Splash' },
                    { count: 2, label: '2 Viñetas', sub: 'Doble Escena' },
                    { count: 3, label: '3 Viñetas', sub: 'Dinámica' },
                    { count: 4, label: '4 Viñetas', sub: 'Clásica 2x2' },
                    { count: 6, label: '6 Viñetas', sub: 'Tira 3x2' },
                  ].map((item) => (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => setPanelCount(item.count)}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                        panelCount === item.count
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md font-bold'
                          : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:bg-stone-800'
                      }`}
                    >
                      <span className="text-xs">{item.label}</span>
                      <span className="text-[10px] opacity-75">{item.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Art Style Selector */}
              <div>
                <label className="text-xs font-bold text-stone-300 block mb-2">
                  Estilo Artístico Sagrado:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {Object.values(ART_STYLES).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStyle(st.id)}
                      className={`p-2 rounded-xl border text-left flex flex-col transition relative overflow-hidden group ${
                        selectedStyle === st.id
                          ? 'bg-stone-800 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className={`h-8 w-full rounded-lg bg-gradient-to-tr ${st.sampleGradient} mb-1.5 flex items-center justify-center`}>
                        {selectedStyle === st.id && (
                          <Check className="w-3.5 h-3.5 text-white bg-black/40 rounded-full p-0.5" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-stone-200 line-clamp-1 leading-tight">
                        {st.name.split(' ')[0]}
                      </span>
                      <span className="text-[9px] text-stone-400 line-clamp-1">
                        {st.tagline}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theological Focus */}
              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1.5">
                  Enfoque Doctrinal y Espiritual:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'Cristocéntrico y Salvación', title: 'Jesucristo Salvador', desc: 'Enfatiza a Jesús como el Redentor' },
                    { id: 'Fe y Milagros', title: 'Fe y Milagros', desc: 'Confianza en el poder de Dios' },
                    { id: 'Amor y Misericordia', title: 'Gracia y Perdón', desc: 'El amor del Padre compasivo' },
                    { id: 'Poder y Liberación', title: 'Poder y Liberación', desc: 'Dios que libra a su pueblo' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTheologicalFocus(f.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        theologicalFocus === f.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800/80'
                      }`}
                    >
                      <p className="font-bold text-xs text-stone-200">{f.title}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating || !topic.trim()}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>Generando Cómic Bíblico con Inteligencia Artificial...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-stone-950" />
                      <span>Generar Cómic Bíblico Completo ({panelCount} viñetas)</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-stone-400 mt-2">
                  La IA estructurará cada viñeta, cita de las Escrituras, personajes bíblicos y diálogos fieles.
                </p>
              </div>
            </form>
          )}

          {/* ================= TAB 2: BLANK COMIC ================= */}
          {activeTab === 'blank' && (
            <form onSubmit={handleCreateBlankSubmit} className="space-y-4">
              <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 text-xs text-stone-300">
                <p className="font-semibold text-stone-200 flex items-center gap-1.5 mb-1">
                  <FileEdit className="w-4 h-4 text-blue-400" />
                  Crea un cómic desde cero con total libertad creativa
                </p>
                <p className="text-stone-400 text-[11px]">
                  Configura el título, pasaje y número de viñetas. Se creará un lienzo en blanco con las viñetas listas para que agregues personajes, diálogos y descripciones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Título del Cómic <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={blankTitle}
                    onChange={(e) => setBlankTitle(e.target.value)}
                    placeholder="Ej. El Llamado de Abraham"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Subtítulo Temático
                  </label>
                  <input
                    type="text"
                    value={blankSubtitle}
                    onChange={(e) => setBlankSubtitle(e.target.value)}
                    placeholder="Ej. Una caminata de fe y obediencia"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Cita Bíblica
                  </label>
                  <input
                    type="text"
                    value={blankPassage}
                    onChange={(e) => setBlankPassage(e.target.value)}
                    placeholder="Ej. Génesis 12:1-4"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Tema Doctrinal / Mensaje
                  </label>
                  <input
                    type="text"
                    value={blankTheme}
                    onChange={(e) => setBlankTheme(e.target.value)}
                    placeholder="Ej. La obediencia y promesa de Dios"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Panels Count */}
              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1.5">
                  Cantidad de Viñetas Iniciales:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBlankPanelsCount(num)}
                      className={`py-2 rounded-xl border text-xs font-bold transition ${
                        blankPanelsCount === num
                          ? 'bg-blue-600/30 border-blue-400 text-blue-300'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                      }`}
                    >
                      {num} {num === 1 ? 'Viñeta' : 'Viñetas'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Art Style */}
              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1.5">
                  Estilo Artístico Inicial:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.values(ART_STYLES).slice(0, 4).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setBlankStyle(st.id)}
                      className={`p-2 rounded-xl border text-left text-xs transition ${
                        blankStyle === st.id
                          ? 'bg-stone-800 border-blue-400 text-blue-200'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <p className="font-bold">{st.name}</p>
                      <p className="text-[10px] text-stone-400">{st.tagline}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Cómic en Blanco y Empezar a Editar</span>
                </button>
              </div>
            </form>
          )}

          {/* ================= TAB 3: TEMPLATES ================= */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-400">
                Selecciona una narrativa bíblica prediseñada. Cada plantilla cuenta con guion teológico, versículos bíblicos fieles y personajes situados:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_STORIES.map((story, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      // Trigger AI with preset directly or load template
                      onCreateWithAI({
                        topic: story.title,
                        passage: story.passage,
                        artStyle: story.style,
                        panelCount: story.panels,
                        theologicalFocus: story.theology
                      });
                    }}
                    className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/60 cursor-pointer group transition hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {story.badge}
                        </span>
                        <span className="text-[10px] text-stone-400 font-semibold">
                          {story.panels} Viñetas
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-stone-200 group-hover:text-amber-300 transition">
                        {story.title}
                      </h3>
                      <p className="text-[11px] text-amber-400/90 font-medium">
                        {story.passage}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-1 line-clamp-2">
                        {story.theme}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">Estilo: {story.style}</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Crear Cómic <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
