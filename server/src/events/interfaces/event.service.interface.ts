import { Types } from "mongoose";
import { CreateEventDTO } from "../dto/create.event.dto";
import { Event } from "../event.schema";
import { UpdateEventDTO } from "../dto/update.event.dto";

export interface EventServiceInterface {
    createEvent(createEventDTO: CreateEventDTO, origanizer: Types.ObjectId): Promise<Event>
    handelUpdateEvent(updateEventDTO: UpdateEventDTO, origanizer: Types.ObjectId, eventId: Types.ObjectId): Promise<Event>
    handelDeleteEvent(organizer: Types.ObjectId, eventId: Types.ObjectId): Promise<{ message: string }>
}