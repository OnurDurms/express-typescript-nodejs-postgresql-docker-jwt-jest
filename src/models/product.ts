import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,CreateDateColumn, UpdateDateColumn, JoinColumn} from "typeorm";
import { Customer } from "./customer";
import { User } from "./user";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        type: 'text'
    })
    content!: string;

    @Column()
    userId!: number;

    @Column()
    price!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}