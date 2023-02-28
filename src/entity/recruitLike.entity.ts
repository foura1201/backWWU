import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruit } from './recruit.entity';
import { User } from './user.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  person: User;

  @ManyToOne(() => Recruit, (recruit) => recruit.id, { nullable: false })
  recruit: Recruit;
}
