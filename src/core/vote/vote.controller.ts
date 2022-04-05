import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { ProcessVoteDTO } from '../../common/dtos';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('process')
  async createVoteController(
    @Body() vote: ProcessVoteDTO,
  ): Promise<HttpException> {
    try {
      await this.voteService.processVote(vote);
      return new HttpException('user voted successfully ', HttpStatus.CREATED);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateVoteController(
    @Body() vote: ProcessVoteDTO,
  ): Promise<HttpException> {
    try {
      await this.voteService.updateVote(vote);
      return new HttpException('vote updated successfully', 200);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteVoteController(
    @Query('username') fromUsername: string,
    @Body('toUsername') toUsername: string,
  ): Promise<HttpException> {
    try {
      await this.voteService.deleteVote(fromUsername, toUsername);
      return new HttpException('vote deleted successfully', 200);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
