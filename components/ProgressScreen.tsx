import React from 'react';
import GatoWise from './GatoWise';
import { FireIcon } from './icons';

const ProgressScreen: React.FC = () => {
  const drawings = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-800">Tu Progreso</h1>
        <div className="flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
          <FireIcon className="w-5 h-5" />
          <span>Racha de 5 días</span>
        </div>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-md flex items-center space-x-4">
        <img src="https://i.imgur.com/e5LE3Na.png" alt="GatoWise celebrando" className="w-16 h-16 rounded-lg object-contain flex-shrink-0" />
        <p className="text-gray-700 font-semibold">¡Buen trabajo! Has practicado 5 días seguidos 🎉</p>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-2">Progreso General</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
            style={{ width: '65%' }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">65% para el siguiente nivel</p>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Historial de Rachas</h2>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center text-sm text-gray-600">
                <p>Mejor racha:</p>
                <p className="font-bold text-violet-600">12 días</p>
            </div>
             <hr className="my-2"/>
             <div className="flex justify-between items-center text-sm text-gray-600">
                <p>Racha actual:</p>
                <p className="font-bold text-red-500">5 días</p>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Galería de Dibujos</h2>
        <div className="grid grid-cols-3 gap-3">
          {drawings.map((id) => (
            <div key={id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img
                src={`https://picsum.photos/200/200?random=${id + 10}`}
                alt={`Dibujo ${id}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressScreen;