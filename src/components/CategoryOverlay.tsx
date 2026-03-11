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
      if (e.key === 'Escape' && lightboxIndex === null) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
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
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: '#000000',
          overflowY: 'auto',
          animation: 'fadeIn 0.32s ease',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 101,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <button
            onClick={onClose}
            aria-label="Go back"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'color 0.22s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h2
            style={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 700,
              margin: 0,
            }}
          >
            {category.name}
          </h2>
        </div>

        <div
          style={{
            padding: '24px',
            columnCount: 1,
            columnGap: '3px',
          }}
          className="sm:columns-2 md:columns-3 lg:columns-4"
        >
          {category.images.map((image, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              style={{
                breakInside: 'avoid',
                marginBottom: '3px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0,
                animation: `fadeSlideUp 0.5s ease forwards ${index * 0.04}s`,
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'brightness(0.7)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'brightness(1)';
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  display: 'block',
                  transition: 'filter 0.25s ease',
                }}
              />
            </div>
          ))}
        </div>
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
    </>
  );
}
