import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { entity } from "./entity";
import { tender_type } from "./tender_type";
import { product } from "./product";
import { employee } from "./employee";
import { indicator } from "./indicator";

@Entity("tender", { schema: "public" })
export class tender {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('character varying', {
        length: 20
    })
    processNumber: string;

    @Column('bigint')
    value: number;

    @Column('character varying', {
        length: 50,
        name: "product_summary"
    })
    productSummary: string;

    @Column('character varying', {
        length: 200
    })
    observation: string;

    @Column('timestamp without time zone')
    observationDate: Date;

    @Column('timestamp without time zone')
    mypime: Date;

    @Column('timestamp without time zone')
    defintiveDate: Date;

    @Column('timestamp without time zone')
    closingDate: Date;

    @Column('timestamp without time zone')
    correctionDate: Date;

    @Column('timestamp without time zone')
    auctionDate: Date;

    @Column('character varying', {
        length: 10,
        default: 'active'
    })
    state: string;

    @CreateDateColumn({ type: "timestamp without time zone" })
    createdAt: Date;

    @ManyToOne(type => entity, entity => entity.tenders, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_entity' })
    entity: entity;

    @ManyToOne(type => tender_type, tender_type => tender_type.tenders, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_tender_type' })
    tenderType: tender_type;

    @ManyToOne(type => employee, employee => employee.tenders, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_employee' })
    employee: employee;

    @ManyToOne(type => indicator, indicator => indicator.tenders, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'fk_indicator' })
    indicator: indicator;
}
