import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Industry } from './industry.entity';
import { User } from './user.entity';

@Entity()
export class Recruit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  business: User;

  @Column({ nullable: false })
  recruitName: string;

  @Column({ nullable: false })
  recruitStart: Date;

  @Column({ nullable: false })
  recruitEnd: Date;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Country, (country) => country.id, { nullable: true })
  country: Country;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Industry, (industry) => industry.id, { nullable: true })
  industry: number;

  @Column({ nullable: true })
  photos: string;

  @Column({ nullable: true })
  certifications: string;
}
