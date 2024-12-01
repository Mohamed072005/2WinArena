import { Types } from "mongoose";
import { CreateRegistrationDTO } from "../dto/create.registration.dto";

export interface RegistrationServiceInterface {
    handelCreateRegistration(eventId: Types.ObjectId, createRegistrationDTO: CreateRegistrationDTO)
}