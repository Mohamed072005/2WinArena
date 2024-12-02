import { ApiProperty } from "@nestjs/swagger"

export class AuthLoginResponseDTO {
    @ApiProperty({
        description: 'HTTP status code of the response',
        example: 202
    })
    statusCode: number

    @ApiProperty({
        description: 'Alert Message',
        example: 'Login successfully'
    })
    message: string

    @ApiProperty({
        description: 'Auth token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ1O'
    })
    token: string
}