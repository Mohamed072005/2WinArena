import { MapPin, MoreVertical, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar } from "../ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface Registration {
    _id: string
    full_name: string
    email: string
    status: string
    event_title: string
    event_date: string
    event_location: string
}

interface RgistrationListProps {
    registrations: Registration[]
}

const RegistrationsList: React.FC<RgistrationListProps> = ({ registrations }) => {
    return (
        <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Participant Name</TableHead>
                            <TableHead>Participant Email</TableHead>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registrations?.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell className="font-medium">{event.full_name}</TableCell>
                                <TableCell className="font-medium">{event.email}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {event.event_title}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {new Date(event.event_date).toISOString().split('T')[0]}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                                        {event.event_location}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.status === 'registered' ? 'bg-green-100 text-green-800' :
                                        event.status === 'canceled' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {event.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Delete Event</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default RegistrationsList;
