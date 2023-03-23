import { PostType } from 'src/lib/enumeration/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comment from './comment.entity';
import PostLike from './postLike.entity';
import User from './user.entity';

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  person: User;

  @Column({ nullable: false })
  postType: PostType;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'text' })
  contents: string;

  @CreateDateColumn()
  writedAt: Date;

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostLike, (like) => like.post)
  likes: PostLike[];
}
