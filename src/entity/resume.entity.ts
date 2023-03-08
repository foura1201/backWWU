import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import Career from './career.entity';
import Country from './country.entity';
import Industry from './industry.entity';
import Language from './language.entity';
import User from './user.entity';

@Entity()
export default class Resume extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  person: User;

  @Column()
  catchPhrase: string;

  @Column()
  introduction: string;

  @ManyToMany(() => Industry, (industry) => industry.id, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  desiredIndustry: Industry[];

  @ManyToMany(() => Country, (country) => country.id, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  desiredCountry: Country[];

  @Column({ nullable: true })
  desiredLocation: string;

  @Column({ nullable: true })
  desiredPay: string;

  @Column({ default: false })
  public: boolean;

  @ManyToMany(() => Career, (career) => career.id, { cascade: true })
  @JoinTable()
  career: Career[];

  @ManyToMany(() => Language, (language) => language.id, { cascade: true })
  @JoinTable()
  language: Language[];
}
