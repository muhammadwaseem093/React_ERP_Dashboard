import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping opacity-50"></div>
      </div>
    </div>
  );
};

export default Loader;
