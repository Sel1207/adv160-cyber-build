import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import PerformanceSection from './sections/PerformanceSection';
import CapabilitySection from './sections/CapabilitySection';
import SpecsSection from './sections/SpecsSection';
import GallerySection from './sections/GallerySection';
import SafetySection from './sections/SafetySection';
import CTASection from './sections/CTASection';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const footerLinks = [
    { id: 'performance', label: 'Performance' },
    { id: 'specs', label: 'Specifications' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'cta', label: 'Reserve' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <div className="grain-overlay" />

      <Navigation />

      <main className="relative">
        <HeroSection />
        <PerformanceSection />
        <CapabilitySection />
        <SpecsSection />
        <GallerySection />
        <SafetySection />
        <CTASection />
      </main>

      <footer className="relative overflow-hidden bg-cyber-black px-6 py-12">
        <div className="tech-grid absolute inset-0 opacity-10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-amber/60 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.7fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-cyber-amber shadow-[0_0_12px_rgba(232,168,56,0.8)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/70">
                ADV160 // Concept Landing
              </span>
            </div>

            <div>
              <div className="font-display text-2xl font-black tracking-[0.18em] text-white">
                HONDA
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                A sharper digital showcase for the ADV160 concept, blending urban utility,
                premium motion, and cyber-brutalist attitude.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
              Explore
            </div>
            <div className="grid gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="font-mono text-xs uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-cyber-amber"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
              Signature
            </div>
            <p className="font-display text-2xl font-black uppercase leading-none text-white">
              Urban Armor.
              <br />
              <span className="text-cyber-amber">Road Ready.</span>
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.28em] text-white/35 md:flex-row md:items-center md:justify-between">
          <span className="font-mono">Copyright 2026 Honda Motor Co., Ltd.</span>
          <span className="font-mono">Cyber Build Revision 04</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
