import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogEntity} from './catalog.entity';
import { CreateCatalogDto} from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(CatalogEntity)
    private catalogRepository: Repository<CatalogEntity>,
  ) {}

  async createCatalog(createCatalogDto: CreateCatalogDto): Promise<CatalogEntity> {
    const catalog = this.catalogRepository.create(createCatalogDto);
    return this.catalogRepository.save(catalog);
  }

  async findAll(): Promise<CatalogEntity[]> {
    return this.catalogRepository.find();
  }

  async findOne(id: number): Promise<CatalogEntity> {
    const catalog = await this.catalogRepository.findOneBy({ id });
    if (!catalog) {
      throw new NotFoundException(`Catalog with ID ${id} not found`);
    }
    return catalog;
  }

  async update(id: number, updateCatalogDto: UpdateCatalogDto): Promise<CatalogEntity> {
    await this.catalogRepository.update(id, updateCatalogDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.catalogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Catalog with ID ${id} not found`);
    }
  }
}
