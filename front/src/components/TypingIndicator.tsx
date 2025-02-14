import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <>
      <div className="flex items-center mt-2">
        <span
          className="w-2 h-2 bg-gray-800 rounded-full animate-blink"
          style={{ animationDelay: '0s' }}
        ></span>
        <span
          className="w-2 h-2 bg-gray-800 rounded-full animate-blink mx-1"
          style={{ animationDelay: '0.2s' }}
        ></span>
        <span
          className="w-2 h-2 bg-gray-800 rounded-full animate-blink"
          style={{ animationDelay: '0.4s' }}
        ></span>
      </div>
      <style>{`
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .animate-blink {
          animation: blink 1.4s infinite both;
        }
      `}</style>
    </>
  );
};

export default TypingIndicator;
