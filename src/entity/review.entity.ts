import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', scale: 1, precision: 5 })
  rating: number;

  @Column()
  review: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  person: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  business: User;
}
