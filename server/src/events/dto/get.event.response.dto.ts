import { EventDocument } from "../event.schema"

export interface GetEventsResponseDTO {
    statusCode: number
    events: EventDocument[]
}