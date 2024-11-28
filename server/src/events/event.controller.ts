import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEventDTO } from './dto/create.event.dto';
import { CreateEventResponseDTO } from './dto/create.event.response.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserRequestType } from 'src/common/types/user.request.type';
import { EventServiceInterface } from './interfaces/event.service.interface';
import { UpdateEventDTO } from './dto/update.event.dto';
import { EventParamDTO } from './dto/event.param.dto';
import { UpdateEventResponseDTO } from './dto/update.event.response.dto';
import { EventDocument } from './event.schema';
import { DeleteEventResponseDTO } from './dto/delete.event.Response.dto';
import { EventRepositoryInterface } from './interfaces/event.repository.interface';
import { GetEventsResponseDTO } from './dto/get.event.response.dto';

@Controller('events')
@UseGuards(AuthGuard)
export class EventController {

    constructor(
        @Inject('EventServiceInterface') private readonly eventService: EventServiceInterface,
        @Inject('EventRepositoryInterface') private readonly eventRepository: EventRepositoryInterface
    ) { }

    @Get('/get/events')
    async getOrganizerEvents(@GetUser() user: UserRequestType): Promise<GetEventsResponseDTO> {
        try {
            return {
                statusCode: HttpStatus.ACCEPTED,
                events: await this.eventRepository.getEvents(user._id)
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
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createEvent(@Body() createEventDTO: CreateEventDTO, @GetUser() user: UserRequestType): Promise<CreateEventResponseDTO> {
        try {
            const event = await this.eventService.createEvent(createEventDTO, user._id);
            return {
                statusCode: HttpStatus.CREATED,
                event: event,
                message: 'Event created successfully'
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

    @Put('update/:eventId')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateEvent(
        @Body() updateEventDTO: UpdateEventDTO,
        @GetUser() user: UserRequestType,
        @Param() param: EventParamDTO
    ): Promise<UpdateEventResponseDTO> {
        try {
            const event = await this.eventService.handelUpdateEvent(updateEventDTO, user._id, param.eventId);
            return {
                event: event as EventDocument,
                message: 'Event updated successfully',
                statusCode: HttpStatus.CREATED
            }
        } catch (err: any) {
            if (err.status) {
                throw new HttpException({
                    statusCode: err.status,
                    error: err.message,
                }, err.status)
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Delete('delete/:eventId')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async deleteEvent(
        @Param() param: EventParamDTO,
        @GetUser() user: UserRequestType
    ): Promise<DeleteEventResponseDTO> {
        try {
            const event = await this.eventService.handelDeleteEvent(user._id, param.eventId);
            return {
                message: event.message,
                statusCode: HttpStatus.ACCEPTED
            }
        } catch (err: any) {
            if (err.status) {
                throw new HttpException({
                    statusCode: err.status,
                    error: err.message,
                }, err.status)
            }
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Server error'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
