export interface User {
  email: string;
  name: string;
  nim: string;
  avatar: string;
}

export interface PrayerTime {
  name: string;
  time: string;
  active: boolean;
}

export interface MosqueEvent {
  id: string;
  title: string;
  speaker: string;
  location: string;
  time: string;
  category: 'Academic' | 'Tahsin' | 'Community' | 'Prayer';
  avatar?: string;
  joinedCount?: number;
  reminded?: boolean;
}

export interface ImamAssignment {
  day: string;
  subuh: string;
  dhuhur: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface KajianSession {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  location: string;
  avatar: string;
  reserved?: boolean;
  addedToCalendar?: boolean;
}

export interface Cleric {
  id: string;
  name: string;
  title: string;
  avatar: string;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'cleric';
  timestamp: string;
  isVerseQuote?: boolean;
  verseRef?: string;
}

export interface Donation {
  id: string;
  amount: number;
  date: string;
  source: string;
}

export interface NotificationSettings {
  adhanReminders: boolean;
  weeklyAlKahf: boolean;
  mosqueActivity: boolean;
  consultantReplies: boolean;
  quietHours: boolean;
}
