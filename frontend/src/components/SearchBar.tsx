import React, { useState, useRef } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

type Result = { symbol: string; description?: string };

const SearchBar: React.FC = () => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const nav = useNavigate();
  const timer = useRef<number | null>(null);

  const onChange = (v: string) => {
    setQ(v);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      if (!v) return setResults([]);
      try {
        const r = await api.get(`/stocks/search?q=${encodeURIComponent(v)}`);
        const data = r.data.result ?? r.data ?? [];
        setResults(data.slice(0, 6));
      } catch {
        setResults([]);
      }
    }, 300);
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        value={q}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search stocks (AAPL, INFY...)"
        className="w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-green-500 outline-none"
      />
      {results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border max-h-56 overflow-auto z-50">
          {results.map((r) => (
            <div
              key={r.symbol}
              onClick={() => nav(`/stock/${r.symbol}`)}
              className="p-3 hover:bg-[#f1fff6] cursor-pointer"
            >
              <div className="font-medium">{r.symbol}</div>
              {r.description && <div className="text-xs text-gray-500">{r.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;