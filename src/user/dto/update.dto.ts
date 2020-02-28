import { IsEmail, MaxLength, Length, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDto {

    @IsOptional()
    @Length(2, 50)
    name?: string;

    @IsOptional()
    @Length(2, 50)
    firstname?: string;
    
    @IsOptional()
    @Length(2, 50)
    lastname?: string;
    
    @IsOptional()
    @Length(5, 20)
	phone?: string;
}