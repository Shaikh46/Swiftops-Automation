import { Mail } from 'lucide-react';

export function EmailPipelineAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-md">
        {/* Pipeline stages */}
        <div className="flex justify-between items-center relative">
          {['Draft', 'Send', 'Deliver', 'Open'].map((stage, index) => (
            <div key={stage} className="flex flex-col items-center z-10">
              <div className="w-12 h-12 rounded-full bg-neon-blue/20 border-2 border-neon-blue flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-neon-blue" />
              </div>
              <span className="text-xs text-white/70">{stage}</span>
            </div>
          ))}

          {/* Connecting line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-neon-blue/30" style={{ zIndex: 0 }} />

          {/* Animated progress line */}
          <div
            className="absolute top-6 left-0 h-0.5 bg-neon-blue shadow-[0_0_10px_rgba(0,229,255,0.8)]"
            style={{
              width: '100%',
              animation: 'pipeline-progress 3s ease-in-out infinite',
              zIndex: 1,
            }}
          />
        </div>

        {/* Flowing email icons */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute top-6 left-0"
            style={{
              animation: `email-flow 3s ease-in-out infinite`,
              animationDelay: `${i * 1}s`,
            }}
          >
            <Mail className="w-4 h-4 text-neon-blue" style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))' }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pipeline-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes email-flow {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
