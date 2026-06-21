import React, { useState, useRef, useEffect } from 'react';
import { Cleric, ChatMessage } from '../types';
import { 
  ArrowLeft, 
  Phone, 
  MoreVertical, 
  Send, 
  PlusCircle, 
  Smile, 
  ShieldCheck, 
  ShieldAlert,
  Loader2,
  CheckCheck,
  UserCheck
} from 'lucide-react';

export default function ConsultScreen() {
  const [selectedCleric, setSelectedCleric] = useState<Cleric | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const clerics: Cleric[] = [
    {
      id: 'cl-1',
      name: 'Ustadz Ahmad Fauzi',
      title: 'Spiritual Counseling & Quran expert',
      avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLsdFoCbtaOocFWIvlov4twtVX2-iKq7cLu0nFsBrOgKeG44baibo-htLHvpXtHgPJthMQn8UudKAgMrvBaDBJnPUOQ5MLjX4aecX6FKpCLDcIox6pCfCB0-BfvCQx9ZjiYPCH_Y5gmyu0kUnO-pW-mmjJPCaUujR11fC8-m0hqEOosX0VW_lI0sXropR0NjqPWuVs0Nq-ersJmLGnS27b_F104f0d8L40vSV29oswihLAD6CJ3xZg-oZoU',
      online: true,
    },
    {
      id: 'cl-2',
      name: 'Ustadz Hanan Attaki',
      title: 'Youth & Academic anxiety counselor',
      avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLv1CYLkdsZLHpWrrwagdgJLRu5SjrZj2l0IwIX2eSqU_3LsdQN_EWyEABBJCBnG78FUYPGr1Im_UtIWZ6XvUeCLNRexyzs_gkwgteV_wJhRryC0IRMvw0ttnXmmCYmmmUsRJ_7YurI5wItybHJQi59CDeIxeBzBktE6RC_-QlOFA9G5ZROtplX1p5hPhv0sPd6FjHi0PxH-mYf7Vfui1JWGavMpsBpSSEOtYYjwVhwzzWG7yf7d8YN6s3_x',
      online: true,
    },
    {
      id: 'cl-3',
      name: 'Ust. Dr. Lukman Hakim, M.A.',
      title: 'Professor of Sharia Studies',
      avatar: 'https://lh3.googleusercontent.com/aida/AP1WRLvIF0qGyFSh30bKxtP5O1Crc7pidl_nnADNndqUKYEmSUoDozZzNHsG2CaB97ZxlhPJILyQ7Juw8WmhR3dFdUIbz-0W44Knljt5NS8VNIyTEkynkBcK0r6Jzpp2XI5dBsdiGIlpxOgtSs1vJIsLQWrKW7aLjNqtDEXZcdoPw3BOppywfaUM08I9-m-v7s2HDvbudtAB8riLzUqqzF_fOjYLjOwAoTvebrmebPbDULGmtaTL7SmyXjvxETdj',
      online: false,
    },
  ];

  // Hardcode prefilled active history for Ahmad Fauzi (mocking the mockup perfectly)
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({
    'cl-1': [
      {
        id: 'msg-1',
        text: "Assalamu'alaikum, fellow student. How can I assist you with your spiritual or academic concerns today?",
        sender: 'cleric',
        timestamp: '09:12 AM',
      },
      {
        id: 'msg-2',
        text: "Wa'alaikumussalam, Ustadz. I've been feeling a bit overwhelmed balancing my Tahfidz goals with my Engineering exams. Do you have any advice on maintaining focus?",
        sender: 'user',
        timestamp: '09:15 AM',
      },
      {
        id: 'msg-3',
        text: "MashaAllah, it's a noble struggle. Start by dedicating your early morning hours—the 'Barakah' time—to Quran before your academic studies. Small, consistent steps are more beloved to Allah.",
        sender: 'cleric',
        timestamp: '09:18 AM',
        isVerseQuote: true,
        verseRef: '"Allah does not burden a soul beyond that it can bear." (Al-Baqarah 286)',
      },
    ],
    'cl-2': [
      {
        id: 'msg-4',
        text: "Assalamu'alaikum, brother. Feel free to unpack anything that's vexing your peace of mind. Your identity is fully secure.",
        sender: 'cleric',
        timestamp: 'Yesterday',
      },
    ],
    'cl-3': [
      {
        id: 'msg-5',
        text: "Assalamu'alaikum. If you have academic questions regarding Sharia, Sharia banking, or balance sheets, drop them here.",
        sender: 'cleric',
        timestamp: '2 days ago',
      },
    ],
  });

  const activeMessages = selectedCleric ? (chatHistories[selectedCleric.id] || []) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedCleric) return;

    const userMsg: ChatMessage = {
      id: `usr-msg-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentClericId = selectedCleric.id;

    setChatHistories(prev => ({
      ...prev,
      [currentClericId]: [...(prev[currentClericId] || []), userMsg],
    }));

    setInputText('');
    setIsTyping(true);

    // Trigger customized automated religious cleric reply based on matching tokens!
    setTimeout(() => {
      let replyText = "Barakallahu fiik. May Allah make your tasks easy. Remember that taking breaks and purifying your intentions keeps the barakah flowing in your studies.";
      let verseRef = undefined;
      const question = inputText.toLowerCase();

      if (question.includes('exam') || question.includes('study') || question.includes('grade')) {
        replyText = "When studying for exams, start with Bismillah. Treat your academic preparation as a form of worship (Jihad Al-Ilm). In moments of extreme test panic, recite 'Rabbi yassir wa la tu'assir, Rabbi tammim bil khair' (O my Lord, make this easy and do not make it difficult).";
        verseRef = '"My Lord, increase me in knowledge." (Surah Taha 114)';
      } else if (question.includes('tahfidz') || question.includes('quran') || question.includes('memoriz')) {
        replyText = "For Quran memorization, consistency is much heavier than volume. Memorize just one line daily, but never skip a day. Revise what you have memorized during your Sunnah prayers; this stabilizes the memory pathways remarkably.";
        verseRef = '"And We have indeed made the Quran easy to understand and remember..." (Surah Al-Qamar 17)';
      } else if (question.includes('anxiety') || question.includes('stress') || question.includes('fear')) {
        replyText = "Anxiety is a natural human state. True serenity (Sakinah) is anchored in remembrance. When stress mounts, make fresh wudu, pray two rak'ahs, and sit in dhikr. Allah listens to every silent sigh.";
        verseRef = '"Unquestionably, by the remembrance of Allah hearts find satisfaction." (Surah Ar-Ra’d 28)';
      }

      const clericMsg: ChatMessage = {
        id: `cl-msg-${Date.now()}`,
        text: replyText,
        sender: 'cleric',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVerseQuote: verseRef !== undefined,
        verseRef: verseRef,
      };

      setChatHistories(prev => ({
        ...prev,
        [currentClericId]: [...(prev[currentClericId] || []), clericMsg],
      }));

      setIsTyping(false);
    }, 2000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  return (
    <div className="animate-fade-in h-[calc(100vh-144px)] flex flex-col justify-between">
      {!selectedCleric ? (
        /* CLERICS DIRECTORY LIST VIEW */
        <div className="pt-20 px-5 max-w-xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="font-display text-2.5xl font-bold text-primary mb-1">Academic Consultation</h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Connect anonymously with accredited campus clerics of Masjid KH. Ahmad Dahlan. Discuss career, exams, and spiritual hurdles.
            </p>
          </div>

          <div className="space-y-4">
            {clerics.map((cleric) => (
              <button
                key={cleric.id}
                onClick={() => setSelectedCleric(cleric)}
                className="w-full bg-white rounded-xl p-5 border border-outline-variant/30 text-left hover:border-primary hover:shadow-md transition-all flex gap-4 items-center"
              >
                <div className="w-14 h-14 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0 relative">
                  <img 
                    alt={cleric.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                    src={cleric.avatar}
                  />
                  {cleric.online && (
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-primary border-2 border-white rounded-full animate-pulse" />
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-display font-semibold text-base text-primary">{cleric.name}</h3>
                    <span className="font-mono text-[9px] font-bold uppercase py-0.5 px-2 bg-surface-container rounded">
                      {cleric.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{cleric.title}</p>
                  <p className="text-[10px] text-outline italic mt-1.5 font-medium">Click to initiation anonymous session</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-surface-container-low rounded-xl p-4 flex gap-3 text-xs text-on-surface-variant border border-primary/5">
            <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0" />
            <p className="font-sans leading-relaxed">
              <strong>100% Identity Shielding:</strong> In accordance with campus student welfare rules, all spiritual consultations are encrypted. Clerics see you only as "UMY Student" unless you manually decide to share your info.
            </p>
          </div>
        </div>
      ) : (
        /* ACTIVE CONVERSATION SCREEN */
        <div className="flex flex-col h-screen select-none">
          {/* Header */}
          <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant/30 h-16 flex justify-between items-center px-5">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedCleric(null)}
                className="p-1 hover:bg-surface-container text-on-surface hover:text-primary rounded-full transition-colors focus:outline-none"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary/5">
                <img 
                  alt={selectedCleric.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                  src={selectedCleric.avatar}
                />
              </div>

              <div>
                <h1 className="font-display text-sm font-bold text-primary leading-tight">
                  {selectedCleric.name}
                </h1>
                <p className="text-[10px] text-on-surface-variant flex items-center gap-1 font-mono font-bold tracking-wide">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedCleric.online ? 'bg-primary animate-pulse' : 'bg-outline-variant'}`} />
                  {selectedCleric.online ? 'ONLINE' : 'OFFLINE'}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => alert(`Calling ${selectedCleric.name} through secure campus server... (Audio is integrated with SSO)`)}
                className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors focus:outline-none"
              >
                <Phone className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors focus:outline-none">
                <MoreVertical className="w-4.5 h-4.5" />
              </button>
            </div>
          </header>

          {/* Chat scrolling log */}
          <div className="flex-grow pt-20 pb-36 px-5 overflow-y-auto scrollbar-hide space-y-5">
            <div className="flex flex-col items-center my-3">
              <span className="bg-surface-container text-on-surface-variant px-3.5 py-1 rounded-full font-mono text-xxs font-bold uppercase tracking-wider">
                TODAY
              </span>
            </div>

            {activeMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Avatar left */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex-shrink-0 mt-0.5 overflow-hidden">
                      <img 
                        alt="Cleric Avatar" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                        src={selectedCleric.avatar}
                      />
                    </div>
                  )}

                  <div className="flex flex-col">
                    {/* Message box */}
                    <div className={`p-4 rounded-xl ${
                      isUser 
                        ? 'bg-primary-container text-white rounded-tr-none' 
                        : 'bg-surface-container-high text-on-surface rounded-tl-none border-l-4 border-secondary'
                    }`}>
                      {msg.isVerseQuote && msg.verseRef && (
                        <p className="font-sans text-xs italic opacity-85 mb-2 border-b border-on-surface-variant/10 pb-1.5 text-secondary">
                          {msg.verseRef}
                        </p>
                      )}
                      <p className="font-sans text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-[9px] mt-1.5 text-right font-mono ${isUser ? 'text-white/60' : 'text-on-surface-variant'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center text-on-surface-variant text-xs font-medium pl-11">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                <span className="italic">Ustadz is typing wisdom...</span>
              </div>
            )}

            {/* Anonymous mode tag indicator inside screen */}
            {isAnonymous && (
              <div className="flex flex-col items-center py-2 animate-bounce-slow">
                <div className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed text-xxs font-mono font-bold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                  <ShieldAlert className="w-3.5 h-3.5 text-tertiary" />
                  <span>ANONYMOUS MODE IS ACTIVE</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Bottom Action Footer Panel with layout inputs */}
          <footer className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-outline-variant/30 shadow-lg">
            {/* Anonymous Toggle Header */}
            <div className="px-5 py-2.5 flex items-center justify-between bg-surface-container-low/50 border-b border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>Stay Anonymous (Shield Student ID)</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Core Message Input Form */}
            <form onSubmit={handleSend} className="px-5 h-20 flex items-center gap-3 bg-white pb-safe">
              <button 
                type="button" 
                onClick={() => alert('Attachments (e.g., student cards, grade reports) can be securely loaded from your student dashboard.')}
                className="text-on-surface-variant hover:text-primary focus:outline-none transition-colors active:scale-95"
              >
                <PlusCircle className="w-5 h-5 animate-pulse" />
              </button>

              <div className="flex-1 relative flex items-center bg-surface-container-low rounded-lg border border-outline-variant/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 font-sans text-sm h-11 text-on-surface placeholder:text-outline outline-none"
                />
                <button 
                  type="button" 
                  onClick={() => setInputText(prev => prev + " 😊")}
                  className="absolute right-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1"
                >
                  <Smile className="w-4.5 h-4.5" />
                </button>
              </div>

              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="w-11 h-11 bg-primary disabled:bg-primary/20 disabled:cursor-not-allowed text-on-primary rounded-lg flex items-center justify-center transition-all animate-pulse-slow shadow-md hover:bg-opacity-95"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
}
