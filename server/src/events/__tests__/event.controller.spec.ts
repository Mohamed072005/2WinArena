import { AuthGuard } from "../../common/guards/auth.guard";
import { CreateEventDTO } from "../dto/create.event.dto";
import { EventController } from "../event.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus } from "@nestjs/common";
import { UserRequestType } from "../../common/types/user.request.type";
import mongoose from "mongoose";
import { UtilityService } from "../../helpers/utility/utility.service";
import { UpdateEventDTO } from "../dto/update.event.dto";

const mockUser: UserRequestType = {
    _id: new mongoose.Types.ObjectId('6748799d4ff21796c14bd694'),
    email: 'test@example.com'
};

const mockCreateEventDTO: CreateEventDTO = {
    title: 'Classico',
    description: 'Leo fl Bernabeu',
    location: 'Madrid',
    date: new Date()
}

const mockEvent = {
    _id: 'event123',
    ...mockCreateEventDTO,
    organizedId: mockUser._id
}

describe('EventController', () => {
    let controller: EventController;
    let mockUtilityService: Partial<UtilityService>
    let mockEventService: {
        createEvent: jest.Mock;
        handelUpdateEvent: jest.Mock;
        handelDeleteEvent: jest.Mock
    }
    let mockEventRepository: {
        getEvents: jest.Mock;
    };

    beforeEach(async () => {
        mockEventService = {
            createEvent: jest.fn(),
            handelUpdateEvent: jest.fn(),
            handelDeleteEvent: jest.fn()
        };

        mockEventRepository = {
            getEvents: jest.fn()
        };
        mockUtilityService = {
            handelHashPassword: jest.fn(),
            generateJWTToken: jest.fn(),
            verifyPassword: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventController],
            providers: [
                {
                    provide: 'EventServiceInterface',
                    useValue: mockEventService
                },
                {
                    provide: 'EventRepositoryInterface',
                    useValue: mockEventRepository
                },
                {
                    provide: AuthGuard,
                    useValue: {
                        canActivate: jest.fn().mockReturnValue(true)
                    },
                },
                {
                    provide: UtilityService,
                    useValue: mockUtilityService
                }
            ]
        }).compile();

        controller = module.get<EventController>(EventController);
    });

    describe('getOrganizerEvents', () => {
        it('should return events for the organizer', async () => {
            const mockEvents = [mockEvent];
            mockEventRepository.getEvents.mockResolvedValue(mockEvents);

            const result = await controller.getOrganizerEvents(mockUser);

            expect(result).toEqual({
                statusCode: HttpStatus.ACCEPTED,
                events: mockEvents
            });
            expect(mockEventRepository.getEvents).toHaveBeenCalledWith(mockUser._id);
        });

        it('should handle errors when retrieving events', async () => {
            mockEventRepository.getEvents.mockRejectedValue(new Error('Retrieval failed'));

            await expect(controller.getOrganizerEvents(mockUser)).rejects.toThrow('Server error');
        });
    })

    describe('createEvent', () => {
        it('should create an event successfully', async () => {
            mockEventService.createEvent.mockResolvedValue(mockEvent);

            const result = await controller.createEvent(mockCreateEventDTO, mockUser);

            expect(result).toEqual({
                statusCode: HttpStatus.CREATED,
                event: mockEvent,
                message: 'Event created successfully'
            });
            expect(mockEventService.createEvent).toHaveBeenCalledWith(mockCreateEventDTO, mockUser._id);
        });

        it('should handle errors during event creation', async () => {
            mockEventService.createEvent.mockRejectedValue(new Error('Creation failed'));

            await expect(controller.createEvent(mockCreateEventDTO, mockUser)).rejects.toThrow('Server error');
        });


        describe('updateEvent', () => {
            const mockUpdateEventDTO: UpdateEventDTO = {
                title: 'Updated Event Title',
                description: 'hellloooo',
                date: new Date(),
                location: 'Youssoufi'
            };
    
            it('should update an event successfully', async () => {
                mockEventService.handelUpdateEvent.mockResolvedValue(mockEvent);
    
                const result = await controller.updateEvent(mockUpdateEventDTO, mockUser, { eventId: new mongoose.Types.ObjectId('6748799d4ff21796c14bd694') });
    
                expect(result).toEqual({
                    event: mockEvent,
                    message: 'Event updated successfully',
                    statusCode: HttpStatus.CREATED
                });
                expect(mockEventService.handelUpdateEvent).toHaveBeenCalledWith(mockUpdateEventDTO, mockUser._id, new mongoose.Types.ObjectId('6748799d4ff21796c14bd694'));
            });
    
            it('should handle errors during event update', async () => {
                mockEventService.handelUpdateEvent.mockRejectedValue(new Error('Update failed'));
    
                await expect(controller.updateEvent(mockUpdateEventDTO, mockUser, { eventId: new mongoose.Types.ObjectId('6748799d4ff21796c14bd694') })).rejects.toThrow('Server error');
            });
        });


        describe('deleteEvent', () => {
            it('should delete an event successfully', async () => {
                const mockDeleteResponse = { message: 'Event deleted successfully' };
                mockEventService.handelDeleteEvent.mockResolvedValue(mockDeleteResponse);
    
                const result = await controller.deleteEvent({ eventId: new mongoose.Types.ObjectId('6748799d4ff21796c14bd694') }, mockUser);
    
                expect(result).toEqual({
                    message: 'Event deleted successfully',
                    statusCode: HttpStatus.ACCEPTED
                });
                expect(mockEventService.handelDeleteEvent).toHaveBeenCalledWith(mockUser._id, new mongoose.Types.ObjectId('6748799d4ff21796c14bd694'));
            });
    
            it('should handle errors during event deletion', async () => {
                mockEventService.handelDeleteEvent.mockRejectedValue(new Error('Deletion failed'));
    
                await expect(controller.deleteEvent({ eventId: new mongoose.Types.ObjectId('6748799d4ff21796c14bd694') }, mockUser)).rejects.toThrow('Server error');
            });
        });
    });
})