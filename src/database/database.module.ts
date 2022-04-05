import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository, VoteRepository } from './repositories/';
import { VoteSchema, SumSchema, UserSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'Votes', schema: VoteSchema },
      { name: 'Sum', schema: SumSchema },
    ]),
  ],
  providers: [UserRepository, VoteRepository],
  exports: [UserRepository, VoteRepository],
})
export class DatabaseModule {}
