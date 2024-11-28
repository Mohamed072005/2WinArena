import { Types } from "mongoose";
import { Event, EventDocument } from "../event.schema";
import { CreateEventDTO } from "../dto/create.event.dto";

export interface EventRepositoryInterface {
    getEventByTitleAndOrganizer(eventName: string, organizer: Types.ObjectId): Promise<Event>
    createEvent(createEventDTO: Partial<CreateEventDTO>): Promise<Event>
    getEventByIdAndOerganizer(eventId: Types.ObjectId,  organizer: Types.ObjectId): Promise<EventDocument>
    deleteEvent(event: Event): Promise<boolean>;
}