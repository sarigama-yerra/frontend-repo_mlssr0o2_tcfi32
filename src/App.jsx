import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import LiveKPIs from './components/LiveKPIs';
import Heatmap from './components/Heatmap';
import AnalyzeForm from './components/AnalyzeForm';

function App() {
  const [metrics, setMetrics] = useState(null);
  const base = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    fetch(`${base}/api/v1/performance-metrics`).then(r=>r.json()).then(setMetrics).catch(()=>{});
  }, [base]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <LiveKPIs metrics={metrics} />
      <Heatmap />
      <AnalyzeForm />
      <footer className="py-10 text-center text-slate-500">Built with an AI-powered engine for predictive maintenance</footer>
    </div>
  );
}

export default App
