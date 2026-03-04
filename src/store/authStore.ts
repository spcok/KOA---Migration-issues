import { create } from 'zustand';
import { User, UserRole } from '../types';
import { db } from '../lib/db';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userId: string) => Promise<boolean>;
  logout: () => void;
  initialize: () => Promise<void>;
}

// Default admin user for development fallback
const DEFAULT_ADMIN: User = {
  id: 'dev-admin',
  name: 'System Admin',
  role: UserRole.OWNER,
  initials: 'SA',
  job_position: 'Administrator'
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (userId: string) => {
    try {
      if (userId === 'dev-admin') {
        set({ currentUser: DEFAULT_ADMIN, isAuthenticated: true });
        localStorage.setItem('auth_user_id', 'dev-admin');
        return true;
      }

      const user = await db.users.get(userId);
      if (user) {
        set({ currentUser: user, isAuthenticated: true });
        localStorage.setItem('auth_user_id', user.id);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
    localStorage.removeItem('auth_user_id');
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const storedUserId = localStorage.getItem('auth_user_id');
      if (storedUserId) {
        const user = await db.users.get(storedUserId);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
        } else if (storedUserId === 'dev-admin') {
          set({ currentUser: DEFAULT_ADMIN, isAuthenticated: true });
        }
      } else {
        // Default to admin for dev if nothing stored
        set({ currentUser: DEFAULT_ADMIN, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));
