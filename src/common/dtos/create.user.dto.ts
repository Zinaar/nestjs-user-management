import {
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @Length(4, 8)
  username: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsString()
  @Length(2, 12)
  firstname: string;

  @IsString()
  @IsOptional()
  @MaxLength(12)
  lastname?: string;

  @IsString()
  @IsOptional()
  @Matches(/basic|admin/)
  @ApiProperty({ enum: ['basic', 'admin'] })
  role?: 'basic' | 'admin';
}
