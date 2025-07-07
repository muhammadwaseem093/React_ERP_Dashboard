// ModuleDeleteModal.tsx
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { deleteModule } from "../../api/modules";

interface Module {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  moduleToDelete: Module | null;
  fetchModules: () => void;
}

const ModuleDeleteModal: React.FC<Props> = ({ open, onClose, moduleToDelete, fetchModules }) => {
  const handleDelete = async () => {
    if (moduleToDelete) {
      await deleteModule(moduleToDelete.id);
      fetchModules();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent" />
        <div className="relative bg-white p-8 rounded-2xl w-full max-w-sm z-50 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Delete Module</h2>
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded transition">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <span className="font-bold text-red-500">{moduleToDelete?.name}</span>?
          </p>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700">
              Cancel
            </button>
            <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModuleDeleteModal;
