import { useEffect, useRef } from 'react';

export function WorkflowNodesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes = [
      { x: 100, y: 150, label: 'Start' },
      { x: 200, y: 80, label: 'Process' },
      { x: 200, y: 220, label: 'Validate' },
      { x: 300, y: 150, label: 'Complete' },
    ];

    const connections = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ];

    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections with animated glow
      connections.forEach(([from, to]) => {
        const fromNode = nodes[from];
        const toNode = nodes[to];

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Animated flow
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const flowProgress = (progress % 100) / 100;
        const flowX = fromNode.x + dx * flowProgress;
        const flowY = fromNode.y + dy * flowProgress;

        ctx.beginPath();
        ctx.arc(flowX, flowY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00e5ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(17, 24, 39, 0.8)';
        ctx.fill();
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00e5ff';
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 35);
      });

      progress += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="w-full h-full rounded-lg"
    />
  );
}
