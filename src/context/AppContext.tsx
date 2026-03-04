import React, { createContext, useContext, ReactNode } from 'react';
import { AnimalCategory, OrgProfile, User, UserRole } from '../types';

interface AppContextType {
  foodOptions: string[];
  feedMethods: Record<string, string[]>;
  eventTypes: string[];
  activeShift: unknown;
  clockIn: (initials: string) => Promise<void>;
  clockOut: () => Promise<void>;
  orgProfile: OrgProfile;
  users: User[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value: AppContextType = {
    foodOptions: ['Day Old Chick', 'Mouse (S)', 'Mouse (M)', 'Mouse (L)', 'Rat (S)', 'Rat (M)', 'Quail', 'Rabbit'],
    feedMethods: {
      [AnimalCategory.OWLS]: ['Hand Fed', 'Bowl Fed', 'Tongs'],
      [AnimalCategory.RAPTORS]: ['Hand Fed', 'Bowl Fed', 'Tongs'],
      [AnimalCategory.MAMMALS]: ['Bowl Fed', 'Scatter Fed'],
      [AnimalCategory.EXOTICS]: ['Tongs', 'Bowl Fed'],
    },
    eventTypes: ['Training', 'Public Display', 'Medical Treatment', 'Cleaning', 'Moulting'],
    activeShift: null,
    clockIn: async () => {},
    clockOut: async () => {},
    orgProfile: {
      name: 'Kent Owl Academy',
      logo_url: 'https://picsum.photos/seed/koa/200/200',
    },
    users: [
      { id: '1', name: 'John Doe', role: UserRole.ADMIN, initials: 'JD' },
      { id: '2', name: 'Jane Smith', role: UserRole.VOLUNTEER, initials: 'JS' }
    ]
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
};
