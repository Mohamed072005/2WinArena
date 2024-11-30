import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import RegistrationsList from "./RegistrationsList";
import CreateRegistration from "./CreateRegistration";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "@/redux/events/eventsSlice";
import toast from "react-hot-toast";

interface Registration {
    _id: string
    full_name: string
    email: string
    status: string
    event_title: string
    event_date: string
}

interface CreateRegistrationPayload {
    full_name: string
    email: string
    event_id: string
}

const HomeRegistration: React.FC = () => {

    const [registrations, setRegistrations] = useState<Registration>();

    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state: any) => state.events);

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    useEffect(() => {
        fetchRegistration()
    }, [])


    const fetchRegistration = async () => {
        try{
            const response = await axiosClient.get('/registrations/get/registrations');
            console.log(response);
            if(response.data.statusCode === 202){
                setRegistrations(response.data.registrations)
            }
        }catch(err: any){
            console.log(err);
        }
    }

    const validateFormInputs = (payload: CreateRegistrationPayload): Record<string, string> => {
        const errors: Record<string, string> = {};
        if (!payload.full_name.trim()) errors.location = 'Participant name is required';
        if (!payload.email.trim()) errors.title = 'Participant emial is required';
        if (!payload.event_id.trim()) errors.description = 'Event is required';
        return errors;
    };

    const createRegistration = async (payload: CreateRegistrationPayload) => {
        const errors = validateFormInputs(payload);
        if (Object.keys(errors).length > 0) {
            toast.error('Please fix validation errors before submitting.');
            return;
        }

        try{
            const response = await axiosClient.post('/registrations/create', payload);
            if (response.data.statusCode === 201) {
                toast.success(response.data.message);
                fetchRegistration()
                return true
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

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Partisipants</h1>
                    <CreateRegistration
                    events={events}
                    createRegistration={createRegistration}
                    />
                </div>
                <RegistrationsList
                registrations={registrations}
                />
            </div>
        </>
    );
}

export default HomeRegistration;
