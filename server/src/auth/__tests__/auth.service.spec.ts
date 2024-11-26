import { UtilityService } from "../../helpers/utility/utility.service";
import { AuthService } from "../auth.service"
import { AuthRepositoryInterface } from "../interfaces/auth.repository.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthRegisterDTO } from "../dto/auth.register.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('AuthService', () => {
    let authService: AuthService;
    let mockAuthRepository: Partial<AuthRepositoryInterface>
    let mockUtilityService: Partial<UtilityService>

    beforeEach(async () => {
        mockAuthRepository = {
            findUserByEmail: jest.fn(),
            createUser: jest.fn(),
        }

        mockUtilityService = {
            handelHashPassword: jest.fn(),
        }

        let module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: 'AuthRepositoryInterface',
                    useValue: mockAuthRepository
                },
                {
                    provide: UtilityService,
                    useValue: mockUtilityService
                }
            ]
        }).compile()
        authService = module.get<AuthService>(AuthService);
    })

    describe('handelUserRegister', () => {
        const mockRegisterDTO: AuthRegisterDTO = {
            email: 'test@example.com',
            full_name: 'weld lhawat',
            password: 'password123',
            role: ''
        }

        it('should throw an exception if user already exists', async () => {
            (mockAuthRepository.findUserByEmail as jest.Mock).mockResolvedValue({
                id: '1',
                email: 'test@example.com'
            });

            await expect(authService.handelUserRegister(mockRegisterDTO)).rejects.toThrow(HttpException);

            try {
                await authService.handelUserRegister(mockRegisterDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
                expect(error.message).toBe('User already exists');
            }
        })

        it('should successfully register a new user', async () => {
            // Mock no existing user
            (mockAuthRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

            // Mock password hashing
            (mockUtilityService.handelHashPassword as jest.Mock).mockResolvedValue({
                password: 'hashedPassword'
            });

            // Mock user creation
            (mockAuthRepository.createUser as jest.Mock).mockResolvedValue({
                id: '1',
                email: 'test@example.com'
            });

            const result = await authService.handelUserRegister(mockRegisterDTO);

            // Verify repository and utility service methods were called
            expect(mockAuthRepository.findUserByEmail).toHaveBeenCalledWith(mockRegisterDTO.email);
            expect(mockUtilityService.handelHashPassword).toHaveBeenCalledWith(mockRegisterDTO.password);
            expect(mockAuthRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
                role: 'organizer',
                password: 'hashedPassword'
            }));

            // Verify return value
            expect(result).toEqual({ message: 'Register Successfully' });
        });
    })
})