import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Resume from './resume.entity';

@Entity()
export default class Industry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  industryName: string;

  @ManyToMany(() => Resume, (resume) => resume.id, {
    cascade: true,
    nullable: true,
  })
  resumes: Industry;
}
