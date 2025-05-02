import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ example: true, description: 'Флаг активности страны' })
  isActive!: boolean;
}