import React, { useState } from 'react';
import { CartItem, ProductFormat } from '../types';
import { STORE_DISCOUNT_COUPONS } from '../data/defaultStoreData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onOpenCheckout: (subtotal: number, discount: number, total: number, couponCode?: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onClearCart
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number; desc: string } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.percent) / 100 : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    const found = STORE_DISCOUNT_COUPONS[code];

    if (found) {
      setAppliedCoupon({ code, percent: found.discountPercent, desc: found.description });
      setCouponInput('');
    } else {
      setCouponError('Cupón no válido. Prueba con GRACIA2026 o EVANGELIO.');
    }
  };

  const getFormatLabel = (fmt: ProductFormat) => {
    switch (fmt) {
      case 'digital': return 'Digital PDF HD (Descarga Inmediata)';
      case 'physical': return 'Edición Impresa (Envío Postal)';
      case 'bundle': return 'Combo Físico + Digital';
      case 'church_license': return 'Licencia Eclesial (Uso en Pantallas y Cultos)';
      default: return fmt;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 font-serif">
                Carrito de Compras ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
              <p className="text-[10px] text-stone-400">
                Libros, cómics bíblicos y arte sacro
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

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-stone-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto opacity-30 text-amber-400" />
              <p className="text-sm font-medium">Tu carrito está vacío</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explora el catálogo de libros bíblicos, cómics y láminas de arte sacro para añadir artículos.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl flex gap-3 text-xs"
              >
                <img
                  src={item.product.coverImage}
                  alt={item.product.title}
                  className="w-16 h-20 object-cover rounded-lg border border-stone-800 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-stone-200 line-clamp-1 text-xs">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-500 hover:text-rose-400 transition p-0.5"
                        title="Eliminar del carrito"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[10px] text-amber-400 font-medium line-clamp-1 mt-0.5">
                      {getFormatLabel(item.format)}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {item.product.author}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-800/80">
                    <span className="font-bold text-stone-200 text-xs">
                      ${(item.product.price * item.quantity).toFixed(2)} USD
                    </span>

                    <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-stone-400 hover:text-stone-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-[11px] px-1 text-stone-200">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-stone-400 hover:text-stone-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal, Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-stone-800 bg-stone-950/90 space-y-3 text-xs">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Cupón (ej. GRACIA2026)"
                  className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 uppercase placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-bold text-xs transition"
                >
                  Aplicar
                </button>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> {appliedCoupon.desc} (-{appliedCoupon.percent}%)
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-stone-400 hover:text-stone-200 underline text-[10px]"
                  >
                    Quitar
                  </button>
                </div>
              )}
              {couponError && <p className="text-[10px] text-rose-400">{couponError}</p>}
            </form>

            {/* Calculations */}
            <div className="space-y-1 pt-2 border-t border-stone-800/80 text-stone-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)} USD</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Descuento Ministerial ({appliedCoupon?.code})</span>
                  <span>-${discount.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-stone-100 pt-1 border-t border-stone-800">
                <span>Total a Pagar</span>
                <span className="text-amber-400">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout(subtotal, discount, total, appliedCoupon?.code);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Proceder al Pago Seguro</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
