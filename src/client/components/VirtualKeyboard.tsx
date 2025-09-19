import React from 'react';

interface VirtualKeyboardProps {
  layout: string[];
  onKeyPress: (key: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ layout, onKeyPress }) => {
  const handleKeyClick = (key: string) => {
    // Add ripple effect
    onKeyPress(key);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-10 gap-2 mb-3">
        {layout.slice(0, 10).map((letter) => (
          <button
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 active:bg-white/40 text-sm"
            style={{ fontFamily: 'Varela Round, sans-serif' }}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-9 gap-2 mb-3 px-4">
        {layout.slice(10, 19).map((letter) => (
          <button
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 active:bg-white/40 text-sm"
            style={{ fontFamily: 'Varela Round, sans-serif' }}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-9 gap-2 px-8">
        <button
          onClick={() => handleKeyClick('ENTER')}
          className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-xs"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          ENTER
        </button>
        
        {layout.slice(19, 26).map((letter) => (
          <button
            key={letter}
            onClick={() => handleKeyClick(letter)}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 active:bg-white/40 text-sm"
            style={{ fontFamily: 'Varela Round, sans-serif' }}
          >
            {letter.toUpperCase()}
          </button>
        ))}
        
        <button
          onClick={() => handleKeyClick('BACKSPACE')}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-xs"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          ⌫
        </button>
      </div>
    </div>
  );
};