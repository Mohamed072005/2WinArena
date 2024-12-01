import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RegistrationDocument = HydratedDocument<Registration>

@Schema({ timestamps: true })
export class Registration {

    @Prop({ required: true })
    full_name: string

    @Prop({ required: true })
    email: string

    @Prop({ type: Types.ObjectId, ref:'Events', required: true })
    event_id: Types.ObjectId

    @Prop({ required: true, enum: ['registered', 'canceled'], default: 'registered' })
    status: string
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration)