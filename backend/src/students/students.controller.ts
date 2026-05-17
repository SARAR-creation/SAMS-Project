import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { StudentsService } from './students.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ApplyStudentDto } from './dto/apply-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
  ) {}

  @Post('apply')
  apply(
    @Req() req,
    @Body() applyDto: ApplyStudentDto,
  ) {
    return this.studentsService.apply(
      req.user.userId,
      applyDto,
    );
  }

  @Get('me')
  getMyProfile(@Req() req) {
    return this.studentsService.getMyProfile(
      req.user.userId,
    );
  }

  @Patch('me')
  updateMyProfile(
    @Req() req,
    @Body() updateDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateMyProfile(
      req.user.userId,
      updateDto,
    );
  }
}