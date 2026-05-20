'use client';
import { useEffect, useState } from 'react';

export function FlashSaleBanner() {
  const [secs, setSecs] = useState(2 * 3600 + 47 * 60 + 33);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');

  return (
    <div className="bg-[#0a0a0a] text-white text-center py-3.5 px-4 text-sm font-medium tracking-wide">
      Limited stock — Flash Sale ends in{' '}
      <span className="font-serif italic text-base font-bold mx-1">
        {h}:{m}:{s}
      </span>{' '}
      —{' '}
      <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded ml-1 tracking-wider">
        UP TO 30% OFF
      </span>
    </div>
  );
}
