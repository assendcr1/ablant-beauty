export default function ShippingPage() {
  const rows = [{region:"Cape Town",std:"1-2 business days",exp:"Same day (order before 10am)",cost:"Free over R800 / R60"},{region:"Johannesburg and Pretoria",std:"2-3 business days",exp:"Next day",cost:"Free over R800 / R80"},{region:"Durban",std:"2-3 business days",exp:"Next day",cost:"Free over R800 / R80"},{region:"Other SA cities",std:"3-5 business days",exp:"2-3 business days",cost:"Free over R800 / R100"},{region:"Rural areas",std:"5-7 business days",exp:"Not available",cost:"R120"}];
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">Policies</p>
      <h1 className="font-serif text-4xl font-bold mb-2">Shipping Information</h1>
      <p className="text-gray-500 mb-12">Last updated: January 2026</p>
      <div className="space-y-10">
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Delivery Timeframes</h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#f7f6f4]"><tr><th className="text-left px-5 py-3 font-semibold">Region</th><th className="text-left px-5 py-3 font-semibold">Standard</th><th className="text-left px-5 py-3 font-semibold">Express</th><th className="text-left px-5 py-3 font-semibold">Cost</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{rows.map((r) => (<tr key={r.region} className="hover:bg-gray-50"><td className="px-5 py-3 font-medium">{r.region}</td><td className="px-5 py-3 text-gray-600">{r.std}</td><td className="px-5 py-3 text-gray-600">{r.exp}</td><td className="px-5 py-3 text-gray-600">{r.cost}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Free Shipping</h2>
          <div className="bg-[#f7f6f4] rounded-xl p-6">
            <p className="font-semibold mb-2">Free standard shipping on all orders over R800.</p>
            <p className="text-sm text-gray-600 leading-relaxed">Applied automatically at checkout. Express shipping fees apply regardless of order value.</p>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Order Processing</h2>
          <p className="text-gray-600 leading-relaxed">Orders placed before 2:00 PM SAST Monday to Friday are processed the same business day. You will receive tracking details by email once dispatched.</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">Packaging</h2>
          <p className="text-gray-600 leading-relaxed">All wigs are packaged in a branded box with tissue paper and a care card, sealed securely to prevent damage in transit.</p>
        </div>
        <div className="bg-[#0a0a0a] text-white rounded-xl p-6">
          <h3 className="font-serif text-lg font-bold mb-2">Need help with your order?</h3>
          <p className="text-white/60 text-sm mb-4">Our team responds within 24 hours on business days.</p>
          <a href="/contact" className="inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
