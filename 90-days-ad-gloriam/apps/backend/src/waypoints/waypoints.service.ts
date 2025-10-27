import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Assuming this is set up from design-database

import { Waypoint } from '@prisma/client';

@Injectable()
export class WaypointsService {
  constructor(private prisma: PrismaService) {}

  async findNearbyWaypoints(latitude: number, longitude: number, radiusInMeters: number = 10000) {
    // PostGIS query using ST_DWithin for geospatial search
    const waypoints = await this.prisma.waypoint.findMany({
      where: {
        location: {
          // Assuming location is a Point type in Prisma
          distance: {
            lessThan: radiusInMeters,  // In meters
            center: {
              latitude,
              longitude,
            },
          },
        },
      },
      include: { needs: true },  // Include related needs if defined
    });
    return waypoints;
  }

  async createWaypoint(latitude: number, longitude: number, data: any) {
    return this.prisma.waypoint.create({
      data: {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],  // [lon, lat] for GeoJSON
        },
        ...data,  // Include other fields like needs
      },
    });
  }
}
