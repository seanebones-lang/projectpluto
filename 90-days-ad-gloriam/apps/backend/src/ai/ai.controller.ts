import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { GrokService } from './grok.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai')
export class AiController {
  constructor(private grokService: GrokService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('reflection')
  async generateReflection(@Body() body: {
    prompt: string;
    context?: {
      journeyStage?: string;
      recentJournals?: string[];
      prayerConcerns?: string[];
    };
  }) {
    return {
      reflection: await this.grokService.generateReflection(body.prompt, body.context),
    };
  }

  @Get('daily-devotion')
  async getDailyDevotion(@Query('date') date?: string) {
    // In production, fetch actual RCL readings from a lectionary API
    const mockLectionary = {
      readings: ['Psalm 23', 'John 10:11-18', 'Acts 4:5-12'],
      date: date ? new Date(date) : new Date(),
    };

    return {
      devotion: await this.grokService.generateDailyDevotion(mockLectionary),
      lectionary: mockLectionary,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('prayer-guidance')
  async getPrayerGuidance(@Body('concerns') concerns: string[]) {
    return {
      prayer: await this.grokService.generatePrayerGuidance(concerns),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('mentor-match')
  async matchMentor(@Body() userProfile: {
    journeyStage: string;
    interests: string[];
    location: string;
  }) {
    return await this.grokService.matchMentor(userProfile);
  }
}

