import React, { useEffect, useState } from 'react';
import EventsLists from './EventsLists';
import axiosClient from '@/api/axiosClient';
import toast from 'react-hot-toast';
import CreateEventModal from './CreateEventModal';
import DeleteEventModal from './DeleteEventModal';
import UpdateEventModal from './UpdateEventModal';

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

interface FormErrors {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
}

const HomeEvent: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [deleteModal, setDeleteModal] = useState<string | null>(null);
    const [editingModal, setEditingModal] = useState<Event | null>(null)

    // Fetch events from the API
    const getEvents = async () => {
        try {
            const response = await axiosClient.get('/events/get/events');
            if (response.data.statusCode === 202) {
                setEvents(response.data.events);
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message?.message || 'Failed to fetch events');
        }
    };

    const validateFormInputs = (payload: FormData): FormErrors => {
        const errors: FormErrors = {};
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
            if (response.data.statusCode === 201) {
                toast.success('Event created successfully!');
                getEvents();
                setSelectedDate(null);
                return true
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message.error);
            return false
        }
    };

    const handelDeleteEvent = async (eventId: string) => {
        if (!eventId || eventId === '') {
            toast.error('No provided more info to delete this event');
            setDeleteModal(null)
        }
        try {
            const response = await axiosClient.delete(`/events/delete/${eventId}`);
            if (response.data.statusCode === 202) {
                setEvents(events.filter((event) => event._id !== eventId));
                toast.success(response.data.message);
                setDeleteModal(null);
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    const handelUpdateModal = async (e: React.FormEvent<HTMLFormElement>, eventId: string) => {
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
        try{
            const response = await axiosClient.put(`/events/update/${eventId}`, payload);
            console.log(response);
            if(response.data.statusCode === 201){
                toast.success(response.data.message);
                setEditingModal(null);
                getEvents();
            }
        }catch(err: any){
            if(Array.isArray(err.response.data.message.message)){
                toast.error(err.response.data.message.message[0]);
            }else if(!Array.isArray(err.response.data.message.message)){
                toast.error(err.response.data.message.message);
            }else{
                toast.error('Server error')
            }
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

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
            <EventsLists
                events={events}
                setDeleteModal={setDeleteModal}
                setEditingModal={setEditingModal}
            />
            {deleteModal &&
                <DeleteEventModal
                    eventId={deleteModal}
                    closeDeleteModal={() => setDeleteModal(null)}
                    handelDeleteEvent={handelDeleteEvent}
                />
            }
            {editingModal &&
                <UpdateEventModal
                    event={editingModal}
                    setEditingModal={setEditingModal}
                    handleUpdateEvent={handelUpdateModal}
                />
            }
        </div>
    );
};

export default HomeEvent;
