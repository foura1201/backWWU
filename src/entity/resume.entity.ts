import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Industry } from './industry.entity';
import { User } from './user.entity';

@Entity()
export class Resume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  person: User;

  @Column()
  catchPhrase: string;

  @ManyToMany(() => Industry, (industry) => industry.id, {
    cascade: true,
  })
  desiredIndustry: Industry[];

  @ManyToMany(() => Country, (country) => country.id, {
    cascade: true,
  })
  desiredCountry: Country[];

  @Column()
  desiredLocation: string;
}
