import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatContent: string;

  @CreateDateColumn()
  writedAt: Date;

  @Column({ type: 'bool', default: 0 })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  receiver: User;
}
