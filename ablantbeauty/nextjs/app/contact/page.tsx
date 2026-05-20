"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">Get In Touch</p>
        <h1 className="font-serif text-5xl font-bold leading-tight">Contact Us</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          {sent ? (
            <div className="bg-[#f7f6f4] rounded-2xl p-10 text-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">checkmark</span>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Message sent!</h3>
              <p className="text-gray-500 text-sm">We typically respond within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }} className="mt-6 text-sm underline text-gray-500 hover:text-black">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Name</label>
                  <input className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Email</label>
                  <input type="email" className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Subject</label>
                <select className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} required>
                  <option value="">Select a topic</option>
                  <option>Order enquiry</option>
                  <option>Product question</option>
                  <option>Returns and exchanges</option>
                  <option>Shipping</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Message</label>
                <textarea className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black resize-none h-32" placeholder="How can we help?" value={form.message} onChange={e => setForm({...form, message:e.target.value})} required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-semibold text-sm hover:bg-[#3a3a3a] transition-colors disabled:opacity-50">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Get in touch</h3>
            <div className="space-y-4">
              {[{label:"Email",value:"hello@ablantbeauty.co.za"},{label:"Instagram",value:"@vanessaablant"},{label:"Based in",value:"Cape Town, South Africa"},{label:"Response time",value:"Within 24 hours (Mon-Fri)"}].map(({label,value}) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#f7f6f4] rounded-lg flex items-center justify-center shrink-0 text-xs font-bold">{label[0]}</div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#f7f6f4] rounded-xl p-6">
            <h4 className="font-serif font-bold mb-3">FAQ</h4>
            <div className="space-y-4">
              {[{q:"How long does shipping take?",a:"2-4 business days in SA. Free over R800."},{q:"Can I return a wig?",a:"Yes, within 30 days if unworn and in original packaging."},{q:"Are your wigs human hair?",a:"Yes, 100% human hair across all styles."}].map(faq => (
                <div key={faq.q}>
                  <p className="text-sm font-semibold">{faq.q}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
