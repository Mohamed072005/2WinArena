import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Types } from 'mongoose';

dotenv.config()

@Injectable()
export class UtilityService {
    async handelHashPassword(password: string): Promise<{ password: string }>{
        try{
            const hashedPassword = await  bcryptjs.hash(password, 10);
            return { password: hashedPassword }
        }catch(err: any){
            throw err
        }
    }

    async verifyPassword(userPassword: string, loginPassword: string): Promise<Boolean>{
        if(!(await bcryptjs.compare(loginPassword, userPassword))){
            return false
        }
        return true
    }

    async generateJWTToken(payload: { _id: Types.ObjectId, email: string }, expiresIn: string): Promise<{ token: string }> {        
        try {
            const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn });
            return { token };
        } catch (err: any) {
            throw new Error(`Failed to generate JWT: ${err.message}`);
        }
    }

    async verifyJWTToken(token: string) {
        try{
            const decode = jwt.verify(token, process.env.SECRET_KEY as string); 
            return decode;
        }catch(err: any){
            throw new HttpException("Can't decode the token", HttpStatus.BAD_GATEWAY);
        }
    }
}
