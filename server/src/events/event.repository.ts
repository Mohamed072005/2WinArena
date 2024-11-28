import { Injectable } from "@nestjs/common";
import { EventRepositoryInterface } from "./interfaces/event.repository.interface";
import mongoose, { Model, Types } from "mongoose";
import { Event, EventDocument } from "./event.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateEventDTO } from "./dto/create.event.dto";

@Injectable()
export class EventRepository implements EventRepositoryInterface {
    constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

    async getEventByTitleAndOrganizer(eventName: string, organizer: Types.ObjectId): Promise<EventDocument> {
        const organizerID = new mongoose.Types.ObjectId(organizer)
        return await this.eventModel.findOne({ title: eventName, organizer_id: organizerID });
    }

    async createEvent(createEventDTO: Partial<CreateEventDTO>): Promise<Event> {
        try{
            const event = new this.eventModel(createEventDTO);
            return await event.save();
        }catch(err: any){
            throw new Error(`Failed to create event: ${err.message}`);
        }
    }

    async getEventByIdAndOerganizer(eventId: Types.ObjectId, organizer: Types.ObjectId): Promise<EventDocument> {
        const eventID = new mongoose.Types.ObjectId(eventId)
        const organizerID = new mongoose.Types.ObjectId(organizer)        
        return await this.eventModel.findOne({ _id: eventID, organizer_id: organizerID });
    }

    async deleteEvent(event: Event): Promise<boolean> {
        try{
            await this.eventModel.deleteOne(event);
            return true
        }catch(err: any){
            throw err;
        }
    }

    async getEvents(organizer: Types.ObjectId): Promise<EventDocument[]> {
        const organizerID = new mongoose.Types.ObjectId(organizer);
        return await this.eventModel.find({ organizer_id: organizerID });
    }
}