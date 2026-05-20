export default function ReturnsPage() {
  const eligible = ["Returned within 30 days of delivery","Unworn and unused","In original packaging with all tags attached","Not purchased during a final sale","Accompanied by proof of purchase"];
  const ineligible = ["Wigs that have been worn, washed, or styled","Items marked as Final Sale","Gift cards","Wig accessories"];
  const steps = [{n:"1",title:"Contact us first",desc:"Email hello@ablantbeauty.co.za with your order number. We respond within 1 business day with a Return Authorisation number."},{n:"2",title:"Package your return",desc:"Pack the wig in its original box with all tags. Write your Return Authorisation number on the outside."},{n:"3",title:"Ship it back",desc:"Send via tracked courier. Return shipping is your responsibility unless the item is defective."},{n:"4",title:"Refund processed",desc:"Inspected within 1-2 business days of receipt. Refunds reflect within 5-10 business days."}];
  const options = [{title:"Store Credit",desc:"Receive 110% of your purchase as store credit. Applied instantly."},{title:"Exchange",desc:"Swap for a different style. No shipping fee on the replacement."},{title:"Original Payment",desc:"Full refund to your original payment method within 5-10 business days."}];
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">Policies</p>
      <h1 className="font-serif text-4xl font-bold mb-2">Returns and Refunds</h1>
      <p className="text-gray-500 mb-12">Last updated: January 2026</p>
      <div className="space-y-10">
        <div className="bg-[#f7f6f4] rounded-xl p-6">
          <h2 className="font-serif text-xl font-bold mb-3">Our Promise</h2>
          <p className="text-gray-600 leading-relaxed">We want you to love your wig. If for any reason you are not satisfied we offer a 30-day return window on eligible items.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Return Eligibility</h2>
          <ul className="space-y-2">{eligible.map((item) => (<li key={item} className="flex items-start gap-3 text-sm text-gray-600"><span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0 mt-0.5">ok</span>{item}</li>))}</ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Non-Returnable Items</h2>
          <ul className="space-y-2">{ineligible.map((item) => (<li key={item} className="flex items-start gap-3 text-sm text-gray-600"><span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs shrink-0 mt-0.5">x</span>{item}</li>))}</ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">How to Return</h2>
          <div className="space-y-4">{steps.map((s) => (<div key={s.n} className="flex gap-4 border border-gray-100 rounded-xl p-5"><div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif font-bold text-lg shrink-0">{s.n}</div><div><p className="font-semibold mb-1">{s.title}</p><p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p></div></div>))}</div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Refund Options</h2>
          <div className="grid md:grid-cols-3 gap-4">{options.map((o) => (<div key={o.title} className="bg-[#f7f6f4] rounded-xl p-5"><p className="font-semibold mb-2">{o.title}</p><p className="text-sm text-gray-500 leading-relaxed">{o.desc}</p></div>))}</div>
        </div>
        <div className="bg-[#0a0a0a] text-white rounded-xl p-6">
          <h3 className="font-serif text-lg font-bold mb-2">Start a return</h3>
          <p className="text-white/60 text-sm mb-4">Email us your order number and we will guide you through the process.</p>
          <a href="mailto:hello@ablantbeauty.co.za" className="inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">hello@ablantbeauty.co.za</a>
        </div>
      </div>
    </div>
  );
}
