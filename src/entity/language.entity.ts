import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  person: User;

  @Column()
  level: string;
}
