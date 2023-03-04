import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({ nullable: false })
  contents: string;

  @CreateDateColumn()
  writedAt: Date;

  @Column({ default: 0 })
  views: number;
}

export enum PostType {
  work = 'work',
  business = 'business',
  //수정 필요
}
