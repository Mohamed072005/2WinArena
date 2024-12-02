import { ApiProperty } from "@nestjs/swagger"

export class DeleteEventResponseDTO {
    @ApiProperty({
        description: 'HTTP status code of the response',
        example: 201
    })
    statusCode: number

    @ApiProperty({
        description: 'Alert Message',
        example: 'Event Deleted successfully'
    })
    message: string
}