import React from "react";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Settings</h1>
      <div className="space-y-2">
        <Link to="/settings/users" className="block text-blue-600 hover:underline">
          Manage Users
        </Link>
        <Link to="/settings/plugin" className="block text-blue-600 hover:underline">
          Manage Modules
        </Link>
        {/* Future: Roles, Permissions */}
      </div>
    </div>
  );
};

export default Settings;
