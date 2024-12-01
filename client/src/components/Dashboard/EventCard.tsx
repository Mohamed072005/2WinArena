import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from 'lucide-react'

interface EventCardProps {
    title: string
    date: string
    location: string
    participants: number
}

export const EventCard: React.FC<EventCardProps> = ({ title, date, location, participants }) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 opacity-70" /> <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 opacity-70" /> <span>{location}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 opacity-70" /> <span>{participants} participants</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
        </Card>
    )
}

