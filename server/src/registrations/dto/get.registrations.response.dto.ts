import { Registration } from "../registration.schema"

export interface GetRegistrationsResponseDTO {
    statusCode: number
    registrations: Registration[]
}