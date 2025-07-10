// SubmoduleViewModal.tsx
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Submodule {
  id: string;
  name: string;
  module_id: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  viewSubmodule: Submodule | null;
}

const SubmoduleViewModal: React.FC<Props> = ({ open, onClose, viewSubmodule }) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent" />
        <div className="relative bg-white p-8 rounded-2xl w-full max-w-md z-50 shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Submodule Information</h2>
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded transition">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {viewSubmodule ? (
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Submodule ID</span>
                <span className="text-lg font-semibold text-gray-800">{viewSubmodule.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Submodule Name</span>
                <span className="text-lg font-semibold text-gray-800">{viewSubmodule.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Parent Module ID</span>
                <span className="text-lg font-semibold text-gray-800">{viewSubmodule.module_id}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default SubmoduleViewModal;
