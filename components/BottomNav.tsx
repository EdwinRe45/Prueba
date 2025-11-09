
import React from 'react';
import { Screen } from '../types';
import { HomeIcon, ProgressIcon, ChallengeIcon, CommunityIcon, CreateIcon } from './icons';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  screen: Screen;
  Icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ screen, Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/5 pt-2 pb-1 text-xs transition-colors duration-200 ${
      isActive ? 'text-violet-600' : 'text-gray-500 hover:text-violet-500'
    }`}
  >
    <Icon className="w-7 h-7 mb-1" />
    <span>{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: Screen.Home, Icon: HomeIcon, label: 'Inicio' },
    { screen: Screen.Progress, Icon: ProgressIcon, label: 'Progreso' },
    { screen: Screen.Challenge, Icon: ChallengeIcon, label: 'Reto' },
    { screen: Screen.Community, Icon: CommunityIcon, label: 'Comunidad' },
    { screen: Screen.Create, Icon: CreateIcon, label: 'Crear' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-t-lg rounded-b-[32px]">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => (
          <NavItem
            key={item.screen}
            screen={item.screen}
            Icon={item.Icon}
            label={item.label}
            isActive={activeScreen === item.screen}
            onClick={() => setActiveScreen(item.screen)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
