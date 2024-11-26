import { AuthRegisterDTO } from "../dto/auth.register.dto";
import { Users } from "../users.schema";

export interface AuthRepositoryInterface {
    findUserByEmail(userEmail: string): Promise<Users | null>
    createUser(authRegisterDTO: Partial<AuthRegisterDTO>): Promise<Users>
}