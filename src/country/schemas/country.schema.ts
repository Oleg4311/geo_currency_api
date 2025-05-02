import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Currency, CurrencySchema } from './currency.schema';

export type CountryDocument = Country & Document;


@Schema()
export class Country {
  @ApiProperty({ example: 'France', description: 'Название страны' })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ example: 'FR', description: 'ISO-код страны' })
  @Prop({ required: true })
  isoCode!: string;

  @ApiProperty({ type: [Currency], description: 'Список валют, используемых в стране' })
  @Prop({ type: [CurrencySchema], required: true })
  currencies!: Currency[];

  @ApiProperty({ example: true, description: 'Активна ли страна' })
  @Prop({ default: true })
  isActive!: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);