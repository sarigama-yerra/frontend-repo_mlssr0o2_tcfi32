import { useEffect, useState } from 'react';

export default function Heatmap() {
  const [points, setPoints] = useState([]);
  const base = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    fetch(`${base}/api/v1/risk-heatmap`).then(r => r.json()).then(d => setPoints(d.points || [])).catch(() => {});
  }, [base]);

  return (
    <section className="px-6 pb-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="p-4 border-b border-slate-800 text-slate-200 font-medium">Geographic Risk Snapshot</div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 md:h-80 rounded-lg bg-gradient-to-br from-emerald-900/30 via-slate-900 to-slate-950 border border-emerald-700/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-40" style={{backgroundImage:'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.2), transparent 60%)'}} />
            <div className="absolute inset-0 p-4">
              <div className="text-emerald-300 text-sm">Leaflet placeholder</div>
              <div className="mt-2 text-slate-400 text-xs">Showing {points.length} risk points (demo)</div>
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-auto pr-2">
            {points.map((p) => (
              <div key={p.pole_id} className="flex items-center justify-between rounded-lg bg-slate-800/40 p-3 border border-slate-800">
                <div>
                  <div className="text-white font-medium">{p.pole_id}</div>
                  <div className="text-xs text-slate-400">{p.lat.toFixed(4)}, {p.lon.toFixed(4)}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${p.risk>=80? 'bg-red-500/20 text-red-300': p.risk>=55? 'bg-amber-500/20 text-amber-300':'bg-emerald-500/20 text-emerald-300'}`}>{p.risk}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
