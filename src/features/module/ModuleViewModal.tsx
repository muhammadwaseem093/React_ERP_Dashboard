// ModuleViewModal.tsx
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Module {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  viewModule: Module | null;
}

const ModuleViewModal: React.FC<Props> = ({ open, onClose, viewModule }) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent" />
        <div className="relative bg-white p-8 rounded-2xl w-full max-w-md z-50 shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Module Information</h2>
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded transition">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {viewModule ? (
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Module ID</span>
                <span className="text-lg font-semibold text-gray-800">{viewModule.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Module Name</span>
                <span className="text-lg font-semibold text-gray-800">{viewModule.name}</span>
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

export default ModuleViewModal;


