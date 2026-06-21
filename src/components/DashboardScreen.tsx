import React, { useState, useEffect } from 'react';
import { User, PrayerTime } from '../types';
import { 
  Bell, 
  MapPin, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  HeartHandshake, 
  Sparkles,
  BookOpenCheck,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

interface DashboardScreenProps {
  user: User;
  onNavigate: (screen: string) => void;
  quranProgress: number;
  setQuranProgress: (p: number) => void;
  sunnahProgress: number;
  setSunnahProgress: (p: number) => void;
}

export default function DashboardScreen({
  user,
  onNavigate,
  quranProgress,
  setQuranProgress,
  sunnahProgress,
  setSunnahProgress
}: DashboardScreenProps) {
  // Timer State For Asr prayer countdown
  const [timeLeft, setTimeLeft] = useState({ minutes: 45, seconds: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset just to keep countdown alive beautifully
          return { minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format countdown string
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const totalPossible = 5 + 4; // 5 pages Quran + 4 Rak'ah Sunnah
  const currentTotal = quranProgress + sunnahProgress;
  const completionPercentage = Math.round((currentTotal / totalPossible) * 100);

  return (
    <div className="animate-fade-in">
      {/* Top App Bar Profile & Name */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-sm h-16 flex justify-between items-center px-5 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant">
            <img 
              alt="Mosque Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJjsNVce7VvZVQOmvpIiONTtU79FHIdoN4Zr1Vti6iG7V6ptmnzD7Lb__SjO_rhARkcq4pk-iYIhSB2RAJqBelqESkmY8VnSaXICTTFXqjyeJElD4TxfViivJ9zolwFiQd30ZicWJJXtJZmW8lerHoM7Zs1gwbcELCDBV6yGTjHT34VmJdONBblDKuDxqnXS1GDoGwDVjSI1QS-upQDBDqW8Ex-BhKXoZ3PqFwLyj-6pEIbsqEfHI3fE_oE6m3ZAUsVQ"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-tight text-primary">MyIbadah</span>
            <span className="text-[10px] tracking-wider uppercase text-on-surface-variant font-bold font-mono">Academic Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications Button -> navigates to settings */}
          <button 
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors active:scale-95"
            title="Notification Settings"
          >
            <Bell className="w-5 h-5" />
          </button>
          
          {/* User profile picture */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed block cursor-pointer" onClick={() => onNavigate('settings')}>
            <img 
              alt="User profile" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
              src={user.avatar}
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-20 pb-28 px-5">
        
        {/* Welcome Text card */}
        <div className="mb-5 flex flex-col pt-1">
          <p className="text-sm font-mono text-secondary font-semibold uppercase tracking-wide">Assalamu'alaikum,</p>
          <h2 className="text-2xl font-display font-bold text-primary">{user.name}</h2>
          <p className="text-xs text-on-surface-variant">Class of 2023 • Universitas Muhammadiyah Yogyakarta</p>
        </div>

        {/* Hero: Next Prayer Countdown */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container to-primary p-6 text-white shadow-lg mb-6">
          {/* Islamic decorative overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5 bg-repeat"
            style={{
              backgroundImage: `url("https://www.transparenttextures.com/patterns/arabesque.png")`
            }}
          />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-xs font-bold text-secondary-fixed uppercase tracking-wider">
                Next Prayer
              </span>
              <span className="bg-white/10 uppercase font-mono text-[10px] px-2.5 py-1 rounded-full text-secondary-fixed font-bold tracking-widest">
                ASR
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Asr in {formatTime(timeLeft.minutes, timeLeft.seconds)}
            </h1>

            <p className="font-sans text-xs text-white/80 py-1 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4.5 h-4.5 text-secondary-fixed" />
              UMY Campus, Yogyakarta
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <p className="text-[10px] uppercase font-mono text-white/70">Fajr</p>
                <p className="font-display text-xl font-bold">04:12</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-secondary-fixed ring-1 ring-secondary-fixed/50">
                <p className="text-[10px] uppercase font-mono text-secondary-fixed font-bold">Asr</p>
                <p className="font-display text-xl font-bold text-secondary-container">15:34</p>
              </div>
            </div>
          </div>
        </section>

        {/* Verse of the Day */}
        <section className="bg-surface-container-lowest rounded-xl p-6 border-l-4 border-secondary shadow-sm mb-6 relative hover:shadow-md transition-shadow">
          <span className="absolute top-4 right-4 text-[#785a00]/10 text-5xl font-serif italic pointer-events-none">
            “
          </span>
          <h2 className="font-display text-sm font-bold text-secondary mb-2 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            Verse of the Day
          </h2>
          <p className="font-sans text-base text-on-surface italic leading-relaxed mb-3">
            "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect."
          </p>
          <p className="font-sans text-xs font-bold text-tertiary-container">— Surah At-Talaq 2-3</p>
        </section>

        {/* Quick Access Bento Grid */}
        <h3 className="font-display text-base font-bold text-primary mb-3">Quick Navigation</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Schedule */}
          <button 
            onClick={() => onNavigate('schedule')}
            className="bg-surface-container-high rounded-xl p-4 flex flex-col items-start gap-3 hover:bg-surface-container-highest transition-all active:scale-95 group focus:outline-none focus:ring-1 focus:ring-primary/20 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Calendar className="w-5 h-5 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-on-surface leading-tight">Schedule</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">Class &amp; Prayer</span>
            </div>
          </button>

          {/* Kajian */}
          <button 
            onClick={() => onNavigate('kajian')}
            className="bg-surface-container-high rounded-xl p-4 flex flex-col items-start gap-3 hover:bg-surface-container-highest transition-all active:scale-95 group focus:outline-none focus:ring-1 focus:ring-primary/20 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <BookOpen className="w-5 h-5 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-on-surface leading-tight">Kajian</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">Weekly Circles</span>
            </div>
          </button>

          {/* Consult */}
          <button 
            onClick={() => onNavigate('consult')}
            className="bg-surface-container-high rounded-xl p-4 flex flex-col items-start gap-3 hover:bg-surface-container-highest transition-all active:scale-95 group focus:outline-none focus:ring-1 focus:ring-primary/20 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <MessageSquare className="w-5 h-5 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-on-surface leading-tight">Consult</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">Talk to Cleric</span>
            </div>
          </button>

          {/* Infaq */}
          <button 
            onClick={() => onNavigate('infaq')}
            className="bg-surface-container-high rounded-xl p-4 flex flex-col items-start gap-3 hover:bg-surface-container-highest transition-all active:scale-95 group focus:outline-none focus:ring-1 focus:ring-primary/20 text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <HeartHandshake className="w-5 h-5 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-on-surface leading-tight">Infaq</span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">Direct Charity</span>
            </div>
          </button>
        </div>

        {/* Spiritual Goals Progress Tracking (Editable State) */}
        <section className="bg-surface-container-lowest p-5 rounded-2xl shadow-md border border-outline-variant/30 relative">
          <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-2">
            <h3 className="font-display text-base font-bold text-primary flex items-center gap-1.5">
              <BookOpenCheck className="w-5 h-5 text-primary" />
              Spiritual Goals
            </h3>
            <span className="text-secondary font-mono text-sm font-bold bg-secondary-fixed/30 px-2.5 py-0.5 rounded-full">
              {completionPercentage}% Done
            </span>
          </div>

          <div className="space-y-4">
            {/* Goal 1: Quran */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-sans text-sm font-bold text-on-surface-variant">Daily Quran Reading</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuranProgress(Math.max(0, quranProgress - 1))}
                    className="p-1 rounded bg-surface-container-low hover:bg-surface-container-high transition-colors focus:outline-none"
                    title="Decrease Quran reading"
                  >
                    <Minus className="w-3 h-3 text-on-surface-variant" />
                  </button>
                  <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                    {quranProgress}/5 Pages
                  </span>
                  <button 
                    onClick={() => setQuranProgress(Math.min(5, quranProgress + 1))}
                    className="p-1 rounded bg-surface-container-low hover:bg-surface-container-high transition-colors focus:outline-none"
                    title="Increase Quran reading"
                  >
                    <Plus className="w-3 h-3 text-on-surface-variant" />
                  </button>
                </div>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300" 
                  style={{ width: `${(quranProgress / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Goal 2: Sunnah Prayers */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-sans text-sm font-bold text-on-surface-variant">Sunnah Prayers</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSunnahProgress(Math.max(0, sunnahProgress - 1))}
                    className="p-1 rounded bg-surface-container-low hover:bg-surface-container-high transition-colors focus:outline-none"
                    title="Decrease Sunnah prayers"
                  >
                    <Minus className="w-3 h-3 text-on-surface-variant" />
                  </button>
                  <span className="font-mono text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                    {sunnahProgress}/4 Rak'ah
                  </span>
                  <button 
                    onClick={() => setSunnahProgress(Math.min(4, sunnahProgress + 1))}
                    className="p-1 rounded bg-surface-container-low hover:bg-surface-container-high transition-colors focus:outline-none"
                    title="Increase Sunnah prayers"
                  >
                    <Plus className="w-3 h-3 text-on-surface-variant" />
                  </button>
                </div>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(sunnahProgress / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-surface-container-low/50 p-2.5 text-center text-[11px] text-on-surface-variant italic">
            Tip: Log your targets manually by pressing the - and + buttons!
          </div>
        </section>
      </main>
    </div>
  );
}
