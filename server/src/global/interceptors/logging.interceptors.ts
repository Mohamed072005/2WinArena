import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class LoggingInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const now = Date.now();

        console.log(`[Interceptor] Incoming request: ${request.method} ${request.url}`);

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now;
                console.log(`[Interceptor] Response time: ${responseTime}ms`);
            }),
        );
    }
}