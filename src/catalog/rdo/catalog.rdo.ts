import { IsNumber, IsString } from 'class-validator';

export class CatalogRdo {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly article: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly price: string;

  @IsString()
  readonly color: string;

  @IsString()
  readonly country: string;
}