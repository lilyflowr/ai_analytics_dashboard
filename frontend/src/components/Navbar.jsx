import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`;

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-[#0f172a] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold text-white">SalesIQ</span>
        <nav className="flex gap-6">
          <NavLink to="/" className={navLinkClass} end>
            Dashboard
          </NavLink>
          <NavLink to="/predictions" className={navLinkClass}>
            Predictions
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
