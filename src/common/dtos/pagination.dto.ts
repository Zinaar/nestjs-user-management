import { IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
  @IsString()
  @IsOptional()
  skip?: string;

  @IsString()
  @IsOptional()
  limit?: string;
}
