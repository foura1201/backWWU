import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Resume from './resume.entity';

@Entity()
export default class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  countryName: string;

  @ManyToMany(() => Resume, (resume) => resume.id, {
    cascade: true,
    nullable: true,
  })
  resumes: Resume[];
}
