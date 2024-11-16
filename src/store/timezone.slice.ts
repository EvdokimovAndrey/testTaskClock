import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTimezonesFromService } from "../services/TimezoneService";

export interface Timezone {
  timezone: string;
  name: string;
}

export interface TimezoneState {
  timezones: Timezone[];
  selectedTimezones: Record<string, string>;
  isLoading: boolean;
  error: string | null;
}

const initialState: TimezoneState = {
  timezones: [],
  selectedTimezones: {},
  isLoading: false,
  error: null,
};

export const fetchTimezones = createAsyncThunk(
  "timezone/fetchTimezones",
  async (_, thunkAPI) => {
    try {
      return await fetchTimezonesFromService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const timezoneSlice = createSlice({
  name: "timezone",
  initialState,
  reducers: {
    selectTimezone: (
      state,
      action: PayloadAction<{ timezoneId: string; clockId: number }>,
    ) => {
      state.selectedTimezones = {
        ...state.selectedTimezones,
        [action.payload.clockId]: action.payload.timezoneId,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimezones.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTimezones.fulfilled, (state, action) => {
        state.timezones = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTimezones.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { selectTimezone } = timezoneSlice.actions;
export default timezoneSlice.reducer;
