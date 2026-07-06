import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Abstract3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    let cleanUpFn: (() => void) | undefined;
    let isCancelled = false;

    // 1. Detect prefers-reduced-motion early
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Detect WebGL support early
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!ctx) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const init = () => {
      if (isCancelled || !containerRef.current) return;
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 3. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.set(0, 10, 18);
      camera.lookAt(0, 0, 0);

      // 4. Create Particle Wave Grid (40 x 40 = 1600 particles, low-poly & fast)
      const numCols = 40;
      const numRows = 40;
      const separation = 0.85;
      const count = numCols * numRows;

      const positions = new Float32Array(count * 3);
      const initialY = new Float32Array(count);

      let index = 0;
      for (let x = 0; x < numCols; x++) {
        for (let z = 0; z < numRows; z++) {
          const posX = (x - numCols / 2) * separation;
          const posZ = (z - numRows / 2) * separation;
          positions[index * 3] = posX;
          positions[index * 3 + 1] = 0;
          positions[index * 3 + 2] = posZ;

          initialY[index] = 0;
          index++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Custom circle glowing particle texture generated natively
      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = 16;
      particleCanvas.height = 16;
      const ctx = particleCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(0, 229, 255, 0.85)');
        gradient.addColorStop(0.6, 'rgba(0, 123, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      const texture = new THREE.CanvasTexture(particleCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.35,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: 0x00E5FF,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // 5. Interaction variables
      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      let scrollY = 0;
      let targetScrollY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const handleScroll = () => {
        targetScrollY = window.scrollY;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });

      // 6. Animation Loop
      let clock = new THREE.Clock();
      let animationId: number;
      let lastFrameTime = 0;

      const isMobileDevice = typeof window !== 'undefined' && (
        window.innerWidth < 768 ||
        (navigator as any).deviceMemory <= 4 ||
        (navigator as any).hardwareConcurrency <= 4
      );

      const frameInterval = isMobileDevice ? 1000 / 30 : 1000 / 60;

      const tick = (timestamp?: number) => {
        animationId = requestAnimationFrame(tick);

        if (timestamp) {
          const elapsed = timestamp - lastFrameTime;
          if (elapsed < frameInterval) {
            return;
          }
          lastFrameTime = timestamp - (elapsed % frameInterval);
        }

        const time = clock.getElapsedTime();

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        scrollY += (targetScrollY - scrollY) * 0.08;

        particles.rotation.y = mouse.x * 0.15 + scrollY * 0.0003;
        particles.rotation.x = -0.15 + mouse.y * 0.1 - scrollY * 0.0001;

        const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
        const array = positionAttr.array as Float32Array;

        let idx = 0;
        for (let x = 0; x < numCols; x++) {
          for (let z = 0; z < numRows; z++) {
            const posX = array[idx * 3];
            const posZ = array[idx * 3 + 2];

            let y = Math.sin(posX * 0.25 + time * 0.85) * Math.cos(posZ * 0.25 + time * 0.85) * 1.5;

            const dx = posX - (mouse.x * 12);
            const dz = posZ - (mouse.y * 8);
            const dist = Math.sqrt(dx * dx + dz * dz);
            if (dist < 4) {
              y += (4 - dist) * 0.65;
            }

            array[idx * 3 + 1] = y;
            idx++;
          }
        }
        positionAttr.needsUpdate = true;

        renderer.render(scene, camera);
      };

      if (prefersReducedMotion) {
        const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
        const array = positionAttr.array as Float32Array;
        let idx = 0;
        for (let x = 0; x < numCols; x++) {
          for (let z = 0; z < numRows; z++) {
            const posX = array[idx * 3];
            const posZ = array[idx * 3 + 2];
            array[idx * 3 + 1] = Math.sin(posX * 0.25) * Math.cos(posZ * 0.25) * 1.2;
            idx++;
          }
        }
        positionAttr.needsUpdate = true;
        renderer.render(scene, camera);
      } else {
        animationId = requestAnimationFrame(tick);
      }

      // 7. Resize handler
      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (prefersReducedMotion) {
          renderer.render(scene, camera);
        }
      };
      window.addEventListener('resize', handleResize, { passive: true });

      cleanUpFn = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        
        geometry.dispose();
        material.dispose();
        texture.dispose();
        
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    };

    // Defer initialization to requestIdleCallback to keep main thread free for initial paint & hydration
    const requestIdle = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 120));
    const idleId = requestIdle(() => {
      init();
    });

    return () => {
      isCancelled = true;
      const cancelIdle = (window as any).cancelIdleCallback || ((id: any) => clearTimeout(id));
      cancelIdle(idleId);
      if (cleanUpFn) {
        cleanUpFn();
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]">
        <div className="absolute w-[80%] h-[80%] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] border border-[#00E5FF]/20 animate-[spin_30s_linear_infinite] opacity-30 shadow-[0_0_50px_rgba(0,229,255,0.1)_inset]" />
        <div className="absolute w-[60%] h-[60%] rounded-[70%_30%_30%_70%_/_60%_40%_60%_40%] border border-[#007BFF]/10 animate-[spin_20s_linear_infinite_reverse] opacity-25" />
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#007BFF]/20 blur-[50px] animate-pulse" />
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" />;
}
