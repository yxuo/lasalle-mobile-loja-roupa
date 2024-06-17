import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { IsCpfCnpj } from 'src/utils/validators/is-cpf-cnpj.validator';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secret' })
  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Joao' })
  @IsString()
  nome: string;
  
  @ApiProperty({ example: '112223334' })
  @IsCpfCnpj({ isCpf: true, mandatory: true, numeric: true })
  cpf: string;
  
  @ApiProperty({ example: '2024-05-01' })
  @IsDateString()
  nascimento: Date;
  
  @ApiProperty({ example: '2024-05-01', required: false })
  @IsOptional()
  @IsString()
  endereco: string;
}
