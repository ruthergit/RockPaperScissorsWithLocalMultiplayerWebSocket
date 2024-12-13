import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotGameScoreBoard from '../components/BotGameScoreBoard';
import PickYourChoice from '../components/PickYourChoice';
import RockChoice from '../components/RockChoice';
import PaperChoice from '../components/PaperChoice';
import ScissorChoice from '../components/ScissorChoice';

const BotGame = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [botChoice, setBotChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [showChoices, setShowChoices] = useState(true);

  const navigate = useNavigate();

  const choices = ['Rock', 'Paper', 'Scissors'];
  const buttonHover = 'hover:scale-110 transition duration-300';

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handleChoice = (choice) => {
    const botRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setBotChoice(botRandomChoice);
    determineResult(choice, botRandomChoice);
    setShowPlayAgain(true);
    setShowChoices(false);
  };

  const determineResult = (player, bot) => {
    if (player === bot) {
      setResult('Tie');
    } else if (
      (player === 'Rock' && bot === 'Scissors') ||
      (player === 'Paper' && bot === 'Rock') ||
      (player === 'Scissors' && bot === 'Paper')
    ) {
      setResult('You Win');
      setPlayerScore(playerScore + 1);
    } else {
      setResult('You Lose');
      setBotScore(botScore + 1);
    }
  };

  const resetGame = () => {
    if (playerScore === 5 || botScore === 5) {
      navigate('/'); // Navigate to MainMenu.jsx
    } else {
      setPlayerChoice('');
      setBotChoice('');
      setResult('');
      setShowPlayAgain(false);
      setShowChoices(true);
    }
  };

  const renderChoice = (choice) => {
    switch (choice) {
      case 'Rock':
        return <RockChoice />;
      case 'Paper':
        return <PaperChoice />;
      case 'Scissors':
        return <ScissorChoice />;
      default:
        return null;
    }
  };

  // Add keyboard listeners for Rock, Paper, Scissors, and Play Again
  useEffect(() => {
    const handleKeydown = (event) => {
      if (showChoices) {
        if (event.key === '1') {
          handleChoice('Rock');
        } else if (event.key === '2') {
          handleChoice('Paper');
        } else if (event.key === '3') {
          handleChoice('Scissors');
        }
      } else if (showPlayAgain && event.key === ' ') {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [showChoices, showPlayAgain, playerScore, botScore]);

  return (
    <div className="bg-OilBlack h-[100vh] w-[100vw] flex flex-col items-center text-white">
      <BotGameScoreBoard playerScore={playerScore} botScore={botScore} />

      {showChoices && (
        <>
          <PickYourChoice />
          <div className="mt-8 h-56 w-3/6 px-10 flex items-center justify-between">
            <button
              className={buttonHover}
              onMouseEnter={() => playAudio('/rock.mp3')}
              onClick={() => handleChoice('Rock')}
            >
              <RockChoice />
            </button>
            <button
              className={buttonHover}
              onMouseEnter={() => playAudio('/paper.mp3')}
              onClick={() => handleChoice('Paper')}
            >
              <PaperChoice />
            </button>
            <button
              className={buttonHover}
              onMouseEnter={() => playAudio('/scissors.mp3')}
              onClick={() => handleChoice('Scissors')}
            >
              <ScissorChoice />
            </button>
          </div>
        </>
      )}

      {result && (
        <div className="h-96 w-3/6 mt-8 font-Bebas flex">
          <div className="h-full w-2/4 flex items-center justify-center">
            {renderChoice(playerChoice)}
          </div>
          <div className="h-full w-2/4 flex flex-col items-center justify-center">
            <p className="tracking-wide text-6xl text-center">{result}</p>
            {showPlayAgain && (
              <button
                className="mt-2 pt-3 pb-1 px-6 bg-white text-OilBlack hover:bg-gray-300 text-4xl"
                onClick={resetGame}
              >
                {playerScore === 5 || botScore === 5 ? 'Back to Menu' : 'Play Again'}
              </button>
            )}
          </div>
          <div className="h-full w-2/4 flex items-center justify-center">
            {renderChoice(botChoice)}
          </div>
        </div>
      )}
    </div>
  );
};

export default BotGame;
