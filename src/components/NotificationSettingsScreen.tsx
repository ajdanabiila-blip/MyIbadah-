import React, { useState } from 'react';
import { NotificationSettings } from '../types';
import { 
  ArrowLeft, 
  Bell, 
  BookOpen, 
  MessageSquare, 
  Sparkles, 
  Sliders, 
  Compass, 
  Clock, 
  Moon,
  Info
} from 'lucide-react';

interface NotificationSettingsScreenProps {
  onBack: () => void;
  settings: NotificationSettings;
  setSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
}

export default function NotificationSettingsScreen({ 
  onBack, 
  settings, 
  setSettings 
}: NotificationSettingsScreenProps) {
  
  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFocusSchedule = () => {
    alert("Focus Schedule Synced: quiet hours set to 08:00 - 15:00 WIB daily. Device auto-silence is active during classes.");
  };

  return (
    <div className="animate-fade-in relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-sm h-16 flex justify-between items-center px-5 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onBack}
            className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 text-primary focus:outline-none"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display font-bold text-[20px] text-primary">Notification Settings</h1>
        </div>
        
        {/* Sliders indicator button */}
        <button 
          onClick={() => alert("Notification protocols are secured under UMY System Admin: version 1.0.9.")}
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors focus:outline-none"
        >
          <Sliders className="w-4.5 h-4.5 text-primary" />
        </button>
      </header>

      {/* Main Panel Content */}
      <main className="pt-20 pb-24 px-5 max-w-xl mx-auto">
        
        {/* Banner header visual block as seen in mockup */}
        <section className="mb-6 rounded-2xl overflow-hidden relative h-40 flex items-end p-5 bg-gradient-to-br from-primary-container to-primary text-white shadow-md">
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1.2px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>
          <div className="relative z-10">
            <p className="font-display text-2xl font-bold mb-1">Stay Disciplined</p>
            <p className="font-sans text-xs text-white/95 leading-snug">
              Customize how MyIbadah helps you stay on track with your spiritual progress and academic obligations.
            </p>
          </div>
        </section>

        {/* Group list toggles */}
        <div className="space-y-6">
          
          {/* Spiritual Essentials */}
          <div>
            <h2 className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-3 px-1">
              Spiritual Essentials
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 divide-y divide-outline-variant/10">
              
              {/* Toggle 1: Adhan Reminders */}
              <div 
                onClick={() => toggleSetting('adhanReminders')}
                className="flex items-center justify-between p-5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-on-surface">Adhan Reminders</h3>
                    <p className="text-on-surface-variant text-xs mt-0.5 font-medium">Real-time alerts for five daily prayer times.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
                  <input 
                    type="checkbox" 
                    checked={settings.adhanReminders}
                    readOnly
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 2: Weekly Al-Kahf */}
              <div 
                onClick={() => toggleSetting('weeklyAlKahf')}
                className="flex items-center justify-between p-5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="border-l-4 border-secondary-fixed-dim pl-3">
                    <h3 className="font-display text-sm font-bold text-on-surface">Weekly Al-Kahf Reminder</h3>
                    <p className="text-on-surface-variant text-xs mt-0.5 font-medium">Special notification every Friday morning.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
                  <input 
                    type="checkbox" 
                    checked={settings.weeklyAlKahf}
                    readOnly
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

            </div>
          </div>

          {/* Community & Support */}
          <div>
            <h2 className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-3 px-1">
              Community &amp; Support
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/30 divide-y divide-outline-variant/10">
              
              {/* Toggle 3: Mosque Activity */}
              <div 
                onClick={() => toggleSetting('mosqueActivity')}
                className="flex items-center justify-between p-5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform">
                    <Compass className="w-5 h-5 text-[#785a00]" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-on-surface">Mosque Activity Updates</h3>
                    <p className="text-on-surface-variant text-xs mt-0.5 font-medium font-sans">Announcements for local Kajian and events.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
                  <input 
                    type="checkbox" 
                    checked={settings.mosqueActivity}
                    readOnly
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 4: Consultant Chats */}
              <div 
                onClick={() => toggleSetting('consultantReplies')}
                className="flex items-center justify-between p-5 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-on-surface">Consultant Chat Replies</h3>
                    <p className="text-on-surface-variant text-xs mt-0.5 font-medium">Instant alerts for spiritual counseling responses.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer pointer-events-none">
                  <input 
                    type="checkbox" 
                    checked={settings.consultantReplies}
                    readOnly
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

            </div>
          </div>

          {/* Focus Mode Bedtime Suggestions card */}
          <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/35 flex items-start gap-4">
            <Moon className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-on-surface text-sm">Quiet Hours</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                Automatically silences all non-Adhan alerts during lecture hours (08:00 - 15:00 WIB) to prevent classroom disruption.
              </p>
              <button 
                type="button"
                onClick={handleFocusSchedule}
                className="mt-3 text-primary font-bold font-mono text-[11px] uppercase tracking-wider hover:underline underline-offset-4 flex items-center gap-1 focus:outline-none"
              >
                Configure Focus Schedule
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
