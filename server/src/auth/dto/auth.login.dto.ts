import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthLoginDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}