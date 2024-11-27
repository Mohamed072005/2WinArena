import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { LoggingInterceptors } from './interceptors/logging.interceptors';

@Module({
    providers: [
        LoggingInterceptors,
        {
            provide: 'APP_FILTER',
            useClass: HttpExceptionFilter
        },
        {
            provide: 'APP_INTERCEPTOR',
            useClass: LoggingInterceptors
        }
    ]
})
export class GlobalModule {}
