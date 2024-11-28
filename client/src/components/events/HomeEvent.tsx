import React, { useState } from 'react';
import { Plus, Search, Calendar, MapPin, Users, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// Mock data for events
const mockEvents = [
    { id: 1, name: 'City Marathon', date: '2023-08-15', location: 'Central Park', participants: 5000, status: 'Upcoming' },
    { id: 2, name: 'Charity Soccer Tournament', date: '2023-09-01', location: 'Community Field', participants: 200, status: 'Open' },
    { id: 3, name: 'Swimming Championship', date: '2023-09-10', location: 'Aquatic Center', participants: 150, status: 'Open' },
    { id: 4, name: 'Basketball League', date: '2023-07-20', location: 'Sports Arena', participants: 120, status: 'Completed' },
    { id: 5, name: 'Tennis Open', date: '2023-08-05', location: 'Tennis Club', participants: 64, status: 'Upcoming' },
];


const HomeEvent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredEvents = mockEvents.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === '' || event.status === statusFilter)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
                <Button className="bg-blue-500 hover:bg-blue-600">
                    <Plus className="mr-2 h-4 w-4" /> Add New Event
                </Button>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search events..."
                        className="pl-10 pr-4 py-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ii">All Statuses</SelectItem>
                        <SelectItem value="Upcoming">Upcoming</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                        <div className="relative h-52 w-full">
                            <div className="absolute top-2 right-2 z-10">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white/90">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Delete Event</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <img
                                src={EventImage}
                                alt={event.name}
                                height="50%"
                                className="transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </div>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
                            </div>
                            <span className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${event.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                    event.status === 'Open' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                }`}>
                                {event.status}
                            </span>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {event.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    {event.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Users className="mr-2 h-4 w-4" />
                                    {event.participants} participants
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default HomeEvent;
