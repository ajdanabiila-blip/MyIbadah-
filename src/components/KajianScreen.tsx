import React, { useState } from 'react';
import { KajianSession } from '../types';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Check, 
  Bookmark, 
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';

export default function KajianScreen() {
  const [featuredReserved, setFeaturedReserved] = useState(false);
  const [sessions, setSessions] = useState<KajianSession[]>([
    {
      id: 'kj-1',
      title: 'Spiritual Discipline in Exams',
      speaker: 'Ustadz Hanan Attaki',
      date: 'Oct 24, 2023',
      time: '13:00 WIB',
      location: 'Faculty of Engineering Hall',
      avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLv1CYLkdsZLHpWrrwagdgJLRu5SjrZj2l0IwIX2eSqU_3LsdQN_EWyEABBJCBnG78FUYPGr1Im_UtIWZ6XvUeCLNRexyzs_gkwgteV_wJhRryC0IRMvw0ttnXmmCYmmmUsRJ_7YurI5wItybHJQi59CDeIxeBzBktE6RC_-QlOFA9G5ZROtplX1p5hPhv0sPd6FjHi0PxH-mYf7Vfui1JWGavMpsBpSSEOtYYjwVhwzzWG7yf7d8YN6s3_x',
      addedToCalendar: false,
    },
    {
      id: 'kj-2',
      title: 'The Legacy of Muslim Scientists',
      speaker: 'Dr. Sarah Mansour',
      date: 'Oct 26, 2023',
      time: '19:30 WIB',
      location: 'Auditorium Central Building',
      avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLvpfPZv_-v_AoD5MoDb2ufcBBoaX5lWZTr2G_f5TBXweMx0u4bvauzHvmMvERQtg6SElYeDdo8qf70HKRBwc0TFLEU8YPpf_4jameuTcEL4DV-PVwvogbfK3bdTO8eeGL_O4l5iLGXbhMqVKxPlGGvzPRsPynIxMkAN-aYj1tZIACpJCT22AGDWTiKYGFzf6vgsebcUKgtiHZx-UZCZVUsCBzyYRNYXQsWcurlOIpMpXNhMDikOY9NMEg',
      addedToCalendar: false,
    },
    {
      id: 'kj-3',
      title: 'Finding Balance: Deen & Career',
      speaker: 'KH. Anwar Zahid',
      date: 'Oct 28, 2023',
      time: '15:45 WIB',
      location: 'Student Center Lounge',
      avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLvIIuASvgGsX4V4Js_NZ35ulBUiRD6MFSpm7zx03R83HT_KXoZW4BMUDYR6FtJ5JQCdjZTLSOb7af4PBvYbVb37iYxAQ63wpPhbvpgv_N-w8vAstqiq-dE99qoZDGOtrXDIBIX4dq06f16FW0-uBnktbtn5ULHP8QNndIXUZIdAXbk4XolDq3cYnCYxjtRTwM_nOd_Qz8dxge3YEaRJvlItQ2gINqPeJ-SdOyQCwW_XihNgDlc5DcyMp7I',
      addedToCalendar: false,
    }
  ]);

  const toggleCalendar = (id: string) => {
    setSessions(prev => 
      prev.map(session => {
        if (session.id === id) {
          return { ...session, addedToCalendar: !session.addedToCalendar };
        }
        return session;
      })
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-sm h-16 flex justify-between items-center px-5 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant">
            <img 
              alt="Mosque Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtJjsNVce7VvZVQOmvpIiONTtU79FHIdoN4Zr1Vti6iG7V6ptmnzD7Lb__SjO_rhARkcq4pk-iYIhSB2RAJqBelqESkmY8VnSaXICTTFXqjyeJElD4TxfViivJ9zolwFiQd30ZicWJJXtJZmW8lerHoM7Zs1gwbcELCDBV6yGTjHT34VmJdONBblDKuDxqnXS1GDoGwDVjSI1QS-upQDBDqW8Ex-BhKXoZ3PqFwLyj-6pEIbsqEfHI3fE_oE6m3ZAUsVQ"
            />
          </div>
          <span className="font-display font-bold text-[20px] text-primary">Kajian Schedule</span>
        </div>
        <button 
          onClick={() => alert('Campus Academic Spiritual Committee: +62 274 387656 Ext. 177')}
          className="p-1 px-3 rounded-full border border-primary/20 text-xs font-bold text-primary hover:bg-primary-fixed/20 transition-colors flex items-center gap-1 focus:outline-none"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help</span>
        </button>
      </header>

      {/* Primary Scroll Container */}
      <main className="pt-20 pb-24 px-5">
        
        {/* Main Section Header */}
        <div className="mb-6">
          <h1 className="font-display text-2.5xl font-bold text-primary mb-1">Kajian Schedule</h1>
          <p className="font-sans text-xs text-on-surface-variant">Deepen your collegiate wisdom with upcoming scholarly lectures on campus.</p>
        </div>

        {/* Featured / Today's Highlight styled like a bento banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container to-primary p-6 mb-6 shadow-xl text-white">
          {/* Abstract Islamic Graphic Accent */}
          <div className="absolute top-0 right-0 w-36 h-36 opacity-10 pointer-events-none select-none translate-x-4 -translate-y-4">
            <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
              <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z"></path>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-start">
            <span className="inline-block px-2.5 py-1 bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold rounded uppercase tracking-widest mb-3">
              FEATURED TODAY
            </span>

            <h2 className="font-display text-lg sm:text-2xl font-bold leading-tight mb-3">
              Ethics in the Digital Age
            </h2>

            <div className="flex items-center gap-2 text-white/95 font-sans text-xs font-semibold mb-4">
              <User className="w-4 h-4 text-secondary-fixed" />
              <span>Prof. Dr. Ahmad Zakariyya</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-5 text-white/90">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Clock className="w-4 h-4 text-secondary-fixed" />
                <span>16:00 - 17:30</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <MapPin className="w-4 h-4 text-secondary-fixed" />
                <span>Main Mosque, 2nd Floor</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setFeaturedReserved(true);
                alert('Success! Your seat has been reserved. Check in at Main Mosque 2nd Floor. We have added you to the RSVP list!');
              }}
              disabled={featuredReserved}
              className={`px-5 py-2.5 rounded-lg font-mono text-center text-xs font-bold shadow-md active:scale-95 transition-all outline-none ${
                featuredReserved 
                  ? 'bg-secondary-fixed-dim text-on-secondary-fixed-variant cursor-not-allowed opacity-80' 
                  : 'bg-secondary text-white hover:bg-opacity-95'
              }`}
            >
              {featuredReserved ? 'RESERVED ✓' : 'RESERVE A SEAT'}
            </button>
          </div>
        </div>

        {/* Upcoming Lecturers List */}
        <h3 className="font-display text-base font-bold text-primary mb-3">Upcoming Lectures</h3>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-5 border border-outline-variant/30 hover:shadow-md transition-shadow relative"
            >
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-fixed rounded-l-xl pointer-events-none"
              />

              {/* Scholar Avatar Photo */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0 mx-auto sm:mx-0 border border-outline-variant/30">
                <img 
                  alt={session.speaker} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                  src={session.avatar}
                />
              </div>

              {/* Session Core Info */}
              <div className="flex-grow text-center sm:text-left">
                <h4 className="font-display text-base font-bold text-on-surface leading-tight mb-0.5">
                  {session.title}
                </h4>
                <p className="font-sans text-xs text-on-surface-variant font-semibold mb-3">
                  {session.speaker}
                </p>

                {/* Sub Metadata parameters */}
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-4 text-on-surface-variant justify-items-center sm:justify-items-start">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="text-left">{session.location}</span>
                  </div>
                </div>

                {/* Interactive State Toggle */}
                <button
                  onClick={() => toggleCalendar(session.id)}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono font-bold transition-all active:scale-95 focus:outline-none ${
                    session.addedToCalendar
                      ? 'bg-primary border-primary text-white shadow-sm'
                      : 'border-secondary text-secondary hover:bg-secondary/5'
                  }`}
                >
                  {session.addedToCalendar ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>ADDED</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-secondary" />
                      <span>ADD TO CALENDAR</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Area with Quote */}
        <div className="mt-8 text-center px-4 py-6 border-t-2 border-primary/10 italic text-on-surface-variant text-xs font-semibold">
          <p className="font-sans">"May Allah increase your wisdom as you stride through your academic milestones."</p>
        </div>

      </main>
    </div>
  );
}
