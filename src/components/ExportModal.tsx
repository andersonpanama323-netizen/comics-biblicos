import React, { useState } from 'react';
import { ComicProject } from '../types';
import { Download, Printer, Share2, FileJson, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  project: ComicProject;
  isOpen: boolean;
  onClose: () => void;
}

type ExportFormat = 'print-a4' | 'poster' | 'social-square' | 'social-story' | 'web-landscape' | 'json';

export const ExportModal: React.FC<ExportModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('print-a4');
  const [includeVerseFooter, setIncludeVerseFooter] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#D97706', '#FFFFFF']
    });
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      if (selectedFormat === 'json') {
        // Industry Standard JSON export
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `${project.title.toLowerCase().replace(/\s+/g, '-')}-comic-project.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } else {
        // High-resolution Canvas rendering
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = 2480;
        let height = 3508;

        if (selectedFormat === 'social-square') {
          width = 1080;
          height = 1080;
        } else if (selectedFormat === 'social-story') {
          width = 1080;
          height = 1920;
        } else if (selectedFormat === 'web-landscape') {
          width = 1920;
          height = 1080;
        } else if (selectedFormat === 'poster') {
          width = 1800;
          height = 2400;
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          // Background fill
          ctx.fillStyle = '#0C0A09';
          ctx.fillRect(0, 0, width, height);

          // Outer frame
          ctx.strokeStyle = '#D97706';
          ctx.lineWidth = Math.round(width * 0.008);
          ctx.strokeRect(width * 0.02, height * 0.02, width * 0.96, height * 0.96);

          // Header title
          ctx.fillStyle = '#FFFBEB';
          ctx.font = `bold ${Math.round(width * 0.04)}px serif`;
          ctx.textAlign = 'center';
          ctx.fillText(project.title, width / 2, height * 0.08);

          // Scripture reference
          ctx.fillStyle = '#F59E0B';
          ctx.font = `italic ${Math.round(width * 0.02)}px sans-serif`;
          ctx.fillText(`«${project.scriptureReference}» • ${project.biblicalTheme}`, width / 2, height * 0.11);

          // Draw panel blocks representation
          const panelAreaY = height * 0.14;
          const panelAreaH = height * 0.80;
          const margin = width * 0.04;

          const panelCount = project.panels.length;
          let cols = 2;
          let rows = 2;

          if (selectedFormat === 'social-story') {
            cols = 1;
            rows = Math.min(panelCount, 3);
          } else if (panelCount === 1) {
            cols = 1;
            rows = 1;
          } else if (panelCount === 6) {
            cols = 3;
            rows = 2;
          }

          const cellW = (width - margin * (cols + 1)) / cols;
          const cellH = (panelAreaH - margin * (rows + 1)) / rows;

          project.panels.slice(0, cols * rows).forEach((panel, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const x = margin + c * (cellW + margin);
            const y = panelAreaY + margin + r * (cellH + margin);

            // Panel box
            ctx.fillStyle = '#1C1917';
            ctx.fillRect(x, y, cellW, cellH);
            ctx.strokeStyle = '#78350F';
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, cellW, cellH);

            // Panel Title & Order
            ctx.fillStyle = '#F59E0B';
            ctx.font = `bold ${Math.round(cellW * 0.05)}px sans-serif`;
            ctx.textAlign = 'left';
            ctx.fillText(`VIÑETA ${panel.order}: ${panel.title}`, x + 16, y + cellH * 0.1);

            // Panel scene description summary
            ctx.fillStyle = '#E7E5E4';
            ctx.font = `${Math.round(cellW * 0.038)}px sans-serif`;
            const words = panel.scenePrompt.split(' ').slice(0, 15).join(' ');
            ctx.fillText(words + '...', x + 16, y + cellH * 0.22);

            // Characters count
            ctx.fillStyle = '#38BDF8';
            ctx.font = `${Math.round(cellW * 0.034)}px sans-serif`;
            const charNames = panel.characters.map((ch) => ch.name).join(', ') || 'Sin personajes';
            ctx.fillText(`Personajes: ${charNames}`, x + 16, y + cellH * 0.35);

            // Dialogues
            ctx.fillStyle = '#FEF08A';
            panel.balloons.forEach((b, bIdx) => {
              if (bIdx < 2) {
                ctx.fillText(`💬 "${b.text.slice(0, 32)}..."`, x + 16, y + cellH * (0.50 + bIdx * 0.12));
              }
            });

            // Scripture quote footer
            ctx.fillStyle = '#FBBF24';
            ctx.font = `italic ${Math.round(cellW * 0.035)}px serif`;
            ctx.fillText(`«${panel.biblicalVerse.slice(0, 45)}...» (${panel.verseReference})`, x + 16, y + cellH * 0.92);
          });

          // Footer
          if (includeVerseFooter) {
            ctx.fillStyle = '#A8A29E';
            ctx.font = `${Math.round(width * 0.016)}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(
              `Producido con el Generador de Cómics Bíblicos • Fiel a las Sagradas Escrituras • ${project.securityStatus.hashIntegrity.slice(0, 24)}...`,
              width / 2,
              height * 0.975
            );
          }

          // Trigger download
          const link = document.createElement('a');
          link.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}-${selectedFormat}.png`;
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
        }
      }

      setExportComplete(true);
      triggerCelebration();
      setTimeout(() => setExportComplete(false), 3000);
    } catch (e) {
      console.error('Export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-100 font-serif">
                Exportación Profesional en Alta Resolución
              </h3>
              <p className="text-xs text-stone-400">
                Apto para imprenta, distribución eclesiástica y redes sociales
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
            Selecciona el Formato de Salida
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              {
                id: 'print-a4' as const,
                title: 'Imprenta A4 (300 DPI)',
                desc: '2480 x 3508 px • Ultra nítido para hojas impresas y folletos',
                icon: Printer,
                tag: 'Impresión'
              },
              {
                id: 'poster' as const,
                title: 'Póster / Cartel Religioso',
                desc: '1800 x 2400 px • Cartelera y eventos eclesiásticos',
                icon: ImageIcon,
                tag: 'Alta Res'
              },
              {
                id: 'social-square' as const,
                title: 'Instagram / Facebook Post',
                desc: '1080 x 1080 px (1:1) • Formato cuadrado óptimo',
                icon: Share2,
                tag: 'Social'
              },
              {
                id: 'social-story' as const,
                title: 'Stories / Reels / TikTok',
                desc: '1080 x 1920 px (9:16) • Formato vertical para móviles',
                icon: Share2,
                tag: 'Vertical'
              },
              {
                id: 'web-landscape' as const,
                title: 'Web / YouTube / Presentación',
                desc: '1920 x 1080 px (16:9) • Pantallas panorámicas',
                icon: Share2,
                tag: 'Apaisado'
              },
              {
                id: 'json' as const,
                title: 'Archivo de Proyecto (JSON)',
                desc: 'Compatibilidad total para respaldar y compartir con el equipo',
                icon: FileJson,
                tag: 'Estándar'
              }
            ].map((fmt) => {
              const Icon = fmt.icon;
              const isSelected = selectedFormat === fmt.id;

              return (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      {fmt.title}
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-semibold">
                      {fmt.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 leading-tight">
                    {fmt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Options */}
        <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
          <span className="text-stone-300 font-medium">
            Incluir pie con cita bíblica e integridad de firma digital
          </span>
          <input
            type="checkbox"
            checked={includeVerseFooter}
            onChange={(e) => setIncludeVerseFooter(e.target.checked)}
            className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-stone-400" />
            Imprimir Directamente
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 py-2.5 px-5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {exportComplete ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                ¡Descarga Completada!
              </>
            ) : isExporting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-stone-950" />
                Renderizando en Alta Resolución...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-stone-950" />
                Descargar Archivo Inmediato
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
