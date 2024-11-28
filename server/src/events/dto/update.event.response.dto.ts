import { EventDocument } from "../event.schema"

export class UpdateEventResponseDTO {
    statusCode: number
    event: EventDocument
    message: string
}