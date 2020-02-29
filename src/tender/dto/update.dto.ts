import { Length, IsNumber, IsOptional, MaxLength, IsDateString, IsInt } from 'class-validator';

export class UpdateDto {

    @Length(2, 30)
    @IsOptional()
    processNumber?: string;

    @IsNumber()
    @IsOptional()
    value?: number;

    @MaxLength(200)
    @IsOptional()
    observation?: string;

    @IsDateString()
    @IsOptional()
    observationDate?: Date;

    @IsDateString()
    @IsOptional()
    mypime?: Date;

    @IsDateString()
    @IsOptional()
    defintiveDate?: Date;

    @IsDateString()
    @IsOptional()
    closingDate?: Date;

    @IsDateString()
    @IsOptional()
    correctionDate?: Date;

    @IsDateString()
    @IsOptional()
    auctionDate?: Date;

    @IsInt()
    @IsOptional()
    entity?: number;

    @IsInt()
    @IsOptional()
    tenderType?: number;

    @IsInt()
    @IsOptional()
    employee?: number;

    @IsInt()
    @IsOptional()
    indicator?: number;
}