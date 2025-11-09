import React from 'react';
import { ChevronLeftIcon, Cog6ToothIcon, LanguageIcon, ArrowLeftOnRectangleIcon, ChevronRightIcon } from './icons';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogout }) => {
  const menuItems = [
    { label: 'Configuración de la cuenta', Icon: Cog6ToothIcon },
    { label: 'Idioma', Icon: LanguageIcon },
  ];

  return (
    <div className="bg-slate-50 h-full w-full flex flex-col">
      <header className="flex items-center p-4 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Perfil</h1>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-grow p-6 flex flex-col overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="https://i.imgur.com/vz3fo11.png" 
            alt="User profile" 
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
          />
          <h2 className="text-2xl font-bold text-gray-800">Gato Wise</h2>
          <p className="text-gray-500">papugato@email.com</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm">
          {menuItems.map((item, index) => (
            <button key={item.label} className={`w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-slate-100 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''} first:rounded-t-2xl last:rounded-b-2xl`}>
              <div className="flex items-center">
                <item.Icon className="w-6 h-6 text-violet-600 mr-4" />
                <span className="font-semibold text-gray-700">{item.label}</span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6">
           <button 
             onClick={onLogout} 
             className="w-full flex items-center justify-center bg-red-50 text-red-600 font-bold py-3 px-4 rounded-full hover:bg-red-100 transition-colors duration-300"
           >
             <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-2" />
             Salir
           </button>
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen;
