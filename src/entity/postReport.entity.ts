import { ReportType } from 'src/lib/enumeration/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './post.entity';
import User from './user.entity';

@Entity()
export default class PostReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  reportType: ReportType;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  person: User;

  @ManyToOne(() => Post, (post) => post.id, { nullable: false })
  post: Post;
}
