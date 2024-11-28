import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class EventParamDTO {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => Types.ObjectId)
    eventId: Types.ObjectId
}