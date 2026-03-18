import { WordContainer, Letter } from './WordToGuess.styles';

type WordToGuessProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

const WordToGuess = ({ guessedLetters, wordToGuess, reveal }: WordToGuessProps) => {
  return (
    <WordContainer>
      {wordToGuess.split('').map((letter, index) => (
        <Letter key={index}>{guessedLetters.includes(letter) || reveal ? letter : '_'}</Letter>
      ))}
    </WordContainer>
  );
};

export default WordToGuess;
