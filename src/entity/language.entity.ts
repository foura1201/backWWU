import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Resume from './resume.entity';
import User from './user.entity';

@Entity()
export default class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @ManyToMany(() => Resume, (resume) => resume.id, {
    nullable: false,
    cascade: true,
  })
  resumes: Resume[];

  @ManyToOne(() => User, (person) => person.id, {
    nullable: false,
    cascade: true,
  })
  person: User;

  @Column()
  level: string;
}
