import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CurrencyDto {
  @ApiProperty({ example: 'USD', description: 'Код валюты (ISO 4217)' })
  code?: string;

  @ApiProperty({ example: 'Доллар США', description: 'Название валюты' })
  name?: string;
}

export class CreateCountryDto {
  @ApiProperty({ example: 'США', description: 'Название страны' })
  name?: string;

  @ApiProperty({ example: 'US', description: 'ISO-код страны' })
  isoCode?: string;

  @ApiProperty({ type: [CurrencyDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CurrencyDto)
  currencies?: CurrencyDto[];
}
