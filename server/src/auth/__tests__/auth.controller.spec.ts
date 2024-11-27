import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller"
import { AuthServiceInterface } from "../interfaces/auth.service.interface";
import { AuthRegisterDTO } from "../dto/auth.register.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthLoginDTO } from "../dto/auth.login.dto";

describe('AuthController', () => {
    let authController: AuthController;
    let mockAuthService: Partial<AuthServiceInterface>

    beforeEach(async () => {
        mockAuthService = {
            handelUserRegister: jest.fn(),
            handelUserLogin: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: 'AuthServiceInterface',
                    useValue: mockAuthService
                }
            ]
        }).compile();
        authController = module.get<AuthController>(AuthController)
    })

    describe('register', () => {
        const mockRegisterDTO: AuthRegisterDTO = {
            email: 'test@example.com',
            password: 'password123',
            full_name: 'weld lhawat',
            role: ''
        };

        it('should successfully register a user', async () => {
            // Mock the service to return a success message
            (mockAuthService.handelUserRegister as jest.Mock).mockResolvedValue({
                message: 'Register Successfully'
            });

            const result = await authController.register(mockRegisterDTO);

            expect(result).toEqual({
                statusCode: HttpStatus.CREATED,
                message: 'Register Successfully'
            });

            // Verify that the service method was called with correct DTO
            expect(mockAuthService.handelUserRegister).toHaveBeenCalledWith(mockRegisterDTO);
        });

        it('should throw HttpException when service throws an error with status', async () => {

            (mockAuthService.handelUserRegister as jest.Mock).mockRejectedValue({
                status: HttpStatus.UNAUTHORIZED,
                message: 'User already exists'
            });

            await expect(authController.register(mockRegisterDTO)).rejects.toThrow(HttpException);

            try {
                await authController.register(mockRegisterDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
                expect(error.getResponse()).toEqual({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    error: 'User already exists'
                });
            }
        })

        it('should throw INTERNAL_SERVER_ERROR when no specific error is provided', async () => {
            // Mock the service to throw an error without a status
            (mockAuthService.handelUserRegister as jest.Mock).mockRejectedValue(new Error('Unknown error'));

            await expect(authController.register(mockRegisterDTO)).rejects.toThrow(HttpException);

            try {
                await authController.register(mockRegisterDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
                expect(error.getResponse()).toEqual({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Server error'
                });
            }
        });
    })

    describe('Login', () => {
        const mockLoginDTO: AuthLoginDTO = {
            email: 'test@example.com',
            password: 'weldlhawat123'
        }

        it('should successfully login a user', async () => {
            (mockAuthService.handelUserLogin as jest.Mock).mockResolvedValue({
                message: 'Login Successfully',
                token: 'JWT-TOKEN'
            })

            const response = await authController.login(mockLoginDTO);

            expect(response).toEqual({
                statusCode: HttpStatus.ACCEPTED,
                message: 'Login Successfully',
                token: 'JWT-TOKEN'
            });

            expect(mockAuthService.handelUserLogin).toHaveBeenCalledWith(mockLoginDTO);
        })

        it('should throw HttpException when login fails', async () => {
            (mockAuthService.handelUserLogin as jest.Mock).mockRejectedValue({
                status: HttpStatus.UNAUTHORIZED,
                message: 'Invalid credentials'
            });

            await expect(authController.login(mockLoginDTO)).rejects.toThrow(HttpException);

            try {
                await authController.login(mockLoginDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
                expect(error.getResponse()).toEqual({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    error: 'Invalid credentials'
                });
            }
        })

        it('should throw INTERNAL_SERVER_ERROR when no specific error is provided', async () => {
            (mockAuthService.handelUserLogin as jest.Mock).mockRejectedValue(new Error('Unknown error'));

            await expect(authController.login(mockLoginDTO)).rejects.toThrow(HttpException);

            try {
                await authController.login(mockLoginDTO);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
                expect(error.getResponse()).toEqual({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Server error'
                });
            }
        });
    })
})