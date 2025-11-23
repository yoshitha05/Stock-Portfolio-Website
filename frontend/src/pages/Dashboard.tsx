import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me"); 
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#E6FFF7]">
      <Navbar />
      <div className="w-full px-4 md:px-8 flex gap-6 pt-6">
        <Sidebar />
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#00D09C]">
              Dashboard {user && `- Welcome, ${user.name}`}
            </h1>
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/portfolio" className="block">
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#00D09C]/30 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-gray-800">Your Portfolio</h2>
                <p className="text-gray-600">View investments and returns.</p>
              </div>
            </Link>

            <Link to="/stock/AAPL" className="block">
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#00D09C]/30 hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-gray-800">Explore Stocks</h2>
                <p className="text-gray-600">Search and trade stocks.</p>
              </div>
            </Link>

            <div className="bg-white p-6 rounded-xl shadow-md border border-[#00D09C]/30">
              <h2 className="text-xl font-semibold text-gray-800">Funds</h2>
              <p className="text-gray-600">Mutual funds (coming soon).</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;