import { Module } from '@nestjs/common';
import { WaypointsController } from './waypoints.controller';
import { WaypointsService } from './waypoints.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WaypointsController],
  providers: [WaypointsService, PrismaService],
  exports: [WaypointsService],
})
export class WaypointsModule {}
