import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StockChart from "../components/StockChart";
import api from "../api/axiosClient";

const StockDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [quote, setQuote] = useState<number | null>(null);

  useEffect(() => {
    if (!symbol) return;
    api.get(`/stocks/quote/${symbol}`).then((r) => {
      setQuote(r.data.c ?? r.data.current ?? null);
    }).catch(() => setQuote(null));
  }, [symbol]);

  return (
    <div className="min-h-screen bg-[#E6FFF7]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-6 pt-6">
        <Sidebar />
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#00D09C]">{symbol}</h1>
              <p className="text-gray-700">{quote ? `₹${quote}` : "—"}</p>
            </div>
          </div>

          <StockChart symbol={symbol ?? "AAPL"} days={60} />

          <div className="mt-6 bg-white p-6 rounded-xl border border-[#00D09C]/30">
            <p className="text-gray-700">More company info and stats go here.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockDetails;