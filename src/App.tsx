import { useCallback, useEffect, useState } from 'react';
import words from './assets/randomWords.json';
import Drawing from './components/Drawing/Drawing';
import WordToGuess from './components/WordToGuess/WordToGuess';
import Keyboard from './components/Keyboard/Keyboard';
import { GlobalStyle, AppContainer, Title, GameOver, LostWord } from './App.styles';
import RoughButton from './components/RoughButton/RoughButton';

function App() {
  // making the words random:
  const [wordsArray, setWordsArray] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  const incorrectLetters = usedLetters.filter((letter) => !wordsArray.includes(letter));
  //win/lose cases:
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordsArray.split('').every((letter) => usedLetters.includes(letter));
  const disabled = isLoser || isWinner;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (usedLetters.includes(letter)) return;
      setUsedLetters((currentLetters) => [...currentLetters, letter]);
      console.log(letter);
    },
    [usedLetters, isLoser, isWinner]
  );

  const restart = () => {
    setUsedLetters([]);
    setWordsArray(words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [addGuessedLetter]);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>Hangman!</Title>

        <GameOver>
          {isWinner ? (
            '🎉 You won! 🎉'
          ) : isLoser ? (
            <>
              😢 You lost! 😢 The word was: <LostWord>{wordsArray}</LostWord>
            </>
          ) : null}
        </GameOver>
        {disabled && <RoughButton label="Play again" onClick={restart} />}
        <Drawing numberOfGuesses={incorrectLetters.length} />
        <WordToGuess guessedLetters={usedLetters} wordToGuess={wordsArray} reveal={false} />
        <Keyboard
          activeLetters={usedLetters.filter((letter) => wordsArray.includes(letter))}
          inactiveLetters={incorrectLetters}
          disabled={disabled}
          addGuessedLetter={addGuessedLetter}
        />
      </AppContainer>
    </>
  );
}

export default App;
