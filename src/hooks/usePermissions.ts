import { useAuthStore } from '../store/authStore';

export function usePermissions() {
  const { profile } = useAuthStore();
  
  const isStaff = profile?.role === 'Admin' || profile?.role === 'Keeper';
  const isAdmin = profile?.role === 'Admin';

  return {
    isStaff,
    isAdmin,
    permissions: profile?.permissions || {}
  };
}
