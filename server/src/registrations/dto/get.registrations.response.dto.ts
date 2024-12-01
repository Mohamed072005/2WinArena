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
        type: () => Registration,
        isArray: true 
    })
    registrations: Registration[];
}