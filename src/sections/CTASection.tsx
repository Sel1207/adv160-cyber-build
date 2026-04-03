import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  CalendarRange,
  Cpu,
  Download,
  Gauge,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reserveNotes = [
  { label: 'Build Slots', value: '04' },
  { label: 'Delivery Window', value: 'Q3 2026' },
  { label: 'Support', value: 'Dealer Assist' },
];

const utilityLinks = [
  { icon: MapPin, label: 'Find Dealer', sublabel: 'Locate a showroom' },
  { icon: Download, label: 'Download Specs', sublabel: 'Get the build sheet' },
  { icon: ShieldCheck, label: 'Warranty Notes', sublabel: 'Coverage overview' },
];

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0.45 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        panelRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      const cards = linksRef.current?.querySelectorAll('.cta-link-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="relative z-[70] min-h-screen overflow-hidden bg-black">
      <div className="tech-grid absolute inset-0 opacity-[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,168,56,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_26%)]" />

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <div ref={imageRef} className="relative h-[48vh] lg:h-auto lg:w-[54vw]">
          <img
            src="/images/cta_parked.jpg"
            alt="Honda ADV160 parked"
            className="h-full w-full object-cover grayscale-[18%] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/70 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black lg:hidden" />

          <div className="absolute left-6 top-6 border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md md:left-10 md:top-10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyber-amber shadow-[0_0_10px_rgba(232,168,56,0.8)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/65">
                Location // Pampanga_PH
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3 md:bottom-10 md:left-10 md:right-auto md:w-[min(34rem,calc(100%-5rem))]">
            {reserveNotes.map((note) => (
              <div key={note.label} className="story-surface border border-white/10 px-4 py-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {note.label}
                </div>
                <div className="mt-2 font-display text-xl font-black uppercase text-white">
                  {note.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center px-6 py-12 lg:-ml-12 lg:w-[46vw] lg:px-20 lg:py-16">
          <div
            ref={panelRef}
            className="story-surface w-full border border-white/10 p-8 shadow-2xl clip-angle-tl-br lg:p-14"
          >
            <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 opacity-70">
                <Cpu className="h-3 w-3 text-cyber-amber" />
                <span className="font-mono text-[9px] uppercase tracking-[0.46em] text-white">
                  Order Sequence // 2026.04
                </span>
              </div>

              <div className="inline-flex items-center gap-3 border border-cyber-amber/20 bg-cyber-amber/10 px-3 py-2">
                <Gauge className="h-3.5 w-3.5 text-cyber-amber" />
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/80">
                  Premium Build Flow
                </span>
              </div>
            </div>

            <div ref={headlineRef} className="mb-8">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.38em] text-white/35">
                Configure Your Machine
              </div>
              <h2 className="font-display text-[3.5rem] font-black uppercase leading-[0.85] text-white lg:text-[5.75rem]">
                Reserve
                <br />
                <span className="text-cyber-amber">Yours</span>
              </h2>
            </div>

            <div className="mb-8 h-[2px] w-24 bg-cyber-amber/60" />

            <p className="mb-10 max-w-[34ch] text-sm leading-relaxed text-gray-300 lg:text-base">
              Choose your armor finish, review the technical package, and secure a build slot with
              a closing screen that feels as premium as the machine it represents.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <button className="group relative overflow-hidden">
                <div className="flex items-center justify-center gap-4 bg-cyber-amber px-10 py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all group-hover:bg-white">
                  Start Your Build
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="absolute -inset-1 -z-10 bg-cyber-amber/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <button className="flex items-center justify-center gap-3 border border-white/15 bg-white/[0.03] px-6 py-5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-cyber-amber/40 hover:text-cyber-amber">
                <CalendarRange className="h-4 w-4" />
                Book a Consultation
              </button>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {reserveNotes.map((note) => (
                <div key={note.label}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                    {note.label}
                  </div>
                  <div className="mt-2 font-display text-2xl font-black uppercase text-white">
                    {note.value}
                  </div>
                </div>
              ))}
            </div>

            <div ref={linksRef} className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {utilityLinks.map(({ icon: Icon, label, sublabel }) => (
                <button
                  key={label}
                  className="cta-link-card group border border-white/10 bg-white/[0.02] p-4 text-left transition-colors hover:border-cyber-amber/35 hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-cyber-amber/50">
                    <Icon className="h-4 w-4 text-white/80" />
                  </div>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white">
                    {label}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed text-white/45">
                    {sublabel}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
