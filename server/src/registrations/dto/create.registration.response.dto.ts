import { Registration } from "../registration.schema"

export interface CreateRegistrationResponseDTO {
    message: string
    registration: Registration
    statusCode: number
}