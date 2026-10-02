import React from 'react';
import { ComicProject, ArtStyleId } from '../types';
import { BookOpen, X, Sparkles, Check } from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (project: Partial<ComicProject>) => void;
}

const TEMPLATES: Array<{
  id: string;
  title: string;
  subtitle: string;
  scriptureReference: string;
  biblicalTheme: string;
  artStyle: ArtStyleId;
  previewGradient: string;
  description: string;
  messageOfChrist: string;
  panels: any[];
}> = [
  {
    id: 'tempest',
    title: 'Jesús Calma la Tempestad',
    subtitle: '¿Por qué estáis así amedrentados? ¿Cómo no tenéis fe?',
    scriptureReference: 'Marcos 4:35-41',
    biblicalTheme: 'La autoridad soberana de Jesucristo sobre el caos y el temor humano',
    artStyle: 'classic-oil',
    previewGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    description: 'Los discípulos en medio del mar enfurecido mientras Jesús duerme en la popa. Al clamar a Él, reprende los vientos y sobreviene una gran bonanza.',
    messageOfChrist: 'Jesús no solo calma tempestades físicas; es el Príncipe de Paz que salva a quienes claman en su desesperación.',
    panels: [
      {
        id: 'p-1',
        order: 1,
        title: 'La tempestad en el mar',
        biblicalVerse: 'Y se levantó una gran tempestad de viento, y echaba las olas en la barca.',
        verseReference: 'Marcos 4:37',
        scenePrompt: 'Noche oscura en el Mar de Galilea, olas gigantes y relámpagos.',
        characters: [{ id: 'ch-1', name: 'Pedro', role: 'Discípulo', x: 45, y: 70, scale: 1, flipX: false, pose: 'kneeling', color: '#2563EB' }],
        balloons: [{ id: 'b-1', text: '¡Maestro! ¿No tienes cuidado que perecemos?', type: 'shout', x: 45, y: 35, fontSize: 13, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-2',
        order: 2,
        title: 'Jesús duerme en paz',
        biblicalVerse: 'Y él estaba en la popa, durmiendo sobre un cabezal.',
        verseReference: 'Marcos 4:38',
        scenePrompt: 'Jesucristo descansando en serenidad perfecta en medio de la tormenta.',
        characters: [{ id: 'ch-2', name: 'Jesús', role: 'Jesús', x: 50, y: 65, scale: 1.1, flipX: false, pose: 'praying', color: '#D97706' }],
        balloons: [{ id: 'b-2', text: 'Paz en medio de la tormenta...', type: 'thought', x: 50, y: 30, fontSize: 12, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-3',
        order: 3,
        title: '¡Calla, enmudece!',
        biblicalVerse: 'Y levantándose, reprendió al viento, y dijo al mar: Calla, enmudece.',
        verseReference: 'Marcos 4:39',
        scenePrompt: 'Jesús de pie en la proa, extendiendo Su mano con autoridad divina.',
        characters: [{ id: 'ch-3', name: 'Jesús', role: 'Jesús', x: 50, y: 60, scale: 1.25, flipX: false, pose: 'glorious', color: '#F59E0B' }],
        balloons: [{ id: 'b-3', text: '¡CALLA, ENMUDECE!', type: 'shout', x: 50, y: 22, fontSize: 16, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-4',
        order: 4,
        title: 'Gran bonanza y reverencia',
        biblicalVerse: '¿Quién es este, que aun el viento y el mar le obedecen?',
        verseReference: 'Marcos 4:41',
        scenePrompt: 'El mar en calma como cristal, estrellas relucientes y paz celestial.',
        characters: [
          { id: 'ch-4', name: 'Jesús', role: 'Jesús', x: 35, y: 65, scale: 1.1, flipX: false, pose: 'preaching', color: '#F59E0B' },
          { id: 'ch-5', name: 'Juan', role: 'Discípulo', x: 70, y: 70, scale: 0.95, flipX: true, pose: 'praying', color: '#3B82F6' }
        ],
        balloons: [{ id: 'b-4', text: '¿Quién es este, que el viento y el mar le obedecen?', type: 'dialog', x: 70, y: 35, fontSize: 12, tailDirection: 'bottom-left' }]
      }
    ]
  },
  {
    id: 'resurrection',
    title: 'La Resurrección de Jesucristo',
    subtitle: '¡No está aquí, pues ha resucitado, como dijo!',
    scriptureReference: 'Mateo 28 / Lucas 24',
    biblicalTheme: 'La victoria de Cristo sobre la muerte y el pecado',
    artStyle: 'epic-concept',
    previewGradient: 'from-amber-950 via-yellow-950 to-stone-900',
    description: 'El sepulcro vacío al amanecer del tercer día, la piedra removida y el Salvador resucitado anunciando salvación y perdón eterno.',
    messageOfChrist: 'Jesucristo venció a la muerte. Por Su resurrección tenemos la garantía inquebrantable de vida eterna y reconciliación con Dios.',
    panels: [
      {
        id: 'p-r1',
        order: 1,
        title: 'El sepulcro al amanecer',
        biblicalVerse: 'Y he aquí, hubo un gran terremoto; porque un ángel del Señor descendió del cielo.',
        verseReference: 'Mateo 28:2',
        scenePrompt: 'El sepulcro en la roca, la piedra removida con resplandor celestial.',
        characters: [{ id: 'chr-1', name: 'Ángel', role: 'Mensajero', x: 50, y: 60, scale: 1.1, flipX: false, pose: 'glorious', color: '#FEF08A' }],
        balloons: [{ id: 'br-1', text: '¡No temáis vosotras!', type: 'shout', x: 50, y: 25, fontSize: 14, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-r2',
        order: 2,
        title: '¡Ha Resucitado!',
        biblicalVerse: 'No está aquí, pues ha resucitado, como dijo. Venid, ved el lugar donde fue puesto el Señor.',
        verseReference: 'Mateo 28:6',
        scenePrompt: 'El sudario doblado dentro de la tumba vacía, rayos de sol del alba.',
        characters: [{ id: 'chr-2', name: 'María Magdalena', role: 'Testigo', x: 45, y: 70, scale: 1, flipX: false, pose: 'kneeling', color: '#EC4899' }],
        balloons: [{ id: 'br-2', text: '¡El sepulcro está vacío!', type: 'shout', x: 45, y: 35, fontSize: 13, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-r3',
        order: 3,
        title: 'Jesús se aparece a los discípulos',
        biblicalVerse: 'Jesús se puso en medio de ellos, y les dijo: Paz a vosotros.',
        verseReference: 'Lucas 24:36',
        scenePrompt: 'Jesús vivo y glorioso con las marcas de amor en Sus manos.',
        characters: [{ id: 'chr-3', name: 'Jesucristo', role: 'Jesús', x: 50, y: 55, scale: 1.25, flipX: false, pose: 'glorious', color: '#F59E0B' }],
        balloons: [{ id: 'br-3', text: '¡Paz a vosotros! Mirad mis manos y mis pies...', type: 'dialog', x: 50, y: 20, fontSize: 13, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-r4',
        order: 4,
        title: 'La Gran Comisión',
        biblicalVerse: 'Id por todo el mundo y predicad el evangelio a toda criatura.',
        verseReference: 'Marcos 16:15',
        scenePrompt: 'Jesús bendiciendo a Sus seguidores con gloria radiante.',
        characters: [
          { id: 'chr-4', name: 'Jesucristo', role: 'Jesús', x: 40, y: 60, scale: 1.15, flipX: false, pose: 'preaching', color: '#F59E0B' },
          { id: 'chr-5', name: 'Discípulos', role: 'Seguidores', x: 75, y: 72, scale: 0.9, flipX: true, pose: 'kneeling', color: '#3B82F6' }
        ],
        balloons: [{ id: 'br-4', text: 'He aquí yo estoy con vosotros todos los días.', type: 'dialog', x: 40, y: 25, fontSize: 12, tailDirection: 'bottom-left' }]
      }
    ]
  },
  {
    id: 'redsea',
    title: 'Moisés y el Mar Rojo',
    subtitle: 'No temáis; estad firmes, y ved la salvación que Jehová hará hoy',
    scriptureReference: 'Éxodo 14',
    biblicalTheme: 'La liberación y providencia del Dios Todopoderoso',
    artStyle: 'vintage-engraving',
    previewGradient: 'from-stone-950 via-stone-900 to-amber-950',
    description: 'El pueblo de Israel acorralado frente a las aguas. Dios manda a Moisés levantar su vara y las aguas se dividen como dos muros de agua.',
    messageOfChrist: 'Así como el Mar Rojo fue el paso de la esclavitud a la libertad, Jesucristo es nuestra Pascua que nos libra de la condenación.',
    panels: [
      {
        id: 'p-m1',
        order: 1,
        title: 'El pueblo temeroso frente al mar',
        biblicalVerse: 'Y los hijos de Israel alzaron sus ojos, y he aquí que los egipcios venían tras ellos.',
        verseReference: 'Éxodo 14:10',
        scenePrompt: 'Multitud de Israelitas junto a la orilla rocosa del mar.',
        characters: [{ id: 'chm-1', name: 'Pueblo', role: 'Israel', x: 50, y: 75, scale: 1, flipX: false, pose: 'kneeling', color: '#78716C' }],
        balloons: [{ id: 'bm-1', text: '¿No había sepulcros en Egipto...?', type: 'dialog', x: 50, y: 35, fontSize: 12, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-m2',
        order: 2,
        title: 'Estad firmes y ved la salvación',
        biblicalVerse: 'Jehová peleará por vosotros, y vosotros estaréis tranquilos.',
        verseReference: 'Éxodo 14:14',
        scenePrompt: 'Moisés con su vara en alto, túnica agitada por el viento divino.',
        characters: [{ id: 'chm-2', name: 'Moisés', role: 'Líder', x: 50, y: 60, scale: 1.2, flipX: false, pose: 'pointing', color: '#CA8A04' }],
        balloons: [{ id: 'bm-2', text: '¡Jehová peleará por vosotros!', type: 'shout', x: 50, y: 22, fontSize: 15, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-m3',
        order: 3,
        title: 'Las aguas se dividen',
        biblicalVerse: 'Y extendió Moisés su mano sobre el mar, y las aguas se dividieron.',
        verseReference: 'Éxodo 14:21',
        scenePrompt: 'Muro de agua a derecha e izquierda, camino de tierra seca en el fondo del mar.',
        characters: [{ id: 'chm-3', name: 'Moisés', role: 'Líder', x: 30, y: 65, scale: 1.1, flipX: false, pose: 'glorious', color: '#CA8A04' }],
        balloons: [{ id: 'bm-3', text: '¡Avanzad en el nombre de Dios!', type: 'shout', x: 30, y: 30, fontSize: 13, tailDirection: 'bottom-left' }]
      },
      {
        id: 'p-m4',
        order: 4,
        title: 'Canto de Victoria y Alabanza',
        biblicalVerse: 'Cantaré yo a Jehová, porque se ha magnificado en gran manera.',
        verseReference: 'Éxodo 15:1',
        scenePrompt: 'María y el pueblo cantando y danzando en la otra orilla en gratitud.',
        characters: [{ id: 'chm-4', name: 'María', role: 'Profetisa', x: 55, y: 65, scale: 1, flipX: true, pose: 'praying', color: '#F59E0B' }],
        balloons: [{ id: 'bm-4', text: '¡Jehová es mi fortaleza y mi cántico!', type: 'shout', x: 55, y: 25, fontSize: 12, tailDirection: 'bottom-left' }]
      }
    ]
  }
];

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-100 font-serif">
                Relatos Bíblicos y Proyectos Listos
              </h3>
              <p className="text-xs text-stone-400">
                Carga narrativas preconfiguradas con fidelidad teológica, citas exactas y personajes
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="rounded-xl border border-stone-800 bg-stone-950/80 hover:border-amber-500/60 transition overflow-hidden flex flex-col justify-between"
            >
              <div className={`p-4 bg-gradient-to-r ${tmpl.previewGradient} space-y-1`}>
                <span className="text-[10px] font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
                  {tmpl.scriptureReference}
                </span>
                <h4 className="text-base font-bold text-stone-100 font-serif">
                  {tmpl.title}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-1 italic font-serif">
                  «{tmpl.subtitle}»
                </p>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-400 leading-relaxed">
                  {tmpl.description}
                </p>

                <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-800/80 text-[11px] text-amber-300/90 font-medium">
                  <span className="font-bold text-stone-300 block mb-0.5">Enfoque en Cristo:</span>
                  {tmpl.messageOfChrist}
                </div>

                <button
                  onClick={() => {
                    onSelectTemplate({
                      title: tmpl.title,
                      subtitle: tmpl.subtitle,
                      scriptureReference: tmpl.scriptureReference,
                      biblicalTheme: tmpl.biblicalTheme,
                      artStyle: tmpl.artStyle,
                      panels: tmpl.panels,
                      devotionalSummary: {
                        messageOfChrist: tmpl.messageOfChrist,
                        practicalApplication: 'Confiar en la fidelidad de Dios y caminar por fe cada día.',
                        prayerFocus: 'Señor Jesús, concédeme la fe para descansar en Tu soberanía y proclamar Tu Evangelio.'
                      }
                    });
                    onClose();
                  }}
                  className="w-full py-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:text-stone-950" />
                  Cargar este Relato Bíblico
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
