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
        <div className="relative bg-white p-6 rounded-lg w-full max-w-xl z-50 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-lg font-semibold">
              {editModule ? "Edit Module" : "Create Module"}
            </DialogTitle>
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded transition">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

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
  );
};

export default ModuleFormModal;
