import axiosClient from '@/api/axiosClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Event {
    _id: string;
    title: string;
    organizer_id: string;
    description: string;
    location: string;
    date: string;
}

interface FormData {
    title: string;
    description: string;
    date: string;
    location: string;
}

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosClient.get('/events/get/events');
        return response.data.events;
    } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch events';
        console.error('Error fetching events:', errorMessage);
        return rejectWithValue(errorMessage);
    }
});

export const updateEvent = createAsyncThunk(
    'events/updateEvent',
    async (
        { eventId, eventData }: { eventId: string; eventData: FormData },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosClient.put(`/events/update/${eventId}`, eventData);
            return response.data.event;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to update event';
            console.error('Error updating event:', errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async (eventId: string, { rejectWithValue }) => {
        try {
            await axiosClient.delete(`/events/delete/${eventId}`);
            return eventId;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to delete event';
            console.error('Error deleting event:', errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [] as Event[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.events.findIndex((event) => event._id === action.payload._id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events = state.events.filter((event) => event._id !== action.payload);
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default eventsSlice.reducer;
