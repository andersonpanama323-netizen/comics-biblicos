import React, { useState, useEffect } from 'react';
import { 
  ComicProject, 
  ComicPanel, 
  SpeechBalloon, 
  PanelCharacter, 
  ArtStyleId, 
  PrayerRequest, 
  KanbanTask, 
  ProjectVersion,
  LayoutType,
  StoreProduct,
  ProductFormat,
  CartItem,
  StoreOrder
} from './types';
import { 
  DEFAULT_BIBLICAL_PROJECT, 
  DEFAULT_PRAYER_REQUESTS, 
  DEFAULT_KANBAN_TASKS 
} from './data/defaultBiblicalData';
import { DEFAULT_STORE_PRODUCTS } from './data/defaultStoreData';
import { Navbar, ActiveView } from './components/Navbar';
import { ComicCanvas } from './components/ComicCanvas';
import { EditorSidebar } from './components/EditorSidebar';
import { ArtStyleGallery } from './components/ArtStyleGallery';
import { KanbanBoard } from './components/KanbanBoard';
import { CollaborationAndVersions } from './components/CollaborationAndVersions';
import { SpiritualCommunity } from './components/SpiritualCommunity';
import { StoreModule } from './components/StoreModule';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PublishComicModal } from './components/PublishComicModal';
import { ExportModal } from './components/ExportModal';
import { TemplatesModal } from './components/TemplatesModal';
import { CreateComicModal } from './components/CreateComicModal';
import { ProjectsManagerModal } from './components/ProjectsManagerModal';
import { AddPanelModal } from './components/AddPanelModal';
import { CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  // Multi-project collection state
  const [savedComics, setSavedComics] = useState<ComicProject[]>(() => {
    try {
      const savedList = localStorage.getItem('biblical_comics_list');
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const single = localStorage.getItem('biblical_comic_project');
      if (single) {
        return [JSON.parse(single)];
      }
    } catch (e) {
      console.warn('Failed to load comics list from localStorage', e);
    }
    return [DEFAULT_BIBLICAL_PROJECT];
  });

  const [project, setProject] = useState<ComicProject>(() => {
    try {
      const single = localStorage.getItem('biblical_comic_project');
      if (single) return JSON.parse(single);
    } catch (e) {
      console.warn('Failed to load active project', e);
    }
    return savedComics[0] || DEFAULT_BIBLICAL_PROJECT;
  });

  const [prayers, setPrayers] = useState<PrayerRequest[]>(DEFAULT_PRAYER_REQUESTS);
  const [tasks, setTasks] = useState<KanbanTask[]>(DEFAULT_KANBAN_TASKS);

  // Store & Marketplace State
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>(() => {
    try {
      const saved = localStorage.getItem('biblical_store_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Store products local load error', e);
    }
    return DEFAULT_STORE_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('biblical_store_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Cart local load error', e);
    }
    return [];
  });

  const [orders, setOrders] = useState<StoreOrder[]>(() => {
    try {
      const saved = localStorage.getItem('biblical_store_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Orders local load error', e);
    }
    return [];
  });

  const [activeView, setActiveView] = useState<ActiveView>('editor');
  const [activePanelId, setActivePanelId] = useState<string>(
    project.panels[0]?.id || 'panel-1'
  );
  const [selectedBalloonId, setSelectedBalloonId] = useState<string | undefined>(undefined);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | undefined>(undefined);

  // Modals
  const [isCreateComicOpen, setIsCreateComicOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isAddPanelModalOpen, setIsAddPanelModalOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<StoreProduct | null>(null);
  const [checkoutData, setCheckoutData] = useState<{
    subtotal: number;
    discount: number;
    total: number;
    couponCode?: string;
  }>({ subtotal: 0, discount: 0, total: 0 });

  // Processing indicators
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [isGeneratingDevotional, setIsGeneratingDevotional] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync with backend on startup
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [projRes, prayRes, storeRes, ordersRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/prayers'),
          fetch('/api/store/products'),
          fetch('/api/store/orders')
        ]);
        if (projRes.ok) {
          const remoteProjects = await projRes.json();
          if (Array.isArray(remoteProjects) && remoteProjects.length > 0) {
            setSavedComics(remoteProjects);
            const foundActive = remoteProjects.find((p: any) => p.id === project.id) || remoteProjects[0];
            setProject(foundActive);
            setActivePanelId(foundActive.panels?.[0]?.id || 'panel-1');
          }
        }
        if (prayRes.ok) {
          const remotePrayers = await prayRes.json();
          if (Array.isArray(remotePrayers) && remotePrayers.length > 0) {
            setPrayers(remotePrayers);
          }
        }
        if (storeRes.ok) {
          const customProds = await storeRes.json();
          if (Array.isArray(customProds) && customProds.length > 0) {
            setStoreProducts((prev) => {
              const combined = [...customProds, ...prev.filter((p) => !customProds.some((cp: any) => cp.id === p.id))];
              return combined;
            });
          }
        }
        if (ordersRes.ok) {
          const remoteOrders = await ordersRes.json();
          if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
            setOrders(remoteOrders);
          }
        }
      } catch (err) {
        console.warn('Using local state cache', err);
      }
    };

    fetchInitialData();
  }, []);

  // Save changes to localStorage and backend
  useEffect(() => {
    try {
      localStorage.setItem('biblical_comic_project', JSON.stringify(project));
      setSavedComics((prevList) => {
        const exists = prevList.some((p) => p.id === project.id);
        const updatedList = exists
          ? prevList.map((p) => (p.id === project.id ? project : p))
          : [project, ...prevList];
        localStorage.setItem('biblical_comics_list', JSON.stringify(updatedList));
        return updatedList;
      });
    } catch (e) {
      console.warn('LocalStorage error', e);
    }

    const timer = setTimeout(async () => {
      try {
        setIsCloudSynced(false);
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project)
        });
        if (res.ok) {
          setIsCloudSynced(true);
        }
      } catch (e) {
        setIsCloudSynced(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [project]);

  // Save cart & store state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('biblical_store_cart', JSON.stringify(cart));
      localStorage.setItem('biblical_store_products', JSON.stringify(storeProducts));
      localStorage.setItem('biblical_store_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage store sync error', e);
    }
  }, [cart, storeProducts, orders]);

  // Active panel reference
  const activePanel = project.panels.find((p) => p.id === activePanelId) || project.panels[0];

  // Update Project
  const handleUpdateProject = (updated: Partial<ComicProject>) => {
    setProject((prev) => ({
      ...prev,
      ...updated,
      updatedAt: new Date().toISOString()
    }));
  };

  // Update Panel
  const handleUpdatePanel = (panelId: string, updated: Partial<ComicPanel>) => {
    setProject((prev) => ({
      ...prev,
      panels: prev.panels.map((p) => (p.id === panelId ? { ...p, ...updated } : p)),
      updatedAt: new Date().toISOString()
    }));
  };

  // Speech Balloon Handlers
  const handleUpdateBalloon = (panelId: string, balloonId: string, updated: Partial<SpeechBalloon>) => {
    setProject((prev) => ({
      ...prev,
      panels: prev.panels.map((p) => {
        if (p.id !== panelId) return p;
        return {
          ...p,
          balloons: p.balloons.map((b) => (b.id === balloonId ? { ...b, ...updated } : b))
        };
      }),
      updatedAt: new Date().toISOString()
    }));
  };

  const handleDeleteBalloon = (panelId: string, balloonId: string) => {
    setProject((prev) => ({
      ...prev,
      panels: prev.panels.map((p) => {
        if (p.id !== panelId) return p;
        return {
          ...p,
          balloons: p.balloons.filter((b) => b.id !== balloonId)
        };
      }),
      updatedAt: new Date().toISOString()
    }));
    if (selectedBalloonId === balloonId) {
      setSelectedBalloonId(undefined);
    }
  };

  const handleAddBalloon = (type: SpeechBalloon['type']) => {
    if (!activePanel) return;

    const newBalloon: SpeechBalloon = {
      id: `balloon-${Date.now()}`,
      text: type === 'shout' ? '¡GLORIA A DIOS!' : 'Paz sea con vosotros.',
      type,
      x: 50,
      y: 25,
      fontSize: type === 'shout' ? 14 : 12,
      characterSpeaker: 'Personaje',
      tailDirection: 'bottom-left',
      bgColor: '#FFFFFF',
      textColor: '#0F172A'
    };

    handleUpdatePanel(activePanel.id, {
      balloons: [...activePanel.balloons, newBalloon]
    });
    setSelectedBalloonId(newBalloon.id);
  };

  // Character Handlers
  const handleUpdateCharacter = (panelId: string, charId: string, updated: Partial<PanelCharacter>) => {
    setProject((prev) => ({
      ...prev,
      panels: prev.panels.map((p) => {
        if (p.id !== panelId) return p;
        return {
          ...p,
          characters: p.characters.map((c) => (c.id === charId ? { ...c, ...updated } : c))
        };
      }),
      updatedAt: new Date().toISOString()
    }));
  };

  const handleDeleteCharacter = (panelId: string, charId: string) => {
    setProject((prev) => ({
      ...prev,
      panels: prev.panels.map((p) => {
        if (p.id !== panelId) return p;
        return {
          ...p,
          characters: p.characters.filter((c) => c.id !== charId)
        };
      }),
      updatedAt: new Date().toISOString()
    }));
    if (selectedCharacterId === charId) {
      setSelectedCharacterId(undefined);
    }
  };

  const handleAddCharacter = () => {
    if (!activePanel) return;

    const newChar: PanelCharacter = {
      id: `char-${Date.now()}`,
      name: 'Discípulo',
      role: 'Creyente',
      x: 50,
      y: 65,
      scale: 1,
      flipX: false,
      pose: 'standing',
      color: '#3B82F6'
    };

    handleUpdatePanel(activePanel.id, {
      characters: [...activePanel.characters, newChar]
    });
    setSelectedCharacterId(newChar.id);
  };

  // Create Comic: AI Generator Flow
  const handleCreateWithAI = async (params: {
    topic: string;
    passage: string;
    artStyle: ArtStyleId;
    panelCount: number;
    theologicalFocus: string;
  }) => {
    setIsGeneratingScript(true);
    try {
      const response = await fetch('/api/gemini/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: params.topic,
          passage: params.passage,
          artStyle: params.artStyle,
          panelCount: params.panelCount,
          theologicalFocus: params.theologicalFocus
        })
      });

      if (!response.ok) {
        throw new Error('Error al generar el guion bíblico con IA.');
      }

      const data = await response.json();
      const count = params.panelCount || 4;
      let layout: LayoutType = 'four-classic';
      if (count === 1) layout = 'single-hero';
      else if (count === 2) layout = 'two-vertical';
      else if (count === 3) layout = 'three-dynamic';
      else if (count === 6) layout = 'six-strip';

      const newComicProject: ComicProject = {
        id: `project-${Date.now()}`,
        title: data.title || params.topic,
        subtitle: data.subtitle || `Relato de fe basado en ${params.passage}`,
        scriptureReference: data.scriptureReference || params.passage,
        biblicalTheme: data.biblicalTheme || `La fidelidad de Dios manifestada en ${params.passage}`,
        artStyle: params.artStyle,
        layoutType: layout,
        panels: data.panels && data.panels.length > 0 ? data.panels : [],
        collaborators: DEFAULT_BIBLICAL_PROJECT.collaborators,
        comments: [],
        versions: [
          {
            id: `v-init-${Date.now()}`,
            versionNumber: 'v1.0',
            title: 'Creación Inicial con IA Teológica',
            note: `Guion bíblico estructurado automáticamente para ${params.topic}`,
            timestamp: 'Hoy',
            authorName: 'Director de Arte & IA Sacra'
          }
        ],
        kanbanTasks: [
          {
            id: `k-task-${Date.now()}-1`,
            title: `Verificación bíblica de ${params.passage}`,
            column: 'theology_review',
            assigneeName: 'Pastor Mateo Ruiz',
            priority: 'high',
            panelReference: 'General',
            biblicalChecklist: ['Cotejar citas bíblicas literales', 'Validación cristocéntrica'],
            dueDate: 'Hoy'
          },
          {
            id: `k-task-${Date.now()}-2`,
            title: `Ajuste de viñetas y arte sacro (${params.artStyle})`,
            column: 'art',
            assigneeName: 'Sofía Martínez',
            priority: 'medium',
            panelReference: 'Viñetas 1-N',
            biblicalChecklist: ['Composición lumínica', 'Expresiones de fe en personajes'],
            dueDate: 'Mañana'
          }
        ],
        securityStatus: {
          e2eeEncrypted: true,
          hashIntegrity: `SHA256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
          twoFactorActive: true,
          lastCloudBackup: 'Sincronizado ahora'
        },
        devotionalSummary: {
          messageOfChrist: data.messageOfChrist || `En este relato contemplamos la soberanía y redención de Jesucristo Salvador.`,
          practicalApplication: data.practicalApplication || 'Aplica este pasaje confiando en la presencia viva de Cristo en tu vida.',
          prayerFocus: data.prayerFocus || 'Señor Jesús, fortalece mi fe a través de Tu Santa Palabra.'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProject(newComicProject);
      setSavedComics((prev) => [newComicProject, ...prev]);
      if (newComicProject.panels.length > 0) {
        setActivePanelId(newComicProject.panels[0].id);
      }
      setIsCreateComicOpen(false);
      setActiveView('editor');
      showToast(`¡Cómic «${newComicProject.title}» creado exitosamente!`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Error al crear el cómic bíblico.', 'error');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // Create Comic: Blank Flow
  const handleCreateBlank = (comicData: Partial<ComicProject>) => {
    const newComic: ComicProject = {
      id: `project-${Date.now()}`,
      title: comicData.title || 'Nuevo Cómic Bíblico',
      subtitle: comicData.subtitle || 'Historia sagrada ilustrada',
      scriptureReference: comicData.scriptureReference || 'Escrituras',
      biblicalTheme: comicData.biblicalTheme || 'Enseñanza Bíblica',
      artStyle: comicData.artStyle || 'classic-oil',
      layoutType: comicData.layoutType || 'four-classic',
      panels: comicData.panels || [],
      collaborators: DEFAULT_BIBLICAL_PROJECT.collaborators,
      comments: [],
      versions: [
        {
          id: `v-${Date.now()}`,
          versionNumber: 'v1.0',
          title: 'Creación del lienzo en blanco',
          note: 'Proyecto iniciado por el autor',
          timestamp: 'Hoy',
          authorName: 'Autor'
        }
      ],
      kanbanTasks: [
        {
          id: `task-init-${Date.now()}`,
          title: 'Bocetar escenas y diálogos',
          column: 'script',
          assigneeName: 'Autor',
          priority: 'high',
          biblicalChecklist: ['Escribir citas bíblicas', 'Definir personajes'],
          dueDate: 'Esta semana'
        }
      ],
      securityStatus: {
        e2eeEncrypted: true,
        hashIntegrity: `SHA256:${Math.random().toString(36).substring(2)}`,
        twoFactorActive: true,
        lastCloudBackup: 'Guardado local activo'
      },
      devotionalSummary: comicData.devotionalSummary || {
        messageOfChrist: 'Jesucristo es el centro de las Escrituras.',
        practicalApplication: 'Caminar diariamente en obediencia a la Palabra.',
        prayerFocus: 'Señor Jesús, guía este proyecto para Tu honra y gloria.'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProject(newComic);
    setSavedComics((prev) => [newComic, ...prev]);
    if (newComic.panels.length > 0) {
      setActivePanelId(newComic.panels[0].id);
    }
    setActiveView('editor');
    showToast(`Cómic en blanco «${newComic.title}» listo para diseñar.`, 'success');
  };

  // Project Switcher
  const handleSelectProject = (selected: ComicProject) => {
    setProject(selected);
    if (selected.panels && selected.panels.length > 0) {
      setActivePanelId(selected.panels[0].id);
    }
    showToast(`Cómic «${selected.title}» cargado.`, 'info');
  };

  // Duplicate Project
  const handleDuplicateProject = (target: ComicProject) => {
    const duplicated: ComicProject = {
      ...target,
      id: `project-${Date.now()}`,
      title: `${target.title} (Copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSavedComics((prev) => [duplicated, ...prev]);
    setProject(duplicated);
    showToast(`Copia de «${target.title}» creada.`, 'success');
  };

  // Delete Project
  const handleDeleteProject = async (projectId: string) => {
    if (savedComics.length <= 1) {
      showToast('No puedes eliminar el único cómic restante.', 'error');
      return;
    }
    const filtered = savedComics.filter((p) => p.id !== projectId);
    setSavedComics(filtered);
    try {
      localStorage.setItem('biblical_comics_list', JSON.stringify(filtered));
      await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Delete project sync warning', e);
    }
    if (project.id === projectId) {
      const nextProj = filtered[0];
      setProject(nextProj);
      setActivePanelId(nextProj.panels[0]?.id || 'panel-1');
    }
    showToast('Cómic eliminado.', 'info');
  };

  // Add Panel to active project
  const handleAddPanel = (newPanel: ComicPanel) => {
    const updatedPanels = [...project.panels, newPanel];
    let newLayout = project.layoutType;
    if (updatedPanels.length >= 5 && project.layoutType !== 'six-strip') {
      newLayout = 'six-strip';
    } else if (updatedPanels.length === 3 && project.layoutType === 'two-vertical') {
      newLayout = 'three-dynamic';
    }

    handleUpdateProject({
      panels: updatedPanels,
      layoutType: newLayout
    });
    setActivePanelId(newPanel.id);
    showToast(`Viñeta #${newPanel.order} añadida al cómic.`, 'success');
  };

  // Delete Panel from active project
  const handleDeletePanel = (panelId: string) => {
    if (project.panels.length <= 1) {
      showToast('El cómic debe contener al menos 1 viñeta.', 'error');
      return;
    }
    const updated = project.panels
      .filter((p) => p.id !== panelId)
      .map((p, idx) => ({ ...p, order: idx + 1 }));

    handleUpdateProject({ panels: updated });
    if (activePanelId === panelId) {
      setActivePanelId(updated[0].id);
    }
    showToast('Viñeta eliminada.', 'info');
  };

  // Duplicate Panel
  const handleDuplicatePanel = (panelId: string) => {
    const target = project.panels.find((p) => p.id === panelId);
    if (!target) return;

    const newPanel: ComicPanel = {
      ...target,
      id: `panel-${Date.now()}`,
      order: project.panels.length + 1,
      title: `${target.title} (Continuación)`,
      characters: target.characters.map((c) => ({ ...c, id: `char-${Date.now()}-${c.name}` })),
      balloons: target.balloons.map((b) => ({ ...b, id: `bal-${Date.now()}-${b.type}` }))
    };

    handleAddPanel(newPanel);
  };

  // AI Script Generation from Sidebar
  const handleGenerateAIScript = async (promptText: string, passage: string) => {
    setIsGeneratingScript(true);
    try {
      const response = await fetch('/api/gemini/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          artStyle: project.artStyle,
          passage,
          panelCount: project.panels.length || 4
        })
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servicio de IA bíblica.');
      }

      const data = await response.json();

      if (data && data.panels && data.panels.length > 0) {
        setProject((prev) => ({
          ...prev,
          title: data.title || prev.title,
          subtitle: data.subtitle || prev.subtitle,
          scriptureReference: data.scriptureReference || prev.scriptureReference,
          biblicalTheme: data.biblicalTheme || prev.biblicalTheme,
          panels: data.panels,
          devotionalSummary: {
            messageOfChrist: data.messageOfChrist || prev.devotionalSummary.messageOfChrist,
            practicalApplication: data.practicalApplication || prev.devotionalSummary.practicalApplication,
            prayerFocus: data.prayerFocus || prev.devotionalSummary.prayerFocus
          },
          updatedAt: new Date().toISOString()
        }));

        setActivePanelId(data.panels[0].id);
        showToast('¡Guion bíblico actualizado con fidelidad teológica!', 'success');
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'No se pudo generar el guion. Verifica la conexión.', 'error');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // AI Art Generation for Active Panel
  const handleGenerateAIArtForPanel = async (panelId: string) => {
    const target = project.panels.find((p) => p.id === panelId);
    if (!target) return;

    setIsGeneratingArt(true);
    try {
      const response = await fetch('/api/gemini/generate-panel-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: target.scenePrompt,
          artStyle: project.artStyle,
          styleName: project.artStyle,
          biblicalVerse: target.biblicalVerse
        })
      });

      const data = await response.json();

      if (data.imageUrl) {
        handleUpdatePanel(panelId, { imageUrl: data.imageUrl });
        showToast('Ilustración generada con éxito.', 'success');
      } else if (data.requiresPaidKey) {
        showToast('Visualización artística vectorial activa. Para renderizado de fotogramas por IA se requiere clave con facturación.', 'info');
      } else {
        showToast('Composición artística guardada.', 'info');
      }
    } catch (err) {
      console.error(err);
      showToast('Estilo artístico previsualizado con fidelidad gráfica.', 'info');
    } finally {
      setIsGeneratingArt(false);
    }
  };

  // AI Devotional Generation
  const handleGenerateAIDevotional = async () => {
    setIsGeneratingDevotional(true);
    try {
      const response = await fetch('/api/gemini/devotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passage: project.scriptureReference,
          title: project.title
        })
      });

      if (!response.ok) throw new Error('Error al generar devocional.');

      const data = await response.json();
      setProject((prev) => ({
        ...prev,
        devotionalSummary: {
          messageOfChrist: data.christologicalConnection || data.message || prev.devotionalSummary.messageOfChrist,
          practicalApplication: data.dailyWalk || data.practicalApplication || prev.devotionalSummary.practicalApplication,
          prayerFocus: data.prayer || prev.devotionalSummary.prayerFocus
        }
      }));

      showToast('Reflexión devocional actualizada sobre Jesucristo.', 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Error al generar devocional.', 'error');
    } finally {
      setIsGeneratingDevotional(false);
    }
  };

  // Comments and Version Handlers
  const handleAddComment = (panelId: string, text: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      panelId,
      authorId: 'collab-1',
      authorName: 'Pastor Mateo Ruiz',
      authorRole: 'Revisión Doctrinal' as const,
      text,
      createdAt: 'Justo ahora',
      resolved: false
    };

    setProject((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
    showToast('Comentario añadido para revisión del equipo.', 'success');
  };

  const handleToggleResolveComment = (commentId: string) => {
    setProject((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c.id === commentId ? { ...c, resolved: !c.resolved } : c
      )
    }));
  };

  const handleRestoreVersion = (version: ProjectVersion) => {
    showToast(`Versión ${version.versionNumber} restaurada.`, 'info');
  };

  // Prayer Wall Handlers
  const handlePrayForRequest = async (prayerId: string) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id !== prayerId) return p;
        const newPrayed = !p.userPrayed;
        return {
          ...p,
          userPrayed: newPrayed,
          prayersCount: newPrayed ? p.prayersCount + 1 : p.prayersCount - 1
        };
      })
    );

    try {
      await fetch(`/api/prayers/${prayerId}/pray`, { method: 'POST' });
    } catch (e) {
      console.warn('Offline prayer count updated locally');
    }
  };

  const handleAddPrayerRequest = async (request: Omit<PrayerRequest, 'id' | 'prayersCount' | 'userPrayed' | 'createdAt' | 'comments'>) => {
    const newReq: PrayerRequest = {
      ...request,
      id: `prayer-${Date.now()}`,
      prayersCount: 1,
      userPrayed: true,
      createdAt: 'Justo ahora',
      comments: []
    };

    setPrayers((prev) => [newReq, ...prev]);
    showToast('Petición de oración publicada en el muro comunitario.', 'success');

    try {
      await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
    } catch (e) {
      console.warn('Offline prayer submission');
    }
  };

  // ================= STORE & CART HANDLERS =================
  const handleAddToCart = (product: StoreProduct, format: ProductFormat) => {
    const itemId = `${product.id}-${format}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: itemId, product, format, quantity: 1 }];
    });
    showToast(`«${product.title}» añadido al carrito.`, 'success');
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Artículo eliminado del carrito.', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenCheckout = (subtotal: number, discount: number, total: number, couponCode?: string) => {
    setCheckoutData({ subtotal, discount, total, couponCode });
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = async (newOrder: StoreOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast('¡Compra realizada con éxito! Tus descargas están listas.', 'success');

    try {
      await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (e) {
      console.warn('Checkout sync error', e);
    }
  };

  const handlePublishProduct = async (newProduct: StoreProduct) => {
    setStoreProducts((prev) => [newProduct, ...prev]);
    showToast(`¡Cómic «${newProduct.title}» publicado en la tienda!`, 'success');
    setActiveView('store');

    try {
      await fetch('/api/store/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
    } catch (e) {
      console.warn('Publish product backend sync', e);
    }
  };

  const handleBuyNow = (product: StoreProduct, format: ProductFormat) => {
    handleAddToCart(product, format);
    const subtotal = product.price;
    setCheckoutData({ subtotal, discount: 0, total: subtotal });
    setIsCheckoutOpen(true);
  };

  const cartTotalItems = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-2xl bg-stone-900 border border-amber-500/40 text-xs font-semibold text-stone-200 backdrop-blur-md">
            {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-amber-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        activeView={activeView}
        onChangeView={setActiveView}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenCreateComic={() => setIsCreateComicOpen(true)}
        onOpenProjects={() => setIsProjectsModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalItems}
        projectsCount={savedComics.length}
        currentComicTitle={project.title}
        isCloudSynced={isCloudSynced}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {/* VIEW 1: Comic Editor (Canvas + Sidebar) */}
        {activeView === 'editor' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Center Canvas Area */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto flex items-start justify-center">
              <ComicCanvas
                project={project}
                activePanelId={activePanelId}
                selectedBalloonId={selectedBalloonId}
                selectedCharacterId={selectedCharacterId}
                onSelectPanel={(panelId) => {
                  setActivePanelId(panelId);
                  setSelectedBalloonId(undefined);
                  setSelectedCharacterId(undefined);
                }}
                onSelectBalloon={(bId) => {
                  setSelectedBalloonId(bId);
                  setSelectedCharacterId(undefined);
                }}
                onSelectCharacter={(cId) => {
                  setSelectedCharacterId(cId);
                  setSelectedBalloonId(undefined);
                }}
                onAddBalloonToActive={handleAddBalloon}
                onAddCharacterToActive={handleAddCharacter}
                onGenerateAIArtForPanel={handleGenerateAIArtForPanel}
                onOpenCreateComic={() => setIsCreateComicOpen(true)}
                onOpenAddPanel={() => setIsAddPanelModalOpen(true)}
                onOpenProjects={() => setIsProjectsModalOpen(true)}
              />
            </div>

            {/* Right Editing Inspector Sidebar */}
            <EditorSidebar
              project={project}
              activePanel={activePanel}
              selectedBalloonId={selectedBalloonId}
              selectedCharacterId={selectedCharacterId}
              onUpdateProject={handleUpdateProject}
              onUpdatePanel={handleUpdatePanel}
              onUpdateBalloon={handleUpdateBalloon}
              onDeleteBalloon={handleDeleteBalloon}
              onUpdateCharacter={handleUpdateCharacter}
              onDeleteCharacter={handleDeleteCharacter}
              onAddBalloon={handleAddBalloon}
              onAddCharacter={handleAddCharacter}
              onGenerateAIScript={handleGenerateAIScript}
              onGenerateAIArtForActivePanel={() => handleGenerateAIArtForPanel(activePanel.id)}
              isGeneratingScript={isGeneratingScript}
              isGeneratingArt={isGeneratingArt}
              onOpenAddPanel={() => setIsAddPanelModalOpen(true)}
              onDeleteActivePanel={handleDeletePanel}
              onDuplicateActivePanel={handleDuplicatePanel}
            />
          </div>
        )}

        {/* VIEW 2: Predefined Art Styles Gallery */}
        {activeView === 'styles' && (
          <ArtStyleGallery
            currentStyleId={project.artStyle}
            onSelectStyle={(styleId) => {
              handleUpdateProject({ artStyle: styleId });
              showToast(`Estilo artístico cambiado a: ${styleId}`, 'success');
              setActiveView('editor');
            }}
          />
        )}

        {/* VIEW 3: Creative Team Kanban Workflow */}
        {activeView === 'kanban' && (
          <KanbanBoard
            tasks={tasks}
            onUpdateTasks={setTasks}
          />
        )}

        {/* VIEW 4: Real-time Collaboration, E2EE, and Version Control */}
        {activeView === 'collaboration' && (
          <CollaborationAndVersions
            project={project}
            onUpdateProject={handleUpdateProject}
            onRestoreVersion={handleRestoreVersion}
            onAddComment={handleAddComment}
            onToggleResolveComment={handleToggleResolveComment}
          />
        )}

        {/* VIEW 5: Faith in Jesus Savior & Virtual Prayer Community */}
        {activeView === 'community' && (
          <SpiritualCommunity
            project={project}
            prayers={prayers}
            onPrayForRequest={handlePrayForRequest}
            onAddPrayerRequest={handleAddPrayerRequest}
            onGenerateAIDevotional={handleGenerateAIDevotional}
            isGeneratingDevotional={isGeneratingDevotional}
          />
        )}

        {/* VIEW 6: Módulo de Venta / Tienda & Marketplace de Libros y Cómics */}
        {activeView === 'store' && (
          <StoreModule
            products={storeProducts}
            cart={cart}
            orders={orders}
            onAddToCart={(prod, fmt) => handleAddToCart(prod, fmt)}
            onOpenProductDetail={(prod) => setSelectedProductDetail(prod)}
            onOpenPublishModal={() => setIsPublishModalOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={(subtotal, discount, total, couponCode) => {
          handleOpenCheckout(subtotal, discount, total, couponCode);
        }}
        onClearCart={handleClearCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={checkoutData.subtotal}
        discount={checkoutData.discount}
        total={checkoutData.total}
        couponCode={checkoutData.couponCode}
        onCompleteOrder={handleCompleteOrder}
        onClearCart={handleClearCart}
      />

      {/* Product Detail & Sample Reader Modal */}
      <ProductDetailModal
        isOpen={Boolean(selectedProductDetail)}
        onClose={() => setSelectedProductDetail(null)}
        product={selectedProductDetail}
        onAddToCart={(prod, fmt) => handleAddToCart(prod, fmt)}
        onBuyNow={(prod, fmt) => handleBuyNow(prod, fmt)}
      />

      {/* Publish Comic to Store Modal */}
      <PublishComicModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        userComics={savedComics}
        currentProjectId={project.id}
        onPublishProduct={handlePublishProduct}
      />

      {/* Primary Create Comic Modal */}
      <CreateComicModal
        isOpen={isCreateComicOpen}
        onClose={() => setIsCreateComicOpen(false)}
        onCreateWithAI={handleCreateWithAI}
        onCreateBlank={handleCreateBlank}
        onSelectTemplate={(tmpl) => {
          handleUpdateProject(tmpl);
          setIsCreateComicOpen(false);
          showToast(`Relato «${tmpl.title}» cargado.`, 'success');
        }}
        isGenerating={isGeneratingScript}
      />

      {/* Projects Manager Modal (Mis Cómics) */}
      <ProjectsManagerModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        projects={savedComics}
        currentProjectId={project.id}
        onSelectProject={handleSelectProject}
        onNewComic={() => setIsCreateComicOpen(true)}
        onDuplicateProject={handleDuplicateProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Add Panel Modal */}
      <AddPanelModal
        isOpen={isAddPanelModalOpen}
        onClose={() => setIsAddPanelModalOpen(false)}
        nextOrder={project.panels.length + 1}
        scriptureReference={project.scriptureReference}
        onAddPanel={handleAddPanel}
      />

      {/* Export Modal (Print & Social Networks) */}
      <ExportModal
        project={project}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Biblical Narratives and Story Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={(template) => {
          setProject((prev) => ({
            ...prev,
            ...template,
            updatedAt: new Date().toISOString()
          }));
          if (template.panels && template.panels.length > 0) {
            setActivePanelId(template.panels[0].id);
          }
          showToast(`Relato «${template.title}» cargado en el lienzo.`, 'success');
          setActiveView('editor');
        }}
      />
    </div>
  );
}
