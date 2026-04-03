import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpecsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image block entrance
      gsap.fromTo(
        imageRef.current,
        { x: '-5vw', opacity: 0, scale: 1.05 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      // Headline entrance
      gsap.fromTo(
        headlineRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      // Spec rows stagger
      const specRows = specsRef.current?.querySelectorAll('.spec-row');
      if (specRows) {
        gsap.fromTo(
          specRows,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: specsRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: true,
            },
          }
        );
      }

      // Blueprint HUD effect
      gsap.fromTo(
        blueprintRef.current,
        { opacity: 0, rotate: -10, scale: 0.9 },
        {
          opacity: 0.25,
          rotate: 0,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { label: 'Engine', value: '157cc liquid-cooled, 4V, eSP+' },
    { label: 'Power', value: '~16.0 hp @ 7,500 rpm' },
    { label: 'Torque', value: '~15.0 Nm @ 6,500 rpm' },
    { label: 'Transmission', value: 'V-Matic automatic' },
    { label: 'Chassis', value: 'Double Cradle Steel Frame' },
    { label: 'Front Suspension', value: '31mm Telescopic Fork' },
    { label: 'Rear Suspension', value: 'Showa Twin Shocks' },
    { label: 'Safety', value: 'Honda HSTC + ABS System' },
    { label: 'Tires', value: '14" (F) / 13" (R) Tubeless' },
    { label: 'Fuel Capacity', value: '8.1 Liters' },
  ];

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative z-40 bg-black min-h-screen overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Column: The Build Detail */}
        <div
          ref={imageRef}
          className="lg:w-[45vw] h-[50vh] lg:h-screen relative border-r border-white/5"
        >
          <img
            src="/images/specs_detail.jpg"
            alt="Honda ADV160 details"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black lg:hidden block" />
        </div>

        {/* Right Column: Technical Interface */}
        <div className="lg:w-[55vw] px-8 lg:px-16 py-12 lg:py-24 relative flex flex-col justify-center">
          
          {/* Blueprint SVG (Technical Background) */}
          <svg
            ref={blueprintRef}
            className="absolute right-[-5%] top-1/4 w-[40vw] h-[40vw] pointer-events-none stroke-cyber-amber"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="80" strokeOpacity="0.1" strokeDasharray="4 4" />
            <path d="M20 100 H180 M100 20 V180" strokeOpacity="0.05" />
            <path d="M60 60 L140 140 M140 60 L60 140" strokeOpacity="0.05" />
            <rect x="50" y="50" width="100" height="100" strokeOpacity="0.1" />
            <path d="M40 100 Q100 40 160 100 Q100 160 40 100" strokeOpacity="0.2" />
          </svg>

          {/* Headline Section */}
          <div ref={headlineRef} className="relative z-10 mb-12 border-l-4 border-cyber-amber pl-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2">
              System Specification // 01
            </div>
            <h2 className="font-display text-[3.5rem] lg:text-[5rem] text-white font-black leading-[0.9] uppercase">
              Technical <br />
              <span className="text-cyber-amber">Telemetry</span>
            </h2>
          </div>

          {/* Specs Interface */}
          <div 
            ref={specsRef} 
            className="relative z-10 space-y-1 max-w-xl bg-black/20 backdrop-blur-sm"
          >
            {specs.map((spec, index) => (
              <div
                key={index}
                className="spec-row group flex justify-between items-center py-3 px-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-cyber-amber opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyber-amber/80">
                    {spec.label}
                  </span>
                </div>
                <span className="font-sans text-xs lg:text-sm text-gray-300 font-medium tracking-wide">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Technical footer bit */}
          <div className="mt-12 flex items-center gap-6 opacity-20">
            <div className="h-[1px] flex-grow bg-white" />
            <div className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">
              Core Architecture v2.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;