import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CapabilitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hstcRef = useRef<HTMLDivElement>(null);
  const tractionRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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
        { scale: 1.05, opacity: 0.8 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Subtle entrance from the extreme edges
      scrollTl.fromTo(panelRef.current, { x: '-15vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0);
      
      const listItems = listRef.current?.querySelectorAll('.list-item');
      if (listItems) {
        scrollTl.fromTo(listItems, { x: '10vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' }, 0.1);
      }

      scrollTl.to(panelRef.current, { x: '-15vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { level: 'L1', desc: 'Minimal intervention' },
    { level: 'L2', desc: 'Balanced grip' },
    { level: 'L3', desc: 'Maximum stability' },
  ];

  return (
    <section
      ref={sectionRef}
      id="capability"
      className="section-pinned relative z-30 bg-black overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/capability_lean.jpg"
          alt="Honda ADV160 capability"
          className="w-full h-full object-cover"
        />
        {/* Darkened edges to make text pop while keeping the bike core bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Left Text Panel - Shrunk and pushed to the very edge */}
      <div
        ref={panelRef}
        className="absolute left-[2vw] top-[28vh] w-[20vw] bg-black/40 backdrop-blur-xl border border-white/5 clip-angle-tr-bl p-6 shadow-2xl"
      >
        <div
          ref={hstcRef}
          className="font-display text-[2.8rem] text-white font-black leading-none mb-1"
        >
          HSTC
        </div>

        <div
          ref={tractionRef}
          className="font-display text-sm text-cyber-amber font-bold leading-none mb-6 tracking-widest"
        >
          TRACTION CONTROL
        </div>

        <div className="hairline w-full mb-6 bg-white/10" />

        <div ref={bodyRef}>
          <p className="font-sans text-[0.75rem] text-gray-300 leading-relaxed">
            Three-stage torque control keeps the rear tire hooked up on wet roads and loose gravel.
          </p>
        </div>
      </div>

      {/* Right Feature List - Pushed right and lowered to clear the tail light */}
      <div
        ref={listRef}
        className="absolute right-[2vw] top-[45vh] w-[16vw] hidden lg:block bg-black/30 backdrop-blur-md p-4 border-r border-cyber-amber/50"
      >
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="list-item flex items-center gap-3">
              <div className="font-mono text-[10px] text-cyber-amber font-bold w-4">{feature.level}</div>
              <div className="font-sans text-[10px] text-gray-300 uppercase tracking-wider">
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={microLabelRef}
        className="absolute left-[2vw] bottom-[6vh]"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          ADV160 // CAPABILITY
        </div>
      </div>
    </section>
  );
};

export default CapabilitySection;