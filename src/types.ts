export type LayoutType = 
  | 'single-hero'     // 1 gran viñeta tipo splash / portada
  | 'two-vertical'    // 2 viñetas verticales
  | 'three-dynamic'   // 3 viñetas dinámicas (1 grande arriba, 2 abajo)
  | 'four-classic'    // 4 viñetas (grilla 2x2 clásica)
  | 'six-strip';      // 6 viñetas (grilla 3x2 completa)

export type ArtStyleId = 
  | 'classic-oil'          // Caravaggio / Renacentista
  | 'graphic-novel'        // Cómic Moderno / Tintas dramáticas
  | 'spiritual-manga'      // Anime / Manga Bíblico
  | 'biblical-watercolor'  // Acuarela Clásica Ilustrada
  | 'vintage-engraving'    // Grabado Gustave Doré
  | 'byzantine-mosaic'     // Mosaico Bizantino Sagrado
  | 'epic-concept';        // Concept Art Épico Cinematográfico

export interface ArtStyle {
  id: ArtStyleId;
  name: string;
  tagline: string;
  description: string;
  promptModifier: string;
  palette: string[];
  borderStyle: string;
  sampleGradient: string;
  accentBadge: string;
}

export type BalloonType = 
  | 'dialog'        // Diálogo hablado normal con cola
  | 'thought'       // Pensamiento nube
  | 'shout'         // Grito / Épico dentado
  | 'scripture'     // Cita o Narración de las Escrituras
  | 'onomatopoeia'; // Onomatopeya sonora ("¡AMÉN!", "¡ZAS!", "¡ALELUYA!")

export interface SpeechBalloon {
  id: string;
  type: BalloonType;
  text: string;
  characterSpeaker?: string;
  x: number; // Porcentaje de 0 a 100
  y: number; // Porcentaje de 0 a 100
  width?: number; // En porcentaje o pixels relativos
  tailDirection: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'none';
  fontSize: number; // pt / px
  bgColor: string;
  textColor: string;
}

export interface CharacterPreset {
  id: string;
  name: string;
  role: string;
  defaultPose: string;
  color: string;
  avatarSeed: string;
}

export interface PanelCharacter {
  id: string;
  name: string;
  role: string; // ej. "Jesús de Nazaret", "Pedro", "Moisés", "Discípulo", "Centurión", "Ángel"
  x: number;    // 0 - 100
  y: number;    // 0 - 100
  scale: number; // 0.5 - 2.0
  flipX: boolean;
  pose: 'standing' | 'preaching' | 'praying' | 'pointing' | 'walking' | 'kneeling' | 'glorious';
  color: string;
}

export interface ComicPanel {
  id: string;
  order: number;
  title: string;
  scenePrompt: string;
  visualDescription: string;
  biblicalVerse: string;
  verseReference: string;
  imageUrl?: string;
  artPresetId: string;
  characters: PanelCharacter[];
  balloons: SpeechBalloon[];
  filterEffect?: 'none' | 'sepia' | 'dramatic' | 'golden-hour' | 'noir' | 'watercolor';
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Guionista Bíblico' | 'Ilustrador' | 'Teólogo Revisor' | 'Letrista y Diseñador';
  avatar: string;
  status: 'online' | 'idle' | 'editing';
  activePanelId?: string;
}

export interface PanelComment {
  id: string;
  panelId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  text: string;
  createdAt: string;
  resolved: boolean;
  replies?: {
    id: string;
    authorName: string;
    text: string;
    createdAt: string;
  }[];
}

export interface ProjectVersion {
  id: string;
  versionNumber: string;
  title: string;
  note: string;
  timestamp: string;
  authorName: string;
  snapshotData?: string; // Serialized JSON
}

export interface KanbanTask {
  id: string;
  title: string;
  column: 'research' | 'script' | 'art' | 'theology_review' | 'lettering' | 'published';
  assigneeName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  panelReference?: string;
  biblicalChecklist: string[];
  dueDate?: string;
}

export interface ComicProject {
  id: string;
  title: string;
  subtitle: string;
  biblicalTheme: string;
  scriptureReference: string;
  artStyle: ArtStyleId;
  layoutType: LayoutType;
  panels: ComicPanel[];
  collaborators: Collaborator[];
  comments: PanelComment[];
  versions: ProjectVersion[];
  kanbanTasks: KanbanTask[];
  securityStatus: {
    e2eeEncrypted: boolean;
    hashIntegrity: string;
    twoFactorActive: boolean;
    lastCloudBackup: string;
  };
  devotionalSummary: {
    messageOfChrist: string;
    practicalApplication: string;
    prayerFocus: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PrayerRequest {
  id: string;
  authorName: string;
  authorAvatar: string;
  requestText: string;
  scriptureAnchor: string;
  category: 'Fe y Salvación' | 'Sanidad' | 'Familia' | 'Evangelización' | 'Gratitud';
  prayersCount: number;
  userPrayed: boolean;
  createdAt: string;
  comments: {
    id: string;
    authorName: string;
    text: string;
    createdAt: string;
  }[];
}

export type StoreCategory = 'all' | 'books' | 'comics' | 'prints' | 'custom';
export type ProductFormat = 'digital' | 'physical' | 'bundle' | 'church_license';

export interface StoreProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'books' | 'comics' | 'prints' | 'custom';
  author: string;
  description: string;
  coverImage: string;
  samplePages: string[];
  price: number;
  originalPrice?: number;
  formats: ProductFormat[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isbn?: string;
  pagesCount?: number;
  scriptureAnchor: string;
  theologicalTag: string;
  digitalFileSize?: string;
  isUserCreated?: boolean;
  comicProjectId?: string;
}

export interface CartItem {
  id: string;
  product: StoreProduct;
  format: ProductFormat;
  quantity: number;
}

export interface StoreOrder {
  id: string;
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'card' | 'paypal' | 'transfer' | 'church_donation';
  createdAt: string;
  status: 'completed' | 'processing';
  downloadLinks: {
    title: string;
    format: string;
    fileSize: string;
    filename: string;
  }[];
}
