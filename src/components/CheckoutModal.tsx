import React, { useState } from 'react';
import { CartItem, StoreOrder } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  Download, 
  Printer, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  ChevronRight,
  FileText
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  onCompleteOrder: (order: StoreOrder) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  total,
  couponCode,
  onCompleteOrder,
  onClearCart
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [customerName, setCustomerName] = useState('Hermano Anderson P.');
  const [customerEmail, setCustomerEmail] = useState('andersonpanama323@gmail.com');
  const [shippingAddress, setShippingAddress] = useState('Av. Central, Edificio Gracia #4, Panamá');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'transfer' | 'church_donation'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('742');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<StoreOrder | null>(null);

  if (!isOpen) return null;

  const hasPhysical = cart.some((i) => i.format === 'physical' || i.format === 'bundle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const downloadLinks = cart.map((item) => ({
        title: item.product.title,
        format: item.format === 'church_license' ? 'Licencia Eclesial (ZIP 4K + Slides)' : 'Digital PDF HD (300 DPI)',
        fileSize: item.product.digitalFileSize || '75 MB',
        filename: `${item.product.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_edicion_digital.pdf`
      }));

      const newOrder: StoreOrder = {
        id: orderId,
        items: [...cart],
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        shippingAddress: hasPhysical ? shippingAddress.trim() : undefined,
        subtotal,
        discount,
        total,
        couponCode,
        paymentMethod,
        createdAt: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'completed',
        downloadLinks
      };

      setCompletedOrder(newOrder);
      onCompleteOrder(newOrder);
      onClearCart();
      setIsProcessing(false);
      setStep('success');

      // Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti error', err);
      }
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif">
                {step === 'form' ? 'Finalizar Compra Segura' : '¡Pedido Confirmado con Éxito!'}
              </h3>
              <p className="text-xs text-stone-400">
                {step === 'form' 
                  ? 'Cifrado de 256 bits y entrega inmediata de archivos digitales' 
                  : `Referencia de orden: ${completedOrder?.id}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Order Summary Pill */}
              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-stone-400">Artículos ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <p className="font-bold text-stone-200 text-sm">Total a Pagar: ${total.toFixed(2)} USD</p>
                </div>
                {discount > 0 && (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold border border-emerald-500/30 text-[11px]">
                    Ahorraste ${discount.toFixed(2)} USD
                  </span>
                )}
              </div>

              {/* Personal Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-300 uppercase tracking-wider text-[11px]">
                  1. Datos del Comprador
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-400 block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Correo Electrónico (para descargas)</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {hasPhysical && (
                  <div>
                    <label className="text-stone-400 block mb-1">Dirección de Envío (Edición Física)</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Calle, número, ciudad, código postal, país"
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <h4 className="font-bold text-stone-300 uppercase tracking-wider text-[11px]">
                  2. Método de Pago Seguro
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'card', label: 'Tarjeta de Crédito', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal Checkout', icon: ShieldCheck },
                    { id: 'transfer', label: 'Transferencia / Bizum', icon: FileText },
                    { id: 'church_donation', label: 'Donación Ministerial', icon: Heart }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                          paymentMethod === m.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] leading-tight">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-2.5">
                    <div>
                      <label className="text-[11px] text-stone-400 block mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-stone-400 block mb-1">Vencimiento</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-400 block mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'church_donation' && (
                  <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-amber-200/90 text-[11px]">
                    <p className="font-semibold mb-1">Apoyo Ministerial y Distribución Bíblica</p>
                    <p className="text-stone-300">
                      Tu contribución se destina 100% a la impresión y traducción de cómics bíblicos para escuelas dominicales y misiones. Se emitirá certificado de donación.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm rounded-xl shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-stone-950" />
                  <span>
                    {isProcessing ? 'Procesando Pago Seguro...' : `Confirmar y Pagar $${total.toFixed(2)} USD`}
                  </span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Transacción encriptada con garantía de satisfacción y fe cristiana</span>
                </div>
              </div>
            </form>
          ) : (
            /* Order Success View */
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-stone-100 font-serif">
                  ¡Gracias por tu compra, {completedOrder?.customerName}!
                </h4>
                <p className="text-stone-400 text-xs mt-1">
                  Hemos enviado la confirmación y recibo a <span className="text-amber-300 font-medium">{completedOrder?.customerEmail}</span>.
                </p>
              </div>

              {/* Download Links Box */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="font-bold text-stone-200 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-amber-400" />
                    Tus Descargas Digitales Inmediatas (Alta Resolución 300 DPI):
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Listas para Descargar</span>
                </div>

                <div className="space-y-2">
                  {completedOrder?.downloadLinks.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-stone-200">{item.title}</p>
                        <p className="text-[10px] text-stone-400">
                          {item.format} • {item.fileSize}
                        </p>
                      </div>

                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Descargando archivo digital: ${item.filename}`);
                        }}
                        className="py-1 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Descargar
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devotional blessing */}
              <div className="p-3 bg-stone-950/70 border border-amber-500/20 rounded-xl text-[11px] text-amber-200/90 font-serif italic">
                «Que este material ilustrado sea de gran bendición para tu vida, ministerio y familia. "La exposición de tus palabras alumbra; hace entender a los simples" — Salmos 119:130»
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="py-2 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-300" />
                  Imprimir Recibo
                </button>
                <button
                  onClick={onClose}
                  className="py-2 px-6 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-bold transition shadow-lg"
                >
                  Continuar Explorando la Tienda
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
