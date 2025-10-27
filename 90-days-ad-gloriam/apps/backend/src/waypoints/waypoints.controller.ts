import { Controller, Get, Query, Param } from '@nestjs/common';
import { WaypointsService } from './waypoints.service';

@Controller('waypoints')
export class WaypointsController {
  constructor(private waypointsService: WaypointsService) {}

  @Get('nearby')
  async getNearbyWaypoints(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius') radius: string = '10000',
  ) {
    return this.waypointsService.findNearbyWaypoints(
      parseFloat(latitude),
      parseFloat(longitude),
      parseInt(radius, 10),
    );
  }

  @Get(':id')
  async getWaypoint(@Param('id') id: string) {
    return this.waypointsService.findById(id);
  }
}
