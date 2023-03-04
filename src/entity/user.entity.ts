import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Country from './country.entity';
import Industry from './industry.entity';
import { UserType } from 'src/lib/enumeration/enum';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userType: UserType;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  preferredLanguage: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Country, (country) => country.id, {
    cascade: true,
  })
  country: Country;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Industry, (industry) => industry.id, {
    cascade: true,
  })
  industry: Industry;

  @Column({ nullable: true })
  profile: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
