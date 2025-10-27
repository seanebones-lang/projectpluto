import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async getActiveChallenges() {
    return this.prisma.challenge.findMany({
      where: {
        isActive: true,
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async getChallengeById(id: string) {
    return this.prisma.challenge.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async createChallenge(data: {
    title: string;
    description: string;
    goalType: string;
    goalTarget: number;
    startDate: Date;
    endDate: Date;
  }) {
    return this.prisma.challenge.create({
      data,
    });
  }

  async joinChallenge(userId: string, challengeId: string) {
    return this.prisma.challengeParticipant.create({
      data: {
        userId,
        challengeId,
      },
    });
  }

  async updateProgress(userId: string, challengeId: string, progress: number) {
    const participant = await this.prisma.challengeParticipant.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
      include: {
        challenge: true,
      },
    });

    if (!participant) {
      throw new Error('Participant not found');
    }

    const updateData: any = {
      progress,
    };

    if (progress >= participant.challenge.goalTarget && !participant.completedAt) {
      updateData.completedAt = new Date();
    }

    return this.prisma.challengeParticipant.update({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
      data: updateData,
    });
  }

  async getUserChallenges(userId: string) {
    return this.prisma.challengeParticipant.findMany({
      where: {
        userId,
      },
      include: {
        challenge: true,
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });
  }

  async getChallengeLeaderboard(challengeId: string) {
    return this.prisma.challengeParticipant.findMany({
      where: {
        challengeId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        progress: 'desc',
      },
      take: 10,
    });
  }
}

