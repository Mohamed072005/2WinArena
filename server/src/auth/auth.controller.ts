import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthRegisterResponseDTO } from "./dto/auth.register.response.dto";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";

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
                    message: err.message
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