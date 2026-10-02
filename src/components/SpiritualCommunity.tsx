import React, { useState } from 'react';
import { ComicProject, PrayerRequest } from '../types';
import { 
  Heart, 
  Flame, 
  BookOpen, 
  Sparkles, 
  Send, 
  Cross, 
  Share2, 
  CheckCircle, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpiritualCommunityProps {
  project: ComicProject;
  prayers: PrayerRequest[];
  onPrayForRequest: (prayerId: string) => void;
  onAddPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'prayersCount' | 'userPrayed' | 'createdAt' | 'comments'>) => void;
  onGenerateAIDevotional?: () => Promise<void>;
  isGeneratingDevotional?: boolean;
}

export const SpiritualCommunity: React.FC<SpiritualCommunityProps> = ({
  project,
  prayers,
  onPrayForRequest,
  onAddPrayerRequest,
  onGenerateAIDevotional,
  isGeneratingDevotional
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [newRequestText, setNewRequestText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [scriptureAnchor, setScriptureAnchor] = useState('');
  const [requestCategory, setRequestCategory] = useState<PrayerRequest['category']>('Fe y Salvación');
  const [acceptedSalvation, setAcceptedSalvation] = useState(false);
  const [showSalvationModal, setShowSalvationModal] = useState(false);

  const categories = ['Todos', 'Fe y Salvación', 'Sanidad', 'Familia', 'Evangelización', 'Gratitud'];

  const filteredPrayers = selectedCategory === 'Todos'
    ? prayers
    : prayers.filter((p) => p.category === selectedCategory);

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestText.trim()) return;

    onAddPrayerRequest({
      authorName: authorName.trim() || 'Hermano/a en Cristo',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      requestText: newRequestText.trim(),
      scriptureAnchor: scriptureAnchor.trim() || 'Filipenses 4:6',
      category: requestCategory
    });

    setNewRequestText('');
    setScriptureAnchor('');
  };

  const handleAcceptChrist = () => {
    setAcceptedSalvation(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#FBBF24', '#FFFFFF', '#EF4444']
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Hero Banner: Conocer a Jesucristo Salvador */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 border border-amber-500/40 p-6 md:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-bold text-amber-300">
              <Cross className="w-3.5 h-3.5 text-amber-400" />
              El Mensaje de Salvación en Jesucristo
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-stone-100 font-serif leading-tight">
              «Yo soy el camino, y la verdad, y la vida»
            </h2>
            <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-sans">
              El propósito fundamental de cada viñeta y relato bíblico es anunciar el amor redentor de <strong>Jesucristo Salvador</strong>. Dios envió a Su Hijo para perdonar nuestros pecados, dar paz a nuestras almas y regalarnos vida eterna.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2.5">
            {acceptedSalvation ? (
              <div className="p-4 bg-amber-500/20 border border-amber-400/50 rounded-2xl text-center space-y-1">
                <p className="text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ¡Declaración de Fe Realizada!
                </p>
                <p className="text-[11px] text-stone-300">
                  «El que cree en el Hijo tiene vida eterna» (Juan 3:36)
                </p>
              </div>
            ) : (
              <button
                onClick={() => setShowSalvationModal(true)}
                className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-red-700 fill-red-700" />
                Oración de Entrega a Jesucristo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Salvation Prayer Modal */}
      {showSalvationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Cross className="w-4 h-4" />
                Oración de Fe y Aceptación de Jesús
              </div>
              <button
                onClick={() => setShowSalvationModal(false)}
                className="text-stone-400 hover:text-stone-200 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-serif italic bg-stone-950 p-4 rounded-xl border border-stone-800">
              «Señor Jesús, reconozco que te necesito. Creo con todo mi corazón que moriste en la cruz por mis faltas y resucitaste al tercer día para darme vida y perdón. Hoy te abro las puertas de mi corazón y te confieso como mi único y suficiente Salvador y Señor. Llena mi vida con Tu Espíritu Santo y ayúdame a caminar en Tu luz cada día. En el nombre de Jesús, amén.»
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSalvationModal(false)}
                className="px-4 py-2 bg-stone-800 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  handleAcceptChrist();
                  setShowSalvationModal(false);
                }}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs shadow"
              >
                Hago mía esta Oración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Devocional Diario y Reflexión Bíblica */}
      <div className="bg-stone-950/90 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif">
                Reflexión Bíblica y Devocional Diario
              </h3>
              <p className="text-xs text-stone-400">
                Inspiración y fortalecimiento de fe sobre el cómic «{project.title}»
              </p>
            </div>
          </div>

          {onGenerateAIDevotional && (
            <button
              onClick={onGenerateAIDevotional}
              disabled={isGeneratingDevotional}
              className="py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition self-start sm:self-auto disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingDevotional ? 'animate-spin' : ''}`} />
              {isGeneratingDevotional ? 'Generando devocional...' : 'Profundizar con IA'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Cristo en las Escrituras
            </span>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              {project.devotionalSummary.messageOfChrist}
            </p>
          </div>

          <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider block">
              Aplicación Práctica Diaria
            </span>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              {project.devotionalSummary.practicalApplication}
            </p>
          </div>

          <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
              Enfoque de Oración
            </span>
            <p className="text-xs text-stone-300 leading-relaxed font-serif italic">
              «{project.devotionalSummary.prayerFocus}»
            </p>
          </div>
        </div>
      </div>

      {/* Muro y Grupo de Oración Virtual */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-stone-100 font-serif flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
              Grupo de Oración Virtual y Muro de Intercesión
            </h3>
            <p className="text-xs text-stone-400">
              «Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos» — Mateo 18:20
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Post Prayer Request Form */}
        <form
          onSubmit={handlePrayerSubmit}
          className="p-4 bg-stone-950/90 rounded-2xl border border-stone-800 space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-stone-200">
            <Heart className="w-4 h-4 text-red-400" />
            Compartir una Petición de Oración o Testimonio
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Tu nombre o hermano/a (opcional)"
              className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={scriptureAnchor}
              onChange={(e) => setScriptureAnchor(e.target.value)}
              placeholder="Versículo ancla (ej. Salmo 91)"
              className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
            <select
              value={requestCategory}
              onChange={(e) => setRequestCategory(e.target.value as any)}
              className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              <option value="Fe y Salvación">Fe y Salvación</option>
              <option value="Sanidad">Sanidad</option>
              <option value="Familia">Familia</option>
              <option value="Evangelización">Evangelización</option>
              <option value="Gratitud">Gratitud</option>
            </select>
          </div>

          <div className="flex gap-2">
            <textarea
              rows={2}
              value={newRequestText}
              onChange={(e) => setNewRequestText(e.target.value)}
              placeholder="Escribe tu motivo de clamor o alabanza para que la comunidad ore contigo..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 resize-none font-medium"
            />
            <button
              type="submit"
              disabled={!newRequestText.trim()}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 self-end"
            >
              <Send className="w-3.5 h-3.5" />
              Publicar
            </button>
          </div>
        </form>

        {/* Prayer Requests Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800/90 flex flex-col justify-between space-y-3 hover:border-stone-700 transition shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={prayer.authorAvatar}
                      alt={prayer.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-stone-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-200">{prayer.authorName}</h4>
                      <span className="text-[10px] text-stone-400">{prayer.createdAt}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-800 text-amber-300 border border-stone-700">
                    {prayer.category}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-normal">
                  {prayer.requestText}
                </p>

                {prayer.scriptureAnchor && (
                  <div className="text-[11px] font-serif italic text-amber-400/90 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-amber-500" />
                    «{prayer.scriptureAnchor}»
                  </div>
                )}
              </div>

              {/* Prayer Actions: Me uno en oración button */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                <button
                  onClick={() => onPrayForRequest(prayer.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    prayer.userPrayed
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${prayer.userPrayed ? 'text-amber-400 fill-amber-400' : 'text-stone-400'}`} />
                  <span>Me uno en oración 🙏 ({prayer.prayersCount})</span>
                </button>

                <span className="text-[10px] text-stone-400">
                  {prayer.prayersCount > 1
                    ? `${prayer.prayersCount} intercesores unidos`
                    : '1 intercesor'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
