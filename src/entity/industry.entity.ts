import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Industry extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    industryName: string;
}