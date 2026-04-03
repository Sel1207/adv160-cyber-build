import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroStats = [
  { label: 'Engine', value: '157cc' },
  { label: 'Cooling', value: 'Liquid' },
  { label: 'Mode', value: 'Urban ADV' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hondaRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const bottomCaptionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
        0
      );

      tl.fromTo(
        panelRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.1
      );

      tl.fromTo(
        hondaRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.25
      );

      const advChars = advRef.current?.querySelectorAll('.char');
      if (advChars) {
        tl.fromTo(
          advChars,
          { y: 60, opacity: 0, rotateX: 25 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.02 },
          0.35
        );
      }

      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      tl.fromTo(
        microcopyRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.5
      );

      tl.fromTo(
        bottomCaptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([panelRef.current, hondaRef.current, advRef.current, taglineRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(microcopyRef.current, { opacity: 1, x: 0 });
            gsap.set(bottomCaptionRef.current, { opacity: 1, y: 0 });
            gsap.set(bgRef.current, { scale: 1, y: 0, opacity: 1 });
          },
        },
      });

      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        microcopyRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bottomCaptionRef.current,
        { y: 0, opacity: 1 },
        { y: 30, opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 1.06, y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const advText = 'ADV160';

  return (
    <section ref={sectionRef} id="hero" className="section-pinned relative z-10">
      <div ref={bgRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0 }}>
        <img
          src="/images/hero_rider_city.jpg"
          alt="Honda ADV160 in urban environment"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="tech-grid absolute inset-0 opacity-[0.08]" />
      </div>

      <div className="absolute right-6 top-6 z-10 hidden border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md md:block">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
          Terrain Profile
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyber-amber shadow-[0_0_10px_rgba(232,168,56,0.8)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/75">
            City / Wet / Gravel
          </span>
        </div>
      </div>

      <div
        ref={panelRef}
        className="absolute left-6 right-6 top-[17vh] flex max-w-2xl flex-col md:left-[6vw] md:right-auto md:top-[24vh] md:w-[min(48vw,42rem)]"
        style={{ opacity: 0 }}
      >
        <div
          ref={hondaRef}
          className="mb-3 font-display text-lg font-semibold tracking-[0.28em] text-white/90 drop-shadow-lg md:text-2xl"
          style={{ opacity: 0 }}
        >
          HONDA
        </div>

        <div
          ref={advRef}
          className="mb-4 font-display text-[clamp(3.5rem,14vw,9rem)] font-black leading-[0.9] text-white drop-shadow-2xl"
          style={{ perspective: '1000px', opacity: 0 }}
        >
          {advText.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </div>

        <div
          ref={taglineRef}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-cyber-amber drop-shadow-lg md:text-sm"
          style={{ opacity: 0 }}
        >
          Cyber-Forged. Street Ready.
        </div>

        <div className="mb-5 h-[2px] w-full max-w-[220px] bg-white/35" />

        <p className="max-w-[44ch] text-sm leading-relaxed text-gray-200 drop-shadow-lg md:text-base">
          The rugged spirit of the Honda ADV160, recut with brutalist bodywork and a sharper
          digital presentation built for the concrete jungle.
        </p>

        <div className="story-surface amber-glow mt-8 grid gap-4 border border-white/10 p-4 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="border-l border-cyber-amber/35 pl-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                {stat.label}
              </div>
              <div className="mt-2 font-display text-xl font-bold uppercase text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={microcopyRef}
        className="story-surface absolute bottom-[18vh] right-[6vw] hidden w-[min(24rem,26vw)] border-l-2 border-cyber-amber px-5 py-6 shadow-2xl xl:block"
        style={{ opacity: 0 }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
          Mission Brief
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-100 drop-shadow-md">
          A liquid-cooled urban adventurer with aggressive lines, illuminated HUD cues, and a
          stronger first impression on every scroll.
        </p>
      </div>

      <div ref={bottomCaptionRef} className="absolute bottom-[8vh] left-6 md:left-[6vw]" style={{ opacity: 0 }}>
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/90 drop-shadow-md">
          Scroll to explore
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-[2px] w-10 bg-cyber-amber shadow-[0_0_8px_#ffb000]" />
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
            Sequence 01
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
