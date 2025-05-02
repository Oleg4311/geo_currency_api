import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ValidationErrorResponse {
    @ApiProperty({ example: HttpStatus.BAD_REQUEST })
    status!: number;
  
    @ApiProperty({ example: 'Некорректные данные запроса' })
    message!: string;
  }
  
  export class NotFoundErrorResponse {
    @ApiProperty({ example: HttpStatus.NOT_FOUND })
    status!: number;
  
    @ApiProperty({ example: 'Объект не найден' })
    message!: string;
  }
  
  export class ServerErrorResponse {
    @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
    status!: number;
  
    @ApiProperty({ example: 'Внутренняя ошибка сервера' })
    message!: string;
  }
  
  export class ForbiddenErrorResponse {
    @ApiProperty({ example: HttpStatus.FORBIDDEN })
    status!: number;
  
    @ApiProperty({ example: 'Доступ запрещён' })
    message!: string;
  }