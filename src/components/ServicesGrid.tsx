import * as Icons from 'lucide-react';
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const services = [
  {
    id: "s1",
    title: "Cinematic Filmmaking",
    description: "Full-service film production from concept to delivery. We craft visual stories that resonate and inspire.",
    icon: "Film",
    image: "/images/services/cinematics.jpg",
  },
  {
    id: "s2",
    title: "Event Coverage",
    description: "Comprehensive event documentation with multi-camera setups. Capture every moment that matters.",
    icon: "Calendar",
    image: "/images/services/events.jpg",
  },
  {
    id: "s3",
    title: "Social Media Content",
    description: "Platform-optimized short-form content that drives engagement. Reels, stories, and viral-ready videos.",
    icon: "Smartphone",
    image: "/images/services/social.jpg",
  },
  {
    id: "s4",
    title: "Corporate Productions",
    description: "Professional corporate videos, training content, and internal communications that elevate your brand.",
    icon: "Briefcase",
    image: "/images/services/corporate.jpg",
  },
  {
    id: "s5",
    title: "Brand Films",
    description: "Authentic storytelling that captures your brand's essence. Strategic narratives that connect with audiences.",
    icon: "Heart",
    image: "/images/services/brand.jpg",
  },
  {
    id: "s6",
    title: "Commercials & Ads",
    description: "High-impact advertising content for digital and broadcast. Creative concepts that convert viewers to customers.",
    icon: "Video",
    image: "/images/services/commercial.jpg",
  }
];

const getIcon = (iconName: string) => {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size: number, className?: string }>>)[iconName];
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

        <ScrollStack>
          {services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <ScrollStackItem
                key={service.id}
                itemClassName="text-white"
                image={service.image}
                overlayOpacity={0.6}
              >
                <div className="flex flex-col items-center text-center p-12 md:p-20">
                  <div className="mb-8" style={{ color: 'var(--accent)' }}>
                    <IconComponent size={56} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 max-w-xl text-lg md:text-xl leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}