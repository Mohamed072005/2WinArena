import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EventDocument = HydratedDocument<Event>

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    title: string

    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    organizer_id: Types.ObjectId

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    location: string

    @Prop({ type: Date, required: true })
    date: Date
}

export const EventSchema = SchemaFactory.createForClass(Event);