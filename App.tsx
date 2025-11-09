import React, { useState } from 'react';
import { Screen } from './types';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import ProgressScreen from './components/ProgressScreen';
import ChallengeScreen from './components/ChallengeScreen';
import CommunityScreen from './components/CommunityScreen';
import CreateScreen from './components/CreateScreen';
import WelcomeScreen from './components/WelcomeScreen';
import ProfileScreen from './components/ProfileScreen';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Home);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const handleEnterApp = () => {
    setShowWelcomeScreen(false);
  };
  
  const handleLogout = () => {
    setShowProfile(false);
    setShowWelcomeScreen(true);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.Home:
        return <HomeScreen onProfileClick={() => setShowProfile(true)} />;
      case Screen.Progress:
        return <ProgressScreen />;
      case Screen.Challenge:
        return <ChallengeScreen />;
      case Screen.Community:
        return <CommunityScreen />;
      case Screen.Create:
        return <CreateScreen />;
      default:
        return <HomeScreen onProfileClick={() => setShowProfile(true)} />;
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-[750px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border-8 border-gray-800">
        {showWelcomeScreen ? (
          <WelcomeScreen onEnter={handleEnterApp} />
        ) : (
          <>
            {showProfile ? (
              <ProfileScreen onBack={() => setShowProfile(false)} onLogout={handleLogout} />
            ) : (
              <>
                <div className="bg-slate-50 flex-grow overflow-y-auto relative">
                  {renderScreen()}
                </div>
                <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
