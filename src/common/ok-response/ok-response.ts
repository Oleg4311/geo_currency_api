import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { getSchemaPath } from '@nestjs/swagger';
import { Country } from '../../country/schemas/country.schema';

export class BaseResponse<T> {
  @ApiProperty({ example: HttpStatus.OK })
  status!: number;

  @ApiProperty({ example: 'Операция выполнена успешно' })
  message!: string;

  @ApiProperty()
  data!: T;
}

@ApiExtraModels(Country)
export class CreateCountryResponse extends BaseResponse<Country> {
  @ApiProperty({ example: HttpStatus.CREATED })
  status!: number;

  @ApiProperty({ example: 'Страна успешно создана' })
  message!: string;

  @ApiProperty({
    allOf: [{ $ref: getSchemaPath(Country) }],
  })
  data!: Country;
}

@ApiExtraModels(Country)
export class GetCountriesResponse extends BaseResponse<Country[]> {
  @ApiProperty({ example: HttpStatus.OK })
  status!: number;

  @ApiProperty({ example: 'Список стран успешно получен' })
  message!: string;

  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(Country) },
  })
  data!: Country[];
}

@ApiExtraModels(Country)
export class UpdateCountryStatusResponse extends BaseResponse<Country> {
  @ApiProperty({ example: HttpStatus.OK })
  status!: number;

  @ApiProperty({ example: 'Статус страны обновлён' })
  message!: string;

  @ApiProperty({
    allOf: [{ $ref: getSchemaPath(Country) }],
  })
  data!: Country;
}

@ApiExtraModels(Country)
export class UpdateCurrencyStatusResponse extends BaseResponse<Country> {
  @ApiProperty({ example: HttpStatus.OK })
  status!: number;

  @ApiProperty({ example: 'Активность валюты успешно изменена' })
  message!: string;

  @ApiProperty({
    allOf: [{ $ref: getSchemaPath(Country) }],
  })
  data!: Country;
}
