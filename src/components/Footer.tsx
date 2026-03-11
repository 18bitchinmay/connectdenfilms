import { Instagram, Youtube, MessageCircle, Facebook, Mail, Phone } from 'lucide-react';
import siteData from '../../data/site.json';

export default function Footer() {
  const socialIcons = [
    { icon: Instagram, url: siteData.company.social.instagram, label: 'Instagram' },
    { icon: Youtube, url: siteData.company.social.youtube, label: 'YouTube' },
    { icon: MessageCircle, url: siteData.company.social.whatsapp, label: 'WhatsApp' },
    { icon: Facebook, url: siteData.company.social.facebook, label: 'Facebook' },
  ];

  return (
    <footer
      style={{
        background: '#0A0A0A',
        color: '#FFFFFF',
        padding: '80px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gap: '48px',
            marginBottom: '64px',
          }}
          className="md:grid-cols-3"
        >
          <div>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 800,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                marginBottom: '16px',
              }}
            >
              {siteData.company.name}
            </h3>
            <p
              style={{
                fontSize: '15px',
                color: '#999999',
                lineHeight: '1.6',
                marginBottom: '24px',
              }}
            >
              {siteData.company.tagline}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialIcons.map(({ icon: Icon, url, label }) => {
                if (!url) return null;
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.22s ease',
                      color: '#FFFFFF',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--accent)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '20px',
                letterSpacing: '0.05em',
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {siteData.company.nav.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    fontSize: '15px',
                    color: '#999999',
                    transition: 'color 0.22s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
                >
                  {item}
                </a>
              ))}
              <a
                href="https://drive.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '15px',
                  color: '#999999',
                  transition: 'color 0.22s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
              >
                Full Portfolio
              </a>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '20px',
                letterSpacing: '0.05em',
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a
                href={`mailto:${siteData.company.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  color: '#999999',
                  transition: 'color 0.22s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
              >
                <Mail size={18} />
                {siteData.company.email}
              </a>
              <a
                href={`tel:${siteData.company.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  color: '#999999',
                  transition: 'color 0.22s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
              >
                <Phone size={18} />
                {siteData.company.phone}
              </a>
              <p
                style={{
                  fontSize: '15px',
                  color: '#999999',
                  lineHeight: '1.6',
                }}
              >
                {siteData.company.address}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '14px',
            color: '#666666',
          }}
        >
          <p>
            © {siteData.company.copyrightYear} {siteData.company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
