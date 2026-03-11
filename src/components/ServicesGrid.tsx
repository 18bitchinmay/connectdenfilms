import * as Icons from 'lucide-react';
import siteData from '../../data/site.json';

const getIcon = (iconName: string) => {
  const Icon = (Icons as Record<string, React.ComponentType<{ size: number }>>)[iconName];
  return Icon || Icons.Film;
};

export default function ServicesGrid() {
  return (
    <section
      id="services"
      style={{
        padding: '120px 24px',
        background: '#F7F7F7',
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
            WHAT WE DO
          </p>
          <h2 style={{ marginBottom: '16px' }}>
            Our{' '}
            <span style={{ color: 'var(--accent)' }}>Services</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-faint)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Comprehensive video production services tailored to your needs
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {siteData.services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <div
                key={service.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.25s ease',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                  e.currentTarget.style.borderLeftColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <IconComponent size={28} color="#FFFFFF" />
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--text-muted)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
