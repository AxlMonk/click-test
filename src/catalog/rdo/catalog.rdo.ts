import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatalogRdo {
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    description: 'Данные',
    example: {}
  })
  public catalog: any;
}