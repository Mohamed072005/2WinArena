import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEventDTO } from './dto/create.event.dto';
import { CreateEventResponseDTO } from './dto/create.event.response.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserRequestType } from '../common/types/user.request.type';
import { EventServiceInterface } from './interfaces/event.service.interface';
import { UpdateEventDTO } from './dto/update.event.dto';
import { EventParamDTO } from './dto/event.param.dto';
import { UpdateEventResponseDTO } from './dto/update.event.response.dto';
import { EventDocument } from './event.schema';
import { DeleteEventResponseDTO } from './dto/delete.event.Response.dto';
import { EventRepositoryInterface } from './interfaces/event.repository.interface';
import { GetEventsResponseDTO } from './dto/get.event.response.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class EventController {

    constructor(
        @Inject('EventServiceInterface') private readonly eventService: EventServiceInterface,
        @Inject('EventRepositoryInterface') private readonly eventRepository: EventRepositoryInterface
    ) { }

    @Get('/get/events')
    @ApiOperation({ summary: 'Get events for the current organizer' })
    @ApiResponse({ 
        status: 202, 
        description: 'Successfully retrieved events',
        type: GetEventsResponseDTO 
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Unauthorized' ,
        example: "Token not provided"
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Internal server error' 
    })
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
    @ApiOperation({ summary: 'Create Evemt' })
    @ApiBody({ 
        type: CreateEventDTO,
        description: 'Event creation details',
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Successfully create event',
        type: CreateEventResponseDTO 
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Unauthorized' ,
        example: "Token not provided"
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad Request', 
        example: 'Failed to create the event'
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Internal server error' 
    })
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
    @ApiOperation({ summary: 'Update an existing event' })
    @ApiParam({ 
        name: 'eventId', 
        description: 'ID of the event to update',
        example: '60d5ecb54b5f1a2f4c9e89a1' 
    })
    @ApiBody({ 
        type: UpdateEventDTO,
        description: 'Event update details' 
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Event updated successfully',
        type: UpdateEventResponseDTO 
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Unauthorized' ,
        example: "Token not provided"
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Not Found',
        example: 'Event not found' 
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Internal server error' 
    })
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
    @ApiOperation({ summary: 'Delete an existing event' })
    @ApiParam({ 
        name: 'eventId', 
        description: 'ID of the event to delete',
        example: '60d5ecb54b5f1a2f4c9e89a1' 
    })
    @ApiResponse({ 
        status: 202, 
        description: 'Event deleted successfully',
        type: DeleteEventResponseDTO 
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Unauthorized', 
        example: "Token not provided"
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Bad Request' ,
        example: 'Event not found'
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad Request' ,
        example: 'Failed to delete this event'
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Internal server error' 
    })
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
