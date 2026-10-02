import { StoreProduct } from '../types';

export const DEFAULT_STORE_PRODUCTS: StoreProduct[] = [
  // --- LIBROS ---
  {
    id: 'book-comentario-evangelios',
    title: 'Comentario Gráfico de los Evangelios',
    subtitle: 'De Belén a la Resurrección: Estudio visual versículo por versículo',
    category: 'books',
    author: 'Pastor Mateo Ruiz & Equipo Creativo Sacro',
    description: 'Una obra monumental de 240 páginas a todo color que analiza los cuatro Evangelios a través de secuencias de arte sacro, mapas históricos de Judea y Galilea, y profundizaciones teológicas cristocéntricas.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80'
    ],
    price: 29.99,
    originalPrice: 39.99,
    formats: ['physical', 'digital', 'bundle'],
    rating: 4.9,
    reviewsCount: 148,
    featured: true,
    isbn: '978-0-987654-32-1',
    pagesCount: 240,
    scriptureAnchor: 'Lucas 1:1-4 & Juan 20:30-31',
    theologicalTag: 'Doctrina de Cristo & Teología Gráfica',
    digitalFileSize: '185 MB (PDF Vectorial 300 DPI + ePub interactivo)'
  },
  {
    id: 'book-teologia-grafica',
    title: 'Teología Gráfica: Doctrinas de la Gracia',
    subtitle: 'Fundamentos de la fe explicados a través de diagramas y arte sacro',
    category: 'books',
    author: 'Dr. Alejandro Benítez',
    description: 'Aprende las grandes doctrinas de las Sagradas Escrituras explicadas con claridad diáfana mediante metáforas visuales, líneas de tiempo de los pactos bíblicos y retratos de los personajes clave.',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=900&auto=format&fit=crop&q=80'
    ],
    price: 24.50,
    originalPrice: 32.00,
    formats: ['physical', 'digital'],
    rating: 4.8,
    reviewsCount: 92,
    isbn: '978-0-123456-78-9',
    pagesCount: 196,
    scriptureAnchor: 'Romanos 5:1-11 & Efesios 2:8-10',
    theologicalTag: 'Soteriología y Gracia Soberana',
    digitalFileSize: '120 MB (PDF interactivo)'
  },
  {
    id: 'book-historias-familia',
    title: 'Historias Bíblicas Ilustradas para la Familia',
    subtitle: '52 relatos para edificar el devocional del hogar cada semana',
    category: 'books',
    author: 'Claudia Valdés & Sofía Martínez',
    description: 'Edición de lujo en tapa dura acolchada con 52 relatos esenciales del Génesis al Apocalipsis. Incluye preguntas de aplicación para niños, versículos para memorizar y oraciones familiares.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&auto=format&fit=crop&q=80'
    ],
    price: 19.99,
    originalPrice: 26.00,
    formats: ['physical', 'digital'],
    rating: 5.0,
    reviewsCount: 215,
    featured: true,
    isbn: '978-1-555555-11-2',
    pagesCount: 160,
    scriptureAnchor: 'Deuteronomio 6:6-9',
    theologicalTag: 'Discipulado Familiar',
    digitalFileSize: '95 MB (PDF con audio-guía)'
  },
  {
    id: 'book-manual-guionista',
    title: 'Manual del Guionista de Cómics Bíblicos',
    subtitle: 'De la exégesis de las Escrituras al guion y viñetas de historieta',
    category: 'books',
    author: 'David Benítez (Guionista Pro)',
    description: 'Guía paso a paso para escritores, pastores y dibujantes que desean crear cómics bíblicos sin caer en anacronismos ni desvíos doctrinales. Incluye plantillas y ejemplos prácticos.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&auto=format&fit=crop&q=80'
    ],
    price: 14.99,
    formats: ['digital', 'physical'],
    rating: 4.7,
    reviewsCount: 64,
    pagesCount: 130,
    scriptureAnchor: '2 Timoteo 2:15',
    theologicalTag: 'Hermenéutica & Narrativa Visual',
    digitalFileSize: '65 MB (PDF + Plantillas Word/Notion)'
  },

  // --- CÓMICS Y NOVELAS GRÁFICAS ---
  {
    id: 'comic-tempestad-deluxe',
    title: 'Jesús Calma la Tempestad (Edición Cómic Deluxe)',
    subtitle: '«¿Por qué estáis amedrentados? ¿Cómo no tenéis fe?»',
    category: 'comics',
    author: 'Estudio de Cómics Bíblicos',
    description: 'Edición física y digital para coleccionistas con arte al óleo digital en gran formato. La sobrecogedora travesía de los discípulos en el mar de Galilea y la voz soberana de Jesús que aplaca los vientos.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&auto=format&fit=crop&q=80'
    ],
    price: 9.99,
    originalPrice: 14.99,
    formats: ['physical', 'digital', 'bundle'],
    rating: 5.0,
    reviewsCount: 310,
    featured: true,
    pagesCount: 36,
    scriptureAnchor: 'Marcos 4:35-41',
    theologicalTag: 'Soberanía Divina & Paz en Cristo',
    digitalFileSize: '48 MB (PDF HD + Formato CBR Cómic)'
  },
  {
    id: 'comic-resurreccion-victoria',
    title: '¡Él ha Resucitado! La Victoria del Gólgota',
    subtitle: 'Novela gráfica bíblica sobre la pasión, muerte y tumba vacía',
    category: 'comics',
    author: 'Sofía Martínez & Pastor Mateo Ruiz',
    description: 'La historia central del Evangelio narrada con profundo respeto y dramatismo cinematográfico. Desde la última cena y Getsemaní, pasando por la cruz del Calvario, hasta el glorioso amanecer del tercer día.',
    coverImage: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&auto=format&fit=crop&q=80'
    ],
    price: 12.99,
    originalPrice: 16.99,
    formats: ['physical', 'digital', 'bundle'],
    rating: 5.0,
    reviewsCount: 420,
    featured: true,
    pagesCount: 52,
    scriptureAnchor: 'Lucas 24 & Juan 19-20',
    theologicalTag: 'Expiación Vicaria & Resurrección',
    digitalFileSize: '82 MB (PDF Cómic 300 DPI)'
  },
  {
    id: 'comic-mar-rojo-exodo',
    title: 'Éxodo: El Paso del Mar Rojo',
    subtitle: 'Novela gráfica de la liberación de Israel bajo la mano de Jehová',
    category: 'comics',
    author: 'Estudio Bíblico Creativo',
    description: 'Faraón y sus carros persiguen al pueblo acorralado frente a las aguas. Moisés alza su vara y el mar se parte en dos como murallas de cristal. Impactante dinamismo visual con estilo Novela Gráfica clásica.',
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=900&auto=format&fit=crop&q=80'
    ],
    price: 10.50,
    formats: ['physical', 'digital'],
    rating: 4.8,
    reviewsCount: 175,
    pagesCount: 44,
    scriptureAnchor: 'Éxodo 14:13-31',
    theologicalTag: 'Poder de Dios & Redención',
    digitalFileSize: '60 MB (PDF HD)'
  },
  {
    id: 'comic-david-goliat-manga',
    title: 'David: El Campeón de la Fe (Manga Bíblico)',
    subtitle: '«Tú vienes a mí con espada y lanza; mas yo vengo en el Nombre de Jehová»',
    category: 'comics',
    author: 'Kenji Takahashi & Equipo de Misión',
    description: 'El clásico relato de 1 Samuel adaptado al formato Manga Bíblico espiritual, ideal para jóvenes y adolescentes. Destaca el corazón conforme a Dios de David frente a los gigantes del mundo.',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=80'
    ],
    price: 8.99,
    originalPrice: 11.99,
    formats: ['physical', 'digital'],
    rating: 4.9,
    reviewsCount: 230,
    pagesCount: 40,
    scriptureAnchor: '1 Samuel 17:45-47',
    theologicalTag: 'Victoria de la Fe',
    digitalFileSize: '54 MB (Formato Webtoon & PDF)'
  },

  // --- LÁMINAS, ARTE DIGITAL & PACKS DE IMÁGENES ---
  {
    id: 'print-pack-milagros-iglesias',
    title: 'Pack de Láminas de Arte Sacro: Los Milagros de Jesús',
    subtitle: '12 Láminas maestras en 4K/8K (300 DPI) con Licencia para Iglesias y Cultos',
    category: 'prints',
    author: 'Colectivo de Arte Sacro',
    description: 'Incluye 12 archivos maestros de ultra alta resolución (resolución nativa 8000x5000px, 300 DPI) listos para proyectar en pantallas gigantes de iglesias, imprimir pósters para aulas de escuela bíblica y folletos evangelísticos.',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&auto=format&fit=crop&q=80'
    ],
    price: 34.99,
    originalPrice: 49.99,
    formats: ['digital', 'church_license', 'physical'],
    rating: 5.0,
    reviewsCount: 98,
    featured: true,
    scriptureAnchor: 'Juan 21:25 & Colosenses 1:16',
    theologicalTag: 'Licencia Eclesial & Proyección Sacra',
    digitalFileSize: '1.2 GB (Pack ZIP con archivos TIFF + PNG 300 DPI + Slides PPTX)'
  },
  {
    id: 'print-dore-grabados-master',
    title: 'Grabados Gustave Doré: Edición Litográfica Remasterizada',
    subtitle: 'Colección de 20 ilustraciones históricas de la Biblia restauradas digitalmente',
    category: 'prints',
    author: 'Restauración por Taller Clásico',
    description: 'Los célebres grabados en madera del siglo XIX limpiados de artefactos y vectorizados para impresión litográfica de gran formato en cuadros de iglesias, despachos pastorales y bibliotecas cristianas.',
    coverImage: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=900&auto=format&fit=crop&q=80'
    ],
    price: 22.00,
    originalPrice: 28.00,
    formats: ['digital', 'physical'],
    rating: 4.9,
    reviewsCount: 76,
    scriptureAnchor: 'Salmo 119:89',
    theologicalTag: 'Grabado Clásico & Patrimonio Histórico',
    digitalFileSize: '450 MB (ZIP Alta Resolución 300 DPI)'
  },
  {
    id: 'print-poster-buen-pastor',
    title: 'Lámina Fine Art: «El Buen Pastor da su Vida»',
    subtitle: 'Póster de museo en papel de algodón de 310 g/m² o descarga 4K Ultra HD',
    category: 'prints',
    author: 'M. S. Ilustraciones Bíblicas',
    description: 'Representación conmovedora y reverente de Jesucristo llevando sobre Sus hombros a la oveja extraviada al atardecer sobre las colinas de Galilea. Acompañada de la cita de Juan 10:11 en caligrafía clásica.',
    coverImage: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=700&auto=format&fit=crop&q=80',
    samplePages: [
      'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=900&auto=format&fit=crop&q=80'
    ],
    price: 18.50,
    formats: ['physical', 'digital'],
    rating: 4.9,
    reviewsCount: 112,
    scriptureAnchor: 'Juan 10:11',
    theologicalTag: 'Cristología & Amor Redentor',
    digitalFileSize: '85 MB (PNG 4K + PDF Vectorial de imprenta)'
  }
];

export const STORE_DISCOUNT_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  'GRACIA2026': { discountPercent: 20, description: '20% de Descuento Ministerial' },
  'EVANGELIO': { discountPercent: 15, description: '15% de Descuento Especial Evangelización' },
  'PASTOR': { discountPercent: 30, description: '30% Descuento Especial para Pastores y Líderes' },
  'FE100': { discountPercent: 10, description: '10% de Bienvenida en tu Primera Compra' }
};
