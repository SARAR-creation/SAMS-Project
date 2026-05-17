import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { User } from '../users/entities/user.entity';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}