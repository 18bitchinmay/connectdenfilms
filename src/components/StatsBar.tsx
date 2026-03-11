import { useEffect, useRef, useState } from 'react';
import siteData from '../../data/site.json';

interface StatItemProps {
  value: string;
  suffix: string;
  label: string;
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const targetValue = parseInt(value);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1800;
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentCount = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetValue, hasAnimated]);

  return (
    <div
      ref={elementRef}
      style={{
        textAlign: 'center',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          fontSize: '52px',
          fontWeight: 900,
          color: '#FFFFFF',
          marginBottom: '8px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}
      >
        {count}
        <span style={{ color: 'var(--accent)' }}>{suffix}</span>
      </div>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#999999',
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {siteData.stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
