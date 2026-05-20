"use client";
import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props { open: boolean; onClose: () => void; }

const SUGGESTIONS = ["Lace Front","HD Lace","Deep Wave","Blonde Bob","Silky Straight","Curly Pixie"];

export function SearchBar({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    router.push("/shop?search=" + encodeURIComponent(q.trim()));
    onClose();
  };

  return (
    <>
      <div onClick={onClose} className={"fixed inset-0 top-[130px] z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-200 " + (open ? "opacity-100" : "opacity-0 pointer-events-none")} />
      <div className={"fixed left-0 right-0 top-[88px] z-40 bg-white border-b border-gray-200 shadow-lg transition-all duration-200 ease-out " + (open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none")}>
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 border-2 border-black rounded-xl px-4 py-3">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input ref={inputRef} type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              placeholder="Search wigs, styles, lengths..."
              className="flex-1 text-sm outline-none bg-transparent" />
            {query && <button onClick={() => setQuery("")} className="text-gray-400 hover:text-black"><X size={16} /></button>}
            <button onClick={() => handleSearch(query)} disabled={!query.trim()}
              className="bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 flex items-center gap-1">
              Search <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pb-1">
            <span className="text-xs text-gray-400 font-medium mr-1 self-center">Popular:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => handleSearch(s)}
                className="text-xs border border-gray-200 px-3 py-1.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
