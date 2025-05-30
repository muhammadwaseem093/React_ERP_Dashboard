import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser, updateUser } from "../../api/users";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import UserForm from "../../features/users/UserForm";
import { Dialog, DialogTitle } from "@headlessui/react";
import { getRoles, type Role } from '../../api/roles';

type User = {
  id: string;
  username: string;
  email: string;
  is_active: boolean | string;
  role_id: number | string;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    console.log("Fetched users:", data); // Debug output
    setUsers(data);
    setFilteredUsers(data);
    setCurrentPage(1);
    setLoading(false);
  };

  const fetchRoles = async () => {
    const data = await getRoles();
    console.log("Fetched roles:", data); // Debug output
    setRoles(data);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    setCurrentPage(1);
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchRoles();
    loadUsers();
  }, []);

  const getRoleName = (role_id: number | string) => {
    const role = roles.find((r) => String(r.id) === String(role_id));
    return role ? role.name : 'Unknown';
  };

  const isUserActive = (value: boolean | string) => {
    return value === true || value === 'true';
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Manage Users</h2>

      {/* Filter + Create User Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
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
        <button
          onClick={() => {
            setEditUser(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Create User</span>
        </button>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" />
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl z-50 p-6 relative">
            <DialogTitle className="text-lg font-semibold mb-4">
              {editUser ? "Edit User" : "Create New User"}
            </DialogTitle>
            <UserForm
              initialData={
                editUser
                  ? {
                      ...editUser,
                      role_id: typeof editUser.role_id === "string" ? Number(editUser.role_id) : editUser.role_id,
                      is_active: editUser.is_active === true || editUser.is_active === "true",
                    }
                  : undefined
              }
              onCancel={() => {
                setIsModalOpen(false);
                setEditUser(null);
              }}
              onSubmit={async (formData) => {
                try {
                  if (editUser) {
                    await updateUser(editUser.id, formData);
                  } else {
                    await createUser(formData);
                  }
                  setIsModalOpen(false);
                  setEditUser(null);
                  loadUsers();
                } catch (err: unknown) {
                  if (err instanceof Error) {
                    alert(err.message);
                  } else {
                    alert("An unknown error occurred.");
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Username</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Active</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-6 text-sm text-gray-400">Loading users...</td></tr>
            ) : paginatedUsers.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-6 text-sm text-gray-400">No users found.</td></tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700 text-sm">{user.username}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-center text-gray-700 text-sm">{getRoleName(user.role_id)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${isUserActive(user.is_active) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isUserActive(user.is_active) ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => { setEditUser(user); setIsModalOpen(true); }} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-3">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2 p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
          </span>
          <button
            disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded-md border ${currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
