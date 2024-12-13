import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import MultiplayerScoreBoard from '../components/MultiplayerScoreBoard';
import PickYourChoice from '../components/PickYourChoice';
import RockChoice from '../components/RockChoice';
import PaperChoice from '../components/PaperChoice';
import ScissorChoice from '../components/ScissorChoice';
import PlayAgain from '../components/PlayAgain';

const socket = io('http://localhost:4000');

const MultiplayerGame = () => {
  const [role, setRole] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerChoice, setPlayerChoice] = useState('');
  const [opponentChoice, setOpponentChoice] = useState('');
  const [result, setResult] = useState('');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [showChoices, setShowChoices] = useState(true);

  const navigate = useNavigate();

  const buttonHover = 'hover:scale-110 transition duration-300';

  useEffect(() => {
    if (hasJoined) {
      socket.emit('joinGame', playerName);

      socket.on('playerAssigned', (assignedRole) => setRole(assignedRole));

      socket.on('gameStart', ([p1Name, p2Name]) => {
        setGameStarted(true);
        setPlayer1Name(p1Name);
        setPlayer2Name(p2Name);
      });

      socket.on('roundResult', ({ result, choices, scores }) => {
        setResult(result);
        setPlayerChoice(choices[socket.id]);
        setOpponentChoice(Object.values(choices).find(choice => choice !== choices[socket.id]));
        setScores(scores);
        setShowChoices(false);
      });

      socket.on('playerDisconnected', () => {
        setGameStarted(false);
        setResult('Opponent disconnected.');
      });

      return () => socket.disconnect();
    }
  }, [hasJoined, playerName]);

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
    socket.emit('playerChoice', { choice });
  };

  const resetGame = () => {
    if (scores.player1 === 5 || scores.player2 === 5) {
      navigate('/'); // Navigate to MainMenu.jsx
    } else {
      setResult('');
      setPlayerChoice('');
      setOpponentChoice('');
      setShowChoices(true);
      socket.emit('readyForNewRound');
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

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  // Add keyboard triggers for Rock, Paper, Scissors, and Play Again
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
      } else if (!showChoices && event.key === ' ') {
        resetGame();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [showChoices, scores]);

  return (
    <div className="bg-OilBlack h-[100vh] w-[100vw] flex flex-col items-center text-OilBlack font-Bebas">
      {!hasJoined ? (
        <div className="flex flex-col items-center justify-center h-full">
          <input
            className="mb-4 p-2 text-lg"
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            className="p-2 px-6 bg-white text-OilBlack hover:bg-gray-300 text-lg"
            onClick={() => setHasJoined(true)}
          >
            Join Game
          </button>
        </div>
      ) : gameStarted ? (
        <>
          <p className="text-lg text-center mt-4 text-white">You are {role === 'player1' ? 'Player 1' : 'Player 2'}</p>
          <MultiplayerScoreBoard
            playerOneName={player1Name}
            playerTwoName={player2Name}
            playerOneScore={scores.player1}
            playerTwoScore={scores.player2}
          />
          {showChoices ? (
            <>
              <PickYourChoice />
              <div className="mt-8 h-56 w-3/6 px-10 flex items-center justify-between">
                <button onMouseEnter={() => playAudio('/rock.mp3')} className={buttonHover} onClick={() => handleChoice('Rock')}>
                  <RockChoice />
                </button>
                <button onMouseEnter={() => playAudio('/paper.mp3')} className={buttonHover} onClick={() => handleChoice('Paper')}>
                  <PaperChoice />
                </button>
                <button onMouseEnter={() => playAudio('/scissors.mp3')} className={buttonHover} onClick={() => handleChoice('Scissors')}>
                  <ScissorChoice />
                </button>
              </div>
            </>
          ) : (
            <div className="h-96 w-3/6 mt-8 font-Bebas flex">
              <div className="h-full w-2/4 flex items-center justify-center">
                {renderChoice(playerChoice)}
              </div>
              <div className="h-full w-2/4 flex flex-col items-center justify-center">
                <p className="tracking-wide text-6xl text-center text-white mb-5">{result}</p>
                <PlayAgain 
                  onClick={resetGame} 
                  text={scores.player1 === 5 || scores.player2 === 5 ? 'Back to Menu' : 'Play Again'} 
                />
              </div>
              <div className="h-full w-2/4 flex items-center justify-center">
                {renderChoice(opponentChoice)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-24 text-white">
          <h2>Waiting for opponent to join...</h2>
        </div>
      )}
    </div>
  );
};

export default MultiplayerGame;
