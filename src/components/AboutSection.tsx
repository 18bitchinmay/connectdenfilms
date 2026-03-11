import { ArrowRight } from 'lucide-react';
import siteData from '../../data/site.json';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gap: '64px',
            marginBottom: '80px',
          }}
          className="lg:grid-cols-2"
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '16px',
              }}
            >
              ABOUT US
            </p>
            <h2 style={{ marginBottom: '32px' }}>
              {siteData.about.heading.split(' ').slice(0, -1).join(' ')}{' '}
              <span style={{ color: 'var(--accent)' }}>
                {siteData.about.heading.split(' ').slice(-1)}
              </span>
            </h2>
            {siteData.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.75',
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            {siteData.about.images.map((image, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  opacity: 0,
                  animation: `fadeSlideUp 0.6s ease forwards ${index * 0.1}s`,
                }}
                className="scroll-reveal"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: '32px',
              fontWeight: 700,
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            Our <span style={{ color: 'var(--accent)' }}>Process</span>
          </h3>
          <div
            style={{
              display: 'grid',
              gap: '32px',
              position: 'relative',
            }}
            className="md:grid-cols-4"
          >
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: '8%',
                right: '8%',
                height: '3px',
                background: 'var(--accent)',
                zIndex: 0,
              }}
              className="hidden md:block"
            />
            {siteData.about.process.map((step, index) => (
              <div
                key={step.step}
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: '#FFFFFF',
                    fontSize: '24px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                  }}
                >
                  {step.step}
                </div>
                <h4
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--text-muted)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
