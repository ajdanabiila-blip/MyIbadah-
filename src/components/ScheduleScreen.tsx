import React, { useState } from 'react';
import { MosqueEvent, ImamAssignment } from '../types';
import { 
  Bell, 
  MapPin, 
  Clock, 
  BookOpen, 
  Group, 
  CalendarDays, 
  UserCheck, 
  CheckCircle,
  Award
} from 'lucide-react';

export default function ScheduleScreen() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'imam'>('timeline');
  const [selectedDay, setSelectedDay] = useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri'>('mon');

  // Hardcode date coordinates
  const dates = [
    { key: 'mon', name: 'MON', num: '12' },
    { key: 'tue', name: 'TUE', num: '13' },
    { key: 'wed', name: 'WED', num: '14' },
    { key: 'thu', name: 'THU', num: '15' },
    { key: 'fri', name: 'FRI', num: '16' },
  ] as const;

  // Mosque timeline data per day
  const [events, setEvents] = useState<Record<string, MosqueEvent[]>>({
    mon: [
      {
        id: 'ev-1',
        title: 'Subuh Lecture: Adab in Learning',
        speaker: 'Ust. Ahmad Dahlan',
        location: 'Main Prayer Hall',
        time: '05:00 - 06:00',
        category: 'Academic',
        joinedCount: 12,
        reminded: false,
      },
      {
        id: 'ev-2',
        title: 'Tahsin Quran for Beginners',
        speaker: 'Ust. Fauzi',
        location: 'East Wing Classroom 2',
        time: '12:30 - 13:30',
        category: 'Tahsin',
        joinedCount: 4,
        reminded: false,
      },
      {
        id: 'ev-3',
        title: 'Youth Gathering & Coffee',
        speaker: 'Mosque Youth Circle',
        location: 'Mosque Courtyard',
        time: '16:00 - 17:30',
        category: 'Community',
        joinedCount: 22,
        reminded: false,
      },
      {
        id: 'ev-4',
        title: 'Isha Congregation & Dua',
        speaker: 'Ust. Ridwan',
        location: 'Main Prayer Hall',
        time: '19:30 - 20:30',
        category: 'Prayer',
        joinedCount: 50,
        reminded: false,
      },
    ],
    tue: [
      {
        id: 'ev-5',
        title: 'Morning Fiqh Study Session',
        speaker: 'Ust. Ridwan',
        location: 'Siti Walidah Hall',
        time: '05:30 - 06:30',
        category: 'Academic',
        joinedCount: 15,
        reminded: false,
      },
      {
        id: 'ev-6',
        title: 'Kajian: Sharia Finance in College',
        speaker: 'Ust. Dr. Lukman Hakim',
        location: 'Main Prayer Hall',
        time: '16:15 - 17:45',
        category: 'Community',
        joinedCount: 35,
        reminded: false,
      },
    ],
    wed: [
      {
        id: 'ev-7',
        title: 'Subuh Tafseer Circle',
        speaker: 'Ust. Fauzi',
        location: 'Main Seminar Room 1',
        time: '05:00 - 06:15',
        category: 'Tahsin',
        joinedCount: 8,
        reminded: false,
      },
      {
        id: 'ev-8',
        title: 'Maghrib Quran Memorization Core',
        speaker: 'Ust. Ahmad',
        location: 'Special Classes Unit C',
        time: '18:15 - 19:15',
        category: 'Tahsin',
        joinedCount: 19,
        reminded: false,
      },
    ],
    thu: [
      {
        id: 'ev-9',
        title: 'Evening Hadith Recital & Fasting Core',
        speaker: 'Ust. Mansur',
        location: 'Al-Hikmah Lounge',
        time: '17:00 - 18:00',
        category: 'Community',
        joinedCount: 40,
        reminded: false,
      },
    ],
    fri: [
      {
        id: 'ev-10',
        title: 'Grand Tabligh & Friday Congregational Sermon',
        speaker: 'Ust. Dr. Lukman Hakim, M.A.',
        location: 'UMY Central Ground Mosque',
        time: '11:45 - 12:45',
        category: 'Prayer',
        joinedCount: 850,
        reminded: true,
      },
    ],
  });

  // Weekly Imam Assignments Table view
  const imamAssignments: ImamAssignment[] = [
    { day: 'Mon', subuh: 'Ust. Ahmad', dhuhur: 'Ust. Ridwan', asr: 'Ust. Zaky', maghrib: 'Ust. Mansur', isha: 'Ust. Ahmad' },
    { day: 'Tue', subuh: 'Ust. Fauzi', dhuhur: 'Ust. Ahmad', asr: 'Ust. Ridwan', maghrib: 'Ust. Zaky', isha: 'Ust. Fauzi' },
    { day: 'Wed', subuh: 'Ust. Mansur', dhuhur: 'Ust. Fauzi', asr: 'Ust. Ahmad', maghrib: 'Ust. Ridwan', isha: 'Ust. Mansur' },
    { day: 'Thu', subuh: 'Ust. Zaky', dhuhur: 'Ust. Mansur', asr: 'Ust. Fauzi', maghrib: 'Ust. Ahmad', isha: 'Ust. Zaky' },
    { day: 'Fri', subuh: 'Ust. Ridwan', dhuhur: 'Ust. Dr. Lukman (Khatib)', asr: 'Ust. Mansur', maghrib: 'Ust. Fauzi', isha: 'Ust. Ridwan' },
    { day: 'Sat', subuh: 'Ust. Ahmad', dhuhur: 'Ust. Zaky', asr: 'Ust. Mansur', maghrib: 'Ust. Fauzi', isha: 'Ust. Ahmad' },
    { day: 'Sun', subuh: 'Ust. Fauzi', dhuhur: 'Ust. Ridwan', asr: 'Ust. Ahmad', maghrib: 'Ust. Zaky', isha: 'Ust. Fauzi' },
  ];

  const handleRemindToggle = (day: string, id: string) => {
    setEvents(prev => {
      const updatedList = prev[day].map(evt => {
        if (evt.id === id) {
          return { ...evt, reminded: !evt.reminded };
        }
        return evt;
      });
      return { ...prev, [day]: updatedList };
    });
  };

  const activeDayEvents = events[selectedDay] || [];

  return (
    <div className="animate-fade-in">
      {/* Top App Bar inside main page */}
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
          <span className="font-display font-bold text-lg text-primary text-[20px]">MyIbadah Schedule</span>
        </div>
        
        {/* Toggle between Timeline & Imam table options */}
        <div className="flex bg-surface-container rounded-lg p-1 text-xs">
          <button 
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-md font-sans font-bold transition-all ${activeTab === 'timeline' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Mosque Event
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('imam')}
            className={`px-3 py-1.5 rounded-md font-sans font-bold transition-all ${activeTab === 'imam' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Imam &amp; Khatib
          </button>
        </div>
      </header>

      {/* Main Main Scroll Container */}
      <main className="pt-20 pb-24 px-5">
        {activeTab === 'timeline' ? (
          <div>
            <div className="mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-1">Campus Mosque Schedule</h2>
              <p className="font-sans text-xs text-on-surface-variant">Tap a date to inspect scheduled lessons, gatherings, and daily studies.</p>
            </div>

            {/* Date Selector */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-1 scrollbar-hide">
              {dates.map((date) => (
                <button
                  key={date.key}
                  onClick={() => setSelectedDay(date.key)}
                  className={`flex flex-col items-center justify-center min-w-[56px] h-20 rounded-xl transition-all duration-300 focus:outline-none ${
                    selectedDay === date.key
                      ? 'bg-primary text-on-primary shadow-lg scale-102 ring-2 ring-primary-fixed'
                      : 'bg-white text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-low'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold opacity-80 mb-1">{date.name}</span>
                  <span className="font-display text-xl font-extrabold">{date.num}</span>
                </button>
              ))}
            </div>

            {/* Timeline Items list with a vertical green line visually connecting them */}
            <div className="relative mt-4 pl-4 border-l-2 border-dashed border-primary/20 space-y-6">
              {activeDayEvents.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant">
                  <Clock className="w-10 h-10 mx-auto opacity-20 mb-2" />
                  <p className="font-sans text-sm">No scheduled events found for this day.</p>
                </div>
              ) : (
                activeDayEvents.map((evt, idx) => {
                  let badgeColorClass = '';
                  switch (evt.category) {
                    case 'Academic':
                      badgeColorClass = 'bg-secondary-container text-on-secondary-container';
                      break;
                    case 'Tahsin':
                      badgeColorClass = 'bg-primary-container text-on-primary-container';
                      break;
                    case 'Community':
                      badgeColorClass = 'bg-primary-fixed text-on-primary-fixed-variant';
                      break;
                    default:
                      badgeColorClass = 'bg-surface-container-highest text-on-surface-variant';
                      break;
                  }

                  return (
                    <div key={evt.id} className="relative z-10 bg-white p-5 rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow">
                      {/* Timeline Dot Indicator */}
                      <span className="absolute -left-[25px] top-6 w-3.5 h-3.5 rounded-full border-2 border-primary bg-white z-20 shadow-sm" />

                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-secondary flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 inline" />
                          {evt.time}
                        </span>
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${badgeColorClass}`}>
                          {evt.category}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-bold text-on-background mb-1">
                        {evt.title}
                      </h3>
                      
                      <p className="text-xs text-on-surface-variant font-semibold mb-3">
                        Lecturer/Host: {evt.speaker}
                      </p>

                      <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3">
                        <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-sans">{evt.location}</span>
                        </div>

                        {evt.category === 'Community' ? (
                          <button
                            onClick={() => handleRemindToggle(selectedDay, evt.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1 ${
                              evt.reminded 
                                ? 'bg-primary text-white' 
                                : 'bg-surface-container-high text-primary hover:bg-primary/10'
                            }`}
                          >
                            {evt.reminded ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Reminded</span>
                              </>
                            ) : (
                              <>
                                <Bell className="w-3.5 h-3.5" />
                                <span>Remind Me</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="flex -space-x-1.5 items-center">
                            <div className="w-5 h-5 rounded-full bg-primary-fixed flex items-center justify-center border border-white text-[8px] font-bold text-primary">
                              AJ
                            </div>
                            <div className="w-5 h-5 rounded-full bg-secondary-fixed flex items-center justify-center border border-white text-[8px] font-bold text-secondary">
                              +12
                            </div>
                            <span className="text-[10px] text-outline italic ml-1.5 font-medium">unlocked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Special event visual card as seen in the mockup */}
            <div className="mt-8 mb-4">
              <h2 className="font-display text-base font-bold text-primary mb-3">Special Event</h2>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg group select-none">
                <img 
                  alt="Islamic Architecture" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLvhmJ9jj9xK5u3iUjQJN-3id1Q4avOdo5JCVURI-mqMzl3YNPlYygmXgGBmIoPsyEz0q4MesvcdCKvVAaW_5lU4cmzP96vv7u21DmDgRcwMoxCvhRLSE3tVXzO2eQQY7UyK000Ed7T6CCmMkcQpkQJD1A0lxdUz_X-J3WpYn3ze5J2bM924pUY8x5GKxLtE8QYI6lSDZi2XiQV_Jq3sIfsisePUUwkC0OyYFyJwgj3d2CP-bmezqBUbpU27"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <span className="bg-secondary text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded w-max mb-1.5">
                    Annual Event
                  </span>
                  <h4 className="text-white font-display text-xl font-bold">Grand Tabligh Akbar</h4>
                  <p className="text-white/80 font-mono text-xs mt-0.5">Saturday, 17 Sept • 08:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* IMAM & KHATIB SCHEDULE VIEW */
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary mb-1">Schedule</h2>
              <p className="font-sans text-xs text-on-surface-variant">Weekly Imam &amp; Khatib assignments for Al-Hikmah Mosque.</p>
            </div>

            {/* Current Active Week Indicator */}
            <div className="bg-white shadow-sm rounded-xl p-5 border-l-4 border-primary border border-outline-variant/30 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-widest">Active Period</span>
                <h3 className="font-display text-lg font-bold text-on-surface">23 Oct - 29 Oct</h3>
              </div>
              <div className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-secondary" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Current Week</span>
              </div>
            </div>

            {/* Imam Assignments Table on Mosque Schedule screen */}
            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-outline-variant/30">
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/50">
                      <th className="px-4 py-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">Day</th>
                      <th className="px-4 py-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Subuh</th>
                      <th className="px-4 py-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Dhuhur</th>
                      <th className="px-4 py-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Asr</th>
                      <th className="px-4 py-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Maghrib</th>
                      <th className="px-4 py-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">Isha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {imamAssignments.map((assignment) => {
                      const isFriday = assignment.day === 'Fri';
                      return (
                        <tr 
                          key={assignment.day} 
                          className={`hover:bg-background transition-colors ${isFriday ? 'bg-secondary/5 font-medium text-secondary-container' : ''}`}
                        >
                          <td className={`px-4 py-3.5 font-sans font-bold ${isFriday ? 'text-secondary' : 'text-primary'}`}>
                            {assignment.day}
                          </td>
                          <td className="px-4 py-3.5 font-sans text-xs text-on-surface">{assignment.subuh}</td>
                          <td className={`px-4 py-3.5 font-sans text-xs ${isFriday ? 'text-secondary font-bold bg-secondary/5' : 'text-on-surface'}`}>
                            {assignment.dhuhur}
                          </td>
                          <td className="px-4 py-3.5 font-sans text-xs text-on-surface">{assignment.asr}</td>
                          <td className="px-4 py-3.5 font-sans text-xs text-on-surface">{assignment.maghrib}</td>
                          <td className="px-4 py-3.5 font-sans text-xs text-on-surface">{assignment.isha}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Featured Friday Khatib Portrait and Callout */}
            <section className="mt-8">
              <div className="flex items-center gap-1.5 mb-3">
                <Award className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-base font-bold text-on-surface">Featured Friday Khatib</h3>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col hover:shadow-md transition-shadow">
                <div className="h-56 relative overflow-hidden bg-surface-container">
                  <img 
                    alt="Imam Portrait" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLvIF0qGyFSh30bKxtP5O1Crc7pidl_nnADNndqUKYEmSUoDozZzNHsG2CaB97ZxlhPJILyQ7Juw8WmhR3dFdUIbz-0W44Knljt5NS8VNIyTEkynkBcK0r6Jzpp2XI5dBsdiGIlpxOgtSs1vJIsLQWrKW7aLjNqtDEXZcdoPw3BOppywfaUM08I9-m-v7s2HDvbudtAB8riLzUqqzF_fOjYLjOwAoTvebrmebPbDULGmtaTL7SmyXjvxETdj"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    Featured
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase">
                      This Week
                    </span>
                    <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold">
                      Professor of Sharia
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-primary mb-1">
                    Ust. Dr. Lukman Hakim, M.A.
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                    Topic: "Balancing Academic Excellence with Spiritual Discipline in the Modern Era"
                  </p>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => alert('Viewing profile of Ust. Dr. Lukman Hakim, M.A. (Professor of Islamic Law & Sharia Economics, UMY)')}
                      className="bg-primary text-white font-sans text-xs font-bold px-4 py-2.5 rounded-lg active:scale-95 transition-transform shadow-sm hover:bg-opacity-95"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => alert('Event added to your device calendar!')}
                      className="text-primary font-mono text-xs font-bold px-3 py-2 flex items-center gap-2 hover:bg-primary-fixed/20 rounded-lg transition-colors border border-primary/20"
                    >
                      <span>Add to Calendar</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Academic Spiritual Message Card */}
            <div className="bg-surface-container-low/50 text-center px-4 py-6 rounded-xl border-t-2 border-primary/20 italic text-on-surface-variant text-xs font-medium">
              <p className="font-sans">"The pursuit of knowledge is a divine obligation. May our worship illuminate our intellect."</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
