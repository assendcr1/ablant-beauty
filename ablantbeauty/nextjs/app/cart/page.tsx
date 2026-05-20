'use client';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-200" />
        <h1 className="font-serif text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some wigs to get started</p>
        <Link href="/shop" className="btn-primary inline-flex">Browse Wigs</Link>
      </div>
    );
  }

  const subtotal = total();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border border-gray-100 rounded-lg p-4">
              <div className="w-20 h-20 bg-[#f0eee9] rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover" />
                ) : (
                  <svg width="32" height="32" viewBox="0 0 80 80" fill="none" opacity="0.2">
                    <path d="M40 8C26 8 15 19 15 33c0 8 4 15 10 20v14h30V53c6-5 10-12 10-20C65 19 54 8 40 8z" fill="#000"/>
                  </svg>
                )}
              </div>

              <div className="flex-1">
                <p className="font-serif font-bold">{item.name}</p>
                <p className="font-serif text-lg font-bold mt-1">
                  R{((item.salePrice ?? item.price) * item.quantity).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={15} />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-black transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-black transition-colors">
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-72 bg-[#f7f6f4] rounded-xl p-6 h-fit">
          <h2 className="font-serif text-lg font-bold mb-5">Order Summary</h2>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">R{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-semibold">{subtotal >= 800 ? 'FREE' : 'R80'}</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between font-serif font-bold text-lg">
            <span>Total</span>
            <span>R{(subtotal + (subtotal >= 800 ? 0 : 80)).toLocaleString()}</span>
          </div>
          <Link href="/checkout" className="btn-primary w-full flex justify-center">
            Proceed to Checkout
          </Link>
          <button onClick={clearCart} className="w-full text-xs text-gray-400 hover:text-black mt-3 transition-colors">
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
