import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/axiosClient";
import { Holding } from "../types";

const Portfolio: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    api.get("/portfolio/holdings").then((r) => setHoldings(r.data)).catch(() => setHoldings([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#E6FFF7]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-6 pt-6">
        <Sidebar />
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-[#00D09C] mb-4">Your Portfolio</h1>

          <div className="bg-white p-6 rounded-xl border border-[#00D09C]/30">
            {holdings.length === 0 ? (
              <p className="text-gray-600">No holdings yet — buy some stocks!</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-500 border-b">
                    <th className="p-2">Symbol</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Avg</th>
                    <th className="p-2">Current</th>
                    <th className="p-2">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => (
                    <tr key={h._id} className="border-b">
                      <td className="p-2">{h.symbol}</td>
                      <td className="p-2">{h.qty}</td>
                      <td className="p-2">{h.avgPrice.toFixed(2)}</td>
                      <td className="p-2">{h.currentPrice ?? "—"}</td>
                      <td className={`p-2 ${h.pnl && h.pnl >= 0 ? "text-green-600" : "text-red-500"}`}>
                        {h.pnl?.toFixed(2) ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Portfolio;