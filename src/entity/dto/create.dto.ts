import { Length } from 'class-validator';

export class CreateDto {

    @Length(3, 100)
    name: string;
}