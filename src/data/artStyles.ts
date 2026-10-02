import { ArtStyle, ArtStyleId } from '../types';

export const ART_STYLES: Record<ArtStyleId, ArtStyle> = {
  'classic-oil': {
    id: 'classic-oil',
    name: 'Óleo Renacentista / Barroco',
    tagline: 'Estilo Caravaggio & Rembrandt con luz divina',
    description: 'Claroscuro dramático, pinceladas ricas al óleo, iluminación dorada celestial y dramatismo espiritual clásico.',
    promptModifier: 'Renaissance oil painting masterwork, dramatic chiaroscuro Caravaggio lighting, warm golden ethereal glow, sacred biblical realism, museum quality canvas texture',
    palette: ['#1C160E', '#8C5E28', '#D4AF37', '#641C1C', '#EAE0D5'],
    borderStyle: 'border-2 border-amber-800/80 shadow-2xl',
    sampleGradient: 'from-amber-950 via-stone-900 to-amber-900',
    accentBadge: 'bg-amber-900/60 text-amber-200 border-amber-700/60'
  },
  'graphic-novel': {
    id: 'graphic-novel',
    name: 'Novela Gráfica Moderna',
    tagline: 'Tintas enérgicas, sombreados tramados y acción viva',
    description: 'Líneas de tinta negra definidas, contraste contemporáneo, semitonos y dinamismo cinematográfico.',
    promptModifier: 'Modern graphic novel illustration, bold ink outlines, dynamic comic book shading, expressive heroic biblical figures, vibrant high-contrast cel coloring, comic panel art',
    palette: ['#0A0E17', '#1E3A8A', '#DC2626', '#F59E0B', '#F8FAFC'],
    borderStyle: 'border-4 border-black shadow-lg',
    sampleGradient: 'from-blue-950 via-slate-900 to-indigo-950',
    accentBadge: 'bg-blue-900/60 text-blue-200 border-blue-700/60'
  },
  'spiritual-manga': {
    id: 'spiritual-manga',
    name: 'Manga / Anime Espiritual',
    tagline: 'Expresiones emotivas, líneas de velocidad y aura celestial',
    description: 'Estilo anime refinado con gran impacto emocional, ojos expresivos y efectos de luz mística.',
    promptModifier: 'Premium spiritual anime manga illustration, detailed emotive facial features, clean line art, luminous spiritual aura, radiant heavenly beams, soft cell shading, Makoto Shinkai sky aesthetics',
    palette: ['#1E1B4B', '#4338CA', '#38BDF8', '#F472B6', '#FFFFFF'],
    borderStyle: 'border-2 border-indigo-500/70 shadow-indigo-950/50',
    sampleGradient: 'from-indigo-950 via-purple-950 to-sky-950',
    accentBadge: 'bg-indigo-900/60 text-indigo-200 border-indigo-700/60'
  },
  'biblical-watercolor': {
    id: 'biblical-watercolor',
    name: 'Acuarela Bíblica Clásica',
    tagline: 'Tonos suaves, textura de papel artesanal y calidez',
    description: 'Pinceladas traslúcidas que evocan las ilustraciones bíblicas históricas de libros sagrados clásicos.',
    promptModifier: 'Delicate biblical watercolor painting, textured handmade archival paper, soft washes of color, luminous light, gentle poetic atmosphere, historical sacred storybook art',
    palette: ['#292524', '#78716C', '#0D9488', '#F59E0B', '#FDFBF7'],
    borderStyle: 'border-2 border-amber-200/40 rounded-sm shadow-md',
    sampleGradient: 'from-amber-950/80 via-stone-800 to-teal-950/70',
    accentBadge: 'bg-teal-900/60 text-teal-200 border-teal-700/60'
  },
  'vintage-engraving': {
    id: 'vintage-engraving',
    name: 'Grabado Histórico (Doré)',
    tagline: 'Monocromático de alta precisión y tramas clásicas',
    description: 'Inspirado en los famosos grabados bíblicos de Gustave Doré con tramas cruzadas y reverencia monumental.',
    promptModifier: 'Gustave Doré vintage woodcut etching engraving, intricate cross-hatching, monochrome chiaroscuro, majestic biblical scale, high detail sacred historical engraving',
    palette: ['#0A0A0A', '#262626', '#525252', '#A3A3A3', '#E5E5E5'],
    borderStyle: 'border-4 border-stone-800 shadow-inner',
    sampleGradient: 'from-stone-950 via-zinc-900 to-neutral-950',
    accentBadge: 'bg-stone-800 text-stone-200 border-stone-600'
  },
  'byzantine-mosaic': {
    id: 'byzantine-mosaic',
    name: 'Mosaico Sagrado Bizantino',
    tagline: 'Teselas doradas, halos celestiales y solemnidad',
    description: 'Estilo de basílica antigua con teselas de oro, halos sagrados y figuras majestuosas llenas de devoción.',
    promptModifier: 'Byzantine sacred mosaic art, gold leaf tesserae, shimmering golden background, holy haloes, solemn spiritual gaze, ancient cathedral wall masterpiece',
    palette: ['#1A120B', '#B45309', '#FBBF24', '#B91C1C', '#1E40AF'],
    borderStyle: 'border-4 border-yellow-600/80 shadow-amber-900/40',
    sampleGradient: 'from-amber-950 via-yellow-950 to-stone-900',
    accentBadge: 'bg-amber-950 text-amber-300 border-amber-600'
  },
  'epic-concept': {
    id: 'epic-concept',
    name: 'Concept Art Cinematográfico',
    tagline: 'Escala colosal, niebla volumétrica e iluminación épica',
    description: 'Visuales modernos de alta producción cinematográfica con profundidad épica y fidelidad ambiental.',
    promptModifier: 'Epic cinematic concept art, biblical scale, volumetric god rays, hyper-detailed environment, realistic atmospheric fog, dramatic movie poster composition, Unreal Engine 5 render feel',
    palette: ['#090D16', '#1E293B', '#0284C7', '#E11D48', '#F8FAFC'],
    borderStyle: 'border border-sky-600/40 shadow-2xl',
    sampleGradient: 'from-slate-950 via-sky-950 to-stone-950',
    accentBadge: 'bg-sky-900/60 text-sky-200 border-sky-700/60'
  }
};
