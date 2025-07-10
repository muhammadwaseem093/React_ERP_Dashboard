import { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { getModules } from "../api/modules";
import { getSubmodules } from "../api/submodules";
import { useSidebarContext } from "../context/useSidebarContext";

import {
  HomeIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

interface Module {
  id: string;
  name: string;
}

interface Submodule {
  id: string;
  name: string;
  module_id: string;
}

export default function SidebarLeft() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [submodulesMap, setSubmodulesMap] = useState<Record<string, Submodule[]>>({});
  const { refreshTrigger } = useSidebarContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const mods = await getModules();
      setModules(mods);

      const subsMap: Record<string, Submodule[]> = {};
      for (const mod of mods) {
        const subs = await getSubmodules(mod.id);
        subsMap[mod.id] = subs;
      }
      setSubmodulesMap(subsMap);
    };
    fetchData();
  }, [refreshTrigger]);

  const settingsSubItems = [
    { name: "Parameters", route: "/settings/parameters" },
    { name: "Preferences", route: "/settings/preferences" },
    { name: "Modules", route: "/settings/modules" },
    { name: "Users", route: "/settings/users" },
  ];

  const handleClick = (itemName: string, route?: string) => {
    setActiveItem(itemName);
    setSettingsOpen(false);
    setExpandedModule(null);
    if (route) navigate(route);
  };

  const moduleIconMap: Record<string, JSX.Element> = {
  Inventory: <UsersIcon className="w-5 h-5" />,
  Sales: <ShoppingCartIcon className="w-5 h-5" />,
  Purchase: <ArchiveBoxIcon className="w-5 h-5" />
};


  return (
    <aside className="w-56 bg-gray-100 p-4 hidden md:block">
      <div className="text-xs font-bold text-gray-500 mb-2">GENERAL</div>

      {/* Dashboard */}
      <div
        onClick={() => handleClick("Dashboard", "/dashboard")}
        className={`p-2 rounded cursor-pointer text-sm flex items-center gap-3 ${
          activeItem === "Dashboard" ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-800"
        }`}
      >
        <HomeIcon className="w-5 h-5" />
        <span>Dashboard</span>
      </div>

      {/* Dynamic Modules & Submodules */}
      {modules.map((mod) => (
        <div key={mod.id}>
          <div
            onClick={() => {
              setActiveItem(mod.name);
              setExpandedModule(expandedModule === mod.id ? null : mod.id);
              setSettingsOpen(false);
            }}
            className={`p-2 rounded cursor-pointer text-sm flex items-center justify-between gap-3 ${
              activeItem === mod.name ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {moduleIconMap[mod.name] || <ArchiveBoxIcon className="w-5 h-5" />}
              <span>{mod.name}</span>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-200 ${
                expandedModule === mod.id ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Submodules */}
          {expandedModule === mod.id && (
            <div className="ml-7 mt-1 space-y-1">
              {submodulesMap[mod.id]?.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    setActiveItem(sub.name);
                    navigate(`/module/${mod.id}/submodule/${sub.id}`);
                  }}
                  className={`cursor-pointer p-1.5 rounded text-sm ${
                    activeItem === sub.name
                      ? "bg-blue-400 text-white"
                      : "hover:bg-blue-100 text-gray-700"
                  }`}
                >
                  {sub.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* SUPPORT */}
      <div className="text-xs font-bold text-gray-500 mt-4 mb-2">SUPPORT</div>

      {/* Settings Dropdown */}
      <div
        onClick={() => {
          setActiveItem("Settings");
          setSettingsOpen((prev) => !prev);
          setExpandedModule(null);
        }}
        className={`p-2 rounded cursor-pointer text-sm flex items-center justify-between gap-3 ${
          activeItem === "Settings" ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-800"
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
                activeItem === name ? "bg-blue-400 text-white" : "hover:bg-blue-100 text-gray-700"
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
