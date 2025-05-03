import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './schemas/country.schema';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>
  ) {}

  async create(dto: CreateCountryDto): Promise<Country> {
    try {
      return await this.countryModel.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании страны');
    }
  }

  async findAll(): Promise<Country[]> {
    try {
      return await this.countryModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка стран');
    }
  }

  async updateStatus(id: string, isActive: boolean): Promise<Country> {
    try {
      const updated = await this.countryModel.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );
      if (!updated) {
        throw new NotFoundException('Страна не найдена');
      }
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Ошибка при обновлении статуса страны');
    }
  }

  async updateCurrencyStatus(
    countryId: string,
    code: string,
    isActive: boolean
  ): Promise<Country> {
    try {
      const country = await this.countryModel.findById(countryId);
      if (!country) throw new NotFoundException('Страна не найдена');

      const currency = country.currencies.find((c: { code: string; }) => c.code === code);
      if (!currency) throw new NotFoundException('Валюта не найдена');

      currency.isActive = isActive;
      return await country.save();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Ошибка при обновлении валюты');
    }
  }
}

