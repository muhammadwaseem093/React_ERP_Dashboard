import React, { useEffect, useState } from "react";
import { getModules } from "../../api/modules";
import ModuleFormModal from "./ModuleFormModal";
import ModuleViewModal from "./ModuleViewModal";
import ModuleDeleteModal from "./ModuleDeleteModal";
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";


interface Module {
  id: string;
  name: string;
}

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModule, setEditModule] = useState<Module | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModule, setViewModule] = useState<Module | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [currentPage] = useState(1);
  const modulesPerPage = 10;

  const fetchModules = async () => {
    setLoading(true);
    const data = await getModules();
    setModules(data);
    setLoading(false);
  };

  useEffect(() => { fetchModules(); }, []);

  const filtered = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((currentPage - 1) * modulesPerPage, currentPage * modulesPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Modules</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID or name"
          className="w-full sm:w-3/4 px-4 py-2 border rounded-lg shadow-sm bg-white"
        />
        <button
          onClick={() => { setEditModule(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="w-4 h-4" /> Create
        </button>
      </div>

      <div className="overflow-x-auto shadow bg-white rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Name</th>
              <th className="px-4 py-3 text-center text-xs font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={3} className="text-center py-6">Loading...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-6">No modules found.</td></tr>
            ) : (
              paginated.map(mod => (
                <tr key={mod.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{mod.id}</td>
                  <td className="px-4 py-3">{mod.name}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button onClick={() => { setViewModule(mod); setViewModalOpen(true); }} title="View" className="text-yellow-500 hover:text-yellow-700">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => { setEditModule(mod); setModalOpen(true); }} title="Edit" className="text-indigo-500 hover:text-indigo-700">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => { setModuleToDelete(mod); setDeleteModalOpen(true); }} title="Delete" className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ModuleFormModal
  open={modalOpen}
  onClose={() => { setModalOpen(false); setEditModule(null); }}
  editModule={editModule}
  fetchModules={fetchModules}
/>

<ModuleViewModal
  open={viewModalOpen}
  onClose={() => setViewModalOpen(false)}
  viewModule={viewModule}
/>

<ModuleDeleteModal
  open={deleteModalOpen}
  onClose={() => { setDeleteModalOpen(false); setModuleToDelete(null); }}
  moduleToDelete={moduleToDelete}
  fetchModules={fetchModules}
/>

    </div>
  );
};

export default ModuleList;
