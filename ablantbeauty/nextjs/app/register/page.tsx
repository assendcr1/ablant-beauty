"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", confirm:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getStrength = (p: string) => { let s=0; if(p.length>=8)s++; if(/[A-Z]/.test(p))s++; if(/[0-9]/.test(p))s++; if(/[^A-Za-z0-9]/.test(p))s++; return s; };
  const s = getStrength(form.password);
  const sColor = ["","bg-red-400","bg-yellow-400","bg-blue-400","bg-green-500"][s];
  const sLabel = ["","Weak","Fair","Good","Strong"][s];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (s < 2) { setError("Please choose a stronger password"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/wp-api/wc/v3/customers", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ email:form.email, first_name:form.firstName, last_name:form.lastName, username:form.email, password:form.password }) });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Registration failed"); }
      await signIn("credentials", { username:form.email, password:form.password, redirect:false });
      router.push("/dashboard");
    } catch(err: any) { setError(err?.message || "Something went wrong."); }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-130px)] bg-[#f7f6f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl font-bold">Ablant<span className="italic">Beauty</span></Link>
          <h1 className="font-serif text-2xl font-bold mt-4 mb-1">Create your account</h1>
          <p className="text-sm text-gray-500">Join 8,200+ happy customers</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">First Name</label>
                <input className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="Thandi" value={form.firstName} onChange={e => setForm({...form, firstName:e.target.value})} required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Last Name</label>
                <input className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="Mokoena" value={form.lastName} onChange={e => setForm({...form, lastName:e.target.value})} required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Email</label>
              <input type="email" className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Password</label>
              <input type="password" className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">{[1,2,3,4].map(i => <div key={i} className={"h-1 flex-1 rounded-full " + (i<=s ? sColor : "bg-gray-200")} />)}</div>
                  <span className="text-xs text-gray-400">{sLabel}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Confirm Password</label>
              <input type="password" className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="••••••••" value={form.confirm} onChange={e => setForm({...form, confirm:e.target.value})} required />
            </div>
            {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2 rounded-lg">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-semibold text-sm hover:bg-[#3a3a3a] transition-colors disabled:opacity-50">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-5">Already have an account? <Link href="/login" className="font-semibold text-black hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
}
