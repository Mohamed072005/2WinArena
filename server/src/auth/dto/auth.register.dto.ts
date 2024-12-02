import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, isStrongPassword, MinLength } from "class-validator";

export class AuthRegisterDTO{
    @ApiProperty({
        description: 'User full name',
        example: 'weld lhaouat'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    full_name: string

    @ApiProperty({
        description: 'User email',
        example: 'zbida@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'User password',
        example: 'freeAginan'
    })
    @IsString()
    @IsNotEmpty()
    password: string

    role: string
}