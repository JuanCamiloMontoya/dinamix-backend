import { Length, IsOptional, IsEmail, IsInt } from 'class-validator';

export class UpdateDto {

  @Length(3, 30)
  @IsOptional()
  firstname?: string;

  @Length(3, 30)
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(3, 20)
  @IsOptional()
  formalEducation?: string;

  @Length(2, 30)
  @IsOptional()
  university?: string;

  @Length(2, 30)
  @IsOptional()
  degree?: string;

  @Length(3, 20)
  @IsOptional()
  knowledgeLevel?: string;

  @IsInt()
  @IsOptional()
  position?: number;
}