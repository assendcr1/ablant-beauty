'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import toast from 'react-hot-toast';

interface WCProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: { src: string; alt: string }[];
  stock_quantity: number;
  stock_status: string;
  on_sale: boolean;
  featured: boolean;
  short_description: string;
  meta_data: { key: string; value: string }[];
  categories: { name: string }[];
  average_rating: string;
  rating_count: number;
}

function getMeta(product: WCProduct, key: string) {
  return product.meta_data?.find((m) => m.key === key)?.value ?? '';
}

export function ProductCard({ product }: { product: WCProduct }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.regular_price),
      salePrice: product.sale_price ? parseFloat(product.sale_price) : undefined,
      image: product.images[0]?.src,
      slug: product.slug,
    });
    toast.success(`${product.name} added to cart`);
  };

  const isLow = product.stock_quantity !== null && product.stock_quantity <= 10;
  const wigType = getMeta(product, '_wig_type') || product.categories[0]?.name || '';

  return (
    <div className="card group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative h-56 bg-[#f0eee9] overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg width="64" height="64" viewBox="0 0 80 80" fill="none" opacity="0.15">
                <path d="M40 8C26 8 15 19 15 33c0 8 4 15 10 20v14h30V53c6-5 10-12 10-20C65 19 54 8 40 8z" fill="#000"/>
              </svg>
            </div>
          )}

          {product.featured && (
            <span className="absolute top-3 left-3 badge badge-black">Best Seller</span>
          )}
          {product.on_sale && !product.featured && (
            <span className="absolute top-3 left-3 badge badge-outline">Sale</span>
          )}

          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart size={14} />
          </button>
        </div>
      </Link>

      <div className="p-4">
        {wigType && (
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{wigType}</p>
        )}
        <Link href={`/shop/${product.slug}`}>
          <p className="font-serif text-lg font-bold mb-1 hover:underline">{product.name}</p>
        </Link>
        <p className="text-xs text-gray-400 mb-3">
          {'★'.repeat(Math.round(parseFloat(product.average_rating)))}
          {'☆'.repeat(5 - Math.round(parseFloat(product.average_rating)))}
          {' '}
          <span className="text-gray-300">({product.rating_count})</span>
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {product.sale_price && (
              <span className="text-xs text-gray-300 line-through">
                R{parseFloat(product.regular_price).toLocaleString()}
              </span>
            )}
            <span className="font-serif text-xl font-bold">
              R{parseFloat(product.price).toLocaleString()}
            </span>
          </div>
          <button onClick={handleAdd} className="btn-primary flex items-center gap-1.5 py-2 px-4 text-xs">
            <ShoppingBag size={13} /> Add
          </button>
        </div>

        {isLow && product.stock_quantity > 0 && (
          <p className="text-xs font-bold mt-2 text-black">Only {product.stock_quantity} left!</p>
        )}
      </div>
    </div>
  );
}
