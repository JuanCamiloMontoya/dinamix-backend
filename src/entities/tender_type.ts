import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { tender } from "./tender";

@Entity("tender_type", { schema: "public" })
export class tender_type {

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
    
    @OneToMany(type => tender, tender => tender.tenderType, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    tenders: tender[];
}
