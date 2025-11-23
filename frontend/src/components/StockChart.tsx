import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../api/axiosClient";

type Point = { date: string; close: number };

const StockChart: React.FC<{ symbol: string; days?: number }> = ({ symbol, days = 30 }) => {
  const [data, setData] = useState<Point[]>([]);
  useEffect(() => {
    if (!symbol) return;
    (async () => {
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - days * 24 * 60 * 60;
        const r = await api.get(`/stocks/candles/${symbol}?from=${from}&to=${to}&resolution=D`);
        const d = r.data;
        if (d && d.t && Array.isArray(d.t)) {
          const series = d.t.map((ts: number, i: number) => ({
            date: new Date(ts * 1000).toLocaleDateString(),
            close: d.c[i],
          }));
          setData(series);
        } else {
          setData([]);
        }
      } catch {
        setData([]);
      }
    })();
  }, [symbol, days]);

  if (!data.length) return <div className="p-6 text-center text-gray-500">No chart data</div>;

  return (
    <div className="bg-white p-4 rounded-xl border border-[#e6f6ef]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#10B981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;