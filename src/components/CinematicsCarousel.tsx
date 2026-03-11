import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import siteData from '../../data/site.json';
import { ytThumb } from '../utils/youtube';
import YouTubeVideoModal from './YouTubeVideoModal';

export default function CinematicsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cinematics = siteData.portfolio.cinematics;

  const goToSlide = (index: number) => {
    setActiveIndex((index + cinematics.length) % cinematics.length);
  };

  const handlePrev = () => goToSlide(activeIndex - 1);
  const handleNext = () => goToSlide(activeIndex + 1);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setCurrentX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.pageX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const delta = currentX - startX;
    const velocity = Math.abs(delta);
    if (velocity > 30) {
      if (delta > 0) handlePrev();
      else handleNext();
    }
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].pageX);
    setCurrentX(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentX(e.touches[0].pageX);
  };

  const handleTouchEnd = () => {
    const delta = currentX - startX;
    const velocity = Math.abs(delta);
    if (velocity > 30) {
      if (delta > 0) handlePrev();
      else handleNext();
    }
  };

  const handleVideoPrev = () => {
    if (playingVideo !== null) {
      setPlayingVideo((playingVideo - 1 + cinematics.length) % cinematics.length);
    }
  };

  const handleVideoNext = () => {
    if (playingVideo !== null) {
      setPlayingVideo((playingVideo + 1) % cinematics.length);
    }
  };

  return (
    <>
      <section
        style={{
          padding: '120px 24px',
          background: 'var(--bg-primary)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px', color: 'var(--accent)' }}>
              Cinematics
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
              Cinematic Films
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-faint)', margin: 0 }}>
              Long-form storytelling with cinematic depth and production value
            </p>
          </div>

          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              height: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {cinematics.map((cinematic, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={cinematic.id}
                  onClick={() => {
                    if (isActive && !isDragging) {
                      setPlayingVideo(index);
                    } else if (isVisible) {
                      setActiveIndex(index);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: 'min(720px, 90vw)',
                    aspectRatio: '16/9',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    transform: `translateX(${offset * 110}%) scale(${isActive ? 1 : 0.80})`,
                    opacity: isVisible ? (isActive ? 1 : 0.55) : 0,
                    transition: 'all 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)',
                    pointerEvents: isVisible ? 'auto' : 'none',
                    cursor: isActive ? 'pointer' : 'default',
                  }}
                >
                  <img
                    src={ytThumb(cinematic.youtubeId)}
                    alt={cinematic.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '6px 12px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}
                  >
                    {cinematic.duration}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '24px',
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '72px',
                          height: '72px',
                          borderRadius: '50%',
                          background: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.22s ease',
                        }}
                      >
                        <Play size={28} fill="#FFFFFF" color="#FFFFFF" />
                      </div>
                    )}
                    <div style={{ marginTop: 'auto' }}>
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--accent)',
                          marginBottom: '8px',
                        }}
                      >
                        {cinematic.category}
                      </p>
                      <h3
                        style={{
                          color: '#FFFFFF',
                          fontSize: '24px',
                          fontWeight: 700,
                          marginBottom: '8px',
                        }}
                      >
                        {cinematic.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: '1.5',
                        }}
                      >
                        {cinematic.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              marginTop: '48px',
            }}
          >
            <button
              onClick={handlePrev}
              aria-label="Previous film"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-hover)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {cinematics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to film ${index + 1}`}
                  style={{
                    width: index === activeIndex ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: index === activeIndex ? 'var(--accent)' : 'var(--border)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next film"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-hover)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {playingVideo !== null && (
        <YouTubeVideoModal
          videoId={cinematics[playingVideo].youtubeId}
          aspect="16/9"
          onClose={() => setPlayingVideo(null)}
          onPrev={handleVideoPrev}
          onNext={handleVideoNext}
        />
      )}
    </>
  );
}
