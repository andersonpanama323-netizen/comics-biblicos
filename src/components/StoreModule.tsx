import React, { useState } from 'react';
import { StoreProduct, StoreCategory, ProductFormat, CartItem, StoreOrder } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Plus, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Download, 
  Tag, 
  ShieldCheck, 
  Check, 
  Heart,
  TrendingUp,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

interface StoreModuleProps {
  products: StoreProduct[];
  cart: CartItem[];
  orders: StoreOrder[];
  onAddToCart: (product: StoreProduct, format: ProductFormat) => void;
  onOpenProductDetail: (product: StoreProduct) => void;
  onOpenPublishModal: () => void;
  onOpenCart: () => void;
}

export const StoreModule: React.FC<StoreModuleProps> = ({
  products,
  cart,
  orders,
  onAddToCart,
  onOpenProductDetail,
  onOpenPublishModal,
  onOpenCart
}) => {
  const [activeCategory, setActiveCategory] = useState<StoreCategory>('all');
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<'all' | ProductFormat>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewTab, setViewTab] = useState<'catalog' | 'orders'>('catalog');

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (selectedFormatFilter !== 'all' && !p.formats.includes(selectedFormatFilter)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchAuthor = p.author.toLowerCase().includes(q);
      const matchVerse = p.scriptureAnchor.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchVerse && !matchDesc) return false;
    }
    return true;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // 'featured'
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Store Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-stone-800 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tienda Oficial & Marketplace Bíblico
            </span>
            <span className="text-xs text-stone-400 font-medium">
              Cupón ministerial: <strong className="text-amber-300">GRACIA2026</strong> (20% OFF)
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-stone-100 font-serif tracking-tight leading-tight">
            Libros, Cómics y Láminas de Arte Sacro para la Gloria de Dios
          </h1>

          <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
            Adquiere comentarios gráficos, novelas ilustradas y paquetes de proyección litográfica en alta resolución (300 DPI) para familias, iglesias y escuelas dominicales.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPublishModal}
              className="py-2 px-4 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Publicar Mi Cómic en la Tienda</span>
            </button>

            <button
              onClick={onOpenCart}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Ver Carrito ({cartTotalItems})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Catálogo vs Mis Compras */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewTab('catalog')}
            className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              viewTab === 'catalog'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Catálogo de Productos ({products.length})
          </button>

          <button
            onClick={() => setViewTab('orders')}
            className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              viewTab === 'orders'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Mis Compras & Descargas ({orders.length})
          </button>
        </div>

        {cartTotalItems > 0 && (
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold hover:bg-amber-500/30 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Carrito: {cartTotalItems} {cartTotalItems === 1 ? 'artículo' : 'artículos'}</span>
          </button>
        )}
      </div>

      {viewTab === 'catalog' ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-3">
            {/* Top row: Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar libro, cómic, versículo o autor..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
                <span className="text-stone-400 text-[11px]">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="featured">Destacados y Populares</option>
                  <option value="price-asc">Menor Precio</option>
                  <option value="price-desc">Mayor Precio</option>
                  <option value="rating">Mejor Valorados</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'books', label: 'Libros Bíblicos' },
                { id: 'comics', label: 'Cómics y Novelas' },
                { id: 'prints', label: 'Láminas & Arte 4K' },
                { id: 'custom', label: 'Publicados por la Comunidad' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeCategory === cat.id
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <div className="h-4 w-px bg-stone-800 mx-1 hidden sm:block" />

              {/* Format Quick Filter */}
              <div className="flex items-center gap-1 text-[11px] text-stone-400">
                <span>Formato:</span>
                <select
                  value={selectedFormatFilter}
                  onChange={(e) => setSelectedFormatFilter(e.target.value as any)}
                  className="bg-stone-950 border border-stone-800 rounded px-2 py-0.5 text-[11px] text-stone-300"
                >
                  <option value="all">Cualquiera</option>
                  <option value="digital">Digital PDF</option>
                  <option value="physical">Físico Impreso</option>
                  <option value="church_license">Licencia Iglesias</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-stone-400 space-y-2 bg-stone-900/40 rounded-2xl border border-stone-800">
              <ShoppingBag className="w-10 h-10 mx-auto opacity-30 text-amber-400" />
              <p className="text-sm font-semibold text-stone-300">No se encontraron productos con estos filtros</p>
              <p className="text-xs text-stone-500">Prueba con otra palabra clave o restablece los filtros de búsqueda.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedFormatFilter('all');
                  setSearchQuery('');
                }}
                className="mt-2 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Cover with Tag */}
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-black">
                      <img
                        src={prod.coverImage}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
                          {prod.category === 'books' && 'Libro'}
                          {prod.category === 'comics' && 'Cómic'}
                          {prod.category === 'prints' && 'Lámina 4K'}
                          {prod.category === 'custom' && 'Comunidad'}
                        </span>
                        {prod.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 shadow">
                            Destacado
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onOpenProductDetail(prod)}
                        className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white border border-stone-700 text-[11px] font-bold flex items-center gap-1 transition backdrop-blur-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Vista Previa</span>
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-stone-400">
                        <span className="font-medium text-amber-400/90">{prod.scriptureAnchor}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="font-bold text-stone-200">{prod.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => onOpenProductDetail(prod)}
                        className="font-bold text-sm text-stone-100 font-serif line-clamp-1 cursor-pointer hover:text-amber-300 transition"
                      >
                        {prod.title}
                      </h3>

                      <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                        {prod.subtitle || prod.description}
                      </p>

                      <div className="text-[10px] text-stone-500 pt-1">
                        Por {prod.author}
                      </div>
                    </div>
                  </div>

                  {/* Footer with Price & Add to cart */}
                  <div className="p-4 pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-amber-400 font-serif">
                          ${prod.price.toFixed(2)}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[11px] text-stone-500 line-through">
                            ${prod.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-stone-400 block">USD</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onAddToCart(prod, prod.formats[0] || 'digital')}
                        className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition flex items-center gap-1 shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Orders & Downloads View */
        <div className="space-y-4">
          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
            <h3 className="font-bold text-stone-200 text-sm font-serif">
              Tus Compras y Descargas Inmediatas ({orders.length})
            </h3>
            <p className="text-xs text-stone-400">
              Todos los cómics digitales, libros PDF y láminas de arte adquiridos están disponibles para descarga permanente a 300 DPI.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-stone-400 bg-stone-900/30 rounded-2xl border border-stone-800 space-y-2">
              <Download className="w-10 h-10 mx-auto opacity-30 text-amber-400" />
              <p className="text-sm">Aún no has realizado ninguna compra.</p>
              <button
                onClick={() => setViewTab('catalog')}
                className="mt-2 px-4 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow"
              >
                Explorar Catálogo de Cómics y Libros
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-800">
                    <div>
                      <span className="font-bold text-stone-200">Orden #{ord.id}</span>
                      <span className="text-stone-400 text-[11px] ml-2">({ord.createdAt})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/40">
                        Pago Confirmado
                      </span>
                      <span className="font-bold text-amber-400 text-sm">
                        ${ord.total.toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  {/* Downloadable items list */}
                  <div className="space-y-2">
                    <p className="font-bold text-stone-300 text-[11px]">Archivos Digitales Disponibles:</p>
                    {ord.downloadLinks.map((dl, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-stone-950 border border-stone-800/80 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-stone-200">{dl.title}</p>
                          <p className="text-[10px] text-stone-400">{dl.format} • {dl.fileSize}</p>
                        </div>
                        <button
                          onClick={() => alert(`Descargando archivo digital: ${dl.filename}`)}
                          className="py-1 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold rounded-lg text-xs flex items-center gap-1 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
