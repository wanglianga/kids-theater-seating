export type SeatZone = 'family' | 'quiet' | 'standard' | 'vip';
export type SeatStatus = 'available' | 'sold' | 'locked' | 'selected';

export interface Seat {
  id: string;
  row: string;
  number: number;
  zone: SeatZone;
  status: SeatStatus;
  price: number;
  distanceToStage: number;
  distanceToAisle: number;
  hasObstructionRisk: boolean;
  childHeightMin?: number;
  stepsToExit: number;
  convenienceScore: 1 | 2 | 3 | 4 | 5;
  isAisle?: boolean;
}

export interface SeatFilters {
  childHeight: number;
  preferFamilyZone: boolean;
  maxAisleDistance: number;
  preferQuietZone: boolean;
  hideObstructionRisk: boolean;
  priceRange: [number, number];
}

export interface ShowInfo {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  time: string;
  venue: string;
  duration: string;
  ageLimit: string;
}

export type TaskType = 'sticker' | 'quiz' | 'photo' | 'rally';

export interface InteractionTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  reward?: string;
  rewardEmoji?: string;
  deadline: string;
  completed: boolean;
  participants: number;
  progress: number;
}

export interface CharacterSticker {
  id: string;
  name: string;
  emoji: string;
  color: string;
  collected: boolean;
  description: string;
}

export interface RoutePoint {
  id: string;
  type: 'gate' | 'checkin' | 'seat' | 'wc' | 'nursing' | 'snack' | 'exit' | 'meeting';
  name: string;
  x: number;
  y: number;
  description?: string;
}

export interface EntryInfo {
  gate: string;
  floor: number;
  routeSteps: string[];
  meetingPoint: { name: string; landmark: string };
  lateEntry: { allowed: boolean; window: string; seat: string; note: string };
  facilities: { type: 'wc' | 'nursing' | 'snack'; location: string; icon: string }[];
}

export interface ReminderRule {
  id: string;
  category: 'intermission' | 'refund' | 'safety' | 'behavior';
  title: string;
  icon: string;
  summary: string;
  details: string[];
  highlight?: string;
}
