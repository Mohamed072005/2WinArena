import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthRegisterResponseDTO } from "./dto/auth.register.response.dto";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { AuthLoginDTO } from "./dto/auth.login.dto";
import { AuthLoginResponseDTO } from "./dto/auth.login.response.dto";

@Controller('users')
export class AuthController {
    constructor(
        @Inject('AuthServiceInterface') private readonly authService: AuthServiceInterface
    ) { }
    @Post('register')
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