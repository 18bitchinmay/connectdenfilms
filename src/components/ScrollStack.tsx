import React, { ReactNode } from 'react';

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollStack({ children, className = "" }: ScrollStackProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`relative w-full flex flex-col ${className}`}>
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: {
              ...(child.props.style || {}),
              top: `calc(15vh + ${index * 24}px)`,
              marginBottom: '40vh',
              zIndex: index,
            }
          });
        }
        return child;
      })}
    </div>
  );
}

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  style?: React.CSSProperties;
  image?: string;
  imageAlt?: string;
  overlayOpacity?: number;
}

export function ScrollStackItem({ 
  children, 
  itemClassName = "", 
  style,
  image,
  imageAlt = "Service image",
  overlayOpacity = 0.5 
}: ScrollStackItemProps) {
  return (
    <div
      className={`sticky mx-auto w-full max-w-4xl rounded-3xl overflow-hidden transition-all duration-300 ${itemClassName}`}
      style={{
        ...style,
        boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div
            className="absolute inset-0 z-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
