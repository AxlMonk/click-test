import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CatalogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  article: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  price: string;

  @Column()
  color: string;

  @Column()
  country: string;
}
