import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[65vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow-xl">TNB Predictive Maintenance</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">Real-time risk analysis, automated work orders, and intelligence for overhead electrical lines — powered by an advanced AI/ML engine.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </section>
  );
}
