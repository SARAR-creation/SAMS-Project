import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { StudentProfile } from './entities/student-profile.entity';
import { User } from '../users/entities/user.entity';

import { ApplyStudentDto } from './dto/apply-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentProfile)
    private studentRepository: Repository<StudentProfile>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async apply(
    userId: number,
    applyDto: ApplyStudentDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingApplication =
      await this.studentRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });

    if (existingApplication) {
      throw new BadRequestException(
        'Application already submitted',
      );
    }

    const studentProfile =
      this.studentRepository.create({
        ...applyDto,
        user,
      });

    return this.studentRepository.save(studentProfile);
  }

  async getMyProfile(userId: number) {
    return this.studentRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },

      relations: ['user'],
    });
  }

  async updateMyProfile(
    userId: number,
    updateDto: UpdateStudentDto,
  ) {
    const profile = await this.studentRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!profile) {
      throw new NotFoundException(
        'Profile not found',
      );
    }

    Object.assign(profile, updateDto);

    return this.studentRepository.save(profile);
  }
}