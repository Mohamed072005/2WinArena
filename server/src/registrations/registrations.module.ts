import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Registration, RegistrationSchema } from './registration.schema';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { RegistrationRepository } from './registration.repository';
import { UtilityModule } from 'src/helpers/utility/utility.module';
import { EventsModule } from '../events/events.module';
import { EventRepository } from '../events/event.repository';
import { Event, EventSchema } from 'src/events/event.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Registration.name, schema: RegistrationSchema },
            { name: Event.name, schema: EventSchema }
        ]),
        UtilityModule,
        EventsModule
    ],
    controllers: [RegistrationController],
    providers: [
        {
            provide: 'RegistrationRepositoryInterface',
            useClass: RegistrationRepository
        },
        {
            provide: 'RegistrationServiceInterface',
            useClass: RegistrationService
        },
        {
            provide: 'EventRepositoryInterface',
            useClass: EventRepository
        }
    ]
})
export class RegistrationsModule {}
