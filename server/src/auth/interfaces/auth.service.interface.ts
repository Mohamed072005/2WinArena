import { AuthLoginDTO } from "../dto/auth.login.dto";
import { AuthRegisterDTO } from "../dto/auth.register.dto";

export interface AuthServiceInterface {
    handelUserRegister(UsersRegisterDTO: AuthRegisterDTO): Promise<{ message: string }>
    handelUserLogin(authLoginDTO: AuthLoginDTO): Promise<{ message: string, token: string }>
}