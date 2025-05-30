import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, createUser } from '../../api/users';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import UserForm from '../../features/users/UserForm';
import { Dialog,DialogTitle } from '@headlessui/react';

type User = {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
  role_id: number;
};


const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] =useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setFilteredUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredUsers(users);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Manage Users</h2>

      {/* Filter + Create User Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        {/* Search with clear (X) button */}
        <div className="relative w-full sm:w-3/4">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by username or email"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Create User button */}
        <button
  onClick={() => setIsModalOpen(true)}
  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
>
  <PlusIcon className="w-4 h-4" />
  <span className="text-sm font-medium">Create User</span>
</button>

      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen px-4">
    <div className="fixed inset-0 bg-black opacity-30" />

    <div className="bg-white rounded-lg shadow-lg w-full max-w-xl z-50 p-6 relative">
      <DialogTitle className="text-lg font-semibold mb-4">Create New User</DialogTitle>
      
      <UserForm
        onCancel={() => setIsModalOpen(false)}
        onSubmit={async (formData) => {
          try {
            await createUser(formData);
            setIsModalOpen(false);
            loadUsers();
          } catch (err: unknown) {
            if (err instanceof Error) {
              alert(err.message);
            } else {
              alert('An unknown error occurred.');
            }
          }
        }}
      />
    </div>
  </div>
</Dialog>


      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Username
        </th>
        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Role ID
        </th>
        <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Active
        </th>
        <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {loading ? (
        <tr>
          <td colSpan={5} className="text-center py-6 text-sm text-gray-400">
            Loading users...
          </td>
        </tr>
      ) : filteredUsers.length === 0 ? (
        <tr>
          <td colSpan={5} className="text-center py-6 text-sm text-gray-400">
            No users found.
          </td>
        </tr>
      ) : (
        filteredUsers.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50 transition">
            <td className="px-4 sm:px-6 py-3 text-gray-700 text-xs sm:text-sm">{user.username}</td>
            <td className="px-4 sm:px-6 py-3 text-gray-700 text-xs sm:text-sm">{user.email}</td>
            <td className="px-2 sm:px-4 py-3 text-center text-gray-700 text-xs sm:text-sm">{user.role_id}</td>
            <td className="px-2 sm:px-4 py-3 text-center">
              <span
                className={`inline-block px-2 py-1 text-[10px] sm:text-xs rounded-full font-medium ${
                  user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-4 sm:px-6 py-3 text-center">
              <button
                className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-medium mr-3"
                onClick={() => alert("Edit coming soon")}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default UserList;
