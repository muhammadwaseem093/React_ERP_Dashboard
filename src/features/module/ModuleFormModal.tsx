import { Dialog, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createModule, updateModule } from "../../api/modules";

interface Module {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  editModule: Module | null;
  fetchModules: () => void;
}

const ModuleFormModal: React.FC<Props> = ({ open, onClose, editModule, fetchModules }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      id: (form.elements.namedItem("id") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
    };

    try {
      if (editModule) await updateModule(editModule.id, formData);
      else await createModule(formData);
      onClose();
      fetchModules();
    } catch {
      alert("Error saving module.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white p-8 rounded-2xl w-full max-w-xl z-50 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <DialogTitle className="text-xl font-bold text-gray-800">
              {editModule ? "Edit Module" : "Create Module"}
            </DialogTitle>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Module ID</label>
              <input
                type="text"
                name="id"
                defaultValue={editModule?.id || ""}
                disabled={!!editModule}
                placeholder="Enter module ID"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm disabled:bg-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
              <input
                type="text"
                name="name"
                defaultValue={editModule?.name || ""}
                placeholder="Enter module name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
              >
                {editModule ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ModuleFormModal;
