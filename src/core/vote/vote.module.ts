import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports: [DatabaseModule],
  providers: [VoteService],
  controllers: [VoteController],
  exports: [VoteService],
})
export class VoteModule {}
