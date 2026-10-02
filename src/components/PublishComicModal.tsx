import React, { useState } from 'react';
import { ComicProject, StoreProduct, ProductFormat } from '../types';
import { X, BookOpen, Sparkles, Tag, DollarSign, Check, FileText } from 'lucide-react';

interface PublishComicModalProps {
  isOpen: boolean;
  onClose: () => void;
  userComics: ComicProject[];
  currentProjectId?: string;
  onPublishProduct: (product: StoreProduct) => void;
}

export const PublishComicModal: React.FC<PublishComicModalProps> = ({
  isOpen,
  onClose,
  userComics,
  currentProjectId,
  onPublishProduct
}) => {
  const [selectedComicId, setSelectedComicId] = useState<string>(
    currentProjectId || userComics[0]?.id || ''
  );
  const [price, setPrice] = useState<number>(7.99);
  const [authorName, setAuthorName] = useState('Creador Cristiano');
  const [formatDigital, setFormatDigital] = useState(true);
  const [formatPhysical, setFormatPhysical] = useState(true);
  const [description, setDescription] = useState(
    'Una hermosa adaptación ilustrada de las Sagradas Escrituras diseñada en la plataforma Cómics Bíblicos.'
  );

  if (!isOpen) return null;

  const selectedComic = userComics.find((c) => c.id === selectedComicId) || userComics[0];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComic) return;

    const formats: ProductFormat[] = [];
    if (formatDigital) formats.push('digital');
    if (formatPhysical) formats.push('physical');
    if (formats.length === 0) formats.push('digital');

    const newProduct: StoreProduct = {
      id: `custom-prod-${Date.now()}`,
      title: selectedComic.title,
      subtitle: selectedComic.subtitle || `Relato ilustrado de ${selectedComic.scriptureReference}`,
      category: 'custom',
      author: authorName.trim() || 'Autor de la Comunidad',
      description: description.trim(),
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80',
      samplePages: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=80'
      ],
      price: price > 0 ? price : 0,
      originalPrice: price > 0 ? Number((price * 1.3).toFixed(2)) : undefined,
      formats,
      rating: 5.0,
      reviewsCount: 1,
      featured: true,
      pagesCount: selectedComic.panels.length,
      scriptureAnchor: selectedComic.scriptureReference,
      theologicalTag: selectedComic.biblicalTheme,
      digitalFileSize: `${(selectedComic.panels.length * 8.5).toFixed(1)} MB (PDF Cómic HD 300 DPI)`,
      isUserCreated: true,
      comicProjectId: selectedComic.id
    };

    onPublishProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 font-serif">
                Publicar Cómic en la Tienda
              </h3>
              <p className="text-[11px] text-stone-400">
                Pon a disposición de la comunidad cristiana tu cómic en formato digital o físico
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handlePublish} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-300 block mb-1">
              Selecciona el Cómic a Publicar
            </label>
            <select
              value={selectedComicId}
              onChange={(e) => setSelectedComicId(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
            >
              {userComics.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.panels.length} viñetas - {c.scriptureReference})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-stone-300 block mb-1">
                Nombre del Autor / Ministerio
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ej. Taller Gráfico de Fe"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-300 block mb-1">
                Precio Sugerido ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                placeholder="7.99 (0 para gratis)"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-stone-400">Introduce 0 para distribución gratuita</span>
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-300 block mb-1.5">
              Formatos de Entrega Disponibles
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-stone-200">
                <input
                  type="checkbox"
                  checked={formatDigital}
                  onChange={(e) => setFormatDigital(e.target.checked)}
                  className="rounded border-stone-700 text-amber-500 focus:ring-amber-500 bg-stone-950"
                />
                <span>Digital PDF / EPUB HD</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-200">
                <input
                  type="checkbox"
                  checked={formatPhysical}
                  onChange={(e) => setFormatPhysical(e.target.checked)}
                  className="rounded border-stone-700 text-amber-500 focus:ring-amber-500 bg-stone-950"
                />
                <span>Impresión Bajo Demanda</span>
              </label>
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-300 block mb-1">
              Descripción Comercial y Doctrinal
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-[11px] text-amber-300/90 flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p>
              Tu cómic se añadirá al catálogo de la tienda con opción de vista previa interactiva, código de descarga directa y ficha técnica.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold rounded-xl shadow-lg transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Publicar en la Tienda</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
