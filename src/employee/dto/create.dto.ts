import { Length, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateDto {

    @Length(3, 30)
    firstname: string;

    @Length(3, 30)
    lastname: string;

    @IsEmail()
    email: string;

    @Length(2, 30)
    @IsOptional()
    university: string;

    @Length(2, 30)
    @IsOptional()
    degree: string;

    @Length(3, 20)
    knowledgeLevel: string;

    @IsInt()
    position: number;

    @IsInt()
    @IsOptional()
    formalEducation: number;
}