import styled from 'styled-components';

export const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
`;

export const KeyboardRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const KeyWrapper = styled.div<{ $disabled: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  margin: 0.3rem;
  display: inline-block;
  line-height: 0;
`;

export const KeySvg = styled.svg`
  pointer-events: none;
  transition: transform 0.15s ease;
`;
