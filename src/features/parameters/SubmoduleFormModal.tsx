import React from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createSubmodule, updateSubmodule } from "../../api/submodules";

interface SubModule {
  id: string;
  name: string;
  module_id: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  editSubModule: SubModule | null;
  selectedModuleId: string;
  fetchSubmodules: () => void;
}

const SubmoduleFormModal: React.FC<Props> = ({
  open,
  onClose,
  editSubModule,
  selectedModuleId,
  fetchSubmodules,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      id: (form.elements.namedItem("id") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      module_id: selectedModuleId,
    };

    try {
      if (editSubModule) await updateSubmodule(editSubModule.id, formData);
      else await createSubmodule(formData);
      onClose();
      fetchSubmodules();
    } catch {
      alert("Error saving submodule.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10" />
        <div className="relative bg-white p-6 rounded-lg w-full max-w-xl z-50 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold">
              {editSubModule ? "Edit Submodule" : "Create Submodule"}
            </DialogTitle>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Submodule ID</label>
              <input
                type="text"
                name="id"
                defaultValue={editSubModule?.id || ""}
                disabled={!!editSubModule}
                className="w-full mt-1 px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editSubModule?.name || ""}
                className="w-full mt-1 px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editSubModule ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default SubmoduleFormModal;
