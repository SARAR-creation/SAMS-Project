import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { AdmissionStatus } from '../enums/admission-status.enum';

@Entity()
export class StudentProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: AdmissionStatus,
    default: AdmissionStatus.PENDING,
  })
  admissionStatus: AdmissionStatus;

  @OneToOne(() => User, (user) => user.studentProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}