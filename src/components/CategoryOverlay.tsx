import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import LightboxModal from './LightboxModal';

interface CategoryOverlayProps {
  category: {
    name: string;
    images: { src: string; alt: string }[];
  };
  onClose: () => void;
}

export default function CategoryOverlay({ category, onClose }: CategoryOverlayProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // Allow escape to close the overlay if lightbox is not open
      if (e.key === 'Escape' && lightboxIndex === null) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, lightboxIndex]);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + category.images.length) % category.images.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % category.images.length);
    }
  };

  return (
    <div>
      {/* Header section with back button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '48px',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Go back"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontSize: '16px',
            fontWeight: 600,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
            marginLeft: '-12px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back to Photos</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            {category.name}
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '15px' }}>
            {category.images.length} Photos
          </p>
        </div>
      </div>

      {/* Instagram style grid */}
      <div
        className="photo-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          width: '100%',
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .photo-grid {
              gap: 2px !important;
              margin-left: -24px !important;
              margin-right: -24px !important;
              width: calc(100% + 48px) !important;
            }
          }
        `}</style>
        {category.images.map((image, index) => (
          <div
            key={index}
            onClick={() => setLightboxIndex(index)}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#f0f0f0',
              opacity: 0,
              animation: `fadeIn 0.5s ease forwards ${index * 0.05}s`,
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.05)';
              const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
              if (overlay) overlay.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
              const overlay = e.currentTarget.querySelector('.hover-overlay') as HTMLElement;
              if (overlay) overlay.style.opacity = '0';
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
            />
            <div
              className="hover-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.2)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          images={category.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
