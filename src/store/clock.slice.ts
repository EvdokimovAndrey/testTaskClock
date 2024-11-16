import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Clock {
  id: number;
  timezoneId: string | null;
}

export interface ClockState {
  clocks: Clock[];
}

const initialState: ClockState = {
  clocks: [
    { id: 1, timezoneId: null },
    { id: 2, timezoneId: null },
  ],
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    addClock: (state) => {
      state.clocks.push({ id: state.clocks.length + 1, timezoneId: null });
    },
    removeClock: (state, action: PayloadAction<number>) => {
      const index = state.clocks.findIndex(
        (clock) => clock.id === action.payload,
      );
      if (index !== -1) {
        state.clocks.splice(index, 1);
      }
    },
    selectTimezone: (
      state,
      action: PayloadAction<{ timezoneId: string; clockId: number }>,
    ) => {},
  },
});

export const { addClock, removeClock, selectTimezone } = clockSlice.actions;
export default clockSlice.reducer;
