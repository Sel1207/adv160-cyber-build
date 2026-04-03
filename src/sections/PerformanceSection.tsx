import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PerformanceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const espRef = useRef<HTMLDivElement>(null);
  const powerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
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

      // Slide from further right
      scrollTl.fromTo(
        cardRef.current,
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        statRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // EXIT
      scrollTl.to(cardRef.current, { x: '30vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.to(statRef.current, { x: '-20vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="section-pinned relative z-20 bg-black overflow-hidden"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/performance_motion.jpg"
          alt="Honda ADV160 performance"
          className="w-full h-full object-cover"
        />
        {/* Heavy vignette on right/left to protect text while keeping bike clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/80" />
      </div>

      {/* Left Stat Block - Tightened to the edge */}
      <div ref={statRef} className="absolute left-[4vw] top-[42vh] w-[18vw]">
        <div className="relative border-l border-white/20 pl-6">
          <div className="font-display text-[4.5vw] text-cyber-amber font-black leading-none tracking-tighter">
            157cc
          </div>
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/50 mt-1">
            eSP+ LIQUID-COOLED
          </div>
        </div>
      </div>

      {/* Right Text Card - Narrowed and pushed to the far right edge */}
      <div
        ref={cardRef}
        className="absolute right-[4vw] top-[20vh] w-[24vw] bg-black/40 backdrop-blur-xl border border-white/5 clip-angle-tl-br p-6 shadow-2xl"
      >
        <div ref={espRef} className="font-display text-[3.5rem] text-white font-black leading-none mb-0">
          eSP+
        </div>
        <div ref={powerRef} className="font-display text-lg text-cyber-amber font-bold leading-none mb-6">
          POWER
        </div>

        <div className="hairline w-full mb-6 bg-white/10" />

        <div ref={bodyRef} className="space-y-4">
          <p className="font-sans text-[0.75rem] md:text-[0.85rem] text-gray-300 leading-relaxed">
            Liquid-cooled, 4-valve efficiency with strong low-end torque for quick getaways.
          </p>
          <p className="font-sans text-[0.75rem] md:text-[0.85rem] text-gray-300 leading-relaxed">
            Smart power delivery keeps fuel consumption low without sacrificing response.
          </p>
        </div>

        <div className="mt-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            ADV160 // PERFORMANCE
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
