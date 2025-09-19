import React from 'react';
import { GameMode } from '../types/game';

interface ModeSelectionProps {
  onModeSelect: (mode: GameMode) => void;
}

const modeConfig = {
  easy: {
    title: 'Easy',
    time: '15 seconds',
    description: 'Simple words, more time to think',
    color: 'from-green-500 to-emerald-600',
    hoverColor: 'from-green-600 to-emerald-700',
    icon: '🌱'
  },
  medium: {
    title: 'Medium',
    time: '12 seconds',
    description: 'Moderate challenge, balanced gameplay',
    color: 'from-yellow-500 to-orange-600',
    hoverColor: 'from-yellow-600 to-orange-700',
    icon: '🔥'
  },
  pro: {
    title: 'Pro',
    time: '10 seconds',
    description: 'Complex words, ultimate challenge',
    color: 'from-red-500 to-pink-600',
    hoverColor: 'from-red-600 to-pink-700',
    icon: '⚡'
  }
};

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2" 
              style={{ fontFamily: 'Cherry Bomb One, cursive' }}>
            Choose Your Challenge
          </h1>
          <p className="text-lg md:text-xl text-gray-300" style={{ fontFamily: 'Varela Round, sans-serif' }}>
            Select your difficulty level and test your misspelling skills!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {(Object.keys(modeConfig) as GameMode[]).map((mode) => {
            const config = modeConfig[mode];
            return (
              <button
                key={mode}
                onClick={() => onModeSelect(mode)}
                className={`bg-gradient-to-br ${config.color} hover:${config.hoverColor} text-white p-6 md:p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl border border-white/20 group`}
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{config.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'Cherry Bomb One, cursive' }}>
                    {config.title}
                  </h2>
                  <div className="space-y-2 md:space-y-3" style={{ fontFamily: 'Varela Round, sans-serif' }}>
                    <p className="text-base md:text-lg font-semibold bg-white/20 rounded-full py-2 px-4 inline-block">
                      {config.time}
                    </p>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed px-2">
                      {config.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-6 bg-white/10 rounded-2xl py-2 md:py-3 px-4 group-hover:bg-white/20 transition-colors duration-300">
                    <span className="text-sm font-medium">Click to Start</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};