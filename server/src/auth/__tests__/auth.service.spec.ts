import { UtilityService } from "../../helpers/utility/utility.service";
import { AuthService } from "../auth.service"
import { AuthRepositoryInterface } from "../interfaces/auth.repository.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthRegisterDTO } from "../dto/auth.register.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthLoginDTO } from "../dto/auth.login.dto";

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
            generateJWTToken: jest.fn(),
            verifyPassword: jest.fn(),
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
            (mockAuthRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

            (mockUtilityService.handelHashPassword as jest.Mock).mockResolvedValue({
                password: 'hashedPassword'
            });

            (mockAuthRepository.createUser as jest.Mock).mockResolvedValue({
                id: '1',
                email: 'test@example.com'
            });

            const result = await authService.handelUserRegister(mockRegisterDTO);

            expect(mockAuthRepository.findUserByEmail).toHaveBeenCalledWith(mockRegisterDTO.email);
            expect(mockUtilityService.handelHashPassword).toHaveBeenCalledWith(mockRegisterDTO.password);
            expect(mockAuthRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
                role: 'organizer',
                password: 'hashedPassword'
            }));

            expect(result).toEqual({ message: 'Register Successfully' });
        });
    })

    describe('handelUserLogin', () => {
        const mockLoginDTO: AuthLoginDTO = {
            email: 'test@example.com',
            password: 'weldlhawat123'
        }

        const mockUser = {
            _id: '1',
            email: 'test@example.com',
            password: 'hashedPassword'
        } 

        it("should throw an exception if user dosn't exists", async () => {
            (mockAuthRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

            await expect(authService.handelUserLogin(mockLoginDTO)).rejects.toThrow(HttpException);

            try {
                await authService.handelUserLogin(mockLoginDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
                expect(error.message).toBe('Invalid login');
            }
        })

        it('should throw an exception if password is incorrect', async () => {
            (mockAuthRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

            (mockUtilityService.verifyPassword as jest.Mock).mockResolvedValue(false);

            await expect(authService.handelUserLogin(mockLoginDTO)).rejects.toThrow(HttpException);

            try{
                await authService.handelUserLogin(mockLoginDTO);
            }catch( error ){
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
                expect(error.message).toBe('Invalid login');
            }
        })

        it('should successfully login user', async () => {
            (mockAuthRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

            (mockUtilityService.verifyPassword as jest.Mock).mockResolvedValue(true);

            (mockUtilityService.generateJWTToken as jest.Mock).mockResolvedValue({
                token: 'mock-jwt-token'
            });

            const result = await authService.handelUserLogin(mockLoginDTO)

            expect(result).toEqual({
                message: 'Login Successfully',
                token: 'mock-jwt-token'
            })

            expect(mockAuthRepository.findUserByEmail).toHaveBeenCalledWith(mockLoginDTO.email)
            expect(mockUtilityService.verifyPassword).toHaveBeenCalledWith(mockUser.password, mockLoginDTO.password)
            expect(mockUtilityService.generateJWTToken).toHaveBeenCalledWith(
                {_id: mockUser._id, email: mockUser.email},
                '20d'
            )
        })
    })
})