import { Event } from "../event.schema"

export interface CreateEventResponseDTO {
    statusCode: number
    event: Event
    message: string
}