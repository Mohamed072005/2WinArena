import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsFutureDate", async: false })
export class IsFutureDate implements ValidatorConstraintInterface {
    validate(date: Date, args: ValidationArguments): boolean {
        return date > new Date(); // Ensure the date is in the future
    }

    defaultMessage(args: ValidationArguments): string {
        return "The event date must be in the future.";
    }
}

export class CreateEventDTO {
    @ApiProperty({
        description: 'Event Title',
        example: 'Classico'
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: 'Event Description',
        example: 'Leo fl Bernabeu'
    })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: 'Event Location',
        example: 'Madrid'
    })
    @IsString()
    @IsNotEmpty()
    location: string

    @ApiProperty({
        description: 'Event Date',
        example: '2017-4-24'
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    @Validate(IsFutureDate)
    date: Date

}