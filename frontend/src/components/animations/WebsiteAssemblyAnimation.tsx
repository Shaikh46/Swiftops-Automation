import { useEffect, useState } from 'react';

const components = [
  { id: 'header', label: 'Header', delay: 0 },
  { id: 'sidebar', label: 'Sidebar', delay: 200 },
  { id: 'content', label: 'Content', delay: 400 },
  { id: 'footer', label: 'Footer', delay: 600 },
];

export function WebsiteAssemblyAnimation() {
  const [visibleComponents, setVisibleComponents] = useState<string[]>([]);

  useEffect(() => {
    const showComponents = () => {
      setVisibleComponents([]);
      components.forEach((component) => {
        setTimeout(() => {
          setVisibleComponents((prev) => [...prev, component.id]);
        }, component.delay);
      });
    };

    showComponents();
    const interval = setInterval(showComponents, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-64 h-48 border-2 border-neon-blue/40 rounded-lg overflow-hidden">
        {/* Header */}
        <div
          className={`absolute top-0 left-0 right-0 h-12 bg-neon-blue/20 border-b border-neon-blue/40 flex items-center justify-center transition-all duration-500 ${
            visibleComponents.includes('header')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-full'
          }`}
        >
          <div className="text-xs text-white/70">Header</div>
        </div>

        {/* Sidebar */}
        <div
          className={`absolute top-12 left-0 bottom-12 w-16 bg-neon-blue/10 border-r border-neon-blue/40 flex items-center justify-center transition-all duration-500 ${
            visibleComponents.includes('sidebar')
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-full'
          }`}
        >
          <div className="text-xs text-white/70 transform -rotate-90">Nav</div>
        </div>

        {/* Content */}
        <div
          className={`absolute top-12 left-16 right-0 bottom-12 bg-neon-blue/5 flex items-center justify-center transition-all duration-500 ${
            visibleComponents.includes('content')
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
        >
          <div className="text-xs text-white/70">Content Area</div>
        </div>

        {/* Footer */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-12 bg-neon-blue/20 border-t border-neon-blue/40 flex items-center justify-center transition-all duration-500 ${
            visibleComponents.includes('footer')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-full'
          }`}
        >
          <div className="text-xs text-white/70">Footer</div>
        </div>
      </div>
    </div>
  );
}
