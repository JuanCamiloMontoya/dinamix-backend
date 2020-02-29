import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { position } from "./position";
import { formal_education } from "./formal_education";
import { tender } from "./tender";

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
        length: 200,
        unique: true
    })
    email: string;

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

    @ManyToOne(type => formal_education, formal_education => formal_education.employees, { nullable: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_formal_education' })
    formalEducation: formal_education;
    
    @OneToMany(type => tender, tender => tender.employee, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tenders: tender[];
}
