import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WaypointsModule } from './waypoints/waypoints.module';
import { ChallengesModule } from './challenges/challenges.module';
import { AiModule } from './ai/ai.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    AuthModule,
    UsersModule,
    WaypointsModule,
    ChallengesModule,
    AiModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
