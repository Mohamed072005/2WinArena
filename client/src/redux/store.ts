import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from '@/redux/events/eventsSlice'

const store = configureStore({
    reducer: {
        events: eventsReducer
    }
})

export default store;