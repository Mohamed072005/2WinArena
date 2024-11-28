import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EventServiceInterface } from "./interfaces/event.service.interface";
import { CreateEventDTO } from "./dto/create.event.dto";
import { Event, EventDocument } from "./event.schema";
import { EventRepositoryInterface } from "./interfaces/event.repository.interface";
import mongoose, { Types } from "mongoose";
import { UpdateEventDTO } from "./dto/update.event.dto";

@Injectable()
export class EventService implements EventServiceInterface {

    constructor(@Inject('EventRepositoryInterface') private readonly eventRepository: EventRepositoryInterface) { }

    async createEvent(createEventDTO: CreateEventDTO, origanizer: Types.ObjectId): Promise<Event> {
        const userEvent = await this.eventRepository.getEventByTitleAndOrganizer(createEventDTO.title, origanizer)
        console.log(userEvent);
        
        if (userEvent) throw new HttpException('Please choose a unique Title', HttpStatus.UNAUTHORIZED);
        const eventToCreate = {
            ...createEventDTO,
            organizer_id: new Types.ObjectId(origanizer)
        }
        const event = await this.eventRepository.createEvent(eventToCreate);
        if (!event) throw new HttpException('Failed to create event', HttpStatus.BAD_REQUEST);
        return event;
    }

    async handelUpdateEvent(updateEventDTO: UpdateEventDTO, origanizer: Types.ObjectId, eventId: Types.ObjectId): Promise<EventDocument> {
        const event = await this.eventRepository.getEventByIdAndOerganizer(eventId, origanizer);        
        if (!event) throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        try {
            event.title = updateEventDTO.title;
            event.location = updateEventDTO.location;
            event.description = updateEventDTO.description;
            event.date = updateEventDTO.date
            await event.save()
            return event;
        }catch(err: any){
            throw err
        }
    }

    async handelDeleteEvent(organizer: Types.ObjectId, eventId: Types.ObjectId): Promise<{ message: string; }> {
        const event = await this.eventRepository.getEventByIdAndOerganizer(eventId, organizer)
        if(!event) throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        const deleteEvent = this.eventRepository.deleteEvent(event as Event);
        if(!deleteEvent) throw new HttpException('Failed to delete this event', HttpStatus.BAD_REQUEST);
        return {
            message: 'Event deleted successfully'
        }
    }
}