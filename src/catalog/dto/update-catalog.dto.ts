import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatalogDto {
  @IsString()
  @ApiProperty({
    description: 'Артикль',
    example: ''
  })
  readonly article: string;

  @IsString()
  @ApiProperty({
    description: 'Название',
    example: ''
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'Бренд',
    example: ''
  })
  readonly brand: string;

  @IsString()
  @ApiProperty({
    description: 'Цена',
    example: ''
  })
  readonly price: string;

  @IsString()
  @ApiProperty({
    description: 'Цвет',
    example: ''
  })
  readonly color: string;

  @IsString()
  @ApiProperty({
    description: 'Страна',
    example: ''
  })
  readonly country: string;
}