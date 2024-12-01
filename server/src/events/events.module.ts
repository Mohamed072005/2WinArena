import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event.schema';
import { EventController } from './event.controller';
import { UtilityModule } from 'src/helpers/utility/utility.module';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
        UtilityModule
    ],
    controllers: [EventController],
    providers: [
        {
            provide: 'EventRepositoryInterface',
            useClass: EventRepository
        },
        {
            provide: 'EventServiceInterface',
            useClass: EventService
        }
    ],
    exports: [
        'EventRepositoryInterface'
    ]
})
export class EventsModule {}
