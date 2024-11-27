import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv'
import { MongooseModule } from '@nestjs/mongoose';
import { UtilityService } from './helpers/utility/utility.service';
import { GlobalModule } from './global/global.module';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    GlobalModule
  ],
  providers: [UtilityService],
})
export class AppModule { }
