import { useEffect, useRef } from 'react';
import rough from 'roughjs';

const W = 160,
  H = 60;

type RoughButtonProps = {
  label: string;
  onClick: () => void;
};

const RoughButton = ({ label, onClick }: RoughButtonProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveredRef = useRef(false);
  const baseSeed = label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const drawRef = useRef<(seed: number) => void>(() => {});
  drawRef.current = (seed: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = '';

    const rc = rough.svg(svg);
    svg.appendChild(
      rc.rectangle(4, 4, W - 8, H - 8, {
        stroke: 'white',
        strokeWidth: 2,
        roughness: 1.8,
        fill: 'rgb(140, 138, 138)',
        fillStyle: 'solid',
        seed,
      })
    );

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', String(W / 2));
    text.setAttribute('y', String(H / 2 + 8));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '22');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('font-family', "'Indie Flower', cursive");
    text.textContent = label;
    svg.appendChild(text);
  };

  useEffect(() => {
    drawRef.current(baseSeed);
  }, [label, baseSeed]);

  const handleMouseEnter = () => {
    if (hoveredRef.current) return;
    hoveredRef.current = true;
    let frame = 0;
    animRef.current = setInterval(() => {
      if (!hoveredRef.current) return;
      frame++;
      drawRef.current(baseSeed + (frame % 3));
    }, 120);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = false;
    if (animRef.current) {
      clearInterval(animRef.current);
      animRef.current = null;
    }
    drawRef.current(baseSeed);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer', display: 'inline-block', lineHeight: 0 }}
    >
      <svg
        ref={svgRef}
        width={W}
        height={H}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default RoughButton;
