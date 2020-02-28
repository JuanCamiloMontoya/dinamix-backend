import { Length } from 'class-validator';

export class UpdateDto {

    @Length(3, 30)
    name: string;
}