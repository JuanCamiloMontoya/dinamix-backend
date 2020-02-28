import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";

@Entity("entity", { schema: "public" })
export class entity {

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
}
