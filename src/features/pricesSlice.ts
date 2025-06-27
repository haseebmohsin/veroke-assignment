import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceQuote {
  symbol: string;
  price: number;
  timestamp: string;
  error?: boolean;
}

export interface PricesState {
  bySymbol: Record<string, PriceQuote>;
  lastUpdated: string | null;
}

const initialState: PricesState = {
  bySymbol: {},
  lastUpdated: null,
};

const pricesSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<PriceQuote[]>) => {
      const now = new Date().toISOString();
      action.payload.forEach((quote) => {
        state.bySymbol[quote?.symbol] = quote;
      });
      state.lastUpdated = now;
    },
  },
});

export const { updatePrices } = pricesSlice.actions;
export const { reducer: pricesReducer } = pricesSlice;
