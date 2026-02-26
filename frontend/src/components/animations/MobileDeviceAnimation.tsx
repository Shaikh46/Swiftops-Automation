import { Smartphone } from 'lucide-react';

export function MobileDeviceAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div
        className="relative w-40 h-72 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border-4 border-gray-700 shadow-2xl"
        style={{
          animation: 'float-device 3s ease-in-out infinite',
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl" />

        {/* Screen */}
        <div className="absolute inset-4 bg-gradient-to-br from-neon-blue/20 to-purple-500/20 rounded-2xl border border-neon-blue/40 overflow-hidden">
          <div className="p-3 space-y-2">
            <div className="h-2 bg-neon-blue/40 rounded w-3/4" />
            <div className="h-2 bg-neon-blue/30 rounded w-1/2" />
            <div className="h-2 bg-neon-blue/30 rounded w-2/3" />
            <div className="mt-4 h-16 bg-neon-blue/20 rounded border border-neon-blue/40" />
          </div>

          {/* App icon */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Smartphone className="w-8 h-8 text-neon-blue" style={{ filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.8))' }} />
          </div>
        </div>

        {/* Home button */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 border-gray-600" />
      </div>

      <style>{`
        @keyframes float-device {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
