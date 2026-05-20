export default function TermsPage() {
  const sections = [{title:"1. Acceptance of Terms",body:"By accessing ablantbeauty.co.za you accept these Terms of Service. We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance."},{title:"2. Products and Pricing",body:"All prices are in South African Rand (ZAR) and include VAT. We reserve the right to change prices at any time. Product images are illustrative and may vary slightly from the actual product."},{title:"3. Orders and Payment",body:"Placing an order is an offer to purchase. Payment must be made in full at checkout. We accept major credit and debit cards, EFT, and PayFast. All transactions are encrypted and processed securely."},{title:"4. Shipping and Delivery",body:"We aim to dispatch within 1 business day. Delivery timeframes are estimates and not guaranteed. Risk passes to you upon delivery. See our Shipping Policy for full details."},{title:"5. Returns and Refunds",body:"Returns accepted within 30 days for unworn, unused items in original packaging. Hygiene restrictions apply. See our Returns Policy for complete details."},{title:"6. Intellectual Property",body:"All content on this site including text, images, logos, and designs is owned by AblantBeauty and protected by copyright law. Reproduction without written permission is prohibited."},{title:"7. User Accounts",body:"You are responsible for your account credentials and all activity under your account. Notify us immediately of any unauthorised access."},{title:"8. Limitation of Liability",body:"To the maximum extent permitted by law AblantBeauty is not liable for indirect or consequential damages. Total liability shall not exceed the amount paid for the specific order."},{title:"9. Governing Law",body:"These terms are governed by the laws of the Republic of South Africa. Disputes are subject to South African courts."},{title:"10. Contact",body:"For questions contact us at hello@ablantbeauty.co.za or through our Contact page."}];
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">Legal</p>
      <h1 className="font-serif text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-12">Last updated: January 2026</p>
      <div className="space-y-8 text-gray-600 leading-relaxed">
        {sections.map((s) => (<div key={s.title}><h2 className="font-serif text-xl font-bold mb-3 text-black">{s.title}</h2><p>{s.body}</p></div>))}
      </div>
    </div>
  );
}
