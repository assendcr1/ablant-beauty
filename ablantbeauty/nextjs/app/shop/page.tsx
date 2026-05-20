import { getProducts, getCategories } from '@/lib/woocommerce';
import { ProductCard } from '@/components/shop/ProductCard';
import Link from 'next/link';

export const metadata = { title: 'Shop All Wigs' };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; search?: string; on_sale?: string };
}) {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    [products, categories] = await Promise.all([
      getProducts({
        per_page: 12,
        page: Number(searchParams.page) || 1,
        category: searchParams.category,
        on_sale: searchParams.on_sale === 'true' ? true : undefined,
        search: searchParams.search,
        orderby: 'popularity',
      }),
      getCategories(),
    ]);
  } catch {
    // WooCommerce not configured yet
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold mb-2">
          {searchParams.category
            ? categories.find((c: any) => c.slug === searchParams.category)?.name || 'Wigs'
            : 'All Wigs'}
        </h1>
        <p className="text-gray-500">{products.length} styles available</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-48 flex-shrink-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-4">Category</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/shop"
                className={`block py-1 hover:text-black transition-colors ${!searchParams.category ? 'font-bold text-black' : 'text-gray-500'}`}
              >
                All Wigs
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className={`block py-1 hover:text-black transition-colors ${
                    searchParams.category === cat.slug ? 'font-bold text-black' : 'text-gray-500'
                  }`}
                >
                  {cat.name} <span className="text-gray-300 text-xs">({cat.count})</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-4">Filter</p>
            <Link
              href="/shop?on_sale=true"
              className={`block py-1 text-sm hover:text-black transition-colors ${
                searchParams.on_sale === 'true' ? 'font-bold text-black' : 'text-gray-500'
              }`}
            >
              On Sale
            </Link>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="font-serif text-2xl mb-2">No products found</p>
              <p className="text-sm">
                {products.length === 0
                  ? 'WooCommerce is setting up — check back in a moment.'
                  : 'Try a different filter.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
