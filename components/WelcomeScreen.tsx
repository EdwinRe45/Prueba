import React from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <div className="bg-violet-800 h-full w-full flex flex-col items-center justify-around text-white p-8 text-center">
      <div />
      
      <div className="flex flex-col items-center">
        <img
          src="https://i.imgur.com/vz3fo11.png"
          alt="App Mascot"
          className="w-40 h-40 rounded-full object-cover border-4 border-violet-400 shadow-lg mb-6"
        />
        <h1 className="text-5xl font-extrabold tracking-wider" style={{ fontFamily: "'Nunito', sans-serif" }}>
          SketchWise
        </h1>
        <p className="text-violet-200 mt-2">¡Roba como un artista!</p>
        
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={onEnter}
          className="w-full bg-white text-violet-800 font-bold py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          Entrar
        </button>
        <button
          className="w-full bg-transparent border-2 border-violet-400 text-violet-200 font-bold py-3 rounded-full hover:bg-violet-700 hover:text-white transition-colors duration-300 text-md"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;