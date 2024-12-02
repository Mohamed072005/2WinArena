import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthRegisterResponseDTO } from "./dto/auth.register.response.dto";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { AuthLoginDTO } from "./dto/auth.login.dto";
import { AuthLoginResponseDTO } from "./dto/auth.login.response.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('users')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface') private readonly authService: AuthServiceInterface
    ) { }
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ 
        type: AuthRegisterDTO,
        description: 'User registration details' 
    })
    @ApiResponse({ 
        status: 201, 
        description: 'User successfully registered',
        type: AuthRegisterResponseDTO 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad request' ,
        example: 'Registration failed'
    })
    @ApiResponse({
        status: 401,
        example: 'User already exists'
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Internal server error' 
    })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async register(@Body() authRegisterDTO: AuthRegisterDTO): Promise<AuthRegisterResponseDTO> {
        try {
            const user = await this.authService.handelUserRegister(authRegisterDTO);
            return {
                statusCode: HttpStatus.CREATED,
                message: user.message
            }
        } catch (err: any) {
            if (err.status) {
                throw new HttpException({
                    statusCode: err.status,
                    error: err.message
                },
                    err.status
                )
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ 
        type: AuthLoginDTO,
        description: 'User login credentials' 
    })
    @ApiResponse({ 
        status: 202, 
        description: 'User successfully logged in',
        type: AuthLoginResponseDTO 
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Unauthorized',
        example: 'Invalid login' 
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Internal server error' 
    })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async login(@Body() authLoginDTO: AuthLoginDTO): Promise<AuthLoginResponseDTO> {
        try{
            const user = await this.authService.handelUserLogin(authLoginDTO);
            return {
                statusCode: HttpStatus.ACCEPTED,
                message: user.message,
                token: user.token
            }
        }catch(err: any){
            if(err.status){
                throw new HttpException({
                    statusCode: err.status,
                    error: err.message
                },
                    err.status
                )
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}