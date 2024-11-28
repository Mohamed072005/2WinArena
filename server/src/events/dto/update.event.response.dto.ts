import { EventDocument } from "../event.schema"

export interface UpdateEventResponseDTO {
    statusCode: number
    event: EventDocument
    message: string
}