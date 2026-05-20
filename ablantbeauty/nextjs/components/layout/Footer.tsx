import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="font-serif text-lg font-bold mb-3">Ablant<span className="italic">Beauty</span></p>
          <p className="text-sm text-gray-500 leading-relaxed">Premium wigs curated by Vanessa Ablant - quality she wears, styles she loves.</p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wider">Shop</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/shop" className="hover:text-black transition-colors">All Wigs</Link></li>
            <li><Link href="/shop?category=lace-front" className="hover:text-black transition-colors">Lace Front</Link></li>
            <li><Link href="/shop?category=hd-lace" className="hover:text-black transition-colors">HD Lace</Link></li>
            <li><Link href="/shop?category=full-lace" className="hover:text-black transition-colors">Full Lace</Link></li>
            <li><Link href="/shop?on_sale=true" className="hover:text-black transition-colors">Sale</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wider">Help</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping Info</Link></li>
            <li><Link href="/returns" className="hover:text-black transition-colors">Returns and Refunds</Link></li>
            <li><Link href="/care" className="hover:text-black transition-colors">Wig Care Guide</Link></li>
            <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
            <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wider">Account</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/login" className="hover:text-black transition-colors">Sign In</Link></li>
            <li><Link href="/register" className="hover:text-black transition-colors">Create Account</Link></li>
            <li><Link href="/dashboard" className="hover:text-black transition-colors">My Orders</Link></li>
            <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 px-6 py-5 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">2026 AblantBeauty by Vanessa Ablant. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-gray-400">
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/returns" className="hover:text-black transition-colors">Returns Policy</Link>
            <Link href="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link>
            <Link href="/care" className="hover:text-black transition-colors">Wig Care Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
