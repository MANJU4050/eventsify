import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from '../features/events/eventsSlice'
import filterReducer from '../features/navbar/filterSlice'

export const store = configureStore({
    reducer:{
        events: eventsReducer,
        filters:filterReducer
    }
})