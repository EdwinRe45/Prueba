import React from 'react';
import { PencilIcon, ChevronDownIcon, FireIcon } from './icons';

interface HomeScreenProps {
  onProfileClick: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onProfileClick }) => {
  return (
    <div className="p-6 space-y-6 text-gray-800">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-violet-800">SketchWise</h1>
          <p className="text-gray-500">¡Hola, artista!</p>
        </div>
        <button onClick={onProfileClick} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
          <img src="https://i.imgur.com/vz3fo11.png" alt="GatoWise profile" className="w-14 h-14 rounded-full object-cover" />
        </button>
      </header>

      <div className="bg-white p-5 rounded-2xl shadow-md flex items-center space-x-4">
        <img src="https://i.imgur.com/7Ebrdf2.png" alt="GatoWise posando" className="w-20 h-20 rounded-lg object-contain flex-shrink-0" />
        <div>
          <p className="font-bold text-lg">¿Listx? Prueba el reto diario de hoy 
            <span role="img" aria-label="paint" className="inline-block mx-1">🎨</span>
            <span role="img" aria-label="pencil" className="inline-block">🖌️</span>
          </p>
        </div>
      </div>

      <button className="w-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-lg">
        Reto diario <span className="font-normal text-sm block -mt-1">10 min: cambia la expresión</span>
      </button>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Tu progreso reciente</h2>
          <button className="text-sm text-gray-500 flex items-center">
            Último mes <ChevronDownIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1/3 h-24 bg-gray-200 rounded-xl overflow-hidden">
                <img src={`https://picsum.photos/150/150?random=${i}`} alt="Recent drawing" className="w-full h-full object-contain" />
            </div>
          ))}
          <div className="w-1/4 h-24 bg-red-100 rounded-xl flex flex-col items-center justify-center text-red-500">
            <FireIcon className="w-8 h-8"/>
            <p className="font-bold text-lg">5</p>
            <p className="text-xs">días</p>
          </div>
        </div>
      </section>

      <section className="bg-violet-600 text-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-2">Escaneo IA</h3>
        <p className="text-violet-100 mb-4">“Detecté 2 repeticiones en la forma que dibujas los ojos en tus últimos dibujos”</p>
        <button className="w-full bg-white text-violet-600 font-bold py-3 rounded-full hover:bg-violet-100 transition-colors duration-300">
          Ver variantes
        </button>
      </section>
      
      <section className="bg-teal-500 text-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-2">Tip del Día ✨</h3>
        <p className="text-teal-100">"No temas a la perfección, nunca la alcanzarás." - Salvador Dalí. ¡Concéntrate en practicar y disfrutar el proceso!</p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Artistas Destacados</h2>
        <div className="space-y-3">
            {[
                { name: 'Leo Da Vinci', id: 101 },
                { name: 'Frida Dibujos', id: 102 },
                { name: 'Van Gogh Art', id: 103 },
            ].map(artist => (
                <div key={artist.id} className="bg-white p-3 rounded-xl shadow-md flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={`https://picsum.photos/50/50?random=${artist.id}`} alt={artist.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="font-semibold">{artist.name}</p>
                            <p className="text-xs text-gray-500">Ver perfil</p>
                        </div>
                    </div>
                    <button className="bg-violet-100 text-violet-600 font-bold py-1 px-4 text-sm rounded-full hover:bg-violet-200 transition-colors duration-300">
                        Seguir
                    </button>
                </div>
            ))}
        </div>
      </section>

      <section className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <img src="https://picsum.photos/50/50?random=10" alt="Suggestion" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="font-semibold">Prueba inclinar la cabeza</p>
          </div>
        </div>
        <button className="bg-violet-600 text-white font-bold py-2 px-6 rounded-full hover:bg-violet-700 transition-colors duration-300">
          Aplicar
        </button>
      </section>
    </div>
  );
};

export default HomeScreen;