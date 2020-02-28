import { Length, IsEmail } from 'class-validator';

export class AuthDto {

    @Length(4, 50)
    email: string;

    @Length(4, 50)
    password: string;
}