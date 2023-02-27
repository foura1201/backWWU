import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { Industry } from "./industry.entity";

@Entity()
export class Recruit extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    //@ManyToOne(type => User, (user) => user.id)
    //business: User;

    @Column()
    recruitName: string;

    @Column()
    recruitStart: Date;
    
    @Column()
    recruitEnd: Date;
    
    @Column()
    description: string;

    @ManyToOne(() => Country, (country) => country.id, {nullable:true})
    country: Country;

    @Column()
    location: string;

    @ManyToOne(() => Industry, (industry) => industry.id, {nullable:true})
    industry: number;

    @Column()
    photos: string;

    @Column()
    certifications: string;
}
