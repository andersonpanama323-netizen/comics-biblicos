import React, { useState } from 'react';
import { ComicProject, PanelComment, ProjectVersion, Collaborator } from '../types';
import { 
  Users, 
  History, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  RotateCcw, 
  Lock, 
  KeyRound, 
  CloudCheck, 
  Send,
  Plus
} from 'lucide-react';

interface CollaborationAndVersionsProps {
  project: ComicProject;
  onUpdateProject: (updated: Partial<ComicProject>) => void;
  onRestoreVersion: (version: ProjectVersion) => void;
  onAddComment: (panelId: string, text: string) => void;
  onToggleResolveComment: (commentId: string) => void;
}

export const CollaborationAndVersions: React.FC<CollaborationAndVersionsProps> = ({
  project,
  onUpdateProject,
  onRestoreVersion,
  onAddComment,
  onToggleResolveComment
}) => {
  const [activeTab, setActiveTab] = useState<'collab' | 'versions' | 'security'>('collab');
  const [newCommentText, setNewCommentText] = useState('');
  const [targetPanelId, setTargetPanelId] = useState(project.panels[0]?.id || 'panel-1');

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(targetPanelId, newCommentText.trim());
    setNewCommentText('');
  };

  const handleCreateNewVersion = () => {
    const versionNum = `v${project.versions.length + 1}.0`;
    const newVersion: ProjectVersion = {
      id: `v-${Date.now()}`,
      versionNumber: versionNum,
      title: `Versión de Producción ${versionNum}`,
      note: 'Snapshot guardado manualmente por el equipo creativo.',
      timestamp: 'Justo ahora',
      authorName: 'Usuario Actual (Tú)'
    };

    onUpdateProject({
      versions: [newVersion, ...project.versions]
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Top Header & Navigation */}
      <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-100 font-serif">
            Colaboración en Tiempo Real y Control de Versiones
          </h2>
          <p className="text-xs text-stone-400">
            Trabajo conjunto simultáneo en un mismo archivo con comentarios integrados, historial de cambios y cifrado de seguridad.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-xl border border-stone-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('collab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'collab'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Equipo & Comentarios
          </button>
          <button
            onClick={() => setActiveTab('versions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'versions'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Control de Versiones
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'security'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Seguridad & E2EE
          </button>
        </div>
      </div>

      {/* TAB 1: Team & Comments */}
      {activeTab === 'collab' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Collaborators Card */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              Colaboradores Activos en el Archivo ({project.collaborators.length})
            </h3>
            <div className="space-y-3">
              {project.collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={collab.avatar}
                        alt={collab.name}
                        className="w-10 h-10 rounded-full object-cover border border-stone-700"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-stone-950 ${
                          collab.status === 'editing'
                            ? 'bg-amber-500 animate-pulse'
                            : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-200">{collab.name}</p>
                      <p className="text-[11px] text-amber-400 font-medium">{collab.role}</p>
                      <p className="text-[10px] text-stone-400">
                        {collab.status === 'editing'
                          ? `Editando ${collab.activePanelId}`
                          : 'Conectado en tiempo real'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Presence Banner */}
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Sincronización Multidispositivo Activa
              </p>
              <p className="text-[11px] text-emerald-200/80">
                Los cambios en los globos de texto, encuadres y notas bíblicas se propagan automáticamente a todos los dispositivos conectados.
              </p>
            </div>
          </div>

          {/* Integrated Comments Thread */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Comentarios y Correcciones Doctrinales
            </h3>

            {/* Post new comment form */}
            <form onSubmit={handlePostComment} className="p-3.5 bg-stone-900 rounded-xl border border-stone-800 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Viñeta a comentar:</span>
                <select
                  value={targetPanelId}
                  onChange={(e) => setTargetPanelId(e.target.value)}
                  className="bg-stone-950 border border-stone-700 rounded px-2 py-1 text-xs text-amber-300 font-semibold"
                >
                  {project.panels.map((p) => (
                    <option key={p.id} value={p.id}>
                      Viñeta {p.order}: {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Escribe una sugerencia de diálogo, luz, vestidura o cita bíblica..."
                  className="flex-1 bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs rounded-lg transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publicar
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {project.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-xl border transition space-y-2.5 ${
                    comment.resolved
                      ? 'bg-stone-950/40 border-stone-800/80 opacity-70'
                      : 'bg-stone-950/90 border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-200">
                        {comment.authorName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-amber-400 font-medium">
                        {comment.authorRole}
                      </span>
                      <span className="text-[10px] text-stone-400">{comment.createdAt}</span>
                    </div>

                    <button
                      onClick={() => onToggleResolveComment(comment.id)}
                      className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded transition ${
                        comment.resolved
                          ? 'text-emerald-400 bg-emerald-950/60'
                          : 'text-stone-400 hover:text-emerald-400 hover:bg-stone-800'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {comment.resolved ? 'Resuelto' : 'Marcar Resuelto'}
                    </button>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    {comment.text}
                  </p>

                  {/* Replies if any */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-4 border-l-2 border-amber-500/40 space-y-1.5 pt-1">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="text-xs">
                          <span className="font-bold text-stone-300">{reply.authorName}: </span>
                          <span className="text-stone-400">{reply.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Version Control */}
      {activeTab === 'versions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Historial de Versiones del Cómic
              </h3>
              <p className="text-xs text-stone-400">
                Guarda puntos de control y restaura cualquier versión anterior si necesitas revertir cambios
              </p>
            </div>
            <button
              onClick={handleCreateNewVersion}
              className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Crear Nuevo Snapshot (Punto de Control)
            </button>
          </div>

          <div className="space-y-3">
            {project.versions.map((ver, idx) => (
              <div
                key={ver.id}
                className="p-4 bg-stone-950/90 border border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded text-xs font-bold">
                      {ver.versionNumber}
                    </span>
                    <h4 className="text-xs font-bold text-stone-200">{ver.title}</h4>
                    {idx === 0 && (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
                        Versión Actual
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400">{ver.note}</p>
                  <p className="text-[10px] text-stone-400">
                    Guardado el {ver.timestamp} por {ver.authorName}
                  </p>
                </div>

                {idx !== 0 && (
                  <button
                    onClick={() => onRestoreVersion(ver)}
                    className="py-1.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    Restaurar esta Versión
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Security & E2EE */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* E2EE Card */}
            <div className="p-5 bg-stone-950/90 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200">
                    Cifrado de Extremo a Extremo (E2EE)
                  </h4>
                  <p className="text-xs text-emerald-400 font-semibold">
                    Protegido con Cifrado Criptográfico
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Todos los guiones, diálogos y bocetos bíblicos se encriptan antes de enviarse a los servidores en la nube. Sólo los miembros del equipo autorizados poseen la clave de descifrado.
              </p>
              <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-[10px] font-mono text-stone-400 break-all">
                <span className="text-amber-400 font-bold block mb-0.5">Integridad SHA-256:</span>
                {project.securityStatus.hashIntegrity}
              </div>
            </div>

            {/* 2FA Card */}
            <div className="p-5 bg-stone-950/90 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200">
                    Autenticación de Doble Factor (2FA)
                  </h4>
                  <p className="text-xs text-amber-400 font-semibold">
                    Activa para Cuentas del Equipo
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Garantiza que cualquier publicación de cómics oficiales o exportación a imprenta requiera verificación de dos pasos por token de seguridad.
              </p>
              <div className="flex items-center justify-between p-3 bg-stone-900 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-300 font-medium">Requerir 2FA para exportar</span>
                <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 text-[11px] font-bold rounded-full border border-emerald-800">
                  Activado
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
