import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CreateEventModal from './CreateEventModal';
import DeleteEventModal from './DeleteEventModal';
import UpdateEventModal from './UpdateEventModal';
import EventsLists from './EventsLists';
import { fetchEvents, deleteEvent, updateEvent } from '@/redux/events/eventsSlice';
import axiosClient from '@/api/axiosClient';

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

const HomeEvent: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [deleteModal, setDeleteModal] = useState<string | null>(null);
    const [editingModal, setEditingModal] = useState<Event | null>(null);

    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state: any) => state.events);

    const validateFormInputs = (payload: FormData): Record<string, string> => {
        const errors: Record<string, string> = {};
        if (!payload.title.trim()) errors.title = 'Title is required';
        if (!payload.description.trim()) errors.description = 'Description is required';
        if (!payload.location.trim()) errors.location = 'Location is required';
        if (!payload.date.trim()) errors.date = 'Date is required';
        return errors;
    };

    const handleCreateEvent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload: FormData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            location: formData.get('location') as string,
            date: selectedDate ? selectedDate.toISOString() : '',
        };

        const errors = validateFormInputs(payload);
        if (Object.keys(errors).length > 0) {
            toast.error('Please fix validation errors before submitting.');
            return;
        }

        try {
            const response = await axiosClient.post('/events/create', payload);
            toast.success('Event created successfully!');
            dispatch(fetchEvents());
            return true
        } catch (err: any) {
            console.error('Error creating event:', err);
            toast.error(err.response?.data?.message || 'Failed to create event');
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        try {
            await dispatch(deleteEvent(eventId)).unwrap();
            toast.success('Event deleted successfully!');
        } catch (err: any) {
            console.error('Error deleting event:', err);
            toast.error(err.message || 'Failed to delete event');
        } finally {
            setDeleteModal(null);
        }
    };

    const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>, eventId: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload: FormData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            location: formData.get('location') as string,
            date: formData.get('date') as string,
        };

        const errors = validateFormInputs(payload);
        if (Object.keys(errors).length > 0) {
            toast.error('Please fix validation errors before submitting.');
            return;
        }

        try {
            await dispatch(updateEvent({ eventId, eventData: payload })).unwrap();
            toast.success('Event updated successfully!');
            setEditingModal(null);
        } catch (err: any) {
            toast.error(err.message || 'Failed to update event');
        }
    };

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            let errorMessage = 'An unexpected error occurred';
            if (typeof error === 'string') {
                errorMessage = error;
            } else if (typeof error === 'object') {
                if (Array.isArray(error.message) && error.message.length > 0) {
                    errorMessage = error.message[0];
                } else if (typeof error.message === 'string') {
                    errorMessage = error.message; 
                } else {
                    errorMessage = JSON.stringify(error);
                }
            }
            toast.error(errorMessage);
        }
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
                <CreateEventModal
                    handleSubmitForm={handleCreateEvent}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <EventsLists
                    events={events}
                    setDeleteModal={setDeleteModal}
                    setEditingModal={setEditingModal}
                />
            )}
            {deleteModal && (
                <DeleteEventModal
                    eventId={deleteModal}
                    closeDeleteModal={() => setDeleteModal(null)}
                    handelDeleteEvent={handleDeleteEvent}
                />
            )}
            {editingModal && (
                <UpdateEventModal
                    event={editingModal}
                    setEditingModal={setEditingModal}
                    handleUpdateEvent={handleUpdateEvent}
                />
            )}
        </div>
    );
};

export default HomeEvent;
