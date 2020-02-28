import { Length } from 'class-validator';

export class CreateDto {

    @Length(3, 30)
    name: string;
}