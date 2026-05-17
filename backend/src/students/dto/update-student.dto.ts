import { IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  subject?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  address?: string;
}