import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UseGuards } from "@nestjs/common";
import { CreateRegistrationDTO } from "./dto/create.registration.dto";
import { GetUser } from "../common/decorators/get-user.decorator";
import { UserRequestType } from "../common/types/user.request.type";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateRegistrationResponseDTO } from "./dto/create.registration.response.dto";
import { RegistrationServiceInterface } from "./interfaces/registration.service.interface";
import { RegistrationRepositoryInterface } from "./interfaces/registration.repository.interface";
import { GetRegistrationsResponseDTO } from "./dto/get.registrations.response.dto";

@Controller('registrations')
@UseGuards(AuthGuard)
export class RegistrationController {
    constructor(
        @Inject('RegistrationServiceInterface') private readonly registrationService: RegistrationServiceInterface,
        @Inject('RegistrationRepositoryInterface') private readonly registrationRepository: RegistrationRepositoryInterface
    ) { }

    @Get('/get/registrations')
    async getOrganizerEventsRegistrations(
        @GetUser() user: UserRequestType
    ): Promise<GetRegistrationsResponseDTO> {
        try {            
            const registrations = await this.registrationRepository.hanedlGetOriganizerEventsRegistrations(user._id);
            return {
                statusCode: HttpStatus.ACCEPTED,
                registrations: registrations
            }
        } catch (err: any) {
            if (err.status) {
                throw new HttpException({
                    statusCode: err.status,
                    error: err.message
                },
                    err.status
                )
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @Post('/create')
    async createRegistration(
        @Body() createRegistrationDTO: CreateRegistrationDTO,
        @GetUser() user: UserRequestType
    ): Promise<CreateRegistrationResponseDTO> {
        try {
            const registration = await this.registrationService.handelCreateRegistration(user._id, createRegistrationDTO)
            return {
                statusCode: HttpStatus.CREATED,
                message: registration.message,
                registration: registration.registration
            }
        } catch (err: any) {
            if (err.status) {
                throw new HttpException({
                    statusCode: err.status,
                    error: err.message
                },
                    err.status
                )
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}