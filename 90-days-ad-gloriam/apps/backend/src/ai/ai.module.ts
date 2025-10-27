import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { GrokService } from './grok.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [AiController],
  providers: [GrokService],
  exports: [GrokService],
})
export class AiModule {}

