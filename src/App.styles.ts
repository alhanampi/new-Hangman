import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    background-color: rgb(37, 37, 37);
    color: white;
    font-family: 'Indie Flower', cursive;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const AppContainer = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
  align-items: center;
  padding: 0.75rem;
  font-family: 'Give You Glory', cursive;

  @media (min-width: 480px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.3rem, 7vw, 3rem);
`;

export const GameOver = styled.div`
  font-size: clamp(0.85rem, 4vw, 1.5rem);
  font-weight: bold;
  font-family: 'Indie Flower', cursive;
  text-align: center;
`;

export const LostWord = styled.span`
  font-size: clamp(1.1rem, 5.5vw, 3rem);
`;

export const RestartButton = styled.button`
  display: inline-block;
  margin-left: 1rem;
  font-size: 1%.5;
  padding: 0.5rem 1rem;
  cursor: 'pointer';
  font-weight: bold;
  font-family: 'Indie Flower', cursive;
`;
