import { Gauge, ThermometerSnowflake, Activity, Zap } from 'lucide-react';

export default function LiveKPIs({ metrics }) {
  const items = [
    { label: 'Accuracy', value: (metrics?.overall_accuracy ?? 0.94) * 100, icon: Gauge },
    { label: 'Precision (Critical)', value: (metrics?.precision_critical ?? 0.92) * 100, icon: Activity },
    { label: 'Recall (Failure)', value: (metrics?.recall_failure ?? 0.90) * 100, icon: Zap },
    { label: 'F1-Score', value: (metrics?.f1_score ?? 0.91) * 100, icon: ThermometerSnowflake },
  ];
  return (
    <section className="py-8 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it, idx) => (
        <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3">
            <it.icon className="w-5 h-5 text-emerald-400" />
            <span className="text-slate-300 text-sm">{it.label}</span>
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">{it.value.toFixed(1)}%</div>
        </div>
      ))}
    </section>
  );
}
