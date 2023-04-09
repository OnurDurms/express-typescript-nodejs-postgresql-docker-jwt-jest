import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany} from "typeorm";
import { Order } from "./order";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'text'
    })
    content!: string;

    @Column({ nullable: false })
    userId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}