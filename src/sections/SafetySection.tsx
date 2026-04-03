import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SafetySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const absRef = useRef<HTMLDivElement>(null);
  const brakingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.05, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(cardRef.current, { x: '25vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0);
      scrollTl.fromTo(statRef.current, { x: '-25vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0);

      scrollTl.to(cardRef.current, { x: '25vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.to(statRef.current, { x: '-25vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="safety"
      className="section-pinned relative z-[60] overflow-hidden bg-black"
    >
      <div ref={bgRef} className="absolute inset-0 h-full w-full">
        <img
          src="/images/safety_brake.jpg"
          alt="Honda ADV160 safety braking"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      <div ref={statRef} className="absolute left-[4vw] top-[40vh] w-[20vw]">
        <div className="relative border-l-2 border-cyber-amber pl-6">
          <div className="font-display text-[4.5vw] font-black leading-none text-white drop-shadow-2xl">
            240mm
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-amber">
            Front Disc // 2-Piston Caliper
          </div>
          <div className="mt-4 flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[1px] w-8 bg-white/20" />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className="absolute right-[4vw] top-[25vh] w-[26vw] border border-white/5 bg-black/40 p-8 shadow-2xl backdrop-blur-xl clip-angle-tl-br"
      >
        <div
          ref={absRef}
          className="mb-1 font-display text-[4rem] font-black leading-none text-white drop-shadow-lg"
        >
          ABS
        </div>

        <div
          ref={brakingRef}
          className="mb-8 font-display text-xl font-bold leading-none tracking-widest text-cyber-amber drop-shadow-md"
        >
          BRAKING SYSTEM
        </div>

        <div className="hairline mb-8 w-full bg-white/10" />

        <div ref={bodyRef}>
          <p className="font-sans text-sm leading-relaxed text-gray-200 drop-shadow-md">
            Single-channel ABS keeps the front wheel in check during emergency stops, rain or
            shine. Maximum deceleration with zero loss of control.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
            Safety_Protocols // Active
          </div>
          <div className="h-2 w-2 rounded-full bg-cyber-amber shadow-[0_0_8px_#ffb000] animate-pulse" />
        </div>
      </div>

      <div ref={microLabelRef} className="absolute bottom-[6vh] left-[4vw]">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
          ADV160 // SECURE_STOP
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
