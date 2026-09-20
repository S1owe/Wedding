export interface TimelineStage {
  id: number;
  time: string;
  title: string;
  note: string;
}

export interface DressCodeColor {
  hex: string;
  name: string;
}

export type VenueFactIcon = 'route' | 'bed' | 'clock';

export interface VenueFact {
  id: string;
  icon: VenueFactIcon;
  title: string;
  lines: string[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isHighlighted: boolean;
}

export type AttendanceAnswer = 'yes' | 'no';
export type TransferAnswer = 'yes' | 'no' | 'canBringSomeone';
export type AccommodationAnswer = 'yes' | 'no';

export interface GuestNameEntry {
  id: number;
  name: string;
}

export interface RsvpFormState {
  guests: GuestNameEntry[];
  attendance: AttendanceAnswer | null;
  transfer: TransferAnswer | null;
  accommodation: AccommodationAnswer | null;
}

export interface RsvpFormErrors {
  guests: boolean;
  attendance: boolean;
  transfer: boolean;
  accommodation: boolean;
}
