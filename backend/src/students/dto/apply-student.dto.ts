import { IsNotEmpty } from 'class-validator';

export class ApplyStudentDto {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address: string;
}