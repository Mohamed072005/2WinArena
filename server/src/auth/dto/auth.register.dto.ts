import { IsEmail, IsNotEmpty, IsString, isStrongPassword, MinLength } from "class-validator";

export class AuthRegisterDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    full_name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    role: string
}