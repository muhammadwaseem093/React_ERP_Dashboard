import React, { useEffect, useState } from "react";
import { getModules, deleteModule, createModule, updateModule } from "../../api/modules";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogTitle } from "@headlessui/react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const modulesPerPage = 10;

  const fetchModules = async () => {
    setLoading(true);
    const data = await getModules();
    setModules(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const filtered = modules.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((currentPage - 1) * modulesPerPage, currentPage * modulesPerPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      id: (form.elements.namedItem("id") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value
    };
    try {
      if (editModule) await updateModule(editModule.id, formData);
      else await createModule(formData);
      setModalOpen(false);
      setEditModule(null);
      fetchModules();
    } catch {
      alert("Error saving module.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Modules</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-3/4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID or name"
            className="w-full px-4 py-2 pr-10 border rounded-lg shadow-sm bg-white"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          onClick={() => { setEditModule(null); setModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="w-4 h-4" /> Create Module
        </button>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white p-6 rounded-lg w-full max-w-xl z-50 shadow-lg">
            <DialogTitle className="text-lg font-semibold mb-4">
              {editModule ? "Edit Module" : "Create Module"}
            </DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Module ID</label>
                <input
                  type="text"
                  name="id"
                  defaultValue={editModule?.id || ""}
                  disabled={!!editModule}
                  className="w-full mt-1 px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Module Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editModule?.name || ""}
                  className="w-full mt-1 px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {editModule ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <div className="overflow-x-auto shadow bg-white rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={3} className="text-center py-6 text-sm text-gray-400">Loading modules...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-6 text-sm text-gray-400">No modules found.</td></tr>
            ) : (
              paginated.map((mod) => (
                <tr key={mod.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{mod.id}</td>
                  <td className="px-4 py-3 text-sm">{mod.name}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => { setEditModule(mod); setModalOpen(true); }} className="text-indigo-600 hover:text-indigo-800 mr-3 text-sm">
                      Edit
                    </button>
                    <button onClick={() => deleteModule(mod.id).then(fetchModules)} className="text-red-500 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2 p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">Page {currentPage} of {Math.ceil(filtered.length / modulesPerPage)}</span>
          <button
            disabled={currentPage === Math.ceil(filtered.length / modulesPerPage)}
            onClick={() => setCurrentPage(p => p + 1)}
            className={`px-3 py-1 rounded ${currentPage === Math.ceil(filtered.length / modulesPerPage) ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleList;
