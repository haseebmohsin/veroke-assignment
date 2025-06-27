import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SymbolMatch {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

const slice = createSlice({
  name: "watchList",
  initialState: [] as SymbolMatch[],
  reducers: {
    add: (state, action: PayloadAction<SymbolMatch>) => {
      if (
        !state.find((item) => item["1. symbol"] === action.payload["1. symbol"])
      ) {
        state.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<string>) =>
      state.filter((item) => item["1. symbol"] !== action.payload),
  },
});

export const { add, remove } = slice.actions;
export const { reducer: watchListReducer } = slice;
export type WatchListItem = SymbolMatch;
