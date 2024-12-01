import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { UtilityModule } from 'src/helpers/utility/utility.module';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        UtilityModule
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: 'AuthRepositoryInterface',
            useClass: AuthRepository
        },
        {
            provide: 'AuthServiceInterface',
            useClass: AuthService
        }
    ]
})
export class AuthModule {}
