import styled from 'styled-components';

export const WordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
`;

export const Letter = styled.span`
  font-size: clamp(1.2rem, 5vw, 2rem);
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 3px solid white;
  padding: 0 0.25rem;
  min-width: clamp(1rem, 4vw, 1.5rem);
  text-align: center;
`;
