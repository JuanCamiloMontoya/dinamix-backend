import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("employee", { schema: "public" })
export class employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', {
        length: 50
    })
    firstname: string;

    @Column('character varying', {
        length: 50
    })
    lastname: string;

    @Column('character varying', {
        length: 200
    })
    email: string;

    @Column('character varying', {
        length: 20
    })
    formalEducation: string;

    @Column('character varying', {
        length: 20
    })
    university: string;

    @Column('character varying', {
        length: 20
    })
    knowledgeLevel: string;

    @Column('character varying', {
        length: 10
    })
    state: string;

    @CreateDateColumn({ type: "timestamp without time zone" })
    createdAt: Date;
}
