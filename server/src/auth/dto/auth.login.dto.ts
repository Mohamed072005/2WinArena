import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthLoginDTO {
    @ApiProperty({
        description: 'User email',
        example: 'zbida@gmail.com'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'User password',
        example: 'freeAginan'
    })
    @IsNotEmpty()
    @IsString()
    password: string
}