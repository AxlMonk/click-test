import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CatalogEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "json"  })
  catalog: any;

}


