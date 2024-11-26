import { AuthRegisterDTO } from "../dto/auth.register.dto";

export interface AuthServiceInterface {
    handelUserRegister(UsersRegisterDTO: AuthRegisterDTO): Promise<{ message: string }>
}