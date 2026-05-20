"use client";
import { useCartStore } from "@/lib/cart-store";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface Props { open: boolean; onClose: () => void; }

export function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const subtotal = total();
  const shipping = subtotal >= 800 ? 0 : 80;

  return (
    <>
      <div onClick={onClose} className={"fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 " + (open ? "opacity-100" : "opacity-0 pointer-events-none")} />
      <div className={"fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out " + (open ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2 className="font-serif text-lg font-bold">Your Cart</h2>
            {items.length > 0 && <span className="bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{items.reduce((s,i) => s+i.quantity, 0)}</span>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="font-serif text-xl text-gray-400">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some wigs to get started</p>
              <Link href="/shop" onClick={onClose} className="mt-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold">Browse Wigs</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-20 h-20 bg-[#f0eee9] rounded-lg flex items-center justify-center shrink-0">
                    <svg width="32" height="32" viewBox="0 0 80 80" fill="none" opacity="0.2"><path d="M40 8C26 8 15 19 15 33c0 8 4 15 10 20v14h30V53c6-5 10-12 10-20C65 19 54 8 40 8z" fill="#000"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-sm leading-tight mb-1 truncate">{item.name}</p>
                    <p className="font-bold text-sm mb-3">R{((item.salePrice ?? item.price) * item.quantity).toLocaleString()}</p>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-full w-fit px-3 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-black transition-colors"><Minus size={12} /></button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={12} /></button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1"><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-white">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="font-semibold text-black">R{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={"font-semibold " + (shipping === 0 ? "text-green-600" : "text-black")}>{shipping === 0 ? "FREE" : "R" + shipping}</span></div>
              {shipping > 0 && <p className="text-xs text-gray-400">Add R{(800 - subtotal).toLocaleString()} more for free shipping</p>}
            </div>
            <div className="flex justify-between font-serif font-bold text-lg border-t border-gray-100 pt-3"><span>Total</span><span>R{(subtotal + shipping).toLocaleString()}</span></div>
            <Link href="/checkout" onClick={onClose} className="block w-full bg-black text-white text-center py-3.5 rounded-lg font-semibold text-sm hover:bg-[#3a3a3a] transition-colors">Checkout</Link>
            <button onClick={clearCart} className="w-full text-xs text-gray-400 hover:text-black transition-colors">Clear cart</button>
          </div>
        )}
      </div>
    </>
  );
}
