import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const accentRuleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE
      scrollTl.fromTo(
        mediaRef.current,
        { y: '60vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        accentRuleRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, ease: 'power2.out' },
        0.15
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(
        microLabelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // EXIT
      scrollTl.fromTo(
        mediaRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-30vh', scale: 1.02, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.to(headlineRef.current, { y: -30, opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.to(bodyRef.current, { x: '8vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section-pinned relative z-50 bg-black overflow-hidden"
    >
      {/* HUD Micro Label */}
      <div
        ref={microLabelRef}
        className="absolute right-[6vw] top-[6vh] z-10 flex items-center gap-4"
      >
        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> {/* REC Indicator */}
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Capture_Feed // ADV160_Exterior
        </div>
      </div>

      {/* Large Media Panel - "The Viewfinder" */}
      <div
        ref={mediaRef}
        className="absolute left-[6vw] top-[10vh] w-[88vw] h-[73vh] clip-angle-all overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* Corner HUD Accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyber-amber opacity-50 z-20" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyber-amber opacity-50 z-20" />
        
        <video
          src="/images/gallery_wide.mp4"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Scanline Overlay Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Bottom Left Headline - High Contrast */}
      <div className="absolute left-[6vw] bottom-[6vh] flex items-start gap-6">
        <div
          ref={accentRuleRef}
          className="w-1 bg-cyber-amber mt-2 shadow-[0_0_10px_#ffb000]"
          style={{ transformOrigin: 'top', height: '60px' }}
        />
        <div
          ref={headlineRef}
          className="font-display text-[5rem] lg:text-[7rem] text-white font-black leading-none tracking-tighter drop-shadow-2xl"
        >
          ADVENTURE
        </div>
      </div>

      {/* Bottom Right Paragraph - HUD Styled */}
      <div
        ref={bodyRef}
        className="absolute right-[6vw] bottom-[6vh] w-[30vw] hidden lg:block border-r border-white/10 pr-6 text-right"
      >
        <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed mb-4 uppercase tracking-widest">
          High-mounted windshield, all-LED lighting, and rugged styling. Engineered for the detour.
        </p>
        <div className="flex justify-end gap-1">
            {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-cyber-amber/40" />)}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;