import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  person: User;

  @ManyToOne(() => Post, (post) => post.id, { nullable: false })
  post: Post;

  @Column({ nullable: false })
  comment: string;

  @CreateDateColumn()
  writedAt: Date;
}
