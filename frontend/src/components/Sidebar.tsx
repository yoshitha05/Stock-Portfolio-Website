import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiTrendingUp, FiPieChart, FiBook } from "react-icons/fi";

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:block w-64 bg-white border-r border-[#e6f6ef] h-[calc(100vh-64px)] sticky top-16 p-4">
      <ul className="space-y-3">
        <li>
          <Link to="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f1fff6] transition">
            <FiHome /> <span className="font-medium">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/stock/AAPL" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f1fff6] transition">
            <FiTrendingUp /> <span className="font-medium">Explore Stocks</span>
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f1fff6] transition">
            <FiPieChart /> <span className="font-medium">Portfolio</span>
          </Link>
        </li>
        <li>
          <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f1fff6] transition">
            <FiBook /> <span className="font-medium">Learn</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;