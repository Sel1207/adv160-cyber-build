import { useEffect, useMemo, useState } from 'react';

const navItems = [
  { id: 'performance', label: 'Performance' },
  { id: 'capability', label: 'Capability' },
  { id: 'specs', label: 'Specs' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'safety', label: 'Safety' },
];

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      setIsVisible(scrollY > vh * 0.4);

      for (const section of [...navItems.map(item => item.id), 'cta']) {
        const el = document.getElementById(section);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLabel = useMemo(() => {
    if (activeSection === 'cta') return 'Reserve';
    return navItems.find(item => item.id === activeSection)?.label ?? 'Overview';
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        className={`fixed left-6 top-6 z-50 transition-opacity duration-300 ${
          isVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="font-display text-xl font-bold tracking-[0.2em] text-white drop-shadow-md">
          HONDA
        </div>
      </div>

      <div
        className={`fixed right-6 top-6 z-50 transition-opacity duration-300 ${
          isVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/75">
            ADV160
          </div>
        </div>
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/70 shadow-xl backdrop-blur-md transition-transform duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="font-display text-lg font-bold tracking-[0.2em] text-white">
            HONDA
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-300 ${
                  activeSection === item.id ? 'text-cyber-amber' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden border border-white/10 bg-white/[0.03] px-3 py-2 md:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                Active
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-white">
                {activeLabel}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.03] px-3 py-2 md:hidden">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
                {activeLabel}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('cta')}
              className="border border-cyber-amber/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-cyber-amber transition-all duration-300 hover:bg-cyber-amber hover:text-black"
            >
              Reserve
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
