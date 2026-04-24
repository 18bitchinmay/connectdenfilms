import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import siteData from '../../data/site.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: ${scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.98)'};
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${scrolled ? 'var(--border)' : 'transparent'};
          transition: all 0.3s ease;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .navbar-container {
            position: fixed;
            top: 16px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 32px);
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-bottom: none;
            border-radius: 100px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          }
        }
      `}</style>

      <nav className="navbar-container">
        <div
          className="h-14 md:h-20"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: '12px'
            }}
          >
            <img
              src="/hero/cdflogo.png"
              alt={`${siteData.company.name} Logo`}
              className="h-10 md:h-[76px]"
              style={{
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </a>

          {/* Desktop Links (Restored to original parameters) */}
          <div
            className="hidden md:flex"
            style={{
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {siteData.company.nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(`#${item.toLowerCase()}`);
                }}
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  position: 'relative',
                  transition: 'color 0.22s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Menu Button - Circular bordered icon */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all cursor-pointer"
            style={{ 
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: 'transparent',
              color: '#000000',
              marginRight: '-8px' // Slightly offset to balance against the extra padding given to the pill
            }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(10, 10, 10, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setIsOpen(false)}
        >
          {siteData.company.nav.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(`#${item.toLowerCase()}`);
              }}
              style={{
                fontSize: '32px',
                fontWeight: 700,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: '#FFFFFF',
                opacity: 0,
                animation: `fadeSlideUp 0.4s ease forwards ${index * 0.1}s`,
                transition: 'color 0.22s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
