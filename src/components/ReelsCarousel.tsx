import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import siteData from '../../data/site.json';
import { ytThumb } from '../utils/youtube';
import YouTubeVideoModal from './YouTubeVideoModal';

export default function ReelsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reels = siteData.portfolio.reels;

  const goToSlide = (index: number) => {
    setActiveIndex((index + reels.length) % reels.length);
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
      setPlayingVideo((playingVideo - 1 + reels.length) % reels.length);
    }
  };

  const handleVideoNext = () => {
    if (playingVideo !== null) {
      setPlayingVideo((playingVideo + 1) % reels.length);
    }
  };

  return (
    <>
      <section
        style={{
          padding: '120px 24px',
          background: 'var(--bg-subtle)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', maxWidth: '800px' }}>
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
              02 — REELS
            </p>
            <h2 style={{ marginBottom: '16px' }}>
              Short-Form{' '}
              <span style={{ color: 'var(--accent)' }}>Content</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-faint)' }}>
              Dynamic vertical videos optimized for social platforms
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
              height: '520px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {reels.map((reel, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={reel.id}
                  onClick={() => {
                    if (isActive && !isDragging) {
                      setPlayingVideo(index);
                    } else if (isVisible) {
                      setActiveIndex(index);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: 'min(300px, 75vw)',
                    aspectRatio: '9/16',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    transform: `translateX(${offset * 110}%) scale(${isActive ? 1 : 0.82})`,
                    opacity: isVisible ? (isActive ? 1 : 0.55) : 0,
                    transition: 'all 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)',
                    pointerEvents: isVisible ? 'auto' : 'none',
                    cursor: isActive ? 'pointer' : 'default',
                  }}
                >
                  <img
                    src={ytThumb(reel.youtubeId)}
                    alt={reel.title}
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
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '20px',
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.22s ease',
                        }}
                      >
                        <Play size={24} fill="#FFFFFF" color="#FFFFFF" />
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
                          marginBottom: '6px',
                        }}
                      >
                        {reel.category}
                      </p>
                      <h3
                        style={{
                          color: '#FFFFFF',
                          fontSize: '18px',
                          fontWeight: 700,
                          marginBottom: '4px',
                        }}
                      >
                        {reel.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {reel.description}
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
              aria-label="Previous reel"
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
              {reels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to reel ${index + 1}`}
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
              aria-label="Next reel"
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
          videoId={reels[playingVideo].youtubeId}
          aspect="9/16"
          onClose={() => setPlayingVideo(null)}
          onPrev={handleVideoPrev}
          onNext={handleVideoNext}
        />
      )}
    </>
  );
}
