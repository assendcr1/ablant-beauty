import Link from "next/link";
import { FlashSaleBanner } from "@/components/shop/FlashSaleBanner";

export default function HomePage() {
  return (
    <div>
      <section className="grid md:grid-cols-2 min-h-[500px]">
        <div className="bg-[#f7f6f4] px-12 md:px-16 py-16 flex flex-col justify-center">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-5">
            Vanessa&apos;s Wig Collection
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-2">Your next look</h1>
          <h1 className="font-serif text-5xl md:text-6xl font-bold italic text-gray-600 leading-tight mb-6">starts here</h1>
          <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
            Premium wigs curated by Vanessa Ablant - quality she wears, styles she loves.
          </p>
          <div className="flex gap-3 flex-wrap mb-8">
            <Link href="/shop" className="bg-black text-white px-7 py-3 rounded font-semibold text-sm hover:bg-[#3a3a3a] transition-colors">Shop Wigs</Link>
            <button className="border border-black px-6 py-3 rounded text-sm font-medium hover:bg-black hover:text-white transition-all">Watch Vanessa</button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-black tracking-wider">*****</span>
            <span>4.9 - 8,200 happy customers</span>
          </div>
        </div>
        <div className="bg-[#0a0a0a] flex items-center justify-center relative min-h-[300px]">
          <div className="w-44 h-44 rounded-full bg-[#3a3a3a] border-2 border-white/10 flex items-center justify-center">
            <span className="font-serif text-5xl font-bold text-white">VA</span>
          </div>
          <p className="absolute bottom-20 right-8 text-white/40 text-sm italic font-serif">Vanessa Ablant</p>
          <div className="absolute bottom-8 right-8 bg-white text-black text-xs font-bold px-3 py-2 rounded flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Founder-verified wigs
          </div>
        </div>
      </section>

      <div className="border-b border-gray-100 flex flex-wrap justify-center">
        {[{n:"8,200+",l:"Customers"},{n:"4.9",l:"Avg Rating"},{n:"2.1M",l:"Followers"},{n:"24",l:"Wig Styles"},{n:"98%",l:"Recommend"}].map((s) => (
          <div key={s.l} className="px-10 py-6 text-center border-r border-gray-100 last:border-r-0">
            <span className="font-serif text-2xl font-bold block">{s.n}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.l}</span>
          </div>
        ))}
      </div>

      <FlashSaleBanner />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold">Vanessa&apos;s Wig Picks</h2>
          <Link href="/shop" className="text-sm text-gray-400 hover:text-black transition-colors">See all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {name:"Silky Straight 22 inch",type:"LACE FRONT",price:"R1,680",oldPrice:"R2,400",badge:"Best Seller",stock:"Only 5 left!"},
            {name:"Honey Blonde Bob 14 inch",type:"HD LACE",price:"R1,950",badge:"New Drop",stock:""},
            {name:"Deep Wave 18 inch",type:"FULL LACE",price:"R1,960",oldPrice:"R2,800",badge:"",stock:"Moving fast - 9 left"},
          ].map((p) => (
            <div key={p.name} className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-56 bg-[#f0eee9] flex items-center justify-center relative">
                {p.badge && (
                  <span className={"absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm " + (p.badge === "Best Seller" ? "bg-black text-white" : "bg-white text-black border border-black")}>
                    {p.badge}
                  </span>
                )}
                <svg width="64" height="64" viewBox="0 0 80 80" fill="none" opacity="0.15">
                  <path d="M40 8C26 8 15 19 15 33c0 8 4 15 10 20v14h30V53c6-5 10-12 10-20C65 19 54 8 40 8z" fill="#000"/>
                </svg>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{p.type}</p>
                <p className="font-serif text-lg font-bold mb-1">{p.name}</p>
                <p className="text-xs text-gray-400 mb-3">***** (432)</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {p.oldPrice && <span className="text-xs text-gray-300 line-through">{p.oldPrice}</span>}
                    <span className="font-serif text-xl font-bold">{p.price}</span>
                  </div>
                  <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded">Add</button>
                </div>
                {p.stock && <p className="text-xs font-bold mt-2 text-black">{p.stock}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-[#0a0a0a] text-white rounded-xl p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-shrink-0 flex flex-col items-start gap-3">
            <div className="w-20 h-20 rounded-full bg-[#3a3a3a] border border-white/10 flex items-center justify-center font-serif text-2xl font-bold">VA</div>
            <div>
              <p className="font-semibold text-sm">Vanessa Ablant</p>
              <p className="text-xs text-white/40">@vanessaablant</p>
            </div>
            <div className="flex gap-5 mt-1">
              <div><p className="font-serif text-base font-bold">2.1M</p><p className="text-xs text-white/40 uppercase tracking-wider">Followers</p></div>
              <div><p className="font-serif text-base font-bold">94%</p><p className="text-xs text-white/40 uppercase tracking-wider">Engagement</p></div>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-serif text-2xl italic leading-relaxed mb-5">
              Every wig I sell is one I have personally worn, styled, and absolutely loved.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Silky Straight","HD Lace Bob","Deep Wave","Curly Pixie Cut"].map((t) => (
                <span key={t} className="border border-white/20 text-white/60 text-xs px-4 py-1.5 rounded-full">{t}</span>
              ))}
            </div>
            <button className="bg-white text-black px-6 py-3 rounded font-bold text-sm hover:bg-gray-100 transition-colors">Follow Vanessa</button>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f4] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold">What they&apos;re saying</h2>
            <a href="#" className="text-sm text-gray-400 hover:text-black transition-colors">All reviews</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {text:"The Silky Straight wig looks so natural! Nobody knew it was not my real hair. Worth every rand.",name:"Thandeka M.",initials:"TM",date:"3 days ago"},
              {text:"The HD lace is UNDETECTABLE. I have bought 3 wigs from Vanessa and I will keep coming back!",name:"Zinhle K.",initials:"ZK",date:"1 week ago"},
              {text:"Fast delivery, beautifully packaged. The deep wave wig is everything. 10/10 from me!",name:"Naledi P.",initials:"NP",date:"2 weeks ago"},
            ].map((r) => (
              <div key={r.name} className="bg-white border border-gray-100 rounded-lg p-6 flex flex-col gap-3">
                <p className="text-black tracking-wider text-sm">*****</p>
                <p className="font-serif italic text-sm text-gray-600 leading-relaxed flex-1">{r.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">{r.initials}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-green-600 font-medium">Verified Purchase - {r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
