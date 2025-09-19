import React, { useEffect } from 'react';

interface FeedbackModalProps {
  type: 'correct' | 'incorrect' | 'timeout';
  message: string;
  onClose: () => void;
  showNext: boolean;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ type, message, onClose, showNext }) => {
  // Disable keyboard shortcuts in modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only allow modal close via click, not keyboard
    };
    
    window.addEventListener('keydown', handleKeyPress, true);
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, []);

  const getModalConfig = () => {
    switch (type) {
      case 'correct':
        return {
          bgColor: 'from-green-500/90 to-emerald-600/90',
          icon: '🎉',
          buttonText: showNext ? 'Next Word' : 'Continue',
          buttonColor: 'from-green-600 to-emerald-700'
        };
      case 'incorrect':
        return {
          bgColor: 'from-orange-500/90 to-red-600/90',
          icon: '🤔',
          buttonText: 'Try Again',
          buttonColor: 'from-orange-600 to-red-700'
        };
      case 'timeout':
        return {
          bgColor: 'from-red-500/90 to-pink-600/90',
          icon: '⏰',
          buttonText: 'Try Again',
          buttonColor: 'from-red-600 to-pink-700'
        };
    }
  };

  const config = getModalConfig();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-br ${config.bgColor} rounded-3xl p-8 max-w-md w-full text-center border border-white/20 shadow-2xl transform animate-in fade-in zoom-in duration-300`}>
        <div className="text-6xl mb-4">{config.icon}</div>
        
        <p className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Varela Round, sans-serif' }}>
          {message}
        </p>
        
        <button
          onClick={onClose}
          className={`w-full bg-gradient-to-r ${config.buttonColor} hover:opacity-90 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg`}
          style={{ fontFamily: 'Varela Round, sans-serif' }}
        >
          {config.buttonText}
        </button>
        
        <p className="text-sm text-white/70 mt-4" style={{ fontFamily: 'Varela Round, sans-serif' }}>
          Click the button to continue
        </p>
      </div>
    </div>
  );
};