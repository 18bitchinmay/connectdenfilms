import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, Instagram, Youtube, MessageCircle, Facebook } from 'lucide-react';
import siteData from '../../data/site.json';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 500);
      return;
    }

    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '16px 20px',
    fontSize: '15px',
    backgroundColor: '#FFFFFF',
    border: `1px solid ${errors[fieldName] ? '#DC2626' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    transition: 'all 0.22s ease',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
  });

  const socialIcons = [
    { icon: Instagram, url: siteData.company.social.instagram },
    { icon: Youtube, url: siteData.company.social.youtube },
    { icon: MessageCircle, url: siteData.company.social.whatsapp },
    { icon: Facebook, url: siteData.company.social.facebook },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            GET IN TOUCH
          </p>
          <h2 style={{ marginBottom: '16px' }}>
            Let's Create{' '}
            <span style={{ color: 'var(--accent)' }}>Together</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-faint)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Ready to bring your vision to life? Reach out and let's start the conversation
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: '48px',
          }}
          className="lg:grid-cols-2"
        >
          {submitted ? (
            <div
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: '16px',
                padding: '64px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  fontSize: '40px',
                }}
              >
                ✓
              </div>
              <h3 style={{ marginBottom: '12px', fontSize: '28px' }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle('name')}
                  className={errors.name ? 'shake' : ''}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.name ? '#DC2626' : 'var(--border)')}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle('email')}
                  className={errors.email ? 'shake' : ''}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = errors.email ? '#DC2626' : 'var(--border)')}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle('phone')}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputStyle('message'), resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '16px 32px',
                  fontSize: '15px',
                  fontWeight: 600,
                  background: 'var(--accent)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          )}

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '24px' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '4px' }}>Email</p>
                    <a
                      href={`mailto:${siteData.company.email}`}
                      style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}
                    >
                      {siteData.company.email}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '4px' }}>Phone</p>
                    <a
                      href={`tel:${siteData.company.phone}`}
                      style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}
                    >
                      {siteData.company.phone}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '4px' }}>Address</p>
                    <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {siteData.company.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Clock size={20} color="var(--accent)" />
                <h4 style={{ fontSize: '16px', fontWeight: 600 }}>Office Hours</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                <p>{siteData.company.officeHours.weekdays}</p>
                <p>{siteData.company.officeHours.saturday}</p>
                <p>{siteData.company.officeHours.sunday}</p>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '32px',
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {socialIcons.map(({ icon: Icon, url }, index) => {
                  if (!url) return null;
                  return (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.22s ease',
                        color: 'var(--text-muted)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                        e.currentTarget.style.color = 'var(--accent)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
