import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ArchiveBoxIcon,
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  // QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function SidebarLeft() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const navigate = useNavigate();

  const settingsSubItems = [
    { name: "Parameters", route: "/settings/parameters" },
    { name: "Preferences", route: "/settings/preferences" },
    { name: "Plugin", route:"/settings/plugin"},
    { name: "Users", route: "/settings/users" },
  ];

  const inventorySubItems = [
    { name: "Item List", route: "/inventory/item-list" },
    { name: "Main Item", route: "/inventory/main-item" },
    { name: "Non-Core Item", route: "/inventory/non-core-item" },
    { name: "Common Item", route: "/inventory/common-item" },
    { name: "Equipment", route: "/inventory/equipment" },
  ];

  const handleClick = (itemName: string, route?: string) => {
    setActiveItem(itemName);
    setSettingsOpen(false);
    setInventoryOpen(false);
    if (route) navigate(route);
  };

  return (
    <aside className="w-56 bg-gray-100 p-4 hidden md:block">
      <div className="text-xs font-bold text-gray-500 mb-2">GENERAL</div>

      {/* Dashboard */}
      <div
        onClick={() => handleClick("Dashboard", "/dashboard")}
        className={`p-2 rounded cursor-pointer text-sm flex items-center gap-3 ${
          activeItem === "Dashboard"
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 text-gray-800"
        }`}
      >
        <HomeIcon className="w-5 h-5" />
        <span>Dashboard</span>
      </div>

      {/* Inventory Dropdown */}
      <div
        onClick={() => {
          setActiveItem("Inventory");
          setInventoryOpen((prev) => !prev);
          setSettingsOpen(false);
        }}
        className={`p-2 rounded cursor-pointer text-sm flex items-center justify-between gap-3 ${
          activeItem === "Inventory"
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 text-gray-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <ArchiveBoxIcon className="w-5 h-5" />
          <span>Inventory</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 transform transition-transform duration-200 ${
            inventoryOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {inventoryOpen && (
        <div className="ml-7 mt-1 space-y-1">
          {inventorySubItems.map(({ name, route }) => (
            <div
              key={name}
              onClick={() => handleClick(name, route)}
              className={`cursor-pointer p-1.5 rounded text-sm ${
                activeItem === name
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Other Items */}
      {[
        { name: "Sales Orders", icon: ShoppingCartIcon, route: "/sales-orders" },
        { name: "Suppliers", icon: UsersIcon, route: "/suppliers" },
        { name: "Reports", icon: ChartBarIcon, route: "/reports" },
      ].map(({ name, icon: Icon, route }) => (
        <div
          key={name}
          onClick={() => handleClick(name, route)}
          className={`p-2 rounded cursor-pointer text-sm flex items-center gap-3 ${
            activeItem === name
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 text-gray-800"
          }`}
        >
          <Icon className="w-5 h-5" />
          <span>{name}</span>
        </div>
      ))}

      <div className="text-xs font-bold text-gray-500 mt-4 mb-2">SUPPORT</div>

      {/* Help */}
      <div
        onClick={() => handleClick("Help", "/help")}
        className={`p-2 rounded cursor-pointer text-sm flex items-center gap-3 ${
          activeItem === "Help"
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 text-gray-800"
        }`}
      >
        {/* <QuestionMarkCircleIcon className="w-5 h-5" />
        <span>Help</span> */}
      </div>

      {/* Settings Dropdown */}
      <div
        onClick={() => {
          setActiveItem("Settings");
          setSettingsOpen((prev) => !prev);
          setInventoryOpen(false);
        }}
        className={`p-2 rounded cursor-pointer text-sm flex items-center justify-between gap-3 ${
          activeItem === "Settings"
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 text-gray-800"
        }`}
      >
        <div className="flex items-center gap-3">
          <Cog6ToothIcon className="w-5 h-5" />
          <span>Settings</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 transform transition-transform duration-200 ${
            settingsOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {settingsOpen && (
        <div className="ml-7 mt-1 space-y-1">
          {settingsSubItems.map(({ name, route }) => (
            <div
              key={name}
              onClick={() => handleClick(name, route)}
              className={`cursor-pointer p-1.5 rounded text-sm ${
                activeItem === name
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
