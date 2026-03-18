import styled from 'styled-components';

export const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  width: 100%;
`;

export const KeyboardRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const KeyWrapper = styled.div<{ $disabled: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  margin: 2px;
  display: inline-block;
  line-height: 0;
`;

export const KeySvg = styled.svg`
  pointer-events: none;
  transition: transform 0.15s ease;
`;
