import { Home, Users, Radio } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Radio, label: "The Live Experience", path: "/live" },
    { icon: Users, label: "Profile", path: "/profile" },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-sidebar-background border-r border-gray-200",
          "transform transition-transform duration-300 ease-in-out lg:transform-none",
          "flex flex-col",
          !isOpen && "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground",
                  "transition-colors duration-200",
                  "hover:bg-sidebar-hover",
                  isActive && "bg-sidebar-hover font-medium"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden absolute -right-10 top-4 bg-white p-2 rounded-r-lg border border-l-0 border-gray-200"
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </aside>
    </>
  );
};