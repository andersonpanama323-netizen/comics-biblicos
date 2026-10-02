import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// In-memory project and prayer store for cloud sync
let currentProjects: Record<string, any> = {};
let currentPrayers: any[] = [];

// Endpoint: Check API health and sync status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Endpoint: AI Script & Scene Breakdown generator for biblical comics
app.post('/api/gemini/generate-script', async (req, res) => {
  try {
    const { prompt, passage, biblicalPassage, artStyle, panelCount = 4, theologicalFocus } = req.body;
    const requestedPassage = passage || biblicalPassage || 'Evangelios';
    const requestedTopic = prompt || 'Relato Bíblico';
    const numPanels = Math.min(Math.max(Number(panelCount) || 4, 1), 6);
    const ai = getGeminiClient();

    if (ai) {
      try {
        const systemInstruction = `Eres un teólogo cristiano erudito, guionista profesional de cómics y director de arte sacro.
Tu misión es desglosar pasajes y relatos bíblicos en un guion estructurado de cómic visual, fiel a las Sagradas Escrituras y centrado en el amor, majestad y salvación de Jesucristo nuestro Señor.
Debes responder ÚNICAMENTE un objeto JSON válido con la siguiente estructura:
{
  "title": "Título sugerente del cómic",
  "subtitle": "Subtítulo temático inspirador",
  "biblicalTheme": "Enseñanza y tema teológico principal",
  "scriptureReference": "Libro, capítulo y versículos",
  "messageOfChrist": "Breve mensaje inspirador sobre Cristo como Salvador y la aplicación a la fe diaria",
  "practicalApplication": "Paso de fe concreto para el creyente hoy",
  "prayerFocus": "Oración breve, reverente y profunda",
  "panels": [
    {
      "id": "panel-1",
      "order": 1,
      "title": "Nombre de la viñeta",
      "scenePrompt": "Prompt descriptivo para la escena detallando composición, luz, plano y personajes",
      "visualDescription": "Descripción de la escena para el dibujante",
      "biblicalVerse": "Texto exacto del versículo para este cuadro",
      "verseReference": "Cita (ej. Marcos 4:37)",
      "artPresetId": "classic-oil",
      "characters": [
        {
          "id": "char-1",
          "name": "Nombre de personaje",
          "role": "Rol bíblico",
          "pose": "standing | preaching | praying | pointing | walking | kneeling | glorious",
          "x": 45,
          "y": 65,
          "scale": 1,
          "flipX": false,
          "color": "#F59E0B"
        }
      ],
      "balloons": [
        {
          "id": "bal-1",
          "type": "dialog | thought | shout | scripture | onomatopoeia",
          "text": "Texto del globo o narración",
          "characterSpeaker": "Quién habla",
          "x": 50,
          "y": 25,
          "fontSize": 13,
          "tailDirection": "bottom-left",
          "bgColor": "#FFFFFF",
          "textColor": "#0F172A"
        }
      ]
    }
  ]
}`;

        const userContent = `Genera un guión completo de cómic bíblico de exactamente ${numPanels} viñetas para:
Tema/Historia: "${requestedTopic}"
Pasaje Bíblico: "${requestedPassage}"
Estilo artístico seleccionado: "${artStyle || 'classic-oil'}"
Enfoque Teológico: "${theologicalFocus || 'Cristocéntrico y Salvación'}"
Asegúrate de que cada viñeta tenga personajes bíblicos situados, globos de diálogo o citas bíblicas exactas de las Escrituras, y que resalte a Jesucristo y la gloria de Dios.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userContent,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const text = response.text || '{}';
        const parsedData = JSON.parse(text);
        if (parsedData && Array.isArray(parsedData.panels) && parsedData.panels.length > 0) {
          // Normalize IDs and order
          parsedData.panels = parsedData.panels.map((p: any, idx: number) => ({
            ...p,
            id: p.id || `panel-${Date.now()}-${idx + 1}`,
            order: idx + 1,
            characters: (p.characters || []).map((c: any, cIdx: number) => ({
              ...c,
              id: c.id || `char-${Date.now()}-${idx}-${cIdx}`,
              pose: c.pose || 'standing',
              x: typeof c.x === 'number' ? c.x : 45,
              y: typeof c.y === 'number' ? c.y : 65,
              scale: c.scale || 1,
              flipX: Boolean(c.flipX),
              color: c.color || '#F59E0B',
            })),
            balloons: (p.balloons || []).map((b: any, bIdx: number) => ({
              ...b,
              id: b.id || `bal-${Date.now()}-${idx}-${bIdx}`,
              type: b.type || 'dialog',
              x: typeof b.x === 'number' ? b.x : 50,
              y: typeof b.y === 'number' ? b.y : 25,
              fontSize: b.fontSize || 13,
              tailDirection: b.tailDirection || 'bottom-left',
              bgColor: b.bgColor || '#FFFFFF',
              textColor: b.textColor || '#0F172A',
            })),
          }));
          return res.json(parsedData);
        }
      } catch (geminiError: any) {
        console.warn('Gemini generate script error, falling back to theological template builder:', geminiError.message);
      }
    }

    // Theological Fallback Generator when API key is pending or network fallback
    const biblicalFallback = buildBiblicalFallbackScript(requestedTopic, requestedPassage, numPanels, artStyle);
    return res.json(biblicalFallback);
  } catch (err: any) {
    console.error('Error generating biblical comic script:', err);
    return res.status(500).json({
      error: 'Error al procesar el guion bíblico',
      details: err?.message || String(err),
    });
  }
});

function buildBiblicalFallbackScript(topic: string, passage: string, panelCount: number, artStyle: string) {
  const panelTemplates = [
    {
      title: 'El Comienzo del Relato',
      verse: 'En el principio creó Dios los cielos y la tierra.',
      ref: passage,
      prompt: `Escena bíblica majestuosa de ${topic}. Luz divina y composición inspirada.`,
      desc: `Apertura de la historia sagrada de ${topic}.`,
      char: { name: 'Mensajero de Dios', role: 'Profeta', pose: 'pointing' as const, color: '#F59E0B' },
      balloon: { type: 'scripture' as const, text: `He aquí la historia sagrada de ${topic}, testimonio de la fidelidad del Señor.` }
    },
    {
      title: 'El Momento de Prueba',
      verse: 'Claman los justos, y Jehová oye, y los libra de todas sus angustias.',
      ref: 'Salmos 34:17',
      prompt: `Personajes enfrentando la prueba en ${topic}. Expresión de fe y súplica.`,
      desc: `Momento de clamor y confianza en el Señor.`,
      char: { name: 'Creyente en Fe', role: 'Discípulo', pose: 'praying' as const, color: '#3B82F6' },
      balloon: { type: 'dialog' as const, text: '¡Señor, en Ti confío, Tú eres mi roca y mi fortaleza!' }
    },
    {
      title: 'La Manifestación del Poder Divino',
      verse: '¿Hay para Dios alguna cosa difícil?',
      ref: 'Génesis 18:14',
      prompt: `Intervención sobrenatural de Dios en ${topic}. Resplandor celestial.`,
      desc: `Dios demuestra Su soberanía y amor redentor.`,
      char: { name: 'Jesucristo Salvador', role: 'Señor', pose: 'glorious' as const, color: '#EAB308' },
      balloon: { type: 'shout' as const, text: '¡Yo soy el camino, y la verdad, y la vida!' }
    },
    {
      title: 'Victoria y Alabanza Eterna',
      verse: 'Mas gracias sean dadas a Dios, que nos da la victoria por medio de nuestro Señor Jesucristo.',
      ref: '1 Corintios 15:57',
      prompt: `Paz, regocijo y adoración por la victoria en ${topic}.`,
      desc: `Celebración de la fidelidad y salvación de Dios.`,
      char: { name: 'Pueblo de Dios', role: 'Adoradores', pose: 'preaching' as const, color: '#10B981' },
      balloon: { type: 'dialog' as const, text: '¡Alabado sea el Nombre del Señor por los siglos!' }
    },
    {
      title: 'La Promesa Cumplida',
      verse: 'Fiel es el que prometió.',
      ref: 'Hebreos 10:23',
      prompt: `La promesa sellada en los corazones. Amanecer de bendición.`,
      desc: `Confirmación de la alianza divina.`,
      char: { name: 'Testigo Fiel', role: 'Apóstol', pose: 'walking' as const, color: '#8B5CF6' },
      balloon: { type: 'thought' as const, text: 'Su misericordia es nueva cada mañana.' }
    },
    {
      title: 'La Gran Comisión',
      verse: 'Id por todo el mundo y predicad el evangelio.',
      ref: 'Marcos 16:15',
      prompt: `Envío evangelístico y testimonio al mundo.`,
      desc: `Compartir las buenas nuevas de salvación.`,
      char: { name: 'Evangelista', role: 'Mensajero', pose: 'pointing' as const, color: '#EC4899' },
      balloon: { type: 'dialog' as const, text: '¡Vayan y anuncien que Jesucristo vive y salva!' }
    }
  ];

  const selectedPanels = panelTemplates.slice(0, panelCount).map((pt, idx) => ({
    id: `panel-${Date.now()}-${idx + 1}`,
    order: idx + 1,
    title: pt.title,
    scenePrompt: pt.prompt,
    visualDescription: pt.desc,
    biblicalVerse: pt.verse,
    verseReference: pt.ref,
    artPresetId: artStyle || 'classic-oil',
    characters: [
      {
        id: `char-${Date.now()}-${idx}`,
        name: pt.char.name,
        role: pt.char.role,
        pose: pt.char.pose,
        x: 45,
        y: 65,
        scale: 1,
        flipX: false,
        color: pt.char.color
      }
    ],
    balloons: [
      {
        id: `bal-${Date.now()}-${idx}`,
        type: pt.balloon.type,
        text: pt.balloon.text,
        characterSpeaker: pt.char.name,
        x: 50,
        y: 25,
        fontSize: 13,
        tailDirection: 'bottom-left' as const,
        bgColor: '#FFFFFF',
        textColor: '#0F172A'
      }
    ]
  }));

  return {
    title: topic.length > 5 ? topic : `Relato Bíblico: ${passage}`,
    subtitle: `Una travesía visual de fe fundamentada en ${passage}`,
    biblicalTheme: `La soberanía, fidelidad y gracia redentora de Dios en ${passage}`,
    scriptureReference: passage,
    messageOfChrist: `A través de este relato de ${topic}, contemplamos el poder redentor de Jesucristo quien transforma las vidas y nos ofrece salvación eterna.`,
    practicalApplication: `Camina en fe sabiendo que el mismo Dios que obró en ${topic} está contigo hoy en cada batalla.`,
    prayerFocus: `Señor Jesús, gracias por Tu Santa Palabra. Que este cómic ilumine los corazones con Tu verdad y amor salvador.`,
    panels: selectedPanels
  };
}

// Endpoint: AI Devotional & Prayer Reflection
app.post('/api/gemini/devotional', async (req, res) => {
  try {
    const { passage, title } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: title || 'Reflexión en la Palabra',
        passage: passage || 'Las Sagradas Escrituras',
        message: 'Jesucristo es el mismo ayer, hoy y por los siglos (Hebreos 13:8). En cada página de la Escritura vemos Su gracia y Su fidelidad eterna.',
        prayer: 'Señor Jesús, gracias por revelarte a nosotros en Tu Santa Palabra. Que este cómic sea un instrumento para que otros te conozcan como su Salvador personal.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Genera una reflexión devocional profunda centrada en el Evangelio de Jesucristo Salvador basada en "${title}" (${passage}).
Devuelve un JSON con:
{
  "devotionalTitle": "string",
  "scriptureQuote": "string",
  "theologicalMeaning": "string",
  "christologicalConnection": "Cómo este pasaje apunta a Jesús como Salvador y Rey",
  "dailyWalk": "Aplicación para el día a día",
  "prayer": "Oración de entrega y fe"
}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in devotional endpoint:', err);
    return res.status(500).json({ error: 'Error generating devotional' });
  }
});

// Endpoint: Generate or prompt image for biblical scene
app.post('/api/gemini/generate-panel-image', async (req, res) => {
  try {
    const { prompt, styleName, styleModifier, aspectRatio = '1:1' } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key no disponible para generar imágenes',
      });
    }

    const fullPrompt = `Biblical sacred art masterpiece: ${prompt}. Artistic style: ${styleName}. ${styleModifier || ''}. Masterful composition, reverent historical biblically faithful aesthetic, dramatic lighting, high detail.`;

    // Attempt generation with gemini-3.1-flash-lite-image
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: fullPrompt }],
        },
      });

      let foundImage = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            foundImage = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (foundImage) {
        return res.json({ imageUrl: foundImage, fullPrompt });
      } else {
        return res.json({
          message: 'No se obtuvo imagen directa del modelo.',
          fullPrompt,
        });
      }
    } catch (imageErr: any) {
      console.warn('Image generation error or requires paid model flow:', imageErr?.message);
      return res.status(402).json({
        requiresPaidKey: true,
        message: 'La generación directa de imágenes requiere clave con facturación habilitada.',
        fullPrompt,
      });
    }
  } catch (err: any) {
    console.error('Error generating panel image:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Endpoint: Cloud synchronization of comic projects
app.get('/api/projects', (req, res) => {
  return res.json(Object.values(currentProjects));
});

app.get('/api/projects/:id', (req, res) => {
  const project = currentProjects[req.params.id];
  if (project) {
    return res.json(project);
  }
  return res.status(404).json({ error: 'Proyecto no encontrado' });
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  if (currentProjects[id]) {
    delete currentProjects[id];
    return res.json({ success: true, message: 'Proyecto eliminado' });
  }
  return res.status(404).json({ error: 'Proyecto no encontrado' });
});

app.post('/api/projects', (req, res) => {
  const project = req.body;
  if (!project || !project.id) {
    return res.status(400).json({ error: 'Proyecto inválido' });
  }
  project.updatedAt = new Date().toISOString();
  if (project.securityStatus) {
    project.securityStatus.lastCloudBackup = `Sincronizado hoy a las ${new Date().toLocaleTimeString('es-ES')}`;
  }
  currentProjects[project.id] = project;
  return res.json({ success: true, project });
});

// Endpoint: Prayer Wall
app.get('/api/prayers', (req, res) => {
  return res.json(currentPrayers);
});

app.post('/api/prayers', (req, res) => {
  const { authorName, requestText, scriptureAnchor, category } = req.body;
  const newPrayer = {
    id: `pray-${Date.now()}`,
    authorName: authorName || 'Hermano/a en la Fe',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    requestText,
    scriptureAnchor: scriptureAnchor || '1 Tesalonicenses 5:17',
    category: category || 'Fe y Salvación',
    prayersCount: 1,
    userPrayed: true,
    createdAt: 'Justo ahora',
    comments: [],
  };
  currentPrayers.unshift(newPrayer);
  return res.json(newPrayer);
});

app.post('/api/prayers/:id/pray', (req, res) => {
  const prayer = currentPrayers.find((p) => p.id === req.params.id);
  if (prayer) {
    prayer.prayersCount = (prayer.prayersCount || 0) + 1;
    prayer.userPrayed = true;
    return res.json(prayer);
  }
  return res.status(404).json({ error: 'Petición no encontrada' });
});

// Store state
let storeCustomProducts: any[] = [];
let storeOrders: any[] = [];

// Endpoint: Store Products
app.get('/api/store/products', (req, res) => {
  return res.json(storeCustomProducts);
});

app.post('/api/store/publish', (req, res) => {
  const product = req.body;
  if (!product || !product.id) {
    return res.status(400).json({ error: 'Producto inválido' });
  }
  storeCustomProducts.unshift(product);
  return res.json({ success: true, product });
});

app.get('/api/store/orders', (req, res) => {
  return res.json(storeOrders);
});

app.post('/api/store/checkout', (req, res) => {
  const order = req.body;
  if (!order || !order.id) {
    return res.status(400).json({ error: 'Orden inválida' });
  }
  storeOrders.unshift(order);
  return res.json({ success: true, order });
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export { app };
export default app;
