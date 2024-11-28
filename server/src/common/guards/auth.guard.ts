import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { UtilityService } from "src/helpers/utility/utility.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly utilityService: UtilityService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request.headers.authorization) throw new UnauthorizedException('Token not provided');
        if(!request.headers.authorization.startsWith('Bearer ')) throw new UnauthorizedException('Invalid authorization format');
        const token = request.headers.authorization.split(' ')[1];
        if(!token || token === '') throw new UnauthorizedException('Token not provided');
        
        try{
            const user = this.utilityService.verifyJWTToken(token);
            request.user = user;
            return true;
        }catch(err: any){
            throw new UnauthorizedException('Invalid token');
        }
    }
}