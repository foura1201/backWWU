import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Industry } from './industry.entity';
import { User } from './user.entity';

@Entity()
export class Career extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  careerName: string;

  @Column()
  careerPeriod: number;

  @Column()
  careerEvidence: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  person: User;

  @ManyToOne(() => Industry, (industry) => industry.id, {
    nullable: false,
    cascade: true,
  })
  industry: Industry;
}
