import React, { useState, useEffect, useCallback } from 'react';
import { GameMode } from '../types/game';
import { VirtualKeyboard } from './VirtualKeyboard';
import { Timer } from './Timer';
import { FeedbackModal } from './FeedbackModal';

interface GamePlayProps {
  mode: GameMode;
  currentWord: string;
  wordIndex: number;
  totalWords: number;
  score: number;
  onCorrectAnswer: () => void;
  onBackToMenu: () => void;
}

const timeConfig = {
  easy: 15,
  medium: 12,
  pro: 10
};

const encouragingComments = [
  "Great job! 🎉",
  "Awesome! 🌟",
  "Perfect! ✨",
  "Brilliant! 🚀",
  "Excellent! 🎯",
  "Amazing! 💫",
  "Fantastic! 🔥",
  "Outstanding! ⭐"
];

const retryComments = [
  "Almost there! Try again! 💪",
  "So close! Give it another shot! 🎯",
  "Don't give up! You've got this! 🌟",
  "Keep trying! You're learning! 📚",
  "Nice attempt! Try once more! 🚀",
  "Good effort! One more time! ✨",
  "You're getting better! Try again! 🔥",
  "Practice makes perfect! 💫"
];

export const GamePlay: React.FC<GamePlayProps> = ({
  mode,
  currentWord,
  wordIndex,
  totalWords,
  score,
  onCorrectAnswer,
  onBackToMenu
}) => {
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(timeConfig[mode]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | 'timeout'>('correct');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [keyboardLayout, setKeyboardLayout] = useState<string[]>([]);

  // Disable physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Add event listeners to disable all keyboard input
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
    document.addEventListener('keypress', handleKeyPress, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
      document.removeEventListener('keypress', handleKeyPress, true);
    };
  }, []);

  // Generate random keyboard layout
  const generateKeyboardLayout = useCallback(() => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setKeyboardLayout(shuffled);
  }, []);

  // Initialize keyboard layout
  useEffect(() => {
    generateKeyboardLayout();
  }, [generateKeyboardLayout, currentWord]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeout();
    }
  }, [timeLeft, showFeedback]);

  // Reset timer when word changes
  useEffect(() => {
    setTimeLeft(timeConfig[mode]);
    setUserInput('');
  }, [currentWord, mode]);

  const handleTimeout = () => {
    setFeedbackType('timeout');
    setFeedbackMessage("Time's up! ⏰");
    setShowFeedback(true);
    generateKeyboardLayout(); // Randomize keyboard on timeout
  };

  const checkAnswer = (input: string) => {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedWord = currentWord.toLowerCase();
    
    // Check if input is different from original word
    if (normalizedInput === normalizedWord) {
      return false; // Same as original word, not allowed
    }
    
    // Check if input contains all letters from original word
    const wordLetters = normalizedWord.split('').sort();
    const inputLetters = normalizedInput.split('').sort();
    
    return JSON.stringify(wordLetters) === JSON.stringify(inputLetters);
  };

  const handleSubmit = () => {
    if (userInput.trim() === '') return;
    
    const isCorrect = checkAnswer(userInput);
    
    if (isCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage(encouragingComments[Math.floor(Math.random() * encouragingComments.length)]);
      setShowFeedback(true);
    } else {
      setFeedbackType('incorrect');
      setFeedbackMessage(retryComments[Math.floor(Math.random() * retryComments.length)]);
      setShowFeedback(true);
      generateKeyboardLayout(); // Randomize keyboard on wrong answer
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === 'BACKSPACE') {
      setUserInput(prev => prev.slice(0, -1));
    } else if (key === 'ENTER') {
      handleSubmit();
    } else {
      setUserInput(prev => prev + key);
    }
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    if (feedbackType === 'correct') {
      onCorrectAnswer();
    } else {
      setUserInput('');
      setTimeLeft(timeConfig[mode]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBackToMenu}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl transition-colors duration-300"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          ← Back
        </button>
        <div className="text-center" style={{ fontFamily: 'Varela Round, sans-serif' }}>
          <p className="text-lg">Word {wordIndex + 1} of {totalWords}</p>
          <p className="text-sm text-gray-300">Score: {score}</p>
        </div>
        <div className="text-right" style={{ fontFamily: 'Varela Round, sans-serif' }}>
          <p className="text-sm text-gray-300 capitalize">{mode} Mode</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <Timer timeLeft={timeLeft} totalTime={timeConfig[mode]} />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-yellow-400" style={{ fontFamily: 'Cherry Bomb One, cursive' }}>
            Misspell this word:
          </h2>
          
          <div className="text-center mb-6">
            <span className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent" 
                  style={{ fontFamily: 'Cherry Bomb One, cursive' }}>
              {currentWord.toUpperCase()}
            </span>
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              value={userInput}
              readOnly
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-xl text-center text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-default"
              placeholder="Use the virtual keyboard below..."
              style={{ fontFamily: 'Varela Round, sans-serif' }}
              maxLength={currentWord.length * 2}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed"
            style={{ fontFamily: 'Varela Round, sans-serif' }}
          >
            Submit Answer
          </button>
        </div>
        
        <VirtualKeyboard layout={keyboardLayout} onKeyPress={handleKeyPress} />
      </div>

      {showFeedback && (
        <FeedbackModal
          type={feedbackType}
          message={feedbackMessage}
          onClose={handleFeedbackClose}
          showNext={feedbackType === 'correct'}
        />
      )}
    </div>
  );
};