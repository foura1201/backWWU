import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruit } from './recruit.entity';
import { User } from './user.entity';

@Entity()
export class Chatbot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  answer: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  business: User;

  @ManyToOne(() => Recruit, (recruit) => recruit.id, {
    nullable: false,
    cascade: true,
  })
  recruit: User;
}
