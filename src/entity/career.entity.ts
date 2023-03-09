import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Industry from './industry.entity';
import Resume from './resume.entity';
import User from './user.entity';

@Entity()
export default class Career extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  careerName: string;

  @Column({ nullable: true })
  careerPeriod: number;

  @Column({ nullable: true })
  careerEvidence: string;

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

  @ManyToOne(() => Industry, (industry) => industry.id, {
    nullable: false,
    cascade: true,
  })
  industry: Industry;
}
