import { ReportType } from 'src/lib/enumeration/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comment from './comment.entity';
import User from './user.entity';

@Entity()
export default class CommentReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  reportType: ReportType;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  person: User;

  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: false })
  comment: Comment;
}
