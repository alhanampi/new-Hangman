import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { KeyboardContainer, KeyboardRow, KeyWrapper, KeySvg } from './Keyboard.styles';

const rows = ['qwertyuiop'.split(''), 'asdfghjkl'.split(''), 'zxcvbnm'.split('')];

function calcKeySize(containerWidth: number) {
  // 10 keys in the widest row; 4px total margin per key (2px each side)
  return Math.min(60, Math.max(20, Math.floor(containerWidth / 10) - 4));
}

type RoughKeyProps = {
  char: string;
  isActive: boolean;
  isInactive: boolean;
  disabled: boolean;
  keySize: number;
  onClick: () => void;
};

const RoughKey = ({ char, isActive, isInactive, disabled, keySize, onClick }: RoughKeyProps) => {
  const W = keySize,
    H = keySize;
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveredRef = useRef(false);
  const baseSeed = char.charCodeAt(0);

  // drawRef evita closures stale en el intervalo de hover
  const drawRef = useRef<(seed: number) => void>(() => {});
  drawRef.current = (seed: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = '';

    const rc = rough.svg(svg);
    const fillColor = isActive
      ? 'rgb(34, 160, 90)'
      : isInactive
        ? 'rgb(71, 71, 71)'
        : 'rgb(140, 138, 138)';
    const strokeColor = isInactive ? 'rgb(110, 110, 110)' : 'white';

    svg.appendChild(
      rc.rectangle(4, 4, W - 8, H - 8, {
        stroke: strokeColor,
        strokeWidth: 2,
        roughness: 1.8,
        fill: fillColor,
        fillStyle: 'solid',
        seed,
      })
    );

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', String(W / 2));
    text.setAttribute('y', String(H / 2));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.setAttribute('fill', isInactive ? 'rgba(255,255,255,0.35)' : 'white');
    text.setAttribute('font-size', String(Math.max(13, Math.round(W * 0.38))));
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('font-family', "'Indie Flower', cursive");
    text.textContent = char.toUpperCase();
    svg.appendChild(text);
  };

  useEffect(() => {
    drawRef.current(baseSeed);
  }, [char, isActive, isInactive, disabled, baseSeed, keySize]);

  const handleMouseEnter = () => {
    if (disabled || hoveredRef.current) return;
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
    <KeyWrapper
      $disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <KeySvg ref={svgRef} width={W} height={H} />
    </KeyWrapper>
  );
};

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

const Keyboard = ({
  disabled,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: KeyboardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [keySize, setKeySize] = useState(() => calcKeySize(window.innerWidth));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setKeySize(calcKeySize(entry.contentRect.width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <KeyboardContainer ref={containerRef}>
      {rows.map((row, i) => (
        //map the amount of letters in the word
        <KeyboardRow key={i}>
          {row.map((char) => (
            <RoughKey
              key={char}
              char={char}
              isActive={activeLetters.includes(char)}
              isInactive={inactiveLetters.includes(char)}
              disabled={
                !!(disabled || activeLetters.includes(char) || inactiveLetters.includes(char))
              }
              keySize={keySize}
              onClick={() => addGuessedLetter(char)}
            />
          ))}
        </KeyboardRow>
      ))}
    </KeyboardContainer>
  );
};

export default Keyboard;
