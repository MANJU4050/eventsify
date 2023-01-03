import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    viewEvents: {
      reducer(state, action) {
        state = action.payload;
        return state;
      },
      prepare(events) {
        return {
          payload: events,
        };
      },
    },
  },
});

export const { viewEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
export const allEvents = (state) => {
  return state.events;
};
