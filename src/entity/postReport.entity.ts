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
export class PostReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  reportType: ReportType;
  //@ManyToOne(() => User, (user) => user.id, { nullable: false })
  //person: User;

  @ManyToOne(() => Post, (post) => post.id, { nullable: false })
  post: Post;
}

export enum ReportType {
  business = 'business',
  //수정 필요
}
