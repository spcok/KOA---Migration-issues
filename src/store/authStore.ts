import { create } from 'zustand';
import { UserProfile } from '../types';

interface AuthState {
  profile: UserProfile | null;
  session: boolean;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  profile: {
    id: '1',
    name: 'System Admin',
    role: 'Admin',
    initials: 'SA',
    job_position: 'Administrator',
    permissions: {
      dashboard: true,
      dailyLog: true,
      tasks: true,
      medical: true,
      movements: true,
      safety: true,
      maintenance: true,
      settings: true,
      flightRecords: true,
      feedingSchedule: true,
      attendance: true,
      holidayApprover: true,
      attendanceManager: true,
      missingRecords: true,
      reports: true,
      rounds: true,
    },
  },
  session: true,
  signOut: async () => {
    console.log('Mock Sign Out');
    set({ profile: null, session: false });
  },
}));
