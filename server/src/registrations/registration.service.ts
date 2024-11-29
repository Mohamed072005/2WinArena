import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RegistrationServiceInterface } from "./interfaces/registration.service.interface";
import { Types } from "mongoose";
import { CreateRegistrationDTO } from "./dto/create.registration.dto";
import { RegistrationRepositoryInterface } from "./interfaces/registration.repository.interface";
import { Registration } from "./registration.schema";
import { EventRepositoryInterface } from "src/events/interfaces/event.repository.interface";

@Injectable()
export class RegistrationService implements RegistrationServiceInterface {
    constructor(
        @Inject('RegistrationRepositoryInterface') private readonly registrationRepository: RegistrationRepositoryInterface,
        @Inject('EventRepositoryInterface') private readonly eventRepository: EventRepositoryInterface
    ) {}

    async handelCreateRegistration(organizer: Types.ObjectId, createRegistrationDTO: CreateRegistrationDTO): Promise<{ message: string, registration: Registration }> {
        const authorization = await this.eventRepository.getEventByIdAndOerganizer(createRegistrationDTO.event_id, organizer);
        if(!authorization) throw new HttpException("You're not authorized to create a registration", HttpStatus.UNAUTHORIZED);
        const registration = await this.registrationRepository.findRegistrationByEmailAndEvent(createRegistrationDTO.event_id, createRegistrationDTO.email);
        if(registration) throw new HttpException('This user already registred', HttpStatus.CONFLICT);
        const registrationPayload = {
            ...createRegistrationDTO,
            event_id: new Types.ObjectId(createRegistrationDTO.event_id)
        }        
        const createdRegistration = await this.registrationRepository.createRegistration(registrationPayload);
        if(!createdRegistration) throw new HttpException("Can't create this registration", HttpStatus.CONFLICT);
        return { 
            message: 'Registration created successfully',
            registration: createdRegistration
        }
    }
}