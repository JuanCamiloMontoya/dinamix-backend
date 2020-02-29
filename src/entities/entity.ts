import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { tender } from "./tender";

@Entity("entity", { schema: "public" })
export class entity {

    @PrimaryGeneratedColumn({
        type: "smallint"
    })
    id: number;

    @Column("character varying", {
        length: 100,
        unique: true
    })
    name: string;

    @Column("character varying", {
        length: 10,
        default: "active"
    })
    state: string;

    @OneToMany(type => tender, tender => tender.entity, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tenders: tender[];
}
