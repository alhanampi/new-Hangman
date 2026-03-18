import { useEffect, useRef } from 'react';
import rough from 'roughjs';

type DrawingProps = {
  numberOfGuesses: number;
};

const OPTIONS = { stroke: 'white', strokeWidth: 3, roughness: 1.8, seed: 42 };
const HEAD_OPTIONS = { ...OPTIONS, fill: 'none', fillStyle: 'solid' as const };

// animation for the stick man
function animatePaths(g: Element, duration = 500) {
  g.querySelectorAll('path').forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    // Double rAF ensures initial state is painted before transition starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`;
        path.style.strokeDashoffset = '0';
      });
    });
  });
}

const Drawing = ({ numberOfGuesses }: DrawingProps) => {
  //using svgs for the stick man
  const svgRef = useRef<SVGSVGElement>(null);
  const prevGuessesRef = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Gallows — always static
    svg.appendChild(rc.line(20, 380, 230, 380, OPTIONS));
    svg.appendChild(rc.line(70, 380, 70, 10, OPTIONS));
    svg.appendChild(rc.line(70, 10, 190, 10, OPTIONS));
    svg.appendChild(rc.line(190, 10, 190, 55, OPTIONS));

    const prev = prevGuessesRef.current;
    prevGuessesRef.current = numberOfGuesses;

    const parts = [
      () => rc.circle(190, 80, 50, HEAD_OPTIONS), // head
      () => rc.line(190, 105, 190, 200, OPTIONS), // body
      () => rc.line(190, 130, 245, 175, OPTIONS), // right arm
      () => rc.line(190, 130, 135, 175, OPTIONS), // left arm
      () => rc.line(190, 200, 240, 260, OPTIONS), // right leg
      () => rc.line(190, 200, 140, 260, OPTIONS), // left leg
    ];

    // Previously visible parts — no animation
    parts.slice(0, Math.min(numberOfGuesses, prev)).forEach((draw) => {
      svg.appendChild(draw());
    });

    // New part — animate
    if (numberOfGuesses > prev) {
      const newPart = parts[numberOfGuesses - 1]?.();
      if (newPart) {
        svg.appendChild(newPart);
        animatePaths(newPart);
      }
    }
  }, [numberOfGuesses]);

  return <svg ref={svgRef} width="300" height="400" />;
};

export default Drawing;
