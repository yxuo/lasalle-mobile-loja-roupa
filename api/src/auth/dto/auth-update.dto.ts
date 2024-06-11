import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsOptional, Length, Max, Min } from 'class-validator';

export class AuthUpdateDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '1234' })
  @IsOptional()

  nome?: string;
}
