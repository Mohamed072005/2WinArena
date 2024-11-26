import { AuthRegisterDTO } from "../dto/auth.register.dto";
import { Users, UsersDocument } from "../users.schema";

export interface AuthRepositoryInterface {
    findUserByEmail(userEmail: string): Promise<UsersDocument>
    createUser(authRegisterDTO: Partial<AuthRegisterDTO>): Promise<Users>
}