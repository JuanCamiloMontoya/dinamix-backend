import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity("user", { schema: "public" })
export class user {

    @PrimaryGeneratedColumn({
        type: "bigint",
    })
    id: number;

    @Column("character varying", {
        length: 100
    })
    name: string;

    @Column("character varying", {
        length: 50
    })
    firstname: string;

    @Column("character varying", {
        length: 50
    })
    lastname: string;

    @Column("character varying", {
        length: 20,
        nullable: true
    })
    phone: string;

    @Column("character varying", {
        length: 100,
        unique: true
    })
    email: string;

    @Column("text", {
        select: false,
        nullable: true
    })
    password: string;

    @Column("character varying", {
        length: 10,
        default: "active"
    })
    state: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}