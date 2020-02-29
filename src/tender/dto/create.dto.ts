import { Length, IsNumber, IsOptional, MaxLength, IsDateString, IsInt } from 'class-validator';

export class CreateDto {

  @Length(2, 30)
  processNumber: string;

  @IsNumber()
  value: number;

  @MaxLength(200)
  @IsOptional()
  observation: string;

  @IsDateString()
  @IsOptional()
  observationDate: Date;

  @IsDateString()
  @IsOptional()
  mypime: Date;

  @IsDateString()
  @IsOptional()
  defintiveDate: Date;

  @IsDateString()
  @IsOptional()
  closingDate: Date;

  @IsDateString()
  @IsOptional()
  correctionDate: Date;

  @IsDateString()
  @IsOptional()
  auctionDate: Date;

  @IsInt()
  entity: number;

  @IsInt()
  tenderType: number;
  
  @IsInt()
  employee: number;

  @IsInt()
  indicator: number;
}