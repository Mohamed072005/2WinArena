import { ApiProperty } from '@nestjs/swagger';
import { Registration } from "../registration.schema";

export class GetRegistrationsResponseDTO {
    @ApiProperty({
        description: 'HTTP status code of the response',
        example: 202
    })
    statusCode: number;

    @ApiProperty({
        description: 'List of registrations',
        example: [
            {
                _id: "674b1df508b8da511ef87f3d",
                full_name: "mbhhhhhhape",
                email: "weldlhawat@gmail.com",
                status: "registered",
                event_title: "ccccccccccccccccccccccccccccccccc",
                event_date: "2025-01-16T00:00:00.000Z",
                event_location: "Qui architecto aliqu"
            }
        ]
    })
    registrations: Registration[];
}