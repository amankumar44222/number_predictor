import React, { useState } from 'react';

function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function handleInputChange(event) {
    setGuess(event.target.value);
  }

  function handleGuess() {
    if (gameOver) return;

    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 10) {
      setMessage('Please enter a number between 1 and 10.');
      return;
    }

    setAttempts(attempts + 1);

    if (guessNumber === targetNumber) {
      setMessage('Congratulations! You guessed the number!');
      setGameOver(true);
    } else if (attempts >= 4) {
      setMessage(`Sorry, you've used all your attempts. The number was ${targetNumber}.`);
      setGameOver(true);
    } else {
      setMessage(guessNumber > targetNumber ? 'Too high!' : 'Too low!');
    }

    setGuess('');
  }

  function handleReplay() {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setAttempts(0);
    setMessage('');
    setGameOver(false);
  }

  return (
    <div className="game-container">
      <div className="instructions">
        <h2>Instructions</h2>
        <p>Guess a number between 1 and 10.</p>
        <p>You have 5 attempts to guess the correct number.</p>
        <p>Good luck!</p>
      </div>
      <div className="game">
        <h1>Guess the Number</h1>
        <input 
          type="number" 
          value={guess} 
          onChange={handleInputChange} 
          disabled={gameOver} 
          aria-label="Enter your guess"
        />
        <button onClick={handleGuess} disabled={gameOver}>Guess</button>
        <p>{message}</p>
        <p>Attempts: {attempts}/5</p>
        {gameOver && <button onClick={handleReplay}>Replay</button>}
      </div>
    </div>
  );
}

export default GuessTheNumber;
