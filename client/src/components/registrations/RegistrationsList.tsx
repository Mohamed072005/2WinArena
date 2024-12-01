import { Download, MapPin, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

    const downloadPDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set the document title
        doc.text("Event Registrations", 14, 15);

        // Prepare table data
        const tableData = registrations.map(event => [
            event.full_name,
            event.email,
            event.event_title,
            new Date(event.event_date).toISOString().split('T')[0],
            event.event_location,
            event.status
        ]);

        // Configure the auto table
        (doc as any).autoTable({
            startY: 25,
            head: [['Name', 'Email', 'Event', 'Date', 'Location', 'Status']],
            body: tableData,
            theme: 'striped',
            styles: {
                fontSize: 9,
                cellPadding: 3,
            },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 40 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 },
                4: { cellWidth: 30 },
                5: { cellWidth: 20 }
            }
        });
        doc.save(`event_registrations_${new Date().toISOString().split('T')[0]}.pdf`);
    };
    return (
        <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-end p-2">
                    <Button
                        variant="outline"
                        onClick={downloadPDF}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                </div>
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
