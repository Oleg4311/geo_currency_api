import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in .env');
}

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    CountryModule,
  ],
})
export class AppModule {}
