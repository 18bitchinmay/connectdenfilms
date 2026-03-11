import { ArrowRight, Play } from 'lucide-react';
import siteData from '../../data/site.json';
import { ytBgEmbed } from '../utils/youtube';

export default function Hero() {
  const hasVideoBackground = Boolean(siteData.hero.backgroundYouTubeId);
  const words = siteData.company.headline.split(' ');
  const lastWord = words.pop();
  const headlineStart = words.join(' ');

  const textColor = hasVideoBackground ? '#FFFFFF' : 'var(--text-primary)';
  const mutedColor = hasVideoBackground ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-muted)';

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: hasVideoBackground ? '#000' : 'var(--bg-primary)',
      }}
    >
      {hasVideoBackground && (
        <>
          <iframe
            src={ytBgEmbed(siteData.hero.backgroundYouTubeId)}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: '56.25vw', // 16:9 aspect ratio
              minHeight: '100vh',
              minWidth: '177.77vh', // 16:9 aspect ratio
              pointerEvents: 'none',
              zIndex: 0,
              border: 'none',
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.55)',
              zIndex: 1,
            }}
          />
        </>
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '1100px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            marginBottom: '24px',
            opacity: 0,
            animation: 'fadeSlideUp 0.8s ease forwards',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '8px',
            }}
          >
            {siteData.company.tagline}
          </p>
        </div>

        <h1
          style={{
            color: textColor,
            marginBottom: '24px',
            opacity: 0,
            animation: 'fadeSlideUp 0.8s ease forwards 0.15s',
          }}
        >
          {headlineStart}{' '}
          <span style={{ color: 'var(--accent)' }}>{lastWord}</span>
        </h1>

        <p
          style={{
            fontSize: '20px',
            lineHeight: '1.6',
            color: mutedColor,
            maxWidth: '700px',
            margin: '0 auto 48px',
            opacity: 0,
            animation: 'fadeSlideUp 0.8s ease forwards 0.28s',
          }}
        >
          {siteData.company.subheading}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0,
            animation: 'fadeSlideUp 0.8s ease forwards 0.42s',
          }}
        >
          <a
            href={siteData.hero.ctaPrimary.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(siteData.hero.ctaPrimary.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              fontSize: '15px',
              fontWeight: 600,
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: '8px',
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
            {siteData.hero.ctaPrimary.label}
            <Play size={18} fill="currentColor" />
          </a>

          <a
            href={siteData.hero.ctaSecondary.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(siteData.hero.ctaSecondary.href)?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              fontSize: '15px',
              fontWeight: 600,
              background: hasVideoBackground ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              color: hasVideoBackground ? '#FFFFFF' : 'var(--accent)',
              border: `2px solid ${hasVideoBackground ? 'rgba(255, 255, 255, 0.3)' : 'var(--accent)'}`,
              borderRadius: '8px',
              transition: 'all 0.25s ease',
              backdropFilter: hasVideoBackground ? 'blur(10px)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (hasVideoBackground) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              } else {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = '#FFFFFF';
              }
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (hasVideoBackground) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              } else {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--accent)';
              }
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {siteData.hero.ctaSecondary.label}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
