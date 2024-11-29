import { Injectable } from "@nestjs/common";
import { RegistrationRepositoryInterface } from "./interfaces/registration.repository.interface";
import mongoose, { Model, Types } from "mongoose";
import { CreateRegistrationDTO } from "./dto/create.registration.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Registration, RegistrationDocument } from "./registration.schema";

@Injectable()
export class RegistrationRepository implements RegistrationRepositoryInterface {
    constructor(@InjectModel(Registration.name) private readonly registrationModel: Model<Registration>) { }

    async findRegistrationByEmailAndEvent(eventId: Types.ObjectId, participantEmail: string): Promise<RegistrationDocument> {
        const eventID = new mongoose.Types.ObjectId(eventId);
        return await this.registrationModel.findOne({ event_id: eventID, email: participantEmail })
    }

    async createRegistration(createRegistrationDTO: Partial<CreateRegistrationDTO>): Promise<Registration> {
        try {
            const registration = new this.registrationModel(createRegistrationDTO);
            return await registration.save();
        } catch (err: any) {
            throw err;
        }
    }

    async hanedlGetOriganizerEventsRegistrations(organizer: Types.ObjectId): Promise<Registration[]> {
        const organizer_id = new mongoose.Types.ObjectId(organizer);
        return await this.registrationModel.aggregate([
            {
                $lookup: {
                    from: 'events',
                    localField: 'event_id',
                    foreignField: '_id',
                    as: 'event'
                },
            },

            { $unwind: '$event' },

            {
                $match: {
                    'event.organizer_id': organizer_id
                }
            },

            {
                $project: {
                    full_name: 1,
                    email: 1,
                    status: 1,
                    event_title: '$event.title',
                    event_date: '$event.date'
                }
            }
        ])
    }
}