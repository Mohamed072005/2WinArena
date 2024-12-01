import { ApiProperty } from '@nestjs/swagger';
import { Registration } from "../registration.schema";

export class CreateRegistrationResponseDTO {
    @ApiProperty({ 
        description: 'Descriptive message about the registration',
        example: 'Registration created successfully' 
    })
    message: string;

    @ApiProperty({ 
        description: 'Details of the created registration',
        type: () => Registration 
    })
    registration: Registration;

    @ApiProperty({ 
        description: 'HTTP status code of the response',
        example: 201 
    })
    statusCode: number;
}