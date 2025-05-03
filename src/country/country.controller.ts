import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiExtraModels,
} from '@nestjs/swagger';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CountryService } from './country.service';
import {
  CreateCountryResponse,
  GetCountriesResponse,
  UpdateCountryStatusResponse,
  UpdateCurrencyStatusResponse,
} from '../common/ok-response/ok-response';
import {
  ValidationErrorResponse,
  ServerErrorResponse,
  ForbiddenErrorResponse,
  NotFoundErrorResponse,
} from '../common/bad-responses/bad-responses';

@ApiTags('Countries')
@ApiExtraModels(
  CreateCountryResponse,
  GetCountriesResponse,
  UpdateCountryStatusResponse,
  UpdateCurrencyStatusResponse,
  ValidationErrorResponse,
  ServerErrorResponse,
  ForbiddenErrorResponse,
  NotFoundErrorResponse,
)
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создать страну с валютами' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateCountryResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ServerErrorResponse })
  async create(@Body() dto: CreateCountryDto): Promise<CreateCountryResponse> {
    try {
      const created = await this.countryService.create(dto);
      return {
        status: HttpStatus.CREATED,
        message: 'Страна успешно создана',
        data: created,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ошибка при создании страны',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить список стран и валют' })
  @ApiResponse({ status: HttpStatus.OK, type: GetCountriesResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ServerErrorResponse })
  async findAll(): Promise<GetCountriesResponse> {
    try {
      const all = await this.countryService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'Список стран успешно получен',
        data: all,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ошибка при получении списка стран',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Изменить активность страны' })
  @ApiParam({ name: 'id', description: 'ID страны' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateCountryStatusResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponse })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ForbiddenErrorResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ServerErrorResponse })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ): Promise<UpdateCountryStatusResponse> {
    try {
      const updated = await this.countryService.updateStatus(id, dto.isActive);
      return {
        status: HttpStatus.OK,
        message: 'Статус страны обновлён',
        data: updated,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Ошибка при обновлении статуса страны',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':countryId/currency/:code/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Изменить активность валюты' })
  @ApiParam({ name: 'countryId', description: 'ID страны' })
  @ApiParam({ name: 'code', description: 'Код валюты ISO' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateCurrencyStatusResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ServerErrorResponse })
  async updateCurrencyStatus(
    @Param('countryId') countryId: string,
    @Param('code') code: string,
    @Body() dto: UpdateStatusDto,
  ): Promise<UpdateCurrencyStatusResponse> {
    try {
      const updated = await this.countryService.updateCurrencyStatus(
        countryId,
        code,
        dto.isActive,
      );
      return {
        status: HttpStatus.OK,
        message: 'Активность валюты успешно изменена',
        data: updated,
      };
    } catch (error: any) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Ошибка при изменении валюты',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
