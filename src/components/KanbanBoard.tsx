import React, { useState } from 'react';
import { KanbanTask } from '../types';
import { Plus, CheckSquare, Clock, AlertCircle, User, ArrowRight, ArrowLeft } from 'lucide-react';

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onUpdateTasks: (tasks: KanbanTask[]) => void;
}

const COLUMNS = [
  { id: 'research' as const, title: 'Investigación Bíblica', color: 'border-blue-500/50' },
  { id: 'script' as const, title: 'Guión & Storyboard', color: 'border-indigo-500/50' },
  { id: 'art' as const, title: 'Ilustración & Estilos', color: 'border-amber-500/50' },
  { id: 'theology_review' as const, title: 'Revisión Doctrinal', color: 'border-purple-500/50' },
  { id: 'lettering' as const, title: 'Letrado & Globos', color: 'border-teal-500/50' },
  { id: 'published' as const, title: 'Listo para Publicar', color: 'border-emerald-500/50' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onUpdateTasks
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [targetColumn, setTargetColumn] = useState<KanbanTask['column']>('research');
  const [assignee, setAssignee] = useState('Pastor Mateo Ruiz');
  const [showAddForm, setShowAddForm] = useState(false);

  const moveTask = (taskId: string, direction: 'left' | 'right') => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentIndex = COLUMNS.findIndex((c) => c.id === task.column);
    const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < COLUMNS.length) {
      const updated = tasks.map((t) =>
        t.id === taskId ? { ...t, column: COLUMNS[newIndex].id } : t
      );
      onUpdateTasks(updated);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      column: targetColumn,
      assigneeName: assignee,
      priority: 'medium',
      biblicalChecklist: ['Fidelidad a las Escrituras', 'Validar citas bíblicas'],
      dueDate: 'Esta semana'
    };

    onUpdateTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-stone-100 font-serif flex items-center gap-2">
            Flujo de Trabajo y Tablero Kanban del Equipo
          </h2>
          <p className="text-xs text-stone-400">
            Optimización y coordinación simultánea entre guionistas bíblicos, ilustradores y revisores doctrinales
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nueva Tarea de Producción
        </button>
      </div>

      {/* Add Task Form Modal / Collapse */}
      {showAddForm && (
        <form
          onSubmit={handleAddTask}
          className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3 animate-in fade-in duration-150"
        >
          <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
            Añadir Tarea al Flujo
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Descripción de la tarea bíblica o artística..."
              className="sm:col-span-1 bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
            <select
              value={targetColumn}
              onChange={(e) => setTargetColumn(e.target.value as any)}
              className="bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            >
              <option value="Pastor Mateo Ruiz">Pastor Mateo Ruiz (Teólogo)</option>
              <option value="Sofía Martínez">Sofía Martínez (Ilustrador)</option>
              <option value="David Benítez">David Benítez (Guionista)</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 bg-stone-800 text-stone-300 text-xs font-semibold rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded-lg shadow"
            >
              Guardar Tarea
            </button>
          </div>
        </form>
      )}

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
        {COLUMNS.map((col, colIdx) => {
          const colTasks = tasks.filter((t) => t.column === col.id);

          return (
            <div
              key={col.id}
              className={`bg-stone-950/80 rounded-xl border-t-4 ${col.color} border-x border-b border-stone-800/80 p-3 min-h-[380px] flex flex-col`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-800">
                <span className="text-xs font-bold text-stone-200">
                  {col.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-400 font-bold">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-2.5 flex-1">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 hover:border-stone-700 transition space-y-2 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-xs font-bold text-stone-200 leading-snug">
                        {task.title}
                      </p>
                      {task.priority === 'urgent' && (
                        <span className="text-[9px] font-black uppercase text-red-400 bg-red-950/60 px-1 py-0.5 rounded border border-red-800/60">
                          Urgente
                        </span>
                      )}
                    </div>

                    {/* Assignee & Due */}
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span className="flex items-center gap-1 text-stone-300">
                        <User className="w-3 h-3 text-amber-400" />
                        {task.assigneeName.split(' ')[0]}
                      </span>
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-stone-400">
                          <Clock className="w-3 h-3" />
                          {task.dueDate}
                        </span>
                      )}
                    </div>

                    {/* Biblical Checklist preview */}
                    {task.biblicalChecklist && task.biblicalChecklist.length > 0 && (
                      <div className="pt-1.5 border-t border-stone-800/80 space-y-1">
                        {task.biblicalChecklist.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[10px] text-stone-400">
                            <CheckSquare className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Move task arrows */}
                    <div className="flex items-center justify-between pt-1 border-t border-stone-800/60">
                      <button
                        onClick={() => moveTask(task.id, 'left')}
                        disabled={colIdx === 0}
                        className="p-1 text-stone-400 hover:text-stone-200 disabled:opacity-20 transition"
                        title="Mover columna anterior"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveTask(task.id, 'right')}
                        disabled={colIdx === COLUMNS.length - 1}
                        className="p-1 text-stone-400 hover:text-stone-200 disabled:opacity-20 transition"
                        title="Mover siguiente columna"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
