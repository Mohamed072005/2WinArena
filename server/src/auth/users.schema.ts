import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<Users>

@Schema({ timestamps: true })
export class Users {
    @Prop({ required: true })
    full_name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true, enum: ['organizer', 'participant'] })
    role: string
}

export const UsersSchema = SchemaFactory.createForClass(Users);