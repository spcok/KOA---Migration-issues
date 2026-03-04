import { useState, useEffect } from 'react';
import { db } from '../../lib/db';
import { User } from '../../types';

export function useUsersData() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await db.users.toArray();
        setUsers(allUsers);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const updateUser = async (user: User) => {
    await db.users.put(user);
    setUsers(prev => prev.map(u => u.id === user.id ? user : u));
  };

  return { users, isLoading, updateUser };
}
