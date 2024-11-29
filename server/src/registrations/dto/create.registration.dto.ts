import { IsEmpty, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateRegistrationDTO {

    @IsNotEmpty()
    @IsString()
    full_name: string

    @IsNotEmpty()
    @IsEmpty()
    email: string

    @IsNotEmpty()
    @IsMongoId()
    event_id: Types.ObjectId
}