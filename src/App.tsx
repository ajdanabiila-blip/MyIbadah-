import React, { useState, useEffect } from 'react';
import { User, NotificationSettings } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import DashboardScreen from './components/DashboardScreen';
import ScheduleScreen from './components/ScheduleScreen';
import KajianScreen from './components/KajianScreen';
import ConsultScreen from './components/ConsultScreen';
import InfaqScreen from './components/InfaqScreen';
import NotificationSettingsScreen from './components/NotificationSettingsScreen';

import { 
  Home, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  HeartHandshake,
  LogOut
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('myibadah_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('myibadah_active_tab') || 'home';
  });

  // Goal Progress (shared globally so they stay synced between Dashboard and Infaq History notices)
  const [quranProgress, setQuranProgress] = useState<number>(4);
  const [sunnahProgress, setSunnahProgress] = useState<number>(2);

  // Notification Settings State shares across components
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    adhanReminders: true,
    weeklyAlKahf: true,
    mosqueActivity: false,
    consultantReplies: true,
    quietHours: true,
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('myibadah_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('myibadah_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('myibadah_active_tab', activeTab);
  }, [activeTab]);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActiveTab('home');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out of your UMY Academic Spiritual portal?')) {
      setUser(null);
      setActiveTab('home');
    }
  };

  // Screen dispatcher
  const renderScreen = () => {
    if (!user) {
      return <WelcomeScreen onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <DashboardScreen 
            user={user} 
            onNavigate={(screen) => setActiveTab(screen)}
            quranProgress={quranProgress}
            setQuranProgress={setQuranProgress}
            sunnahProgress={sunnahProgress}
            setSunnahProgress={setSunnahProgress}
          />
        );
      case 'schedule':
        return <ScheduleScreen />;
      case 'kajian':
        return <KajianScreen />;
      case 'consult':
        return <ConsultScreen />;
      case 'infaq':
        return <InfaqScreen />;
      case 'settings':
        return (
          <NotificationSettingsScreen 
            onBack={() => setActiveTab('home')} 
            settings={notificationSettings}
            setSettings={setNotificationSettings}
          />
        );
      default:
        return (
          <DashboardScreen 
            user={user} 
            onNavigate={(screen) => setActiveTab(screen)}
            quranProgress={quranProgress}
            setQuranProgress={setQuranProgress}
            sunnahProgress={sunnahProgress}
            setSunnahProgress={setSunnahProgress}
          />
        );
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface antialiased pb-24 transition-colors duration-300">
      {/* Active Screen body */}
      <div className="mx-auto max-w-lg w-full min-h-screen bg-background relative border-x border-outline-variant/10 shadow-lg pb-10">
        
        {renderScreen()}

        {/* Global Bottom Navigation bar rendered if user is active & screen is not login */}
        {user && activeTab !== 'settings' && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-40 bg-white/95 backdrop-blur-md rounded-t-2xl shadow-[0_-4px_16px_0_rgba(0,0,0,0.04)] border-t border-outline-variant/20 h-20 px-4 flex justify-around items-center pb-safe">
            
            {/* Dashboard Home tab */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs focus:outline-none relative group ${
                activeTab === 'home' 
                  ? 'text-primary font-bold bg-secondary-container/10 rounded-xl' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Home className={`w-5 h-5 mb-1 ${activeTab === 'home' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-[10px] tracking-wider uppercase font-sans">Home</span>
              {activeTab === 'home' && (
                <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>

            {/* General Mosque & Class Schedule tab */}
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs focus:outline-none relative group ${
                activeTab === 'schedule' 
                  ? 'text-primary font-bold bg-secondary-container/10 rounded-xl' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Calendar className={`w-5 h-5 mb-1 ${activeTab === 'schedule' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-[10px] tracking-wider uppercase font-sans">Schedule</span>
              {activeTab === 'schedule' && (
                <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>

            {/* Kajian listings tab */}
            <button
              onClick={() => setActiveTab('kajian')}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs focus:outline-none relative group ${
                activeTab === 'kajian' 
                  ? 'text-primary font-bold bg-secondary-container/10 rounded-xl' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <BookOpen className={`w-5 h-5 mb-1 ${activeTab === 'kajian' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-[10px] tracking-wider uppercase font-sans">Kajian</span>
              {activeTab === 'kajian' && (
                <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>

            {/* Cleric Spiritual Consult chat tab */}
            <button
              onClick={() => setActiveTab('consult')}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs focus:outline-none relative group ${
                activeTab === 'consult' 
                  ? 'text-primary font-bold bg-secondary-container/10 rounded-xl' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <MessageSquare className={`w-5 h-5 mb-1 ${activeTab === 'consult' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-[10px] tracking-wider uppercase font-sans">Consult</span>
              {activeTab === 'consult' && (
                <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>

            {/* Infaq Digital Charity tab */}
            <button
              onClick={() => setActiveTab('infaq')}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all text-xs focus:outline-none relative group ${
                activeTab === 'infaq' 
                  ? 'text-primary font-bold bg-secondary-container/10 rounded-xl' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <HeartHandshake className={`w-5 h-5 mb-1 ${activeTab === 'infaq' ? 'text-primary' : 'text-on-surface-variant'}`} />
              <span className="text-[10px] tracking-wider uppercase font-sans">Infaq</span>
              {activeTab === 'infaq' && (
                <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>

            {/* Quick Logout option at far-right of bar or profile */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center py-1.5 flex-[0.7] h-full text-xs text-error hover:text-opacity-80 transition-colors focus:outline-none"
              title="Logout from portal"
            >
              <LogOut className="w-4 h-4 mb-1 text-error" />
              <span className="text-[8px] tracking-widest uppercase font-mono font-bold leading-none">Exit</span>
            </button>

          </nav>
        )}

      </div>
    </div>
  );
}
