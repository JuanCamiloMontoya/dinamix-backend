import { IsEmail, MaxLength, Length, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {

    @Length(2, 50)
    name: string;

    @MaxLength(50)
    email: string;

    @Length(8, 50)
    @IsOptional()
    password?: string;

    @Length(2, 50)
    firstname: string;
    
    @Length(2, 50)
    lastname: string;
    
    @IsOptional()
    @Length(5, 20)
	phone: string;
}