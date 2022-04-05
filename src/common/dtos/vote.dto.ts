import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  NotEquals,
} from 'class-validator';

export class ProcessVoteDTO {
  @IsString()
  @Length(4, 8)
  fromUsername: string;

  @IsString()
  @Length(4, 8)
  toUsername: string;

  @IsNumber()
  @Min(-1)
  @Max(1)
  @NotEquals(0)
  vote: number;
}
