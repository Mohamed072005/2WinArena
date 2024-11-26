import { Injectable } from "@nestjs/common";
import { AuthRepositoryInterface } from "./interfaces/auth.repository.interface";
import { Users } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthRegisterDTO } from "./dto/auth.register.dto";

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) {}

    async findUserByEmail(userEmail: string): Promise<Users | null> {
        return await this.userModel.findOne({ email: userEmail, role: 'organizer' })
    }

    async createUser(authRegisterDTO: Partial<AuthRegisterDTO>): Promise<Users> {
        try{
            const user = new this.userModel(authRegisterDTO);
            return await user.save()
        }catch(err: any){
            throw new Error(`Failed to create user: ${err.message}`);
        }
    }
}