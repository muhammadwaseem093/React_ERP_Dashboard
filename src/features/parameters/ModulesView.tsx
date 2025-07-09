/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getModules } from "../../api/modules";
import { getSubmodules } from "../../api/submodules";
import SubmoduleFormModal from "./SubmoduleFormModal";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

interface Module {
  id: string;
  name: string;
}

interface SubModule {
  id: string;
  name: string;
  module_id: string;
}

const ITEMS_PER_PAGE = 10;

const ModuleViewInParameter: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [submoduleModalOpen, setSubmoduleModalOpen] = useState(false);
  const [submodules, setSubmodules] = useState<SubModule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchModules = async () => {
    const data = await getModules();
    setModules(data);
    if (data.length > 0) setSelectedModuleId(data[0].id);
  };

  const fetchSubmodules = async () => {
    if (!selectedModuleId) return;
    const data = await getSubmodules(selectedModuleId);
    setSubmodules(data);
  };

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    fetchSubmodules();
  }, [selectedModuleId]);

  const filtered = submodules.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Sub-Modules</h2>

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search submodule..."
          className="w-full sm:w-3/4 px-4 py-2 border rounded-lg shadow-sm bg-white"
        />

        <button
          onClick={() => setSubmoduleModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusIcon className="w-4 h-4" />
          Create
        </button>
      </div>

      {/* Category Dropdown */}
      <div className="bg-gray-100 text-sm p-3 rounded flex justify-between items-center mb-3">
        <span className="text-gray-700 font-semibold">Category</span>
        <select
          value={selectedModuleId}
          onChange={(e) => {
            setSelectedModuleId(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-1 border border-blue-400 text-blue-600 rounded-md bg-white shadow-sm"
        >
          {modules.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
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
            {paginated.length > 0 ? (
              paginated.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button className="text-indigo-500 hover:text-indigo-700">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No submodules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2 p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <SubmoduleFormModal
        open={submoduleModalOpen}
        onClose={() => setSubmoduleModalOpen(false)}
        editSubModule={null}
        selectedModuleId={selectedModuleId}
        fetchSubmodules={fetchSubmodules}
      />
    </div>
  );
};

export default ModuleViewInParameter;
