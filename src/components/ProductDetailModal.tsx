import React, { useState } from 'react';
import { StoreProduct, ProductFormat } from '../types';
import { 
  X, 
  Star, 
  BookOpen, 
  Download, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  FileText,
  Sparkles
} from 'lucide-react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: StoreProduct | null;
  onAddToCart: (product: StoreProduct, format: ProductFormat) => void;
  onBuyNow: (product: StoreProduct, format: ProductFormat) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onBuyNow
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat>('digital');
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [viewingSampleReader, setViewingSampleReader] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const currentFormat = product.formats.includes(selectedFormat) 
    ? selectedFormat 
    : product.formats[0] || 'digital';

  const formatLabels: Record<ProductFormat, { title: string; desc: string; icon: string }> = {
    digital: { title: 'Digital PDF HD', desc: 'Descarga inmediata a 300 DPI vectorial', icon: '📄' },
    physical: { title: 'Edición Impresa', desc: 'Tapa blanda/dura con envío a domicilio', icon: '📦' },
    bundle: { title: 'Combo Físico + Digital', desc: 'El libro físico + archivo digital HD', icon: '🎁' },
    church_license: { title: 'Licencia para Iglesias', desc: 'Proyección en pantallas de culto y diapositivas', icon: '⛪' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {product.category === 'books' && 'Libro Bíblico'}
              {product.category === 'comics' && 'Cómic Sacro'}
              {product.category === 'prints' && 'Lámina / Arte 4K'}
              {product.category === 'custom' && 'Creación de Usuario'}
            </span>
            <span className="text-xs text-stone-400 font-serif italic">
              {product.scriptureAnchor}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
          {viewingSampleReader ? (
            /* Interactive Sample Reader View */
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <span className="font-bold text-stone-200 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-400" />
                  Visor de Muestra: {product.title} (Página {activePageIndex + 1} de {product.samplePages.length})
                </span>
                <button
                  onClick={() => setViewingSampleReader(false)}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold"
                >
                  Volver a Detalles
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-black flex items-center justify-center min-h-[360px] max-h-[500px]">
                <img
                  src={product.samplePages[activePageIndex] || product.coverImage}
                  alt={`Página ${activePageIndex + 1}`}
                  className="max-h-[480px] w-auto object-contain mx-auto transition-all"
                />

                {product.samplePages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePageIndex((prev) => (prev > 0 ? prev - 1 : product.samplePages.length - 1))}
                      className="absolute left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-stone-700 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivePageIndex((prev) => (prev < product.samplePages.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-stone-700 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              <div className="flex justify-center gap-2 pt-1">
                {product.samplePages.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePageIndex(idx)}
                    className={`w-14 h-16 rounded-md overflow-hidden border-2 transition ${
                      activePageIndex === idx ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60'
                    }`}
                  >
                    <img src={page} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Main Product Presentation */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Product Cover and Preview Thumbnails (Left col) */}
              <div className="md:col-span-5 space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-black group shadow-xl">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-72 object-cover transition duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() => setViewingSampleReader(true)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-bold text-xs transition backdrop-blur-xs"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Hojear Páginas de Muestra</span>
                  </button>
                </div>

                {product.samplePages && product.samplePages.length > 0 && (
                  <button
                    onClick={() => setViewingSampleReader(true)}
                    className="w-full py-2 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ver Muestra Interior ({product.samplePages.length} páginas)</span>
                  </button>
                )}
              </div>

              {/* Product Info & Action Controls (Right col) */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400 font-semibold">
                      {product.rating} ({product.reviewsCount} reseñas de creyentes)
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-stone-100 font-serif leading-tight">
                    {product.title}
                  </h2>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">
                    {product.subtitle}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Por <span className="text-stone-300 font-medium">{product.author}</span>
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">Precio especial</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-amber-400 font-serif">
                        ${product.price.toFixed(2)} USD
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-500 line-through">
                          ${product.originalPrice.toFixed(2)} USD
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-bold block">Entrega Inmediata</span>
                    <span className="text-[10px] text-stone-400">Fidelidad bíblica garantizada</span>
                  </div>
                </div>

                {/* Format Selector */}
                <div>
                  <label className="font-bold text-stone-300 block mb-1.5 text-xs">
                    Selecciona el Formato Deseado:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.formats.map((fmt) => {
                      const info = formatLabels[fmt];
                      const isSel = currentFormat === fmt;
                      return (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setSelectedFormat(fmt)}
                          className={`p-2.5 rounded-xl border text-left transition ${
                            isSel
                              ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-bold text-xs text-stone-200">{info.title}</span>
                            {isSel && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <p className="text-[10px] text-stone-400 leading-tight">{info.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-stone-300 mb-1">Descripción</h4>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    {product.description}
                  </p>
                </div>

                {/* Specs / Meta */}
                <div className="pt-2 border-t border-stone-800 grid grid-cols-2 gap-2 text-[10px] text-stone-400">
                  {product.pagesCount && (
                    <div>
                      <span className="text-stone-500">Extensión:</span> {product.pagesCount} páginas
                    </div>
                  )}
                  {product.isbn && (
                    <div>
                      <span className="text-stone-500">ISBN:</span> {product.isbn}
                    </div>
                  )}
                  {product.digitalFileSize && (
                    <div className="col-span-2">
                      <span className="text-stone-500">Tamaño Digital:</span> {product.digitalFileSize}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={() => {
                      onAddToCart(product, currentFormat);
                      onClose();
                    }}
                    className="w-full sm:flex-1 py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold rounded-xl border border-stone-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-400" />
                    <span>Añadir al Carrito</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, currentFormat);
                      onClose();
                    }}
                    className="w-full sm:flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <span>Comprar Ahora</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
