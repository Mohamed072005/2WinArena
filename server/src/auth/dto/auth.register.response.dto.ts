import { ApiProperty } from "@nestjs/swagger"

export class AuthRegisterResponseDTO {
    @ApiProperty({
        description: 'HTTP status code of the response',
        example: 201
    })
    statusCode: number

    @ApiProperty({
        description: 'Alert Message',
        example: 'Register Successfully'
    })
    message: string
}