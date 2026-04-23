import { Star } from 'lucide-react';
import siteData from '../../data/site.json';

export default function Testimonials() {
  return (
    <section
      style={{
        padding: '120px 24px',
        background: 'var(--bg-subtle)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px', textAlign: 'center' }}>
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
            CLIENT TESTIMONIALS
          </p>
          <h2 style={{ marginBottom: '16px' }}>
            What Our Clients{' '}
            <span style={{ color: 'var(--accent)' }}>Say</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-faint)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Trusted by brands and individuals who value excellence
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            padding: '24px 8px 48px 8px',
          }}
          className="no-scrollbar"
        >
          {siteData.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                minWidth: '320px',
                maxWidth: '400px',
                background: '#FFFFFF',
                border: '1px solid #EAEAEC',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
            >
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="var(--accent)"
                    color="var(--accent)"
                  />
                ))}
              </div>
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: '1.75',
                  fontStyle: 'italic',
                  color: '#222222',
                  flex: 1,
                }}
              >
                "{testimonial.quote}"
              </p>
              <div
                style={{
                  borderTop: '1px solid #E8E8E8',
                  paddingTop: '20px',
                }}
              >
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {testimonial.name}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  {testimonial.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
