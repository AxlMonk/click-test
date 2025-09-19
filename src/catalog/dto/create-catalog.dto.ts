import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {

  @ApiProperty({
    description: 'Данные',
    example: []
  })
  public catalog: any[];
}
