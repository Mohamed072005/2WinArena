import { IsEmail, IsEmpty, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateRegistrationDTO {

    @IsNotEmpty()
    @IsString()
    full_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsMongoId()
    event_id: Types.ObjectId
}