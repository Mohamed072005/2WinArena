import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

@ValidatorConstraint({ name: "IsFutureDate", async: false })
export class IsFutureDate implements ValidatorConstraintInterface {
    validate(date: Date, args: ValidationArguments): boolean {
        return date > new Date(); // Ensure the date is in the future
    }

    defaultMessage(args: ValidationArguments): string {
        return "The event date must be in the future.";
    }
}

export class UpdateEventDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    @Validate(IsFutureDate)
    date: Date
}