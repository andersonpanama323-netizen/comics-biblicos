import { ComicProject, PrayerRequest } from '../types';

export const INITIAL_PROJECT: ComicProject = {
  id: 'project-calma-tempestad',
  title: 'Jesús Calma la Tempestad',
  subtitle: 'Poder y paz sobre los vientos y las olas',
  biblicalTheme: 'La soberanía y salvación de Jesucristo sobre el temor humano',
  scriptureReference: 'Marcos 4:35-41',
  artStyle: 'classic-oil',
  layoutType: 'four-classic',
  createdAt: '2026-09-20T10:00:00Z',
  updatedAt: '2026-09-21T12:00:00Z',
  securityStatus: {
    e2eeEncrypted: true,
    hashIntegrity: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    twoFactorActive: true,
    lastCloudBackup: 'Sincronizado hace 2 minutos (Cloud Backup Activo)'
  },
  devotionalSummary: {
    messageOfChrist: 'Jesucristo no sólo duerme en la tormenta porque confía plenamente en el Padre, sino que al despertar demuestra que Él es el Creador de los cielos y de la tierra. Su voz tiene autoridad suprema sobre cualquier tempestad en nuestras vidas.',
    practicalApplication: 'Cuando los vientos de la angustia y la incertidumbre azoten tu barca, no mires las olas: acude a Jesucristo en oración. Su presencia transforma el pánico en adoración.',
    prayerFocus: 'Señor Jesús, calma las tormentas que hoy perturban mi mente y mi hogar. Declaro que en Tu Palabra hay paz y que Tú eres mi Salvador y Señor.'
  },
  collaborators: [
    {
      id: 'collab-1',
      name: 'Pastor Mateo Ruiz',
      email: 'mateo.biblia@estudio.org',
      role: 'Teólogo Revisor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      activePanelId: 'panel-3'
    },
    {
      id: 'collab-2',
      name: 'Sofía Martínez',
      email: 'sofia.art@creative.com',
      role: 'Ilustrador',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      status: 'editing',
      activePanelId: 'panel-2'
    },
    {
      id: 'collab-3',
      name: 'David Benítez',
      email: 'david.script@comic.org',
      role: 'Guionista Bíblico',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      activePanelId: 'panel-1'
    }
  ],
  comments: [
    {
      id: 'comm-1',
      panelId: 'panel-3',
      authorId: 'collab-1',
      authorName: 'Pastor Mateo Ruiz',
      authorRole: 'Teólogo Revisor',
      text: 'Excelente el ademán de la mano de Jesús. Representa fielmente la autoridad divina de Marcos 4:39 donde el original griego "Siopao, pefimoso" indica mandato absoluto.',
      createdAt: 'Hace 1 hora',
      resolved: false,
      replies: [
        {
          id: 'rep-1',
          authorName: 'Sofía Martínez',
          text: '¡Muchas gracias, Pastor! He enfatizado la luz dorada envolviendo la figura de Cristo.',
          createdAt: 'Hace 45 min'
        }
      ]
    },
    {
      id: 'comm-2',
      panelId: 'panel-2',
      authorId: 'collab-3',
      authorName: 'David Benítez',
      authorRole: 'Guionista Bíblico',
      text: '¿Podríamos agrandar un poco el globo de grito de Pedro para reflejar su angustia desesperada?',
      createdAt: 'Hace 2 horas',
      resolved: true
    }
  ],
  versions: [
    {
      id: 'v-3',
      versionNumber: 'v2.1',
      title: 'Ajuste de Claroscuro y Globos Finales',
      note: 'Mejora de tipografía de imprenta 300 DPI y balance teológico en versículo 39.',
      timestamp: 'Hoy, 12:15 PM',
      authorName: 'Sofía Martínez'
    },
    {
      id: 'v-2',
      versionNumber: 'v2.0',
      title: 'Revisión Doctrinal Aprobada',
      note: 'El teólogo revisor validó los textos griegos y el pasaje bíblico contextual.',
      timestamp: 'Ayer, 06:40 PM',
      authorName: 'Pastor Mateo Ruiz'
    },
    {
      id: 'v-1',
      versionNumber: 'v1.0',
      title: 'Borrador Inicial de Storyboard',
      note: 'Creación de las 4 viñetas del relato de Galilea.',
      timestamp: '19 Sep 2026',
      authorName: 'David Benítez'
    }
  ],
  kanbanTasks: [
    {
      id: 'task-1',
      title: 'Verificación de fuentes griegas en Marcos 4',
      column: 'published',
      assigneeName: 'Pastor Mateo Ruiz',
      priority: 'high',
      panelReference: 'General',
      biblicalChecklist: ['Comparar RV1960 y NVI', 'Revisar contexto geográfico de Galilea', 'Aprobación doctrinal'],
      dueDate: 'Completado'
    },
    {
      id: 'task-2',
      title: 'Composición de la luz en la viñeta 3 (La voz de Cristo)',
      column: 'published',
      assigneeName: 'Sofía Martínez',
      priority: 'urgent',
      panelReference: 'Viñeta 3',
      biblicalChecklist: ['Rayos divinos desde el cielo', 'Expresión serena de Jesús', 'Efecto de viento deteniéndose'],
      dueDate: 'Hoy'
    },
    {
      id: 'task-3',
      title: 'Diseño de portada alternativa para Redes Sociales (Instagram 9:16)',
      column: 'art',
      assigneeName: 'Sofía Martínez',
      priority: 'medium',
      panelReference: 'Póster',
      biblicalChecklist: ['Adaptar a formato vertical 1080x1920', 'Añadir versículo destacado', 'Comprobación de contraste'],
      dueDate: 'Mañana'
    },
    {
      id: 'task-4',
      title: 'Guionizar devocional para grupos de jóvenes',
      column: 'script',
      assigneeName: 'David Benítez',
      priority: 'medium',
      panelReference: 'Guía de Estudio',
      biblicalChecklist: ['3 preguntas de reflexión', 'Oración de entrega a Cristo', 'Plan de lectura semanal'],
      dueDate: 'En 2 días'
    }
  ],
  panels: [
    {
      id: 'panel-1',
      order: 1,
      title: 'La Furia del Mar',
      scenePrompt: 'Noche cerrada en el mar de Galilea, olas descomunales amenazando una barca de pescadores galileos del siglo I, lluvia torrencial y relámpagos oscuros.',
      visualDescription: 'Una barca de madera inclinada en el abismo de las aguas oscuras. Espuma blanca salpicando y sombras de olas monstruosas.',
      biblicalVerse: 'Se levantó una gran tempestad de viento, y echaba las olas en la barca, de tal manera que ya se anegaba.',
      verseReference: 'Marcos 4:37',
      artPresetId: 'classic-oil',
      characters: [
        {
          id: 'c-1',
          name: 'Pedro el Pescador',
          role: 'Discípulo',
          x: 28,
          y: 65,
          scale: 1.0,
          flipX: false,
          pose: 'pointing',
          color: '#3B82F6'
        },
        {
          id: 'c-2',
          name: 'Juan',
          role: 'Discípulo',
          x: 55,
          y: 70,
          scale: 0.95,
          flipX: true,
          pose: 'standing',
          color: '#10B981'
        }
      ],
      balloons: [
        {
          id: 'b-1',
          type: 'scripture',
          text: 'MARCOS 4:37 — «Se levantó una gran tempestad de viento...»',
          x: 8,
          y: 8,
          tailDirection: 'none',
          fontSize: 12,
          bgColor: '#F59E0B',
          textColor: '#1C1917'
        },
        {
          id: 'b-2',
          type: 'shout',
          text: '¡El agua está entrando! ¡Nos hundiremos!',
          characterSpeaker: 'Pedro',
          x: 40,
          y: 35,
          tailDirection: 'bottom-left',
          fontSize: 14,
          bgColor: '#FFFFFF',
          textColor: '#000000'
        },
        {
          id: 'b-3',
          type: 'onomatopoeia',
          text: '¡¡CRASHHH!!',
          x: 75,
          y: 18,
          tailDirection: 'none',
          fontSize: 18,
          bgColor: '#EF4444',
          textColor: '#FFFFFF'
        }
      ]
    },
    {
      id: 'panel-2',
      order: 2,
      title: 'El Clamor Desesperado',
      scenePrompt: 'Primer plano en la popa de la barca; Jesús duerme pacíficamente sobre un cabezal mientras Pedro y Juan lo despiertan angustiados.',
      visualDescription: 'Contraste entre la serenidad celestial del rostro dormido de Jesús y el sudor y terror de los discípulos con los ojos abiertos de par en par.',
      biblicalVerse: 'Y él estaba en la popa, durmiendo sobre un cabezal; y le despertaron, y le dijeron: Maestro, ¿no tienes cuidado que perecemos?',
      verseReference: 'Marcos 4:38',
      artPresetId: 'classic-oil',
      characters: [
        {
          id: 'c-3',
          name: 'Jesús de Nazaret',
          role: 'Jesucristo el Salvador',
          x: 65,
          y: 72,
          scale: 1.1,
          flipX: false,
          pose: 'praying',
          color: '#EAB308'
        },
        {
          id: 'c-4',
          name: 'Pedro',
          role: 'Discípulo',
          x: 25,
          y: 58,
          scale: 1.05,
          flipX: false,
          pose: 'kneeling',
          color: '#3B82F6'
        }
      ],
      balloons: [
        {
          id: 'b-4',
          type: 'shout',
          text: '¡Maestro! ¿No tienes cuidado que perecemos?',
          characterSpeaker: 'Pedro',
          x: 20,
          y: 18,
          tailDirection: 'bottom-left',
          fontSize: 15,
          bgColor: '#FFFFFF',
          textColor: '#000000'
        },
        {
          id: 'b-5',
          type: 'thought',
          text: '¿Cómo puede descansar con este estruendo?...',
          characterSpeaker: 'Juan',
          x: 65,
          y: 15,
          tailDirection: 'bottom-right',
          fontSize: 13,
          bgColor: '#F1F5F9',
          textColor: '#334155'
        }
      ]
    },
    {
      id: 'panel-3',
      order: 3,
      title: 'La Voz de Autoridad Eterna',
      scenePrompt: 'Jesús se pone de pie en la barca mecida por las olas, vestiduras blancas ondeando, levanta su mano derecha hacia el cielo y el mar con majestad divina.',
      visualDescription: 'Una columna de luz dorada celestial rompe las nubes de tormenta; el viento parece congelarse ante la presencia de Cristo.',
      biblicalVerse: 'Y levantándose, reprendió al viento, y dijo al mar: Calla, enmudece. Y cesó el viento, y se hizo grande bonanza.',
      verseReference: 'Marcos 4:39',
      artPresetId: 'classic-oil',
      characters: [
        {
          id: 'c-5',
          name: 'Jesucristo',
          role: 'El Salvador y Señor',
          x: 50,
          y: 50,
          scale: 1.25,
          flipX: false,
          pose: 'glorious',
          color: '#F59E0B'
        }
      ],
      balloons: [
        {
          id: 'b-6',
          type: 'shout',
          text: '¡CALLA, ENMUDECE!',
          characterSpeaker: 'Jesús',
          x: 50,
          y: 16,
          tailDirection: 'bottom-left',
          fontSize: 20,
          bgColor: '#FEF08A',
          textColor: '#78350F'
        },
        {
          id: 'b-7',
          type: 'scripture',
          text: '«Y cesó el viento, y se hizo grande bonanza.» (Mr. 4:39)',
          x: 10,
          y: 75,
          tailDirection: 'none',
          fontSize: 12,
          bgColor: '#1E293B',
          textColor: '#F8FAFC'
        }
      ]
    },
    {
      id: 'panel-4',
      order: 4,
      title: 'Paz Profunda y Reverencia',
      scenePrompt: 'Amanecer dorado sobre aguas como un espejo de cristal, cielo despejado color púrpura y oro, los discípulos caídos de rodillas contemplando a Jesús con reverente asombro.',
      visualDescription: 'Un silencio majestuoso impregna la imagen. Aguas calmas reflejando la luz del sol naciente. La barca en perfecta quietud.',
      biblicalVerse: 'Entonces temieron con gran temor, y se decían el uno al otro: ¿Quién es éste, que aun el viento y el mar le obedecen?',
      verseReference: 'Marcos 4:41',
      artPresetId: 'classic-oil',
      characters: [
        {
          id: 'c-6',
          name: 'Jesús',
          role: 'Príncipe de Paz',
          x: 68,
          y: 60,
          scale: 1.1,
          flipX: true,
          pose: 'preaching',
          color: '#F59E0B'
        },
        {
          id: 'c-7',
          name: 'Los Discípulos',
          role: 'Testigos',
          x: 30,
          y: 68,
          scale: 1.0,
          flipX: false,
          pose: 'kneeling',
          color: '#64748B'
        }
      ],
      balloons: [
        {
          id: 'b-8',
          type: 'dialog',
          text: '¿Por qué estáis así amedrentados? ¿Cómo no tenéis fe?',
          characterSpeaker: 'Jesús',
          x: 62,
          y: 20,
          tailDirection: 'bottom-right',
          fontSize: 14,
          bgColor: '#FFFFFF',
          textColor: '#0F172A'
        },
        {
          id: 'b-9',
          type: 'thought',
          text: '¿Quién es éste, que aun el viento y el mar le obedecen?',
          characterSpeaker: 'Pedro y los Doce',
          x: 25,
          y: 25,
          tailDirection: 'bottom-left',
          fontSize: 13,
          bgColor: '#EDE9FE',
          textColor: '#4C1D95'
        }
      ]
    }
  ]
};

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pray-1',
    authorName: 'Hermana Claudia V.',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    requestText: 'Pido oración por mi familia y la salud de mi madre. Confiamos en que Jesús es el médico por excelencia y el dador de toda paz.',
    scriptureAnchor: 'Filipenses 4:6-7',
    category: 'Sanidad',
    prayersCount: 24,
    userPrayed: true,
    createdAt: 'Hoy, 09:30 AM',
    comments: [
      {
        id: 'c-1',
        authorName: 'Pastor David',
        text: '¡Unidos en fe querida hermana! Clamamos al Señor Jesucristo por fortaleza.',
        createdAt: 'Hace 2 horas'
      }
    ]
  },
  {
    id: 'pray-2',
    authorName: 'Marcos E. (Líder Juvenil)',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    requestText: 'Estamos usando estos cómics bíblicos en la escuela dominical y campamento. Oremos para que muchos jóvenes conozcan a Jesucristo como su único y suficiente Salvador.',
    scriptureAnchor: 'Juan 14:6',
    category: 'Evangelización',
    prayersCount: 42,
    userPrayed: false,
    createdAt: 'Ayer, 04:15 PM',
    comments: [
      {
        id: 'c-2',
        authorName: 'Ana Lucía',
        text: '¡Gloria a Dios por la iniciativa visual! La Palabra es viva y eficaz.',
        createdAt: 'Ayer'
      }
    ]
  },
  {
    id: 'pray-3',
    authorName: 'Gabriel S.',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    requestText: 'Doy gracias a Dios por la restauración de mi empleo tras meses de oración y prueba. ¡Él nunca llega tarde!',
    scriptureAnchor: 'Salmo 23:1',
    category: 'Gratitud',
    prayersCount: 38,
    userPrayed: true,
    createdAt: 'Hace 2 días',
    comments: []
  }
];

export const DEFAULT_BIBLICAL_PROJECT = INITIAL_PROJECT;
export const DEFAULT_PRAYER_REQUESTS = INITIAL_PRAYERS;
export const DEFAULT_KANBAN_TASKS = INITIAL_PROJECT.kanbanTasks;

export const BIBLICAL_TEMPLATES = [
  {
    id: 'calma-tempestad',
    title: 'Jesús Calma la Tempestad',
    passage: 'Marcos 4:35-41',
    theme: 'Fe sobre el temor y la autoridad de Cristo',
    suggestedStyle: 'classic-oil' as const,
    layout: 'four-classic' as const,
    summary: 'La travesía en el mar de Galilea, el despertar del Maestro y la gran bonanza.'
  },
  {
    id: 'buen-pastor',
    title: 'El Buen Pastor da su Vida',
    passage: 'Juan 10:11-18',
    theme: 'El amor sacrificial y redentor de Jesús',
    suggestedStyle: 'biblical-watercolor' as const,
    layout: 'three-dynamic' as const,
    summary: 'Cristo defiende a la oveja del lobo, cura sus heridas y la lleva sobre sus hombros.'
  },
  {
    id: 'resurreccion',
    title: '¡Él ha Resucitado! Victoria sobre la Muerte',
    passage: 'Lucas 24:1-12 & Mateo 28:1-10',
    theme: 'La tumba vacía y la esperanza viva de la salvación',
    suggestedStyle: 'epic-concept' as const,
    layout: 'four-classic' as const,
    summary: 'Las mujeres llegan de madrugada, la piedra removida, el ángel resplandeciente y el encuentro con Jesús resucitado.'
  },
  {
    id: 'mar-rojo',
    title: 'El Paso del Mar Rojo',
    passage: 'Éxodo 14:13-31',
    theme: 'La liberación de Dios y el poder del Todopoderoso',
    suggestedStyle: 'graphic-novel' as const,
    layout: 'four-classic' as const,
    summary: 'El pueblo acorralado, Moisés extiende la vara y las aguas se abren como muros vivientes.'
  },
  {
    id: 'hijo-prodigo',
    title: 'La Parábola del Padre Misericordioso',
    passage: 'Lucas 15:11-32',
    theme: 'La gracia, el perdón y el abrazo del Padre en Cristo',
    suggestedStyle: 'vintage-engraving' as const,
    layout: 'three-dynamic' as const,
    summary: 'El regreso en harapos, el padre que corre a su encuentro, el mejor vestido y la fiesta del perdón.'
  },
  {
    id: 'david-goliat',
    title: 'David y Goliat: La Victoria de la Fe',
    passage: '1 Samuel 17:32-50',
    theme: 'La batalla es de Jehová, no de espada ni lanza',
    suggestedStyle: 'spiritual-manga' as const,
    layout: 'four-classic' as const,
    summary: 'El valle de Ela, el desafío del gigante, la honda de David y el poder de Dios manifestado.'
  }
];
