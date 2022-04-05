import { Injectable } from '@nestjs/common';
import { VoteRepository } from 'src/database/repositories';
import { ProcessVoteDTO } from '../../common/dtos';
import { ISum, IVotes, IUsers } from '../../common/interfaces';

@Injectable()
export class VoteService {
  constructor(private readonly voteRepository: VoteRepository) {}

  async processVote(vote: ProcessVoteDTO): Promise<IUsers> {
    const { fromUsername, toUsername } = vote;
    const checkIfVoted = await this.voteRepository.checkIfVoted(
      fromUsername,
      toUsername,
    );
    if (!checkIfVoted) {
      await this.voteRepository.processVote(vote);
      await this._updateUserRating(vote);
    }

    throw new Error('user already voted');
  }

  async _updateUserRating(vote: ProcessVoteDTO): Promise<ISum> {
    const currentSum = await this.voteRepository.checkCurrentSum(
      vote.toUsername,
    );

    const updatedSum = currentSum.sum + vote.vote;

    const updatedUserRating = await this.voteRepository.updateUserRating(
      vote.toUsername,
      updatedSum,
    );
    return updatedUserRating;
  }

  async updateVote(vote: ProcessVoteDTO): Promise<ISum> {
    const lastVote = await this.voteRepository.checkLastVote(
      vote.fromUsername,
      vote.toUsername,
    );
    const filter = {
      fromUsername: vote.fromUsername,
      toUsername: vote.toUsername,
    };
    const update = {
      vote: vote.vote,
    };
    const lastVoteTime = await this._checkLastVoted(lastVote);

    if (
      vote.vote !== lastVote.vote &&
      lastVote.is_deleted !== true &&
      lastVoteTime
    ) {
      await this._updateUserRating(vote);
      await this.voteRepository.processUpdatedVote(filter, update);
    }
    return;
  }

  async _checkLastVoted(lastVote: IVotes): Promise<Boolean> {
    const dateNow = new Date();
    const lastVoteDate = new Date(lastVote.updatedAt);
    if (Math.abs(dateNow.getUTCHours() - lastVoteDate.getUTCHours()) < 1) {
      throw new Error(
        'you need to wait one hour from your last vote to proceed',
      );
    }
    return true;
  }

  async _removeUserRating(toUsername: string) {
    const currentSum = await this.voteRepository.checkCurrentSum(toUsername);

    const updatedSum = currentSum.sum - 1;

    const updatedUserRating = await this.voteRepository.updateUserRating(
      toUsername,
      updatedSum,
    );
    return updatedUserRating;
  }

  async deleteVote(fromUsername: string, toUsername: string): Promise<IVotes> {
    const filter = {
      fromUsername,
      toUsername,
    };
    await this._removeUserRating(toUsername);
    await this.voteRepository.softDelete(filter);
    return;
  }
}
