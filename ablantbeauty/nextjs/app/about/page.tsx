export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-4">Our Story</p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6">Born from a love of beautiful hair</h1>
          <p className="text-gray-600 leading-relaxed mb-4">AblantBeauty was founded by Vanessa Ablant after years of struggling to find high-quality wigs that looked natural, lasted long, and felt comfortable. Every wig she tried either fell short on quality or came with an outrageous price tag.</p>
          <p className="text-gray-600 leading-relaxed mb-4">So she sourced them herself. Today, every wig in the AblantBeauty collection is one Vanessa has personally worn, tested, and approved - because she refuses to sell anything she would not wear herself.</p>
          <p className="text-gray-600 leading-relaxed">What started as a personal mission has grown into a community of over 8,200 customers across South Africa who trust AblantBeauty for quality, consistency, and style.</p>
        </div>
        <div className="bg-[#0a0a0a] rounded-2xl h-80 flex items-center justify-center relative overflow-hidden">
          <div className="w-36 h-36 rounded-full bg-[#3a3a3a] flex items-center justify-center font-serif text-5xl font-bold text-white">VA</div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-white/40 text-sm italic font-serif">Vanessa Ablant, Founder</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[{n:"2019",l:"Founded"},{n:"8,200+",l:"Happy Customers"},{n:"24",l:"Wig Styles"},{n:"98%",l:"Would Recommend"}].map((s) => (
          <div key={s.l} className="bg-[#f7f6f4] rounded-xl p-6 text-center">
            <p className="font-serif text-3xl font-bold mb-1">{s.n}</p>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mb-20">
        <h2 className="font-serif text-3xl font-bold mb-8 text-center">What we stand for</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title:"Quality First",desc:"Every wig is 100% human hair, rigorously tested before it reaches you. No shortcuts, no compromises."},
            {title:"Founder-Verified",desc:"Vanessa personally wears and approves every style. If it does not meet her standards, it does not make the cut."},
            {title:"Community Driven",desc:"With 2.1M followers and counting, our community shapes our collection. We listen, we adapt, we deliver."},
          ].map((v) => (
            <div key={v.title} className="border border-gray-100 rounded-xl p-6">
              <div className="w-10 h-10 bg-black rounded-lg mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0a0a0a] text-white rounded-2xl p-12 text-center">
        <h2 className="font-serif text-3xl font-bold mb-3">Ready for your next look?</h2>
        <p className="text-white/60 mb-6 text-sm">Browse Vanessa&apos;s curated collection of premium wigs.</p>
        <a href="/shop" className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">Shop Now</a>
      </div>
    </div>
  );
}
