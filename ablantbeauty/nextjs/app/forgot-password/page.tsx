"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
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
    <div className="min-h-[calc(100vh-130px)] bg-[#f7f6f4] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-2xl font-bold">Ablant<span className="italic">Beauty</span></Link>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">ok</span>
              </div>
              <h2 className="font-serif text-xl font-bold mb-2">Check your email</h2>
              <p className="text-sm text-gray-500 mb-6">If an account exists for {email} you will receive a reset link shortly.</p>
              <Link href="/login" className="inline-block bg-black text-white px-6 py-2.5 rounded-lg font-semibold text-sm">Back to Sign In</Link>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-2xl font-bold mb-1">Reset password</h1>
              <p className="text-sm text-gray-500 mb-6">Enter your email and we will send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gray-600">Email</label>
                  <input type="email" className="w-full border border-gray-200 rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-semibold text-sm hover:bg-[#3a3a3a] transition-colors disabled:opacity-50">
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
        <Link href="/login" className="flex items-center justify-center text-sm text-gray-500 hover:text-black transition-colors mt-5">Back to Sign In</Link>
      </div>
    </div>
  );
}
