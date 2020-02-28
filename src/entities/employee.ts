import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { position } from "./position";

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
        length: 20,
        name: 'formal_education'
    })
    formalEducation: string;

    @Column('character varying', {
        length: 20
    })
    university: string;

    @Column('character varying', {
        length: 20
    })
    degree: string;

    @Column('character varying', {
        length: 20,
        name: 'knowledge_level'
    })
    knowledgeLevel: string;

    @Column('character varying', {
        length: 10,
        default: 'active'
    })
    state: string;

    @CreateDateColumn({ type: "timestamp without time zone" })
    createdAt: Date;

    @ManyToOne(type => position, position => position.employees, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_position' })
    position: position;
}
