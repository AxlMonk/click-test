import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEntity } from './catalog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogEntity])],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
