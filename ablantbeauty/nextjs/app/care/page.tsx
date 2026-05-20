export default function CareGuidePage() {
  const sections = [
    {title:"Washing Your Wig",freq:"Every 10-15 wears",steps:["Detangle gently with a wide-tooth comb before washing, working from ends to roots.","Fill a basin with cool or lukewarm water - never hot water as this damages the hair cuticle.","Add sulphate-free shampoo and gently swirl the wig. Do not scrub or rub.","Rinse thoroughly with cool water until all shampoo is removed.","Apply moisturising conditioner from mid-length to ends. Avoid the roots and lace.","Leave conditioner on for 5-10 minutes then rinse with cool water.","Gently squeeze out excess water with a clean towel. Never wring or twist."]},
    {title:"Drying Your Wig",freq:"After every wash",steps:["Pat gently with a microfibre towel to remove excess water.","Place on a wig stand to maintain its shape while drying.","Allow to air dry naturally whenever possible to preserve hair quality.","If using a blow dryer use the lowest heat setting. Always use heat protectant.","Never sleep with a wet wig as this causes tangling and can damage the lace."]},
    {title:"Styling Your Wig",freq:"As needed",steps:["Always apply a heat protectant spray before using any heat tools.","Use heat tools on the lowest effective setting - 180C maximum.","Style in small sections for even heat distribution.","Allow hair to cool completely before touching or brushing further.","Avoid over-styling - repeated heat reduces the lifespan of the wig."]},
    {title:"Daily Maintenance",freq:"Every wear",steps:["Gently detangle with a wide-tooth comb before and after wearing.","Always comb from ends upward toward roots to prevent breakage.","Apply a light leave-in conditioner to keep hair moisturised.","Keep the wig away from chlorine, salt water, and excessive humidity."]},
    {title:"Storage",freq:"When not wearing",steps:["Store on a wig stand or in its original box to maintain the style.","Keep away from direct sunlight which can fade the colour.","Store in a cool dry place away from heat sources.","Do not store in a plastic bag - the wig needs to breathe."]},
    {title:"Lace Care",freq:"Every 1-2 weeks",steps:["Clean adhesive residue from the lace using 99% isopropyl alcohol on a cotton ball.","Work gently - do not pull or stretch the lace.","Allow the lace to dry completely before re-applying adhesive.","Inspect the lace regularly for tears. Small tears can be repaired with wig glue."]},
  ];
  const products = [
    {cat:"Shampoo",rec:"Sulphate-free moisturising formula. Look for argan oil or keratin-based options."},
    {cat:"Conditioner",rec:"Deep moisturising conditioner. Leave-in for daily use."},
    {cat:"Heat Protectant",rec:"Spray-on rated for 230C. Apply before any heat styling."},
    {cat:"Detangling",rec:"Wide-tooth comb for wet hair. Boar bristle brush for dry styling."},
    {cat:"Adhesive",rec:"Water-based lace glue for sensitive skin. Ghost bond for longer hold."},
    {cat:"Removal",rec:"99% isopropyl alcohol or dedicated lace glue remover. Never pull the lace."},
  ];
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">Care Guide</p>
      <h1 className="font-serif text-4xl font-bold mb-2">Wig Care Guide</h1>
      <p className="text-gray-500 mb-12">Follow these steps to keep your AblantBeauty wig looking flawless for 12 months and beyond.</p>
      <div className="space-y-12">
        <div className="bg-[#0a0a0a] text-white rounded-xl p-6">
          <p className="font-serif italic text-lg leading-relaxed">A wig that is cared for properly will last you over a year. Treat it like your own hair - gently, consistently, with the right products.</p>
          <p className="text-white/40 text-sm mt-3">- Vanessa Ablant</p>
        </div>
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold">{section.title}</h2>
              <span className="text-xs font-semibold bg-[#f7f6f4] px-3 py-1.5 rounded-full text-gray-500">{section.freq}</span>
            </div>
            <ol className="space-y-3">
              {section.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Products We Recommend</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.cat} className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-sm mb-1">{p.cat}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{p.rec}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#f7f6f4] rounded-xl p-6">
          <h3 className="font-serif text-xl font-bold mb-3">Still have questions?</h3>
          <p className="text-sm text-gray-600 mb-4">Our team is happy to advise on caring for your specific wig style.</p>
          <a href="/contact" className="inline-block bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3a3a3a] transition-colors">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
