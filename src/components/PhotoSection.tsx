import { useState } from 'react';
import siteData from '../../data/site.json';
import CategoryOverlay from './CategoryOverlay';

export default function PhotoSection() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <section
        id="work"
        style={{
          padding: '120px 24px',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px', color: 'var(--accent)' }}>
              Photos
            </h2>
            <p
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#000000',
                fontFamily: 'Montserrat, sans-serif',
                margin: '0 0 16px',
              }}
            >
              Photo Gallery
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-faint)', margin: 0 }}>
              Explore our diverse portfolio of photography work across multiple categories
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
            className="sm:grid-cols-2 md:grid-cols-4"
          >
            {siteData.portfolio.photos.categories.map((category, index) => (
              <div
                key={category.slug}
                onClick={() => setSelectedCategory(index)}
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  const bar = e.currentTarget.querySelector('.accent-bar') as HTMLElement;
                  if (bar) bar.style.transform = 'scaleX(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  const bar = e.currentTarget.querySelector('.accent-bar') as HTMLElement;
                  if (bar) bar.style.transform = 'scaleX(0)';
                }}
              >
                <div
                  className="accent-bar"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'var(--accent)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                    zIndex: 2,
                  }}
                />
                <img
                  src={category.coverImage}
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '24px',
                  }}
                >
                  <h3
                    style={{
                      color: '#FFFFFF',
                      fontSize: '22px',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory !== null && (
        <CategoryOverlay
          category={siteData.portfolio.photos.categories[selectedCategory]}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}
