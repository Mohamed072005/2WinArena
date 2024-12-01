import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { RegistrationController } from '../registration.controller';
import { RegistrationServiceInterface } from '../interfaces/registration.service.interface';
import { RegistrationRepositoryInterface } from '../interfaces/registration.repository.interface';
import { CreateRegistrationDTO } from '../dto/create.registration.dto';
import { UserRequestType } from '../../common/types/user.request.type';
import { UtilityModule } from '../../helpers/utility/utility.module';
import { UtilityService } from '../../helpers/utility/utility.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Registration } from '../registration.schema';
import mongoose from 'mongoose';

describe('RegistrationController', () => {
    let controller: RegistrationController;
    let mockRegistrationService: jest.Mocked<RegistrationServiceInterface>;
    let mockRegistrationRepository: jest.Mocked<RegistrationRepositoryInterface>;
    let mockUtilityService: jest.Mocked<UtilityService>;
    let mockAuthGuard: jest.Mocked<AuthGuard>;

    const mockUser: UserRequestType = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UtilityModule],
            controllers: [RegistrationController],
            providers: [
                {
                    provide: 'RegistrationServiceInterface',
                    useFactory: () => ({
                        handelCreateRegistration: jest.fn()
                    })
                },
                {
                    provide: 'RegistrationRepositoryInterface',
                    useFactory: () => ({
                        hanedlGetOriganizerEventsRegistrations: jest.fn()
                    })
                },
                {
                    provide: UtilityService,
                    useFactory: () => ({
                        // Add any necessary mock methods
                        validateToken: jest.fn().mockReturnValue(true)
                    })
                },
                {
                    provide: AuthGuard,
                    useFactory: () => ({
                        canActivate: jest.fn().mockReturnValue(true)
                    })
                }
            ]
        }).compile();

        controller = module.get<RegistrationController>(RegistrationController);
        mockRegistrationService = module.get('RegistrationServiceInterface');
        mockRegistrationRepository = module.get('RegistrationRepositoryInterface');
        mockUtilityService = module.get(UtilityService);
        mockAuthGuard = module.get(AuthGuard);
    });

    describe('createRegistration', () => {
        it('should successfully create a registration', async () => {
            const createRegistrationDto: CreateRegistrationDTO = {
                event_id: new mongoose.Types.ObjectId(),
                email: "email@gmail.com",
                full_name: "Haouat"
            };

            const mockRegistrationResponse = {
                message: 'Registration created successfully',
                registration: {
                    _id: 'registration123',
                    eventId: 'event123',
                    userId: 'user123'
                }
            };

            mockRegistrationService.handelCreateRegistration.mockResolvedValue(mockRegistrationResponse);

            const result = await controller.createRegistration(createRegistrationDto, mockUser);

            expect(result).toEqual({
                statusCode: HttpStatus.CREATED,
                message: 'Registration created successfully',
                registration: mockRegistrationResponse.registration
            });

            expect(mockRegistrationService.handelCreateRegistration).toHaveBeenCalledWith(
                mockUser._id,
                createRegistrationDto
            );
        });

        it('should throw an HttpException for service errors', async () => {
            const createRegistrationDto: CreateRegistrationDTO = {
                event_id: new mongoose.Types.ObjectId(),
                email: "email@gmail.com",
                full_name: "Haouat"
            };

            const mockError = {
                status: HttpStatus.BAD_REQUEST,
                message: 'Invalid registration'
            };

            mockRegistrationService.handelCreateRegistration.mockRejectedValue(mockError);

            await expect(
                controller.createRegistration(createRegistrationDto, mockUser)
            ).rejects.toMatchObject({
                response: {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: 'Invalid registration'
                },
                status: HttpStatus.BAD_REQUEST
            });
        });

        it('should throw an internal server error for unexpected errors', async () => {
            const createRegistrationDto: CreateRegistrationDTO = {
                event_id: new mongoose.Types.ObjectId(),
                email: "email@gmail.com",
                full_name: "Haouat"
            };

            mockRegistrationService.handelCreateRegistration.mockRejectedValue(new Error('Unexpected error'));

            await expect(
                controller.createRegistration(createRegistrationDto, mockUser)
            ).rejects.toMatchObject({
                response: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Server error'
                },
                status: HttpStatus.INTERNAL_SERVER_ERROR
            });
        });
    });

    describe('getOrganizerEventsRegistrations', () => {
        it('should successfully retrieve organizer event registrations', async () => {
            const mockRegistrations: Registration[] = [
                { event_id: new mongoose.Types.ObjectId(), status: 'registred', email: 'qweqwrq@gmail.com', full_name: 'weld lhawat' },
                { event_id: new mongoose.Types.ObjectId(), status: 'registred', email: 'qweqwrq@gmail.com', full_name: 'weld lhawat' }
            ];

            mockRegistrationRepository.hanedlGetOriganizerEventsRegistrations.mockResolvedValue(mockRegistrations);

            const result = await controller.getOrganizerEventsRegistrations(mockUser);

            expect(result).toEqual({
                statusCode: HttpStatus.ACCEPTED,
                registrations: mockRegistrations
            });

            expect(mockRegistrationRepository.hanedlGetOriganizerEventsRegistrations).toHaveBeenCalledWith(mockUser._id);
        });

        it('should throw an HttpException for repository errors', async () => {
            const mockError = {
                status: HttpStatus.NOT_FOUND,
                message: 'Registrations not found'
            };

            mockRegistrationRepository.hanedlGetOriganizerEventsRegistrations.mockRejectedValue(mockError);

            await expect(
                controller.getOrganizerEventsRegistrations(mockUser)
            ).rejects.toMatchObject({
                response: {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Registrations not found'
                },
                status: HttpStatus.NOT_FOUND
            });
        });

        it('should throw an internal server error for unexpected errors', async () => {
            mockRegistrationRepository.hanedlGetOriganizerEventsRegistrations.mockRejectedValue(new Error('Unexpected error'));

            await expect(
                controller.getOrganizerEventsRegistrations(mockUser)
            ).rejects.toMatchObject({
                response: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Server error'
                },
                status: HttpStatus.INTERNAL_SERVER_ERROR
            });
        });
    });
});