import { useState } from "react";
import { Plus } from 'lucide-react';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Event {
    _id: string;
    title: string;
    organizer_id: string;
    description: string;
    location: string;
    date: string;
}

interface CreateRegistrationProps {
    events: Event[]
    createRegistration: (payload: CreateRegistrationPayload) => boolean
}

interface CreateRegistrationPayload {
    full_name: string
    email: string
    event_id: string
}

const CreateRegistration: React.FC<CreateRegistrationProps> = ({ events, createRegistration }) => {
    const [selectedEvent, setSelectedEvent] = useState<string>("")
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handelFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload: CreateRegistrationPayload = {
            full_name: formData.get('full_name') as string,
            email: formData.get('email') as string,
            event_id: selectedEvent
        }
        const response = await createRegistration(payload);
        if(response) setOpen(false);
    }

    const filteredEvents = events
        .filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 3);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:bg-gradient-to-r hover:from-red-700 hover:to-blue-700 hover:scale-105 transition-transform duration-300">
                        <Plus className="mr-2 h-4 w-4" /> Add New Participant
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new participant.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handelFormSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Participant Name</Label>
                            <Input id="title" name="full_name" placeholder="Enter event title" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Participant Email</Label>
                            <Input id="title" name="email" placeholder="Enter event title" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event">Event</Label>
                            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an event" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2">
                                        <Input
                                            placeholder="Search events..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    {filteredEvents.map((event) => (
                                        <SelectItem key={event._id} value={event._id}>
                                            {event.title}
                                        </SelectItem>
                                    ))}
                                    {filteredEvents.length === 0 && (
                                        <div className="p-2 text-center text-sm text-gray-500">
                                            No matching events found
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>

                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-gradient-to-r from-red-600 to-blue-600">Create Participant</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateRegistration;
