import React from 'react';
import { 
  Sparkles, 
  Download, 
  Palette, 
  Sliders, 
  Kanban, 
  Users, 
  Heart, 
  BookOpen, 
  PlusCircle,
  FolderOpen,
  ShoppingBag
} from 'lucide-react';

export type ActiveView = 'editor' | 'styles' | 'kanban' | 'collaboration' | 'community' | 'store';

interface NavbarProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onOpenExport: () => void;
  onOpenTemplates: () => void;
  onOpenCreateComic: () => void;
  onOpenProjects: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  projectsCount: number;
  currentComicTitle?: string;
  isCloudSynced: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onChangeView,
  onOpenExport,
  onOpenTemplates,
  onOpenCreateComic,
  onOpenProjects,
  onOpenCart,
  cartCount = 0,
  projectsCount,
  currentComicTitle,
  isCloudSynced
}) => {
  return (
    <header className="w-full bg-stone-950/95 border-b border-stone-800 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onChangeView('editor')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-500/20">
            <BookOpen className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-stone-100 font-serif tracking-tight">
                Cómics Bíblicos
              </span>
              <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 font-bold rounded border border-amber-500/30">
                PRO IA
              </span>
            </div>
            <p className="text-[10px] text-stone-400 leading-none">
              {currentComicTitle ? (
                <span className="text-amber-300/90 font-medium truncate max-w-[160px] inline-block align-bottom">
                  {currentComicTitle}
                </span>
              ) : (
                'Evangelio Visual & Colaboración'
              )}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => onChangeView('editor')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
              activeView === 'editor'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Editor de Cómic
          </button>

          <button
            onClick={() => onChangeView('styles')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
              activeView === 'styles'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Galería de Estilos
          </button>

          <button
            onClick={() => onChangeView('kanban')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
              activeView === 'kanban'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            Flujo Kanban
          </button>

          <button
            onClick={() => onChangeView('collaboration')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
              activeView === 'collaboration'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Equipo & Versiones
          </button>

          <button
            onClick={() => onChangeView('community')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
              activeView === 'community'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-red-400" />
            Fe & Oración
          </button>

          <button
            onClick={() => onChangeView('store')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition relative ${
              activeView === 'store'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Tienda & Libros</span>
            {cartCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 font-black">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Controls & Cloud Status */}
        <div className="flex items-center gap-2">
          {/* Cloud Sync Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-stone-900 rounded-lg border border-stone-800 text-[11px] text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{isCloudSynced ? 'Nube Sincronizada' : 'Guardado Local'}</span>
          </div>

          {/* Cart Icon Button */}
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              className="relative p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 rounded-xl border border-stone-800 transition flex items-center justify-center"
              title="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Mis Cómics Button */}
          <button
            onClick={onOpenProjects}
            className="py-1.5 px-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 text-xs font-semibold rounded-xl border border-stone-800 transition flex items-center gap-1.5"
            title="Ver y gestionar todos mis cómics"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Mis Cómics</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-bold">
              {projectsCount}
            </span>
          </button>

          {/* Primary Create Comic Button */}
          <button
            onClick={onOpenCreateComic}
            className="py-1.5 px-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            title="Crear un nuevo cómic bíblico con IA o desde cero"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-950 animate-pulse" />
            <span>Crear Cómic</span>
          </button>

          {/* Templates Button */}
          <button
            onClick={onOpenTemplates}
            className="py-1.5 px-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold rounded-xl border border-stone-800 transition hidden md:flex items-center gap-1.5"
            title="Ver historias y relatos bíblicos preparados"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Relatos
          </button>

          {/* Export Button */}
          <button
            onClick={onOpenExport}
            className="py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-amber-500/40 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="flex md:hidden items-center justify-around gap-1 pt-2 mt-2 border-t border-stone-800/80 text-[11px]">
        <button
          onClick={() => onChangeView('editor')}
          className={`py-1 px-2 rounded font-semibold ${
            activeView === 'editor' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => onChangeView('styles')}
          className={`py-1 px-2 rounded font-semibold ${
            activeView === 'styles' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          Estilos
        </button>
        <button
          onClick={() => onChangeView('kanban')}
          className={`py-1 px-2 rounded font-semibold ${
            activeView === 'kanban' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          Kanban
        </button>
        <button
          onClick={() => onChangeView('collaboration')}
          className={`py-1 px-2 rounded font-semibold ${
            activeView === 'collaboration' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          Equipo
        </button>
        <button
          onClick={() => onChangeView('community')}
          className={`py-1 px-2 rounded font-semibold ${
            activeView === 'community' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          Fe & Oración
        </button>
        <button
          onClick={() => onChangeView('store')}
          className={`py-1 px-2 rounded font-semibold flex items-center gap-1 ${
            activeView === 'store' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <span>Tienda</span>
          {cartCount > 0 && (
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-stone-950 text-[9px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={onOpenCreateComic}
          className="py-1 px-2.5 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Crear
        </button>
      </div>
    </header>
  );
};
