"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchBar } from "@/components/ui/SearchBar";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const { data: session } = useSession();
  const count = useCartStore((s) => s.count());
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isAdmin = (session?.user as any)?.roles?.includes("administrator");

  return (
    <>
      <div className="bg-[#0a0a0a] text-white text-center text-xs font-semibold tracking-widest uppercase py-2.5 px-4 flex justify-center gap-8 flex-wrap">
        <span>Free Shipping Over R800</span>
        <span>30-Day Returns</span>
        <span>As Seen On @VanessaAblant</span>
      </div>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

      <nav className={"bg-white border-b border-gray-100 sticky top-0 z-40 transition-shadow " + (scrolled ? "shadow-sm" : "")}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight shrink-0">
            Ablant<span className="italic">Beauty</span>
          </Link>

          <ul className="hidden md:flex gap-1">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <li key={l.href}>
                  <Link href={l.href} className={"relative px-4 py-2 text-sm font-medium rounded-md transition-colors inline-block " + (active ? "text-black" : "text-gray-500 hover:text-black hover:bg-gray-50")}>
                    {l.label}
                    {active && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-black rounded-full" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
              <Search size={18} />
            </button>

            {session ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors">
                  <User size={16} /><span>{session.user?.name?.split(" ")[0]}</span>
                </button>
                <div className="absolute right-0 top-11 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link href="/dashboard" className="block px-4 py-2.5 text-sm hover:bg-gray-50 rounded-lg mx-1">My Orders</Link>
                  <Link href="/dashboard/account" className="block px-4 py-2.5 text-sm hover:bg-gray-50 rounded-lg mx-1">Account</Link>
                  {isAdmin && (<><div className="border-t border-gray-100 my-1" /><a href="http://localhost:8080/wp-admin" target="_blank" className="block px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 rounded-lg mx-1">WP Admin</a></>)}
                  <div className="border-t border-gray-100 my-1" />
                  <button onClick={() => signOut()} className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50 rounded-lg mx-1">Sign Out</button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors">
                <User size={16} /> Sign In
              </Link>
            )}

            <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 bg-[#0a0a0a] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#3a3a3a] transition-colors ml-1">
              <ShoppingBag size={16} />
              <span>Cart</span>
              {count > 0 && <span className="bg-white text-black w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">{count}</span>}
            </button>

            <button className="md:hidden p-2 ml-1" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return <Link key={l.href} href={l.href} className={"py-2.5 px-3 text-sm font-medium rounded-lg " + (active ? "bg-gray-100 text-black font-semibold" : "text-gray-600")}>{l.label}</Link>;
            })}
            <div className="border-t border-gray-100 mt-2 pt-2">
              {session ? (
                <><Link href="/dashboard" className="block py-2.5 px-3 text-sm text-gray-600">My Orders</Link><button onClick={() => signOut()} className="block py-2.5 px-3 text-sm text-red-500">Sign Out</button></>
              ) : (
                <Link href="/login" className="block py-2.5 px-3 text-sm text-gray-600">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
