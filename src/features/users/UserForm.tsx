import React, { useState, useEffect } from 'react';
import { getRoles, type Role } from '../../api/roles';

interface UserFormData {
  username: string;
  email: string;
  password?: string;
  role_id: number;
  is_active: boolean;
}

interface UserFormProps {
  initialData?: UserFormData & { id?: string };
  onCancel: () => void;
  onSubmit: (data: UserFormData, id?: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onCancel, onSubmit }) => {
  const [form, setForm] = useState<UserFormData>(
    initialData || {
      username: '',
      email: '',
      password: '',
      role_id: 1,
      is_active: true,
    }
  );
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form, initialData?.id);
      }}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-xl mx-auto"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder={initialData ? "Leave blank to keep current password" : "Enter password"}
            required={!initialData}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={form.role_id}
            onChange={(e) => setForm({ ...form, role_id: Number(e.target.value) })}
            className="px-3 py-2 border rounded"
            required
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          className="h-4 w-4 border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Active</label>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
