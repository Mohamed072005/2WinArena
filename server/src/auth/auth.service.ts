import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthRepositoryInterface } from "./interfaces/auth.repository.interface";
import { UtilityService } from "../helpers/utility/utility.service";
import { AuthLoginDTO } from "./dto/auth.login.dto";

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @Inject('AuthRepositoryInterface') private readonly authRepository: AuthRepositoryInterface,
        private readonly utilService: UtilityService
    ) { }
    async handelUserRegister(authRegisterDTO: AuthRegisterDTO): Promise<{ message: string }> {
        const existingUser = await this.authRepository.findUserByEmail(authRegisterDTO.email);
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);
        }
        const hashedPassword = await this.utilService.handelHashPassword(authRegisterDTO.password);
        const userToCreate = {
            ...AuthRegisterDTO,
            role: 'organizer',
            password: hashedPassword.password
        }
        const registredUser = this.authRepository.createUser(userToCreate);
        if (!registredUser) {
            throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
        }
        return { message: 'Register Successfully' }
    }

    async handelUserLogin(authLoginDTO: AuthLoginDTO): Promise<{ message: string, token: string }> {
        const user = await this.authRepository.findUserByEmail(authLoginDTO.email);
        if(!user) throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
        if(!(await this.utilService.verifyPassword(user.password, authLoginDTO.password)))  throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
        const patload = {
            _id: user._id,
            email: user.email
        }
        const token = await this.utilService.generateJWTToken(patload, '20d');
        return { message: 'Login Successfully', token:  token.token }
    }
}