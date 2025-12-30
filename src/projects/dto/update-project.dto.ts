import {
  IsArray,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  body?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  banner?: string;
}
