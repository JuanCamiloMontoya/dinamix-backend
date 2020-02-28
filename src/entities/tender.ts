import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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
        length: 10
    })
    state: string;

    @CreateDateColumn({ type: "timestamp without time zone" })
    createdAt: Date;
}
