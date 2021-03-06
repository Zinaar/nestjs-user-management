import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 12)
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @Length(6, 12)
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
