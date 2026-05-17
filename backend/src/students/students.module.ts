import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { StudentProfile } from './entities/student-profile.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentProfile,
      User,
    ]),
  ],

  controllers: [StudentsController],

  providers: [StudentsService],
})
export class StudentsModule {}