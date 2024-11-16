import { configureStore } from "@reduxjs/toolkit";
import clockReducer from "./clock.slice";
import timezoneReducer from "./timezone.slice";

export const store = configureStore({
  reducer: {
    timezone: timezoneReducer,
    clock: clockReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
