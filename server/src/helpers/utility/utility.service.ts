import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs'

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
}
