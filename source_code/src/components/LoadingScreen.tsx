import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure animation initializes within the first frame
    requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 2.0;
        // Force play if autoPlay is blocked
        videoRef.current.play().catch(() => {
          // Ignore auto-play errors
        });
      }
    });

    // Fallback timer in case video doesn't load or onEnded doesn't fire
    const fallbackTimer = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
        setTimeout(onComplete, 100); // Reduced delay
      }
    }, 3000); // Reduced fallback timer

    return () => clearTimeout(fallbackTimer);
  }, [isVisible, onComplete]);

  const handleVideoEnd = () => {
    setIsVisible(false);
    setTimeout(onComplete, 100);
  };

  const handleVideoError = () => {
    setVideoError(true);
    // If video fails, show fallback for 1 second then complete
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 100);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020617] overflow-hidden"
        >
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain md:object-cover max-w-full max-h-full"
              onEnded={handleVideoEnd}
              onError={handleVideoError}
            >
              <source src="/videos/loading-animation.mp4" type="video/mp4" />
            </video>
          ) : (
            /* Fallback Loader */
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin mb-4"></div>
              <div className="text-[#00E5FF] font-bold tracking-[0.15em] uppercase text-sm animate-pulse">Loading...</div>
            </div>
          )}
          
          {/* Skip button for convenience */}
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(onComplete, 100);
            }}
            className="absolute bottom-8 right-8 text-white/30 hover:text-white/80 text-xs tracking-widest uppercase transition-colors z-10 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
