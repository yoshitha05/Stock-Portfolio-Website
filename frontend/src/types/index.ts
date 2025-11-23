export interface UserPayload {
id: string;
name?: string;
email?: string;
}


export interface QuoteResponse {
c?: number; // current price (finnhub)
h?: number;
l?: number;
o?: number;
pc?: number;
}


export interface Holding {
_id: string;
symbol: string;
qty: number;
avgPrice: number;
currentPrice?: number | null;
pnl?: number | null;
}