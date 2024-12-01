import { Types } from "mongoose";
import { CreateRegistrationDTO } from "../dto/create.registration.dto";
import { Registration, RegistrationDocument } from "../registration.schema";

export interface RegistrationRepositoryInterface {
    findRegistrationByEmailAndEvent(eventId: Types.ObjectId, participantEmail: string):  Promise<RegistrationDocument>
    createRegistration(createRegistrationDTO: Partial<CreateRegistrationDTO>): Promise<Registration>
    hanedlGetOriganizerEventsRegistrations(organizer: Types.ObjectId): Promise<Registration[]>

}