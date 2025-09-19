import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatalogDto {
  @ApiProperty({
    description: 'Данные',
    example: {}
  })
  public catalog: any;
}