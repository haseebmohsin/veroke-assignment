import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { watchListReducer } from "@/features/watchListSlice";
import { configureStore } from "@reduxjs/toolkit";
import { pricesReducer } from "@/features/pricesSlice";
import pricesMiddleware from "@/middleware/pricesMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      watchList: watchListReducer,
      prices: pricesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pricesMiddleware),
  });
};

// Infer types from store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
