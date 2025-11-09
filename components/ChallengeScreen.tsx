import React, { useState } from 'react';
import GatoWise from './GatoWise';

const ChallengeScreen: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const pastChallenges = [
    "Dibuja una fruta con personalidad",
    "Crea un personaje en 30 segundos",
    "Practica la perspectiva con cubos",
    "Usa solo colores fríos",
    "Estudio de manos en 5 minutos"
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-violet-800 mb-4">Reto Diario</h1>

        {!isCompleted ? (
          <div className="w-full max-w-xs">
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <p className="text-lg font-semibold text-gray-700">10 min:</p>
              <p className="text-2xl font-bold text-violet-600">Cambia la expresión del rostro</p>
            </div>
            <button 
              onClick={() => setIsCompleted(true)}
              className="w-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-lg"
            >
              Empezar reto
            </button>
          </div>
        ) : (
          <div className="w-full max-w-xs flex flex-col items-center">
              <img src="https://i.imgur.com/tHHPbJa.png" alt="GatoWise celebrando" className="w-32 h-32 mb-4 rounded-full object-contain bg-violet-100 p-2" />
              <h2 className="text-3xl font-extrabold text-green-500">¡Reto completado! 🏅</h2>
              <p className="text-gray-600 mt-2 mb-8">¡Bien hecho! Sigue así para mejorar cada día.</p>
              <button
                  onClick={() => setIsCompleted(false)}
                  className="w-full bg-violet-600 text-white font-bold py-3 rounded-full hover:bg-violet-700 transition-colors duration-300"
              >
                  Hacer otro reto
              </button>
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Retos Anteriores</h2>
        <div className="space-y-3">
          {pastChallenges.map((challenge, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
              <p className="text-gray-700">{challenge}</p>
              <button className="text-violet-500 text-sm font-semibold hover:text-violet-700">Reintentar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChallengeScreen;