import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors, UploadedFile, ParseFilePipeBuilder,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogRdo } from './rdo/catalog.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import * as XLSX from 'xlsx';

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
    return this.catalogService.createCatalog(createCatalogDto);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        .build({ fileIsRequired: true }),
    )
      file: Express.Multer.File,
  ) {

    const filePath = `./uploads/${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    const workbook = XLSX.readFile(filePath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet);

    fs.unlinkSync(filePath);

    return this.catalogService.parseFile(jsonData);
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
  @Patch(':id')
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
