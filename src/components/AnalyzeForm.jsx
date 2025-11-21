import { useState } from 'react';

export default function AnalyzeForm() {
  const base = import.meta.env.VITE_BACKEND_URL || '';
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    pole_id: 'KBKN-16',
    coordinates: { latitude: 6.272227, longitude: 100.616167 },
    environmental_factors: { vegetation_height: 2.4, distance_to_line: 3.2, elevation: 80, humidity: 75, temperature: 30, wind_speed: 12, terrain_type: 'lowland', weather_condition: 'clear' },
    technical_parameters: { historical_trip_count: 1, tower_footing_resistance: 8.5, thermal_anomaly: 2.0, ultrasound_db: 20.0, partial_discharge_pc: 90.0, corrosion_level: 'low', structural_integrity: 'good' },
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${base}/api/v1/analyze-pole`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 pb-12">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="p-4 border-b border-slate-800 text-slate-200 font-medium">Analyze a Pole</div>
        <form onSubmit={submit} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <label className="block">
              <span className="text-slate-300 text-sm">Pole ID</span>
              <input value={form.pole_id} onChange={e=>setForm({...form, pole_id:e.target.value})} className="mt-1 w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-white" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-slate-300 text-sm">Latitude</span>
                <input type="number" value={form.coordinates.latitude} onChange={e=>setForm({...form, coordinates:{...form.coordinates, latitude: Number(e.target.value)}})} className="mt-1 w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-white" />
              </label>
              <label className="block">
                <span className="text-slate-300 text-sm">Longitude</span>
                <input type="number" value={form.coordinates.longitude} onChange={e=>setForm({...form, coordinates:{...form.coordinates, longitude: Number(e.target.value)}})} className="mt-1 w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-white" />
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {['vegetation_height','distance_to_line','elevation','humidity','temperature','wind_speed'].map((k)=> (
                <label key={k} className="block">
                  <span className="text-slate-300 text-sm">{k.replaceAll('_',' ')}</span>
                  <input type="number" value={form.environmental_factors[k]} onChange={e=>setForm({...form, environmental_factors:{...form.environmental_factors, [k]: Number(e.target.value)}})} className="mt-1 w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-white" />
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {['historical_trip_count','tower_footing_resistance','thermal_anomaly','ultrasound_db','partial_discharge_pc'].map((k)=> (
                <label key={k} className="block">
                  <span className="text-slate-300 text-sm">{k.replaceAll('_',' ')}</span>
                  <input type="number" value={form.technical_parameters[k]} onChange={e=>setForm({...form, technical_parameters:{...form.technical_parameters, [k]: Number(e.target.value)}})} className="mt-1 w-full bg-slate-800/70 border border-slate-700 rounded px-3 py-2 text-white" />
                </label>
              ))}
            </div>
            <button disabled={loading} className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold disabled:opacity-50">{loading? 'Analyzing...':'Analyze'}</button>
          </div>
        </form>
        {result && (
          <div className="px-4 pb-4">
            <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-4">
              <div className="text-white font-medium">Risk Score: {result?.risk_analysis?.overall_risk_score} ({result?.risk_analysis?.risk_category})</div>
              <div className="mt-2 text-slate-300 text-sm">Maintenance: {result?.maintenance_recommendations?.urgency_level}, Cycle {result?.maintenance_recommendations?.recommended_cycle} months</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
