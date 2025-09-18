import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpCode, HttpStatus, } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogRdo } from './rdo/catalog.rdo';

@ApiTags('Каталог')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Успех!'
  })
  @Post()
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @ApiResponse({
    type: CatalogRdo,
    status: HttpStatus.OK,
    description: 'Найдено!'
  })
  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @ApiResponse({
    type: CatalogRdo,
    status: HttpStatus.OK,
    description: 'Найдено!'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешно обновлено!.'
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    return this.catalogService.update(id, updateCatalogDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Успешно удалено!.'
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catalogService.remove(id);
  }
}
