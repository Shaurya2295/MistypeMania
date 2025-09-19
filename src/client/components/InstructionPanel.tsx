import React from 'react';

interface InstructionPanelProps {
  onStartGame: () => void;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({ onStartGame }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-4xl w-full border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2" 
              style={{ fontFamily: 'Cherry Bomb One, cursive' }}>
            MistypeMania
          </h1>
          <p className="text-lg md:text-xl text-gray-300" style={{ fontFamily: 'Varela Round, sans-serif' }}>
            The Ultimate Word Misspelling Challenge!
          </p>
        </div>
        
        {/* Game Instructions Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6" style={{ fontFamily: 'Varela Round, sans-serif' }}>
          {/* How to Play */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h2 className="text-lg font-bold mb-2 text-yellow-400">How to Play</h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              <span className="text-pink-400 font-bold">Misspell</span> the given word using 
              <span className="text-green-400 font-bold"> all the same letters</span>!
            </p>
          </div>
          
          {/* Example */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="text-lg font-bold mb-2 text-blue-400">Example</h3>
            <div className="text-sm text-gray-200">
              <div className="mb-1">Word: <span className="text-white font-bold">APPLE</span></div>
              <div className="text-green-400 text-xs">✓ PLEAP, PPLEA</div>
              <div className="text-red-400 text-xs">✗ APLE (missing letters)</div>
            </div>
          </div>
          
          {/* Features */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-bold mb-2 text-purple-400">Features</h3>
            <div className="text-sm text-gray-200 space-y-1">
              <div>🎹 Randomized keyboard</div>
              <div>⏱️ Timed challenges</div>
              <div>🏆 Progressive difficulty</div>
            </div>
          </div>
        </div>
        
        {/* Difficulty Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-3 text-center border border-green-500/30">
            <div className="text-2xl mb-1">🌱</div>
            <div className="text-sm font-bold text-green-400" style={{ fontFamily: 'Varela Round, sans-serif' }}>Easy</div>
            <div className="text-xs text-gray-300" style={{ fontFamily: 'Varela Round, sans-serif' }}>15 seconds</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl p-3 text-center border border-yellow-500/30">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-sm font-bold text-yellow-400" style={{ fontFamily: 'Varela Round, sans-serif' }}>Medium</div>
            <div className="text-xs text-gray-300" style={{ fontFamily: 'Varela Round, sans-serif' }}>12 seconds</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-xl p-3 text-center border border-red-500/30">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm font-bold text-red-400" style={{ fontFamily: 'Varela Round, sans-serif' }}>Pro</div>
            <div className="text-xs text-gray-300" style={{ fontFamily: 'Varela Round, sans-serif' }}>10 seconds</div>
          </div>
        </div>
        
        {/* Play Button */}
        <button
          onClick={onStartGame}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          Let's Play! 🚀
        </button>
      </div>
    </div>
  );
};