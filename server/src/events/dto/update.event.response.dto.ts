import { ApiProperty } from "@nestjs/swagger"
import { EventDocument } from "../event.schema"

export class UpdateEventResponseDTO {
    @ApiProperty({
        description: 'HTTP status code of the response',
        example: 201
    })
    statusCode: number

    @ApiProperty({
        description: 'update event',
        example:
        {
            _id: "674b1245ff40ea429bfcaa79",
            title: "ccccccccccccccccccccccccccccccccc",
            organizer_id: "67458bfec720cba4c1e29840",
            description: "Commodo quasi totam ",
            location: "Qui architecto aliqu",
            date: "2025-01-16T00:00:00.000Z",
            createdAt: "2024-11-30T13:25:25.131Z",
            updatedAt: "2024-12-01T11:42:20.101Z",
        }
    })
    event: EventDocument

    @ApiProperty({
        description: 'Alert Message',
        example: 'Event updated successfully'
    })
    message: string
}