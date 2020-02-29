import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { employee } from "./employee";

@Entity("formal_education", { schema: "public" })
export class formal_education {

    @PrimaryGeneratedColumn({
        type: "smallint"
    })
    id: number;

    @Column("character varying",{
        length:50,
        unique:true
    })
    name: string;

    @Column("character varying", {
        length: 10,
        default: "active"
    })
    state: string;

    @OneToMany(type => employee, employee => employee.formalEducation, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    employees: employee;
}
