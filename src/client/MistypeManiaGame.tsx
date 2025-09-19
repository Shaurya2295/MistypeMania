import React, { useState, useEffect, useCallback } from 'react';
import { InstructionPanel } from './components/InstructionPanel';
import { ModeSelection } from './components/ModeSelection';
import { GamePlay } from './components/GamePlay';
import { GameMode, GameState, GameWords } from './types/game';

const gameWords: GameWords = {
  easy: ['apple', 'table', 'bolt', 'chair', 'plant', 'grape', 'reddit', 'cloud', 'brick', 'glass'],
  medium: ['velvet', 'spiral', 'marble', 'fusion', 'canyon', 'hazard', 'riddle', 'violet', 'legend', 'pickle'],
  pro: ['vortexes', 'snapshot', 'wildfire', 'clifftop', 'jugglers', 'overkill', 'backspin', 'quicksand', 'feedback', 'dynamics']
};

export const MistypeManiaGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('instructions');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStartGame = () => {
    setGameState('modeSelection');
  };

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setGameState('playing');
    setCurrentWordIndex(0);
    setScore(0);
  };

  const handleCorrectAnswer = () => {
    setScore(prev => prev + 1);
    if (selectedMode && currentWordIndex < gameWords[selectedMode].length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Game completed
      setGameState('gameOver');
    }
  };

  const handleBackToMenu = () => {
    setGameState('modeSelection');
    setSelectedMode(null);
    setCurrentWordIndex(0);
    setScore(0);
  };

  const handleRestart = () => {
    setGameState('instructions');
    setSelectedMode(null);
    setCurrentWordIndex(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {gameState === 'instructions' && (
        <InstructionPanel onStartGame={handleStartGame} />
      )}
      
      {gameState === 'modeSelection' && (
        <ModeSelection onModeSelect={handleModeSelect} />
      )}
      
      {gameState === 'playing' && selectedMode && (
        <GamePlay
          mode={selectedMode}
          currentWord={gameWords[selectedMode][currentWordIndex]}
          wordIndex={currentWordIndex}
          totalWords={gameWords[selectedMode].length}
          score={score}
          onCorrectAnswer={handleCorrectAnswer}
          onBackToMenu={handleBackToMenu}
        />
      )}
      
      {gameState === 'gameOver' && selectedMode && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md w-full border border-white/20">
            <h2 className="text-4xl font-bold mb-4 text-yellow-400" style={{ fontFamily: 'Cherry Bomb One, cursive' }}>
              Game Complete!
            </h2>
            <p className="text-xl mb-2" style={{ fontFamily: 'Varela Round, sans-serif' }}>
              Final Score: {score}/{gameWords[selectedMode].length}
            </p>
            <p className="text-lg mb-6 text-gray-300" style={{ fontFamily: 'Varela Round, sans-serif' }}>
              Mode: {selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleBackToMenu}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{ fontFamily: 'Varela Round, sans-serif' }}
              >
                Play Again
              </button>
              <button
                onClick={handleRestart}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{ fontFamily: 'Varela Round, sans-serif' }}
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};