import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { tender } from "./tender";

@Entity("product", { schema: "public" })
export class product {

    @PrimaryGeneratedColumn({
        type: "smallint"
    })
    id: number;

    @Column("character varying", {
        length: 50,
        unique: true
    })
    name: string;

    @Column("character varying", {
        length: 10,
        default: "active"
    })
    state: string;
}
