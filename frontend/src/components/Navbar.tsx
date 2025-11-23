import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };
  return (
    <header className="w-full bg-white border-b border-[#e6f6ef]">
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-md flex items-center justify-center text-white font-bold">S</div>
          <Link to="/dashboard" className="text-lg font-semibold text-[#0f3a36]">SmartInv</Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm text-gray-700 hover:text-[#0f3a36]">Dashboard</Link>
          <Link to="/stock/AAPL" className="text-sm text-gray-700 hover:text-[#0f3a36]">Stocks</Link>
          <Link to="/portfolio" className="text-sm text-gray-700 hover:text-[#0f3a36]">Portfolio</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={logout} className="flex items-center gap-2 text-sm text-red-600 hover:opacity-90 transition">
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;