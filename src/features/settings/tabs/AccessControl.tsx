import React, { useState } from 'react';
import { ShieldCheck, User as UserIcon, Check, X } from 'lucide-react';
import { useUsersData } from '../useUsersData';
import { User, UserPermissions } from '../../../types';

const AccessControl: React.FC = () => {
  const { users, isLoading, updateUser } = useUsersData();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const togglePermission = async (user: User, key: keyof UserPermissions) => {
    if (!user.permissions) return;
    const updatedUser = {
      ...user,
      permissions: {
        ...user.permissions,
        [key]: !user.permissions[key]
      }
    };
    await updateUser(updatedUser);
    if (selectedUser?.id === user.id) {
      setSelectedUser(updatedUser);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-[600px] gap-6">
      {/* User List */}
      <div className="w-1/3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 font-semibold text-slate-900">Staff Members</div>
        <div className="flex-1 overflow-y-auto">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-4 text-left border-b border-slate-100 flex items-center gap-3 hover:bg-slate-50 ${selectedUser?.id === user.id ? 'bg-blue-50' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                {user.initials}
              </div>
              <div>
                <div className="font-medium text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Grid */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-y-auto">
        {selectedUser ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
                {selectedUser.initials}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedUser.name}</h2>
                <p className="text-slate-500">{selectedUser.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedUser.permissions || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-sm font-medium text-slate-700 capitalize">{key}</span>
                  <button
                    onClick={() => togglePermission(selectedUser, key as keyof UserPermissions)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            Select a staff member to manage permissions
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessControl;
