import {
  IsArray,
  IsString,
  ArrayNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsString()
  @MinLength(20)
  body: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  industry: string;

  @IsString()
  banner: string;
}
