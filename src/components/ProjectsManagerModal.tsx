import React from 'react';
import { ComicProject } from '../types';
import { ART_STYLES } from '../data/artStyles';
import { 
  BookOpen, 
  X, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface ProjectsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ComicProject[];
  currentProjectId: string;
  onSelectProject: (project: ComicProject) => void;
  onNewComic: () => void;
  onDuplicateProject: (project: ComicProject) => void;
  onDeleteProject: (projectId: string) => void;
}

export const ProjectsManagerModal: React.FC<ProjectsManagerModalProps> = ({
  isOpen,
  onClose,
  projects,
  currentProjectId,
  onSelectProject,
  onNewComic,
  onDuplicateProject,
  onDeleteProject
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100 font-serif">
                Mis Cómics Bíblicos ({projects.length})
              </h2>
              <p className="text-xs text-stone-400">
                Gestiona, cambia o crea nuevos proyectos de historietas sagradas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNewComic();
              }}
              className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo Cómic
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of projects */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-stone-400 space-y-3">
              <BookOpen className="w-10 h-10 mx-auto opacity-40 text-amber-400" />
              <p className="text-sm">No tienes cómics creados aún.</p>
              <button
                onClick={() => {
                  onClose();
                  onNewComic();
                }}
                className="px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow"
              >
                Crear Mi Primer Cómic Bíblico
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((proj) => {
                const isCurrent = proj.id === currentProjectId;
                const styleInfo = ART_STYLES[proj.artStyle] || ART_STYLES['classic-oil'];

                return (
                  <div
                    key={proj.id}
                    className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/5'
                        : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                          {proj.panels.length} {proj.panels.length === 1 ? 'Viñeta' : 'Viñetas'}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <Check className="w-3 h-3" /> En Edición
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-stone-100 font-serif line-clamp-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-medium mb-1">
                        {proj.scriptureReference}
                      </p>
                      <p className="text-[11px] text-stone-400 line-clamp-2">
                        {proj.subtitle || proj.biblicalTheme}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-stone-400">
                        {styleInfo.name.split(' ')[0]}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onDuplicateProject(proj)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
                          title="Duplicar cómic"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {projects.length > 1 && (
                          <button
                            onClick={() => onDeleteProject(proj.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition"
                            title="Eliminar cómic"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {!isCurrent ? (
                          <button
                            onClick={() => {
                              onSelectProject(proj);
                              onClose();
                            }}
                            className="py-1 px-3 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 font-bold text-xs text-stone-200 rounded-lg transition"
                          >
                            Abrir
                          </button>
                        ) : (
                          <button
                            onClick={onClose}
                            className="py-1 px-3 bg-amber-500/30 text-amber-300 font-bold text-xs rounded-lg border border-amber-500/40"
                          >
                            Editando
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
