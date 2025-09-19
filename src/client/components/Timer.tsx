import React from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 3;
  
  return (
    <div className="w-full max-w-md mb-6">
      <div className="flex justify-between items-center mb-2" style={{ fontFamily: 'Varela Round, sans-serif' }}>
        <span className="text-sm text-gray-300">Time Left</span>
        <span className={`text-lg font-bold ${isUrgent ? 'text-red-400 animate-pulse' : 'text-white'}`}>
          {timeLeft}s
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${
            isUrgent 
              ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
              : percentage > 50 
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : percentage > 25
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};