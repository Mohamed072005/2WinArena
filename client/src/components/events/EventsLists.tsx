import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EventImage from '@/assets/img/sportsEvents.webp'
import { Calendar, MapPin, MoreVertical } from 'lucide-react'
import { Button } from "../ui/button";

interface Event {
    _id: string
    title: string
    organizer_id: string
    description: string
    location: string
    date: string
}

interface EventsListsProps {
    events: Event[]
    setDeleteModal: (eventId: string) => void
    setEditingModal: (event: Event) => void
}

const EventsLists: React.FC<EventsListsProps> = ({ events, setDeleteModal, setEditingModal }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length === 0 && 
                <span>There is no event right now</span>
                }
                {events?.map((event) => (
                    <Card key={event._id} className="overflow-hidden">
                        <div className="relative h-72 w-full">
                            <div className="absolute top-2 right-2 z-10">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white/90">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => setEditingModal(event)}>Edit Event</DropdownMenuItem>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600" onClick={() => setDeleteModal(event._id)}>Delete Event</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <img
                                src={EventImage}
                                alt={event.title}
                                className="transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </div>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {new Date(event.date).toISOString().split('T')[0]}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    {event.location}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default EventsLists;
