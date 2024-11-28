import { Event } from "../event.schema"

export class CreateEventResponseDTO {
    statusCode: number
    event: Event
    message: string
}