import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProcessVoteDTO } from 'src/common/dtos';
import { ISum, IVotes } from 'src/common/interfaces';

@Injectable()
export class VoteRepository {
  constructor(
    @InjectModel('Votes') private readonly voteModel: Model<IVotes>,
    @InjectModel('Sum') private readonly sumModel: Model<ISum>,
  ) {}

  async processVote(vote: ProcessVoteDTO): Promise<IVotes> {
    return this.voteModel.create(vote);
  }

  async checkIfVoted(
    fromUsername: string,
    toUsername: string,
  ): Promise<Boolean> {
    const voteData = await this.voteModel.findOne({ fromUsername, toUsername });
    if (!voteData) return false;
    return true;
  }

  async updateUserRating(username: string, sum: number): Promise<ISum> {
    return this.sumModel.findOneAndUpdate({ username }, { sum });
  }

  async checkCurrentSum(username: string): Promise<ISum> {
    return this.sumModel.findOne({ username });
  }

  async checkLastVote(
    fromUsername: string,
    toUsername: string,
  ): Promise<IVotes> {
    return this.voteModel.findOne({ fromUsername, toUsername });
  }

  async processUpdatedVote(filter: Object, update: Object): Promise<IVotes> {
    return this.voteModel.findOneAndUpdate(filter, update);
  }

  async softDelete(filter: Object): Promise<IVotes> {
    return this.voteModel.findOneAndUpdate({
      filter,
      is_deleted: true,
      deletedAt: Date.now(),
    });
  }
}
