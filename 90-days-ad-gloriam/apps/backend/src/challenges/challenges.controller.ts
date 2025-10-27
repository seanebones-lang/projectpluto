import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('challenges')
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Get()
  async getActiveChallenges() {
    return this.challengesService.getActiveChallenges();
  }

  @Get(':id')
  async getChallengeById(@Param('id') id: string) {
    return this.challengesService.getChallengeById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createChallenge(@Body() body: {
    title: string;
    description: string;
    goalType: string;
    goalTarget: number;
    startDate: string;
    endDate: string;
  }) {
    return this.challengesService.createChallenge({
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/join')
  async joinChallenge(
    @Param('id') challengeId: string,
    @Body('userId') userId: string,
  ) {
    return this.challengesService.joinChallenge(userId, challengeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/progress')
  async updateProgress(
    @Param('id') challengeId: string,
    @Body('userId') userId: string,
    @Body('progress') progress: number,
  ) {
    return this.challengesService.updateProgress(userId, challengeId, progress);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  async getUserChallenges(@Param('userId') userId: string) {
    return this.challengesService.getUserChallenges(userId);
  }

  @Get(':id/leaderboard')
  async getChallengeLeaderboard(@Param('id') challengeId: string) {
    return this.challengesService.getChallengeLeaderboard(challengeId);
  }
}

