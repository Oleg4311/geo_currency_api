import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CurrencyDocument = Currency & Document;

@Schema()
export class Currency {
  @ApiProperty({ example: 'EUR', description: 'Код валюты в формате ISO 4217' })
    @Prop({ required: true })
    code!: string;

  @ApiProperty({ example: 'Euro', description: 'Название валюты' })
    @Prop({ required: true })
    name!: string;

  @ApiProperty({ example: true, description: 'Активна ли валюта для страны' })
    @Prop({ required: true })
    isActive!: boolean;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
