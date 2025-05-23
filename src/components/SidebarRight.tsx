import { PlusIcon, ArrowDownTrayIcon,Cog6ToothIcon,PowerIcon,UserIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";



export default function SidebarRight() {
  const quickActions = [
    { name: "Add Product", shortcut: "ctrl + p", icon: PlusIcon },
    { name: "Export", shortcut: "ctrl + s", icon: ArrowDownTrayIcon },
  ];

  const items = [
    {
      name: "Fiery Chicken Zinger Burger",
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    },
    {
      name: "Saucy Chicken Wrap",
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046856.png",
    },
    {
      name: "Bold Fire Wrap",
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046774.png",
    },
    {
      name: "Fiesta Fire Fries",
      image: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
    },
    {
      name: "Spice Blaze Wings",
      image: "https://cdn-icons-png.flaticon.com/512/5787/5787193.png",
    },
    {
      name: "Chicken Tender Pops",
      image: "https://cdn-icons-png.flaticon.com/512/5787/5787196.png",
    },
    {
      name: "Sizzling Patty Burger",
      image: "https://cdn-icons-png.flaticon.com/512/5787/5787169.png",
    },
  ];

  return (
    <aside className="w-75 bg-white p-8 border-l mr-6 hidden lg:block">
      {/* Profile */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Salman"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold text-sm">SALMAN</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>

        <Menu as="div" className="relative">
          <MenuButton className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
  <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
</MenuButton>

          <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none">
            <div className="py-1">
              <MenuItem
                as="button"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UserIcon className="w-4 h-4 mr-2" />
                Profile
              </MenuItem>
              <MenuItem
                as="button"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Cog6ToothIcon className="w-4 h-4 mr-2" />
                Settings
              </MenuItem>
              <MenuItem
                as="button"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <PowerIcon className="w-4 h-4 mr-2" />
                Logout
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <hr className="mb-6"></hr>

      {/* Quick Actions */}
      <div className="mb-6">
        <div className="font-bold mb-2 text-sm">Quick Actions</div>
        {quickActions.map(({ name, shortcut, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center justify-between text-sm text-gray-700 mb-2"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <Icon className="w-4 h-4" />
              {name}
            </div>
            <span className="text-xs text-gray-400">{shortcut}</span>
          </div>
        ))}
      </div>

      <hr className="mb-6"></hr>

      {/* Fast Moving Items */}
      <div>
        <div className="font-bold mb-4 text-sm">Fast Moving Items</div>
        <ul className="text-sm text-gray-700 space-y-6">
          {items.map(({ name, image }) => (
            <li key={name} className="flex items-center gap-2">
              <img
                src={image}
                alt={name}
                className="h-5 w-5 rounded-full object-cover"
              />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
