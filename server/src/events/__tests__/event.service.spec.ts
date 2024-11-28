import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from '../event.service';
import { EventRepositoryInterface } from '../interfaces/event.repository.interface';
import { CreateEventDTO } from '../dto/create.event.dto';
import { UpdateEventDTO } from '../dto/update.event.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventDocument } from '../event.schema';

describe('EventService', () => {
    let service: EventService;
    let mockEventRepository: {
        getEventByTitleAndOrganizer: jest.Mock;
        createEvent: jest.Mock;
        getEventByIdAndOerganizer: jest.Mock;
        deleteEvent: jest.Mock;
    };

    // Mock data
    const mockOrganizerId = new Types.ObjectId();
    const mockEventId = new Types.ObjectId();

    const mockCreateEventDTO: CreateEventDTO = {
        title: 'Test Event',
        description: 'Test Description',
        location: 'Test Location',
        date: new Date(),
    };

    const mockUpdateEventDTO: UpdateEventDTO = {
        title: 'Updated Event Title',
        location: 'Updated Location',
        description: 'Updated Description',
        date: new Date()
    };

    const mockEventDocument = {
        _id: mockEventId,
        ...mockCreateEventDTO,
        organizer_id: mockOrganizerId,
        save: jest.fn().mockImplementation(function(this: any) {
            // Simulate save by updating the object
            Object.assign(this, {
                title: mockUpdateEventDTO.title,
                location: mockUpdateEventDTO.location,
                description: mockUpdateEventDTO.description,
                date: mockUpdateEventDTO.date
            });
            return Promise.resolve(this);
        })
    } as unknown as EventDocument;

    beforeEach(async () => {
        mockEventRepository = {
            getEventByTitleAndOrganizer: jest.fn(),
            createEvent: jest.fn(),
            getEventByIdAndOerganizer: jest.fn(),
            deleteEvent: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventService,
                {
                    provide: 'EventRepositoryInterface',
                    useValue: mockEventRepository
                }
            ]
        }).compile();

        service = module.get<EventService>(EventService);
    });

    describe('createEvent', () => {
        it('should create an event successfully', async () => {
            // Simulate no existing event with the same title
            mockEventRepository.getEventByTitleAndOrganizer.mockResolvedValue(null);
            mockEventRepository.createEvent.mockResolvedValue(mockEventDocument);

            const result = await service.createEvent(mockCreateEventDTO, mockOrganizerId);

            expect(result).toEqual(mockEventDocument);
            expect(mockEventRepository.getEventByTitleAndOrganizer).toHaveBeenCalledWith(
                mockCreateEventDTO.title,
                mockOrganizerId
            );
            expect(mockEventRepository.createEvent).toHaveBeenCalledWith(expect.objectContaining({
                ...mockCreateEventDTO,
                organizer_id: mockOrganizerId
            }));
        });

        it('should throw an exception if event with same title already exists', async () => {
            // Simulate existing event with the same title
            mockEventRepository.getEventByTitleAndOrganizer.mockResolvedValue(mockEventDocument);

            await expect(service.createEvent(mockCreateEventDTO, mockOrganizerId))
                .rejects
                .toThrow(new HttpException('Please choose a unique Title', HttpStatus.UNAUTHORIZED));
        });

        it('should throw an exception if event creation fails', async () => {
            mockEventRepository.getEventByTitleAndOrganizer.mockResolvedValue(null);
            mockEventRepository.createEvent.mockResolvedValue(null);

            await expect(service.createEvent(mockCreateEventDTO, mockOrganizerId))
                .rejects
                .toThrow(new HttpException('Failed to create event', HttpStatus.BAD_REQUEST));
        });
    });

    describe('handelUpdateEvent', () => {
        it('should update an event successfully', async () => {
            // Create a mutable object with save method
            const mutableEvent = {
                ...mockEventDocument,
                save: jest.fn().mockImplementation(function(this: any) {
                    Object.assign(this, {
                        title: mockUpdateEventDTO.title,
                        location: mockUpdateEventDTO.location,
                        description: mockUpdateEventDTO.description,
                        date: mockUpdateEventDTO.date
                    });
                    return Promise.resolve(this);
                })
            };

            // Mock finding the event
            mockEventRepository.getEventByIdAndOerganizer.mockResolvedValue(mutableEvent);

            const result = await service.handelUpdateEvent(
                mockUpdateEventDTO,
                mockOrganizerId,
                mockEventId
            );

            // Verify the returned object matches the update
            expect(result.title).toBe(mockUpdateEventDTO.title);
            expect(result.location).toBe(mockUpdateEventDTO.location);
            expect(result.description).toBe(mockUpdateEventDTO.description);
            expect(result.date).toBe(mockUpdateEventDTO.date);
            expect(mutableEvent.save).toHaveBeenCalled();
        });
    });

    describe('handelDeleteEvent', () => {
        it('should delete an event successfully', async () => {
            // Mock finding the event
            mockEventRepository.getEventByIdAndOerganizer.mockResolvedValue(mockEventDocument);

            // Mock successful deletion
            mockEventRepository.deleteEvent.mockResolvedValue(true);

            const result = await service.handelDeleteEvent(mockOrganizerId, mockEventId);

            expect(result).toEqual({ message: 'Event deleted successfully' });
            expect(mockEventRepository.getEventByIdAndOerganizer).toHaveBeenCalledWith(mockEventId, mockOrganizerId);
            expect(mockEventRepository.deleteEvent).toHaveBeenCalledWith(mockEventDocument);
        });

        it('should throw an exception if event not found', async () => {
            mockEventRepository.getEventByIdAndOerganizer.mockResolvedValue(null);

            await expect(service.handelDeleteEvent(mockOrganizerId, mockEventId))
                .rejects
                .toThrow(new HttpException('Event not found', HttpStatus.NOT_FOUND));
        });

        it('should throw an exception if deletion fails', async () => {
            mockEventRepository.getEventByIdAndOerganizer.mockResolvedValue(mockEventDocument);
            mockEventRepository.deleteEvent.mockResolvedValue(false);

            await expect(service.handelDeleteEvent(mockOrganizerId, mockEventId))
                .rejects
                .toThrow(new HttpException('Failed to delete this event', HttpStatus.BAD_REQUEST));
        });
    });
});