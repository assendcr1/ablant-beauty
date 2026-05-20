"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { ...form, redirect:false });
    setLoading(false);
    if (res?.error) setError("Invalid email or password. Please try again.");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-130px)] bg-[#f7f6f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl font-bold">Ablant<span className="italic">Beauty</span></Link>
          <h1 className="font-serif text-2xl font-bold mt-4 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Email</label>
              <input type="email" className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" value={form.username} onChange={e => setForm({...form, username:e.target.value})} required />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Password</label>
                <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-black">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type={showPass ? "text" : "password"} className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black pr-16" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black">{showPass ? "Hide" : "Show"}</button>
              </div>
            </div>
            {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2 rounded-lg">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-semibold text-sm hover:bg-[#3a3a3a] transition-colors disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-5">No account? <Link href="/register" className="font-semibold text-black hover:underline">Create one free</Link></p>
      </div>
    </div>
  );
}
