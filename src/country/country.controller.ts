import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCountryDto } from '../common/dto/create-country.dto';
import { UpdateStatusDto } from '../common/dto/update-status.dto';
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
  NotFoundErrorResponse
)
@Controller('countries')
export class CountryController {
  constructor(private readonly service: CountryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать страну с валютами' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({ status: HttpStatus.OK, type: CreateCountryResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ServerErrorResponse })
  async create(@Body() dto: CreateCountryDto, @Res() res: Response) {
    try {
      const created = await this.service.create(dto);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Страна успешно создана',
        data: created,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Ошибка при создании страны',
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить список стран и валют' })
  @ApiResponse({ status: HttpStatus.OK, type: GetCountriesResponse })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ServerErrorResponse })
  async findAll(@Res() res: Response) {
    try {
      const all = await this.service.findAll();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Список стран успешно получен',
        data: all,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Ошибка при получении списка стран',
      });
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
    @Res() res: Response,
  ) {
    try {
      const updated = await this.service.updateStatus(id, dto.isActive);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Статус страны обновлён',
        data: updated,
      });
    } catch (error: any) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({
        status,
        message: error.message || 'Ошибка при обновлении статуса страны',
      });
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
    @Res() res: Response,
  ) {
    try {
      const updated = await this.service.updateCurrencyStatus(
        countryId,
        code,
        dto.isActive,
      );
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Активность валюты успешно изменена',
        data: updated,
      });
    } catch (error: any) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({
        status,
        message: error.message || 'Ошибка при изменении валюты',
      });
    }
  }
}